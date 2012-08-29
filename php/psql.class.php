<?php 
require_once('config.php');

class DB{
	public $conn;
	
	function __construct(){
		$this->conn = pg_pconnect("host=".DB_HOST." dbname=".DB_DATABASE." user=".DB_USER." password=".DB_PASSWORD)
    	or die('psql.class.php#No se ha podido conectar: ' . pg_last_error());
	}
	
	function query($q){
		if(DEBUG) echo "psql.class.php#query: ".$q;
		
		$r = pg_query($q);
		
		if($r){ return $r; }else{
			echo pg_last_error();
			return false;
		}
		
	}

}

?>