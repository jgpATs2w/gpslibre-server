var xmlHttp = ajaxRequestObject();

function process(){
	if (xmlHttp){
		try{
			xmlHttp.open("GET", "php/client.php?table=puebla", true);
			xmlHttp.onreadystatechange = handleRequestStateChange;
			xmlHttp.send(null);
		}catch (e){
			alert("Can't connect to server:\n" + e.toString());
		}
	}
	
	console.info("process terminated");
}

function ajaxRequestObject(){
	try{
		this.xmlHttp = new XMLHttpRequest();
	}catch(e){
		var XmlHttpVersions = new Array("MSXML2.XMLHTTP.6.0",
										"MSXML2.XMLHTTP.5.0",
										"MSXML2.XMLHTTP.4.0",
										"MSXML2.XMLHTTP.3.0",
										"MSXML2.XMLHTTP",
										"Microsoft.XMLHTTP");
		for (var i=0; i<XmlHttpVersions.length && !xmlHttp; i++){
			try{
				this.xmlHttp = new ActiveXObject(XmlHttpVersions[i]);
			}catch (e) {}
		}
	}
	if (!this.xmlHttp)
		alert("Error creating the XMLHttpRequest object.");
	else{
		console.info("async.lib.createXmlHttpRequestObject#xmlHttp object created");
		return this.xmlHttp;
	}
	
}
function checkBrowser(){
	return (window.XMLHttpRequest && window.XSLTProcessor && window.DOMParser) || 
			(window.ActiveXObject && createMsxml2DOMDocumentObject());
}
function createMsxml2DOMDocumentObject(){
	var msxml2DOM;
	var msxml2DOMDocumentVersions = new Array("Msxml2.DOMDocument.6.0","Msxml2.DOMDocument.5.0","Msxml2.DOMDocument.4.0");

	for (var i=0; i<msxml2DOMDocumentVersions.length && !msxml2DOM; i++){
		try{
			msxml2DOM = new ActiveXObject(msxml2DOMDocumentVersions[i]);
		}catch (e) {}
	}
	if (!msxml2DOM)
		alert("Please upgrade your MSXML version from \n" + "http://msdn.microsoft.com/XML/XMLDownloads/default.aspx");
	else
		return msxml2DOM;
}
function handleRequestStateChange(){
	console.info("handleRequestStateChange#state "+xmlHttp.readyState);
	if (xmlHttp.readyState == 4){
		if (xmlHttp.status == 200){
			try{
				console.info("received data");
				var data = xmlHttp.responseXML;
				var lat = data.getElementsByTagName('lat')[0].firstChild.textContent;
				var lon = data.getElementsByTagName('lon')[0].firstChild.textContent;
				var ts = data.getElementsByTagName('ts')[0].firstChild.textContent;
				
				console.info("constructing Map. Received lat "+lat+",lon "+lon+",ts "+ts);
				addMapMarker(lat, lon, ts);
			}catch(e){
				alert("Error reading the response: " + e.toString());
			}
		}else{
			alert("There was a problem retrieving the data:\n" +
			xmlHttp.statusText);
		}
	}
}
function addMapMarker(lat, lon, ts) {
    var myLatlng = new google.maps.LatLng(lat,lon);
    var myOptions = {
        zoom: 16,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    var marker = new google.maps.Marker({
        position: myLatlng, 
        map: map,
        title: "posicion actual",//getFormattedDate(ts)
        icon: '../lib-img/icon_goat_small.png'
    }); 
    
    
    var circle = new google.maps.Circle({
      map: map,
      radius: 50 
    });
    circle.bindTo('center', marker, 'position');
}

function getFormattedDate(ts){
	console.info("formatting ts "+ts);
	var d = new Date(ts);
	return d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
}
