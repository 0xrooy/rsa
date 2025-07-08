<?php
header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['username'])) {
  echo json_encode(["error" => "Missing username"]);
  exit;
}

$mysqli = new mysqli("db", "user", "password", "rsa_db");
if ($mysqli->connect_error) {
  echo json_encode(["error" => "DB connection failed"]);
  exit;
}

$username = $mysqli->real_escape_string($data['username']);

// Check if exists
$result = $mysqli->query("SELECT userID FROM users WHERE username='$username'");
if ($result && $result->num_rows > 0) {
  echo json_encode(["status" => "exists"]);
} else {
  $stmt = $mysqli->prepare("INSERT INTO users (username) VALUES (?)");
  $stmt->bind_param("s", $username);
  $stmt->execute();
  echo json_encode(["status" => "created"]);
}
?>
