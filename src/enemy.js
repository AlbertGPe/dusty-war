class Enemy {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = this.ctx.canvas.width;
    this.y = 290;
    this.w = 33.5;
    this.h = 50;
    this.velx = -1.5;
    
    //ENEMY HEALTH
    this.health = 10;

    //BULLETS ARRAY
    this.bullets = []
    this.bulletsTime = 0

    //ENEMY WALKING
    this.img = new Image();
    this.img.src = '../src/images/Enemy/Enemie-walk-secuence.png'
    this.img.frames = 6; // NUMBER OF IMAGES INSIDE THE IMAGE
    this.img.frameIndex = 0;
    this.count = 0; // COUNT TO GO FROM ONE FRAME (ONE IMAGE) TO ANOTHER
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * this.img.width / this.img.frames,
      0,
      (this.img.width / this.img.frames) - 3,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    )

    this.walkAnimation();
    this.shootTime();
  }

  walkAnimation() {
    this.count++;

    if (this.count === 5){
      this.count = 0;
      this.img.frameIndex++;
      if (this.img.frameIndex > this.img.frames - 1) {
        this.img.frameIndex = 0;
      }
    }
  }

  move() {
    this.x += this.velx;
    this.bullets.forEach(bullet => bullet.move())
  }

  shoot() {
    const bullet = new Bullet(ctx, this.x - 20, this.y + 2)
    bullet.owner.enemy = true;
    bullet.img = new Image();
    bullet.img.src = '../src/images/Enemy/enemies-bullets.png'
    this.bullets.push(bullet);
  }

  shootTime(){
    this.bulletsTime++;
    if (this.bulletsTime > 150 + Math.random() * 80) {
      this.shoot();
      this.bulletsTime = 0;
    }
    this.bullets.forEach(bullet => bullet.draw())
  }

  insideCanvas() {
    return this.x + this.w >= 0 && this.x <= this.ctx.canvas.width //ONLY EXECUTE IF ITS TRUE
  }
}