class Enemy {

    constructor(gameScreen, gameSize) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize

        this.enemySize = {
            w: 50,
            h: 75
        }

        this.enemyPosition = {

            left: Math.floor(Math.random() * (this.gameSize.w - this.enemySize.w)),
            top: Math.floor(Math.random() * (this.gameSize.h - this.enemySize.h))
        }

        this.enemySpeed = {
            left: 0,
            top: 5
        }

        this.init()

    }


    init() {

        this.enemyElement = document.createElement('div')

        this.enemyElement.style.position = "absolute"
        this.enemyElement.style.width = `${this.enemySize.w}px`
        this.enemyElement.style.height = `${this.enemySize.h}px`
        this.enemyElement.style.left = `${this.enemyPosition.left}px`
        this.enemyElement.style.top = `${this.enemyPosition.top}px`
        this.enemyElement.style.backgroundColor = "red"


        this.gameScreen.appendChild(this.enemyElement)

        this.moveEnemy()

    }

    moveEnemy() {

        console.log("enemy is moving")

        this.enemyPosition.left += this.enemySpeed.left
        this.enemyPosition.top += this.enemySpeed.top

        if (this.enemyPosition.top >= this.gameSize.h - this.enemySize.h || this.enemyPosition.top < 0) {

            Game.playEnemyTop()
            this.enemySpeed.top *= -1;

        }

        if (this.enemyPosition.left >= this.gameSize.w - this.enemySize.w || this.enemyPosition.left < 0) {

            Game.playEnemyBottom()
            this.enemySpeed.left *= -1;
        }

        this.updateEnemyMove()

    }

    updateEnemyMove() {
        this.enemyElement.style.left = `${this.enemyPosition.left}px`
        this.enemyElement.style.top = `${this.enemyPosition.top}px`
        console.log("enemy position is updated")
    }



}
