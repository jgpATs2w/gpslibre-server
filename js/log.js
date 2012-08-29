function updateLog(){
	var who = document.getElementById('who').value;
	var n = document.getElementById('n').value;
	ajax({
		url: "table2json2.php?q="+encodeURIComponent("select * from apisquillos where who='"+who+"' order by ts_remote desc limit "+n),
		type: "json",
		onSuccess: function (data){
			D = eval(data); console.info("log.js#got "+D.length+" rows")
			n = Math.min(n,D.length);
			var table = document.getElementById('logtable');
			for(i=0;i<n;i++){
				var row = table.insertRow(i+1);
				
				var c1 = row.insertCell(0); c1.innerHTML = getFormattedDate(D[i]['ts_remote']);
				var c2 = row.insertCell(1); c2.innerHTML = D[i]['who'];
				var c3 = row.insertCell(2); c3.innerHTML = Math.round(D[i]['lat']*100)/100;
				var c3 = row.insertCell(3); c3.innerHTML = Math.round(D[i]['lon']*100)/100;
				var c4 = row.insertCell(4); c4.innerHTML = D[i]['batt']+"%";
				
			}
			
		},
		onError: function(){
			console.error("error on Ajax");
		},
		onComplete: function(){
			console.info("completed")
		}
	});
}