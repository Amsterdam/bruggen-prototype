var projectionExtent = [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999]
var projection = new ol.proj.Projection({
  code: 'EPSG:28992',
  units: 'm',
  extent: projectionExtent
})

var cqlFilter = '%3CFilter%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3Eopr_type%3C%2FPropertyName%3E%3CLiteral%3EKunstwerk%3C%2FLiteral%3E%3C%2FPropertyIsEqualTo%3E%3C%2FFilter%3E'

var wfsUrl = 'https://map.data.amsterdam.nl/maps/bag?request=GetFeature' +
  '&service=WFS&version=2.0.0&typeName=ms:openbareruimte&outputFormat=geojson' +
  '&srsName=EPSG:28992' +
  '&filter=' + cqlFilter

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      opacity: 1,
      source: new ol.source.XYZ({
        url: 'https://t1.data.amsterdam.nl/topo_rd/{z}/{x}/{-y}.png',
        matrixSet: 'EPSG:28992',
        projection: projection,
        wrapX: false
      })
    }),
    new ol.layer.Vector({
      source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: function (extent) {
          return wfsUrl
            // '&bbox=' + extent.join(',') + ',EPSG:28992'
        },
        strategy: ol.loadingstrategy.bbox
      }),
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'rgba(250, 154, 20, 1.0)',
          width: 5
        })
      })
    })
  ],
  view: new ol.View({
    minZoom: 7,
    maxZoom: 17,
    projection: projection,
    center: [121836, 487325],
    zoom: 9
  })
})
