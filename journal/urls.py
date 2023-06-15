from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("create_entry", views.create_entry, name="create_entry"),
    path("update_entry/<int:id>", views.update_entry, name="update_entry"),
    # API Routes
    path("entries", views.entries, name="entries"),
    path("entry/<int:id>", views.entry, name="entry"),
]
