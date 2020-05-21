document.addEventListener('DOMContentLoaded', () => {

  // Make first tab active
  showTab(document.querySelector('.nav-tabs .nav-link').getAttribute("Value"));

  // Set the tab onclick listeners
  document.querySelectorAll('.nav-tabs .nav-link').forEach( item => {
    item.onclick = function() {
      showTab( this.getAttribute("value") );
    };
  });

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

  // Display the selecte tab content and undisplay all the rest
  document.querySelectorAll('.menu-detail').forEach( item => {
    if ( item.getAttribute("value") == tabName ) {
      item.style.display = "inline";
    } else {
      item.style.display = "none";
    }
  });

}