<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// DB config
$host = 'db';
$user = 'user';
$pass = 'password';
$db = 'rsa_db';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(['error' => $conn->connect_error]);
    exit;
}

$sql = "SELECT games.*, users.username FROM games JOIN users ON games.userID = users.userID";
$result = $conn->query($sql);

$games = [];
while ($row = $result->fetch_assoc()) {
    $games[] = $row;
}

echo json_encode($games);
