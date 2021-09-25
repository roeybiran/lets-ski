/* eslint-disable no-undef, no-use-before-define, no-extend-native */
// by Roey Biran (https://github.com/roeybiran)
// dataset from: https://www.kaggle.com/beaubellamy/ski-resorts

"use strict";

let CANVAS_W;
let CANVAS_H;
let BASE_HEIGHT;
let STEEPEST_ADJACENT;
let canvas;
let h1;
let inputBox;

const snowflakes = [];

const JSON_PATH = "resorts.json";
const FONT_PATH = "assets/FuturaLT-Light.ttf";

const EASING = 0.1;
const LINE_OFFSET = 16;
const LINE_LENGTH = LINE_OFFSET + 24;
const LABEL_OFFSET = 16;

// const COLOR_BACKGROUND_GRADIENT_DARK_BLUE = "#A1C4FD";
// const COLOR_BACKGROUND_GRADIENT_LIGHT_BLUE = "#C2E9FB";
const COLOR_SNOWCAP = [255, 255, 255, 204];
const COLOR_RIGHT_FACE = [201, 232, 249];
const COLOR_LEFT_FACE = [167, 196, 248];
const COLOR_DIFF_STEP = 15; // higher value means greater color difference

// global variables
let jsonData = [];
let FONT;
let RESORTS = []; // an array of "Resort" objects

/* eslint-disable-next-line no-unused-vars */
function preload() {
  jsonData = loadJSON(JSON_PATH);
  FONT = loadFont(FONT_PATH);
}

/* eslint-disable-next-line no-unused-vars */
function setup() {
  // background
  // CANVAS_W = 500;
  // CANVAS_H = 500;
  CANVAS_W = windowWidth;
  CANVAS_H = windowHeight;
  BASE_HEIGHT = (CANVAS_H / 3) * 2;
  STEEPEST_ADJACENT = BASE_HEIGHT / 2;
  textFont(FONT);

  // UNCOMMENT FOR RELEASE
  inputBox = createInput("")
    .input(function keyboardListener() {
      const matches = createResorts(this.value());
      if (matches.length > 0) {
        RESORTS = matches;
      }
    })
    .id("search-box")
    .size(CANVAS_W / 5, CANVAS_H / 15)
    .position(CANVAS_W / 2 - CANVAS_W / 10, 50)
    .hide();

  document.getElementById("search-box").placeholder =
    " Search for resorts by country or continent";

  canvas = createCanvas(CANVAS_W, CANVAS_H);
  // debugging
  RESORTS = createResorts("france");
  // debugging
  // createSpan("<p>")
  createP(
    "by <a href=https://github.com/roeybiran>Roey Biran</a> and May Rosner</a>"
  ).position(0 + 20, CANVAS_H - 40);
}

/* eslint-disable-next-line no-unused-vars */
function draw() {
  const titleString = "let's ski.";
  clear();

  // console.log(millis() / 100);
  let i = 0;
  if (millis() < 2000) {
    push();
    textSize(64);
    fill(color("white"));
    textAlign(CENTER);
    h1 = text(titleString, CANVAS_W / 2, 100);
    pop();
  } else {
    inputBox.show();
    titleString.split().forEach((letter) => {
      push();
      textSize(64);
      fill(color("white"));
      rotate(radians(millis() / 360));
      text(letter, CANVAS_W / 2, (i += 10));
      pop();
    });
  }

  RESORTS.forEach((resort) => {
    resort.render();
    resort.drawLabelLine();
    resort.drawLabel();
    // if (resort.shouldShowTooltip) {
    //   push();
    //   noStroke();
    //   fill("white");
    //   const tooltip = `
    //   ${resort.fullName}\n
    //   foo
    //   `;
    //   text(tooltip, mouseX, mouseY);
    //   pop();
    // }
  });
  renderSnowflakes();
}

const renderSnowflakes = () => {
  push();
  noStroke();
  // create a random number of snowflakes each frame
  const t = frameCount / 60; // update time
  for (let i = 0; i < random(5); i += 1) {
    snowflakes.push(new Snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  snowflakes.forEach((flake) => {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  });
  pop();
};

// --- MODEL ---
class Resort {
  constructor(resort) {
    this.fullName = resort.name;
    this.shortName = resort.name.split(" ").slice(0, 2).join(" ");
    this.score = resort.score;
    this.altitudeRelative = resort.altitudeRelative;
    this.difficultyRelative = resort.difficultyRelative;
    this.x1 = resort.center; // the mountain's center
    this.y1 = height; // the mountain's bottom
    this.y2 = this.y1;
    this.x3 = this.x1;
    this.y3 = this.y1;
    this.targetY = height - BASE_HEIGHT * this.altitudeRelative; // the mountain's "peak"
    this.rightFaceColor = resort.rightFaceColor;
    this.leftFaceColor = resort.leftFaceColor;

    this.labelLineBaseY = this.targetY - LINE_OFFSET;
    this.labelLineTargetY = this.labelLineBaseY - LINE_LENGTH;
    this.labelLineLength = 0;

    this.labelCoords = [this.x1, this.labelLineTargetY - LABEL_OFFSET];
    this.labelOpacity = 0;
    this.shouldShowTooltip = false;
  }

  render() {
    const snowCoverageMaxY = this.y3 + this.score + 0.5 * this.y3;
    this.y3 += (this.targetY - this.y3) * EASING;
    this.x2RightFace = this.x1 + STEEPEST_ADJACENT * this.difficultyRelative;
    this.x2LeftFace = this.x1 - STEEPEST_ADJACENT * this.difficultyRelative;

    [this.x2RightFace, this.x2LeftFace].forEach((faceX2, idx) => {
      const faceColor = idx === 0 ? this.rightFaceColor : this.leftFaceColor;
      push();
      noStroke();
      fill(color(...faceColor));
      triangle(this.x1, this.y1, faceX2, this.y2, this.x3, this.y3);
      // snowcap
      fill(color(COLOR_SNOWCAP));
      const magicOffset = 20;
      const magicX =
        this.x1 -
        (this.y3 - snowCoverageMaxY) *
          ((faceX2 - this.x3) / (this.y2 - this.y3));
      triangle(
        this.x1,
        snowCoverageMaxY - magicOffset,
        magicX,
        snowCoverageMaxY,
        this.x3,
        this.y3
      );
      pop();
    });
  }

  drawLabelLine() {
    push();
    stroke(123, 123, 129, 255); // ()
    strokeWeight(1);
    const y2 = this.labelLineBaseY + this.labelLineLength;
    line(this.x1, this.labelLineBaseY, this.x1, y2);
    if (y2 > this.labelLineTargetY) {
      this.labelLineLength -= random(2, 9);
    }
    pop();
  }

  drawLabel() {
    push();
    fill(0, 0, 0, (this.labelOpacity += 4)); // ()
    textSize(24);
    text(this.shortName, ...this.labelCoords);
    pop();
  }
}

const createResorts = (query) => {
  const RANKING_CRITERIA = [
    "Ski resort size",
    "Slope offering, variety of runs",
    "Lifts and cable cars",
    "Snow reliability",
    "Slope preparation",
    "Access, on-site parking",
    "Orientation (trail map, information boards, sign-postings)",
    "Cleanliness and hygiene",
    "Environmentally friendly ski operation",
    "Friendliness of staff",
    "Mountain restaurants/ski huts/gastronomy",
    "Après-ski",
    "Accommodation offering directly at the slopes and lifts",
    "Families and children",
    "Beginners",
    "Advanced skiers/freeriders",
    "Snow parks",
    "Cross-country skiing and trails",
  ];
  return jsonParser(query.toLowerCase(), jsonData, RANKING_CRITERIA).map(
    (x) => {
      return new Resort(x);
    }
  );
};

// --- HELPER FUNCTIONS ---
const setGradient = (color1, color2) => {
  push();
  noFill();
  for (let y = 0; y < height; y += 1) {
    const inter = map(y, 0, height, 0, 1);
    const c = lerpColor(color(color1), color(color2), inter);
    stroke(c);
    line(0, y, width, y);
  }
  pop();
};

// --- EXTENSIONS ---
String.prototype.toTitleCase = function titleCase() {
  return this.toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

Array.prototype.calculateRelativeProperties = function relativeValues(key) {
  const max = Math.max(
    ...this.map((a) => {
      return a[key];
    })
  );
  this.map((a) => {
    const obj = a;
    obj[`${key}Relative`] = obj[key] / max;
    return obj;
  });
  return this;
};

// snowflake class
function Snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function (time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function () {
    ellipse(this.posX, this.posY, this.size);
  };
}
