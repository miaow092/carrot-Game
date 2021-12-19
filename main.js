const playBtn = document.querySelector(".start-btn");
const timer = document.querySelector(".countdown");
const carrotGround = document.querySelector(".bug-round");
const carrot = document.querySelector(".carrot");

function playGame() {
  playBtn.innerHTML = `<i class="fas fa-stop"></i>`;
  //startTimer();
  addBugAndCarrot();
}

function startTimer() {
  const start = setInterval(counterdown, 1000);
  let seconed = 5;
  function counterdown() {
    if (seconed < 0) {
      alert("finish!");
      return clearInterval(start);
    } else {
      timer.innerText = `${addZero(seconed)}:00`;
      seconed--;
    }
  }
  function addZero(num) {
    return num < 10 ? "0" + num : num;
  }
}

function addBugAndCarrot() {
  const X = carrotGround.clientWidth - 50;
  const Y = carrotGround.clientHeight - 50;
  const randomX = Math.floor(Math.random() * X);
  const randomY = Math.floor(Math.random() * Y);
  console.log(`${randomX}, ${randomY}`);
  const bug = document.createElement("img");
  bug.src = `img/bug.png`;
  bug.classList.add("position");
  carrotGround.append(bug);
  bug.style.left = `${randomX}px`;
  bug.style.top = `${randomY}px`;
  console.dir(bug);
}

playBtn.addEventListener("click", playGame);
