<? include 'nav.fun.php'; html_start('visor');
include_once 'psql.class.php';

$DB = new DB();
$r = $DB->query('select who from apisquillos group by who order by who asc');
$D = pg_fetch_all($r);

?>
<div id="controls" >
	Mostrar datos desde <input id="from" type="text" value="<?=date('d/m/y')?>" size="6" onchange="process();">
	hasta <input id="to" type="text" value="<?=date('d/m/y')?>" size="6" onchange="process();">
	del dispositivo <select id="who" onchange="process();"><? foreach ($D as $d) {?><option value="<?=$d['who']?>"><?=$d['who']?></option><?}?></select>
	<button onclick="javascript:process()" class="big">Actualizar</button>
</div>
<div id="map_canvas"></div>

<? html_end('visor') ?>
