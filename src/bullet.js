class Bullet {
  constructor(ctx, x, y,){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.owner = {
        soldier: false,
        enemy: false,
        boss: false
    }
    this.velx = 8;

    this.img = new Image();
    this.img.src = 'src/images/Enemy/enemies-bullets.png'
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y)
  }

  move() {
    if (this.owner.soldier) {
        this.x += this.velx;
    } else {
        this.x -= this.velx;
    }     
  }
}