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
<<<<<<< HEAD:html/index.php
      padding: 40px 20px;
      border-radius: 30px;
    }

    .title {
      color: #00ff00;
      font-size: 24px;
      margin-bottom: 40px;
=======
      max-width: 90%;
    }

    .title {
      font-size: 26px;
      margin-bottom: 60px;
      text-shadow: 2px 2px 4px #000;
>>>>>>> c101c9e6dc70aa7a7212f8652f5e289f12216bf5:html/main.php
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
<<<<<<< HEAD:html/index.php
      transition: background-color 0.3s ease;
      border-radius: 30px; /* rounded buttons */
=======
      transition: all 0.3s ease;
>>>>>>> c101c9e6dc70aa7a7212f8652f5e289f12216bf5:html/main.php
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
  <div class="game-container">
    <div class="title">WELCOME TO RSA</div>

    <a href="new_game.php" class="btn">NEW GAME</a>
    <a href="existing_game.php" class="btn">EXISTING GAME</a>
    <a href="leaderboard.php" class="btn">LEADERBOARD</a>
  </div>
</body>
</html>
