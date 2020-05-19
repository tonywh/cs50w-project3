from django.contrib import admin

# Register your models here.

from .models import User, Order, Product, Option, OptionValue, OptionPrice, OrderItem

admin.site.register(User)
admin.site.register(Order)
admin.site.register(Product)
admin.site.register(Option)
admin.site.register(OptionValue)
admin.site.register(OptionPrice)
admin.site.register(OrderItem)
