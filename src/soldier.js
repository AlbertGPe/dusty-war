class Soldier {
  constructor(ctx) {
    this.ctx = ctx
      
    this.x = 150
    this.y = 280
    this.w = 60
    this.h = 70
    this.floor = 350 //CALLED FLOOR BUT ITS IMAGE FLOOR - SOLDIER HEIGHT. LA Y ESTA EN LA CABEZA DEL SOLDADO
    this.velx = 0
    this.vely = 0
    this.accx = 0
    this.accy = 0.5

    this.paused = false

    //SOLDIER HEALTH
    this.health = 1

    // SOLDIER WALKING
    this.img = new Image()
    this.img.src = '../src/images/Soldier/Soldier-walking.png'
    this.img.frames = 2
    this.img.frameIndex = 0
    this.count = 0

    //HEALTH IMG
    this.healthImg = new Image()
    this.healthImg.src = '../src/images/Soldier/soldier-health.png'
    this.healthImg.frames = 11
    this.healthImg.frameIndex = 0

    // BULLETS ARRAY
    this.bullets = []

    //SHOOT AUDIO
    this.shootMusic = new Audio('../src/Music/soldier-shot.mp3')
    this.shootMusic.volume = 0.02
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
    )

    this.ctx.drawImage(
      this.healthImg,
      0,
      this.healthImg.frameIndex * this.healthImg.height / this.healthImg.frames,
      this.healthImg.width,
      this.healthImg.height / this.healthImg.frames,
      10,
      375,
      140,
      15
    )
    this.walkAnimation();

    //DRAW BULLET FROM ARRAY
    this.bullets.forEach(bullet => bullet.draw());
  }

  walkAnimation() {
    this.count++;

    if (this.count > 25){
      this.count = 0;
      this.img.frameIndex++;
      if (this.img.frameIndex > this.img.frames - 1) {
        this.img.frameIndex = 0;
      }
    }
  }

  move() {
    this.velx += this.accx;
    this.vely += this.accy;
    this.x += this.velx;
    this.y += this.vely;

    if(this.y + this.h >= this.floor) {
        this.y = this.floor - this.h
        this.vely = 0
      }

    if(this.x <= 0) {
      this.x = 0
      this.velx = 0
    }

    if(this.x >= this.ctx.canvas.width - this.w) {
      this.x = this.ctx.canvas.width - this.w
      this.velx = 0
    }

    //MOVING BULLET FROM ARRAY
    this.bullets.forEach(bullet => bullet.move());
  }

  shoot() {
    // THIS X + THIS W = DONDE EMPIEZA LA IMAGEN DEL SOLDADO(IZQUIERDA) + EL ANCHO DE LA IMAGEN
    // THIS Y + THIS H / 2 = DONDE EMPIEZA LA IMAGEN (ARRIBA) + LA ALTURA / 2 PARA CONSEGUIR LA MITAD DE LA IMAGEN
    
    const bullet = new Bullet(ctx, this.x + 40, this.y + 10);
    bullet.img = new Image();
    bullet.img.src = '../src/images/Soldier/soldier-bullet.png'
    bullet.owner.soldier = true;
    this.bullets.push(bullet);
  }

  jump() {
    if (this.y + this.h === this.floor) {
      this.vely = -9
    }
  }

  //TO BEND AND DODGE ENEMY BULLETS
  bend() {
    if (this.isBend) {
      return
    }
    this.isBend = true
    this.img.src = '../src/images/Soldier/Soldier-bend.png'
    this.img.frames = 1
    this.img.frameIndex = 0
    this.w = 40
    this.h = 45
    this.y = this.y + this.h
  }

  toNormalState() {
    this.isBend = false
    this.img.src = '../src/images/Soldier/Soldier-walking.png'
    this.img.frames = 2
    this.w = 60
    this.h = 70
  }

  pausedGame() {
    if (!this.paused) {
      this.paused = true
    } else if (this.paused) {
      this.paused = false
    }
  }

  onKeyDown(key) {
    switch(key) {
      case 37: 
        this.velx = -3
        break;
      case 39:
        this.velx = 3
        break;
      case 38: 
        this.jump()
        break;
      case 67:
        this.shoot()
        this.shootMusic.play();
        this.shootMusic.currentTime = 0
        break;
      case 40: 
        this.bend()
        break;
      case 80:
        this.pausedGame();
        break;
    }
  }

  onKeyUp(key){
    switch(key) {
      case 37:
      case 39:
        this.velx = 0
        break;
      //BEND
      case 40:
        this.toNormalState()
        break;
    }
  }
}

