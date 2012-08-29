<?php
require_once 'psql.class.php';

$table = $_GET['table'];

$M = new DB();

$r = $M->query("SELECT lat, lon, ts_remote, batt FROM $table ORDER BY ts_remote DESC LIMIT 1");

$R = pg_fetch_assoc($r);
	$lat=$R['lat'];$lon=$R['lon'];$ts=$R['ts_remote'];$batt=$R['batt'];
	
if(ob_get_length()) ob_clean();

header('Expires: Fri, 25 Dec 1980 00:00:00 GMT'); // time in the past
	header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . 'GMT');
	header('Cache-Control: no-cache, must-revalidate');
	header('Pragma: no-cache');
	header('Content-Type: text/xml');

echo '<?xml version="1.0" encoding="ISO-8859-1"?>';
	echo '<data>';
	echo "<table>$table</table>";
	echo "<lat>$lat</lat>";
	echo "<lon>$lon</lon>";
	echo "<ts>$ts</ts>";
	echo "<batt>$batt</batt>";
	echo '</data>';
?>