<?php

class LikedGiphy
{

    // Connection
    private $conn;

    // Table
    private $db_table = "liked_giphy";

    // Columns
    public $id;
    public $src;

    // Db connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getLikedGiphies()
    {
        $sqlQuery = "SELECT * FROM " . $this->db_table . "";
        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->execute();
        return $stmt;
    }

    public function addGiphy()
    {
        $sqlQuery = "INSERT INTO " . $this->db_table . " (src) values('$this->src')";
        $stmt = $this->conn->prepare($sqlQuery);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function deleteGiphy()
    {
        $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE src = '$this->src'";
        $stmt = $this->conn->prepare($sqlQuery);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

}

?>

