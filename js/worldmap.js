var map;  // Variable globale pour la carte
let showDangerosity = false;
const dangerLevelScale = d3.scaleThreshold()
    .domain([0.28, 0.78, 2.47, 10, 20, 36.78]) // same as the colorScale domain, but without the first element
    .range(['Very Low', 'Low', 'Medium', 'High', 'Very High', 'Extreme', 'Maximal']);
    


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
        zoom: 2.17,
        minZoom: 2.17,  // This line was added
        maxBounds: [[-90, -180], [90, 180]],
        maxBoundsViscosity: 0.2,
        worldCopyJump: true
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
    d3.json('../assets/data/basic_dataset/countries.geojson').then(function(geojsonData) {

        const countriesLayer = L.geoJSON(geojsonData, {
            style: featureStyle,
            onEachFeature: addFeatureInteractivity
        }).addTo(map);

        document.getElementById("btn-danger").addEventListener("click", function() {
            showDangerosity = !showDangerosity;
            countriesLayer.eachLayer(layer => {
                layer.setStyle(featureStyle(layer.feature));
            });
        });
    });
}

function featureStyle(feature) {
    const countryName = feature.properties.ADMIN;
    const rate = showDangerosity ? (countryDataMap.get(countryName) || 0) : 0;

    return {
        color: 'grey',
        weight: 1,
        fillColor: getColorForDangerRate(rate),
        fillOpacity: showDangerosity ? (rate ? 0.7 : 0) : 0
    };
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

function highlightFeature(e) {
    var layer = e.target;
    var countryName = layer.feature.properties.ADMIN;
    var dangerRate = countryDataMap.get(countryName) || 0;
    var fillOpacity = showDangerosity ? 0.7 : dangerRate ? 0.7 : 0;
    layer.setStyle({
        weight: 3,
        color: 'grey',
        fillColor: getColorForDangerRate(dangerRate),
        fillOpacity: fillOpacity
    });
}

function resetHighlight(e) {
    var layer = e.target;
    var countryName = layer.feature.properties.ADMIN;
    var dangerRate = countryDataMap.get(countryName) || 0;
    var fillOpacity = showDangerosity ? (dangerRate ? 0.7 : 0) : 0;
    layer.setStyle({
        weight: 1,
        color: 'grey',
        fillColor: getColorForDangerRate(dangerRate),
        fillOpacity: fillOpacity
    });
}


function zoomToFeature(e) {
    var map = e.target._map;
    map.fitBounds(e.target.getBounds());
    displayCountryInfo(e.target.feature.properties.ADMIN);
}


function displayCountryInfo(countryName) {
    d3.csv('../assets/data/computed_dataset/full_dataset.csv').then(data => {
        const countryData = data.find(d => d.country === countryName) || {};
        const flagUrl = countryData.image_url;
        var dangerRate = countryDataMap.get(countryName) || 0;
        var fillColor = getColorForDangerRate(dangerRate)
        var danger = dangerLevelScale(dangerRate)
        const infoHtml = `
        <div class="info-header">
            <h2>${countryData.alpha2}</h2>
            <img src="${flagUrl}" alt="flag">
        </div>
        <div class="info-content-item name">
            ${countryName|| 'Data not available'}
        </div>
        <div class="info-content-item">
            <span class="label">Capital:</span>
            <span class="value" style="float: right;">${countryData.CAPITALE   || 'Data not available'}</span>
        </div>
        <div class="info-content-item">
            <span class="label">Population:</span>
            <span class="value" style="float: right;">${parseInt(countryData.population).toLocaleString('de-CH')  || 'Data not available'}</span>
        </div>
        <div class="info-content-item">
            <span class="label">Danger level:</span>
            <div class="danger-box">
                <span class="value" style="padding: 10px;border: 5px solid ${fillColor}; float: right; color: ${fillColor}">${danger || 'Data not available'}</span>
            </div>
        </div>


        <div class="info-content-item">
            <span class="label">Guns death per 100k person:</span>
            <span class="value" style="float: right;">${countryData.GunDeathsViolentRatePer100k2019  || 'Data not available'}</span>
        </div>
        <div class="info-content-item">
            <span class="label">Number of firearms:</span>
            <span class="value" style="float: right;">${parseInt(countryData.gunOwnershipByCountry_firearms).toLocaleString('de-CH') || 'Data not available'}</span>
        </div>
        <div class="info-content-item">
            <span class="label">Ownership rate per 100K people:</span>
            <span class="value" style="float: right;">${countryData.gunOwnershipByCountry_per100 || 'Data not available'}</span>
        </div>
        <div class="info-content-item">
            <span class="label">Gun-related deaths:</span>
            <span class="value" style="float: right;">${parseInt(countryData.GunDeathsAllCausesTotal2019).toLocaleString('de-CH') || 'Data not available'}</span>
        </div>
    
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

// Échelle de couleurs et données par pays
let countryDataMap = new Map();
const colorScale = d3.scaleLinear()
    .domain([0, 0.28, 0.78, 2.47, 10, 20, 36.78])
    .range(['green', 'rgb(205, 187, 50)', 'orange', 'red', 'purple', 'darkred', 'black']);

function loadData() {
    d3.json('../assets/data/basic_dataset/gun-deaths-by-country-2024.json').then(data => {
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
