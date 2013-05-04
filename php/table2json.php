<?php
require_once 'psql.class.php';

$table = $_GET['table']; $who=$_GET['who']; $from = $_GET['from']; $to = $_GET['to'];

$M = new DB();
$F = explode("/", $from);
$from_ts = gmmktime(0,0,0,$F[1],$F[0],$F[2])*1000;
$F = explode("/", $to);
$to_ts = gmmktime(23,59,59,$F[1],$F[0],$F[2])*1000;
$q = "SELECT * FROM $table WHERE who='$who' AND ts_remote > $from_ts AND ts_remote <= $to_ts ORDER BY ts_remote DESC"; 
//echo $q;
$r = $M->query($q);
$R = array();
while($L = pg_fetch_array($r))
	array_push($R,$L);

$J = json_encode($R); echo $J;
?>