from django.db import models

class User(models.Model):
    first = models.CharField(max_length=64)
    last = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.id} {self.first} {self.last}"

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name="orders")
    time = models.DateTimeField()

    def __str__(self):
        return f"{self.id} {self.time} {self.user}"

class Option(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return f"{self.name}"

class OptionValue(models.Model):
    name = models.CharField(max_length=128)
    option = models.ForeignKey(Option, on_delete=models.PROTECT, related_name='values')    # the option it belongs to
    visibleOptions = models.IntegerField()      # number of additional option fields this value should make visible
                                                # blank means all
    def __str__(self):
        return f"{self.name} for option {self.option}, visisble options: {self.visibleOptions}"

class Product(models.Model):
    name = models.CharField(max_length=128)
    price = models.FloatField()
    options = models.ManyToManyField(Option, blank=True)

    def __str__(self):
        return f"{self.name} {self.price}"

class OptionPrice(models.Model):
    price = models.FloatField()
    optionValue = models.ForeignKey(OptionValue, on_delete=models.PROTECT, related_name='optionPrice')
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='optionPrice')

    def __str__(self):
        return f"{self.optionValue} {self.price} for product {self.product}"

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name="orders")
    optionsValue = models.ManyToManyField(OptionValue, blank=True)
    order = models.ForeignKey(Order, on_delete=models.PROTECT, related_name="items")

    def __str__(self):
        return f"{self.product}"

