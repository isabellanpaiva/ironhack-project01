class Snake {

    constructor(gameScreen, gameSize, keys) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.keys = keys


        this.snakeSize = {
            w: 25,
            h: 25
        }

        this.snakePosition = {

            //   left: (gameSize.w - this.snakeSize.w) / 2,
            //   top: (gameSize.h - this.snakeSize.h) / 2

            left: Math.floor(Math.random() * (this.gameSize.w - this.snakeSize.w)),
            top: Math.floor(Math.random() * (this.gameSize.h - this.snakeSize.h))
        }

        this.snakeSpeed = {
            left: 0,
            top: 0
        }


        this.init()

    }


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

    // ---------- [MOVEMENT CONDITIONS] ---------- 

    // ---------- [VERTICAL CONDITIONS] ---------- 

    moveUp() {

        console.log("you pressed up")
        this.snakeSpeed.left = 0;
        this.snakeSpeed.top = -2;


    }

    moveDown() {

        console.log("you pressed down")
        this.snakeSpeed.left = 0;
        this.snakeSpeed.top = 2;

    }

    // ---------- [VERTICAL CONDITIONS] ---------- 

    // ---------- [HORIZONTAL CONDITIONS] ---------- 

    moveLeft() {

        console.log("you pressed left")
        this.snakeSpeed.top = 0;
        this.snakeSpeed.left = -2;

    }

    moveRight() {

        console.log("you pressed right")

        this.snakeSpeed.top = 0;
        this.snakeSpeed.left = 2;

    }

    updateSnakePosition() {
        this.snakePosition.left += this.snakeSpeed.left
        this.snakePosition.top += this.snakeSpeed.top
        this.snakeElement.style.left = `${this.snakePosition.left}px`
        this.snakeElement.style.top = `${this.snakePosition.top}px`
    }

    // ---------- [HORIZONTAL CONDITIONS] ---------- 


    // moveUp() {

    //     //this.snakeSpeed.left = 0
    //     //this.snakeSpeed.top = -1

    //     this.snakePosition.top -= this.snakeSpeed.top;
    //     this.updateSnakePosition();
    //     requestAnimationFrame(() => this.moveUp()); //continuous movement link 
    // }


    // moveDown() {

    //     //console.log("you pressed down");

    //     //this.snakeSpeed.left = 0
    //     //this.snakeSpeed.top = 1

    //     this.snakePosition.top += this.snakeSpeed.top
    //     this.updateSnakePosition()
    //     requestAnimationFrame(() => this.moveDown()); //continuous movement link

    // }

    // moveLeft() {

    //     //console.log("you pressed left");

    //     //this.snakeSpeed.left = -1
    //     //this.snakeSpeed.top = 0

    //     this.snakePosition.left -= this.snakeSpeed.left
    //     this.updateSnakePosition()
    //     requestAnimationFrame(() => this.moveLeft()); //continuous movement link


    // }

    // moveRight() {

    //     //console.log("you pressed right")

    //     //this.snakeSpeed.left = 1
    //     //this.snakeSpeed.top = 0

    //     this.snakePosition.left += this.snakeSpeed.left
    //     this.updateSnakePosition()
    //     requestAnimationFrame(() => this.moveRight()); //continuous movement link

    // }


    // ---------- [MOVEMENT CONDITIONS] ---------- 

    // ---------- [UPDATED SIZE CONDITIONS] ---------- 

    getBigger() {

        //console.log("snake got bigger")
        //return
        this.snakeSize.w += 10
        this.snakeSize.h += 10
        this.updateSnakeSize()

    }

    updateSnakeSize() {
        this.snakeElement.style.width = `${this.snakeSize.w}px`
        this.snakeElement.style.height = `${this.snakeSize.h}px`
    }

    // ---------- [UPDATED SIZE CONDITIONS] ---------- 

}

