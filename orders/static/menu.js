const menutab_template = Handlebars.compile(document.querySelector('#menutab').innerHTML);
const menudetail_template = Handlebars.compile(document.querySelector('#menudetail').innerHTML);
const itemdetail_template = Handlebars.compile(document.querySelector('#itemdetail').innerHTML);

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

    // Set up menu items
    document.querySelectorAll('.menu-detail').forEach( item => {
      // Create menu item detail
      item.innerHTML = itemdetail_template({description: "Add description here" });
    });

    // Create menu item onclick listeners
    document.querySelectorAll('.menu-link').forEach( item => {
      item.onclick = function() {
        showItem( this.getAttribute("value") );
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

