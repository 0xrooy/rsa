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

    .game-container {
      width: 70%;
      height: auto;
      background: #2a4764;
      border: 4px solid #34495e;
      box-shadow:
        0 0 20px #00ff00,            /* glowing green outer glow */
        0 0 0 2px #1a252f, 
        inset 0 0 0 2px #3e5771,
        0 8px 16px rgba(0, 0, 0, 0.3);
      position: relative;
      overflow: hidden;
      text-align: center;
      padding: 40px 20px;
      border-radius: 30px;
    }

    .title {
      color: #00ff00;
      font-size: 24px;
      margin-bottom: 40px;
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
      border-radius: 30px; /* rounded buttons */
    }

    .btn:hover {
      background-color: #e0e0e0;
    }
  </style>
</head>
<body>
  <div class="game-container">
    <div class="title">WELCOME TO RSA</div>

    <a href="game.html" class="btn">NEW GAME</a>

    <a href="http://localhost:3001/existing-game" class="btn">EXISTING GAME</a>
    <a href="http://localhost:3001/leaderboard" class="btn">LEADERBOARD</a>
    <a href="how_to_play.php" class="btn">HOW TO PLAY</a>

  </div>
</body>
</html>
