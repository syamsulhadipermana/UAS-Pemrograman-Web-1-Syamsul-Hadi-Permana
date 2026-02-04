<?php
require "..cors.php";
require "..auth.php";

auth();

echo json_encode([
  "status" => "success",
  "message" => "User authenticated"
]);
