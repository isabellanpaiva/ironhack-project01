class Snake {

    constructor(gameScreen, gameSize, keys) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.keys = keys


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
        this.updateSnakePosition();
        requestAnimationFrame(() => this.moveUp()); //continuous movement link 
    }


    moveDown() {

        //console.log("you pressed down");
        this.snakePosition.top += this.snakeSpeed.top
        this.updateSnakePosition()
        requestAnimationFrame(() => this.moveDown()); //continuous movement link

    }

    moveLeft() {

        //console.log("you pressed left");
        this.snakePosition.left -= this.snakeSpeed.left
        this.updateSnakePosition()
        requestAnimationFrame(() => this.moveLeft()); //continuous movement link


    }

    moveRight() {

        //console.log("you pressed right")
        this.snakePosition.left += this.snakeSpeed.left
        this.updateSnakePosition()
        requestAnimationFrame(() => this.moveRight()); //continuous movement link

    }

    updateSnakePosition() {
        this.snakeElement.style.left = `${this.snakePosition.left}px`
        this.snakeElement.style.top = `${this.snakePosition.top}px`
    }

}

