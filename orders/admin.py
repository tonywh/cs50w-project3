from django.contrib import admin
from django.contrib import auth
from django.contrib.auth.models import User

# Register your models here.

from .models import Order, OrderItem, Pizza, PizzaTopping, Sub, Product, SubExtra, Category

admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Pizza)
admin.site.register(PizzaTopping)
admin.site.register(Sub)
admin.site.register(Product)
admin.site.register(SubExtra)
admin.site.register(Category)