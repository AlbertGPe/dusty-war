const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d")


const menuMusic = new Audio('../src/Music/menu.mp3')
menuMusic.volume = 0.1
menuMusic.play();

const menu = document.getElementById("menu")
const winMenu = document.getElementById('win-menu')
const startButtons = document.getElementsByClassName("start-btn")
const gameOverMenu = document.getElementById('game-over-menu')


for (let btn of startButtons){
  btn.onclick = () => {
    menu.style.display = 'none'
    winMenu.style.display = 'none'
    canvas.style.display = 'block'
    menuMusic.pause();
    menuMusic.currentTime = 0;
    const game = new Game(ctx)
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
  }
}
