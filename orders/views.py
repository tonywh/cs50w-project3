from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login

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
    cart, created = Order.objects.get_or_create(user=request.user, time__isnull=True)
    if request.method == "POST":
        product = request.POST.get("product","")
        options = request.POST.get("options","")
        price = request.POST.get("price","")
        OrderItem.objects.create(product=product, options=options, price=price, order=cart );
    data = { "Items": list(OrderItem.objects.filter(order=cart).values()) }
    return JsonResponse(data, safe=False)
