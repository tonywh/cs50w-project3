from django.db import models
from django.contrib.auth.models import User

#
# Model for a category
# Intended to categorise products
#
class Category(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return f"{self.name}"

#
# Model for Sub extras
#
class SubExtra(models.Model):
    name = models.CharField(max_length=128)
    price = models.FloatField()

    def __str__(self):
        return f"{self.name}"

#
# Model to characterise simple products
#
class Product(models.Model):
    name = models.CharField(max_length=128)
    price = models.FloatField()
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
    price = models.FloatField()

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
    price0 = models.FloatField()
    price1 = models.FloatField()
    price2 = models.FloatField()
    price3 = models.FloatField()
    priceSpecial = models.FloatField()

    def __str__(self):
        return f"{self.name}"

#
# Model for a Pizza item in an order.
# Rows in this table are Pizza items in an order
#
class PizzaItem(models.Model):
    pizza = models.ForeignKey(Pizza, on_delete=models.PROTECT)
    toppings = models.ManyToManyField(PizzaTopping, blank=True)

    def __str__(self):
        return f"{self.pizza.name}"

#
# Model for a Sub item in an order.
# Rows in this table are Sub items in an order
#
class SubItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    extras = models.ManyToManyField(SubExtra, blank=True)

    def __str__(self):
        return f"{self.sub.name}"

#
# Model for a Simple item in an order.
# Rows in this table are simple items in an order, i.e. any type of item that
# has no options.
#
class SimpleItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.PROTECT)

    def __str__(self):
        return f"{self.item.name}"

#
# Model for an Order. One-to-many relationship with OrderItem.
#
class Order(models.Model):
    user = models.ForeignKey(User,  on_delete=models.PROTECT)
    time = models.DateTimeField()

    def __str__(self):
        return f"{self.id} {self.time} {self.user}"

#
# Items that are part of an order.
# Rows in this table are items in an order.
# In each row, leave all ...Item fields blank except one.
#
class OrderItem(models.Model):
    pizzaItem = models.ForeignKey(PizzaItem, blank=True, null=True, on_delete=models.PROTECT)
    subItem = models.ForeignKey(SubItem, blank=True, null=True, on_delete=models.PROTECT)
    simpleItem = models.ForeignKey(SimpleItem, blank=True, null=True, on_delete=models.PROTECT)
    order = models.ForeignKey(Order, on_delete=models.PROTECT, related_name="items")

    def __str__(self):
        return f"{self.pizzaItem} {self.subItem} {self.simpleItem} "
