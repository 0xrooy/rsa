<!-- new_game.php -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Game</title>
  <style>
    body {
      background: linear-gradient(to right, black, #1e1e90);
      font-family: 'Courier New', monospace;
      color: #00FF00;
      text-align: center;
      margin-top: 15%;
    }
    input[type="text"] {
      font-size: 24px;
      width: 50%;
      padding: 10px;
      border-radius: 25px;
      border: none;
      background: #ccc;
      text-align: center;
    }
    button {
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 20px;
      border-radius: 10px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>ENTER YOUR NAME TO PLAY</h1>
  <form action="level.php" method="GET">
    <input type="text" name="username" required placeholder="Type your name" />
    <br>
    <button type="submit">Continue</button>
  </form>
</body>
</html>
