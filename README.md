# Project 3

Web Programming with Python and JavaScript.

## Overview
This is Antony Whittam's submission for Project 3 of the CS50W Harvard - EdX course. It is an online shopping demo applicatiion for a Pizza and Subs takeaway.

## Demo
...

## Files
In this list to avoid clutter I have omitted the files that are similar in many Django projects. 
It focuses instead on the files that contain code or data specific to this project.

| File               | Dir               | Content/Purpose             |
| -----------------  | ----------------- | --------------------------- |
| db.sqlite3         | .                             | The SQLite database
| *.css              | orders/static                 | Styling for html file of the same name
| *.js               | orders/static                 | Javascript for html file of the same name
| various images     | orders/static                 | Icons and background for various pages 
| base.html          | orders/templates/orders       | Base template. Defines elements used on every page
| base_login.html    | orders/templates/orders       | Template common to every page associated with login
| base_order.html    | orders/templates/orders       | Template with elements for displaying cart and orders
| menu.html          | orders/templates/orders       | Tabbed menu page
| cartview.html      | orders/templates/orders       | View of shopping cart
| ordersview.html    | orders/templates/orders       | User's view of orders
| ordersconfirm.html | orders/templates/orders       | Page to review and confirm an order
| login.html         | orders/templates/registration | Login page
| registration.html  | orders/templates/registration | Registration page
| logged_out.html    | orders/templates/registration | Page displayed after logout

## Main Features
| Feature                                     | Technology                  |
| -----------------------------------------   | --------------------------- |
| Registration/Login/logout                   | Django
| Menu tabs for different product types       | Bootstap nav-pills
| Accordian style menu expansion              | Javascript/CSS/HTML
| Product information storage and retrieval   | Django, Python, SQLite
| Pizza options and price display             | Javascript/CSS/HTML
| Sub options and price display               | Javascript/CSS/HTML
| Add item to cart                            | Javascript, Python, Django
| Display and update cart                     | Javascript, Python, Django
| Checkout                                    | Javascript, Python, Django, SweetAlert2
| Order status display                        | Javascript, Python, Django
| Admin view orders, update status            | Python, Django
| Admin add/delete/update products and prices | Python, Django
| Navigation breadcrumbs                      | Bootstrap breadcrumbs

## My Personal Touch - Order processing
* Admin view of orders and update of order status 
* Users' view of their own orders and status

## Further development
For this demo to actually be useful in the real world it would need the following additional features.

* Viewing and adding products to cart without registration/login
* Registration/Login during the checkout process
* View and edit user profile
* Payment integration
* Email notifications
* Pictures of products
* Estimate of order completion time
