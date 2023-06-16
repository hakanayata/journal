import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import AnonymousUser
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST, require_GET, require_http_methods
from django.contrib import messages
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt
from .models import User, JournalEntry, Tag
from .forms import EntryForm
from datetime import datetime, time, timedelta
from django.utils import timezone


@login_required(login_url="login")
def index(request):
    return render(request, "journal/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "journal/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "journal/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "journal/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "journal/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "journal/register.html")


@require_http_methods(["GET", "POST"])
@login_required(login_url="login")
def create_entry(request):
    if request.method == "GET":
        form = EntryForm()
        return render(request, "journal/create_entry.html", {
            "form": form
        })
    elif request.method == "POST":
        # create instance and populate it with data from the request
        form = EntryForm(request.POST)

        if form.is_valid():
            entry = form.save(commit=False)
            entry.user = request.user
            entry.save()

            # tags
            tag_names = form.cleaned_data["tags"]

            for tag_name in tag_names:
                # get_or_create ensures that the tag is either retrieved if it exists
                # and assigned to "tag"
                # or created if it doesn't and assigned to "created_tag"
                tag, created_tag = Tag.objects.get_or_create(
                    name=tag_name.strip())
                entry.tags.add(tag)

            messages.success(request, "Entry saved!")
            return HttpResponseRedirect(reverse("index"))
        else:
            messages.error(request, "Error occured!")
            return render("journal/create_entry.html", {
                "form": form
            })


@login_required(login_url="login")
def update_entry(request, entry_id):
    # Query for requested entry
    try:
        entry = JournalEntry.objects.get(pk=entry_id)
    except JournalEntry.DoesNotExist:
        messages.error(request, "Entry not found!")
        return JsonResponse({"error": "Entry not found"}, status=404)

    if request.method == "PUT":
        if entry.user == request.user:
            # deserialize json to python obj
            data = json.loads(request.body)
            content = data["content"]
            tags = data["tags"]
            entry.content = content
            entry.tags = tags
            entry.save()
            return HttpResponse(status=204)
        else:
            messages.error(request, "Entry not found!")
            return JsonResponse({"error": "Not authorized"}, status=401)

    else:
        return JsonResponse({"error": "Only PUT method allowed"}, status=400)


# todo: API for fun
@login_required
def entry(request, entry_id):
    # Query for requested entry
    try:
        entry = JournalEntry.objects.get(user=request.user, pk=entry_id)
    except JournalEntry.DoesNotExist:
        return JsonResponse({"error": "Entry not found."}, status=404)

    # Return entry content
    if request.method == "GET":
        return JsonResponse(entry.serialize())

    # Update
    elif request.method == "PUT":
        data = json.loads(request.body)
        if data.get("content") is not None:
            entry.content = data["content"]
        if data.get("tags") is not None:
            entry.tags = data["tags"]
        entry.save()
        return HttpResponse(status=204)
    else:
        return JsonResponse({"error": "GET or PUT request required."}, status=400)


@require_GET
@login_required
def entries(request):
    # Query for entries
    try:
        entries = JournalEntry.objects.filter(user=request.user)
    except:
        entries = None
        return JsonResponse({"warning": "No entry found."})

    entries = entries.order_by("-created_at").all()
    # in order to serialize non-dict objects -> safe=False
    return JsonResponse([entry.serialize() for entry in entries], safe=False)
