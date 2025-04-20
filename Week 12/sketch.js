// Game variables
let shipX, shipY;
let starX, starY;
let asteroids = [];
const keys = { w: 87, a: 65, s: 83, d: 68 };

function setup() {
  createCanvas(800, 600);
  createPlayer();
  createExit();
  createObstacles();
}

function draw() {
  background(10, 20, 40); // Dark blue space background
  drawBorders();
  drawExit();
  movePlayer();
  drawPlayer();
  drawStar();
  moveObstacles();
  drawObstacles();
  checkWin();
}

// 1. Create player function
function createPlayer() {
  shipX = width / 4;
  shipY = height / 2;
}

// 2. Move player function
function movePlayer() {
  if (keyIsDown(keys.a)) shipX -= 5;
  if (keyIsDown(keys.d)) shipX += 5;
  if (keyIsDown(keys.w)) shipY -= 5;
  if (keyIsDown(keys.s)) shipY += 5;
}

// Draw player function
function drawPlayer() {
  fill(100, 200, 255);
  triangle(
    shipX, shipY - 15,
    shipX - 10, shipY + 10,
    shipX + 10, shipY + 10
  );
}

// 3. Create object on mouse click
function mouseClicked() {
  starX = mouseX;
  starY = mouseY;
}

function drawStar() {
  if (starX && starY) {
    fill(255, 255, 100);
    star(starX, starY, 10, 20, 5);
  }
}

// Helper function to draw a star
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// 4. Create obstacles function
function createObstacles() {
  // Create 3 asteroids of different sizes and colors
  asteroids = [
    { x: 600, y: 100, size: 40, color: [150, 75, 0], xSpeed: 2, ySpeed: 1.5 },
    { x: 400, y: 400, size: 60, color: [100, 50, 0], xSpeed: -1, ySpeed: 2 },
    { x: 200, y: 300, size: 30, color: [200, 100, 0], xSpeed: 1.5, ySpeed: -1 }
  ];
}

// 5. Move obstacles function
function moveObstacles() {
  for (let asteroid of asteroids) {
    asteroid.x += asteroid.xSpeed;
    asteroid.y += asteroid.ySpeed;
    
    // Wrap around screen edges
    if (asteroid.x > width + asteroid.size) asteroid.x = -asteroid.size;
    if (asteroid.x < -asteroid.size) asteroid.x = width + asteroid.size;
    if (asteroid.y > height + asteroid.size) asteroid.y = -asteroid.size;
    if (asteroid.y < -asteroid.size) asteroid.y = height + asteroid.size;
  }
}

function drawObstacles() {
  for (let asteroid of asteroids) {
    fill(asteroid.color);
    ellipse(asteroid.x, asteroid.y, asteroid.size);
  }
}

// 6. Create borders function
function drawBorders() {
  stroke(100, 150, 255);
  strokeWeight(5);
  noFill();
  rect(0, 0, width, height);
}

// 7. Create exit function
function createExit() {
  // Exit position is set in drawExit
}

function drawExit() {
  fill(0, 200, 100);
  rect(width - 60, height - 60, 50, 50);
  fill(255);
  textSize(20);
  text("EXIT", width - 55, height - 30);
}

// 8. Win message function
function checkWin() {
  if (shipX > width - 60 && shipY > height - 60) {
    showWinMessage();
  }
}

function showWinMessage() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Mission Complete!", width/2, height/2);
  textAlign(LEFT, BASELINE); // Reset alignment
}