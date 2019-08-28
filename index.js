const canvas = new Canvas("canvas");
const pressedKeys = [];
const gorduki = new Hero(
  "Gorduki",
  "./images/128gorduki_1.png",
  50,
  480,
  128,
  128,
  0,
  0,
  10
);
const enem1 = new Enemy("gremlin", "./images/64enemy_1.png", 900, 480, 20, 10);
const enemies = [];
const interactiveElements = [];
const floor = new CanvasElement("./images/floor.png", 0, 604, 74, 1024);
const edges = new CanvasElement("./images/floor.png", 0, 0, 10, 680);
interactiveElements.push(floor);
interactiveElements.push(edges);

enemies.push(enem1);

window.onload = function() {
  document.body.addEventListener("keydown", function(event) {
    pressedKeys[event.keyCode] = true;
  });

  document.body.addEventListener("keyup", function(event) {
    pressedKeys[event.keyCode] = false;
  });

  document.onkeydown = function(event) {
    if (event.keyCode === 32) gorduki.attack();
  };

  window.requestAnimationFrame(updateCanvas);
};

function updateCanvas() {
  canvas.clearCanvas();
  canvas.paintBackground(floor);
  canvas.paintElements(gorduki, enemies);
  canvas.paintAttacks(gorduki.attacks);
  canvas.updateElements(
    gorduki,
    pressedKeys,
    interactiveElements,
    gorduki.attacks
  );
  window.requestAnimationFrame(updateCanvas);
}
