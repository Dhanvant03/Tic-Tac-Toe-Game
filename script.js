// Boxs
const boxs = document.querySelectorAll(".box");
const boxContainer = document.querySelector(".game");

// Winner Game
const winMsg = document.querySelector(".win-msg");
const winMsgDiv = document.querySelector(".win-msg-div");

// Reset And Play-againButton
const resetBtn = document.querySelector(".reset-btn");
const playAgainBtn = document.querySelector(".play-again");

// Player o & x
let player = true;

// Count Element
let count = 0;

// Winner Patterns
const winPatterns = [
   [0, 1, 2],
   [0, 3, 6],
   [0, 4, 8],
   [1, 4, 7],
   [2, 5, 8],
   [2, 4, 6],
   [3, 4, 5],
   [6, 7, 8],
];

//All Box Access
boxs.forEach((box) => {
   box.addEventListener("click", (e) => {
      let currentBox = e.target;
      if (player) {
         currentBox.textContent = "o";
         currentBox.style.color = "#ffcf81";
         player = false;
      } else {
         currentBox.textContent = "x";
         currentBox.style.color = "#ffad28";
         player = true;
      }
      box.disabled = true;
      let isWinner = checkWinner();

      count++;
      console.log(count);
      if (count == 9 && !isWinner) {
         gameOutMsg();
      }
   });
});

// Enable Box Function
const enableBoxs = () => {
   for (let box of boxs) {
      box.disabled = false;
      box.textContent = "";
   }
};

// Disable Box Function
const disableBoxs = () => {
   for (let box of boxs) {
      box.disabled = true;
   }
};

// Show Winner Function
function showWinner(Winner) {
   winMsg.textContent = `Congratulation, Winner Is A ${Winner}`;
   winMsg.classList.remove("hide");
   playAgainBtn.classList.remove("hide");
   boxContainer.classList.add("hide");
   resetBtn.classList.add("hide");
}

// Check Game Winner Function
function checkWinner() {
   for (let pattern of winPatterns) {
      const pos0 = boxs[pattern[0]].textContent;
      const pos1 = boxs[pattern[1]].textContent;
      const pos2 = boxs[pattern[2]].textContent;

      if (pos0 != "" && pos1 != "" && pos2 != "") {
         if (pos0 == pos1 && pos1 == pos2) {
            setTimeout(() => {
               showWinner(pos0);
               boxs[pattern[0]].style.background = "#fdffab";
               boxs[pattern[1]].style.background = "#fdffab";
               boxs[pattern[2]].style.background = "#fdffab";
            }, 1500);
            boxs[pattern[0]].style.background = "#ffb996";
            setTimeout(() => {
               boxs[pattern[1]].style.background = "#ffb996";
            }, 300);
            setTimeout(() => {
               boxs[pattern[2]].style.background = "#ffb996";
            }, 600);

            return true;
         }
      }
   }
}

// Game Out Message Function
function gameOutMsg() {
   winMsg.textContent = `Oh No! You Are Out This Game. Better Luck Next Time`;
   winMsg.classList.remove("hide");
   playAgainBtn.classList.remove("hide");
   boxContainer.classList.add("hide");
   resetBtn.classList.add("hide");
}

// Reset Game Function
function resetGame() {
   winMsg.classList.add("hide");
   playAgainBtn.classList.add("hide");
   boxContainer.classList.remove("hide");
   resetBtn.classList.remove("hide");
   enableBoxs();
   count = 0;
}

resetBtn.addEventListener("click", resetGame);
playAgainBtn.addEventListener("click", resetGame);
