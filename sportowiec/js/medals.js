const medalListGold = document.querySelector("#gold-medals");
const medalListSilver = document.querySelector("#silver-medals");
const medalListBronze = document.querySelector("#bronze-medals");

const changeMedalList = (id, caller) => {

  document.querySelectorAll(".clicked").forEach(elem => {
    elem.classList.remove("clicked");
  });

  caller.classList.add("clicked");

  medalListGold.classList.remove("active");
  medalListSilver.classList.remove("active");
  medalListBronze.classList.remove("active");

  if (id == 0) {
    medalListGold.classList.add("active");
  } else if (id == 1) {
    medalListSilver.classList.add("active");
  } else {
    medalListBronze.classList.add("active");
  }
}