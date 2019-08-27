class CanvasElement {
  constructor(imageSource, x, y, height, width) {
    this.image = new Image();
    this.image.src = imageSource;
    this.xPosition = x;
    this.yPosition = y;
    this.height = height;
    this.width = width;
  }
}

class Character extends CanvasElement {
  constructor(name, imageSource, x, y, height, width, xSpeed, ySpeed) {
    super(imageSource, x, y, height, width);
    this.name = name;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.jumpStat = 128;
  }

  move(direction) {
    switch (direction) {
      case 37:
        this.xPosition -= this.xSpeed; break;
      case 39:
        this.xPosition += this.xSpeed; break;
    }
  }

  jump(interactiveElements, gravity) {
    if ( this.isOnPlatform(interactiveElements, gravity) ) {
      this.yPosition -= this.ySpeed;
    }
  }

  isOnPlatform(interactiveElements, gravity) {
    for ( let i = 0 ; i < interactiveElements.length ; i++ ) {
      if ( this.yPosition + this.height >= interactiveElements[i].yPosition ) return true;
      else {
        this.yPosition += gravity;
        console.log("not on platform");
        return false;
      }
    }
  }
}

class Hero extends Character  {
  constructor(name, imageSource, x, y, height, width, xSpeed, ySpeed) {
    super(name, imageSource, x, y, height, width, xSpeed, ySpeed);
    this.attacks = [];
  }

  attack() {
    let attack = new Attack("./images/32ball.png", this.xPosition+128, this.yPosition+48, 32, 32, 10);
    this.attacks.push(attack);
  }
}

class Attack extends CanvasElement {
  constructor(imageSource, x, y, height, width, xSpeed) {
    super(imageSource, x, y, height, width, xSpeed);
    this.xSpeed = xSpeed;
  }
}

class Enemy extends Character {
  constructor(name, imageSource, x, y, xSpeed, ySpeed) {
    super(name, imageSource, x, y, xSpeed, ySpeed );
  }
}