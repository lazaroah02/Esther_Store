# Generated by Django 3.2.16 on 2024-01-06 16:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('user_profile_api', '0003_alter_favoriteproductslist_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='favoriteproductslist',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
