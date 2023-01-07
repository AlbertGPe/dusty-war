class Bomb {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.vely = 2
    this.w = 25
    this.h = 25

    this.img = new Image();
    this.img.src = 'src/images/Enemy/bombseq.png'
    this.img.frames = 7
    this.img.frameIndex = 0
    this.count = 0;
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * this.img.width / this.img.frames,
      0,
      this.img.width / this.img.frames,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
      ) // TODO: draw with frames
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
    this.img.src = 'src/images/Enemy/Bomb-explosion.png'
    this.img.frames = 10
    this.y = 280
    this.w = 45
    this.h = 60
  }

  shouldRemove() {
    return this.img.frameIndex > 8
  }

}


