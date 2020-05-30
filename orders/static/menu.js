const menutab_template = Handlebars.compile(document.querySelector('#menutab').innerHTML);
const menudetail_template = Handlebars.compile(document.querySelector('#menudetail').innerHTML);

document.addEventListener('DOMContentLoaded', () => {
  getMenus();
})

function showTab(tabName) {
  // Make all tabs inactive except the selected tab
  document.querySelectorAll('#tabs .nav-link').forEach( item => {
    if ( item.getAttribute("value") == tabName ) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Display the selected tab content and undisplay all the rest
  document.querySelectorAll('.tab-detail').forEach( item => {
    if ( item.getAttribute("value") == tabName ) {
      item.style.display = "inline";
    } else {
      item.style.display = "none";
    }
  });

}

function showItem(itemValue) {
  // Display the selected item content and undisplay all the rest
  document.querySelectorAll('.menu-detail').forEach( item => {
    if ( item.getAttribute("value") == itemValue ) {
      item.style.display = "inline";
    } else {
      item.style.display = "none";
    }
  });
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
    if ( numSelected == 4 ) {
      item.querySelector(".special-warning-4").style.display = "inline";
    }
    if ( numSelected > 5 ) {
      item.querySelector(".special-warning-6").style.display = "inline";
    }
  });
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
        showItem( this.getAttribute("value") );
      };
    });

    // Create item-option onclick listeners
    document.querySelectorAll('.item-option').forEach( option => {
      option.onclick = function() {
        showPizzaPrice(option.closest('.menu-item'));
      };
    });

    // Make first tab active
    showTab(document.querySelector('#tabs .nav-link').getAttribute("Value"));

    // Set the tab onclick listeners
    document.querySelectorAll('#tabs .nav-link').forEach( item => {
      item.onclick = function() {
        showTab( this.getAttribute("value") );
      };
    });
  };
  csrftoken = Cookies.get('csrftoken');
  request.setRequestHeader("X-CSRFToken", csrftoken);
  request.send();
}

