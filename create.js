"use strict";

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
    fill("#1d2add")
    push();
    translate(0, 0, -500);
    // box(2000, 2000, 1000);
    pop();
  
    
    for (let i = -10; i <= 10; i+= 1) {
        for (let k = -40; k <= 40; k+= 1) {
                fillPlane(k * tileSize, i * tileSize);
        }
    }
}

    function fillPlane(x, y) {
        push();
        if ((tileX.includes(x) || tileY.includes(y)) && noise(x, y) < 0.8) {
            
        
        } else {
            // streets
            if (noise(x, y) >= 0.8) {
                stroke(255);
                fill("#000000");
                if (Math.sign(y) < 0) {
                    translate(x, 0, 0);
                    box(tileSize, tileSize * 21, tileSize);
                    translate(-x, 0, 0);
                    tileX.push(x);
                }
                if (x < 70 && x > -70) {
                    translate(0, y, 0);
                    box(tileSize * 81, tileSize, tileSize);
                    translate(0, -y, 0);
                    tileY.push(y);
                }
            } else 
            if (noise(x, y) > 0.5) {
                scaler = ((400 - Math.abs(x % 800)) * random()) / 10;
                translate(x, y, scaler / 2 - tileSize);
                fill("#FF0000");
                box(tileSize, tileSize, scaler);
            } else 
            // sinking terrain
            if (noise(x, y) > 0.20) {
                translate(x, y, -10 * noise(x, y));
                fill("#0000FF");
                box(tileSize, tileSize, tileSize);
            } else {   
            // skyscraper
                scaler = (400 - Math.abs(x % 800)) * noise(x, y);
                translate(x, y, scaler / 2);
                fill("#00FF00");
                box(tileSize, tileSize, scaler);
            }
            
            
            
        }
        pop();
    }

    function drawStreet(x, y) {
        
            if (tileX.includes(x)) {
                
            }
            if (tileY.includes(y)) {
               
                
            }
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
