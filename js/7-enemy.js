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
            left: 5,
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
        this.enemyElement.style.backgroundColor = "orange"

        this.gameScreen.appendChild(this.enemyElement)

    }



}
