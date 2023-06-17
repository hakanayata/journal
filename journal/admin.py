from django.contrib import admin
from .models import JournalEntry, Tag

# Register your models here.


class JournalAdmin(admin.ModelAdmin):
    list_display = ["id", "content", "user", "created_at"]


admin.site.register(JournalEntry, JournalAdmin)
admin.site.register(Tag)
