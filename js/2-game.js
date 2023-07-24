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

    snake: undefined,

    power: undefined,

    obstacle: [],

    cookie: [],

    counter: 0,


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
        this.gameLoop()
    },

    createElement() {
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
        //this.generateRandomObstaclePosition()
    },

    clearAll() {

    },

    // ---------- [INIT SETUP] ----------

    // ---------- [KEYBOARD SETUP] ----------

    keys: { UP: 'KeyW', DOWN: 'KeyS', LEFT: "KeyA", RIGHT: "KeyD" },

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

    // ---------- [KEYBOARD SETUP] ----------

    // ---------------------------- [SETUP] ----------------------------




    // ---------------------------- [INTERACTIONS] ----------------------------


    // ---------- [GAME OVER INTERACTIONS] ----------


    gameOver() {
        //console.log("game over")
        alert('GAME OVER')
        this.resetGame()
    },

    resetGame() {

        this.counter = 0

        this.snake = new Snake(this.gameScreen, this.gameSize);
        this.power = new Power(this.gameScreen, this.gameSize);
        this.obstacle = [];
        this.cookie = []

        this.gameScreen.innerHTML = '';

        this.init()

        console.log(this.counter)

    },

    // ---------- [GAME OVER INTERACTIONS] ----------


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

        if (this.obstacle) {

            this.obstacle.forEach(eachObstacle => {

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

        if (this.cookie) {

            this.cookie.forEach((eachCookie, index) => {

                if (
                    this.snake.snakePosition.top + this.snake.snakeSize.h > eachCookie.cookiePosition.top &&
                    this.snake.snakePosition.top < eachCookie.cookiePosition.top + eachCookie.cookieSize.h &&
                    this.snake.snakePosition.left + this.snake.snakeSize.w > eachCookie.cookiePosition.left &&
                    this.snake.snakePosition.left < eachCookie.cookiePosition.left + eachCookie.cookieSize.w
                ) {

                    //console.log("you eat a cookie")

                    this.cookie.splice(index, 1);
                    eachCookie.cookieElement.remove()

                    this.snake.getBigger()

                }

            })

        }

    },

    // ---------- [COLLISION INTERACTIONS] ----------


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

    // ---------- [LEVEL UP INTERACTIONS] ----------

    increaseLevel() {

        if (this.counter === 3) {  // UPDATE TO 5 ON FINAL VERSION

            console.log("you acchieved level 2")

            this.obstacle = new Obstacle(this.gameScreen, this.gameSize)

            this.generateRandomObstaclePosition()

        } else if (this.counter === 6) {

            console.log("you acchieved level 3")

            this.generateRandomCookiePosition()

        }

    },

    // ---------- [LEVEL UP INTERACTIONS] ---------- 

    // ---------- [LEVEL 2 INTERACTIONS] ---------- 

    generateRandomObstaclePosition() {

        this.obstacle = [];

        for (let i = 0; i < 10; i++) {

            let obstacle = new Obstacle(this.gameScreen, this.gameSize);

            this.obstacle.push(obstacle);
            this.checkObstacleOverlap()
        }
    },


    checkObstacleOverlap() {

        if (this.obstacle) {

            this.obstacle.filter((eachObstacle) => {

                if (
                    this.snake.snakePosition.top + this.snake.snakeSize.h > eachObstacle.obstaclePosition.top &&
                    this.snake.snakePosition.top < eachObstacle.obstaclePosition.top + eachObstacle.obstacleSize.h &&
                    this.snake.snakePosition.left + this.snake.snakeSize.w > eachObstacle.obstaclePosition.left &&
                    this.snake.snakePosition.left < eachObstacle.obstaclePosition.left + eachObstacle.obstacleSize.w

                ) {

                    console.log("true");
                    this.obstacle.splice(obstacle);
                }
            });
        }
    },



    generateRandomCookiePosition() {

        for (let i = 0; i < 10; i++) {

            const cookies = new Cookie(this.gameScreen, this.gameSize);

            this.cookie.push(cookies);

        }

    }

}

// ---------- [LEVEL 2 INTERACTIONS] ---------- 