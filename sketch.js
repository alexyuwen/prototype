/*



GLOBAL VARIABLES



*/

let canvas;
let mover;
let mover2;
const G = 1.0;
let gravity, gravities;
let surfaceY = 0;
const framesPerSecond = 60;

const waitSeconds = [4, 12];
let waitForFrames;
let isBallMoving = true;
let randomBit;
let framesSinceRest;

let yStart;
let audio;

let started = false;

/*



MAIN FUNCTIONS



*/

function preload() {
  audio = loadSound("/media/audio.wav");
}

function setup() {
  frameRate(framesPerSecond);

  canvas = createCanvas(windowWidth, windowHeight);

  yStart = (0.8 / 5) * windowHeight;

  mover = new Mover(2 * (windowWidth / 5), yStart);
  mover2 = new Mover(3 * (windowWidth / 5), yStart);
  gravities = [createVector(0, G), createVector(0, G * 1.3)];
  gravity = gravities[0];

  surfaceY = (4 / 5) * windowHeight;

  getAudioContext().suspend();
  audio.loop();
}

function draw() {
  background(0);

  if (started) {
    draw_after_started();
  } else {
    draw_before_started();
  }

  console.log(getAudioContext().state);
}

function mousePressed() {
  userStartAudio();
  started = true;
}

/*



HELPER FUNCTIONS



*/

function draw_before_started() {
  textSize(32);
  fill(255);
  text("click to start", 50, windowHeight / 2);
}

function draw_after_started() {
  mover.applyForce(gravity);
  mover.show();
  mover.update();

  mover2.applyForce(gravity);
  mover2.show();
  mover2.update();

  if (mover.position.y + 25 >= surfaceY && mover2.position.y + 25 >= surfaceY) {
    if (isBallMoving) {
      randomBit = Math.round(Math.random());
      waitForFrames = framesPerSecond * waitSeconds[randomBit];

      randomBit = Math.round(Math.random());
      gravity = gravities[randomBit];

      isBallMoving = false;
    }

    framesSinceRest++;
  } else {
    framesSinceRest = 0;
  }

  if (framesSinceRest > waitForFrames) {
    let randomOffset1 = 8 * (Math.random() * 2 - 1);
    let randomOffset2 = 8 * (Math.random() * 2 - 1);
    mover.position = createVector(2 * (windowWidth / 5), yStart + randomOffset1);
    mover2.position = createVector(3 * (windowWidth / 5), yStart + randomOffset2);

    framesSinceRest = 0;
    isBallMoving = true;
  }
}