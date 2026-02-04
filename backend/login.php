<?php
require "../helpers/cors.php";
require "../config/connection.php";

$data = json_decode(file_get_contents("php://input"), true);

$email    = $data['email'] ?? '';
$password = $data['password'] ?? '';

$query = $conn->prepare(
  "SELECT id, name, email, password, role FROM users WHERE email=?"
);
$query->bind_param("s", $email);
$query->execute();
$result = $query->get_result();

if ($result->num_rows === 1) {
  $user = $result->fetch_assoc();

  if (password_verify($password, $user['password'])) {
    echo json_encode([
      "status" => "success",
      "user" => [
        "id"    => $user['id'],
        "name"  => $user['name'],
        "email" => $user['email'],
        "role"  => $user['role']
      ]
    ]);
  } else {
    echo json_encode([
      "status" => "error",
      "message" => "Password salah"
    ]);
  }
} else {
  echo json_encode([
    "status" => "error",
    "message" => "Email tidak terdaftar"
  ]);
}
