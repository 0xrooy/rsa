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

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
      height: 100vh;
      background: linear-gradient(to right, #000000, #1a1a66);
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Press Start 2P', cursive;
      color: #00ff00;
    }

    .container {
      text-align: center;
      max-width: 90%;
    }

    .title {
      font-size: 26px;
      margin-bottom: 60px;
      text-shadow: 2px 2px 4px #000;
    }

    .btn {
      display: block;
      width: 260px;
      margin: 20px auto;
      padding: 20px;
      font-size: 14px;
      background-color: #c0c0c0;
      border: 2px solid black;
      border-radius: 10px;
      text-decoration: none;
      color: black;
      transition: all 0.3s ease;
    }

    .btn:hover {
      background-color: #e0e0e0;
      transform: scale(1.05);
    }

    @media (max-width: 480px) {
      .btn {
        width: 90%;
        font-size: 12px;
        padding: 15px;
      }

      .title {
        font-size: 18px;
        margin-bottom: 40px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="title">WELCOME TO RSA</div>

    <a href="new_game.php" class="btn">NEW GAME</a>
    <a href="existing_game.php" class="btn">EXISTING GAME</a>
    <a href="leaderboard.php" class="btn">LEADERBOARD</a>
    <a href="how_to_play.php" class="btn">HOW TO PLAY</a>
  </div>
</body>
</html>
