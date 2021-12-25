"use strict";

const gameField = document.querySelector(".game__field");
const gameFieldSize = gameField.getBoundingClientRect();
const startBtn = document.querySelector(".start__button");
const gameScore = document.querySelector(".game__score");
const gameTimer = document.querySelector(".game__timer");
const popUp = document.querySelector(".pop-up");
const popUpMessage = document.querySelector(".pop-up__message");
const popUpReplayRtn = document.querySelector(".pop-up__replay");

const CARROT_COUNT = 30;
const BUG_COUNT = 20;
const CARROT_SIZE = 80;
const GAME_DURATION_SEC = 30;

const carrotAudio = new Audio("sound/carrot_pull.mp3");
const bgAudio = new Audio("sound/bg.mp3");
const bugAudio = new Audio("sound/bug_pull.mp3");
const gameWinAudio = new Audio("sound/game_win.mp3");
const alertAudio = new Audio("sound/alert.wav");

let started = false;
let timer = undefined;
let score = 0;

startBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

popUpReplayRtn.addEventListener("click", replayGame);

function replayGame() {
  started = true;
  score = 0;
  bgAudio.currentTime = 0;
  bgAudio.play();
  showBtn();
  deletePopUp();
  startGame();
}

function startGame() {
  started = true;
  bgAudio.play();
  changeBtnImg();
  startTimer();
  initGame();
  showScore();
}

function stopGame() {
  started = false;
  bgAudio.pause();
  alertAudio.play();
  removeBtn();
  showPopUp(`REPLAY?`);
  stopTimer();
}

function changeBtnImg() {
  const icon = document.querySelector(".fas");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
}

function showBtn() {
  const icon = document.querySelector(".fa-stop");
  icon.classList.add("fa-play");
  icon.classList.remove("fa-stop");
  startBtn.style.visibility = "visible";
}

function showScore() {
  gameScore.innerText = CARROT_COUNT - score;
}

function startTimer() {
  let remainingTime = GAME_DURATION_SEC;
  countDown(remainingTime);
  timer = setInterval(() => {
    countDown(remainingTime);
    if (remainingTime <= 0) {
      clearInterval(timer);
      timeout(`TIME OUT!`);
      return;
    }
    countDown(--remainingTime);
  }, 1000);
}

function countDown(sec) {
  const minute = Math.floor(sec / 60);
  const secend = sec % 60;
  return (gameTimer.innerText = `${addZero(minute)}:${addZero(secend)}`);
}

function addZero(num) {
  return num < 10 ? "0" + num : num;
}

function timeout(text) {
  removeBtn();
  showPopUp(text);
  alertAudio.play();
  bgAudio.pause();
}

function stopTimer() {
  clearInterval(timer);
}

function initGame() {
  gameField.innerText = "";
  addItem("carrot", CARROT_COUNT, "img/carrot.png");
  addItem("bug", BUG_COUNT, "img/bug.png");
}

function addItem(className, count, imgPath) {
  for (let i = 0; i < count; i++) {
    const randomX = Math.random() * (gameFieldSize.width - CARROT_SIZE);
    const randomY = Math.random() * (gameFieldSize.height - CARROT_SIZE);
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    item.style.left = `${randomX}px`;
    item.style.top = `${randomY}px`;
    gameField.append(item);
  }
}

function removeBtn() {
  startBtn.style.visibility = "hidden";
}

function showPopUp(text) {
  popUpMessage.innerText = text;
  popUp.classList.remove("hidden");
}

function deletePopUp() {
  popUp.classList.add("hidden");
}

gameField.addEventListener("click", onFieldCilck);

function onFieldCilck(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches(".carrot")) {
    target.remove();
    score++;
    carrotAudio.play();
    showScore();
    if (CARROT_COUNT === score) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    finishGame(false);
  }

  function finishGame(win) {
    started = false;
    if (win) {
      gameWinAudio.play();
      bgAudio.pause();
    } else {
      bugAudio.play();
      bgAudio.pause();
    }
    removeBtn();
    showPopUp(win ? `YOU WON!` : `YOU LOSE!`);
    stopTimer();
  }
}
