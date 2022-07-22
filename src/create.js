"use strict";

// cool seeds PS these do not work, seed function does not function
// no street quad tower : 11758247
// twin tower ; 13295945

const tileSize = 10;
let column;
let row;
let type;
let tileX;
let tileY;
let cam1;
let cam2;
let cam3;
let cam4;
let cam5;
let scaler;
let seed = 12345;
let chance = 0;
let rand;
let movingCar;
let currentSeed;
let seedValue;
// let xPosSlider;
// let yPosSlider;
// let zPosSlider;
let cx;
let cy;
let cz;
let numCam = 0;
let a;
let b;
let tileCounter;
let myFont;
let bg;

function preload() {
    myFont = loadFont("./assets/warriot.otf");
    bg = loadImage("./assets/clouds.jpg");
}

function setup() {
    let canvas = createCanvas(800, 800, WEBGL);
    canvas.parent("container");
    cam1 = createCamera();
    cam2 = createCamera();
    cam3 = createCamera();
    cam4 = createCamera();
    cam5 = createCamera();
    cam1.setPosition(0, 500, 500);
    cam1.lookAt(0, 0, 0);
    cam2.setPosition(500, 0, 500);
    cam2.lookAt(0, 0, 0);
    cam3.setPosition(0, -500, 500);
    cam3.lookAt(0, 0, 0);
    cam4.setPosition(-500, 0, 500);
    cam4.lookAt(0, 0, 0);
    cam5.setPosition(0, 0, 700);
    cam5.lookAt(0, 0, 0);

    let label = createP();
    label.html("Input: ");
    label.parent("container");

    rand = Math.random();
    currentSeed = rand.toString().substr(2, 8);

    let input = createInput(currentSeed);
    input.parent(label);
    input.input(() => {
        rebuildWorld(input.value());
    });
    label.position(825, 90);
    input.position(55, 0);

    // let seedSlider = createSlider(-99999999, 99999999, random(1, 100) * random(1, 100));
    // seedSlider.position(400, 820);
    // fill(0);

    let seedLabel = createP();
    seedLabel.html("THE SEED IS A LIE:    . . .      just hit reroll :)");
    seedLabel.parent("container"); 

    let instructions = createP("Use the reroll button :) \n rotate button is funky, use your mouse to move around");
    instructions.position(825, 40);

    createButton('reroll').mousePressed(() => rebuildWorld(currentSeed));
    createButton('rotate').mousePressed(() => numCam++);
    
    // xPosSlider = createSlider(-1000, 1000, 0);
    // xPosSlider.position(900, 40);
    // fill(0);

    // yPosSlider = createSlider(-1000, 1000, 500);
    // yPosSlider.position(900, 70);
    // fill(0);

    // zPosSlider = createSlider(-1000, 1000, 500);
    // zPosSlider.position(900, 100);
    // fill(0);

    // cx = createSlider(-1000, 1000, 0);
    // cx.position(900, 130);
    // fill(0);

    // cy = createSlider(-1000, 1000, 0);
    // cy.position(900, 160);
    // fill(0);

    // cz = createSlider(-1000, 1000, 0);
    // cz.position(900, 190);
    // fill(0);

    tileX = [];
    tileY = [];
    column = Math.ceil(height / tileSize);
    row = Math.ceil(width / tileSize);
    movingCar = [];
    a = 0;
    b = 0;
    tileCounter = 0;

    // let fps = frameRate();
    // fill(255);
    // stroke(0);
    // textFont(myFont);
    // text("FPS: " + fps.toFixed(2), 1000, 220);
    

    // createP("Arrow keys scroll. Clicking changes tiles.").parent("container");
    rebuildWorld(input.value());

    // noLoop();
}

function rebuildWorld(key) {
    tileX = [];
    tileY = [];
    noiseSeed(key);
    randomSeed(key);

    rand = Math.random();
    currentSeed = rand.toString().substr(2, 8);
  }

function draw() {
    randomSeed(seed);
    orbitControl();

    if (numCam === 0) {
        cam1.lookAt(0, 0, 0);
        setCamera(cam1);
    } else if (numCam === 1) {
        cam2.lookAt(0, 0, 0);
        setCamera(cam2);
    } else if (numCam === 2) {
        cam3.lookAt(0, 0, 0);
        setCamera(cam3);
    }else if (numCam === 3) {
        cam4.lookAt(0, 0, 0);
        setCamera(cam4);
    } else if (numCam === 4) {
        cam5.lookAt(0, 0, 0);
        setCamera(cam5);
    } else {
        numCam = 0;
    }
    
    stroke(0);
    fill("#4F3107")
    background("#E8869A");
    push();
    translate(0, 0, -50);
    box(1000, 400, 100);
    fill("#222222");
    translate(0, 0, -25);
    box(1050, 450, 100);
    pop();

    
    for (let i = -20; i <= 20; i+= 1) {
        for (let k = -50; k <= 50; k+= 1) {
            if (i === 20 && k === 50) {
                break;
            } else {
                fillPlane(k * tileSize, i * tileSize);
            }
        }
    }
}

    function fillPlane(x, y) {
        push();

        // % based chance spawning for buildings
        chance = 0;
        if (tileX.includes(x + tileSize) || tileX.includes(x - tileSize) || tileY.includes(y + tileSize) || tileY.includes(y - tileSize)) {
            chance += 0.2;
        } else {
            chance -= 0.1;
        }
        if (Math.abs(x % 800) < random(150, 300) && Math.abs(y % 200) < random(75, 150)) {
            chance += 0.4;
        } else {
            chance -= 0.1;
        }
        
        // checks if this row/column contains a street intersection
        if ((tileX.includes(x) || tileY.includes(y)) && noise(x, y) < 0.8) {
            
        } else {
            // streets
            if (noise(x, y) >= 0.8 && (y < 160 && y > -160) && (x < 440 && x > -440)) {
                stroke("#F5C422");
                fill("#000000");
                if (Math.sign(y) < 0) {
                    translate(x, 0, 0);
                    box(tileSize, tileSize * 36, tileSize);
                    translate(-x, 0, 0);
                    tileX.push(x);
                }
                if (x < 90 && x > -90) {
                    translate(0, y, 0);
                    box(tileSize * 92, tileSize, tileSize);
                    translate(0, -y, 0);
                    tileY.push(y);
                } 
                else {
                    createDriver(x, y);
                }
            } else 

            // mid-size building
            if (noise(x, y) > 0.6 - chance && (y < 160 && y > -160) && (x < 440 && x > -440)) {
                
                scaler = ((400 - Math.abs(x % 800)) * noise(x,y)) / 10 + 20;
                
                if (noise(x + tileSize, y) < 0.6 && noise(x - tileSize, y) < 0.6 && noise(x, y + tileSize) < 0.6 && noise(x, y - tileSize) < 0.6) {
                    scaler *= random(1, 2);
                    if (random() < 0.5) {
                        // cone building
                        translate(x, y, scaler / 2 + tileSize);
                        rotateX(HALF_PI);
                        stroke("#3B1D00");
                        fill("#8A0714");
                        cone(tileSize / 2, scaler + 10, 4, 2);
                        rotateX(-HALF_PI);
                        box(tileSize, tileSize, -8 * noise(x, y));
                        translate(0, 0, -scaler/2 - tileSize);
                        noStroke();
                        fill("#292f33")
                        box(tileSize, tileSize, tileSize);
                    } else {
                        // orange triangle building
                        translate(x, y, 0);
                        noStroke();
                        fill("#292f33")
                        box(tileSize, tileSize, tileSize);
                        translate(-x, -y, 0);

                        fill("#B8451A");
                        stroke("#382119");
                        translate(x, y, scaler / 2);
                        rotateX(HALF_PI);
                        rotateY(noise(x, y) * 360);
                        cylinder(tileSize / 2, scaler , 4, 1);
                        
                    }
                } else {
                    scaler *= random(0.5, 2);
                    // square build
                    if (noise(x, y) < 0.7) {
                        fill("#1AB898");
                        stroke("#193832");
                        translate(x, y, scaler / 2);
                        box(tileSize, tileSize, scaler);

                        // random pyramid hat
                        if (random() < 0.3) {
                        rotateX(HALF_PI);
                        rotateY(QUARTER_PI);
                        translate(0, scaler / 2 + tileSize / 2, 0);
                        cone(tileSize / 2, tileSize, 5, 1);
                        }
                    } else if (noise(x, y) > 0.7) {
                        // cylinder
                        fill("#076B57");
                        stroke("#6B1D00");
                        rotateX(HALF_PI);
                        translate(x, scaler / 2, y);
                        cylinder(tileSize / 2, scaler, 8, 1);

                        // random dome spawn
                        if (random() < 0.3) {
                            translate(0, scaler / 2, 0);
                        sphere(tileSize/2, 4, 4)
                        }
                    }
                }
            } else { 

            // skyscraper
            if (noise(x, y) > 0.59 - chance && (y < 160 && y > -160) && (x < 440 && x > -440)) {
                stroke(255);
                scaler = (200 - Math.abs(x % 800)) * noise(x, y) + 20 / 3;
                if (Math.sign(scaler) > 0) {
                    scaler *= random(2, 2.5);
                    translate(x, y, scaler / 2);
                    fill("#099BEB");
                    box(tileSize, tileSize, scaler);
                } else {
                    // cell tower
                    scaler = random(50, 150);
                    translate(x, y, scaler / 2);
                    noFill();
                    rotateX(HALF_PI);
                    cone(tileSize / 2, scaler, 4, 1);
                }

            } else {
                // ground
                noStroke();
                if (x > 440 || x < -440 || y > 160 || y < -160) {
                    // outside grass
                    fill("#2A6A01");
                    scaler = -8;
                } else if (x > 340 || x < -340 || y > 100 || y < -100){
                    // transition layer
                    if (random() < 0.5) {
                        // solid concrete
                        fill("#292f33");
                    } else {
                        // grass gradient
                        fill(0, random(25, 180), 0, random(200, 255));
                    }
                    scaler = 2;
                } else {
                    // grass gradient
                    fill(0, random(25, 180), 0, random(200, 255));
                    scaler = 8;
                }
                translate(x, y, scaler * noise(x, y));
                
                box(tileSize, tileSize, tileSize);
            }
        }
    }
    pop();
}

function createDriver(x, y) {
    stroke(255); 
    fill("#FF0000");
    translate(x, y, tileSize * 3 / 4);
    let jriver = box(tileSize / 2, tileSize / 2, tileSize / 2);
    // 
    // broken code for now . . . (7/21/2022)
    //
    let randomizer = random(0, 4);
    if (tileX.includes(x) && !tileY.includes(y)) {
        if (randomizer < 3) {
            b += 0.2;
        } else if (randomizer >= 3) {
            b -= 0.2;
        }
    } else if (tileY.includes(y) && !tileX.includes(x)) {
        if (randomizer < 3) {
            a += 0.2;
        } else if (randomizer >= 3) {
            a -= 0.2;
        }
    } else {
        if (randomizer === 1) {
            a += 0.2;
        } else if (randomizer === 2) {
            a -= 0.2;
        } else if (randomizer === 3) {
            b += 0.2;
        } else if (randomizer === 4) {
            b -= 0.2;
        }
    }
}

