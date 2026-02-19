const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
const startBtn = document.getElementById("startBtn");
const speedBtn = document.getElementById("speedBtn");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;
highScoreElement.innerHTML = "High: " + highScore;

let dx = 0;
let dy = 0;
let snake = [{x: 10, y: 10}, {x: 10, y: 11}, {x: 10, y: 12}];
let food = {x: 5, y: 5};
let gameInterval;
let gameRunning = false;
let gameSpeed = 100;
let speedMode = "Normal";

function drawGame() {
    moveSnake();
    if (checkGameOver()) {
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("snakeHighScore", highScore);
            highScoreElement.innerHTML = "High: " + highScore;
        }
        alert("Game Over! Score: " + score);
        resetGame();
        return;
    }
    checkFoodCollision();
    clearCanvas();
    drawFood();
    drawSnake();
}

function clearCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#27ae60" : "#2ecc71"; // Head is darker green
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
    });
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
}

function drawFood() {
    ctx.fillStyle = "#e74c3c"; // Nicer red
    ctx.beginPath();
    ctx.arc((food.x * gridSize) + gridSize/2, (food.y * gridSize) + gridSize/2, gridSize/2 - 2, 0, Math.PI * 2);
    ctx.fill();
}

function checkFoodCollision() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score += 10;
        scoreElement.innerHTML = "Score: " + score;
        createFood();
        snake.push({}); 
    }
}

function createFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
    // Make sure food doesn't spawn on snake
    snake.forEach(part => {
        if (part.x === food.x && part.y === food.y) createFood();
    });
}

function checkGameOver() {
    if (dx === 0 && dy === 0) return false;
    if (snake[0].x < 0 || snake[0].x >= tileCount || snake[0].y < 0 || snake[0].y >= tileCount) return true;
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    return false;
}

function resetGame() {
    clearInterval(gameInterval);
    gameRunning = false;
    score = 0;
    scoreElement.innerHTML = "Score: 0";
    snake = [{x: 10, y: 10}, {x: 10, y: 11}, {x: 10, y: 12}];
    dx = 0;
    dy = 0;
}

function startGame() {
    if (gameRunning) return;
    gameRunning = true;
    dx = 0;
    dy = -1;
    gameInterval = setInterval(drawGame, gameSpeed);
}

// Controls
function setDirection(newDx, newDy) {
    if (!gameRunning) return;
    // Prevent 180 degree turns
    if (newDx === -dx && newDx !== 0) return;
    if (newDy === -dy && newDy !== 0) return;
    dx = newDx;
    dy = newDy;
}

window.addEventListener("keydown", e => {
    switch(e.key) {
        case "ArrowUp": setDirection(0, -1); break;
        case "ArrowDown": setDirection(0, 1); break;
        case "ArrowLeft": setDirection(-1, 0); break;
        case "ArrowRight": setDirection(1, 0); break;
    }
});

// Mobile Button Listeners
document.getElementById("upBtn").addEventListener("touchstart", (e) => { e.preventDefault(); setDirection(0, -1); });
document.getElementById("downBtn").addEventListener("touchstart", (e) => { e.preventDefault(); setDirection(0, 1); });
document.getElementById("leftBtn").addEventListener("touchstart", (e) => { e.preventDefault(); setDirection(-1, 0); });
document.getElementById("rightBtn").addEventListener("touchstart", (e) => { e.preventDefault(); setDirection(1, 0); });

// Click fallback for desktop/simulators
document.getElementById("upBtn").addEventListener("click", () => setDirection(0, -1));
document.getElementById("downBtn").addEventListener("click", () => setDirection(0, 1));
document.getElementById("leftBtn").addEventListener("click", () => setDirection(-1, 0));
document.getElementById("rightBtn").addEventListener("click", () => setDirection(1, 0));

speedBtn.addEventListener("click", () => {
    if (speedMode === "Normal") {
        gameSpeed = 60;
        speedMode = "Fast";
    } else if (speedMode === "Fast") {
        gameSpeed = 150;
        speedMode = "Slow";
    } else {
        gameSpeed = 100;
        speedMode = "Normal";
    }
    speedBtn.innerHTML = "Speed: " + speedMode;
    if (gameRunning) {
        clearInterval(gameInterval);
        gameInterval = setInterval(drawGame, gameSpeed);
    }
});

startBtn.addEventListener("click", startGame);
