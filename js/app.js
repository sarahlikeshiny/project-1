console.log('js is connected - woo');

$(() => {


//pseudocode
// reset from last game, blank all
// create an array of words and grab events using jquery
// randomly select a word from the Array
// symbolise letters by an underscore from the array. must deal with spaces between words.
// user submits a letter using text input and button (could set up keyboard listener, stick to button for MVP)
// check letter against the work
// if letter is present display on the screen
// if not add part of gallows and add letter to screen, and update incorrect turns counter
// continue until all turns are used or word is guessed.

//global constants
  const words = ['cat', 'dog', 'horse', 'penguin', 'monkey'];
  const $displayWord =$('.word');
  const $guessButton = $('#guess');
  const $inputText =$('textarea');
  const $incorrectGuess=$('.incorrect');
  const $reset=$('#reset');
  let userLetter= '';
  let turns = 0;
  let $displayCorrect = '';
  let correctChars = '';



//randomly select a word from the array - currentWord - WORKS
  const currentWord = words[Math.floor(Math.random() * words.length)];
  console.log(currentWord);

//symbolise letters from the word selected and display on the screen -WORKS
  const underScores = currentWord.replace(/[a-z]/g, ' _');
  $displayWord.text(underScores);
  console.log(underScores.length);
  // const underScoresNoWhite = underScores.replace(/\s/g, '');
  // console.log(underScoresNoWhite.length);



//guess button, on click, capture user input. - WORKS

  $guessButton.on('click', function() {
    console.log('Clicked');
    userLetter = $inputText.val();
    console.log(userLetter);
    return userLetter;
  });



  $guessButton.on('click', function () {
    if (turns <= 7){
      for (let i = 0; i < currentWord.length; i ++) {
        if (currentWord[i] === userLetter){
        // make userLetter a substring and replace in underscores at the index?
        console.log([i]);
        //displays the letter, but doubles the underscores?
        correctChars = underScores.slice((i+1)) + userLetter + underScores.substring(i+1);
        console.log(correctChars);
        console.log('a match');
        $displayWord.text(correctChars);
        //need to clear the box after text has been picked up
      } else {
        console.log('no match');
        correctGuess = false;
        //need to add each letter rather than overwriting, currently displays all of the user guesses.
        let wrongGuesses= '' + userLetter + '';
        $incorrectGuess.text(wrongGuesses.toUpperCase());
        turns ++;
        }
      }
    } else{
    console.log('out of turns');
    }
  });

//if letter is in word, replace underscore with letter

//else add letter to p.incorrect, and add 1 to turns, and update gallows picture

//when turns = 7, or word is complete finish game, add text 'you win' or 'you lose' to

//reset for new game. DOESN'T WORK
  function resetBoard() {
  //clear the guesses
    clearInterval($inputText);
    clearInterval($incorrectGuess)
  }

  $reset.on('click',resetBoard);


});
