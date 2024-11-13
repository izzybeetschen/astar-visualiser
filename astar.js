import { create, all } from 'mathjs'

const math = create(all, config)

// Main algorithm is derived from geeksforgeeks.org

let ROW = 10;
let COL = 10;

class cell {
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
function astar(grid, startNode, dest) {
    // checks to ensure source is valid
    if (isValid(startNode[0], startNode[1]) == false) {
        console.log("Source is invalid\n");
        return;
    }

    // checks to ensure destination is valid
    if (isValid(dest[0], dest[1]) == false) {
        console.log("Destination is invalid\n");
        return;
    }

    // checks to ensure it is possible to start at source, or end at destination
    if (isUnblocked(grid, startNode[0], startNode[1]) == false || isUnblocked(grid, dest[0], dest[1] == false)) {
        console.log("Source or the destination is blocked\n");
        return;
    }

    let closedList = new Array(ROW);
    
    // closed list - no cell included yet
    for (let i = 0; i < ROW; i++) {
        closedList[i] = new Array(COL).fill(false);
    }

    let cellDetails = new Array(ROW);
    
    for (let i = 0; i < ROW; i++) {
        cellDetails[i] = new Array(COL);
    }

    let i, j;

    for (i = 0; i < ROW; i++) {
        for (j = 0; j < COL; j++) {
            cellDetails[i][j] = new cell();
            cellDetails[i][j].f = 2147483647;
            cellDetails[i][j].g = 2147483647;
            cellDetails[i][j].h = 2147483647;
            cellDetails[i][j].parent_y = -1;
            cellDetails[i][j].parent_x = -1;
        }
    }

    // initialises the parameters of startNode
    i = startNode[0], j = startNode[1]
    cellDetails[i][j].f = 0;
    cellDetails[i][j].g = 0;
    cellDetails[i][j].h = 0;
    cellDetails[i][j].parent_y = i;
    cellDetails[i][j].parent_y = j;

    let openList = new Map();

    openList.set(0, [i, j]);

    let foundDest = false;

    while (openList.size > 0) {
        let p = openList.entries().next().value

        openList.delete(p[0]);

        i = p[1][0];
        j = p[1][1];
        closedList[i][j] = true;

        let gNew, hNew, fNew;

        // North successor

        if (isValid(i - 1, j) == true) {
            if (isDestination(i - 1, j, dest) == true) {
                cellDetails[i - 1][j].parent_y = y;
                cellDetails[i - 1][j].parent_x = x;
                
                tracePath(cellDetails, dest);
                foundDest = true;
                return;
            }
            else if (closedList[i-1][j] == false && isUnblocked(grid, i-1, j) == true) {
                gNew = cellDetails[i][j].g + 1;
                hNew = calculateH(i-1, j, dest);
                fNew = gNew + hNew;

                if (cellDetails[i-1][j].f == 2147483647 || cellDetails[i-1][j].f > fNew) {
                    openList.set(fNew, [i-1, j]);

                    cellDetails[i-1][j].f = fNew;
                    cellDetails[i-1][j].g = gNew;
                    cellDetails[i-1][j].h = hNew;
                    cellDetails[i-1][j].parent_y = i;
                    cellDetails[i-1][j].parent_x = j;
                }
            }
        }
        // South successor

        if (isValid(i + 1, j) == true) {
            if (isDestination(i + 1, j, dest) == true) {
                cellDetails[i+1][j].parent_y = y;
                cellDetails[i+1][j].parent_x = x;

                tracePath(cellDetails, dest);
                foundDest = true;
                return;
            }

            else if (closedList[i+1][j] == false && isUnblocked(grid, i+1, j) == true) {
                gNew = cellDetails[i][j].g + 1;
                hNew = calculateH(i+1, j, dest);
                fNew = gNew + hNew;
            
                if (cellDetails[i+1][j].f == 2147483647 || cellDetails[i+1][j].f > fNew) {
                    openList.set(fNew, [i+1, j]);

                    cellDetails[i+1][j].f = fNew;
                    cellDetails[i+1][j].g = gNew;
                    cellDetails[i+1][j].h = hNew;
                    cellDetails[i+1][j].parent_y = i;
                    cellDetails[i+1][j].parent_x = j;
                }
            }
        }
        
        // East successor
        if (isValid(i, j+1) == true) {
            if (isDestination(i, j + 1, dest) == true) {
                cellDetails[i][j+1].parent_y = y;
                cellDetails[i][j+1].parent_x = x;
                
                tracePath(cellDetails, dest);
                foundDest = true;
                return;
            } else if (closedList[i][j+1] == false && isUnblocked(grid, i, j + 1) == true) {
                gNew = cellDetails[i][j].g + 1;
                hNew = calculateH(i, j+1, dest);
                fNew = gNew + hNew;

                if (cellDetails[i][j+1].f == 2147483647 || cellDetails[i][j+1].f > fNew) {
                    openList.set(fNew, [i, j+1]);

                    cellDetails[i][j+1].f = fNew;
                    cellDetails[i][j+1].g = gNew;
                    cellDetails[i][j+1].h = hNew;
                    cellDetails[i][j+1].parent_y = i;
                    cellDetails[i][j+1].parent_x = j;
                }
            }
        }
        
    }

}