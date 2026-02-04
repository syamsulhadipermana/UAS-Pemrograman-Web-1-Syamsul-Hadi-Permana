<?php
$host = "localhost";
$dbname = "ss_guitar";
$user = "root";
$pass = ""; // ganti sesuai password MySQL

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Cek kalau file diakses langsung
    if (basename(__FILE__) == basename($_SERVER['PHP_SELF'])) {
        echo "Koneksi berhasil!";
        exit;
    }

} catch(PDOException $e) {
    if (basename(__FILE__) == basename($_SERVER['PHP_SELF'])) {
        echo "Koneksi gagal: " . $e->getMessage();
    } else {
        echo json_encode(["status" => "error", "message" => "Koneksi gagal: " . $e->getMessage()]);
    }
    exit;
}
?>
