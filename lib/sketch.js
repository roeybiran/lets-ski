//   // fill colors
//   .map((x, idx) => {
//     const resort = x;
//     const leftFaceColor = COLOR_LEFT_FACE.map((value) => {
//       return value - COLOR_DIFF_STEP * idx;
//     });
//     const rightFaceColor = COLOR_RIGHT_FACE.map((value) => {
//       return value - COLOR_DIFF_STEP * idx;
//     });
//     resort.rightFaceColor = rightFaceColor;
//     resort.leftFaceColor = leftFaceColor;
//     return resort;
//   });
// const locations = resorts.map((_, i) => {
//   const center = width / (resorts.length + 1);
//   return center * (i + 1);
// });
// resorts = resorts.map((x, i) => {
//   const resort = x;
//   resort.center = locationsShuffled[i];
//   return resort;
// });
// return resorts;
// }

RESORTS.forEach((resort) => {
  resort.render();
  resort.drawLabelLine();
  resort.drawLabel();
});

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
}

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
