const orderheading_template = Handlebars.compile(document.querySelector('#orderheading').innerHTML);
const noorders_template = Handlebars.compile(document.querySelector('#noorders').innerHTML);

document.addEventListener('DOMContentLoaded', () => {
  getOrders();
})

function getOrders() {
  const request = new XMLHttpRequest();
  request.open('GET', `/order`);
  request.onload = listOrders;
  csrftoken = Cookies.get('csrftoken');
  request.setRequestHeader("X-CSRFToken", csrftoken);
  request.send();
}

function listOrders(ev) {
  request = ev.target;
  const data = JSON.parse(request.responseText);
  console.log(data);
  orders = document.querySelector("#orderscontent")

  if ( data.orders.length == 0 ) {
    orders.innerHTML = noorders_template();
    return;
  }

  orders.innerHTML = "";
  data.orders.forEach( order => {
    orders.innerHTML += orderheading_template({title: order.time.toLocaleString(), status: order.status});
    orders.innerHTML += createOrderItems(order.items, false);
  });
};
