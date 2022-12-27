class Boss {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = 750;
    this.y = 260;
    this.w = 150;
    this.h = 80;

    this.health = 30; //VIDA SERÁ 100

    //BOSS FIRING IMG
    this.img = new Image();
    this.img.src = '../src/images/Enemy/Bossfiring.png'
    this.img.frames = 4
    this.img.framesIndex = 0
    this.count = 0;

    //BOSS APARITION IMG
    this.aparitionimg = new Image();
    this.aparitionimg.src = '../src/images/Enemy/Boss-animation.png'
    this.aparitionimg.frames = 6
    this.aparitionimg.framesIndex = 0
    this.tick = 0
    this.changeimg = 0

    //BULLETS ARRAY
    this.bullets = []
    this.bulletsTime = 0
  }

  draw() {
   if (this.changeimg <= 3) {
    this.aparitionAnimation();
   } else { 
    this.fireAnimation();
    this.shootTime();
   }
  }

  move() {
    this.bullets.forEach(bullet => bullet.move())
  }

  shoot() {
    const bullet = new Bullet(ctx, this.x + 17, this.y + 35)
    bullet.img = new Image();
    bullet.img.src = '../src/images/Enemy/boss-bullets.png'
    bullet.owner.boss = true;
    this.bullets.push(bullet);
  }

  shootTime() {
    this.bulletsTime++;
    if (this.bulletsTime > 50 + Math.random() * 500) {
      this.shoot();
      this.bulletsTime = 0;
    }
    this.bullets.forEach(bullet => bullet.draw())
  }

  fireAnimation() {
    this.ctx.drawImage(
      this.img,
      this.img.framesIndex * this.img.width / this.img.frames,
      0,
      (this.img.width / this.img.frames) - 6,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    )

    this.count++;
    if (this.count > 11) {
      this.count = 0;
      this.img.framesIndex++;
      if (this.img.framesIndex > this.img.frames - 1) {
        this.img.framesIndex = 0;
      }
    }
  }

  aparitionAnimation(){
    this.ctx.drawImage(
      this.aparitionimg,
      this.aparitionimg.framesIndex * this.aparitionimg.width / this.aparitionimg.frames + 7,
      0,
      this.aparitionimg.width / this.aparitionimg.frames,
      this.aparitionimg.height,
      775,
      280,
      120,
      60
    )

    this.tick++
    if (this.tick > 15) {
      this.tick = 0;
      this.aparitionimg.framesIndex++;
      if (this.aparitionimg.framesIndex > this.img.frames - 1){
        this.aparitionimg.framesIndex = 0
        this.changeimg++;
      }
    }
    this.health = 30;
  }
}