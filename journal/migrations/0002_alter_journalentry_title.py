# Generated by Django 4.2.1 on 2023-06-13 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journal', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='journalentry',
            name='title',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
