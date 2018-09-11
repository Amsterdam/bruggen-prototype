var map = L.map('map').setView([52.367, 4.915], 13)

const tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>';


L.tileLayer(tileUrl, {
  minZoom: 9,
	maxZoom: 20,
  attribution
}).addTo(map)

function getWfsUrl() {
  return 'https://map.data.amsterdam.nl/maps/bag\?request\=GetFeature\&service\=WFS\&version\=2.0.0\&typeName\=ms:openbareruimte\&outputFormat\=geojson\&srsName\=EPSG:4326\&Filter=%3CFilter%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3Eopr_type%3C%2FPropertyName%3E%3CLiteral%3EKunstwerk%3C%2FLiteral%3E%3C%2FPropertyIsEqualTo%3E%3C%2FFilter%3E'
}

var bridgeStyle = {
  color: '#ff4300',
  weight: 5,
  opacity: 0.9
}

function onEachFeature(feature, layer) {

}

fetch(getWfsUrl())
  .then((response) => {
    return response.json()
  })
  .then((geojson) => {
    L.geoJSON(geojson, {
      style: bridgeStyle,
      onEachFeature: onEachFeature
    }).addTo(map)
  })
