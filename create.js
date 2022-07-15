"use strict";

let tileSize;
let column;
let row;
let type;
let tileList;
let cam1;
let xPosSlider;
let yPosSlider;
let zPosSlider;
let camTilt;

function setup() {
    let canvas = createCanvas(800, 800, WEBGL);
    tileList = [];
    tileSize = 160;
    column = Math.ceil(height / tileSize);
    row = Math.ceil(width / tileSize);
    cam1 = createCamera();

    xPosSlider = createSlider(-5000, 5000, 0);
    xPosSlider.position(900, 40);
    
    yPosSlider = createSlider(-5000, 5000, 0);
    yPosSlider.position(900, 70);
    
    zPosSlider = createSlider(-5000, 5000, 0);
    zPosSlider.position(900, 100);

    // camTilt = createSlider(-90, 90, 10);
    // camTilt.position(900, 130);
}

function draw() {
    orbitControl();
    // let currX = xPosSlider.value();
    // let currY = yPosSlider.value();
    // let currZ = zPosSlider.value();
    // // let tilter = camTilt.value();
    // cam1.setPosition(currX, currY, currZ);
    // // cam1.lookAt(0, 0, 0);

    background("#e685ef");
    stroke(0);
    fill("#1d2add")
    push();
    translate(0, 0, -500);
    box(8000, 8000, 1000);
    pop();
  
    
    for (let i = -1600; i <= 1600; i+= tileSize) {
        for (let k = -1600; k <= 1600; k+= tileSize) {
           fillPlane(k, i);
    }

    }
}

    function fillPlane(x, y) {
        push();
        translate(x, y, noise(x, y) * 800 / 2);
        if (noise(x, y) > 0.775) {
            fill("#00FF00");
            box(160, 160, noise(x, y) * 800);
        } else {
        for (let i = -1600; i <= 1600; i+= tileSize){
            if (noise(i, y) > 0.775) {
                fill("#00FF00");
                box(160, 160, noise(x, y) * 800);
            } else {
                fill("#FFFF00");
            }
        }
        for (let k = -1600; k <= 1600; k+= tileSize){
            if (noise(x, k) > 0.775) {
                fill("#00FF00");
                box(160, 160, noise(x, y) * 800);
            } else {
                fill("#FFFF00");
            }
        }
        }
    pop();
    }

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
