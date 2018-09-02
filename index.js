var Word = require('./Word.js');
var inquirer = require('inquirer');
var randomWords = require('random-words');
var colors = require('colors/safe');

function Game() {
    this.inCorrectGuesses = '';//list of previous incorrect guesses kept in a string
    this.isRunning = false;
    this.initialize = initialize;
    this.askForGuess = askForGuess;
    this.start = start;
    this.displayWord = displayWord;
}
function initialize() {
    this.remainingGuesses = 10;//start the game with 10 wrong guesses remaining
    //request a random word with a max length of ten letters
    this.secret = new Word(randomWords({ exactly: 1, maxLength: 10 })[0]);
}
function askForGuess() {

    var game = this;//game variable to be used inside the inquirer callback as using this won't be correct inside the callback
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
                    //just count a wrong guess the first time the user do it
                    game.remainingGuesses--;
                    //add the wrong guess to the list of previous wrong guesses
                    game.inCorrectGuesses += answer.guess;
                }
                //show a list of previous wrong guesses
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


