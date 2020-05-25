# Generated by Django 2.0.3 on 2020-05-23 21:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0013_category_display_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pizza',
            name='price0',
            field=models.DecimalField(decimal_places=2, max_digits=5),
        ),
        migrations.AlterField(
            model_name='pizza',
            name='price1',
            field=models.DecimalField(decimal_places=2, max_digits=5),
        ),
        migrations.AlterField(
            model_name='pizza',
            name='price2',
            field=models.DecimalField(decimal_places=2, max_digits=5),
        ),
        migrations.AlterField(
            model_name='pizza',
            name='price3',
            field=models.DecimalField(decimal_places=2, max_digits=5),
        ),
        migrations.AlterField(
            model_name='pizza',
            name='priceSpecial',
            field=models.DecimalField(decimal_places=2, max_digits=5),
        ),
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=5),
        ),
        migrations.AlterField(
            model_name='sub',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=5),
        ),
        migrations.AlterField(
            model_name='subextra',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=5),
        ),
    ]