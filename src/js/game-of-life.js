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
