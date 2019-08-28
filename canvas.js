class Canvas {
  constructor(canvasId) {
    this.context = document.getElementById(canvasId).getContext("2d");
    this.width = 1024;
    this.height = 680;
    this.gravity = 0.9;
    this.friction = 0.875;
  }

  clearCanvas() {
    this.context.clearRect(0, 0, 1024, 680);
  }

  paintBackground(floor) {
    this.context.fillStyle = "green";
    this.context.fillRect(0, 0, 1024, 680);
    this.context.drawImage(floor.image, floor.xPosition, floor.yPosition);
    this.context.drawImage(floor.image, floor.xPosition + 700, floor.yPosition);
  }

  paintElements(character, enemiesArray) {
    this.context.drawImage(
      character.image,
      character.xPosition,
      character.yPosition
    );
    enemiesArray.forEach(element => {
      this.context.drawImage(
        element.image,
        element.xPosition,
        element.yPosition,
        128,
        128
      );
    });
  }

  paintAttacks(array) {
    array.forEach(element => {
      this.context.drawImage(
        element.image,
        element.xPosition,
        element.yPosition
      );
    });
  }

  updateElements(
    gorduki,
    keys,
    interactiveElements,
    attacksArray /*enemiesArray*/
  ) {
    let collisionDirection = gorduki.collisionCheck(interactiveElements);

    gorduki.move(
      keys,
      this.gravity,
      this.friction,
      this.height,
      this.width,
      collisionDirection
    );

    attacksArray.forEach(element => {
      element.xPosition += element.xSpeed;
    });

    gorduki.removeAttacks();

    /*
    attacksArray = attacksArray.filter(element => {
      element.xPosition < 1024;
    });*/

    /*enemiesArray.forEach(element => {
      element.xPosition += element.speed;
    } )*/
  }
}
