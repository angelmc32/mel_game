class CanvasElement {
  constructor(imageSource, x, y, height, width) {
    this.image = new Image();
    this.image.src = imageSource;
    this.xPosition = x;
    this.yPosition = y;
    this.height = height;
    this.width = width;
  }

  collisionCheck(elementsArray) {
    let vectorX,
      vectorY,
      halfWidths,
      halfHeights,
      offsetX,
      offsetY,
      collisionDirection = null;

    for (let i = 0; i < elementsArray.length; i++) {
      vectorX =
        this.xPosition +
        this.width / 2 -
        (elementsArray[i].xPosition + elementsArray[i].width / 2);
      vectorY =
        this.yPosition +
        this.height / 2 -
        (elementsArray[i].yPosition + elementsArray[i].height / 2);
      halfWidths = this.width / 2 + elementsArray[i].width / 2;
      halfHeights = this.height / 2 + elementsArray[i].height / 2;

      if (Math.abs(vectorX) < halfWidths && Math.abs(vectorY) < halfHeights) {
        offsetX = halfWidths - Math.abs(vectorX);
        offsetY = halfHeights - Math.abs(vectorY);

        if (offsetX >= offsetY) {
          if (vectorY > 0) {
            collisionDirection = "top";
            this.yPosition += offsetY;
            return collisionDirection;
          } else {
            collisionDirection = "bottom";
            this.yPosition -= offsetY;
            this.yVelocity = 0;
            return collisionDirection;
          }
        } else {
          if (vectorX > 0) {
            collisionDirection = "left";
            this.xPosition += offsetX;
            return collisionDirection;
          } else {
            collisionDirection = "right";
            this.xPosition -= offsetX;
            return collisionDirection;
          }
        }
      }
    }
    return collisionDirection;
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
    this.groundState = false;
  }

  move(keys, gravity, friction, canvasHeight, canvasWidth, collisionDirection) {
    // Check if left arrow is pressed
    if (keys[37]) {
      if (this.xVelocity > -this.speed) {
        this.xVelocity--;
      }
    }
    // Check if right arrow is pressed
    if (keys[39]) {
      if (this.xVelocity < this.speed) {
        this.xVelocity++;
      }
    }
    // Check if up arrow is pressed
    if (keys[38]) {
      if (!this.jumpState) {
        this.jumpState = true;
        this.groundState = false;
        this.yVelocity = -this.speed * 2;
      }
    }
    if (this.groundState) {
      this.yVelocity = 0;
    }

    this.xPosition += this.xVelocity;
    this.yPosition += this.yVelocity;
    this.yVelocity += gravity;
    this.xVelocity *= friction;

    if (collisionDirection === "left" || collisionDirection === "right") {
      this.xVelocity = 0;
      this.jumpState = false;
      console.log("limite");
    } else if (collisionDirection === "bottom") {
      console.log("pisaste");
      this.groundState = true;
      this.jumpState = false;
      this.yVelocity = -10;
    } else if (collisionDirection === "top") {
      this.yVelocity *= -1;
    }

    /*
    if (this.xPosition >= canvasWidth - this.width) {
      this.xPosition = canvasWidth - this.width;
    } else if (this.xPosition <= -10) {
      this.xPosition = -10;
    }

    if (this.yPosition >= canvasHeight - this.height - 75) {
      this.yPosition = canvasHeight - this.height - 73;
      this.jumpState = false;
    }
    */
  }
}

class Hero extends Character {
  constructor(name, imageSource, x, y, height, width, xVel, yVel, speed) {
    super(name, imageSource, x, y, height, width, xVel, yVel, speed);
    this.attacks = [];
  }
  // Attack function, fires ball
  attack() {
    let attack = new Attack(
      "./images/32ball.png",
      this.xPosition + 80,
      this.yPosition + 64,
      32,
      32,
      10
    );
    this.attacks.push(attack);
  }

  removeAttacks() {
    let filtered = this.attacks.filter(function(element, index, array) {
      return element.xPosition < 1024;
    });
    this.attacks = filtered;
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
    super(name, imageSource, x, y, xSpeed, ySpeed);
  }
}
