# Generated by Django 3.2.16 on 2023-06-04 18:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedido_api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
