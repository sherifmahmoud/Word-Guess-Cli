function Letter(underlyingCharacter) {
    this.underlyingCharacter = underlyingCharacter.toUpperCase();
    this.isGuessed = false;

    this.toString = function () {
        if (this.isGuessed) {
            return this.underlyingCharacter;
        } else {
            return '_';
        }
    }

    this.guess = function (guessChar) {//returns true if the guess is correct, otherwise returns false.
        if (!this.isGuessed) {
            if (guessChar.toUpperCase() === this.underlyingCharacter) {
                this.isGuessed = true;
                return true;//
            } else {
                return false;
            }

        }

    }
}

module.exports = Letter;


