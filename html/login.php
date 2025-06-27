<?php
// BACKEND LOGIC
$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $conn = new mysqli("db", "root", "root", "rsa_db");

    if ($conn->connect_error) {
        die("❌ Connection failed: " . $conn->connect_error);
    }

    $username = $_POST['username'];
    $password = $_POST['password'];

    // Simple SQL query (no hashing for now)
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $username, $password); 
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        header("Location: index.php"); // Redirect after login
        exit();
    } else {
        $error = "Invalid login.";
    }

    $stmt->close();
    $conn->close();
}
?>

<!-- FRONTEND FORM -->
<!DOCTYPE html>
<html>
<head>
    <title>RSA Game - Login</title>
    <style>
        body { font-family: sans-serif; background: #111; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; }
        form { background: #222; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px #0f0; }
        input { display: block; margin: 10px 0; padding: 10px; width: 100%; border: none; border-radius: 5px; }
        button { padding: 10px 20px; background: #0f0; color: #000; font-weight: bold; border: none; border-radius: 5px; }
        .error { color: red; }
    </style>
</head>
<body>

<form method="POST" action="">
    <h2>Login to RSA Game</h2>
    <?php if ($error) echo "<p class='error'>$error</p>"; ?>
    <input type="text" name="username" placeholder="Username" required />
    <input type="password" name="password" placeholder="Password" required />
    <button type="submit">Login</button>
</form>

</body>
</html>
