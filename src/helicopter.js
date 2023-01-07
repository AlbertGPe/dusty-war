class Helicopter {
  constructor(ctx) {
    this.ctx = ctx
    this.x = this.ctx.canvas.width;
    this.y = 20
    this.floor = 350
    this.velx = -1.5
    this.w = 150
    this.h = 80

    this.bombs = []
    this.bombstime = 0
    
    this.bombsDodged = 0

    this.img = new Image();
    this.img.src = '../src/images/Enemy/Helicopter-movement.png'
    this.img.frames = 4
    this.img.frameIndex = 0
    this.count = 0

    this.bombMusic = new Audio('../src/Music/bombs.mp3')
    this.bombMusic.volume = 0.1

    this.bombimg = new Image();
    this.bombimg.src = '../src/images/Enemy/Bomb-explosion.png'
    this.bombimg.frames = 10;
    this.bombimg.frameIndex = 0;
    this.count2 = 0;
  }

  draw() {
    this.ctx.drawImage (
      this.img,
      this.img.frameIndex * this.img.width / this.img.frames,
      0,
      this.img.width / this.img.frames,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    )

    this.flyAnimation();
    this.fireBombTime();
    this.checkBombFloorCollision();
  }

  flyAnimation() {
    this.count++;

    if (this.count >= 70){
      this.count = 0;
      this.img.frameIndex++;
      if (this.img.frameIndex > this.img.frames - 1) {
        this.img.frameIndex = 0;
      }
    }
  }

  move() {  
    this.x += this.velx;
    this.bombs.forEach(bomb => bomb.move())
  }

  fireBomb() {
    const bomb = new Bomb(this.ctx, this.x + 35, this.y + 55);
    this.bombs.push(bomb);
  }

  fireBombTime() {
    this.bombstime++
    if (this.bombstime > 200 + Math.random() * 80) {
      this.fireBomb();
      this.bombstime = 0;
    }
    this.bombs.forEach(bomb => bomb.draw())
  }

  checkBombFloorCollision() {
    for (let i = 0; i < this.bombs.length; i++) {
      if (this.bombs[i].y + this.bombs[i].img.height >= this.floor) {

        this.bombMusic.play();
        this.bombMusic.currentTime = 0;

        this.bombs[i].explode()
        if (this.bombs[i].shouldRemove()) {
          this.bombs.splice(i , 1)
          game.bombsDodged++
        }
      }
    }
  }

  insideCanvas() {
    return this.x + this.w >= 0 && this.x <= this.ctx.canvas.width //ONLY EXECUTE IF ITS TRUE
  }
}