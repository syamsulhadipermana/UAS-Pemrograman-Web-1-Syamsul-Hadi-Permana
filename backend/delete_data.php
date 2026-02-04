<?php
header("Content-Type: application/json");
include "connection.php";

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    echo json_encode(["status"=>"error","message"=>"Method harus DELETE"]);
    exit;
}

$id = $_GET['id'] ?? '';

if (!$id) {
    echo json_encode(["status"=>"error","message"=>"ID produk diperlukan"]);
    exit;
}

try {
    $stmt = $conn->prepare("DELETE FROM guitars WHERE id=:id");
    $stmt->execute([":id" => $id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["status"=>"success","message"=>"Produk berhasil dihapus"]);
    } else {
        echo json_encode(["status"=>"error","message"=>"Produk tidak ditemukan"]);
    }

} catch(PDOException $e) {
    echo json_encode(["status"=>"error","message"=>$e->getMessage()]);
}
?>
