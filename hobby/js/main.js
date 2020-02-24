// for showing and hiding header

Object.defineProperty(HTMLMediaElement.prototype, "playing", {
  get: function() {
    return !!(
      this.currentTime > 0 &&
      !this.paused &&
      !this.ended &&
      this.readyState > 2
    );
  }
});

const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  console.log("hai");
  if (window.pageYOffset === 0) {
    header.classList.remove("solid");
  } else {
    header.classList.add("solid");
  }
});

// const videos = document.querySelectorAll("video");

// function playVideo(n) {
//   if (videos[n].playing) videos[n].pause();
//   else videos[n].play();
// }

function playVideo(n) {
  if (n.playing) n.pause();
  else n.play();
}

//setTimeout(setCubeHeight, 200);
window.onresize = setCubeHeight;

function setCubeHeight() {
  var foo = document.getElementsByClassName("square-me");
  for (var i = 0; i < foo.length; i++)
    foo[i].style.height = "" + foo[i].offsetWidth + "px";
}

setCubeHeight();

// code for resizing iframes

function getDocHeight(doc) {
  doc = doc || document;
  // stackoverflow.com/questions/1145850/
  var body = doc.body,
    html = doc.documentElement;
  var height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  return height;
}

function setIframeHeight(ifrm) {
  //var ifrm = document.getElementById(id);
  var doc = ifrm.contentDocument
    ? ifrm.contentDocument
    : ifrm.contentWindow.document;
  ifrm.style.visibility = "hidden";
  ifrm.style.height = "10px"; // reset to minimal height ...
  // IE opt. for bing/msn needs a bit added or scrollbar appears
  ifrm.style.height = getDocHeight(doc) + 10 + "px";
  ifrm.style.visibility = "visible";
}
