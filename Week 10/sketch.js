// Variables for animation control
let xPos1 = 160, xPos2 = 340; // For x-axis moving elements (curls)
let yPos1 = 130, yPos2 = 130;  // For y-axis moving elements (eyebrows)
let xyPosX = 220, xyPosY = 150; // For diagonal moving element (left pupil)
let xSpeed1, xSpeed2, ySpeed1, ySpeed2, xySpeedX, xySpeedY;
let titleSize = 24;
let sizeChange = 1;
let sizeCount = 0;

function setup() {
    createCanvas(500, 700);
    
    // Initialize random speeds
    xSpeed1 = random(0.5, 2);
    xSpeed2 = random(0.5, 2);
    ySpeed1 = random(0.5, 2);
    ySpeed2 = random(0.5, 2);
    xySpeedX = random(0.5, 2);
    xySpeedY = random(0.5, 2);
}

function draw() {
    // Blue background
    background(100, 150, 255);
    
    // Animated Title (grows and shrinks)
    textSize(titleSize);
    fill(255);
    text("My Geometric Self-Portrait", 100, 30);
    
    // Update title size
    titleSize += sizeChange;
    sizeCount++;
    
    // Reverse size change after 5 frames
    if (sizeCount % 5 == 0) {
        sizeChange *= -1;
    }

    // Curly hair 
    fill(50, 30, 10); // Dark brown hair
    noStroke();
    
    // Left side curls - one will move on x-axis
    circle(xPos1, 80, 25); // This curl will move horizontally
    circle(180, 100, 20);
    circle(160, 120, 30);
    circle(190, 70, 20);
    
    // Right side curls - one will move on x-axis
    circle(xPos2, 80, 25); // This curl will move horizontally
    circle(320, 100, 20);
    circle(340, 120, 30);
    circle(310, 70, 20);
    
    // Top curls - one will move on y-axis
    circle(250, 50, 20);
    circle(220, 60, 25);
    circle(280, 60, 25);
    circle(280, yPos1, 30); // This curl will move vertically
    circle(220, 90, 30);
    circle(250, 90, 20);
    circle(250, 72, 13);
    
    // Pentagonal face (using triangle and rectangle)
    fill(230, 180, 150); // Skin tone
    // Top part of face (rectangle)
    rect(175, 110, 150, 100, 20);
    // Chin (triangle pointing down)
    triangle(175, 200, 325, 200, 250, 250);
    
    // Eyes
    fill(255);
    ellipse(220, 150, 30, 20); // Left eye white
    ellipse(280, 150, 30, 20); // Right eye white
    fill(0);
    circle(xyPosX, xyPosY, 10); // Left eye pupil - will move diagonally
    circle(280, 150, 10); // Right eye pupil
    
    // Eyebrows - one will move on y-axis
    stroke(50, 30, 10);
    strokeWeight(3);
    line(205, yPos2, 235, yPos2); // Left eyebrow - will move vertically
    line(265, 130, 295, 130); // Right eyebrow
    
    // Nose
    noStroke();
    
    // Mouth
    fill(200, 0, 0);
    ellipse(250, 210, 40, 20);
    
    // Neck
    fill(230, 180, 150);
    rect(240, 240, 20, 60);
    
    // Green shirt
    fill(50, 200, 80);
    rect(175, 290, 150, 150, 10);
    
    // Arms 
    fill(230, 180, 150);
    rect(160, 300, 20, 150); // Left arm
    rect(320, 300, 20, 150); // Right arm
    
    // Brown pants
    fill(101, 67, 33);
    rect(180, 440, 40, 150); // Left leg
    rect(280, 440, 40, 150); // Right leg
    
    // Shoes
    fill(0);
    rect(140, 590, 100, 20); // Left shoe
    rect(260, 590, 100, 20); // Right shoe
    
    // Signature
    fill(255);
    textSize(20);
    text("WILL HOARD", 200, 650);
    
    // Update positions for animations
    
    // X-axis movement (left and right curls)
    xPos1 += xSpeed1;
    xPos2 += xSpeed2;
    
    // Reverse direction when hitting boundaries
    if (xPos1 > 180 || xPos1 < 140) {
        xSpeed1 *= -1;
    }
    if (xPos2 > 360 || xPos2 < 320) {
        xSpeed2 *= -1;
    }
    
    // Y-axis movement (top curl and eyebrow)
    yPos1 += ySpeed1;
    yPos2 += ySpeed2;
    
    // Reverse direction when hitting boundaries
    if (yPos1 > 100 || yPos1 < 70) {
        ySpeed1 *= -1;
    }
    if (yPos2 > 140 || yPos2 < 120) {
        ySpeed2 *= -1;
    }
    
    // Diagonal movement (left pupil)
    xyPosX += xySpeedX;
    xyPosY += xySpeedY;
    
    // Reverse direction when hitting boundaries
    if (xyPosX > 230 || xyPosX < 210) {
        xySpeedX *= -1;
    }
    if (xyPosY > 160 || xyPosY < 140) {
        xySpeedY *= -1;
    }
}