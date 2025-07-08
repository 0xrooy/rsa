<?php
header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['username']) || !isset($data['score']) || !isset($data['difficulty'])) {
  echo json_encode(["error" => "Missing data"]);
  exit;
}

$mysqli = new mysqli("db", "user", "password", "rsa_db"); // 🐳 Docker service connection
if ($mysqli->connect_error) {
  echo json_encode(["error" => "DB connect failed"]);
  exit;
}

$username = $mysqli->real_escape_string($data['username']);
$score = (int) $data['score'];
$difficulty = $mysqli->real_escape_string($data['difficulty']);
$status = $mysqli->real_escape_string($data['gameStatus'] ?? "completed");

// 🔍 Get userID
$result = $mysqli->query("SELECT userID FROM users WHERE username='$username'");
if ($result && $row = $result->fetch_assoc()) {
  $userID = $row['userID'];

  // Save the score
  $stmt = $mysqli->prepare("INSERT INTO games (userID, score, difficulty, gameStatus, lastUpdated) VALUES (?, ?, ?, ?, NOW())");
  $stmt->bind_param("iiss", $userID, $score, $difficulty, $status);
  $stmt->execute();
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["error" => "User not found"]);
}
?>
