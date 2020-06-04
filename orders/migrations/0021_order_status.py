# Generated by Django 2.0.3 on 2020-06-04 08:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0020_orderitem_quantity'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.IntegerField(choices=[(1, 'cart'), (2, 'queued'), (3, 'processing'), (4, 'ready for collection'), (5, 'complete')], default=1),
        ),
    ]
