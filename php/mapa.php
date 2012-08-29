<? include 'nav.fun.php'; html_start('visor');
include_once 'psql.class.php';

$DB = new DB();
$r = $DB->query('select who from apisquillos group by who order by who asc');
$D = pg_fetch_all($r);

?>
<div id="controls" >
	Muéstrame <input id="n" type="text" value="20" size="3" onchange="process();"/> datos<br>
	Dispositivo <select id="who" onchange="process();"><? foreach ($D as $d) {?><option value="<?=$d['who']?>"><?=$d['who']?></option><?}?></select><br>
	<a href="javascript:process()">Actualizar</a>
</div>

<div id="map_canvas"></div>

<? html_end('visor') ?>
