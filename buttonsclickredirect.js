document.addEventListener("DOMContentLoaded", function() {
    // Games button
    document.getElementById("games-button").addEventListener("click", function() {
        window.location.href = "slider-options-games.html";
    });

    // real time games button
    document.getElementById("realtimegames").addEventListener("click", function() {
        window.location.href = "realTimeGames.html";
    });

    // ai music options button
    document.getElementById("aimusic").addEventListener("click", function() {
        window.location.href = "ai-music-options.html";
    });

    // ai raze
    document.getElementById("RazeName").addEventListener("click", function() {
        window.location.href = "raze.html";
    });
});