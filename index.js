const canvas = new Canvas("canvas");
const pressedKeys = [];
const gorduki = new Hero ("Gorduki", "./images/128gorduki_1.png", 50, 480, 128, 128, 0, 0, 10);
const enem1 = new Enemy("gremlin", "./images/64enemy_1.png", 900, 480, 20, 10);
const enemies = [];
const interactiveElements = [];
const floor = new CanvasElement("./images/floor.png", 0, 604, 75, 700);
interactiveElements.push(floor);

enemies.push(enem1);

window.onload = function() {
  
  document.body.addEventListener("keydown", function(event) {
    pressedKeys[event.keyCode] = true;
    console.log("key has been pressed");
  });
  
  document.body.addEventListener("keyup", function(event) {
    pressedKeys[event.keyCode] = false;
  });

  window.requestAnimationFrame(updateCanvas);
}

function updateCanvas() {
  canvas.clearCanvas();
  canvas.paintBackground(floor);
  canvas.paintElements(gorduki, enemies);
  canvas.paintAttacks(gorduki.attacks);
  canvas.updateElements(gorduki, pressedKeys, interactiveElements, gorduki.attacks)
  window.requestAnimationFrame(updateCanvas);
  console.log("updating");
}


/*
document.onkeydown = function(event) {
 let keyCode = event.keyCode;
  if ( keyCode === 37 || keyCode === 39 )
    gorduki.move(keyCode);
  if ( keyCode === 38 )
    gorduki.jump(interactiveElements, canvas.gravity);
  if ( keyCode === 32 )
    gorduki.attack();
}
*/