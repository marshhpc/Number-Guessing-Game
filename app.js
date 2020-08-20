/*
GAME FUNCTION:
-Player must guess a number between a min and max 
-Player gets a certian amount of guesses
-Notify player of guesses remaining
-Notify the player of the correct answer if lose
-Let player choose to play again
*/

// Game values, comma can set var for each instead of ;

let min = 1,
   max = 10,
   winningNum = getRandomNum(min, max),
   guessesLeft = 3;

// UI Element
const game = document.querySelector("#game"),
   minNum = document.querySelector(".min-num"),
   maxNum = document.querySelector(".max-num"),
   guessBtn = document.querySelector("#guess-btn"),
   guessInput = document.querySelector("#guess-input"),
   message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
// if you used 'click' event, it auto reloads the page, we do not want that
// mousedown allows you to see play again and not reload until you click. play again
game.addEventListener("mousedown", function (e) {
   if (e.target.className === "play-again") {
      window.location.reload();
   }
});

// Listen for guess
guessBtn.addEventListener("click", function () {
   let guess = parseInt(guessInput.value);
   console.log(guess);

   // Validate
   if (isNaN(guess) || guess < min || guess > max) {
      setMessage(`Please enter a number between ${min} and ${max}`, "red");
   }

   // Check if won

   if (guess === winningNum) {
      // Game over - won
      // Disable input
      //   guessInput.disabled = true;
      //   // Change border color
      //   guessInput.style.borderColor = "green";
      //   // Set message
      //   setMessage(`${winningNum} is correct, YOU WIN!`, "green");
      // Replace all above code with
      gameOver(true, `${winningNum} is correct, YOU WIN!`);
   } else {
      // Wrong Number
      guessesLeft -= 1;
      // guessesLeft = gueesesLeft -1 this is the same as above, short hand

      if (guessesLeft === 0) {
         // Game over, they lost
         // Disable input
         //  guessInput.disabled = true;
         //  // Change border color
         //  guessInput.style.borderColor = "red";
         //  // Set message
         //  setMessage(
         //     `Game Over, you lost. The correct number was ${winningNum}`,
         //     "red"
         //  );
         gameOver(
            false,
            `Game Over, you lost. The correct number was ${winningNum}`
         );
      } else {
         // Game continues - answer wrong
         // Change border color
         guessInput.style.borderColor = "red";

         // Clear input
         guessInput.value = "";

         // Tell user its the wrong number
         setMessage(
            `${guess} is not correct, ${guessesLeft} guesses left`,
            "red"
         );
      }
   }
});

// Game over

function gameOver(won, msg) {
   let color;
   won === true ? (color = "green") : (color = "red");

   guessInput.disabled = true;
   // Change border color
   guessInput.style.borderColor = color;
   // Set text color
   message.style.color = color;
   // Set message
   setMessage(msg);

   // Play agian
   guessBtn.value = "Play Again";
   // append the class +=
   guessBtn.className += "play-again";
}

// Get winning Number, this is hoisting, call functions before we declare them
function getRandomNum(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set Message
function setMessage(msg, color) {
   message.style.color = color;
   message.textContent = msg;
}
