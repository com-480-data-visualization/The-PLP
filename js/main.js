document.addEventListener("DOMContentLoaded", function() {
    var bannerHeight = document.querySelector('.banner').offsetHeight; // Get the actual height of the banner
    var map = document.getElementById('map');
    map.style.height = `calc(100vh - ${bannerHeight}px)`; // Set the map height dynamically
});
