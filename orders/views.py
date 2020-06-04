from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login
from datetime import datetime

from .models import Order, OrderItem, Pizza, PizzaTopping, Sub, Product, SubExtra, Category

def index(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect("accounts/login")
    context = {
        "user": request.user
    }
    return render(request, "orders/menu.html", context)

def register(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return HttpResponseRedirect("/")
    else:
        form = UserCreationForm()

    return render(request, "registration/register.html", {'form': form})

def menus(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect("accounts/login")
    if request.method == "GET":
        raise Http404("Page does not exist")
    categories = Category.objects.order_by("display_order").values()
    data = { "menus": list(categories)}

    for menu in data["menus"]:
        if menu["name"] == "Pizza":
            data[menu["name"]] = getPizzaDetails()
        elif menu["name"] == "Subs":
            data[menu["name"]] = getSubsDetails()
        else:
            data[menu["name"]] = getProductDetails(menu["name"])
    return JsonResponse(data, safe=False)

def getPizzaDetails():
    result = list(Pizza.objects.values())
    toppings = list(PizzaTopping.objects.values())
    for item in result:
        item["options"] = toppings
    return result

def getSubsDetails():
    result = list(Sub.objects.values())
    extras = list(SubExtra.objects.values())
    for item in result:
        item["options"] = extras
    return result

def getProductDetails(category):
    return list(Product.objects.filter(categories__name=category).values())

def cart(request):
    cart, created = Order.objects.get_or_create(user=request.user, status=Order.CART)
    if request.method == "POST":
        # POST should be with product, options and price
        # or with qty and id.
        # Try to get them all then test which succeeded.
        product = request.POST.get("product")
        options = request.POST.get("options")
        price = request.POST.get("price")
        qty = request.POST.get("qty")
        id = request.POST.get("id")
        if product and price:
            # Add new item
            OrderItem.objects.create(product=product, options=options, quantity= 1, price=price, order=cart )
        elif id:
            # Change item quantity
            item = OrderItem.objects.get(id=id)
            if (item):
                if (qty=="0"):
                    item.delete()
                else:
                    item.quantity = qty
                    item.save()

    # return the cart
    data = { "items": list(OrderItem.objects.filter(order=cart).values()) }
    return JsonResponse(data, safe=False)

def cartview(request):
    context = {
        "user": request.user
    }
    return render(request, "orders/cartview.html", context)

def order(request):
    if request.method == "POST":
        cart = Order.objects.get(user=request.user, status=Order.CART)
        cart.time = datetime.now()
        cart.status = Order.QUEUED
        cart.save()
        data = { "orderId": cart.id }
        return JsonResponse(data, safe=False)
