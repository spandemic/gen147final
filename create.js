"use strict";

let tileSize;
let column;
let row;
let type;
let tileList;

function setup() {
    let canvas = createCanvas(1000, 600);

    tileList = [];
    tileSize = 20;
    column = Math.ceil(height / tileSize);
    row = Math.ceil(width / tileSize);
    
}

function draw() {
    drawTile(0, 0, "white");
    for (let x = 1; x <= row; x++) {
        for (let y = 1; y <= column; y++) {
            drawTile(x * tileSize, y * tileSize, "white");
        }
    }
    for (let i = 1; i <= row; i++) {
        drawTile(i * tileSize, 0, "original");
    }
    for (let j = 1; j <= column; j++) {
        drawTile(0, j * tileSize, "original");
    }
  
}

function drawTile(x, y, colored) {
    if (colored === "white") {
        fill(255);
    } else if (colored === "original") {
        if (noise(x, y) > 0.65) {
            fill(0);
            if (y === 0) {
                for (let j = 1; j <= column; j++) {
                    drawTile(x, j * tileSize, "black");
                }
            } else if (x === 0) {
                for (let k = 1; k <= row; k++) {
                    drawTile(k * tileSize, y, "black");
                }
            }
        } else {
            fill(255);
        }
    } else if (colored === "black") {
        fill(0);
    }
    
    beginShape();
    vertex(x, y);
    vertex(x + tileSize, y);
    vertex(x + tileSize, y + tileSize);
    vertex(x, y + tileSize);
    endShape(CLOSE);
}
