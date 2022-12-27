class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.interval = null;
    this.background = new Background(ctx);
    this.soldier = new Soldier(ctx);
    //this.boss = null;
    this.boss = new Boss(ctx);

    this.enemies = []
    this.enemyApparition = 60 * 5

    this.helicopterApparition = 320

    this.helicopters = []

    //CONTAR PARA LA APARICIÓN DEL BOSS
    this.enemiesDead = 0
  }

  start() {
    this.initListeners();

    this.interval = setInterval(() => {
      this.clear();
      this.draw();
      this.addEnemy();
      this.checkEnemyCollision();
      this.checkSoldierCollision();
      this.checkBossCollision();
      /*if (this.soldier.health <= 0) {
        this.gameOver();
      }*/
      this.move();
    },1000 / 60);
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
  }

  move() {
    this.background.move();
    this.soldier.move();
    this.enemies.forEach(enemy => enemy.move())
    this.helicopters.forEach(helicopter => helicopter.move()) 
  }

  addEnemy() {
    if (this.enemiesDead <= 3) { 
      this.addEnemies();
      this.boss.health = 30; //QUITAR CUANDO SE ARREGLE EL BUG DE HACER HIT SIN QUE ESTE DIBUJADO
    }
    if (this.enemiesDead > 3 && this.enemiesDead < 7 && this.boss.health > 0) {
      /*if (!this.boss) {
        this.boss = new Boss(ctx);
      }*/
      this.addBoss();
    }
    if (this.enemiesDead > 3 && this.enemiesDead < 7 && this.boss.health <= 0) {
      this.addEnemies();
      this.addHelicopters();
    }
    if (this.enemiesDead >= 7 && this.boss.health <= 0) {
      this.boss.health = 30;
    }
    if (this.enemiesDead >= 7) {
      this.addBoss();
      this.addHelicopters();
    }
  }

  addEnemies(){
    this.enemyApparition--

      if(this.enemyApparition <= 0) {
        this.enemyApparition = 200 + Math.random() * 300; //RANDOM TIME TO ENEMY APPEAR TO NOT BE ALWAYS THE SAME
        this.enemies.push(new Enemy(this.ctx));
      }
  }

  addBoss() {
    this.boss.draw();
    this.boss.move();
  }

  addHelicopters() {
    this.helicopterApparition--

    if (this.helicopterApparition <= 0) {
      this.helicopterApparition = 220 + Math.random() * 300
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
      if (this.soldier.bullets.length
        && this.soldier.bullets[i].x + this.soldier.bullets[i].img.width >= this.boss.x + 40
        && this.soldier.bullets[i].x <= this.boss.x + this.boss.img.width / this.boss.img.frames
        && this.soldier.bullets[i].y >= this.boss.y
        && this.soldier.bullets[i].y + this.soldier.bullets[i].img.height <= this.boss.y + this.boss.img.height) {
          //DELETE FROM ARRAY AND SCREEN THE BULLET THAT IS HITTING THE BOSS
          this.soldier.bullets.splice(i, 1);   
          //DECREASING BOSS HEALTH
          this.boss.health -= 2
          console.log(this.boss.health)
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
    for (let i = 0; i < this.boss.bullets.length; i++) {
      if (this.boss.bullets.length
        && this.boss.bullets[i].x <= this.soldier.x + this.soldier.img.width / this.soldier.img.frames - 15
        && this.boss.bullets[i].x + this.boss.bullets[i].img.width >= this.soldier.x
        && this.boss.bullets[i].y >= this.soldier.y
        && this.boss.bullets[i].y + this.boss.bullets[i].img.height <= this.soldier.y + this.soldier.img.height) {
          this.boss.bullets.splice(i, 1)
          //this.soldier.healthImg.frameIndex++
          console.log('hitbyboss')
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
            //this.soldier.healthImg.frameIndex++
           }
      }
    }   
  }

  gameOver() {
    this.img = new Image();
    this.img.src = '../src/images/Menus/Game-over.png'

     this.ctx.drawImage(this.img, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }
}