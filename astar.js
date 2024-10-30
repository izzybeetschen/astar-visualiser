let ROW = 10;
let COL = 10;

class node {
    constructor() {
        // coordinates: (parent_y, parent_x)
        this.parent_x = 0; // col
        this.parent_y = 0; // row
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

//a* algorithm
function astar(grid, startNode, endNode) {
    pass
}