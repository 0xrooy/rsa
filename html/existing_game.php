<!-- existing_game.php -->
<?php
$username = $_GET['username'] ?? 'Player';

// Empty slots placeholder (to be synced with database later)
$slots = [
  ['name' => null, 'score' => null],
  ['name' => null, 'score' => null],
  ['name' => null, 'score' => null],
  ['name' => null, 'score' => null],
  ['name' => null, 'score' => null],
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Select Slot</title>
  <style>
    body {
      background: linear-gradient(to right, black, #1e1e90);
      font-family: 'Courier New', monospace;
      color: #00FF00;
      text-align: center;
      padding-top: 5%;
    }
    .slot {
      display: inline-block;
      background: #ccc;
      color: black;
      margin: 15px;
      padding: 20px;
      border-radius: 25px;
      width: 150px;
      height: 120px;
      cursor: pointer;
      font-size: 20px;
      vertical-align: top;
    }
    a {
      text-decoration: none;
      color: inherit;
      display: block;
      height: 100%;
    }
  </style>
</head>
<body>
  <h1>CHOOSE YOUR SLOT</h1>
  <?php foreach ($slots as $index => $slot): ?>
    <div class="slot">
      <a href="level.php?username=<?php echo urlencode($username); ?>&slot=<?php echo 'slot' . $index; ?>">
        <?php
          echo $slot['name'] ? $slot['name'] : 'EMPTY';
          echo "<br>Score:<br>";
          echo $slot['score'] !== null ? $slot['score'] : '-';
        ?>
      </a>
    </div>
  <?php endforeach; ?>
</body>
</html>
