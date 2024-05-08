var map;  // Variable globale pour la carte

document.addEventListener("DOMContentLoaded", function() {
    map = initializeMap();
    addMapBounds(map);
    loadGeoJSON(map);
    loadData();  // Charger les données de dangerosité des pays
});

function initializeMap() {
    if (map) return map;  // Prévenir l'initialisation multiple de la carte
    map = L.map('map', {
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

function loadGeoJSON(map) {
    d3.json('assets/data/countries.geojson').then(function(geojsonData) {
        const ownershipRates = {};  // Placeholder for dynamic data
        L.geoJSON(geojsonData, {
            style: function(feature) {
                const rate = ownershipRates[feature.properties.ADMIN] || 0;
                return {
                    color: 'grey',
                    weight: 1,
                    fillColor: getColorForDangerRate(rate),
                    fillOpacity: 0.0  // Initialement transparent
                };
            },
            onEachFeature: addFeatureInteractivity
        }).addTo(map);
    });
}

function addFeatureInteractivity(feature, layer) {
    layer.on({
        mouseover: function(e) {
            highlightFeature(e);
            showCountryName(e);
        },
        mouseout: function(e) {
            resetHighlight(e);
            if (e.target.getPopup()) {
                e.target.closePopup();
            }
        },
        click: zoomToFeature
    });

}

function highlightFeature(e) {
    var layer = e.target;
    var countryName = layer.feature.properties.ADMIN;
    var dangerRate = countryDataMap.get(countryName) || 0;
    layer.setStyle({
        weight: 3,
        color: 'grey',
        fillColor: getColorForDangerRate(dangerRate),
        fillOpacity: dangerRate ? 0.7 : 0
    });
}

function showCountryName(e) {
    var layer = e.target;
    var countryName = layer.feature.properties.ADMIN;
    var dangerRate = countryDataMap.get(countryName) || 0;
    var color = getColorForDangerRate(dangerRate);
    var popupContent = `<div>${countryName}<br>Danger Level: ${dangerRate ? `<span style="color:${color};">${dangerRate.toFixed(2)}</span>` : 'Data not available'}</div>`;
    var popup = L.popup({ autoClose: false, closeButton: false })
        .setLatLng(e.latlng)
        .setContent(popupContent)
        .openOn(layer._map);
    layer.bindPopup(popup);
}

function resetHighlight(e) {
    e.target.setStyle({
        weight: 1,
        color: 'grey',
        fillOpacity: 0
    });
}

function zoomToFeature(e) {
    var map = e.target._map;
    map.fitBounds(e.target.getBounds());
    displayCountryInfo(e.target.feature.properties.ADMIN);
}


function displayCountryInfo(countryName) {
    d3.csv('assets/data/full.csv').then(data => {
        const countryData = data.find(d => d.country === countryName) || {};

        const flagUrl = countryData.image_url;
        const infoHtml = `
        <div class="info-header">
        <h2>${countryName} <img src="${flagUrl}" alt="flag" style="height: 1.5em;"></h2>

        </div>
        <div class="info-content-item highlighted"> ${countryData.alpha2 || 'Data not available'}</div>
        <div class="info-content-item">Number of firearms in circulation: ${countryData.gunOwnershipByCountry_firearms || 'Data not available'}</div>
            <div class="info-content-item">Ownership rate per 100 people: ${countryData.gunOwnershipByCountry_per100 || 'Data not available'}</div>
            <div class="info-content-item">Gun-related deaths (Total 2024): ${countryData.GunDeathsAllCausesTotal2019 || 'Data not available'}</div>
            <div class="info-content-item">Gun-related death rate (per 100k, 2024): ${countryData.GunDeathsViolentRatePer100k2019 || 'Data not available'}</div>
        `;
        document.getElementById('info-content').innerHTML = infoHtml;
        openInfoPanel();
    }).catch(error => {
        console.error('Error loading the data: ', error);
    });
}

function openInfoPanel() {
    document.getElementById('info-panel').classList.add('open');
    document.getElementById('map').style.marginRight = "33%"; // Shift map to the right when the panel is open
    if (map) map.invalidateSize(); // Leaflet method to adjust the map size dynamically
}

function closeInfoPanel() {

    document.getElementById('info-panel').classList.remove('open');
    document.getElementById('map').style.width = "100%";
    document.getElementById('map').style.marginRight = "0"; // Reset map position when the panel is closed
    if (map) map.invalidateSize();
}


window.addEventListener('resize', function() {
    if (map) map.invalidateSize();
});

// Échelle de couleurs et données par pays
let countryDataMap = new Map();
const colorScale = d3.scaleLinear()
    .domain([0, 0.28, 0.78, 2.47, 10, 20, 36.78])
    .range(['green', 'rgb(205, 187, 50)', 'orange', 'red', 'purple', 'darkred', 'black']);

function loadData() {
    d3.json('assets/data/gun-deaths-by-country-2024.json').then(data => {
        data.forEach(item => {
            countryDataMap.set(item.country, item.GunDeathsViolentRatePer100k2019);
        });
    }).catch(error => {
        console.error('Error loading the gun death rates data: ', error);
    });
}

function getColorForDangerRate(rate) {
    if (rate === 0) {
        return 'transparent';
    }
    return colorScale(rate);
}
