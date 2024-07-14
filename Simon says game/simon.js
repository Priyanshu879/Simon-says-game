let gameSeq = [];
let userSeq = [];

let btnColor = ["red", "yellow", "green", "purple"];

let start = false;

let level = 0;
let h2 = document.querySelector("h2");

let highestScoreElement = document.getElementById("highest-score");

// Retrieve the highest score from localStorage
let highestScore = localStorage.getItem("highestScore") || 0;
highestScoreElement.innerText = `Highest Score: ${highestScore}`;


document.addEventListener("keypress", function () {
  if (start == false) {
    start = true;
    levelUp();
  }
});

//Button flash function
function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

//User Flash function
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

//LevelUp function
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randomNo = Math.floor(Math.random() * 3)+1;
  let randomColor = btnColor[randomNo];
  let randomBtn = document.querySelector(`.${randomColor}`);
  gameSeq.push(randomColor);
  console.log(gameSeq);
  btnFlash(randomBtn);
}

//Checking sequence....
function checkAns(idx) {
    if (gameSeq[idx]==userSeq[idx]) {
        if (gameSeq.length == userSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        // checking highest score
        if (level > highestScore) {
            highestScore = level;
            localStorage.setItem("highestScore", highestScore);
            highestScoreElement.innerText = `Highest Score: ${highestScore}`;
        }
        
        h2.innerHTML = `Game over!! <b> Your score was ${level} </b> <br> Press any key to Restart.`;
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(function (){
            document.querySelector('body').style.backgroundColor = "white";
        }, 150)
        reset();
    }
}

function btnPress() {
//   console.log(this);
  userFlash(this); //this = btn from allbtns
  userColor = this.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length-1);
} 


let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

//Reset the game
function reset() {
    gameSeq = [];
    userSeq = [];
    start = false;
    level = 0;
}
