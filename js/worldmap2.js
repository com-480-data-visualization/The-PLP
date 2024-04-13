document.addEventListener("DOMContentLoaded", function() {
    const map = L.map('map').setView([20, 0], 2); // Réglage de la vue initiale de la carte
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
    }).addTo(map);

    loadGeoJSONAndDisplayFirstCountry(map);
});

function loadGeoJSONAndDisplayFirstCountry(map) {
    // Charge les données GeoJSON et affiche le nom du premier pays dans un popup
    fetch('assets/data/countries.geojson')
        .then(response => response.json())
        .then(geojsonData => {
            if (geojsonData.features.length > 0) {
                const firstFeature = geojsonData.features[0];
                const countryName = firstFeature.properties.ADMIN;
                const coords = firstFeature.geometry.coordinates[0][0][0]; // Suppose MultiPolygon, ajustez si nécessaire

                // Création du marqueur avec un popup
                const marker = L.marker([coords[1], coords[0]]).addTo(map);
                marker.bindPopup(`<b>${countryName}</b>`).openPopup();
            } else {
                console.log("No features found in the GeoJSON data.");
            }
        })
        .catch(error => {
            console.error("Error loading the GeoJSON data: ", error);
        });
}
