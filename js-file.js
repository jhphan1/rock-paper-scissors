// computerPlay function
function computerPlay() {
    // Use randomNumber function to generate 0, 1, or 2 with equal odds;
    let x = Math.floor(Math.random() * 3);
    return x === 0 ? "rock" 
        : x === 1 ? "paper" 
        : x === 2 ? "scissors"
        : "Error";
}


// playerPlay function
function playerPlay() {
    // Ask user to enter Rock, Paper, or Scissors and set it to playerSelection;
    let playerSelection = prompt("Please choose Rock, Paper, or Scissors")

    // Error check the input:
        // Make input all lowercase so that it is case-insensitive;
    playerSelection = playerSelection.toLowerCase();
        // If input is not rock, paper, or scissors, ask user for input again;
        // Use while loop to keep prompting until user doesn't mess up;
    keepGoing = true;
    while (keepGoing) {
        if (playerSelection === "rock" || playerSelection === "paper" || playerSelection === "scissors") {
            keepGoing = false;
            return playerSelection;
        } else {
            playerSelection = prompt("Error. Please choose Rock, Paper, or Scissors");
            playerSelection = playerSelection.toLowerCase();
        }
    }
}
    

// playRound function
function playRound(e) {
    // playerSelection based on player's button click 
    let playerSelection = e.target.classList.value;
    let computerSelection = computerPlay();

    // Display what each player chose in div
    const matchup = document.querySelector(".matchup");
    matchup.textContent = `You chose ${playerSelection} and Computer chose ${computerSelection}...`;

    // Display who won in div
    const result = document.querySelector(".result");
    const playerScoreboard = document.querySelector(".playerScoreboard");
    const computerScoreboard = document.querySelector(".computerScoreboard");

    if (playerSelection === "rock") {
        if (computerSelection === "scissors") {
            playerScore++;
            result.textContent = "Yay! Rock beats Scissors!";
        } else if (computerSelection === "paper") {
            computerScore++;
            result.textContent = "Oof! Paper beats Rock!";
        } else {
            result.textContent = "Tie!";
        }
    }

    if (playerSelection === "paper") {
        if (computerSelection === "rock") {
            playerScore++;
            result.textContent = "Nice! Paper beats Rock!";
        } else if (computerSelection === "scissors") {
            computerScore++;
            result.textContent = "Darn! Scissors beat Paper!";
        } else {
            result.textContent = "Tie!";
        }
    }

    if (playerSelection === "scissors") {
        if (computerSelection === "paper") {
            playerScore++;
            result.textContent = "Sweet! Scissors beat Paper!";
        } else if (computerSelection === "rock") {
            computerScore++;
            result.textContent = "Ouch! Rock beats Scissors!";
        } else {
            result.textContent = "Tie!";
        }
    }

    // Update scoreboard
    playerScoreboard.textContent = playerScore;
    computerScoreboard.textContent = computerScore;

    // Announce overall winner after 5 points, and stop the game
    const winner = document.querySelector(".winner");
    
    if (playerScore === 5) {
        winner.textContent = "YOU BEAT THE COMPUTER!!!"
        // stop the game
        buttons.forEach(button => button.removeEventListener("click", playRound));
        // change background color to gold
        const background = document.querySelector("body");
        background.style.cssText = "background-color: rgba(252, 194, 3, 0.5);"

    }

    if (computerScore === 5) {
        winner.textContent = "THE COMPUTER BEAT YOU!!!"
        buttons.forEach(button => button.removeEventListener("click", playRound));
        // change background color to red
        const background = document.querySelector("body");
        background.style.cssText = "background-color: rgba(256, 0, 0, 0.5);"
    }
}


// game function
function game() {   
    // Plays 5 rounds to find winner
    for (let i = 0; i < 5; i++) {
        console.log(playRound(playerPlay(), computerPlay()));
        console.log(`Current Player Score: ${playerScore}`);
        console.log(`Current Computer Score: ${computerScore}`);
    }
    
    // After loop ends, compare playerScore vs computerScore
    return playerScore > computerScore ? "You are the overall winner after 5 rounds!"
        : playerScore < computerScore ? "The computer is the overall winner after 5 rounds :("
        : "It was a tie after 5 rounds.";
}
    

// main function
let playerScore = 0;
let computerScore = 0;

// Add eventlistener to buttons so that playRound runs with player selection
const buttons = document.querySelectorAll("button");

buttons.forEach(button => button.addEventListener("click", playRound));

// Add eventlistener to buttons so that they play a sound
buttons.forEach(button => button.addEventListener("click", () => {
    let audio = document.querySelector(".tink");
    audio.currentTime = 0;
    audio.play();
}))