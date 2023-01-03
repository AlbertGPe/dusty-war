class Bomb {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.vely = 2

    this.img = new Image();
    this.img.src = '../src/images/Enemy/Bomb.png'
    this.img.frames = 1
    this.img.frameIndex = 0
    this.count = 0;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y) // TODO: draw with frames
    this.animate()
  }

  animate() {
    this.count++;

    if (this.count >= 10){
      this.count = 0;
      this.img.frameIndex++;
      if (this.img.frameIndex > this.img.frames - 1) {
        this.img.frameIndex = 0;
      }
    }
  }

  move() {
    this.y += this.vely;
    this.x += 0.3
  }

  explode() {
    this.img.src = '../src/images/Enemy/Bomb-explosion.png'
    this.img.frames = 10
    this.vely = 0
  }

  shouldRemove() {
    return this.img.frameIndex > 9
  }

}


