"use strict";

// seeds
// bugged street gen 21262415
// twin towers 53157679

const tileSize = 10;
let column;
let row;
let type;
let tileX;
let tileY;
let cam1;
let camTilt;
let scaler;
let seed = 1000;

function setup() {
    let canvas = createCanvas(800, 800, WEBGL);
    canvas.parent("container");

    let label = createP();
    label.html("World Seed: ");
    label.parent("container");

    let rand = Math.random().toString().substr(2, 8);

    let input = createInput(rand);
    input.parent(label);
    input.input(() => {
        rebuildWorld(input.value());
    });
    
    let xPosSlider = createSlider(-5000, 5000, 0);
    xPosSlider.position(900, 40);
    fill(0);
    text('X', 870, 40);
    let yPosSlider = createSlider(-5000, 5000, 3000);
    yPosSlider.position(900, 70);
    fill(0);
    text('Y', 870, 70);
    let zPosSlider = createSlider(-5000, 5000, 3500);
    zPosSlider.position(900, 100);
    fill(0);
    text('Z', 870, 1000);
    // camTilt = createSlider(-90, 90, 10);
    // camTilt.position(900, 130);

    tileX = [];
    tileY = [];
    column = Math.ceil(height / tileSize);
    row = Math.ceil(width / tileSize);
    cam1 = createCamera();

    // createP("Arrow keys scroll. Clicking changes tiles.").parent("container");
    rebuildWorld(input.value());
}

function rebuildWorld(key) {
    tileX = [];
    tileY = [];
    noiseSeed(key);
    randomSeed(key);
  }

function draw() {
    randomSeed(seed);

    orbitControl();
    // let currX = xPosSlider.value();
    // let currY = yPosSlider.value();
    // let currZ = zPosSlider.value();
    // cam1.setPosition(currX, currY, currZ);
    // cam1.lookAt(0, 0, 0);

    background("#e685ef");
    stroke(0);
    fill("#4F3107")
    push();
    translate(0, 0, -50);
    box(1000, 400, 100);
    pop();
  
    
    for (let i = -20; i <= 20; i+= 1) {
        for (let k = -50; k <= 50; k+= 1) {
                fillPlane(k * tileSize, i * tileSize);
        }
    }
}

    function fillPlane(x, y) {
        push();

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
                } else {
                    stroke(255); // cars
                    fill("#FF0000");
                    translate(x, y, tileSize * 3 / 4);
                    box(tileSize / 2, tileSize / 2, tileSize / 2);
                }
            } else 

            // mid-size building
            if (noise(x, y) > 0.6 && (y < 160 && y > -160) && (x < 440 && x > -440)) {
                
                scaler = ((400 - Math.abs(x % 800)) * noise(x,y)) / 10 + 20;
                
                if (noise(x + tileSize, y) < 0.6 && noise(x - tileSize, y) < 0.6 && noise(x, y + tileSize) < 0.6 && noise(x, y - tileSize) < 0.6) {
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
                        // gray triangle building
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
                    // pink building
                    fill("#1AB898");
                    stroke("#193832");
                    translate(x, y, scaler / 2);
                    box(tileSize, tileSize, scaler);

                    if (random() < 0.3) {
                        rotateX(HALF_PI);
                        rotateY(QUARTER_PI);
                        translate(0, scaler / 2 + tileSize / 2, 0);
                        cone(tileSize / 2, tileSize, 5, 1);
                    } else {

                    }
                    
                }
            } else 

            // skyscraper
            if (noise(x, y) > 0.59 && (y < 160 && y > -160) && (x < 440 && x > -440)) {
                stroke(255);
                scaler = (200 - Math.abs(x % 800)) * noise(x, y) + 20 / 4;
                if (Math.sign(scaler) > 0) {
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
                
            } else 
            {  
                // ground
                noStroke();
                if (x > 440 || x < -440 || y > 160 || y < -160) {
                    fill("#2A6A01");
                    scaler = -8;
                } else if (x > 340 || x < -340 || y > 100 || y < -100){
                    if (random() < 0.5) {
                        fill("#292f33");
                    } else {
                        fill(0, random(25, 180), 0, random(200, 255));
                    }
                    scaler = 2;
                } else {
                    fill(0, random(25, 180), 0, random(200, 255));
                    scaler = 8;
                }
                translate(x, y, scaler * noise(x, y));
                
                box(tileSize, tileSize, tileSize);
            }
             
        }
        pop();
    }

     //  else {
        // for (let i = -1600; i <= 1600; i+= tileSize){
        //     if (noise(i, y) > 0.775) {
        //         fill("#00FF00");
        //         box(tileSize, tileSize, noise(x, y) * 800);
        //     } else {
        //         fill("#FFFF00");
        //     }
        // }
        // for (let k = -1600; k <= 1600; k+= tileSize){
        //     if (noise(x, k) > 0.775) {
        //         fill("#00FF00");
        //         box(tileSize, tileSize, noise(x, y) * 800);
        //     } else {
        //         fill("#FFFF00");
        //     }
        // }
        // }

    // rotateX(80);
    // translate(-width, -height);
    // for (let i = 0; i < 60; i++) {
    //     beginShape(TRIANGLE_STRIP);
    //     for (let k = 0; k < 60; k++) {
    //         vertex(k * 30, i * 30);
    //         vertex(k * 30, (i + 1) * 30);
    //         if (noise(k, i) > 0.75) {
    //             vertex(k * 30, i * 30, -noise(k, i) * 200);
    //             vertex(k * 30, (i + 1) * 30, -noise(k, i) * 200);
    //             vertex((k + 1) * 30, i * 30, -noise(k, i) * 200);
    //             vertex((k + 1) * 30, (i + 1) * 30, -noise(k, i) * 200);
    //         }
    //     }
    //     endShape();
    // }

    // drawTile(0, 0, "white");
    // for (let x = 1; x <= row; x++) {
    //     for (let y = 1; y <= column; y++) {
    //         drawTile(x * tileSize, y * tileSize, "white");
    //     }
    // }
    // for (let i = 1; i <= row; i++) {
    //     drawTile(i * tileSize, 0, "original");
    // }
    // for (let j = 1; j <= column; j++) {
    //     drawTile(0, j * tileSize, "original");
    // }
  


// function drawTile(x, y, colored) {
//     if (colored === "white") {
//         fill(255);
//     } else if (colored === "original") {
//         if (noise(x, y) > 0.65) {
//             fill(0);
//             if (y === 0) {
//                 for (let j = 1; j <= column; j++) {
//                     drawTile(x, j * tileSize, "black");
//                 }
//             } else if (x === 0) {
//                 for (let k = 1; k <= row; k++) {
//                     drawTile(k * tileSize, y, "black");
//                 }
//             }
//         } else {
//             fill(255);
//         }
//     } else if (colored === "black") {
//         fill(0);
//     }
    
//     beginShape();
//     vertex(x, y);
//     vertex(x + tileSize, y);
//     vertex(x + tileSize, y + tileSize);
//     vertex(x, y + tileSize);
//     endShape(CLOSE);
// }
