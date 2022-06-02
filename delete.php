<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'Database.php';
include_once 'LikedGiphy.php';

$database = new Database();
$db = $database->getConnection();

$item = new LikedGiphy($db);

$data = $_GET['src'];

$item->src = $data;

if ($item->deleteGiphy()) {
    echo json_encode("Giphy deleted.");
} else {
    echo json_encode("Giphy could not be deleted");
}
?>