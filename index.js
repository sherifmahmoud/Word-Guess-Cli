var Word = require('./Word.js');
var inquirer = require('inquirer');
var randomWords = require('random-words');
var colors = require('colors/safe');

function Game() {
    this.inCorrectGuesses = '';
    this.isRunning = false;
    this.initialize = initialize;
    this.askForGuess = askForGuess;
    this.start = start;
    this.displayWord = displayWord;
}
function initialize() {
    this.remainingGuesses = 10;
    this.isRunning = true;//flag that the game is running
    this.secret = new Word(randomWords({ exactly: 1, maxLength: 10 })[0]);
}
function askForGuess() {

    var game = this;
    var isCorrectGuess = false;
    //repeat until the user guesses the word or no more remaining guesses
    if (!this.secret.isGuessed() && this.remainingGuesses > 0) {
        //display a word
        this.displayWord();

        //ask for a guess
        inquirer.prompt([{
            type: "input",
            name: "guess",
            message: "Guess a letter! ",

        }
        ]).then(function (answer) {
            isCorrectGuess = game.secret.guess(answer.guess);
            if (!isCorrectGuess) {
                console.log(colors.red("INCORRECT!!\n"));
                if (!game.inCorrectGuesses.includes(answer.guess)) {
                    game.remainingGuesses--;
                    game.inCorrectGuesses += answer.guess;
                }
                console.log(`[${game.inCorrectGuesses.toUpperCase().split('').join(' ')}]\n`);
                console.log(`${game.remainingGuesses} guesses remaining\n`);
            } else {
                console.log(colors.green("CORRECT!!\n"));
                console.log(`[${game.inCorrectGuesses.toUpperCase().split('').join(' ')}]\n`);
            }
            game.askForGuess();
        });

    } else {
        if (this.secret.isGuessed()) {
            console.log(colors.rainbow('CONGRATULATIONS!! You successfully guessed the word ' + game.secret.underlyingWord.toUpperCase() + '!!'));
            this.isRunning = false;//game ended
        }
        if (game.remainingGuesses === 0) {
            console.log(colors.red('Game Over!! You failed to guess the word!!\n'));
            console.log(game.secret.underlyingWord.toUpperCase());
            this.isRunning = false;//game ended
        }
        return this.secret.isGuessed();
    }

}


function start() {
    this.initialize();
    this.askForGuess();
}




function displayWord() {
    console.log('' + this.secret + '\n');
}

game = new Game();
game.start();


