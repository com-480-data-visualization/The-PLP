document.addEventListener("DOMContentLoaded", function() {
    const map = initializeMap();
    addMapBounds(map);
    
});

function initializeMap() {
    // Initialise et retourne une carte Leaflet centrée avec un zoom initial
    var map = L.map('map', {
        center: [20, 0],
        zoom: 2,
        maxBounds: [[-90, -180], [90, 180]],  // Limite pour ne pas "défiler à l'infini"
        maxBoundsViscosity: 1.0,  // Empêche l'utilisateur de se déplacer hors des limites
        worldCopyJump: false, // Empêche la carte de se "boucler" lors du défilement
        zoomControl: false, // Hide the zoom control
    });

    // Ajout du fond de carte
    L.esri.basemapLayer('Imagery').addTo(map);
    //L.esri.basemapLayer('ImageryLabels').addTo(map);

    
    return map;
}


function addMapBounds(map) {
    // Empêche la carte de se "boucler" en définissant des limites strictes
    map.on('drag', () => {
        map.panInsideBounds([[-90, -180], [90, 180]], { animate: false });
    });
}
