class Message {

    constructor(gameScreen, gameSize) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize

        this.messageSize = {
            w: 500,
            h: 250
        }

        this.messagePosition = {
            left: (gameSize.w - this.messageSize.w) / 2,
            top: (gameSize.h - this.messageSize.h) / 2
        }

        this.init()

    }

    init() {

        this.messageElement = document.createElement('div')

        this.messageElement.style.position = "absolute"
        this.messageElement.style.width = `${this.messageSize.w}px`
        this.messageElement.style.height = `${this.messageSize.h}px`
        this.messageElement.style.left = `${this.messagePosition.left}px`
        this.messageElement.style.top = `${this.messagePosition.top}px`
        this.messageElement.style.backgroundColor = "darkgray"
        this.messageElement.style.border = "15px solid red"
        this.messageElement.style.borderColor = "grey"

        this.messageElement.style.color = "white"
        this.messageElement.style.fontSize = "24px";
        this.messageElement.style.fontFamily = "Arial";
        this.messageElement.style.textAlign = "center";
        this.messageElement.style.padding = "25px";
        //this.fontFamily = 'ArcadeFont', sans - FileSystemWritableFileStream;

        this.messageElement.innerHTML = `

          <h1> Kind of snake </h1>

          <br>

          <h3> Inspired on original Snake game (almost) </h3>

         <br> <br>

         <h2> Developed by 
         
         <br> <br>
         
         Irene Buz and Isabella Paiva </h2>

           <br> <br>

          <p> Press space to continue</p>`


        this.gameScreen.appendChild(this.messageElement)

    }

}