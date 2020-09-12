let canvasWidth = 750;
let canvasHeight = 750;
let gridSize = 50;

let squareSize = 15;

let grid = [];
let buffer = [];

let start = false;

function setup(){
  frameRate(15);
  createCanvas(canvasWidth,canvasHeight);
  background(255);
  createArray();
}

function draw(){
  background(255);
  drawArray();
  if(start)
    gameOfLife();
}

function createArray(){
  for(let y = 0; y < canvasHeight/squareSize; y++){
    let row = [];
    let bufferRow = [];
    for(let x = 0; x < canvasWidth/squareSize; x++){
      row.push(0);
      bufferRow.push(0);
    }
    grid.push(row);
    buffer.push(bufferRow);
  }
}

function drawArray(){
  let alive = false;
  stroke(175);
  for(let y = 0; y < grid.length; y++){
    for(let x = 0; x < grid[y].length; x++){
      if(grid[y][x] == 0)
        fill(color("white"));
      else {
        fill(color("black"));
        alive = true;
      }
      rect(x*squareSize,y*squareSize,squareSize,squareSize);
    }
  }
  if(!alive)
    start = false;
}

function mouseClicked(){
  if(mouseX < canvasWidth && mouseY < canvasHeight){
    let y = Math.floor(mouseY/squareSize);
    let x = Math.floor(mouseX/squareSize);
    grid[y][x] = grid[y][x] == 0 ? 1 : 0;
  }
}

function keyPressed(){
  if(keyCode == 32) //Space
    start = !start;
}

function gameOfLife(){
  for(let y = 0; y < grid.length; y++){
    for(let x = 0; x < grid[y].length; x++){
      let adj = getSurroundingCells(y,x);
      if((grid[y][x] == 1 && (adj < 2 || adj > 3)) || (grid[y][x] != 1 && adj === 3))
        buffer[y][x] = grid[y][x] == 1 ? 0 : 1;
      else
        buffer[y][x] = grid[y][x];
    }
  }
  for(let y = 0; y < grid.length; y++){
    for(let x = 0; x < grid[y].length; x++){
      grid[y][x] = buffer[y][x];
    }
  }
}

function getSurroundingCells(y,x){
  let counter = 0;
  for(let yy = -1; yy < 2; yy++){
      for(let xx = -1; xx < 2; xx++){
          let ny = y + yy;
          let nx = x + xx;
          if((yy != 0 || xx != 0) && inBounds(ny,nx)){
              if(grid[ny][nx] == 1) counter++;
          }
      }
  }
  return counter;
}

function inBounds(y,x) {
    return y > 0 && x > 0 && y < grid.length && x < grid[y].length;
}
