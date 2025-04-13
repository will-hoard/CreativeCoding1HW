// Player variables
var playerX = 100;
var playerY = 100;
var playerSize = 30;
var playerSpeed = 5;

// Key codes for movement
var w = 87; 
var s = 83;
var a = 65;
var d = 68;

// Obstacle array
var obstacles = [];
var numObstacles = 3;

// Mouse-click obstacle
var mouseObstacle = {x: -100, y: -100, size: 25};

// Exit variables
var exitX, exitY, exitSize = 40;

// Game state
var gameWon = false;

function setup() {
    createCanvas(800, 600);
    
    // Initialize obstacles
    for (var i = 0; i < numObstacles; i++) {
        obstacles.push({
            x: random(width),
            y: random(height),
            size: random(20, 50),
            speedX: random(-3, 3),
            speedY: random(-3, 3),
            color: color(random(255), random(255), random(255))
        });
    }
    
    // Position exit in bottom-right corner
    exitX = width - exitSize - 20;
    exitY = height - exitSize - 20;
}

function draw() {
    background(220);
    
    // Draw borders
    drawBorders();
    
    // Move and draw obstacles
    updateObstacles();
    
    // Draw mouse obstacle if placed
    drawMouseObstacle();
    
    // Draw exit
    drawExit();
    
    // Handle player movement if game not won
    if (!gameWon) {
        handlePlayerMovement();
    }
    
    // Draw player
    drawPlayer();
    
    // Check win condition
    checkWin();
    
    // Display win message if game is won
    if (gameWon) {
        displayWinMessage();
    }
}

function drawBorders() {
    stroke(0);
    noFill();
    rect(0, 0, width, height);
}

function updateObstacles() {
    for (var i = 0; i < obstacles.length; i++) {
        var obs = obstacles[i];
        
        // Move obstacle
        obs.x += obs.speedX;
        obs.y += obs.speedY;
        
        // Wrap around screen edges
        if (obs.x > width + obs.size/2) obs.x = -obs.size/2;
        if (obs.x < -obs.size/2) obs.x = width + obs.size/2;
        if (obs.y > height + obs.size/2) obs.y = -obs.size/2;
        if (obs.y < -obs.size/2) obs.y = height + obs.size/2;
        
        // Randomly change direction occasionally
        if (random() < 0.02) {
            obs.speedX = random(-3, 3);
            obs.speedY = random(-3, 3);
        }
        
        // Draw obstacle
        fill(obs.color);
        noStroke();
        ellipse(obs.x, obs.y, obs.size);
    }
}

function drawMouseObstacle() {
    fill(150, 100, 200);
    noStroke();
    ellipse(mouseObstacle.x, mouseObstacle.y, mouseObstacle.size);
}

function drawExit() {
    fill(255, 255, 0);
    stroke(0);
    rect(exitX, exitY, exitSize, exitSize);
    fill(0);
    noStroke();
    textSize(16);
    text("EXIT", exitX + 5, exitY + exitSize/2 + 5);
}

function handlePlayerMovement() {
    if (keyIsDown(w) || keyIsDown(UP_ARROW)) {
        playerY -= playerSpeed;
    }
    if (keyIsDown(s) || keyIsDown(DOWN_ARROW)) {
        playerY += playerSpeed;
    }
    if (keyIsDown(a) || keyIsDown(LEFT_ARROW)) {
        playerX -= playerSpeed;
    }
    if (keyIsDown(d) || keyIsDown(RIGHT_ARROW)) {
        playerX += playerSpeed;
    }
    
    // Wrap player around screen edges
    if (playerX > width + playerSize/2) playerX = -playerSize/2;
    if (playerX < -playerSize/2) playerX = width + playerSize/2;
    if (playerY > height + playerSize/2) playerY = -playerSize/2;
    if (playerY < -playerSize/2) playerY = height + playerSize/2;
}

function drawPlayer() {
    fill(0, 100, 255);
    noStroke();
    ellipse(playerX, playerY, playerSize);
}

function checkWin() {
    // Check if player is within exit area using logical AND
    if (playerX > exitX && playerX < exitX + exitSize &&
        playerY > exitY && playerY < exitY + exitSize) {
        gameWon = true;
    }
}

function displayWinMessage() {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("You Win!", width/2, height/2);
    textSize(16);
    text("Refresh to play again", width/2, height/2 + 40);
}

function mouseClicked() {
    // Place mouse obstacle at click position
    mouseObstacle.x = mouseX;
    mouseObstacle.y = mouseY;
}