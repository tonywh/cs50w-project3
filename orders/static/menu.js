const menutab_template = Handlebars.compile(document.querySelector('#menutab').innerHTML);
const menudetail_template = Handlebars.compile(document.querySelector('#menudetail').innerHTML);

document.addEventListener('DOMContentLoaded', () => {
  getMenus();
})

function showTab(name) {
  // Make all tabs inactive except the selected tab
  document.querySelectorAll('#tabs .nav-link').forEach( item => {
    if ( item.dataset.name == name ) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Display the selected tab content and undisplay all the rest
  document.querySelectorAll('.tab-detail').forEach( item => {
    if ( item.dataset.name == name ) {
      item.style.display = "inline";
    } else {
      item.style.display = "none";
    }
  });

}

function showItem(name) {
  // Display the selected item content and undisplay all the rest
  document.querySelectorAll('.menu-detail').forEach( item => {
    if ( item.dataset.name == name ) {
      item.style.display = "inline";
    } else {
      item.style.display = "none";
    }
  });

  // Display the selected item Add to Cart button
  document.querySelectorAll('.menu-item').forEach( item => {
    if ( item.dataset.name == name ) {
      item.querySelector('button').style.display = "inline";
    } else {
      item.querySelector('button').style.display = "none";
    }
  });
  document.querySelector
}

// input: escaped HTML
// return: raw HTML
function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

function showPizzaPrice(item) {
  numSelected = getNumOptionsSelected(item);
  item.querySelectorAll(".menu-price").forEach( price => {
    if ( price.dataset.count == numSelected ) {
      price.style.display = "inline";
    } else {
      price.style.display = "none";
    }
    item.querySelector(".special-warning-4").style.display = "none";
    item.querySelector(".special-warning-6").style.display = "none";
    item.querySelector('button').disabled = false;
    if ( numSelected == 4 ) {
      item.querySelector(".special-warning-4").style.display = "inline";
      item.querySelector('button').disabled = true;
    }
    if ( numSelected > 5 ) {
      item.querySelector(".special-warning-6").style.display = "inline";
      item.querySelector('button').disabled = true;
    }
  });
}

function showSubsPrice(item) {
  priceElement = item.querySelector(".menu-price");
  price = parseFloat(priceElement.dataset.price);
  item.querySelectorAll(".item-option").forEach( option => {
    if ( option.checked == true ) {
      price += parseFloat(option.dataset.price);
    }
  });
  priceElement.innerHTML = price.toFixed(2);
}

function getNumOptionsSelected(item) {
  count = 0;
  item.querySelectorAll(".item-option").forEach( option => {
    if ( option.checked == true ) {
      count++;
    }
  });

  return count;
}

function addPizzaToCart(item) {
  product = item.dataset.order;
  options = "cheese only";
  count = 0;
  item.querySelectorAll(".item-option").forEach( option => {
    if ( option.checked == true ) {
      if ( count == 0 ) {
        options = "";
      } else {
        options += ", ";
      }
      options += option.dataset.name;
      count++;
    }
  });
  item.querySelectorAll(".menu-price").forEach( menuprice => {
    if ( menuprice.style.display != "none" ) {
      price = menuprice.innerHTML;
    }
  });
  addToCart(product, options, price);
}

function addSubToCart(item) {
  product = item.dataset.order;
  options = "";
  count = 0;
  item.querySelectorAll(".item-option").forEach( option => {
    if ( option.checked == true ) {
      if ( count == 0 ) {
        options = "+ ";
      } else {
        options += ", ";
      }
      options += option.dataset.name;
      count++;
    }
  });
  item.querySelectorAll(".menu-price").forEach( menuprice => {
    if ( menuprice.style.display != "none" ) {
      price = menuprice.innerHTML;
    }
  });
  addToCart(product, options, price);
}

function addProductToCart(item) {
  product = item.dataset.order;
  options = "";
  price = item.querySelector(".menu-price").innerHTML;
  addToCart(product, options, price);
}

function addToCart(product, options, price) {
  console.log( product + ": " + options + ": " + price );
  const request = new XMLHttpRequest();
  request.open('POST', `/cart`);
  csrftoken = Cookies.get('csrftoken');
  request.setRequestHeader("X-CSRFToken", csrftoken);
  const data = new FormData();
  data.append('product', product);
  data.append('options', options);
  data.append('price', price);
  request.send(data);
}

function getMenus() {
  const request = new XMLHttpRequest();
  request.open('POST', `/menus`);
  request.onload = () => {
    const data = JSON.parse(request.responseText);
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    // Create tabs
    tabs = document.querySelector("#tabs")
    tabs.innerHTML = "";
    data.menus.forEach( menu => {
      tabs.innerHTML += menutab_template({name: menu.name});
    });

    // Create menus
    detail = document.querySelector("#tabs-detail")
    detail.innerHTML = "";
    data.menus.forEach( menu => {
      detail.innerHTML += menudetail_template({name: menu.name, items: data[menu.name] });
    });

    // Unescape the menu item descriptions
    document.querySelectorAll('.menu-description').forEach( item => {
      item.innerHTML = htmlDecode(item.innerHTML);
    });
    
    // Create menu item onclick listeners
    document.querySelectorAll('.menu-link').forEach( item => {
      item.onclick = function() {
        showItem( this.dataset.name );
      };
    });

    // Create item-option onclick listeners
    // and Add to Cart button onclick listeners
    document.querySelectorAll('.tab-detail').forEach( menu => {

      if ( menu.dataset.name == "Pizza" ) {
        menu.querySelectorAll('.item-option').forEach( option => {
          option.onclick = function() {
            showPizzaPrice(option.closest('.menu-item'));
          };
        });
        menu.querySelectorAll('button').forEach( option => {
          option.onclick = function() {
            addPizzaToCart(option.closest('.menu-item'));
          };
        });
      } else if ( menu.dataset.name == "Subs" ) {
        menu.querySelectorAll('.item-option').forEach( option => {
          option.onclick = function() {
            showSubsPrice(option.closest('.menu-item'));
          };
        });
        menu.querySelectorAll('button').forEach( option => {
          option.onclick = function() {
            addSubToCart(option.closest('.menu-item'));
          };
        });
      } else {
        menu.querySelectorAll('button').forEach( option => {
          option.onclick = function() {
            addProductToCart(option.closest('.menu-item'));
          };
        });
      }
    });

    // Make first tab active
    showTab(document.querySelector('#tabs .nav-link').dataset.name);

    // Set the tab onclick listeners
    document.querySelectorAll('#tabs .nav-link').forEach( item => {
      item.onclick = function() {
        showTab( this.dataset.name );
      };
    });
  };
  csrftoken = Cookies.get('csrftoken');
  request.setRequestHeader("X-CSRFToken", csrftoken);
  request.send();
}

