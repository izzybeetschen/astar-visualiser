const { grid } = require('./astar.js');

function setup() {
  createCanvas(500, 450);
  background(255); // Set background to white

  squareSize = width/10;

  for (let x = 0; x < width; x += width / 10) {
    for (let y = 0; y < height; y += height / 9) {
      noFill() // Set fill color to gray (or any color of your choice)
      square(x, y, squareSize); // Draw square with correct size
    }
  }
}

function draw() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == 1) {
        fill(255, 0, 0);
      }
      else {
        fill(0, 255, 0);
      }
      noStroke()
      square((width/10 * j), (height / 9 * i), width/10);
    }
  }
}
