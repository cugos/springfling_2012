var map = null;

function init(){

map = new OpenLayers.Map({
    div: "map",
    projection: "EPSG:900913",
    displayProjection: "EPSG:4326",
    layers: [
	new OpenLayers.Layer.Google(
            "Google Streets", // the default
            {numZoomLevels: 20}
	),
	new OpenLayers.Layer.Google(
            "Google Physical",
            {type: google.maps.MapTypeId.TERRAIN}
	),
	new OpenLayers.Layer.Google(
            "Google Hybrid",
            {type: google.maps.MapTypeId.HYBRID}
	),
	new OpenLayers.Layer.Google(
            "Google Satellite",
            {type: google.maps.MapTypeId.SATELLITE}
	)
    ],
    controls: [
        new OpenLayers.Control.Navigation(),
        new OpenLayers.Control.PanZoom(),
        new OpenLayers.Control.Attribution()
    ],
    center: [0, 0],
    numZoomLevels: 18
});

var vectorLayer = new OpenLayers.Layer.Vector("Simple Geometry");

var style_green = {
    strokeColor: "#00FF00",
    strokeWidth: 3,
    pointRadius: 6
};


var point = new OpenLayers.Geometry.Point(0,0);
var pointFeature = new OpenLayers.Feature.Vector(point,null,style_green);

vectorLayer.addFeatures([pointFeature]);
map.addLayer(vectorLayer);

var land = new OpenLayers.Layer.WMS(
    "Land",
    "http://springfling_2012.openbasemap.org/cgi-bin/tissot?",
    {
        transparent: 'TRUE',
        layers: 'LAND'
    },
    {'isBaseLayer': false, 'visibility': true, wrapDateLine: true}
);

map.addLayer(land);

var tissot = new OpenLayers.Layer.WMS(
    "Tissot Circles",
    "http://springfling_2012.openbasemap.org/cgi-bin/tissot?",
    {
        transparent: 'TRUE',
        layers: 'TISSOT'
    },
    {'isBaseLayer': false, 'visibility': true, wrapDateLine: true}
);

map.addLayer(tissot);

map.addControl(new OpenLayers.Control.LayerSwitcher());

map.setCenter(new OpenLayers.LonLat(0,0), 2);

}