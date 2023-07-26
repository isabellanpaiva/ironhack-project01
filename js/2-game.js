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

    // ---------- [MUSIC SETUP] ----------

    // playBackgroundMusic() {
    //     document.getElementById('backgroundMusic').play();
    // },

    stopBackgroundMusic() {
        document.getElementById('backgroundMusic').stop();
    },


    playStageClearMusic() {
        document.getElementById('stageClear').play();
        console.log("stageClear played")
    },

    stopStageClearMusic() {

        setTimeout(() => {
            document.getElementById('stageClear').pause()
            document.getElementById('stageClear').currentTime = 0
        }, 7000);

        console.log("stageClear stoped")

    },

    playGameOverMusic() {
        document.getElementById('gameOver').play();
        console.log("game over played")
    },

    stopGameOverMusic() {

        setTimeout(() => {
            document.getElementById('gameOver').pause()
            document.getElementById('gameOver').currentTime = 0
        }, 7000);

        console.log("game over stoped")

    },


    // ---------- [MUSIC SETUP] ----------


    // ---------- [OBJECTS SETUP] ----------

    counter: 0,

    firstStart: true,

    snake: undefined,

    power: undefined,

    obstacleList: [],

    cookieList: [],

    message: undefined,

    messageDisplayed: true,

    alertDisplayed: false,

    gamePlay: true,


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
        this.snake = new Snake(this.gameScreen, this.gameSize)
        this.power = new Power(this.gameScreen, this.gameSize)
        this.message = new Message(this.gameScreen, this.gameSize)
        this.messageDisplayed = true
    },

    gameLoop() {

        this.drawAll()
        this.clearAll()
        window.requestAnimationFrame(() => this.gameLoop())

        if (this.gamePlay === false) {
            return
        }
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

        document.onkeydown = (event) => {

            if (!this.messageDisplayed) {

                switch (event.code) {
                    case this.keys.UP:
                        this.snake.moveUp();
                        break;
                    case this.keys.DOWN:
                        this.snake.moveDown();
                        break;
                    case this.keys.LEFT:
                        this.snake.moveLeft();
                        break;
                    case this.keys.RIGHT:
                        this.snake.moveRight();
                        break;
                }

            } else if (event.code === this.keys.SPACE) {
                this.removeMessage();
            }
        };

    },

    // ---------- [KEYBOARD SETUP] ----------

    // ---------- [GAME OVER SETUP] ----------

    // ---------- [GAME OVER SETUP] ----------

    gameOverMessage() {

        if (this.messageDisplayed) {
            return;
        }

        this.messageDisplayed = true,

            this.playGameOverMusic()

        this.stopGameOverMusic()

        this.stopMovement()

        this.message = new Message(this.gameScreen, this.gameSize)

        if (this.counter <= 2) {

            this.message.messageElement.innerHTML = `<br> <br> <br> <div> You did ${this.counter} points. </div> <br> <br> <p> Maybe next time... </p>`

        } else if (this.counter <= 3 && this.counter < 10) {

            this.message.messageElement.innerHTML = `<br> <br> <br> <div> You did ${this.counter} points. </div> <br> <br> <p> You can do better </p>`

        } else {

            this.message.messageElement.innerHTML = `<br> <br> <br> <div> You did ${this.counter} points. </div> <br> <br> <p> Not too bad :) </p>`

        }

        setTimeout(() => {
            this.resetGame()
        }, 1000);

    },

    // gameOver() {

    //     gamePlay = false

    // },

    // ---------- [RESET SETUP] ----------

    resetGame() {

        if (this.alertDisplayed) {
            return;
        }

        alert('RETRY');

        this.counter = 0

        this.gameScreen.innerHTML = '';

        this.init()

    },

    // ---------- [RESET SETUP] ----------

    // ---------- [MESSAGES SETUP] ----------


    removeMessage() {

        this.message.messageElement.remove()

        this.messageDisplayed = false
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
            this.gameOverMessage()
        }

        if (
            this.snake.snakePosition.left >= this.gameSize.w - this.snake.snakeSize.w ||
            this.snake.snakePosition.left < 0
        ) {
            //console.log("you reached left border")
            this.gameOverMessage()
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

                    this.gameOverMessage()

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

                    //checks for obstacle versus snake 

                    || (top + h > this.snake.snakePosition.top &&
                        top < this.snake.snakePosition.top + this.snake.snakeSize.h &&
                        left + w > this.snake.snakePosition.left &&
                        left < this.snake.snakePosition.left + this.snake.snakeSize.h.w)

                    //checks for obstacle versus power up

                    || (top + h > this.power.powerPosition.top &&
                        top < this.power.powerPosition.top + this.power.powerSize.h &&
                        left + w > this.power.powerPosition.left &&
                        left < this.power.powerPosition.left + this.power.powerSize.w)

                ) {

                    isColliding = true;

                }

            })

            //checks for obstacle versus cookie

            this.cookieList.forEach(eachCookie => {
                if (
                    (top + h > eachCookie.cookiePosition.top &&
                        top < eachCookie.cookiePosition.top + eachCookie.cookieSize.h &&
                        left + w > eachCookie.cookiePosition.left &&
                        left < eachCookie.cookiePosition.left + eachCookie.cookieSize.w)
                ) {
                    isColliding = true;
                }
            });


            return isColliding

        }
    },


    checkCookieOverlap(left, top, w, h) {

        if (this.cookieList) {

            let isColliding = false;

            this.cookieList.forEach(eachCookie => {

                if (

                    //checks for cookie versus cookie

                    (top + h > eachCookie.cookiePosition.top &&
                        top < eachCookie.cookiePosition.top + eachCookie.cookieSize.h &&
                        left + w > eachCookie.cookiePosition.left &&
                        left < eachCookie.cookiePosition.left + eachCookie.cookieSize.w)

                    //checks for cookie versus snake 

                    || (top + h > this.snake.snakePosition.top &&
                        top < this.snake.snakePosition.top + this.snake.snakeSize.h &&
                        left + w > this.snake.snakePosition.left &&
                        left < this.snake.snakePosition.left + this.snake.snakeSize.h.w)

                    //checks for cookie versus power up

                    || (top + h > this.power.powerPosition.top &&
                        top < this.power.powerPosition.top + this.power.powerSize.h &&
                        left + w > this.power.powerPosition.left &&
                        left < this.power.powerPosition.left + this.power.powerSize.w)

                ) {

                    isColliding = true;

                }

            })

            //checks for cookie versus obstacle 

            this.obstacleList.forEach(eachObstacle => {

                if (
                    (top + h > eachObstacle.obstaclePosition.top &&
                        top < eachObstacle.obstaclePosition.top + eachObstacle.obstacleSize.h &&
                        left + w > eachObstacle.obstaclePosition.left &&
                        left < eachObstacle.obstaclePosition.left + eachObstacle.obstacleSize.w)
                ) {
                    isColliding = true;
                }
            });


            return isColliding

        }
    },



    checkPowerOverlap(left, top, w, h) {

        if (this.power) {

            const power = this.power

            let isColliding = false;

            if (
                //checks for power versus power
                (top + h > this.power.powerPosition.top &&
                    top < this.power.powerPosition.top + this.power.powerSize.h &&
                    left + w > this.power.powerPosition.left &&
                    left < this.power.powerPosition.left + this.power.powerSize.w)

                // //checks for power versus snake 
                // || (top + h > this.snake.snakePosition.top &&
                //     top < this.snake.snakePosition.top + this.snake.snakeSize.h &&
                //     left + w > this.snake.snakePosition.left &&
                //     left < this.snake.snakePosition.left + this.snake.snakeSize.w)
            ) {
                isColliding = true;
            }


            //checks for power versus obstacle 
            this.obstacleList.forEach(eachObstacle => {
                if (
                    (top + h > eachObstacle.obstaclePosition.top &&
                        top < eachObstacle.obstaclePosition.top + eachObstacle.obstacleSize.h &&
                        left + w > eachObstacle.obstaclePosition.left &&
                        left < eachObstacle.obstaclePosition.left + eachObstacle.obstacleSize.w)
                ) {
                    isColliding = true;
                }
            });

            //checks for power versus cookie 
            this.cookieList.forEach(eachCookie => {
                if (
                    (top + h > eachCookie.cookiePosition.top &&
                        top < eachCookie.cookiePosition.top + eachCookie.cookieSize.h &&
                        left + w > eachCookie.cookiePosition.left &&
                        left < eachCookie.cookiePosition.left + eachCookie.cookieSize.w)
                ) {
                    isColliding = true;
                }
            });

            return isColliding;

        }
    },


    // ---------- [OVERLAP INTERACTIONS] ----------


    // ---------- [LEVEL 1 INTERACTIONS] ---------- 


    increaseCounter() {

        this.counter += 1

        console.log(this.counter)

    },


    generateRandomPowerPosition() {

        // Clear the previous power, if it exists

        if (this.power && this.power.powerElement) {
            this.power.powerElement.remove();
        }

        let power = new Power(this.gameScreen, this.gameSize);

        const maxLeft = this.gameSize.w - power.powerSize.w;
        const maxTop = this.gameSize.h - power.powerSize.h;

        power.powerPosition.left = Math.floor(Math.random() * maxLeft);
        power.powerPosition.top = Math.floor(Math.random() * maxTop);

        const isColliding = this.checkPowerOverlap(power.powerPosition.left, power.powerPosition.top, power.powerSize.w, power.powerSize.h);
        console.log({ isColliding });

        if (isColliding) {

            power.powerElement.remove()

            const maxLeft = this.gameSize.w - power.powerSize.w;
            const maxTop = this.gameSize.h - power.powerSize.h;

            power.powerPosition.left = Math.floor(Math.random() * maxLeft);
            power.powerPosition.top = Math.floor(Math.random() * maxTop);


        } else {
            this.power = power; // Update the power object for the game instance.
            this.updatePowerPosition();
        }
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

        this.cookieList = [];

        for (let i = 0; i < 10; i++) {

            const cookie = new Cookie(this.gameScreen, this.gameSize);

            const isColiding = this.checkCookieOverlap(cookie.cookiePosition.left, cookie.cookiePosition.top, cookie.cookieSize.w, cookie.cookieSize.h)
            console.log({ isColiding })

            if (isColiding) {

                cookie.cookieElement.remove()
                i--

            } else {

                this.cookieList.push(cookie);
            }

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

        this.playStageClearMusic()

        //this.stopStageClearMusic()

        this.messageDisplayed = true

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

        this.playStageClearMusic()

        //this.stopStageClearMusic()

        this.messageDisplayed = true

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
