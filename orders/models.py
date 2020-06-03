from django.db import models
from django.contrib.auth.models import User

#
# Model for a category
# Intended to categorise products
#
class Category(models.Model):
    name = models.CharField(max_length=128)
    display_order = models.IntegerField()

    def __str__(self):
        return f"{self.name}"

#
# Model for Sub extras
#
class SubExtra(models.Model):
    name = models.CharField(max_length=128)
    price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.name}"

#
# Model to characterise simple products
#
class Product(models.Model):
    name = models.CharField(max_length=128)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField(max_length=1024)
    categories = models.ManyToManyField(Category, blank=True)

    def __str__(self):
        return f"{self.name}"

#
# Model to characterise subs.
# This is distinct from simple products so that the app knows which
# that these can have sub extras.
#
class Sub(models.Model):
    name = models.CharField(max_length=128)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField(max_length=1024)

    def __str__(self):
        return f"{self.name}"

#
# Model for pizza toppings
#
class PizzaTopping(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return f"{self.name}"

#
# Model to characterise pizzas
#
class Pizza(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField(max_length=1024)
    price0 = models.DecimalField(max_digits=5, decimal_places=2)
    price1 = models.DecimalField(max_digits=5, decimal_places=2)
    price2 = models.DecimalField(max_digits=5, decimal_places=2)
    price3 = models.DecimalField(max_digits=5, decimal_places=2)
    priceSpecial = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.name}"

#
# Model for an Order. One-to-many relationship with OrderItem.
#
class Order(models.Model):
    user = models.ForeignKey(User,  on_delete=models.PROTECT)
    time = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.id} {self.time} {self.user}"

#
# Items that are part of an order.
# Rows in this table are items in an order.
#
class OrderItem(models.Model):
    product = models.CharField(max_length=128)
    options = models.CharField(max_length=128)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    order = models.ForeignKey(Order, on_delete=models.PROTECT, related_name="items")

    def __str__(self):
        return f"{self.product} {self.options} {self.price}"
