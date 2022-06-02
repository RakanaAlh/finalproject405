<?php

error_reporting(E_ALL);
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");
include_once 'Database.php';
include_once 'LikedGiphy.php';

$database = new Database();
$db = $database->getConnection();

$src = $_GET['src'];
if (!empty($src)) {
    $obj = new LikedGiphy($db);
    $obj->src = $src;
    if ($obj->addGiphy()) {
        echo json_encode(['message' => 'Item added into database successfully', 'status' => 201]);
    } else {
        echo json_encode(['message' => 'Something went wrong', 'status' => 400]);
    }
}else{
    echo json_encode(['message' => 'Data is empty', 'status' => 400]);
}