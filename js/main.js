class Player {
  constructor() {
    this.width = 10; //no unit here because we wanna manipulate them later
    this.height = 10;
    this.positionX = 50 - this.width / 2;
    this.positionY = 0;

    this.domElm = null; //store a ref. to the dom element of the player

    this.createDomElm(); //call the method here to shorten the code
  }
  createDomElm() {
    // step2: add content or modify (ex. innerHTML...)
    this.domElm = document.createElement("div");
    this.domElm.id = "player";
    this.domElm.style.width = this.width + "vw";
    this.domElm.style.height = this.height + "vh";
    this.domElm.style.bottom = this.positionY + "vh";
    this.domElm.style.left = this.positionX + "vw";

    //step3: append to the dom: `parentElm.appendChild()`
    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.domElm);
  }
  moveLeft() {
    if (this.positionX > 0) {
      this.positionX -= 2;
      //   console.log(`this.positionX ${this.positionX}`);
      this.domElm.style.bottom = this.positionY + "vh";
      this.domElm.style.left = this.positionX + "vw";
    }
  }
  moveRight() {
    const maxPositionX = 100 - this.width;
    if (this.positionX <= maxPositionX) {
      this.positionX += 2;
      //   console.log(`this.positionX ${this.positionX}`);
      this.domElm.style.bottom = this.positionY + "vh";
      this.domElm.style.left = this.positionX + "vw";
    }
  }
  moveUp() {
    const maxPositionY = 100 - this.height;
    if (this.positionY <= maxPositionY) {
      this.positionY += 2;
      //   console.log(`this.positionX ${this.positionX}`);
      this.domElm.style.bottom = this.positionY + "vh";
      this.domElm.style.left = this.positionX + "vw";
    }
  }
  moveDown() {
    if (this.positionY > 0) {
      this.positionY -= 2;
      //   console.log(`this.positionX ${this.positionX}`);
      this.domElm.style.bottom = this.positionY + "vh";
      this.domElm.style.left = this.positionX + "vw";
    }
  }
}

class Obstacle {
  constructor() {
    this.positionX = Math.floor(Math.random() * 100); //creat new obstacle that appear horizontal randomly
    this.positionY = 100;
    this.width = 10;
    this.height = 10;
    this.domElm = null;
    this.createDomElm();
  }
  createDomElm() {
    // step2: add content or modify (ex. innerHTML...)
    this.domElm = document.createElement("div");
    this.domElm.className = "obstacle";
    this.domElm.style.width = this.width + "vw";
    this.domElm.style.height = this.height + "vh";
    this.domElm.style.bottom = this.positionY + "vh";
    this.domElm.style.left = this.positionX + "vw";

    //step3: append to the dom: `parentElm.appendChild()`
    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.domElm);
  }
  moveDown() {
    this.positionY -= 1;
    this.domElm.style.bottom = this.positionY + "vh";

    // console.log(`new position of obstacle.... ${this.positionY}`);
  }
}
const player = new Player();

const obstaclesArr = []; // will store instances of the class Obstacle

// Create new obstacles
setInterval(() => {
  const newObstacle = new Obstacle();
  obstaclesArr.push(newObstacle);
  let scores = obstaclesArr.length;
  const displayElm = document.getElementById("score-display");
  displayElm.innerText = scores;
}, 3000);

//// Update obstacles
setInterval(() => {
  obstaclesArr.forEach((obstacle) => {
    //move obstacles
    obstacle.moveDown();
    //detect collision
    if (
      obstacle.positionX < player.positionX + player.width &&
      obstacle.positionX + obstacle.width > player.positionX &&
      obstacle.positionY < player.positionY + player.height &&
      obstacle.height + obstacle.positionY > player.positionY
    ) {
      console.log("game over my fren");
      location.href = "./gameover.html";
    }
  });
}, 100);

// attach event listeners...
document.addEventListener("keydown", (event) => {
  //   console.log(`user press ${event.code}`);
  if (event.code === "ArrowLeft") {
    player.moveLeft();
  } else if (event.code === "ArrowRight") {
    player.moveRight();
  } else if (event.code === "ArrowUp") {
    player.moveUp();
  } else if (event.code === "ArrowDown") {
    player.moveDown();
  }
});
