<?php
header("Content-Type: application/json");
include "connection.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status"=>"error","message"=>"Method harus POST"]);
    exit;
}

$id = $_POST['id'] ?? '';
$name = $_POST['name'] ?? '';
$price = $_POST['price'] ?? '';
$image = $_POST['image'] ?? '';
$category = $_POST['category'] ?? '';
$description = $_POST['description'] ?? '';

if (!$id || !$name || !$price || !$image || !$description) {
    echo json_encode(["status"=>"error","message"=>"Data tidak lengkap"]);
    exit;
}

try {
    $stmt = $conn->prepare("UPDATE guitars SET name=:name, price=:price, image=:image, category=:category, description=:description WHERE id=:id");
    $stmt->execute([
        ":id" => $id,
        ":name" => $name,
        ":price" => $price,
        ":image" => $image,
        ":category" => $category,
        ":description" => $description
    ]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["status"=>"success","message"=>"Produk berhasil diupdate"]);
    } else {
        echo json_encode(["status"=>"error","message"=>"Tidak ada perubahan atau produk tidak ditemukan"]);
    }

} catch(PDOException $e) {
    echo json_encode(["status"=>"error","message"=>$e->getMessage()]);
}
?>
