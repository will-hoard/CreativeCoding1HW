// ===== PRELOAD =====
let bgMusic;
let bugImg;
let villainImg;
let squishSound;
let gameOverImg;
let bgImg;

function preload() {
  bgImg = loadImage('assets/Background.jpg');
  bgMusic = loadSound('assets/Ambient Sound.mp3');
  bugImg = loadImage('assets/Bug.png');
  villainImg = loadImage('assets/Villain.png');
  squishSound = loadSound('assets/Squish sound.mp3');
  gameOverImg = loadImage('assets/Game Over.png');
}

// ===== GAME VARIABLES =====
let bug;
let obstacles = [];
let score = 0;
let gameOver = false;
let gameStarted = false;
let debugMode = false; // Collision boxes disabled by default
let soundEnabled = false;
let soundButton;

// ===== SETUP =====
function setup() {
  createCanvas(800, 600);
  
  // Sound toggle button
  soundButton = createButton('🔇 Enable Sound');
  soundButton.position(20, 20);
  soundButton.mousePressed(toggleSound);
  soundButton.hide();
  soundButton.style('font-size', '16px');
  soundButton.style('padding', '5px 10px');
  soundButton.style('background-color', '#222');
  soundButton.style('color', 'white');
  soundButton.style('border', 'none');
  soundButton.style('border-radius', '5px');
  
  // Initialize bug with 3x size
  bug = {
    x: width / 2,
    y: height - 100,
    w: 120,
    h: 90,
    speed: 5
  };
}

// ===== DRAW =====
function draw() {
  imageMode(CORNER);
  if (bgImg) image(bgImg, 0, 0, width, height);
  else background(135, 206, 235);
  
  if (!gameStarted) {
    startScreen();
  } else if (!gameOver) {
    playGame();
  } else {
    endGame();
  }
}

// ===== GAME SCREENS =====
function startScreen() {
  soundButton.show();
  
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text("BUG ESCAPE", width / 2, height / 2 - 50);
  textSize(20);
  text("Click to Start", width / 2, height / 2 + 50);
  
  if (mouseIsPressed) {
    gameStarted = true;
    startAudioContext();
    soundButton.hide();
  }
}

function playGame() {
  // Draw bug
  imageMode(CENTER);
  if (bugImg) image(bugImg, bug.x, bug.y, bug.w, bug.h);
  else {
    fill(255, 0, 0);
    ellipse(bug.x, bug.y, bug.w, bug.h);
  }
  
  // Move bug
  handleBugMovement();
  
  // Spawn villains from all sides
  if (frameCount % 60 === 0) {
    spawnVillain();
  }
  
  // Draw and move villains
  imageMode(CENTER);
  for (let i = obstacles.length - 1; i >= 0; i--) {
    let obs = obstacles[i];
    if (villainImg) image(villainImg, obs.x, obs.y, obs.w, obs.h);
    else rect(obs.x, obs.y, obs.w, obs.h);
    
    // Movement based on direction
    if (obs.direction === 'top') obs.y += obs.speed;
    else if (obs.direction === 'bottom') obs.y -= obs.speed;
    else if (obs.direction === 'left') obs.x += obs.speed;
    else if (obs.direction === 'right') obs.x -= obs.speed;
    
    // Remove off-screen villains
    if (obs.y < -100 || obs.y > height + 100 || 
        obs.x < -100 || obs.x > width + 100) {
      obstacles.splice(i, 1);
    }
    
    // Check collision
    if (isColliding(bug, obs)) {
      gameOver = true;
      if (soundEnabled && squishSound) squishSound.play();
      if (bgMusic) bgMusic.stop();
    }
  }
  
  // Score
  score++;
  drawScore();
}

function spawnVillain() {
  let size = 120;
  let speed = random(2, 5);
  let side = floor(random(4));
  let newVillain;
  
  switch(side) {
    case 0: // Top
      newVillain = { x: random(width), y: -size/2, w: size, h: size, speed: speed, direction: 'top' };
      break;
    case 1: // Right
      newVillain = { x: width + size/2, y: random(height), w: size, h: size, speed: speed, direction: 'right' };
      break;
    case 2: // Bottom
      newVillain = { x: random(width), y: height + size/2, w: size, h: size, speed: speed, direction: 'bottom' };
      break;
    case 3: // Left
      newVillain = { x: -size/2, y: random(height), w: size, h: size, speed: speed, direction: 'left' };
      break;
  }
  
  obstacles.push(newVillain);
}

function endGame() {
  imageMode(CENTER);
  if (gameOverImg) {
    image(gameOverImg, width/2, height/2, 400, 200);
  }
  
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text("Score: " + score, width/2, height/2 + 100);
  text("Press R to Restart", width/2, height/2 + 150);
  
  if (keyIsDown(82)) {
    resetGame();
  }
}

// ===== GAME FUNCTIONS =====
function handleBugMovement() {
  if (keyIsDown(LEFT_ARROW)) bug.x = max(bug.x - bug.speed, bug.w/2);
  if (keyIsDown(RIGHT_ARROW)) bug.x = min(bug.x + bug.speed, width - bug.w/2);
  if (keyIsDown(UP_ARROW)) bug.y = max(bug.y - bug.speed, bug.h/2);
  if (keyIsDown(DOWN_ARROW)) bug.y = min(bug.y + bug.speed, height - bug.h/2);
}

function isColliding(a, b) {
  const aWidth = a.w * 0.6;
  const aHeight = a.h * 0.6;
  const bWidth = b.w * 0.6;
  const bHeight = b.h * 0.6;
  
  return (
    a.x - aWidth/2 < b.x + bWidth/2 &&
    a.x + aWidth/2 > b.x - bWidth/2 &&
    a.y - aHeight/2 < b.y + bHeight/2 &&
    a.y + aHeight/2 > b.y - bHeight/2
  );
}

function drawScore() {
  fill(255);
  textSize(24);
  textAlign(LEFT);
  text("Score: " + score, 20, 40);
}

function resetGame() {
  score = 0;
  obstacles = [];
  gameOver = false;
  gameStarted = false;
  bug.x = width / 2;
  bug.y = height - 100;
  if (soundEnabled && bgMusic) bgMusic.loop();
}

// ===== SOUND FUNCTIONS =====
function toggleSound() {
  soundEnabled = !soundEnabled;
  soundButton.html(soundEnabled ? '🔊 Sound On' : '🔇 Sound Off');
  
  if (soundEnabled) {
    getAudioContext().resume().then(() => {
      if (bgMusic) {
        bgMusic.loop();
        bgMusic.setVolume(0.5);
      }
    });
  } else {
    if (bgMusic) bgMusic.stop();
  }
}

function startAudioContext() {
  if (soundEnabled && bgMusic) {
    bgMusic.loop();
  }
}

function keyPressed() {
  if (key === 'd' || key === 'D') {
    debugMode = !debugMode;
  }
}