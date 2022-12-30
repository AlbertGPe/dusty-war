const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d")


const menuMusic = new Audio('../src/Music/menu.mp3')
menuMusic.volume = 0.1
menuMusic.play();

const menu = document.getElementById("menu")
const winMenu = document.getElementById('win-menu')
const startButtons = document.getElementsByClassName("start-btn")
for (let btn of startButtons){
  btn.onclick = () => {
    menu.style.display = 'none'
    winMenu.style.display = 'none'
    canvas.style.display = 'block'
    const game = new Game(ctx)
    game.start()
  }
}

const menuButton = document.getElementById('return-menu')
menuButton.onclick = () => {
  menu.style.display = 'block'
  canvas.style.display = 'none'
  winMenu.style.display = 'none'
}