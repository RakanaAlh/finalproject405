<?php
class Database {
    private $host = "ec2-54-164-40-66.compute-1.amazonaws.com";
    private $database_name = "defi64k994ho0o";
    private $username = "ifpeefafzdumtw";
    private $password = "649f8fd15c1b1daee345486433c443bdc2deed00ecab9d979a92486cd4d10afb";

    public $conn;

    public function getConnection(){
        $this->conn = null;
        try{
            $this->conn = new PDO("pgsql:host=" . $this->host . ";dbname=" . $this->database_name, $this->username, $this->password);
        }catch(PDOException $exception){
            echo "Database could not be connected: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>