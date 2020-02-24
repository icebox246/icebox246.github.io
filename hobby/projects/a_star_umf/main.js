class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class Node {
  constructor(x, y, px, py, fromStart, start = false) {
    this.x = x;
    this.y = y;
    this.checked = false;
    this.fromStart = fromStart;
    //this.fromStart = int(sqrt(abs(x - startPoint.x) * abs(x - startPoint.x) + abs(y - startPoint.y) * abs(y - startPoint.y)) * 10);
    this.fromTarget = int(sqrt(abs(x - targetPoint.x) * abs(x - targetPoint.x) + abs(y - targetPoint.y) * abs(y - targetPoint.y)) * 10);
    this.score = this.fromStart + this.fromTarget;
    if (start) this.score = Number.POSITIVE_INFINITY;
    //if (start) this.score = Number.POSITIVE_INFINITY;
    this.px = px;
    this.py = py;

    this.update = function (px, py, fromStart) {
      if (fromStart < this.fromStart) {
        this.px = px;
        this.py = py;
        this.fromStart = fromStart;
        this.score = this.fromStart + this.fromTarget;
      }

    }
    this.check = function () {
      if (this.x == targetPoint.x && this.y == targetPoint.y) {
        return true;
      }
      this.checked = true;
      for (let i = (this.x > 0 ? -1 : 0); i <= ((this.x < mapSize - 1) ? 1 : 0); i++) {
        for (let j = (this.y > 0 ? -1 : 0); j <= ((this.y < mapSize - 1) ? 1 : 0); j++) {

          if (!(j == 0 && i == 0) && !obstacles[this.x + i + (this.y + j) * mapSize]) {
            //if (this.score == Number.POSITIVE_INFINITY) console.log(i + ' ' + j);
            if (nodes[this.x + i + (this.y + j) * mapSize] == null) {
              nodes[this.x + i + (this.y + j) * mapSize] = new Node(this.x + i, this.y + j, this.x, this.y, this.fromStart + int(sqrt(i * i + j * j) * 10));
            } else {
              //if (!(this.x + i == this.px || this.y + j == this.py))
              nodes[this.x + i + (this.y + j) * mapSize].update(this.x, this.y, this.fromStart + int(sqrt(i * i + j * j) * 10));
            }
          }
        }
      }
      return false;
    }
  }
}
const outcomeText = document.querySelector("#outcome");
let gotToTheTarget = false;
let noPath = false;
const obstacles = [];
let nodes = [];
let mapSize = 50;
let fillPercent = 0.4;
let gridNoiseOffset = 0.2;
let startPoint = new Point(0, 0);
let targetPoint = new Point(- 1, - 1);

let path = [];
let currentPointIndex = 0;

let playerPos = new Point(0, 0);
let playerSpeed = 2 * 0.1;

function setup() {
  let screenSize = min(800, windowWidth * 0.9);
  canvas = createCanvas(screenSize, screenSize);
  canvas.parent('canvas');
  generateNewMap();
  textAlign(CENTER, CENTER);
}

function draw() {
  const unit = width / mapSize;
  clear();
  noFill();
  // stroke(255);
  // rect(0, 0, width - 1, height - 1, unit * 0.6);
  drawTheMap();
  //drawTheNodes();
  drawPoints();
  if (gotToTheTarget) {
    //drawThePath();
    moveTowardTarget();
  }

  //debugger;
}

function mousePressed() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
  const unit = width / mapSize;
  targetPoint = new Point(floor(mouseX / unit), floor(mouseY / unit));
  startPoint = new Point(round(playerPos.x), round(playerPos.y));
  if (!(targetPoint.x == startPoint.x && targetPoint.y == startPoint.y))
    findNewPath();
  currentPointIndex = 0;
}

const moveTowardTarget = () => {
  tp = path[currentPointIndex];
  if ((tp.x - playerPos.x) * (tp.x - playerPos.x) + (tp.y - playerPos.y) * (tp.y - playerPos.y) < playerSpeed * playerSpeed) {
    playerPos.x = tp.x;
    playerPos.y = tp.y;
    if (currentPointIndex < path.length - 1) currentPointIndex++;
  } else {
    const dist2t = sqrt((tp.x - playerPos.x) * (tp.x - playerPos.x) + (tp.y - playerPos.y) * (tp.y - playerPos.y));
    const moveVector = new Point((tp.x - playerPos.x) / dist2t, (tp.y - playerPos.y) / dist2t);
    playerPos.x += moveVector.x * playerSpeed;
    playerPos.y += moveVector.y * playerSpeed;
  }
}

const findNewPath = () => {
  nodes = [];
  nodes[startPoint.x + startPoint.y * mapSize] = new Node(startPoint.x, startPoint.y, startPoint.x, startPoint.y, 0, true);
  gotToTheTarget = false;
  noPath = false;
  while (!gotToTheTarget && !noPath) {
    checkNextBestNode();
  }

  if (noPath) {
    path = [];
    path[0] = new Point(startPoint.x, startPoint.y);
  } else
    scrapeThePath();
  return gotToTheTarget;
}


const generateNewMap = () => {
  targetPoint = new Point(- 1, - 1);
  const rOffX = random(100000);
  outcomeText.innerHTML = "New map...";
  gotToTheTarget = false;
  noPath = false;
  for (let x = 0; x < mapSize; x++) {
    for (let y = 0; y < mapSize; y++) {
      obstacles[x + y * mapSize] = (noise(rOffX + gridNoiseOffset * x, rOffX * 0.5 + gridNoiseOffset * y) < fillPercent ? true : false);
    }
  }
  let found = false;
  for (let y = 0; y < mapSize && !found; y++) {
    for (let x = 0; x < mapSize && !found; x++) {
      if (!obstacles[x + y * mapSize]) {
        startPoint.x = x;
        startPoint.y = y;
        found = true;
      }
    }
  }

  playerPos.x = startPoint.x;
  playerPos.y = startPoint.y;


}
//white = obtacle
//black = clear
const drawTheMap = () => {
  noStroke();
  const unit = width / mapSize;
  fill(255);
  for (let x = 0; x < mapSize; x++) {
    for (let y = 0; y < mapSize; y++) {
      if (obstacles[x + y * mapSize]) {
        ellipse(x * unit + unit * 0.5, y * unit + unit * 0.5, unit * 0.7, unit * 0.7);
      }
    }
  }
}

const drawTheNodes = () => {
  const unit = width / mapSize;
  textSize(15);
  for (n of nodes) {
    if (n == null) continue;
    fill(n.checked ? "purple" : "navy");
    rect(n.x * unit, n.y * unit, unit, unit);
    fill(255);
    text(n.score, n.x * unit + unit * 0.5, n.y * unit + unit * 0.5);
  }
  for (n of nodes) {
    if (n == null) continue;
    strokeWeight(2);
    line(n.x * unit + unit * 0.5, n.y * unit + unit * 0.5, n.px * unit + unit * 0.5, n.py * unit + unit * 0.5);
    strokeWeight(5);
    point(n.x * unit + unit * 0.5, n.y * unit + unit * 0.5);
  }
  strokeWeight(2);
}

const drawPoints = () => {
  noStroke();
  const unit = width / mapSize;
  // fill(255, 255, 0);
  // ellipse(unit * startPoint.x + unit * 0.5, unit * startPoint.y + unit * 0.5, unit * 0.6, unit * 0.6);
  stroke(noPath ? "red" : "white");
  strokeWeight(2.5);
  fill(255, 0, 0);
  line(unit * targetPoint.x + 0.15 * unit, unit * targetPoint.y + 0.15 * unit, unit * targetPoint.x + unit - 0.15 * unit, unit * targetPoint.y + unit - 0.15 * unit);
  line(unit * targetPoint.x + 0.15 * unit, unit * targetPoint.y + unit - 0.15 * unit, unit * targetPoint.x + unit - 0.15 * unit, unit * targetPoint.y + 0.15 * unit);
  noStroke();
  fill(0, 255, 0);
  ellipse(unit * playerPos.x + unit * 0.5, unit * playerPos.y + unit * 0.5, unit * 0.7, unit * 0.7);


}

const checkNextBestNode = () => {
  let bestNode = nodes[startPoint.x + startPoint.y * mapSize];
  for (n of nodes) {
    if (n == null) continue;
    if (!n.checked && n.score <= bestNode.score) {
      //if (n.score != bestNode.score && n.fromTarget < bestNode.fromTarget)
      bestNode = n;
    }
  }
  if (bestNode.checked) {
    outcomeText.innerHTML = "No path found";
    noPath = true;
  }
  if (bestNode.check()) {
    gotToTheTarget = true;
    outcomeText.innerHTML = "Found a path!";
    //drawThePath(bestNode);
  }
}

const scrapeThePath = () => {
  path = [];

  let cn = nodes[targetPoint.x + targetPoint.y * mapSize];
  while (cn.x != startPoint.x || cn.y != startPoint.y) {
    path.unshift(new Point(cn.x, cn.y));
    cn = nodes[cn.px + cn.py * mapSize];
  }
}

const drawThePath = () => {
  const unit = width / mapSize;
  stroke(0, 255, 0);
  strokeWeight(5);
  for (let i = 0; i < path.length - 1; i++) {
    //console.log(i);
    const lp = path[i];
    const cp = path[i + 1];
    line(lp.x * unit + unit * 0.5, lp.y * unit + unit * 0.5, cp.x * unit + unit * 0.5, cp.y * unit + unit * 0.5);
  }
}

