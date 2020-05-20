# Generated by Django 2.0.3 on 2020-05-20 22:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0009_order_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='pizzaItem',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='orders.PizzaItem'),
        ),
        migrations.AlterField(
            model_name='orderitem',
            name='simpleItem',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='orders.SimpleItem'),
        ),
        migrations.AlterField(
            model_name='orderitem',
            name='subItem',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='orders.SubItem'),
        ),
    ]
