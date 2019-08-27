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
  constructor(name, imageSource, x, y, height, width, xVel, yVel, speed) {
    super(imageSource, x, y, height, width);
    this.name = name;
    this.xVelocity = xVel;
    this.yVelocity = yVel;
    this.speed = speed;
    this.jumpState = false;
  }

  move(keys, gravity, friction, canvasHeight, canvasWidth) {
    // Check if left arrow is pressed
    if ( keys[37] ) {
      if ( this.xVelocity > -this.speed ) {
        this.xVelocity--;
        console.log("left was pressed");
      }
    }

    // Check if right arrow is pressed
    if ( keys[39] ) {
      if ( this.xVelocity < this.speed ) {
        this.xVelocity++;
        console.log("right was pressed");
      }
    }

    // Check if up arrow is pressed
    if ( keys[38] ) {
      if ( !this.jumpState ) {
        this.jumpState = true;
        this.yVelocity = -this.speed*2;
        console.log("up was pressed");
      }
    }

    this.xPosition += this.xVelocity;
    this.yPosition += this.yVelocity;
    this.yVelocity += gravity;
    this.xVelocity *= friction;

    if ( this.xPosition >= canvasWidth - this.width ) {
      this.xPosition = canvasWidth - this.width;
    } else if ( this.xPosition <= -10 ) {
      this.xPosition = -10;
    }

    if ( this.yPosition >= canvasHeight - this.height - 75 ) {
      this.yPosition = canvasHeight - this.height - 75;
      this.jumpState = false;
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
  constructor(name, imageSource, x, y, height, width, xVel, yVel, speed) {
    super(name, imageSource, x, y, height, width, xVel, yVel, speed);
    this.attacks = [];
  }

  move(keys, gravity, friction, canvasHeight, canvasWidth) {
    // Check if left arrow is pressed
    if ( keys[37] ) {
      if ( this.xVelocity > -this.speed ) {
        this.xVelocity--;
        console.log("left was pressed");
      }
    }

    // Check if right arrow is pressed
    if ( keys[39] ) {
      if ( this.xVelocity < this.speed ) {
        this.xVelocity++;
        console.log("right was pressed");
      }
    }

    // Check if up arrow is pressed
    if ( keys[38] ) {
      if ( !this.jumpState ) {
        this.jumpState = true;
        this.yVelocity = -this.speed*2;
        console.log("up was pressed");
      }
    }

    if ( keys[32] ) {
      this.attack();
    }

    this.xPosition += this.xVelocity;
    this.yPosition += this.yVelocity;
    this.yVelocity += gravity;
    this.xVelocity *= friction;

    if ( this.xPosition >= canvasWidth - this.width ) {
      this.xPosition = canvasWidth - this.width;
    } else if ( this.xPosition <= -10 ) {
      this.xPosition = -10;
    }

    if ( this.yPosition >= canvasHeight - this.height - 75 ) {
      this.yPosition = canvasHeight - this.height - 75;
      this.jumpState = false;
    }
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