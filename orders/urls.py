from django.urls import path, include

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('accounts/', include('django.contrib.auth.urls')),
    path("accounts/register", views.register, name="register"),
    path("menus", views.menus, name="menus"),
    path("cart", views.cart, name="cart"),
]
