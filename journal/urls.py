from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("create_entry/<str:date_str>", views.create_entry, name="create_entry"),
    path("update_entry/<int:id>", views.update_entry, name="update_entry"),
    # API Routes
    path("entries", views.entries, name="entries"),
    path("entry_on/<str:date>", views.entry_on, name="entry_on"),
    path("entry/<int:entry_id>", views.entry, name="entry"),
]
