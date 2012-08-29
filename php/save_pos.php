<?php
include 'psql.class.php';

$d = new DB();
$lat = $_GET['lat'];$lon = $_GET['lon'];$bat = $_GET['bat'];$tsr=$_GET['tsr'];$id=$_GET['id'];

if($d->query("INSERT INTO apisquillos (who,lat, lon, batt,ts_remote) VALUES ('$id','$lat','$lon','$bat','$tsr');"))
	echo "OK";
else echo "ERROR";
?>