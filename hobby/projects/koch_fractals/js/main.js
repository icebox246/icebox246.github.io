let iterCount = 4;

let leftColor = "#42275a";
let rightColor = "#734b6d";


let mainSketch;
const setMainSketch = (p) => {
  mainSketch = p;
}

const iterSlider = document.querySelector("#iterslider");
iterSlider.addEventListener('change', function () {
  console.log('change ' + this.value);
  iterCount = this.value;
  mainSketch.redraw();
});

let kochModules = [];

const kochModule = function (p, depthLeft, origin = {
  x: 0,
  y: 0,
  a: 0,
  w: 600
}) {
  this.origin = origin;
  this.children = [];

  if (depthLeft > 0) {
    this.children = [
      new kochModule(p, depthLeft - 1, {
        x: this.origin.x,
        y: this.origin.y,
        a: this.origin.a,
        w: this.origin.w / 3
      }),
      new kochModule(p, depthLeft - 1, {
        x: this.origin.x + Math.cos(this.origin.a) * this.origin.w / 3,
        y: this.origin.y + Math.sin(this.origin.a) * this.origin.w / 3,
        a: this.origin.a - Math.PI / 3,
        w: this.origin.w / 3
      }),
      new kochModule(p, depthLeft - 1, {
        x: this.origin.x + Math.cos(this.origin.a) * this.origin.w / 3 + Math.cos(this.origin.a - Math.PI / 3) * this.origin.w / 3,
        y: this.origin.y + Math.sin(this.origin.a) * this.origin.w / 3 + Math.sin(this.origin.a - Math.PI / 3) * this.origin.w / 3,
        a: this.origin.a + Math.PI / 3,
        w: this.origin.w / 3
      }),
      new kochModule(p, depthLeft - 1, {
        x: this.origin.x + Math.cos(this.origin.a) * 2 * this.origin.w / 3,
        y: this.origin.y + Math.sin(this.origin.a) * 2 * this.origin.w / 3,
        a: this.origin.a,
        w: this.origin.w / 3
      }),
    ]
  }

  if (depthLeft === 0) {
    kochModules.push(this);
  }
}

const kochCurveGen = (p) => {

  p.setup = () => {
    const canvas = p.createCanvas(600, 600);
    canvas.parent(kochcurveview);
    setMainSketch(p);
    p.noLoop();
  }

  p.draw = () => {

    kochModules = [];
    for (let i = 1; i <= 3; i++) {
      new kochModule(p, iterCount, {
        x: Math.cos((Math.PI / 1.5) * i + Math.PI / 2) * p.width * -0.4 * Math.sqrt(3) * 0.6666666666,
        y: Math.sin((Math.PI / 1.5) * i + Math.PI / 2) * p.width * -0.4 * Math.sqrt(3) * 0.6666666666,
        a: Math.PI / 1.5 * i + Math.PI / 3,
        w: p.width * 0.8
      });
    }
    const kochMask = p.createGraphics(p.width, p.height);
    kochMask.clear();
    kochMask.translate(p.width / 2, p.height / 2);

    kochMask.noStroke();
    kochMask.fill(0);
    kochMask.beginShape();
    for (k of kochModules) {
      kochMask.vertex(k.origin.x, k.origin.y);
    }
    kochMask.endShape();

    p.clear();

    const gradPix = p.createImage(2, 1);
    gradPix.loadPixels();
    gradPix.set(0, 0, p.color(leftColor));
    gradPix.set(1, 0, p.color(rightColor));
    gradPix.updatePixels();

    const gradientGfx = p.createGraphics(p.width, p.height);
    gradientGfx.image(gradPix, 0, 0, p.width, p.height);

    var gradientImage = p.createImage(p.width, p.height);
    gradientImage.copy(gradientGfx, 0, 0, p.width, p.height, 0, 0, p.width, p.height);

    gradientImage.mask(kochMask);
    p.clear();
    p.image(gradientImage, 0, 0);
  }

}



new p5(kochCurveGen);