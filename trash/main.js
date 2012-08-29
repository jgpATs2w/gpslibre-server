console.info("start goatracker/js/main.js");

function process(){
	ajax({
		url: "php/client.php?table=apisquillos",
		type: "xml",
		onSuccess: function (data){
			var lat = data.getElementsByTagName('lat')[0].firstChild.textContent;
			var lon = data.getElementsByTagName('lon')[0].firstChild.textContent;
			var ts = data.getElementsByTagName('ts')[0].firstChild.textContent;
			var batt = data.getElementsByTagName('batt')[0].firstChild.textContent;
			
			console.info("constructing Map. Received lat "+lat+",lon "+lon+",ts "+ts);
			addMapMarker(lat, lon, ts, batt);
		},
		onError: function(){
			console.error("error on Ajax");
		},
		onComplete: function(){
			console.info("completed")
		}
	});
}
function addMapMarker(lat, lon, ts, batt) {
    var myLatlng = new google.maps.LatLng(lat,lon);
    var myOptions = {
        zoom: 16,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    
	var contentString = getFormattedDate(ts)+"<br> Battery: "+batt+"%";
        
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    var marker = new google.maps.Marker({
        position: myLatlng, 
        map: map,
        title: getFormattedDate(ts)+" "+batt+"%",
        icon: 'img/icon_goat_small.png'
    }); 
    
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
    var circle = new google.maps.Circle({
      map: map,
      radius: 15 
    });
    circle.bindTo('center', marker, 'position');
}

function getFormattedDate(ts){
	console.info("formatting ts "+ts);
	var d = new Date(ts);
		d.setTime(ts);
	return d.toString();
}