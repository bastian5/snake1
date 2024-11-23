class apple {
  
  constructor(size) {
    this.size = size;
    this.cols = width/size;
    this.rows = height/size;
    this.pos = createVector(floor(random(2, this.cols-1)), 
                             floor(random(2, this.rows-1)));
    stateadd(this.pos.x, this.pos.y, 3);
    this.rainbow = [[0,   255, 0  ], 
                    [0,   255, 127], 
                    [0,   255, 255], 
                    [0,   127, 255], 
                    [0,   0,   255], 
                    [127, 0,   255], 
                    [255, 0,   255], 
                    [255, 0,   127], 
                    [255, 0,   0  ], 
                    [255, 127, 0  ], 
                    [255, 255, 0  ],
                    [137, 255, 0  ]];
    
    this.color = this.rainbow[0];
    this.colori = 0;
  }
  
  show() {
    strokeWeight(this.size);
    //stroke(20,230,70);
    stroke(this.color[0], this.color[1], this.color[2]);
    point(this.pos.x*this.size + this.size/2, 
          this.pos.y*this.size + this.size/2);
  }
  
  shuffle(arr) {
    this.pos = createVector(
      floor(random(1, this.cols-1)),
      floor(random(1, this.rows)-1));
    for(let i=0; i<arr.length; i++) {
      if(arr[i].x == this.pos.x && arr[i].y == this.pos.y) {
        shuffle(arr);
      }
    }
    this.color = this.rainbow[this.colori%12];
    this.colori ++;
    stateadd(this.pos.x, this.pos.y, 3)
    
  }
}