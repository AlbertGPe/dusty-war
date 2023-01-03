const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d")


const menuMusic = new Audio('../src/Music/menu.mp3')
menuMusic.volume = 0.1

const menu = document.getElementById("menu")
const winMenu = document.getElementById('win-menu')
const startButtons = document.getElementsByClassName("start-btn")
const gameOverMenu = document.getElementById('game-over-menu')
let game = null

for (let btn of startButtons){
  btn.onclick = () => {
    canvas.style.display = 'block'
    menu.style.display = 'none'
    winMenu.style.display = 'none'
    gameOverMenu.style.display = 'none'
    menuMusic.pause();
    menuMusic.currentTime = 0;
    if (game) {
      game.stop()
    }
    game = new Game(ctx)
    game.start()
  }
}

const menuButtons = document.getElementsByClassName('return-menu')

for (let menuBtn of menuButtons){
  menuBtn.onclick = () => {
    menu.style.display = 'block'
    canvas.style.display = 'none'
    winMenu.style.display = 'none'
    gameOverMenu.style.display = 'none'
    menuMusic.play();
  }
}
