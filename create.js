"use strict";

let tileSize;
let column;
let row;
let type;
let tileList;

function setup() {
    let canvas = createCanvas(800, 800, WEBGL);

    tileList = [];
    tileSize = 20;
    column = Math.ceil(height / tileSize);
    row = Math.ceil(width / tileSize);
    
}

function draw() {
    orbitControl();
    background(0);
    stroke(255);
    fill("#111111")

  
    
    for (let i = -400; i <= 400; i+= tileSize) {
        for (let k = -400; k <= 400; k+= tileSize) {
           fillPlane(k, i);
    }

    }
}

    function fillPlane(x, y) {
        push();
        translate(x, y);
        if (noise(x, y) > 0.8) {
            fill("#00FF00");
            box(20, 20, 20);
        } else {
        for (let i = -400; i <= 400; i+= tileSize){
            if (noise(i, y) > 0.8) {
                fill("#00FF00");
                box(20, 20, 20);
                break
            }
        }
        for (let k = -400; k <= 400; k+= tileSize){
            if (noise(x, k) > 0.8) {
                fill("#00FF00");
                box(20, 20, 20);
                break
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
