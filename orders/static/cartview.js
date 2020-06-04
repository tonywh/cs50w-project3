const cartitems_template = Handlebars.compile(document.querySelector('#cartitems').innerHTML);
const cartempty_template = Handlebars.compile(document.querySelector('#cartempty').innerHTML);

document.addEventListener('DOMContentLoaded', () => {
  getCart();
})

function getCart() {
  const request = new XMLHttpRequest();
  request.open('GET', `/cart`);
  request.onload = listCart;
  csrftoken = Cookies.get('csrftoken');
  request.setRequestHeader("X-CSRFToken", csrftoken);
  request.send();
}

function updateQty(e) { 
  const request = new XMLHttpRequest();
  request.open('POST', `/cart`);
  request.onload = listCart;
  csrftoken = Cookies.get('csrftoken');
  request.setRequestHeader("X-CSRFToken", csrftoken);
  const data = new FormData();
  data.append('qty', e.path[0].qty.value);
  data.append('id', e.path[0].id.value);
  request.send(data);
  return false;
};

function listCart(ev) {
  request = ev.target;
  const data = JSON.parse(request.responseText);
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  cart = document.querySelector("#cartcontent")

  if ( data.items.length == 0 ) {
    cart.innerHTML = cartempty_template();
    return;
  }

  // Create items
  total = 0;
  data.items.forEach( item => {
    subtotal = parseFloat(item.price) * parseFloat(item.quantity);
    item.total = formatter.format(subtotal);
    total += subtotal;
  });
  cart.innerHTML = cartitems_template({items: data.items, total: formatter.format(total) });

  document.querySelectorAll(".quantity").forEach( quantity => {

    // Make update buttons visible on qty change
    quantity.querySelector(".qty").oninput = (e) => { 
      update = e.path[2].querySelector(".update");
      if (e.path[0].value == "" || e.path[0].value == e.path[0].dataset.qty) {
        update.style.visibility = "hidden";
      } else {
        update.style.visibility = "visible";
      }
    };

    // Set submit action for update buttons
    quantity.querySelector(".update-qty").onsubmit = updateQty;
  });

  // Set checkout action for the Checkout button
  document.querySelector("#checkout").onclick = checkout;
};

function checkout() {
  total = document.querySelector("#carttotal").innerHTML;
  Swal.fire({
    title: 'Checkout',
    text: 'Place order now? Cost ' + total,
    allowOutsideClick: false,
    showCancelButton: true,
    confirmButtonText: "Confirm",
  }).then((status) => {
    console.log(confirm);
    if (status.isConfirmed) {
      const request = new XMLHttpRequest();
      request.open('POST', `/order`);
      request.onload = () => {
        const data = JSON.parse(request.responseText);
        Swal.fire(
          'Thank you.',
          'Your order number is ' + data.orderId.toString() + '.',
          'success'
        ).then(() => {
          window.location.href = '/';
        });
      };
      csrftoken = Cookies.get('csrftoken');
      request.setRequestHeader("X-CSRFToken", csrftoken);
      request.send();
    }
  });
}
