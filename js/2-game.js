const Game = {

    // [QUESTION: HOW TO ADJUST GAME SIZE TO THE CENTER OF THE WINDOW?]

    gameScreen: document.querySelector("#game-screen"),
    gameSize: {
        w: window.innerWidth / 2,
        h: window.innerHeight / 1.5,
        backgroundColor: "black"
    },

    snake: undefined,

    power: undefined,

    keys: { UP: 'KeyW', DOWN: 'KeyS', LEFT: "KeyA", RIGHT: "KeyD" },


    init() {
        this.setDimensions();
        this.setBackgroundColor();
        this.setEventListeners();
        this.start()
    },

    setDimensions() {
        this.gameScreen.style.width = `${this.gameSize.w}px`;
        this.gameScreen.style.height = `${this.gameSize.h}px`;
    },

    setBackgroundColor() {
        this.gameScreen.style.backgroundColor = this.gameSize.backgroundColor;
    },

    setEventListeners() {

        document.onkeydown = event => {

            switch (event.code) {

                case this.keys.UP:
                    this.snake.moveUp()
                    //console.log("you pressed up");
                    break;

                case this.keys.DOWN:
                    this.snake.moveDown()
                    break;

                case this.keys.LEFT:
                    this.snake.moveLeft()
                    break;

                case this.keys.RIGHT:
                    this.snake.moveRight()
                    break;
            }
        }
    },


    start() {
        this.createElement()
        this.gameLoop()
    },

    createElement() {
        this.snake = new Snake(this.gameScreen, this.gameSize)
        this.power = new Power(this.gameScreen, this.gameSize)
    },

    gameLoop() {

        this.drawAll()
        //this.clearAll()
        window.requestAnimationFrame(() => this.gameLoop())
    },

    drawAll() {
        //console.log("test draw")
        this.snake.checkBorderCollision()
        this.snake.checkPowerCollision()
    },

    // clearAll() {

    //     if (this.gameOver) {

    //     }
    // }

    gameOver() {
        //console.log("game over")
        alert('GAME OVER')
    }
}
