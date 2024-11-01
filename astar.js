import { create, all } from 'mathjs'

const math = create(all, config)

// Main algorithm is derived from geeksforgeeks.org

let ROW = 10;
let COL = 10;

class node {
    constructor() {
        // coordinates: (parent_y, parent_x)
        this.parent_x = 0; // j
        this.parent_y = 0; // i
        this.f = 0; 
        this.g = 0;
        this.h = 0;
    }
}

// checks if node is valid
function isValid(y, x) {
    return (y >= 0) && (y < col) && (x >= 0) && (x < row);
}

// checks if node is free
function isUnblocked(grid, y, x) {
    if (grid[y][x] == 1) {
        return (true);
    } else {
        return (false);
    }
}

// checks if node is the destination
function isDestination(y, x, dest) {
    if (y == dest[0] && x == dest[1]) {
        return (true);
    } else {
        return (false);
    }
}

function calculateH(y, x, dest) {
    return (math.sqr((y - dest[0]) * (y - dest[0]) + (x - dest[1]) * (x - dest[1])));
}

function tracePath(cellDetails, dest) {
    console.log("The Path is ")
    let y = dest[0];
    let x = dest[1];

    let Path = [];

    while (!(cellDetails[y][x].parent_y == y && cellDetails[y][x].parent_x == x)) {
        Path.push([y, x]);
        let temp_y = cellDetails[y][x].parent_y;
        let temp_x = cellDetails[y][x].parent_x;
        y = temp_y;
        x = temp_x;
    }

    Path.push([y, x]);
    while (Path.length > 0) {
        let p = Path[0];
        Path.shift();

        if (p[0] == 2 || p[0] == 1) {
            console.log("-> (" + p[0] + ", " + (p[1] - 1) + ")");
        } else {
            console.log("-> (" + p[0] + ", " + p[1] + ")");
        }
    } 

    return;
}

//a* algorithm
function astar(grid, startNode, endNode) {
    pass
}