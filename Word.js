var Letter = require('./Letter.js');
function Word(underlyingWord) {
    this.underlyingWord = underlyingWord.toUpperCase();
    this.letters = [];
    for (var letter of this.underlyingWord) {
        this.letters.push(new Letter(letter));
    }

    this.toString = function () {
        var string = '';
        for (var i = 0; i < this.letters.length; i++) {
            string += '' + this.letters[i];
            if (this.letters.length > 1 && i != (this.letters.length - 1)) {
                string += ' ';
            }
        }
        return string;
    }

    this.guess = function (character) {//returns true if the guess is correct, otherwise returns false.
        character = character.toUpperCase();
        var isCorrect = false;
        for (var letter of this.letters) {
            if (letter.guess(character)) {
                isCorrect = true;
            }
        }
        return isCorrect;
    }
    this.isGuessed = function () {
        var isGuessed = this.letters.every(function (letter) {
            return letter.isGuessed;
        });
        return isGuessed;
    }
}

module.exports = Word;