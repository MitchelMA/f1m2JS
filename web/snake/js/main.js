// set col|row size and col|row item size
const gameSize = 25;
const rectSize = 20;

// colour-palette
let background_colour = "#333";

// get the canvas and context
const canvas = document.getElementById("snek");
const uiElem = document.getElementById("ui");
const ctx = canvas.getContext("2d");

// get ui elements
var fpsElem;
var scoreElem;
var highScoreElem;

// the snake;
const mySnek = new Snek("blue");

// fruitlist
var myFruit = new Fruit(
  Math.floor(Math.random() * gameSize),
  Math.floor(Math.random() * gameSize)
);

var lastInput = "right";

// the setup
function setup() {
  // set the corresponding width and height of the canvas and ui
  canvas.width = rectSize * gameSize;
  canvas.height = rectSize * gameSize;
  uiElem.style.width = `${canvas.width}px`;
  uiElem.style.height = `${canvas.height}px`;

  // create fps element
  fpsElem = document.createElement("p");
  fpsElem.style.cssText = `
    position: absolute;
    top: 5px;
    right: 5px;
    margin: 0;
    display: inline;
    color: whitesmoke;
    `;
  uiElem.appendChild(fpsElem);

  // create score elem
  scoreElem = document.createElement("p");
  scoreElem.style.cssText = `
    position: absolute;
    top: 5px;
    left: 5px;
    margin: 0;
    display: inline;
    color: whitesmoke;
    `;
  uiElem.appendChild(scoreElem);

  // create highScore elem
  highScoreElem = document.createElement("p");
  highScoreElem.style.cssText = `
    position: absolute;
    top: 25px;
    left: 5px;
    margin: 0;
    display: inline;
    color: whitesmoke;
`;
  uiElem.appendChild(highScoreElem);

  // set the background of the canvas;
  ctx.fillStyle = background_colour;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 1; i++) {
    mySnek.addBodyPart();
  }
  // call the draw function
  draw();
}

// posibble deltaT;
let curT = performance.now(),
  oldT = 0,
  deltaT,
  fps;
function draw() {
  ctx.fillStyle = background_colour;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // get delta and fps
  if (oldT != 0) {
    deltaT = curT - oldT;
    fps = 1000 / deltaT;
  }
  oldT = curT;

  // display fps to player
  fpsElem.textContent = Number(fps).toFixed(0);

  // display score to player
  scoreElem.textContent = `Score: ${mySnek.score}`;

  // display the highScore to player;
  highScoreElem.textContent = `High score: ${mySnek.highScore}`;

  // display game itself

  // display grid
  function createRect(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x * rectSize, y * rectSize);
    ctx.lineTo(x * rectSize + size, y * rectSize);
    ctx.lineTo(x * rectSize + size, y * rectSize + size);
    ctx.lineTo(x * rectSize, y * rectSize + size);
    ctx.lineTo(x * rectSize, y * rectSize);
    ctx.fill();
  }
  let Fill = false;
  for (let x = 0; x < gameSize; x++) {
    for (let y = 0; y < gameSize; y++) {
      // check for odd, when odd, create rectangle for a grid effect
      if (Fill) {
        ctx.fillStyle = "#222";
        createRect(x, y, rectSize);
        Fill = false;
      } else {
        Fill = true;
      }
    }
  }

  // set the movement of the snake to the last input (fps-bound this way)
  if (lastInput === "right" && mySnek.illegal !== "right") {
    mySnek.direction = "right";
    mySnek.illegal = "left";
  } else if (lastInput === "down" && mySnek.illegal !== "down") {
    mySnek.direction = "down";
    mySnek.illegal = "up";
  } else if (lastInput === "left" && mySnek.illegal !== "left") {
    mySnek.direction = "left";
    mySnek.illegal = "right";
  } else if (lastInput === "up" && mySnek.illegal !== "up") {
    mySnek.direction = "up";
    mySnek.illegal = "down";
  }

  mySnek.move();
  myFruit.show();
  mySnek.show();

  // show fruits and check if they intersect with the snek
  if (myFruit.checkFor(mySnek)) {
    myFruit = new Fruit(
      Math.floor(Math.random() * gameSize),
      Math.floor(Math.random() * gameSize)
    );
    mySnek.addBodyPart();
    mySnek.score++;
    mySnek.highScore = Math.max(mySnek.score, mySnek.highScore);
  }

  //let this function repeat itself every 0.1 seconds (around 10fps)
  curT = performance.now();
  let selfInterval = setTimeout(draw, 100);
}

// movement
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      lastInput = "up";
      break;
    case "ArrowRight":
      lastInput = "right";
      break;
    case "ArrowDown":
      lastInput = "down";
      break;
    case "ArrowLeft":
      lastInput = "left";
      break;
  }
});

setup();
