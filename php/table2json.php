<?php
require_once 'psql.class.php';

$table = $_GET['table']; $n = $_GET['n']; $who=$_GET['who'];

$M = new DB();

$r = $M->query("SELECT * FROM $table WHERE who='$who' ORDER BY ts_remote DESC LIMIT $n");
$R = array();
while($L = pg_fetch_array($r))
	array_push($R,$L);

$J = json_encode($R); echo $J;
?>