<?php
// BACKEND LOGIC
$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Connect to MySQL (service name from docker-compose)
    $conn = new mysqli("db", "root", "root", "rsa_db");

    if ($conn->connect_error) {
        die("❌ Connection failed: " . $conn->connect_error);
    }

    $username = $_POST['username'];
    $password = $_POST['password'];

    // Prepare SQL query
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
    
    if (!$stmt) {
        die("❌ Prepare failed: " . $conn->error); // Diagnostics
    }

    $stmt->bind_param("ss", $username, $password); 
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows == 1) {
        header("Location: index.php"); // Redirect to homepage
        exit();
    } else {
        $error = "❌ Invalid username or password.";
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
        body {
            font-family: monospace;
            background: #111;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        form {
            background: #1e1e1e;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
            width: 300px;
        }
        h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #0f0;
        }
        input {
            width: 100%;
            padding: 10px;
            margin: 12px 0;
            background: #222;
            color: #fff;
            border: 1px solid #444;
            border-radius: 6px;
        }
        button {
            width: 100%;
            padding: 10px;
            background: #0f0;
            color: #000;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 6px;
            margin-top: 10px;
        }
        .error {
            color: #f55;
            text-align: center;
        }
    </style>
</head>
<body>

<form method="POST" action="">
    <h2>Login</h2>
    <?php if ($error) echo "<p class='error'>$error</p>"; ?>
    <input type="text" name="username" placeholder="Username" required />
    <input type="password" name="password" placeholder="Password" required />
    <button type="submit">Login</button>
</form>

</body>
</html>
