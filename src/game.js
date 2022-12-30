class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.interval = null;
    this.background = new Background(ctx);
    this.soldier = new Soldier(ctx);
    this.boss = []

    this.enemies = []
    this.enemyApparition = 60 * 5

    this.helicopterApparition = 250

    this.helicopters = []

    //CONTAR PARA LA APARICIÓN DEL BOSS
    this.enemiesDead = 0
    this.bossDead = 0

    //PUNTUACIÓN FINAL DODGE
    this.bulletsDodged = 0
    this.bombsDodged = 0

    //MUSIC
    /*this.backgroundMusic = new Audio('../src/Music/soundtrack.mp3')
    this.backgroundMusic.volume = 0.1*/

    this.bossMusic = new Audio('../src/Music/boss-killed.mp3')
    this.bossMusic.volume = 0.1

    this.gameOverMusic = new Audio('../src/Music/GameOver.ogg')
    this.gameOverMusic.volume = 0.1

    this.hitmarkerMusic = new Audio('../src/Music/hitmarker.mp3')
    this.hitmarkerMusic.volume = 0.1

    this.winMusic = new Audio('../src/Music/Victory.mp3')
    this.winMusic.volume = 0.1

    this.helMusic = new Audio('../src/Music/helicopter-appear.mp3')
    this.helMusic.volume = 0.05
  }

  start() {
    //this.backgroundMusic.play();
    this.initListeners();
    this.interval = setInterval(() => {
      if (!this.soldier.paused) {
        this.clear();
        this.draw();
        this.addEnemy();
        this.checkEnemyCollision();
        this.checkSoldierCollision();
        this.checkBossCollision();
        this.move();
      } else {
        this.pauseImg();
      }
    },1000 / 60);
  }

  pauseImg() {
    this.img = new Image()
    this.img.src = '../src/images/Menus/pause.png'
    this.ctx.drawImage(this.img, 300, 100)
  }

  initListeners() {
    document.onkeydown = (e) => {
      this.soldier.onKeyDown(e.keyCode);
    }

    document.onkeyup = (e) => {
      this.soldier.onKeyUp(e.keyCode);
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.enemies = this.enemies.filter(enemy => enemy.insideCanvas()) //CLEAR ENEMIES ARRAY TO HAVE THE ONES IN CANVAS
    this.helicopters = this.helicopters.filter(helicopter => helicopter.insideCanvas())
  }

  draw() {
    this.background.draw();
    this.soldier.draw();
    this.enemies.forEach(enemy => enemy.draw())
    this.helicopters.forEach(helicopter => helicopter.draw())
    this.boss.forEach(boss => boss.draw()) 
  }

  move() {
    this.background.move();
    this.soldier.move();
    this.enemies.forEach(enemy => enemy.move())
    this.helicopters.forEach(helicopter => helicopter.move()) 
    this.boss.forEach(boss => boss.move()) 
  }

  addEnemy() {
    if (this.bossDead === 2) {
      this.win();
      this.helicopters = []
    } else {
      if (this.enemiesDead < 1) {
        this.addEnemies();
      }
      if (this.enemiesDead >= 1 && this.enemiesDead < 4 && !this.boss.length && !this.bossDead) {
        this.addBoss();
      }
      if (this.enemiesDead < 4 && this.bossDead === 1) {
        this.helMusic.play();
        this.addHelicopters();
        this.addEnemies();
      }
      if (this.enemiesDead >= 4 && !this.boss.length && this.bossDead === 1) {
        this.addBoss();
      }
      if (this.enemiesDead >= 4) {
        this.addHelicopters();
      }
    }
  }

  addEnemies(){
    this.enemyApparition--

    if(this.enemyApparition <= 0) {
      this.enemyApparition = 100 + Math.random() * 300; //RANDOM TIME TO ENEMY APPEAR TO NOT BE ALWAYS THE SAME
      this.enemies.push(new Enemy(this.ctx));
    }
  }

  addBoss() {
    this.boss.push(new Boss(this.ctx))
  }

  addHelicopters() {
    this.helicopterApparition--

    if (this.helicopterApparition <= 0) {
      this.helicopterApparition = 200 + Math.random() * 250
      this.helicopters.push(new Helicopter(this.ctx))
    }
  }

  checkEnemyCollision() {
   for (let j = 0; j < this.enemies.length; j++) {
      for (let i = 0; i < this.soldier.bullets.length; i++) {
        if (this.soldier.bullets.length && this.enemies.length
          && this.soldier.bullets[i].x + this.soldier.bullets[i].img.width >= this.enemies[j].x
          && this.soldier.bullets[i].x <= this.enemies[j].x + this.enemies[j].img.width / this.enemies[j].img.frames
          && this.soldier.bullets[i].y >= this.enemies[j].y
          && this.soldier.bullets[i].y + this.soldier.bullets[i].img.height <= this.enemies[j].y + this.enemies[j].img.height) {
            this.hitmarkerMusic.play();
            //DELETE FROM ARRAY AND SCREEN THE BULLET THAT IS HITTING THE ENEMY
            this.soldier.bullets.splice(i, 1);
            //DRAW BLOOD IMG
            this.bloodimg = new Image();
            this.bloodimg.src = '../src/images/Enemy/enemy-blood.png'
            this.ctx.drawImage(this.bloodimg, this.enemies[j].x - 25, this.enemies[j].y, 50, 30);
            //DECREASING ENEMY HEALTH
            this.enemies[j].health--;
            //DELETE ENEMY FROM ARRAY AND SCREEN
            if (this.enemies[j].health <= 0) {
              this.enemies.splice(j , 1);
              this.enemiesDead++;
              console.log(this.enemiesDead);
            }
          }
      }
    }
  }

  checkBossCollision() {
    for (let i = 0; i < this.soldier.bullets.length; i++){
      if (this.soldier.bullets.length && this.boss.length
        && this.soldier.bullets[i].x + this.soldier.bullets[i].img.width >= this.boss[0].x + 40
        && this.soldier.bullets[i].x <= this.boss[0].x + this.boss[0].img.width / this.boss[0].img.frames
        && this.soldier.bullets[i].y >= this.boss[0].y
        && this.soldier.bullets[i].y + this.soldier.bullets[i].img.height <= this.boss[0].y + this.boss[0].img.height) {
          this.hitmarkerMusic.play();
          //DELETE FROM ARRAY AND SCREEN THE BULLET THAT IS HITTING THE BOSS
          this.soldier.bullets.splice(i, 1);  
          //DRAW BLOOD IMG
          this.bloodimg = new Image();
          this.bloodimg.src = '../src/images/Enemy/enemy-blood.png'
          this.ctx.drawImage(this.bloodimg, this.boss[0].x + 45, this.boss[0].y + 20, 50, 30);
          //DECREASING BOSS HEALTH
          this.boss[0].health -= 2
          if (this.boss[0].health <= 0){
            this.boss.splice(0, 1);
            this.bossMusic.play();
            this.bossDead++;
            console.log(this.bossDead)
          }
          
        }
    }
  }
  
  checkSoldierCollision() {
    //COLLISION BY ENEMY BULLET
    for (let j = 0; j < this.enemies.length; j++) {
      for (let i = 0; i < this.enemies[j].bullets.length; i++) {
        if (this.enemies[j].bullets.length
          && this.enemies[j].bullets[i].x <= this.soldier.x + this.soldier.img.width / this.soldier.img.frames
          && this.enemies[j].bullets[i].x + this.enemies[j].bullets[i].img.width >= this.soldier.x
          && this.enemies[j].bullets[i].y >= this.soldier.y
          && this.enemies[j].bullets[i].y + this.enemies[j].bullets[i].img.height <= this.soldier.y + this.soldier.img.height) {
            this.enemies[j].bullets.splice(i, 1)
            console.log('hit')
            this.soldier.health--;
            //SUMAR EL FRAMEINDEX PARA IR CAMBIANDO LA IMAGEN DE VIDA
            //this.soldier.healthImg.frameIndex++
           } else if (this.enemies[j].bullets[i].x <= 0) {
            this.enemies[j].bullets.splice(i, 1);
            this.bulletsDodged++
            console.log(this.bulletsDodged)
           }
      }

      //COLLISION BY ENEMY
      if (this.enemies.length
        && this.enemies[j].x <= this.soldier.x + this.soldier.img.width / this.soldier.img.frames
        && this.enemies[j].x >= this.soldier.x + this.soldier.img.width / this.soldier.img.frames - 1
        ) {
          console.log('hit2')
          //this.soldier.healthImg.frameIndex++
        }
      if (this.enemies[j].x + this.enemies[j].img.width / this.enemies[j].img.frames >= this.soldier.x
        && this.enemies[j].x + this.enemies[j].img.width / this.enemies[j].img.frames <= this.soldier.x + 2) {
          //this.soldier.healthImg.frameIndex++
        }
    }

    //COLLISION BY BOSS BULLETS
     if (this.boss.length) { 
      for (let i = 0; i < this.boss[0].bullets.length; i++) {
        if (this.boss[0].bullets.length
          && this.boss[0].bullets[i].x <= this.soldier.x + this.soldier.img.width / this.soldier.img.frames - 15
          && this.boss[0].bullets[i].x + this.boss[0].bullets[i].img.width >= this.soldier.x
          && this.boss[0].bullets[i].y >= this.soldier.y
          && this.boss[0].bullets[i].y + this.boss[0].bullets[i].img.height <= this.soldier.y + this.soldier.img.height) {
            this.boss[0].bullets.splice(i, 1)
            //this.soldier.healthImg.frameIndex += 3
            console.log('hitbyboss')
          } else if (this.boss[0].bullets[i].x <= 0) {
            this.boss[0].bullets.splice(i, 1)
            this.bulletsDodged++
            console.log(this.bulletsDodged)
           }
      }
    }

    //COLLISION BY BOMBS
    for (let j = 0; j < this.helicopters.length; j++) {
      for (let i = 0; i < this.helicopters[j].bombs.length; i++) {
        if (this.helicopters[j].bombs.length
          && this.helicopters[j].bombs[i].x >= this.soldier.x
          && this.helicopters[j].bombs[i].x + this.helicopters[j].bombs[i].img.width <= this.soldier.x + this.soldier.img.width / this.soldier.img.frames
          && this.helicopters[j].bombs[i].y + this.helicopters[j].bombs[i].img.height >= this.soldier.y + 10) {
            this.helicopters[j].bombs.splice(i, 1)
            console.log('bomb hit')
            this.soldier.health--;
            //SUMAR EL FRAMEINDEX PARA IR CAMBIANDO LA IMAGEN DE VIDA
            //this.soldier.healthImg.frameIndex += 2
           } else if (this.helicopters[j].bombs.length 
            && this.helicopters[j].bombs[i].y + this.helicopters[j].bombs[i].img.height >= 347) {
            this.bombsDodged++
            console.log(this.bombsDodged)
           }
      }
    }   
    /*if (this.soldier.health <= 0) {
        this.gameOver();
        this.gameOverMusic.play();
      }*/
  }

  win() {
    const winMenu = document.getElementById('win-menu')
    winMenu.style.display = 'block'
    const canvas = document.getElementById('canvas')
    canvas.style.display = 'none'

    document.getElementById('score').innerHTML = `YOU DODGED ${this.bulletsDodged} BULLETS AND ${this.bombsDodged} BOMBS!`;
    this.winMusic.play();
    clearInterval(this.interval);
  }

  gameOver() {
    this.img = new Image();
    this.img.src = '../src/images/Menus/Game-over.png'

    this.ctx.drawImage(this.img, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    clearInterval(this.interval);
  }
}