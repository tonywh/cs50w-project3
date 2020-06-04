const orderitems_template = Handlebars.compile(document.querySelector('#orderitems').innerHTML);

function createOrderItems(items, change) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  total = 0;
  items.forEach( item => {
    subtotal = parseFloat(item.price) * parseFloat(item.quantity);
    item.total = formatter.format(subtotal);
    total += subtotal;
  });
  return orderitems_template({items: items, total: formatter.format(total), change: change});
}
