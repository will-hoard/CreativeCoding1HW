// ===== PRELOAD =====
let bgMusic, bugImg, villainImg, squishSound, gameOverImg, bgImg;
let bulletImg, shootSound, poofImg, poofSound;

function preload() {
  bgImg = loadImage('assets/Background.jpg');
  bgMusic = loadSound('assets/Ambient Sound.mp3');
  bugImg = loadImage('assets/Bug.png');
  villainImg = loadImage('assets/Villain.png');
  squishSound = loadSound('assets/Squish sound.mp3');
  gameOverImg = loadImage('assets/Game Over.png');
  bulletImg = loadImage('assets/bullet.png');
  shootSound = loadSound('assets/Shoot.mp3');
  poofImg = loadImage('assets/Poof.png');
  poofSound = loadSound('assets/Poof.mp3');
}

// ===== GAME VARIABLES =====
let bug, obstacles = [], gameOver = false, gameStarted = false;
let debugMode = false, soundEnabled = false, soundButton;
let bullets = [], lastShot = 0, shootCooldown = 15, bulletSpeed = 10;
let poofs = [], lastMoveDirection = 'up'; // Tracks firing direction
const VILLAIN_SPAWN_RATE = 60;
const VILLAIN_SPEED = 3;

// Scoring
let timeAlive = 0;    // Frames survived
let villainKills = 0; // Enemies defeated

// ===== SETUP =====
function setup() {
  createCanvas(800, 600);
  
  // Sound button
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
  
  // Initialize bug
  bug = {
    x: width / 2,
    y: height - 100,
    w: 120,
    h: 90,
    speed: 5
  };
  
  document.addEventListener('keydown', spacePressed);
}

// ===== MAIN GAME LOOP =====
function draw() {
  imageMode(CORNER);
  if (bgImg) image(bgImg, 0, 0, width, height);
  else background(135, 206, 235);
  
  if (!gameStarted) startScreen();
  else if (!gameOver) playGame();
  else endGame();
}

// ===== GAME SCREENS =====
function startScreen() {
  soundButton.show();
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text("BUG ESCAPE", width / 2, height / 2 - 80);
  
  // New instructions
  textSize(18);
  text("ARROWS: Move & Aim\nSPACE: Shoot in moving direction", width / 2, height / 2 - 20);
  
  textSize(20);
  text("Click to Start", width / 2, height / 2 + 50);
  
  if (mouseIsPressed) {
    gameStarted = true;
    startAudioContext();
    soundButton.hide();
  }
}

function playGame() {
  // Update time
  timeAlive++;
  
  // Draw bug
  imageMode(CENTER);
  if (bugImg) image(bugImg, bug.x, bug.y, bug.w, bug.h);
  
  // Movement (updates firing direction)
  handleBugMovement();
  
  // Spawn villains
  if (frameCount % VILLAIN_SPAWN_RATE === 0) spawnVillain();
  
  // Update systems
  updateBullets();
  updateVillains();
  updatePoofs();
  
  // Display stats
  drawStats();
}

function drawStats() {
  fill(255);
  textSize(24);
  textAlign(LEFT);
  text("Time Alive: " + floor(timeAlive/60) + "s", 20, 40);
  text("Score: " + villainKills, 20, 70);
}

// ===== MOVEMENT & SHOOTING =====
function handleBugMovement() {
  if (keyIsDown(LEFT_ARROW)) {
    bug.x = max(bug.x - bug.speed, bug.w/2);
    lastMoveDirection = 'left';
  }
  if (keyIsDown(RIGHT_ARROW)) {
    bug.x = min(bug.x + bug.speed, width - bug.w/2);
    lastMoveDirection = 'right';
  }
  if (keyIsDown(UP_ARROW)) {
    bug.y = max(bug.y - bug.speed, bug.h/2);
    lastMoveDirection = 'up';
  }
  if (keyIsDown(DOWN_ARROW)) {
    bug.y = min(bug.y + bug.speed, height - bug.h/2);
    lastMoveDirection = 'down';
  }
}

function spacePressed(e) {
  if (e.code === 'Space' && gameStarted && !gameOver) shoot();
}

function shoot() {
  if (frameCount - lastShot > shootCooldown) {
    let bullet = {
      x: bug.x,
      y: bug.y,
      w: 60,  // 4x size
      h: 120,
      speed: bulletSpeed,
      direction: lastMoveDirection
    };
    
    // Adjust spawn position
    switch(lastMoveDirection) {
      case 'up': bullet.y -= bug.h/2; break;
      case 'down': bullet.y += bug.h/2; break;
      case 'left': bullet.x -= bug.w/2; break;
      case 'right': bullet.x += bug.w/2; break;
    }
    
    bullets.push(bullet);
    lastShot = frameCount;
    if (soundEnabled && shootSound) shootSound.play();
  }
}

// ===== BULLET SYSTEM =====
function updateBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    let b = bullets[i];
    
    // Move based on direction
    switch(b.direction) {
      case 'up': b.y -= b.speed; break;
      case 'down': b.y += b.speed; break;
      case 'left': b.x -= b.speed; break;
      case 'right': b.x += b.speed; break;
    }
    
    // Rotated drawing
    push();
    imageMode(CENTER);
    translate(b.x, b.y);
    switch(b.direction) {
      case 'left': rotate(-HALF_PI); break;
      case 'right': rotate(HALF_PI); break;
      case 'down': rotate(PI); break;
    }
    if (bulletImg) image(bulletImg, 0, 0, b.w, b.h);
    pop();
    
    // Remove off-screen
    if (b.x < -100 || b.x > width + 100 || b.y < -100 || b.y > height + 100) {
      bullets.splice(i, 1);
      continue;
    }
    
    // Check collisions
    for (let j = obstacles.length - 1; j >= 0; j--) {
      if (isColliding(b, obstacles[j])) {
        createPoof(obstacles[j].x, obstacles[j].y);
        obstacles.splice(j, 1);
        bullets.splice(i, 1);
        villainKills++;
        break;
      }
    }
  }
}

// ===== VILLAIN SYSTEM =====
function spawnVillain() {
  let size = 120;
  let side = floor(random(4));
  let newVillain;
  
  switch(side) {
    case 0: newVillain = { x: random(width), y: -size/2, w: size, h: size, speed: VILLAIN_SPEED, direction: 'top' }; break;
    case 1: newVillain = { x: width + size/2, y: random(height), w: size, h: size, speed: VILLAIN_SPEED, direction: 'right' }; break;
    case 2: newVillain = { x: random(width), y: height + size/2, w: size, h: size, speed: VILLAIN_SPEED, direction: 'bottom' }; break;
    case 3: newVillain = { x: -size/2, y: random(height), w: size, h: size, speed: VILLAIN_SPEED, direction: 'left' }; break;
  }
  
  obstacles.push(newVillain);
}

function updateVillains() {
  for (let i = obstacles.length - 1; i >= 0; i--) {
    let obs = obstacles[i];
    
    // Movement
    if (obs.direction === 'top') obs.y += obs.speed;
    else if (obs.direction === 'bottom') obs.y -= obs.speed;
    else if (obs.direction === 'left') obs.x += obs.speed;
    else if (obs.direction === 'right') obs.x -= obs.speed;
    
    // Drawing
    imageMode(CENTER);
    if (villainImg) image(villainImg, obs.x, obs.y, obs.w, obs.h);
    
    // Collision with bug
    if (isColliding(bug, obs)) {
      gameOver = true;
      if (soundEnabled) {
        squishSound.play();
        bgMusic.stop();
      }
    }
    
    // Remove off-screen
    if (obs.y < -100 || obs.y > height + 100 || obs.x < -100 || obs.x > width + 100) {
      obstacles.splice(i, 1);
    }
  }
}

// ===== POOF EFFECTS =====
function createPoof(x, y) {
  poofs.push({
    x: x,
    y: y,
    size: 80,
    frame: 0,
    maxFrames: 10
  });
  if (soundEnabled && poofSound) poofSound.play();
}

function updatePoofs() {
  for (let i = poofs.length - 1; i >= 0; i--) {
    poofs[i].frame++;
    imageMode(CENTER);
    image(poofImg, poofs[i].x, poofs[i].y, poofs[i].size, poofs[i].size);
    
    if (poofs[i].frame >= poofs[i].maxFrames) {
      poofs.splice(i, 1);
    }
  }
}

// ===== CORE FUNCTIONS =====
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

function endGame() {
  imageMode(CENTER);
  if (gameOverImg) image(gameOverImg, width/2, height/2, 400, 200);
  
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text("Time Alive: " + floor(timeAlive/60) + "s", width/2, height/2 + 100);
  text("Score: " + villainKills, width/2, height/2 + 130);
  text("Press R to Restart", width/2, height/2 + 180);
  
  if (keyIsDown(82)) resetGame();
}

function resetGame() {
  timeAlive = 0;
  villainKills = 0;
  obstacles = [];
  bullets = [];
  poofs = [];
  gameOver = false;
  gameStarted = false;
  bug.x = width / 2;
  bug.y = height - 100;
  if (soundEnabled && bgMusic) bgMusic.loop();
}

// ===== SOUND SYSTEM =====
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
  if (soundEnabled && bgMusic) bgMusic.loop();
}

function keyPressed() {
  if (key === 'd' || key === 'D') debugMode = !debugMode;
}