from django.contrib import admin
from django.contrib import auth
from django.contrib.auth.models import User

# Register your models here.

from .models import Order, OrderItem, PizzaItem, SubItem, SimpleItem, Pizza, PizzaTopping, Product, SubExtra

admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(PizzaItem)
admin.site.register(SubItem)
admin.site.register(SimpleItem)
admin.site.register(Pizza)
admin.site.register(PizzaTopping)
admin.site.register(Product)
admin.site.register(SubExtra)