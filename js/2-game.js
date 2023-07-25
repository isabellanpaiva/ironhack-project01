// ---------------------------- [SETUP] ----------------------------


// ---------- [SCREEN SETUP] ----------

const Game = {

    gameScreen: document.querySelector("#game-screen"),
    gameSize: {
        w: window.innerWidth,
        h: window.innerHeight,
        backgroundColor: "black"

    },

    // ---------- [SCREEN SETUP] ----------

    // ---------- [OBJECTS SETUP] ----------

    counter: 0,

    firstStart: true,

    snake: undefined,

    power: undefined,

    obstacleList: [],

    cookieList: [],

    message: undefined,

    // ---------- [OBJECTS SETUP] ----------

    // ---------- [INIT SETUP] ----------

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

    start() {

        this.createElement()

        if (this.firstStart) { //execute gameLoop only once >>> avoid speed increase
            this.gameLoop()
            this.firstStart = false
        }

    },

    createElement() {
        this.message = new Message(this.gameScreen, this.gameSize)
        this.snake = new Snake(this.gameScreen, this.gameSize)
        this.power = new Power(this.gameScreen, this.gameSize)
    },

    gameLoop() {

        this.drawAll()
        this.clearAll()
        window.requestAnimationFrame(() => this.gameLoop())
    },

    drawAll() {
        //console.log("test draw")
        this.snake.updateSnakePosition()
        this.checkBorderCollision()
        this.checkPowerCollision()
        this.checkObstacleCollision()
        this.checkCookieCollision()
    },

    clearAll() {

    },

    // ---------- [INIT SETUP] ----------

    // ---------- [KEYBOARD SETUP] ----------

    keys: { UP: 'KeyW', DOWN: 'KeyS', LEFT: "KeyA", RIGHT: "KeyD", SPACE: "Space" },

    setEventListeners() {

        document.onkeydown = event => {

            switch (event.code) {
                case this.keys.UP:
                    this.snake.moveUp()
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

                case this.keys.SPACE:
                    console.log("you pressed space")
                    this.removeMessage()
                    break;

            }
        }
    },

    // ---------- [KEYBOARD SETUP] ----------

    // ---------- [GAME OVER SETUP] ----------

    gameOver() {

        //console.log("game over")

        //this.gameOverMessage()

        alert('GAME OVER')

        this.resetGame()
    },

    // ---------- [GAME OVER SETUP] ----------

    // gameOverMessage() {

    //     this.message = new Message(this.gameScreen, this.gameSize)

    //     this.message.messageElement.innerText = "Maybe next time..."


    // },

    // ---------- [RESET SETUP] ----------

    resetGame() {

        this.counter = 0

        this.snake = new Snake(this.gameScreen, this.gameSize);
        this.power = new Power(this.gameScreen, this.gameSize);
        this.obstacleList = [];
        this.cookieList = []

        this.gameScreen.innerHTML = '';

        this.init()

        console.log(this.counter)

    },

    // ---------- [RESET SETUP] ----------

    // ---------- [MESSAGES SETUP] ----------


    removeMessage() {

        this.message.messageElement.remove()
    },


    // ---------- [MESSAGES SETUP] ----------

    // ---------------------------- [SETUP] ----------------------------


    // ---------------------------- [INTERACTIONS] ----------------------------


    // ---------- [COLLISION INTERACTIONS] ---------- 

    checkBorderCollision() {

        if (
            this.snake.snakePosition.top > this.gameSize.h - this.snake.snakeSize.h ||
            this.snake.snakePosition.top < 0
        ) {
            //.console.log("you reached top border")
            this.gameOver()
        }

        if (
            this.snake.snakePosition.left >= this.gameSize.w - this.snake.snakeSize.w ||
            this.snake.snakePosition.left < 0
        ) {
            //console.log("you reached left border")
            this.gameOver()
        }
    },

    checkPowerCollision() {

        if (
            this.snake.snakePosition.top + this.snake.snakeSize.h > this.power.powerPosition.top &&
            this.snake.snakePosition.top < this.power.powerPosition.top + this.power.powerSize.h &&
            this.snake.snakePosition.left + this.snake.snakeSize.w > this.power.powerPosition.left &&
            this.snake.snakePosition.left < this.power.powerPosition.left + this.power.powerSize.w
        ) {

            this.generateRandomPowerPosition()
            this.increaseCounter()
            this.increaseLevel()

        }
    },

    checkObstacleCollision() {

        if (this.obstacleList) {

            this.obstacleList.forEach(eachObstacle => {

                if (
                    this.snake.snakePosition.top + this.snake.snakeSize.h > eachObstacle.obstaclePosition.top &&
                    this.snake.snakePosition.top < eachObstacle.obstaclePosition.top + eachObstacle.obstacleSize.h &&
                    this.snake.snakePosition.left + this.snake.snakeSize.w > eachObstacle.obstaclePosition.left &&
                    this.snake.snakePosition.left < eachObstacle.obstaclePosition.left + eachObstacle.obstacleSize.w
                ) {

                    this.gameOver()

                }
            })
        }
    },


    checkCookieCollision() {

        if (this.cookieList) {

            this.cookieList.forEach((eachCookie, index) => {

                if (
                    this.snake.snakePosition.top + this.snake.snakeSize.h > eachCookie.cookiePosition.top &&
                    this.snake.snakePosition.top < eachCookie.cookiePosition.top + eachCookie.cookieSize.h &&
                    this.snake.snakePosition.left + this.snake.snakeSize.w > eachCookie.cookiePosition.left &&
                    this.snake.snakePosition.left < eachCookie.cookiePosition.left + eachCookie.cookieSize.w
                ) {

                    //console.log("you eat a cookie")

                    this.cookieList.splice(index, 1);
                    eachCookie.cookieElement.remove()

                    this.snake.getBigger()

                }

            })

        }

    },

    // ---------- [COLLISION INTERACTIONS] ----------

    // ---------- [OVERLAP INTERACTIONS] ----------

    checkObstacleOverlap(left, top, w, h) {

        if (this.obstacleList) {


            let isColliding = false;

            this.obstacleList.forEach(eachObstacle => {

                if (

                    //checks for obstacle versus obstacle

                    (top + h > eachObstacle.obstaclePosition.top &&
                        top < eachObstacle.obstaclePosition.top + eachObstacle.obstacleSize.h &&
                        left + w > eachObstacle.obstaclePosition.left &&
                        left < eachObstacle.obstaclePosition.left + eachObstacle.obstacleSize.w)

                    // //checks for obstacle versus snake 

                    // || (top + h > this.snake.snakePosition.top &&
                    //     top < this.snake.snakePosition.top + this.snake.snakeSize.h &&
                    //     left + w > this.snake.snakePosition.left &&
                    //     left < this.snake.snakePosition.left + this.snake.snakeSize.h.w)

                    ////checks for obstacle versus power up

                    || (top + h > this.power.powerPosition.top &&
                        top < this.power.powerPosition.top + this.power.powerSize.h &&
                        left + w > this.power.powerPosition.left &&
                        left < this.power.powerPosition.left + this.power.powerSize.w)

                ) {

                    isColliding = true;

                }

            })

            return isColliding

        }
    },

    // ---------- [OVERLAP INTERACTIONS] ----------


    // ---------- [LEVEL 1 INTERACTIONS] ---------- 


    increaseCounter() {

        this.counter += 1

        console.log(this.counter)

    },


    generateRandomPowerPosition() {

        const maxLeft = this.gameSize.w - this.power.powerSize.w;
        const maxTop = this.gameSize.h - this.power.powerSize.h;

        this.power.powerPosition.left = Math.floor(Math.random() * maxLeft);
        this.power.powerPosition.top = Math.floor(Math.random() * maxTop);

        this.updatePowerPosition()

    },

    updatePowerPosition() {
        this.power.powerElement.style.left = `${this.power.powerPosition.left}px`
        this.power.powerElement.style.top = `${this.power.powerPosition.top}px`
    },


    // ---------- [LEVEL 1 INTERACTIONS] ---------- 

    // ---------- [LEVEL 2 INTERACTIONS] ---------- 

    generateRandomObstaclePosition() {

        this.obstacleList = [];

        for (let i = 0; i < 10; i++) {

            let obstacle = new Obstacle(this.gameScreen, this.gameSize);

            const isColiding = this.checkObstacleOverlap(obstacle.obstaclePosition.left, obstacle.obstaclePosition.top, obstacle.obstacleSize.w, obstacle.obstacleSize.h)
            console.log({ isColiding })

            if (isColiding) {

                obstacle.obstacleElement.remove()
                i--

            } else {

                this.obstacleList.push(obstacle);
            }
        }
    },

    // ---------- [LEVEL 2 INTERACTIONS] ---------- 

    // ---------- [LEVEL 3 INTERACTIONS] ---------- 

    generateRandomCookiePosition() {

        for (let i = 0; i < 10; i++) {

            const cookie = new Cookie(this.gameScreen, this.gameSize);

            this.cookieList.push(cookie);

        }

    },

    // ---------- [LEVEL 3 INTERACTIONS] ---------- 

    // ---------- [LEVEL UP INTERACTIONS] ----------

    increaseLevel() {

        if (this.counter === 1) {

            this.level2()

        } else if (this.counter === 2) {

            this.level3()

        }

    },

    level2() {

        console.log("you acchieved level 2")

        this.snake.snakePosition = {

            left: 20,
            top: 20

        }

        this.generateRandomObstaclePosition()

        this.stopMovement()

        this.level2Message()

    },

    level2Message() {

        this.message = new Message(this.gameScreen, this.gameSize)

        this.message.messageElement.innerHTML = '<br> <br> <div> Too easy, right? <div> <br> <br> <p> Press space to continue</p>'


    },

    level3() {

        console.log("you acchieved level 3")

        this.snake.snakePosition = {

            left: 20,
            top: 20

        }

        this.generateRandomCookiePosition()

        this.stopMovement()

        this.level3Message()

    },

    level3Message() {

        this.message = new Message(this.gameScreen, this.gameSize)

        this.message.messageElement.innerHTML = '<br> <br>  <div> Nhommm... cookies  <div> <br> <br> <p> Press space to continue </p>'

    },

    stopMovement() {

        console.log("movement stopped")

        this.snake.snakeSpeed = {
            left: 0,
            top: 0
        }

    },

}

    // ---------- [LEVEL UP INTERACTIONS] ---------- 
