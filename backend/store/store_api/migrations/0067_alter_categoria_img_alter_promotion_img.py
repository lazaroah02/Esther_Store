# Generated by Django 5.1.4 on 2025-02-19 01:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store_api', '0066_alter_producto_product_img1_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categoria',
            name='img',
            field=models.ImageField(upload_to='categories_images'),
        ),
        migrations.AlterField(
            model_name='promotion',
            name='img',
            field=models.ImageField(upload_to='promotions'),
        ),
    ]
