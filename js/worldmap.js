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
    L.esri.basemapLayer('ImageryClarity').addTo(map);
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
        color: 'purple',
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
    Promise.all([
        fetch('assets/data/gun-ownership-by-country-2024.json').then(res => res.json()),
        fetch('assets/data/gun-deaths-by-country-2024.json').then(res => res.json())
    ]).then(data => {
        const ownershipData = data[0].find(d => d.country === countryName);
        const deathData = data[1].find(d => d.country === countryName);

        const infoHtml = `
            <h2>${countryName}</h2>
            <div>Nombre d'armes en circulation: ${ownershipData ? ownershipData.gunOwnershipByCountry_firearms : 'Data not available'}</div>
            <div>Taux de propriété par 100 personnes: ${ownershipData ? ownershipData.gunOwnershipByCountry_per100 : 'Data not available'}</div>
            <div>Morts par armes à feu (Total 2024): ${deathData ? deathData.GunDeathsAllCausesTotal2019 : 'Data not available'}</div>
            <div>Taux de mortalité par armes à feu (pour 100k, 2024): ${deathData ? deathData.GunDeathsViolentRatePer100k2019 : 'Data not available'}</div>
        `;
        document.getElementById('info-content').innerHTML = infoHtml;
        openInfoPanel();
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
