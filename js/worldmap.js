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
        maxBoundsViscosity: 1.0,  // Empêche l'utilisateur de se déplacer hors des limites
        worldCopyJump: false // Empêche la carte de se "boucler" lors du défilement
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

function loadGeoJSON(map) {
    // Use D3.js to load GeoJSON data and create a data-driven map layer.
    d3.json('assets/data/countries.geojson').then(function(geojsonData) {
        const ownershipRates = {};  // Placeholder for dynamic data, assume this is filled from another source.

        // Use D3.js for creating a color scale.
        const colorScale = d3.scaleSequential(d3.interpolateBlues)
                             .domain([0, 100]);  // Assume ownership rate per 100 people ranges from 0 to 100

        L.geoJSON(geojsonData, {
            style: function(feature) {
                const rate = ownershipRates[feature.properties.ADMIN] || 0;
                return {
                    color: 'grey',
                    weight: 1,
                    fillColor: colorScale(rate),
                    fillOpacity: 0.0 //permet d'avoir un layyer avant qu'on vienent sur le pays
                };
            },
            onEachFeature: addFeatureInteractivity
        }).addTo(map);
    });
}


function addFeatureInteractivity(feature, layer) {
    // Ajoute des événements pour chaque pays pour une interactivité avec la souris
    layer.on({
        mouseover: function(e) {
            highlightFeature(e);
            showCountryName(e);
        },
        mouseout: function(e) {
            resetHighlight(e);
            if (e.target.getPopup()) {
                e.target.closePopup();  // Ferme le popup lorsque la souris quitte le pays
            }
        },
        click: zoomToFeature
    });
}

function showCountryName(e) {
    var layer = e.target;
    var popup = L.popup({ autoClose: false, closeButton: false })
        .setLatLng(e.latlng)
        .setContent('<div>' + layer.feature.properties.ADMIN + '</div>')
        .openOn(layer._map);
    layer.bindPopup(popup);
}


// Fonction appelée lorsque la souris survole un pays
function highlightFeature(e) {
        layer.setStyle({
            weight: 3,
            color: 'grey',
            fillColor: color,
            fillOpacity: 0.7,
            dashArray: ''
        });
}


function resetHighlight(e) {
    // Réinitialise le style du pays lorsque la souris le quitte
    e.target.setStyle({
        weight: 1,
        color: 'grey', // Couleur de la bordure apres le survol
        fillOpacity: 0
    });
}

function zoomToFeature(e) {
    // Zoom sur le pays cliqué
    var map = e.target._map;
    map.fitBounds(e.target.getBounds());

    // Afficher les informations du pays
    displayCountryInfo(e.target.feature.properties.ADMIN);
}

function displayCountryInfo(countryName) {
    d3.json('assets/data/gun-ownership-by-country-2024.json').then(ownershipData => {
        const ownership = ownershipData.find(d => d.country === countryName) || {};

        d3.json('assets/data/gun-deaths-by-country-2024.json').then(deathData => {
            const deaths = deathData.find(d => d.country === countryName) || {};

            const infoHtml = `
            <h2>${countryName}</h2>
            <div>Number of firearms in circulation: ${ownership.gunOwnershipByCountry_firearms || 'Data not available'}</div>
            <div>Ownership rate per 100 people: ${ownership.gunOwnershipByCountry_per100 || 'Data not available'}</div>
            <div>Gun-related deaths (Total 2024): ${deaths.GunDeathsAllCausesTotal2019 || 'Data not available'}</div>
            <div>Gun-related death rate (per 100k, 2024): ${deaths.GunDeathsViolentRatePer100k2019 || 'Data not available'}</div>
            `;

            document.getElementById('info-content').innerHTML = infoHtml;
            openInfoPanel();
        });
    }).catch(error => {
        console.error('Error loading the data: ', error);
    });
}

function openInfoPanel() {
    document.getElementById('info-panel').classList.add('open');
}

function closeInfoPanel() {
    document.getElementById('info-panel').classList.remove('open');
}

window.addEventListener('resize', function() {
    map.invalidateSize(); // Ajuste la carte Leaflet à la nouvelle taille de conteneur après les changements de taille.
});













