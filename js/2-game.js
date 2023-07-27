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

    playEatPowerMusic() {
        document.getElementById('eatPower').play();
        console.log("eatPower played")
    },


    playStageClearMusic() {
        document.getElementById('stageClear').play();
        console.log("stageClear played")
    },

    playEnemy() {
        document.getElementById('enemy').play();
        console.log("play enemy")
    },

    // playEnemyBottom() {
    //     document.getElementById('enemyBottom').play();
    //     console.log("play enemy bottom")
    // },

    playGameOverMusic() {
        document.getElementById('gameOver').play();
        console.log("game over played")
    },

    playYouWinMusic() {
        document.getElementById('youWin').play();
        console.log("you win played")
    },


    // ---------- [MUSIC SETUP] ----------


    // ---------- [OBJECTS SETUP] ----------

    counter: 0,

    snake: undefined,

    power: undefined,

    obstacleList: [],

    cookieList: [],

    enemyList: [],

    message: undefined,

    messageDisplayed: true,

    firstMessage: true,

    alertDisplayed: false,

    firstStart: true,

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
        //this.clearAll()
        window.requestAnimationFrame(() => this.gameLoop()) //improving animation and moving performance

        if (this.gamePlay === false) { // breaking loop after game ends [CONFIRM]
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
        this.checkObstacleOverlap()
        this.checkCookieOverlap()
        this.checkPowerOverlap()
        this.checkEnemyOverlap()
        this.checkEnemyCollision()
        this.enemyList.forEach(enemy => { enemy.moveEnemy() })
    },

    // clearAll() {

    // },

    // ---------- [INIT SETUP] ----------

    // ---------- [KEYBOARD SETUP] ----------

    keys: {

        UP: ['KeyW', 'ArrowUp'],
        DOWN: ['KeyS', 'ArrowDown'],
        LEFT: ["KeyA", 'ArrowLeft'],
        RIGHT: ["KeyD", 'ArrowRight'],
        SPACE: "Space",
    },

    setEventListeners() {

        document.onkeydown = (event) => {

            if (!this.messageDisplayed) {

                switch (event.code) {

                    case this.keys.UP[0]:
                    case this.keys.UP[1]:

                        this.snake.moveUp();
                        break;

                    case this.keys.DOWN[0]:
                    case this.keys.DOWN[1]:
                        this.snake.moveDown();
                        break;

                    case this.keys.LEFT[0]:
                    case this.keys.LEFT[1]:
                        this.snake.moveLeft();
                        break;

                    case this.keys.RIGHT[0]:
                    case this.keys.RIGHT[1]:
                        this.snake.moveRight();
                        break;
                }

            } else if (event.code === this.keys.SPACE) {
                console.log("welcome message shows up")
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

        this.playGameOverMusic()

        this.stopSnakeMovement()

        this.stopEnemyMovement()

        this.messageDisplayed = true

        this.message = new Message(this.gameScreen, this.gameSize)

        if (this.counter <= 3) {

            this.message.messageElement.innerHTML = `<br> <br> <br> <div> You did ${this.counter} points. </div> <br> <br> <p> Maybe next time... </p>`

        } else if (this.counter <= 3 && this.counter < 6) {

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

        // after alert is closed >>> clean elements and array  when game restarts

        this.gameScreen.innerHTML = ''

        this.counter = 0

        this.snake = undefined

        this.power = undefined

        this.obstacleList = []

        this.cookieList = []

        this.enemyList = []

        this.init()

        // if (this.snake) {
        //     this.snake.remove();
        // }

    },

    // ---------- [RESET SETUP] ----------

    // ---------- [MESSAGES SETUP] ----------


    removeMessage() {

        if (this.message && this.message.messageElement) {

            this.message.messageElement.remove()
            this.messageDisplayed = false

            if (this.firstMessage) {
                this.instructionsMessage()
                this.firstMessage = false // avoids that instructions message is shown repeatedly
            }
        }
    },


    // ---------- [MESSAGES SETUP] ----------

    // ---------------------------- [SETUP] ----------------------------




    // ---------------------------- [INTERACTIONS] ----------------------------


    // ---------- [COLLISION INTERACTIONS] ---------- 

    checkBorderCollision() {
        if (
            this.snake.snakePosition.top > this.gameSize.h - this.snake.snakeSize.h ||
            this.snake.snakePosition.top < 0 ||
            this.snake.snakePosition.left >= this.gameSize.w - this.snake.snakeSize.w ||
            this.snake.snakePosition.left < 0
        ) {
            this.gameOverMessage()
            console.log("you died by border collision")
        }
    },

    checkPowerCollision() {

        if (
            this.snake.snakePosition.top + this.snake.snakeSize.h > this.power.powerPosition.top &&
            this.snake.snakePosition.top < this.power.powerPosition.top + this.power.powerSize.h &&
            this.snake.snakePosition.left + this.snake.snakeSize.w > this.power.powerPosition.left &&
            this.snake.snakePosition.left < this.power.powerPosition.left + this.power.powerSize.w
        ) {

            this.playEatPowerMusic()

            this.generateRandomPowerPosition()
            this.increaseCounter()
            this.increaseLevel()

            console.log("you eat a power")

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
                    console.log("you died by obstacle collision")

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

                    console.log("you eat a cookie")

                }

            })

        }

    },

    checkEnemyCollision() {

        if (this.enemyList) {

            this.enemyList.forEach(eachEnemy => {

                if (
                    this.snake.snakePosition.top + this.snake.snakeSize.h > eachEnemy.enemyPosition.top &&
                    this.snake.snakePosition.top < eachEnemy.enemyPosition.top + eachEnemy.enemySize.h &&
                    this.snake.snakePosition.left + this.snake.snakeSize.w > eachEnemy.enemyPosition.left &&
                    this.snake.snakePosition.left < eachEnemy.enemyPosition.left + eachEnemy.enemySize.w
                ) {

                    this.gameOverMessage()
                    console.log("you died by enemy collision")

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
                        top < this.snake.snakePosition.top + this.snake.snakeSize.h ||
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

                //checks for power versus snake
                || (top + h > this.snake.snakePosition.top &&
                    top < this.snake.snakePosition.top + this.snake.snakeSize.h &&
                    left + w > this.snake.snakePosition.left &&
                    left < this.snake.snakePosition.left + this.snake.snakeSize.w)
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

    checkEnemyOverlap(left, top, w, h) {

        if (this.enemyList) {

            let isColliding = false;

            this.enemyList.forEach(eachEnemy => {

                if (

                    //checks for enemy versus enemy

                    (top + h > eachEnemy.enemyPosition.top &&
                        top < eachEnemy.enemyPosition.top + eachEnemy.enemySize.h &&
                        left + w > eachEnemy.enemyPosition.left &&
                        left < eachEnemy.enemyPosition.left + eachEnemy.enemySize.w)

                    //checks for enemy versus snake 

                    || (top + h > this.snake.snakePosition.top &&
                        top < this.snake.snakePosition.top + this.snake.snakeSize.h &&
                        left + w > this.snake.snakePosition.left &&
                        left < this.snake.snakePosition.left + this.snake.snakeSize.h.w)

                    //checks for enemy versus power up

                    || (top + h > this.power.powerPosition.top &&
                        top < this.power.powerPosition.top + this.power.powerSize.h &&
                        left + w > this.power.powerPosition.left &&
                        left < this.power.powerPosition.left + this.power.powerSize.w)

                ) {

                    isColliding = true;

                }

            })

            //checks for enemy versus cookie

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

            //checks for enemy versus obstacle

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


    // ---------- [OVERLAP INTERACTIONS] ----------


    // ---------- [LEVEL 1 INTERACTIONS] ---------- 


    generateRandomPowerPosition() {

        // clear the previous power, if it exists

        if (this.power && this.power.powerElement) {
            this.power.powerElement.remove();
        }

        let power = new Power(this.gameScreen, this.gameSize);

        // seems redundant but it works - future review 

        const maxLeft = this.gameSize.w - power.powerSize.w;
        const maxTop = this.gameSize.h - power.powerSize.h;

        power.powerPosition.left = Math.floor(Math.random() * maxLeft);
        power.powerPosition.top = Math.floor(Math.random() * maxTop);

        const isColliding = this.checkPowerOverlap(power.powerPosition.left, power.powerPosition.top, power.powerSize.w, power.powerSize.h);
        console.log({ isColliding });

        if (isColliding) {

            power.powerElement.remove()

            // seems redundant but it works - future review 

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

        for (let i = 0; i < 15; i++) {

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

    // ---------- [LEVEL 4 INTERACTIONS] ----------

    generateRandomEnemyPosition() {

        console.log("enemy show up")

        this.enemyList = [];

        for (let i = 0; i < 6; i++) {

            let enemy = new Enemy(this.gameScreen, this.gameSize);

            const isColiding = this.checkEnemyOverlap(enemy.enemyPosition.left, enemy.enemyPosition.top, enemy.enemySize.w, enemy.enemySize.h)
            console.log({ isColiding })

            if (isColiding) {

                enemy.enemyElement.remove()
                i--

            } else {

                this.enemyList.push(enemy);
                console.log("enemy added to the list")
            }
        }

    },

    // ---------- [LEVEL 4 INTERACTIONS] ---------- 

    // ---------- [LEVEL UP INTERACTIONS] ----------

    instructionsMessage() {

        console.log("instruction message shows up")

        this.firstMessage = false

        this.messageDisplayed = true

        this.message = new Message(this.gameScreen, this.gameSize)

        this.message.messageElement.innerHTML = '<br> <br>  <h2> Move the snake with arrows <br> <br> <br> Eat the yellow thing <br> <br> <br> Survive </h2> <br> <br> <p> Press space to continue </p>'

    },

    increaseCounter() {

        this.counter += 1

        console.log(this.counter)

    },

    increaseLevel() {

        if (this.counter === 3) {

            this.level2()

        } else if (this.counter === 6) {

            this.level3()

        } else if (this.counter === 9) {

            this.level4()

        } else if (this.counter === 18) {

            this.youWin()
        }

    },

    level2() {

        console.log("you acchieved level 2")

        this.generateRandomObstaclePosition()

        this.stopSnakeMovement()

        this.level2Message()

    },

    level2Message() {

        this.message = new Message(this.gameScreen, this.gameSize)

        this.message.messageElement.innerHTML = '<br> <br> <div> Too easy, right? <div> <br> <br> <p> Press space to continue</p>'

        this.playStageClearMusic()

        this.messageDisplayed = true

    },

    level3() {

        console.log("you acchieved level 3")

        this.generateRandomCookiePosition()

        this.stopSnakeMovement()

        this.level3Message()

    },

    level3Message() {

        this.message = new Message(this.gameScreen, this.gameSize)

        this.message.messageElement.innerHTML = '<br> <br>  <div> Nhommm... cookies  <div> <br> <br> <p> Press space to continue </p>'

        this.playStageClearMusic()

        this.messageDisplayed = true

    },

    level4() {

        console.log("you acchieved level 4")

        this.generateRandomEnemyPosition()

        this.stopSnakeMovement()

        this.level4Message()

    },

    level4Message() {

        this.message = new Message(this.gameScreen, this.gameSize)

        this.message.messageElement.innerHTML = '<br> <br>  <div> Let the games beggin... </div> <br> <br> <p> Press space to continue </p>'

        this.playStageClearMusic()

        this.messageDisplayed = true

    },

    youWin() {

        console.log("you win")

        this.stopSnakeMovement()

        this.youWinMessage()

    },

    youWinMessage() {

        this.message = new Message(this.gameScreen, this.gameSize)

        this.message.messageElement.innerHTML = '<br> <br>  <div> YOU WIN! </div> <br> <br> <p> Next levels under development </p>'

        this.playYouWinMusic()

        this.messageDisplayed = true

    },




    stopSnakeMovement() {

        console.log("snake movement stopped")

        this.snake.snakeSpeed = {
            left: 0,
            top: 0
        }

    },

    stopEnemyMovement() {

        console.log("enemy movement stopped")

        this.enemyList.enemySpeed = {
            left: 0,
            top: 0
        }

    },

}

    // ---------- [LEVEL UP INTERACTIONS] ---------- 