let S;
let A;

let state;

let fr;
let flag = 0;
let score = 0;
let highscore;
let size = 20;
let keyflag = false;
let pauseflag = false;
let rows;
let cols;
let lastchoice = 1;


function setup() {
  createCanvas(windowHeight-(windowHeight%size), windowHeight-(windowHeight%size));
  textAlign(CENTER, CENTER);
  frameRate(10);
  fr = 16;
  S = new Snake(size);
  rows = S.rows;
  cols = S.cols;
  state = [];
  for(let i=0; i<cols; i++) {
    state.push([]);
    for(let j=0; j<rows; j++){
      state[i].push(0)
    }
  }
  A = new apple(size);
  if (getItem('snakeHighscore2.9') == null) {
    storeItem('snakeHighscore2.9', 0);
  }
  highscore = getItem('snakeHighscore2.9');
  background(0);
  score = 0;
  
  
  S.dir = random([1,2,3,4]);
}

function draw() {
  background(51);
  ki2();
  S.step();
  A.show();
  S.show();
  for (let i = 0; i < S.arr.length; i++) {
    if (S.arr[i].x == A.pos.x && S.arr[i].y == A.pos.y) {
      A.shuffle(S.arr);
      score ++;
      if (score > highscore) {
        highscore = score;
        storeItem('snakeHighscore2.9', highscore);
      }
      S.len++;
      fr += 0.25;
      frameRate(fr);
    }
  }
  if (S.over) {
    textSize(52);
    fill(0);
    strokeWeight(4);
    stroke(200, 20, 20);
    text("GAME OVER", width / 2, height / 2 - 20);
    if (flag == 1) {
      for (let w = 0; w < 100000000; w++) {
        let b = sqrt(w);
      }
      flag -= 2;
      setup();
    }
    flag++;
  }

  
  textSize(20);
  fill(250, 100);
  strokeWeight(0);
  text('score ' + score, 40, 15);
  text('highscore ' + highscore, 305, 15);
}









//(heady+2)%cols-1



function ki2 () {
  turn(5-S.dir);
  let headx, heady, applex, appley; 
  for(let i=0; i<state.length; i++) {
    for(let j=0; j<state[0].length; j++) {
      if(state[i][j] == 2) {headx = i; heady = j}
      if(state[i][j] == 3) {applex = i; appley = j}
    }
  }
  let choice = 1;
  
  
  if(headx != undefined) {  
    //if(state[headx][(heady-1)%rows] != 1 || 
       //state[headx][(heady+1)%rows] != 1) {  
      if(applex == headx && appley<heady && state[headx][heady-1] != 1) {
        choice = 2;
      } else if(applex == headx && appley>heady && state[headx][heady+1] != 1) {
        choice = 4;
      }
    //}
  
    if(state[(headx+1)%cols][heady] == 1) {
      if(state[headx][(heady-1)%rows] == 1) {
        choice = 4;
      }
      else if(state[headx][(heady+1)%rows] == 1) {
        choice = 2;
      }else {
        if(lastchoice == 2){
          choice = 4;
        } else if (lastchoice == 4){
          choice = 2;
        } else {
          choice = random([2,4]);
        }
      }
    }
  }

  if(choice != 1) {
    lastchoice = choice;
  }
  turn(S.dir-1);
  //choice cant be 3
  S.dir = (S.dir-1+choice-1)%4+1;
  
}







function keyPressed() {
  
  if (keyCode > 47 && keyCode <58) {
    frameRate(keyCode-48);
    fr = keyCode - 48;
  }
  if (keyCode === LEFT_ARROW && S.dir != 1) {
    if(!keyflag){
      S.dir = 3;
      keyflag = true;
    }
  } else if (keyCode === RIGHT_ARROW && S.dir != 3) {
    if(!keyflag){
      S.dir = 1;
      keyflag = true;
    }
  } else if (keyCode === UP_ARROW && S.dir != 4) {
    if(!keyflag){
      S.dir = 2;
      keyflag = true;
    }
  } else if (keyCode === DOWN_ARROW && S.dir != 2) {
    if(!keyflag){
      S.dir = 4;
      keyflag = true;
    }
  }
  if (keyCode == 82) {
    storeItem('snakeHighscore2.9', 0);
    highscore = 0;
  }
  if (keyCode == 80) {
    if(pauseflag) {
      loop();
      pauseflag = false;
    }else{
      noLoop();
      pauseflag = true;
    }
  }
}


function stateremove(x, y) {
  state[x][y] = 0;
}

function stateadd(x, y, v) {
  state[x][y] = v;
}

function table(arr) {
  for(let x=0; x<arr.length; x++){
    let s = '';
    for(let y=0; y<arr[0].length; y++){
      s += arr[y][x]
    }
    print(s, '   ', x);
  }
  print(' --- --- --- --- ---');
}

function turn(turns) {
  for(let n=0; n<turns; n++) {
    let matrix = state;
    for (let row = 0; row < matrix.length; row++) {
      for (let column = 0; column < row; column++) {
        let temp = matrix[row][column]
        matrix[row][column] = matrix[column][row]
        matrix[column][row] = temp
      }
    }
    for (let row = 0; row < matrix.length; row++) {
      matrix[row].reverse();
    }
    state = matrix;
  } 
}



