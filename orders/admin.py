from django.contrib import admin
from django.contrib import auth
from django.contrib.auth.models import User

from .models import Order, OrderItem, Pizza, PizzaTopping, Sub, Product, SubExtra, Category

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    fields = ( ('product', 'options', 'quantity', 'price'), )
    readonly_fields = ['product', 'options', 'quantity', 'price']
#    fields = ( 'product', )
#    readonly_fields = ['product']
    extra = 0
    max_num = 0
    can_delete = False

class OrderAdmin(admin.ModelAdmin):
    list_display = ( 'id', 'time', 'user', 'status' )
    inlines = [OrderItemInline,]
    fields = ( ('status', 'time', 'user'), )
    readonly_fields = ['time', 'user']

    def has_add_permission(self, request):
        return False

admin.site.register(Order, OrderAdmin)
admin.site.register(Pizza)
admin.site.register(PizzaTopping)
admin.site.register(Sub)
admin.site.register(Product)
admin.site.register(SubExtra)
admin.site.register(Category)