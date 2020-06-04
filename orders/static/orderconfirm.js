const confirm_template = Handlebars.compile(document.querySelector('#confirm').innerHTML);

document.addEventListener('DOMContentLoaded', () => {
  getConfirmCart();
})

function getConfirmCart() {
  const request = new XMLHttpRequest();
  request.open('GET', `/cart`);
  request.onload = listCart;
  csrftoken = Cookies.get('csrftoken');
  request.setRequestHeader("X-CSRFToken", csrftoken);
  request.send();
}

function listCart(ev) {
  request = ev.target;
  const data = JSON.parse(request.responseText);
  console.log(data);
  cart = document.querySelector("#cartcontent")
  cart.innerHTML = createOrderItems(data.items, false);
  cart.innerHTML += confirm_template();

  // Set buy action for the confirm button
  document.querySelector("#confirmbtn").onclick = buynow;
}

function buynow() {
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
