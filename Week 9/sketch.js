function setup() {
    createCanvas(500, 700); // Taller canvas for your height
}

function draw() {
    // Blue background
    background(100, 150, 255);
    
    // Title
    textSize(24);
    fill(255);
    text("My Geometric Self-Portrait", 100, 30);

    // Curly hair 
    fill(50, 30, 10); // Dark brown hair
    noStroke();
    // Left side curls
    circle(160, 80, 25);
    circle(180, 100, 20);
    circle(160, 120, 30);
    circle(190, 70, 20);
    // Right side curls
    circle(340, 80, 25);
    circle(320, 100, 20);
    circle(340, 120, 30);
    circle(310, 70, 20);
    // Top curls
    circle(250, 50, 20);
    circle(220, 60, 25);
    circle(280, 60, 25);
    circle(280, 90, 30);
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
    circle(220, 150, 10); // Left eye pupil
    circle(280, 150, 10); // Right eye pupil
    
    // Eyebrows
    stroke(50, 30, 10);
    strokeWeight(3);
    line(205, 130, 235, 130); // Left eyebrow
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
}