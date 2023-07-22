class Snake {

    constructor(gameScreen, gameSize, keys, powerSize, powerPosition) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.keys = keys
        this.powerSize = powerSize
        this.powerPosition = powerPosition


        this.snakeSize = {
            w: 35,
            h: 35
        }

        this.snakePosition = {
            left: (gameSize.w - this.snakeSize.w) / 2,
            top: (gameSize.h - this.snakeSize.h) / 2
        }

        this.snakeSpeed = {
            left: 0.5,
            top: 0.5
        }



        this.init()

    }

    // [QUESTION: CAN WE REPLACE LEFT AND TOP PROPERTIES FOR HORIZONTAL AND VERTICAL?]


    init() {

        this.snakeElement = document.createElement('div')

        this.snakeElement.style.position = "absolute"
        this.snakeElement.style.width = `${this.snakeSize.w}px`
        this.snakeElement.style.height = `${this.snakeSize.h}px`
        this.snakeElement.style.left = `${this.snakePosition.left}px`
        this.snakeElement.style.top = `${this.snakePosition.top}px`
        this.snakeElement.style.backgroundColor = "white"

        this.gameScreen.appendChild(this.snakeElement)

    }

    moveUp() {
        this.snakePosition.top -= this.snakeSpeed.top;
        this.updatePosition();
        requestAnimationFrame(() => this.moveUp()); //continuous movement link 
    }


    moveDown() {

        //console.log("you pressed down");
        this.snakePosition.top += this.snakeSpeed.top
        this.updatePosition()
        requestAnimationFrame(() => this.moveDown()); //continuous movement link

    }

    moveLeft() {

        //console.log("you pressed left");
        this.snakePosition.left -= this.snakeSpeed.left
        this.updatePosition()
        requestAnimationFrame(() => this.moveLeft()); //continuous movement link


    }

    moveRight() {

        //console.log("you pressed right")
        this.snakePosition.left += this.snakeSpeed.left
        this.updatePosition()
        requestAnimationFrame(() => this.moveRight()); //continuous movement link

    }

    updatePosition() {
        this.snakeElement.style.left = `${this.snakePosition.left}px`
        this.snakeElement.style.top = `${this.snakePosition.top}px`
    }


    checkBorderCollision() {

        if (
            this.snakePosition.top > this.gameSize.h - this.snakeSize.h ||
            this.snakePosition.top < 0
        ) {
            //.console.log("you reached top border")
            Game.gameOver()
        }

        if (
            this.snakePosition.left >= this.gameSize.w - this.snakeSize.w ||
            this.snakePosition.left < 0
        ) {
            //console.log("you reached left border")
            Game.gameOver()
        }
    }

    checkPowerCollision() {

        //if (
        //this.powerPosition
        //this.snakePosition.top + this.snakeSize.h > this.powerPosition.top ||
        //this.snakePosition.top < this.powerPosition.top + this.powerSize.h ||
        //this.snakePosition.left + this.snakeSize.w > this.powerPosition.left ||
        //this.snakePosition.left < this.powerPosition.left + this.powerSize.w
        //) {
        //console.log("Snake collided with power-up");
        //console.log(`${this.snakePosition.top}`)
        //console.log(`${this.snakePosition.left}`)
        //console.log(`${this.snakeSize.w}`)
        //console.log(`${this.snakeSize.h}`)
        console.log(`${this.powerPosition}`)

    }
}


