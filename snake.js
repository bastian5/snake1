class Snake {
  constructor(size) {
    this.size = size;
    this.cols = width/size;
    this.rows = height/size;
    this.head = createVector(floor(random(2, this.cols-2)), 
                             floor(random(2, this.rows-2)));
    this.arr = [];
    this.arr.push(this.head.copy());
    this.dir = 0;
    this.pd = 0;
    this.pdarr = [0];
    this.len = 3;
    this.over = false;
  }

  show() {
    strokeWeight(this.size);
    stroke(220, 20, 60);
    for (let i = 0; i < this.arr.length; i++) {
      
      if (this.head.x == this.arr[i].x &&
          this.head.y == this.arr[i].y && i != 0) {
        this.over = true;
      }

      if (i == this.len) {
        stateremove(this.arr[i].x, this.arr[i].y);
        this.arr.pop();
        break;
      }
      
      point(this.arr[i].x*this.size + this.size / 2, 
            this.arr[i].y*this.size + this.size / 2);
    }
    strokeWeight(this.size/3);
    stroke(225);
    point(this.head.x*this.size+this.size/4, 
          this.head.y*this.size+this.size/2);
    point(this.head.x*this.size+(this.size/4)*3, 
          this.head.y*this.size+this.size/2);
    strokeWeight(this.size/5);
    stroke(25);
    point(this.head.x*this.size+this.size/4, 
          this.head.y*this.size+this.size/2);
    point(this.head.x*this.size+(this.size/4)*3, 
          this.head.y*this.size+this.size/2);
  }

  step() {
    if(this.over){
      return;
    }
    if (this.dir == 1) {
      this.head.x ++;
    } else if (this.dir == 2) {
      this.head.y --;
    } else if (this.dir == 3) {
      this.head.x --;
    } else if (this.dir == 4) {
      this.head.y ++;
    }
    if (this.head.x < 0) {
      this.head.x = this.cols-1;
    } else if (this.head.x >= this.cols) {
      this.head.x = 0;
    }
    if (this.head.y < 0) {
      this.head.y = this.rows-1;
    } else if (this.head.y >= this.rows) {
      this.head.y = 0;
    }
    
    if (this.dir != 0) {
      this.arr.unshift(this.head.copy());
      stateadd(this.arr[1].x, this.arr[1].y, 1);
      stateadd(this.head.x, this.head.y, 2);
    }
    if(this.dir != this.pd) {
      this.pdarr.push(this.dir);
    }
    
    
    
    this.pd = this.dir;
    keyflag = false;
  }
}
