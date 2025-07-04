<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Game</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

    body {
      margin: 0;
      padding: 0;
      height: 100vh;
      background: linear-gradient(to right, black, #1e1e90);
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Press Start 2P', cursive;
      color: #00FF00;
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

    h1 {
      font-size: 14px;
      margin-bottom: 30px;
    }

    input[type="text"] {
      font-size: 14px;
      font-family: 'Press Start 2P', cursive;
      width: 80%;
      max-width: 400px;
      padding: 12px;
      border-radius: 30px;
      border: none;
      background: #ccc;
      text-align: center;
      margin-bottom: 20px;
    }

    button {
      padding: 12px 24px;
      font-size: 14px;
      font-family: 'Press Start 2P', cursive;
      border-radius: 30px;
      cursor: pointer;
      background-color: #27ae60;
      color: black;
      border: none;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #00ff00;
    }
  </style>
</head>
<body>
  <div class="game-container">
    <h1>ENTER YOUR NAME TO PLAY</h1>
    <form action="game.html" method="GET">
      <input type="text" name="username" required placeholder="Type your name" />
      <br>
      <button type="submit">Continue</button>
    </form>
  </div>
</body>
</html>
