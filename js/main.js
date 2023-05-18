class Player {
  constructor() {
    this.positionX = 40;
    this.positionY = 0;
    this.width = 20; //no unit here because we wanna manipulate them later
    this.height = 20;
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
      this.positionX -= 5;
      console.log(`this.positionX ${this.positionX}`);
      this.domElm.style.bottom = this.positionY + "vh";
      this.domElm.style.left = this.positionX + "vw";
    }
  }
  moveRight() {
    if (this.positionX <= 80) {
      this.positionX += 5;
      console.log(`this.positionX ${this.positionX}`);
      this.domElm.style.bottom = this.positionY + "vh";
      this.domElm.style.left = this.positionX + "vw";
    }
  }
}

const player = new Player();

// attach event listeners...
document.addEventListener("keydown", (event) => {
  console.log(`user press ${event.code}`);
  if (event.code === "ArrowLeft") {
    player.moveLeft();
  } else {
    player.moveRight();
  }
});
