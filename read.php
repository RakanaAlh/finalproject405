<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once 'Database.php';
include_once 'LikedGiphy.php';

$database = new Database();
$db = $database->getConnection();

$items = new LikedGiphy($db);

$stmt = $items->getLikedGiphies();
$itemCount = $stmt->rowCount();


if ($itemCount > 0) {

    $eventArr = array();
    $eventArr["data"] = array();
    $eventArr["itemCount"] = $itemCount;

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $e = array(
            "id" => $id,
            "src" => $src
        );

        array_push($eventArr["data"], $e);
    }
    echo json_encode($eventArr);
} else {
    echo json_encode(
        ["message" => "No record found."]
    );
}
?>