<? 
ob_start();
function html_start($t){?>
<!DOCTYPE HTML>
<html>
	<head>
		<title>GPS Libre :: <?=$t?></title>
		<meta charset="ISO-8859-1" />
		
		<script type="text/javascript" src="../js/ajax.js"></script>
		<? extra_head($t);?>		
		
		<script type="text/javascript" src="../js/nav.fun.js"></script>
		
		<link rel="stylesheet" href="../css/main.css" type="text/css" media="all">
	</head>
	<body onload="load('<?=$t?>')" <? extra_body($t);?>>
		<div id="menu"></div>
		<div id="alert" style="display:block">zzz...</div>
		<? ob_flush();?>
		
	<?
	ob_flush();
}
function extra_head($t){
	$fun = "header_".$t; if(function_exists($fun)) $fun();
	
}
function extra_body($t){
	$fun = "body_".$t; if(function_exists($fun)) $fun();
}
function header_visor(){
	$sensor = "false";
	if(strpos($_SERVER['HTTP_USER_AGENT'],"Android"))
		$sensor = "true";
	?>
	<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=<?=$sensor?>"></script>
	
	<script type="text/javascript" src="../js/MapManager.js"></script>
	<link rel="stylesheet" href="../css/mapa.css" type="text/css" media="all">
<?}
function header_log(){?>
	<script type="text/javascript" src="../js/log.js"></script>
	<link rel="stylesheet" href="../css/log.css" type="text/css" media="all">
<?}
function html_end($t){?>
	
		<!--<footer>eleuteron AT gmail.com. Copy free. Actualizado <?=date('m / Y',filectime($t.'.php'))?></footer> -->
		</body>
</html>
	<?
}
?>
