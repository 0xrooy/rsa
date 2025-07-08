<?php
header("Content-Type: application/json");

$host = "db";
$db = "rsa_db";
$user = "user";
$pass = "password";

try {
  $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $difficulty = $_GET['difficulty'] ?? 'easy';

  $stmt = $pdo->prepare("
    SELECT g.gameID, u.username, g.score, g.gameStatus, g.lastUpdated
    FROM games g
    JOIN users u ON g.userID = u.userID
    WHERE g.difficulty = :difficulty
    ORDER BY g.score DESC
    LIMIT 10
  ");

  $stmt->execute(['difficulty' => $difficulty]);
  $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($results);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(["error" => "DB error: " . $e->getMessage()]);
}
