<?php 
require_once('config.php');

class DB{
	private $m;
	
	function __construct(){
		$this->m = new mysqli(DB_HOST, DB_USER, DB_PASSWORD,DB_DATABASE);
	}
	
	function __destruct(){
		$this->m->close();
	}
	
	function query($q){ 
		$r = $this->m->query($q);
		
		if($r){ return $r; }else{
			echo $this->m->error;
		}
		
	}
}

?>