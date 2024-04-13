document.addEventListener("DOMContentLoaded", function() {
    const map = initializeMap();
    addMapBounds(map);
    loadGeoJSON(map)
    
});

function initializeMap() {
    // Initialise et retourne une carte Leaflet centrée avec un zoom initial
    var map = L.map('map', {
        center: [20, 0],
        zoom: 2,
        maxBounds: [[-90, -180], [90, 180]],  // Limite pour ne pas "défiler à l'infini"
        maxBoundsViscosity: 1.0  // Empêche l'utilisateur de se déplacer hors des limites
    });

    // Ajout du fond de carte
    L.esri.basemapLayer('Imagery').addTo(map);
    L.esri.basemapLayer('ImageryLabels').addTo(map);
    return map;
}

function addMapBounds(map) {
    // Empêche la carte de se "boucler" en définissant des limites strictes
    map.on('drag', () => {
        map.panInsideBounds([[-90, -180], [90, 180]], { animate: false });
    });
}

function loadGeoJSON(map) {
    // Charge les données GeoJSON et les ajoute à la carte avec les styles et événements interactifs
    fetch('assets/data/countries.geojson').then(function(response) {
        return response.json();
    }).then(function(geojsonData) {
        L.geoJSON(geojsonData, {
            style: function() {
                return {color: 'grey', weight: 1, fillOpacity: 0.2};
            },
            onEachFeature: addFeatureInteractivity
        }).addTo(map);
    });
}

function addFeatureInteractivity(feature, layer) {
    // Ajoute des événements pour chaque pays pour une interactivité avec la souris
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function highlightFeature(e) {
    // Met en évidence le pays survolé par la souris
    var layer = e.target;
    layer.setStyle({
        weight: 3,
        color: 'grey',
        dashArray: '',
        fillOpacity: 0.7
    });
}

function resetHighlight(e) {
    // Réinitialise le style du pays lorsque la souris le quitte
    e.target.setStyle({
        weight: 1,
        color: 'black',
        fillOpacity: 0
    });
}

function zoomToFeature(e) {
    // Zoom sur le pays cliqué
    e.target._map.fitBounds(e.target.getBounds());
}