function loadLeaderboard(difficulty) {
  fetch(`api/get_leaderboard.php?difficulty=${difficulty}`)
    .then((res) => res.json())
    .then((data) => {
      const tableBody = document.getElementById("leaderboardTableBody");
      tableBody.innerHTML = ""; // clear existing

      data.forEach((entry, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${entry.username}</td>
          <td>${entry.score}</td>
          <td>${entry.gameStatus}</td>
          <td>${new Date(entry.lastUpdated).toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((err) => {
      console.error("Error loading leaderboard:", err);
    });
}
