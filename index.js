import inquirer from "inquirer";

// Fungsi untuk generate angka random
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fungsi utama game
async function startGame() {
  console.log("=== WELCOME TO NUMBER GUESSING GAME ===");
  console.log("Rules: Guess the number between 1 - 100. Select difficulty to determine your chances.");

  // Pilih level kesulitan
  const { difficulty } = await inquirer.prompt([
    {
      type: "list",
      name: "difficulty",
      message: "Choose difficulty level:",
      choices: ["easy", "medium", "hard"],
    },
  ]);

  let maxAttempts;
  if (difficulty === "easy") maxAttempts = 10;
  else if (difficulty === "medium") maxAttempts = 7;
  else maxAttempts = 5;

  const numberToGuess = getRandomNumber(1, 100);
  let attempts = 0;
  let guessed = false;

  while (attempts < maxAttempts && !guessed) {
    const { userGuess } = await inquirer.prompt([
      {
        type: "input",
        name: "userGuess",
        message: `Enter your guess (${1} - ${100}):`,
        validate: (input) => {
          const num = Number(input);
          if (isNaN(num) || num < 1 || num > 100) return "Enter a number between 1 and 100";
          return true;
        },
      },
    ]);

    attempts++;
    const guess = Number(userGuess);

    if (guess === numberToGuess) {
      console.log(`🎉 Congratulations! You guessed the number ${numberToGuess} in ${attempts} attempts.`);
      guessed = true;
    } else if (guess < numberToGuess) {
      console.log("⬆️ Too low!");
    } else {
      console.log("⬇️ Too high!");
    }
  }

  if (!guessed) {
    console.log(`💀 Game over! The number was ${numberToGuess}`);
  }

  const { playAgain } = await inquirer.prompt([
    {
      type: "confirm",
      name: "playAgain",
      message: "Do you want to play again?",
      default: false,
    },
  ]);

  if (playAgain) startGame();
}

// Start the game
startGame();
