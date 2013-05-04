a<? include 'nav.fun.php'; html_start('log');
include_once 'psql.class.php';

$DB = new DB();
$r = $DB->query('select who from apisquillos group by who');
$D = pg_fetch_all($r);

?>

<div id="controls" >
	Muéstrame <input id="n" type="text" value="100" size="3" onchange="updateLog();"/> datos del 
	dispositivo <select id="who" onchange="updateLog();"><? foreach ($D as $d) {?><option value="<?=$d['who']?>"><?=$d['who']?></option><?}?></select>
	<button onclick="javascript:updateLog()" class="big">Actualizar</button>
</div>

<div id="log_canvas" class="hidden">
	<table id="logtable">
		<thead><td>Fecha</td><td>Dispositivo</td><td>Lat</td><td>Lon</td><td>Bateria</td></thead>
		<tr><td colspan="5"></td></tr>
	</table>
	<!--<?
		foreach ($D as $R) {?>
			<tr><td><?=gmdate("r",$R['ts_remote']/1000)?></td><td><?=$R['who']?></td><td><?=$R['batt']?></td><td><?printf("%2.2f",$R['lat'])?></td><td><?printf("%2.2f",$R['lon'])?></td></tr>
		<?}?>
	</table> -->
</div>

<? html_end('log') ?>
