<?php
header("Content-Type: application/json");
include "connection.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status"=>"error","message"=>"Method harus POST"]);
    exit;
}

$name = $_POST['name'] ?? '';
$price = $_POST['price'] ?? '';
$image = $_POST['image'] ?? '';
$category = $_POST['category'] ?? '';
$description = $_POST['description'] ?? '';

if (!$name || !$price || !$image || !$description) {
    echo json_encode(["status"=>"error","message"=>"Data tidak lengkap"]);
    exit;
}

try {
    $stmt = $conn->prepare("INSERT INTO guitars (name, price, image, category, description) VALUES (:name,:price,:image,:category,:description)");
    $stmt->execute([
        ":name" => $name,
        ":price" => $price,
        ":image" => $image,
        ":category" => $category,
        ":description" => $description
    ]);

    echo json_encode([
        "status" => "success",
        "message" => "Produk berhasil ditambahkan",
        "id" => $conn->lastInsertId()
    ]);
} catch(PDOException $e) {
    echo json_encode(["status"=>"error","message"=>$e->getMessage()]);
}
?>
