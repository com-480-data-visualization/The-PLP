var map;  // Variable globale pour la carte

document.addEventListener("DOMContentLoaded", function() {
    if (!map) {  // Vérifie si la carte n'a pas encore été initialisée
        map = initializeMap();
        addMapBounds(map);
        document.getElementById('map').style.display = 'block';  // Afficher la carte
    }
});


function initializeMap() {
    var map = L.map('map', {
        center: [20, 0],
        zoom: 2,
        maxBounds: [[-90, -180], [90, 180]],
        maxBoundsViscosity: 1.0,
        worldCopyJump: false
    });

    L.esri.basemapLayer('Imagery').addTo(map);
    return map;
}

function addMapBounds(map) {
    map.on('drag', () => {
        map.panInsideBounds([[-90, -180], [90, 180]], { animate: false });
    });
}
