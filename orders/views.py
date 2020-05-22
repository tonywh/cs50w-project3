from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login

from .models import Order, OrderItem, PizzaItem, SubItem, SimpleItem, Pizza, PizzaTopping, Sub, Product, SubExtra, Category

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
    return list(Pizza.objects.values())

def getSubsDetails():
    return list(Sub.objects.values())

def getProductDetails(category):
    return list(Product.objects.filter(categories__name=category).values())
