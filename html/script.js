let gameState = {
  stage: 0, // Start at 0 for difficulty selection
  difficulty: "",
  primeRange: { min: 3, max: 20 },
  startTime: 0,
  p: 0,
  q: 0,
  n: 0,
  phi: 0,
  e: 0,
  d: 0,
  plaintext: "",
  encrypted: [],
};

let timerInterval;

function startTimer() {
  gameState.startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Date.now() - gameState.startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    document.getElementById("timer").textContent = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, 1000);
}

function startGame() {
  const username = document.getElementById("usernameInput").value.trim();
  if (!username) {
    alert("Please enter a username!");
    return;
  }

  localStorage.setItem("username", username);
  gameState.username = username; // ✅ Store in gameState for later

  // 🔥 Register username if not exists
  fetch("api/register_user.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username })
  })
  .then((res) => res.json())
  .then((data) => {
    console.log("User registered:", data);
    document.getElementById("usernamePrompt").style.display = "none";
    document.getElementById("difficultySelect").style.display = "block";
    document.getElementById("currentStage").textContent = "SELECT";
  })
  .catch((err) => {
    console.error("Failed to register user:", err);
  });
}

function selectDifficulty(level) {
  gameState.difficulty = level;
  gameState.stage = 1;

  // Set prime ranges based on difficulty
  switch (level) {
    case "easy":
      gameState.primeRange = { min: 3, max: 20 };
      break;
    case "medium":
      gameState.primeRange = { min: 10, max: 50 };
      break;
    case "hard":
      gameState.primeRange = { min: 50, max: 200 };
      break;
  }

  // Update stage 1 content based on difficulty
  updateStage1Content();

  // Hide difficulty selection and show stage 1
  document.getElementById("difficultySelect").style.display = "none";
  document.getElementById("stage1").style.display = "block";
  document.getElementById("currentStage").textContent = "1";

  // Start the timer
  startTimer();
}

function updateStage1Content() {
  const difficultyInfo = {
    easy: {
      emoji: "🟢",
      name: "EASY",
      tips: "Use primes like 7, 11, 13. Good for encrypting simple symbols and digits 0-9.",
    },
    medium: {
      emoji: "🟡",
      name: "MEDIUM",
      tips: "Use primes like 13, 17, 19. Good for encrypting letters and numbers.",
    },
    hard: {
      emoji: "🔴",
      name: "HARD",
      tips: "Use primes like 67, 71, 73. Can encrypt any text and symbols.",
    },
  };

  const info = difficultyInfo[gameState.difficulty];

  document.getElementById("stage1").innerHTML = `
                <div class="stage-title">${info.emoji} ${info.name}: PRIME FOUNDATIONS</div>
                <div class="stage-description">
                    Welcome, crypto-miner! To forge your RSA keys, you need two prime numbers.
                    Enter two different prime numbers (p and q) to start your encryption journey!
                    <br><br> 
                    <br><strong> 💡Prime range:</strong> ${gameState.primeRange.min}-${gameState.primeRange.max}
                </div>
                
                <div class="two-column">
                    <div class="input-group">
                        <label class="input-label">Prime Number P:</label>
                        <input type="number" id="primeP" class="pixel-input" placeholder="Enter prime p">
                    </div>
                    <div class="input-group">
                        <label class="input-label">Prime Number Q:</label>
                        <input type="number" id="primeQ" class="pixel-input" placeholder="Enter prime q">
                    </div>
                </div>
                
                <button class="pixel-button" onclick="validatePrimes()">FORGE KEYS</button>
                <div id="stage1Message"></div>
            `;
}

function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function modInverse(a, m) {
  function extendedGCD(a, b) {
    if (a === 0) return [b, 0, 1];
    let [gcd, x1, y1] = extendedGCD(b % a, a);
    let x = y1 - Math.floor(b / a) * x1;
    let y = x1;
    return [gcd, x, y];
  }

  let [gcd, x, y] = extendedGCD(a, m);
  if (gcd !== 1) return null;
  return ((x % m) + m) % m;
}

function modPow(base, exp, mod) {
  let result = 1;
  base = base % mod;
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod;
    }
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  return result;
}

function showMessage(elementId, message, isError = false) {
  const element = document.getElementById(elementId);
  element.innerHTML = `<div class="${
    isError ? "error-message" : "success-message"
  }">${message}</div>`;
}

function validatePrimes() {
  const p = parseInt(document.getElementById("primeP").value);
  const q = parseInt(document.getElementById("primeQ").value);

  if (!p || !q) {
    showMessage("stage1Message", "Please enter both prime numbers!", true);
    return;
  }

  // Check if primes are in the allowed range
  if (p < gameState.primeRange.min || p > gameState.primeRange.max) {
    showMessage(
      "stage1Message",
      `P must be between ${gameState.primeRange.min} and ${gameState.primeRange.max}!`,
      true
    );
    return;
  }

  if (q < gameState.primeRange.min || q > gameState.primeRange.max) {
    showMessage(
      "stage1Message",
      `Q must be between ${gameState.primeRange.min} and ${gameState.primeRange.max}!`,
      true
    );
    return;
  }

  if (!isPrime(p)) {
    showMessage(
      "stage1Message",
      `${p} is not a prime number! Try again.`,
      true
    );
    return;
  }

  if (!isPrime(q)) {
    showMessage(
      "stage1Message",
      `${q} is not a prime number! Try again.`,
      true
    );
    return;
  }

  if (p === q) {
    showMessage(
      "stage1Message",
      "P and Q must be different prime numbers!",
      true
    );
    return;
  }

  gameState.p = p;
  gameState.q = q;
  gameState.n = p * q;
  gameState.phi = (p - 1) * (q - 1);

  showMessage("stage1Message", `Perfect! P=${p}, Q=${q} are both prime!`);

  setTimeout(() => {
    nextStage();
  }, 1500);
}

function validatePublicKey() {
  const e = parseInt(document.getElementById("publicKeyE").value);

  if (!e || e <= 1) {
    showMessage(
      "stage2Message",
      "Please enter a valid public key exponent!",
      true
    );
    return;
  }

  if (e >= gameState.phi) {
    showMessage(
      "stage2Message",
      `e must be less than φ(n) = ${gameState.phi}!`,
      true
    );
    return;
  }

  if (gcd(e, gameState.phi) !== 1) {
    showMessage(
      "stage2Message",
      `e must be coprime with φ(n) = ${gameState.phi}!`,
      true
    );
    return;
  }

  gameState.e = e;
  gameState.d = modInverse(e, gameState.phi);

  showMessage("stage2Message", `Excellent! e=${e} is a valid public key!`);

  setTimeout(() => {
    nextStage();
  }, 1500);
}

function encryptMessage() {
  const plaintext = document.getElementById("plaintext").value.trim();

  if (!plaintext) {
    showMessage("stage3Message", "Please enter a message to encrypt!", true);
    return;
  }

  if (plaintext.length > 10) {
    showMessage(
      "stage3Message",
      "Please keep message under 10 characters for this demo!",
      true
    );
    return;
  }

  gameState.plaintext = plaintext;
  gameState.encrypted = [];

  // Check each character's ASCII value
  for (let i = 0; i < plaintext.length; i++) {
    const charCode = plaintext.charCodeAt(i);
    if (charCode >= gameState.n) {
      showMessage(
        "stage3Message",
        `Error: Character '${plaintext[i]}' has ASCII value ${charCode}, which is ≥ n=${gameState.n}. ` +
          `RSA requires all message values to be less than n. Try using larger primes (p≥13, q≥17 recommended) or simpler characters like digits 0-9.`,
        true
      );
      return;
    }
    const encrypted = modPow(charCode, gameState.e, gameState.n);
    gameState.encrypted.push(encrypted);
  }

  const encryptedText = gameState.encrypted.join(" ");
  document.getElementById(
    "encryptedDisplay"
  ).innerHTML = `<div class="encrypted-text">Encrypted: ${encryptedText}</div>`;

  showMessage("stage3Message", "Message encrypted successfully!");

  setTimeout(() => {
    nextStage();
  }, 2000);
}

function decryptMessage() {
  const d = parseInt(document.getElementById("privateKeyD").value);

  if (!d) {
    showMessage("stage4Message", "Please enter the private key!", true);
    return;
  }

  if (d !== gameState.d) {
    showMessage(
      "stage4Message",
      `Incorrect private key! Hint: d × ${gameState.e} ≡ 1 (mod ${gameState.phi})`,
      true
    );
    return;
  }

  // Decrypt the message
  let decrypted = "";
  for (let encrypted of gameState.encrypted) {
    const decryptedChar = modPow(encrypted, d, gameState.n);
    decrypted += String.fromCharCode(decryptedChar);
  }

  if (decrypted === gameState.plaintext) {
    showMessage("stage4Message", `Perfect! Decrypted message: "${decrypted}"`);
    setTimeout(() => {
      completeGame();
    }, 2000);
  } else {
    showMessage(
      "stage4Message",
      "Decryption failed! Check your private key.",
      true
    );
  }
}

function nextStage() {
  document.getElementById(`stage${gameState.stage}`).style.display = "none";
  gameState.stage++;
  document.getElementById("currentStage").textContent = gameState.stage + "/4";

  if (gameState.stage === 2) {
    document.getElementById("rsaInfo").innerHTML = `n = p × q = ${
      gameState.p
    } × ${gameState.q} = ${gameState.n}<br>
                     φ(n) = (p-1)(q-1) = ${gameState.p - 1} × ${
      gameState.q - 1
    } = ${gameState.phi}<br>
                     Choose e such that gcd(e, ${gameState.phi}) = 1`;
  } else if (gameState.stage === 3) {
    document.getElementById(
      "keyInfo"
    ).innerHTML = `Public Key: (e=${gameState.e}, n=${gameState.n})<br>
                     Private Key: (d=${gameState.d}, n=${gameState.n})`;
  } else if (gameState.stage === 4) {
    document.getElementById(
      "finalEncrypted"
    ).innerHTML = `Encrypted Message: ${gameState.encrypted.join(" ")}`;
    document.getElementById(
      "decryptionInfo"
    ).innerHTML = `To decrypt, find d where d × ${gameState.e} ≡ 1 (mod ${gameState.phi})<br>
                     Hint: The private key d = ${gameState.d}`;
  }

  document.getElementById(`stage${gameState.stage}`).style.display = "block";
}

function completeGame() {
  const elapsed = Date.now() - gameState.startTime;
  const minutes = Math.floor(elapsed / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  const timeStr = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  document.getElementById(`stage${gameState.stage}`).style.display = "none";
  document.getElementById("gameComplete").style.display = "block";
  document.getElementById("finalTime").textContent = timeStr;

  clearInterval(timerInterval);

  // 🔥 POST to PHP to save game result
  const gameID = new URLSearchParams(window.location.search).get("gameID") || null;
  const username = localStorage.getItem("username") || "guest";  // 👈 or use actual username logic
  const payload = {
    username: username,
    gameID: gameID,
    score: gameState.plaintext.length * 100,  // ✏️ scoring logic here
    difficulty: gameState.difficulty,
    gameStatus: "completed"
  };

  fetch("api/save_score.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then((res) => res.json())
  .then((data) => {
    console.log("Saved:", data);
  })
  .catch((err) => {
    console.error("Error saving score:", err);
  });
}


function restartGame() {
  gameState = {
    stage: 0,
    difficulty: "",
    primeRange: { min: 3, max: 20 },
    startTime: 0,
    p: 0,
    q: 0,
    n: 0,
    phi: 0,
    e: 0,
    d: 0,
    plaintext: "",
    encrypted: [],
  };

  // Hide all stages and show difficulty selection
  document.getElementById("gameComplete").style.display = "none";
  ["stage1", "stage2", "stage3", "stage4"].forEach((id) => {
    document.getElementById(id).style.display = "none";
  });
  document.getElementById("difficultySelect").style.display = "block";
  document.getElementById("currentStage").textContent = "0";

  // Reset timer display
  document.getElementById("timer").textContent = "--:--";
  clearInterval(timerInterval);
}

function goHome() {
  restartGame();
}

// Initialize the game - show difficulty selection
document.getElementById("currentStage").textContent = "SELECT";


window.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");

  // Hide all possible sections
  ["usernamePrompt", "difficultySelect", "stage1", "stage2", "stage3", "stage4", "gameComplete"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  if (!username) {
    // 🟢 First-time user, ask for name
    document.getElementById("usernamePrompt").style.display = "block";
    document.getElementById("currentStage").textContent = "ENTER NAME";
  } else {
    // 🟡 Returning user, skip to difficulty
    gameState.username = username;
    document.getElementById("difficultySelect").style.display = "block";
    document.getElementById("currentStage").textContent = "SELECT";
  }

  // Reset timer display
  document.getElementById("timer").textContent = "--:--";
});


