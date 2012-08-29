<?php
require_once 'psql.class.php';

$q = str_replace("\\", "", urldecode($_GET['q']));

$M = new DB();

$r = $M->query($q);
$R = array();
while($L = pg_fetch_array($r))
	array_push($R,$L);

$J = json_encode($R); echo $J;
?>