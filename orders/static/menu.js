const menutab_template = Handlebars.compile(document.querySelector('#menutab').innerHTML);
const menudetail_template = Handlebars.compile(document.querySelector('#menudetail').innerHTML);

document.addEventListener('DOMContentLoaded', () => {
  getMenus();
})

function showTab(tabName) {
  // Make all tabs inactive except the selected tab
  document.querySelectorAll('.nav-tabs .nav-link').forEach( item => {
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

function getMenus() {
  const request = new XMLHttpRequest();
  request.open('POST', `/menus`);
  request.onload = () => {
    const data = JSON.parse(request.responseText);

    // Create tabs
    tabs = document.querySelector("#tabs")
    tabs.innerHTML = "";
    console.log(data);
    data.forEach( menu => {
      tabs.innerHTML += menutab_template({name: menu.name});
    });

    // Create menus
    detail = document.querySelector("#tabs-detail")
    detail.innerHTML = "";
    data.forEach( menu => {
      detail.innerHTML += menudetail_template({name: menu.name, items: menu.items});
    });

    // Make first tab active
    showTab(document.querySelector('.nav-tabs .nav-link').getAttribute("Value"));

    // Set the tab onclick listeners
    document.querySelectorAll('.nav-tabs .nav-link').forEach( item => {
      item.onclick = function() {
        showTab( this.getAttribute("value") );
      };
    });
  };
  csrftoken = Cookies.get('csrftoken');
  request.setRequestHeader("X-CSRFToken", csrftoken);
  request.send();
}

