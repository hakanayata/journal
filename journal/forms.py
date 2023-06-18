from django import forms
from .models import JournalEntry
from tinymce.widgets import TinyMCE


class EntryForm(forms.ModelForm):

    # remove colon ":" suffix from labels
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label_suffix = ""

    # Fix: M2M field "tags" yields error
    # override ManyToMany with CharField
    tags = forms.CharField(required=False, widget=forms.TextInput(attrs={
        "class": "form-control border-0 shadow-lg",
        "placeholder": "Tags",
    }))

    class Meta:
        model = JournalEntry
        fields = ["date", "content", "tags"]
        widgets = {
            "content": TinyMCE(attrs={
                "class": "form-control border-0 shadow-lg",
                "cols": 30,
                "rows": 10
            }),
            "date": forms.DateInput(attrs={
                "class": "form-control border-0 shadow-lg",
                "placeholder": "Date"
            })
        }

    # this will automatically run when form.is_valid() called
    def clean_tags(self):
        print("RUN RUN RUN RUN")
        tags = self.cleaned_data.get("tags")
        if tags:
            cleaned_tags = [tag.strip() for tag in tags.split(",")]
            return cleaned_tags
        else:
            return []

    # class Meta:
    #     model = JournalEntry
    #     fields = ["title", "content", "tags"]
    #     widgets = {
    #         "title": forms.TextInput(attrs={
    #             "class": "form-control border-0 shadow-lg",
    #             "placeholder": "Title",
    #         }),
    #         "content": TinyMCE(attrs={
    #             "class": "form-control border-0 shadow-lg",
    #             # "cols": False,
    #             # "rows": False,
    #             # "placeholder": "Content",
    #             # "style": "height: 180px;"
    #             "cols": 30,
    #             "rows": 10
    #         }),
    #     }
