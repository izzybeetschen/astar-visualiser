const { grids } = require('./astar.js'); 

const grid = [[ 1, 0, 1, 1, 1, 1, 0, 1, 1, 1 ],
[ 1, 1, 1, 0, 1, 1, 1, 0, 1, 1 ],
[ 1, 1, 1, 0, 1, 1, 0, 1, 0, 1 ],
[ 0, 0, 1, 0, 1, 0, 0, 0, 0, 1 ],
[ 1, 1, 1, 0, 1, 1, 1, 0, 1, 0 ],
[ 1, 0, 1, 1, 1, 1, 0, 1, 0, 0 ],
[ 1, 0, 0, 0, 0, 1, 0, 0, 0, 1 ],
[ 1, 0, 1, 1, 1, 1, 0, 1, 1, 1 ],
[ 1, 1, 1, 0, 0, 0, 1, 0, 0, 1 ]];

function setup() {
  createCanvas(500, 450);
  background(255);

  squareSize = width / 10;  
  noFill();

  for (let x = 0; x < width; x += squareSize) {
    for (let y = 0; y < height; y += squareSize) {
      stroke(200); 
      square(x, y, squareSize); 
    }
  }
}

function draw() {
  if (grid && grid.length > 0) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] == 1) {
          fill(255, 0, 0);
        } else {
          fill(0, 255, 0);
        }

        noStroke();
        square(squareSize * j, squareSize * i, squareSize);
      }
    }
  }
}