let snowFlakeGraphic;
let pointCount = 20;
let symmetryCount = 6;
let nOff = 0;
let nPointOff = 0.1;
let minArmWidth = 10;
let maxArmWidth = 50;


const generatorSketch = (sketch) => {
  let canvas;
  sketch.setup = () => {
    canvas = sketch.createCanvas(600, 600);
    canvas.parent("generator");
    sketch.background(127);
    document.querySelector("#newbutton").addEventListener("click", createSnowFlake);
    createSnowFlake();
  };

  const createSnowFlake = () => {
    sketch.clear();
    snowFlakeGraphic = sketch.createGraphics(500, 500, sketch.P2D);
    nOff = sketch.random(10);
    nPointOff = sketch.random(0.1, 10);

    snowFlakeGraphic.translate(snowFlakeGraphic.width / 2, snowFlakeGraphic.height / 2);
    const pointDistX = (snowFlakeGraphic.width / 2) / (pointCount);
    maxArmWidth = document.querySelector("#armwidth").value;
    const maximumArmWidthChange = (maxArmWidth / 2) * 0.6;
    snowFlakeGraphic.stroke(255);
    snowFlakeGraphic.strokeWeight(3);
    snowFlakeGraphic.noFill();
    for (let i = 1; i <= symmetryCount * 2; i += 1) {
      if (i == symmetryCount + 1) snowFlakeGraphic.scale(1, -1);
      snowFlakeGraphic.rotate(sketch.PI / (symmetryCount / 2));
      snowFlakeGraphic.beginShape()

      snowFlakeGraphic.vertex(0, 0);

      let lastWidth = 0;
      let currentWidth = 0;

      for (let j = 1; j <= pointCount - 1; j++) {
        if (lastWidth <= minArmWidth / 2) currentWidth = lastWidth + maximumArmWidthChange / 2 * (sketch.noise(nOff + nPointOff * j) * 2 + 1);
        else if (lastWidth >= maxArmWidth / 2) currentWidth = lastWidth - maximumArmWidthChange / 2 * (sketch.noise(nOff + nPointOff * j) * 2 + 1);
        else currentWidth = lastWidth + maximumArmWidthChange * sketch.noise(nOff + nPointOff * j);
        currentWidth = sketch.constrain(currentWidth, minArmWidth / 2, maxArmWidth / 2)
        snowFlakeGraphic.vertex(j * pointDistX, currentWidth);
        lastWidth = currentWidth;
      }

      snowFlakeGraphic.vertex(pointCount * pointDistX, 0);

      snowFlakeGraphic.endShape();
    }

    sketch.clear();
    sketch.image(snowFlakeGraphic, 0, 0, sketch.width, sketch.height);
  }
};

new p5(generatorSketch);