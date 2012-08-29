var map = null; var D; var n=2;var who='nokia';
var Markers = new Array();
var path = null;
function process(){
	updateUserInputs();
	ajax({
		url: "table2json.php?table=apisquillos&n="+n+"&who="+who,
		type: "json",
		onSuccess: function (data){
			console.info("constructing Map...");
			D = eval(data);
			n=Math.min(n, D.length-1);console.info("process.MapManager#received "+D.length+" data");
			for(j=0;j<=n;j++){console.info("j= "+j);
				if(j==0) loadMap(D[j]['lat'],D[j]['lon']);
				addMapMarker(j,D[j]['lat'],D[j]['lon'],D[j]['ts_remote'],D[j]['batt']);
			}
			drawPath();
		},
		onError: function(){
			console.error("error on Ajax");
		},
		onComplete: function(){
			console.info("completed")
		}
	});
}
function updateUserInputs(){
	who = document.getElementById('who').value; console.info("updated who to "+who);
	n = document.getElementById('n').value;
}
function loadMap(lat,lon){
	console.info("loading map...");

	myLatlng = new google.maps.LatLng(lat,lon);
    var myOptions = {
        zoom: (map==null)?16:map.getZoom(),
        center: myLatlng,
        mapTypeId: (map==null)?google.maps.MapTypeId.SATELLITE:map.getMapTypeId()
    }
    if(map!=null) clearMarkers();
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
   
    
}
function addMapMarker(i,lat, lon, ts, batt) {
	var contentString = getFormattedDate(ts)+"<br> Battery: "+batt+"%";
        
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat,lon), 
        map: map,
        title: getFormattedDate(ts)+" "+batt+"%",
        icon: (i==0)?'../img/icon_goat_small.png':'../img/icon_goat_small_shadow.png'
    }); 
    Markers.push(marker);
    console.info("added Marker "+i)
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,Markers[i]);
    });
    var circle = new google.maps.Circle({
      map: map,
      radius: 15 
    });
    //circle.bindTo('center', Markers[i], 'position');
}
function clearMarkers(){console.info("clearMarkers.MapManager#removing markers...");
	for(i=0;i<Markers.length;i++){console.info("clearMarkers.MapManager#removing marker "+i);
		Markers[i].setMap(null);
	}
	if(path!=null) path.setMap(null);
	Markers = new Array();
}
function drawPath(data){
	var PathLL = [];
	for(i=1;i<n;i++) PathLL.push(new google.maps.LatLng(D[i]['lat'],D[i]['lon']));
    path = new google.maps.Polyline({
      path: PathLL,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2
    });

   path.setMap(map);
}
