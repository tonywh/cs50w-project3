# Generated by Django 2.0.3 on 2020-05-20 22:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0005_auto_20200520_2122'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='user',
        ),
    ]
