<?php
// main.php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome to RSA</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

    body {
      margin: 0;
      padding: 0;
      height: 100vh;
      background: linear-gradient(to right, #000000, #1a1a66);
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Press Start 2P', cursive;
    }

    .container {
      text-align: center;
    }

    .title {
      color: #00ff00;
      font-size: 24px;
      margin-bottom: 50px;
    }

    .btn {
      display: block;
      width: 250px;
      margin: 15px auto;
      padding: 20px;
      font-size: 14px;
      background-color: #c0c0c0;
      border: 2px solid black;
      text-decoration: none;
      color: black;
      transition: background-color 0.3s ease;
    }

    .btn:hover {
      background-color: #e0e0e0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="title">WELCOME TO RSA</div>

    <a href="game.html" class="btn">NEW GAME</a>
    <a href="existing_game.php" class="btn">EXISTING GAME</a>
    <a href="http://localhost:3001/leaderboard" class="btn">LEADERBOARD</a>
    <a href="how_to_play.php" class="btn">HOW TO PLAY</a>
  </div>
</body>
</html>
