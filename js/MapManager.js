var map = null; var D; var n; var from; var to; var who='nokia';
var Markers = new Array();
var path = null;
function process(){
	updateUserInputs();
	ajax({
		url: "table2json.php?table=apisquillos&who="+who+"&from="+from+"&to="+to,
		type: "json",
		onSuccess: function (data){
			console.info("constructing Map..."); 
			D = eval(data);show_alert("recibidos "+D.length+" datos");
			n=D.length-1;
			if(n<0){
				noData();
				return;	
			}
			console.info("process.MapManager#received "+D.length+" data. ");
			
			for(j=0;j<=n;j++){console.info("j= "+j);
				if(j==0) loadMap(D[j]['lat'],D[j]['lon']);
				addMapMarker(j,D[j]['lat'],D[j]['lon'],D[j]['ts_remote'],D[j]['batt']);
			}
			drawPath();
		},
		onError: function(){
			console.error("error on Ajax");
			show_alert("error en ajax");
		},
		onComplete: function(){
			console.info("completed")
		}
	});
}
function updateUserInputs(){
	who = document.getElementById('who').value; console.info("updated who to "+who);
	from = document.getElementById('from').value;
	to = document.getElementById('to').value;
}
function loadMap(lat,lon){
	console.info("loading map..."); show_alert("cargando mapa...");

	myLatlng = new google.maps.LatLng(lat,lon);
    var myOptions = {
        zoom: (map==null)?16:map.getZoom(),
        center: myLatlng,
        mapTypeId: (map==null)?google.maps.MapTypeId.SATELLITE:map.getMapTypeId()
    }
    if(map!=null) clearMarkers();
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
   
    
}
function noData(){
	map = null;
	document.getElementById("map_canvas").innerHTML = "<p class='nodata'>No hay datos que mostrar, revisa las fechas y el dispositivo</p>";
}
function addMapMarker(i,lat, lon, ts, batt) { console.info("adding marker "+i);
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
	for(i=0;i<=n;i++) PathLL.push(new google.maps.LatLng(D[i]['lat'],D[i]['lon']));
    path = new google.maps.Polyline({
      path: PathLL,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2
    });

   path.setMap(map);
}
