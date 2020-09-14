let canvasWidth;
let canvasHeight;

let visibleWidth = 25; //half
let visibleHeight;
let squareSize;

var grid = [];
let buffer = [];

function setup(){
  frameRate(16);
  initCanvas();
  createGrid();
  noLoop();
}

function initCanvas(){
  let canvasContainer = document.getElementById("game-of-life-canvas");
  canvasWidth = parseInt(getComputedStyle(canvasContainer).width,10);
  canvasHeight = parseInt(getComputedStyle(canvasContainer).height,10);
  let renderer = createCanvas(canvasWidth,canvasHeight);
  renderer.parent(canvasContainer);
}

function createGrid(){
  grid = [];
  buffer = [];
  for(let y = 0; y < 151; y++){
    let row = [];
    let bufferRow = [];
    for(let x = 0; x < 151; x++){
      row.push(0);
      bufferRow.push(0);
    }
    grid.push(row);
    buffer.push(bufferRow);
  }
}

function draw(){
  clear();
  drawGrid();
  if(isLooping())
    gameOfLife();
}

function drawGrid(){
  if(!isLooping())
    clear();
  squareSize = canvasWidth/(visibleWidth*2);
  visibleHeight = Math.floor(canvasHeight/squareSize/2);
  let alive = false;
  stroke("#e7e7e7");
  for(let y = 76-visibleHeight; y < 76+visibleHeight; y++){
    for(let x = 76-visibleWidth; x < 76+visibleWidth; x++){
      if(grid[y][x] == 0)
        fill(color("#f3f3f3"));
      else {
        fill(color("black"));
        alive = true;
      }
      rect((x+visibleWidth-76)*squareSize,(y+visibleHeight-76)*squareSize,squareSize,squareSize);
    }
  }
  if(!alive)
    Pause();
}

function mouseClicked(){
  if(mouseX < canvasWidth && mouseY < canvasHeight){
    let y = Math.floor(mouseY/squareSize);
    let x = Math.floor(mouseX/squareSize);
    grid[76-visibleHeight+y][76-visibleWidth+x] = grid[76-visibleHeight+y][76-visibleWidth+x] == 0 ? 1 : 0;
    drawGrid();
  }
}

function Play(){
  loop();
}

function Pause(){
  noLoop();
}
function Clear(){
  createGrid();
  drawGrid();
  noLoop();
}

function ChangeSize(){
  visibleWidth = parseInt(document.getElementById("size-slider").value);
  if(!isLooping())
    drawGrid();
}

function ChangeSpeed(){
  setFrameRate(parseInt(document.getElementById("speed-slider").value));
}
