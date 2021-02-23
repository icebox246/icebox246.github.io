let xAfield, yAfield, xomfield, yomfield, xfifield, yfifield;

function setup() {
  createCanvas(400, 400);
xAfield = document.querySelector("#xA");
yAfield = document.querySelector("#yA");
xomfield = document.querySelector("#xom");
yomfield = document.querySelector("#yom");
xfifield = document.querySelector("#xfi");
yfifield = document.querySelector("#yfi");
  frameRate(60);
}

let xA = 200, yA = 200, xom = 1, yom = 1, xfi = 0, yfi = 0;

let numPoints = 200;

let ct = 0;

function draw() {
  background(0);
  translate(width / 2, height / 2);
  noFill();
  stroke(255);
  strokeWeight(3);
  xA = float(xAfield.value);
  yA = float(yAfield.value);
  xom = float(xomfield.value);
  yom = float(yomfield.value);
  xfi = float(xfifield.value);
  yfi = float(yfifield.value);
  beginShape();
  for (let t = 0; t < TWO_PI * (xom * yom)  * 10; t += TWO_PI / numPoints) {
    let x = xA * Math.sin(t * xom + xfi * PI);
    let y = yA * Math.sin(t * yom + yfi * PI);
    vertex(x, y);
  }
  endShape();

  strokeWeight(10);
  stroke("red");
  ct += 0.01;
  if (ct > TWO_PI * (xom * yom) * 4) ct = 0;
    let x = xA * Math.sin(ct * xom + xfi * PI);
    let y = yA * Math.sin(ct * yom + yfi * PI);
  point(x, y);

}