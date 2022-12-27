class Bomb {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.vely = 2

    this.img = new Image();
    this.img.src = '../../dusty-war/src/images/Enemy/Bomb.png'
    this.count = 0;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y)
  }

  move() {
    this.y += this.vely;
    this.x += 0.3
  }

}


