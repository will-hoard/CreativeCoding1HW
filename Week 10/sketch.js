let xPos1 = 160, xPos2 = 340; 
let yPos1 = 130, yPos2 = 130;  
let xyPosX = 220, xyPosY = 150; 
let xSpeed1, xSpeed2, ySpeed1, ySpeed2, xySpeedX, xySpeedY;
let titleSize = 24;
let sizeChange = 1;
let sizeCount = 0;

function setup() {
    createCanvas(500, 700);
    
    xSpeed1 = random(0.5, 2);
    xSpeed2 = random(0.5, 2);
    ySpeed1 = random(0.5, 2);
    ySpeed2 = random(0.5, 2);
    xySpeedX = random(0.5, 2);
    xySpeedY = random(0.5, 2);
}

function draw() {
    background(100, 150, 255);
    
    textSize(titleSize);
    fill(255);
    text("My Geometric Self-Portrait", 100, 30);
    
    titleSize += sizeChange;
    sizeCount++;
    
    if (sizeCount % 5 == 0) {
        sizeChange *= -1;
    }

    fill(50, 30, 10); 
    noStroke();
    
    circle(xPos1, 80, 25); 
    circle(180, 100, 20);
    circle(160, 120, 30);
    circle(190, 70, 20);
    
    circle(xPos2, 80, 25); 
    circle(320, 100, 20);
    circle(340, 120, 30);
    circle(310, 70, 20);
    
    circle(250, 50, 20);
    circle(220, 60, 25);
    circle(280, 60, 25);
    circle(280, yPos1, 30); 
    circle(220, 90, 30);
    circle(250, 90, 20);
    circle(250, 72, 13);
    
    fill(230, 180, 150); 
    rect(175, 110, 150, 100, 20);
    triangle(175, 200, 325, 200, 250, 250);
    
    fill(255);
    ellipse(220, 150, 30, 20); 
    ellipse(280, 150, 30, 20);
    fill(0);
    circle(xyPosX, xyPosY, 10); 
    circle(280, 150, 10); 
    
    stroke(50, 30, 10);
    strokeWeight(3);
    line(205, yPos2, 235, yPos2); 
    line(265, 130, 295, 130); 
    
    noStroke();
    
    fill(200, 0, 0);
    ellipse(250, 210, 40, 20);
    
    fill(230, 180, 150);
    rect(240, 240, 20, 60);
    
    fill(50, 200, 80);
    rect(175, 290, 150, 150, 10);
    
    fill(230, 180, 150);
    rect(160, 300, 20, 150); 
    rect(320, 300, 20, 150); 
    
    fill(101, 67, 33);
    rect(180, 440, 40, 150); 
    rect(280, 440, 40, 150); 
    
    fill(0);
    rect(140, 590, 100, 20); 
    rect(260, 590, 100, 20); 
    
    fill(255);
    textSize(20);
    text("WILL HOARD", 200, 650);
    
    xPos1 += xSpeed1;
    xPos2 += xSpeed2;
    
    if (xPos1 > 180 || xPos1 < 140) {
        xSpeed1 *= -1;
    }
    if (xPos2 > 360 || xPos2 < 320) {
        xSpeed2 *= -1;
    }
    
    yPos1 += ySpeed1;
    yPos2 += ySpeed2;
    
    if (yPos1 > 100 || yPos1 < 70) {
        ySpeed1 *= -1;
    }
    if (yPos2 > 140 || yPos2 < 120) {
        ySpeed2 *= -1;
    }
    
    xyPosX += xySpeedX;
    xyPosY += xySpeedY;
    
    if (xyPosX > 230 || xyPosX < 210) {
        xySpeedX *= -1;
    }
    if (xyPosY > 160 || xyPosY < 140) {
        xySpeedY *= -1;
    }
}
