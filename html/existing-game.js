document.addEventListener("DOMContentLoaded", () => {
  fetch("api/get_existing_games.php")
    .then((response) => response.json())
    .then((games) => {
      const tableBody = document.getElementById("gamesTableBody");
      games.forEach((game) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${game.gameID}</td>
          <td>${game.username}</td>
          <td>${game.score}</td>
          <td>${game.difficulty}</td>
          <td>${game.gameStatus}</td>
          <td>${new Date(game.lastUpdated).toLocaleString()}</td>
          <td>
            <button class="pixel-button" onclick="resumeGame(${game.gameID})">
              RESUME
            </button>
          </td>
        `;

        tableBody.appendChild(row);
      });
    })
    .catch((err) => {
      console.error("Error loading games:", err);
    });
});

function resumeGame(gameID) {
  // Redirect to game.html with gameID
  window.location.href = `game.html?gameID=${gameID}`;
}
