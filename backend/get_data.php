<?php
header("Content-Type: application/json");
include "connection.php";

try {
    $stmt = $conn->query("SELECT * FROM guitars ORDER BY id ASC");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data" => $data
    ]);
} catch(PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>
