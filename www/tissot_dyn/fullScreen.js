var map = null;

function init(){
Proj4js.defs["EPSG:3157"] = "+proj=utm +zone=10 +ellps=GRS80 +units=m +no_defs";
Proj4js.defs["EPSG:2856"] = "+proj=lcc +lat_1=47.33333333333334 +lat_2=45.83333333333334 +lat_0=45.33333333333334 +lon_0=-120.5 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs";

projs = {
	'EPSG:32610': {
	    maxResolution: ((11107477 * 2.0) / 256.0),
	    maxExtent: new OpenLayers.Bounds(-11107477,-11107477,11107477,11107477),
	    units: 'm'
	},
	'EPSG:2856': {
	    maxResolution: ((781043.7173 - 187754.6365) / 256.0),
	    maxExtent: new OpenLayers.Bounds(187754.6365, 30497.7688, 781043.7173, 259585.0321),
	    units: 'm'
	}
};

proj_we_want = 'EPSG:2856';

map = new OpenLayers.Map({
    div: "map",
    projection: proj_we_want,
    displayProjection: "EPSG:4326",
    // maxExtent: new OpenLayers.Bounds(-3500000, -3500000, 3500000, 3500000),
    // maxResolution: (3500000 * 2.0 / 256.0),
    // units: 'm',
	
	maxResolution: projs[proj_we_want].maxResolution,
	maxExtent: projs[proj_we_want].maxExtent,
	units: projs[proj_we_want].units,
    layers: [
		new OpenLayers.Layer.WMS(
		    "Land",
		    "http://springfling_2012.openbasemap.org/cgi-bin/tissot?",
		    {
		        transparent: 'TRUE',
		        layers: 'LAND'
		    },
		    {'isBaseLayer': true, 'visibility': true, wrapDateLine: false }
		),
	    new OpenLayers.Layer.WMS(
	       "Tissot Circles",
	    	   	       "http://springfling_2012.openbasemap.org/cgi-bin/tissot?",
	    	   	       {
	    	   	           transparent: 'TRUE',
	    	   	           layers: 'TISSOT'
	    	   	       },
	    	   	       {'isBaseLayer': true, 'visibility': false, wrapDateLine: false }
	    	   	   ),
	    	   		
		new OpenLayers.Layer.WMS(
		    "BDL - GINA",
		    "http://wms.alaskamapped.org/bdl?",
		    {
		        transparent: 'TRUE',
		        layers: 'BestDataAvailableLayer'
		    },
		    {'isBaseLayer': true, 'visibility': false, wrapDateLine: false }
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

// var land = new OpenLayers.Layer.WMS(
//     "Land",
//     "http://springfling_2012.openbasemap.org/cgi-bin/tissot?",
//     {
//         transparent: 'TRUE',
//         layers: 'LAND'
//     },
//     {'isBaseLayer': true, 'visibility': true, wrapDateLine: true}
// );
// 
// map.addLayer(land);

// var tissot = new OpenLayers.Layer.WMS(
//     "Tissot Circles",
//     "http://springfling_2012.openbasemap.org/cgi-bin/tissot?",
//     {
//         transparent: 'TRUE',
//         layers: 'TISSOT'
//     },
//     {'isBaseLayer': false, 'visibility': true, wrapDateLine: true}
// );

// map.addLayer(tissot);

map.addControl(new OpenLayers.Control.LayerSwitcher());

map.setCenter(new OpenLayers.LonLat(0,0), 2);

}