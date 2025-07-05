<!-- level.php -->
<?php
$username = $_GET['username'] ?? 'Player';
$slot = $_GET['slot'] ?? 'Unknown';
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Select Level</title>
  <style>
    body {
      background: linear-gradient(to right, black, #1e1e90);
      font-family: 'Courier New', monospace;
      color: #00FF00;
      text-align: center;
      padding-top: 10%;
    }
    .level-button {
      display: inline-block;
      margin: 20px;
      padding: 15px 30px;
      background: #ccc;
      color: black;
      font-size: 20px;
      border-radius: 10px;
      text-decoration: none;
      border: 2px solid black;
    }
  </style>
</head>
<body>
  <h1>CHOOSE LEVEL</h1>
  <a class="level-button" href="game.php?level=easy&user=<?php echo urlencode($username); ?>&slot=<?php echo urlencode($slot); ?>">EASY</a>
  <a class="level-button" href="game.php?level=medium&user=<?php echo urlencode($username); ?>&slot=<?php echo urlencode($slot); ?>">MEDIUM</a>
  <a class="level-button" href="game.php?level=hard&user=<?php echo urlencode($username); ?>&slot=<?php echo urlencode($slot); ?>">HARD</a>
</body>
</html>
