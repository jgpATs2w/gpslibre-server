function load(t){
	console.info('loading menu for '+t);
	var I = new Array('mapa', 'log');
	var s = "<nav><ul>";
	for(mi in I){
		s += "<li>"
		if(I[mi] == t)
			s += "<span>"+I[mi]+"</span>";
		else 
			s += "<a href='"+I[mi]+".php'>"+I[mi]+"</a>";
		s+= "</li>"; 
	}
	document.getElementById("menu").innerHTML = s+"</ul></nav>";
	
	if(t == 'visor') process();
	
}
function hide_div(id){
	document.getElementById(id).style.visibility="hidden";
}
function show_div(id){
	var item = document.getElementById(id);
 	if (item) item.className='unhidden';
 }
function toogle_div(id){
	var item = document.getElementById(id);
 	if (item) {
 		item.className=(item.className=='hidden')?'unhidden':'hidden';
 	}
 	console.info(id+' '+item.className);
 }
function toogle_rows(className){
	var H = document.getElementsByClassName(className);

	for(i=0;i<H.length;i++){
		H.item(i).style.display = (H.item(i).style.display == 'none')? 'block':'none';	
	}
}
function getFormattedDate(ts){	
	//console.info("formatting ts "+ts);
	var d = new Date();
		d.setTime(parseInt(ts));//+(d.getTimezoneOffset()+120)*60000)
	return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes();
}
function show_alert(m){
	var alert = document.getElementById('alert');
	alert.innerHTML = m;
	alert.className = "unhidden";
	setTimeout("document.getElementById('alert').className='hidden';", 2000);
}