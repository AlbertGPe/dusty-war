const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d")

const game = new Game(ctx)

const btn = document.getElementById("start-btn")
btn.onclick = () => {
    const menu = document.getElementById("menu")
    menu.remove()
    canvas.style.display = 'block'
    game.start()
}