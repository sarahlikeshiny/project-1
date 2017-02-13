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
  let correctCharsSpace =[];
  let check = false;
  let incorrect = [];



//randomly select a word from the array - currentWord - WORKS
  const currentWord = words[Math.floor(Math.random() * words.length)];
  console.log(currentWord);

//symbolise letters from the word selected and display on the screen -WORKS
  const underScores = currentWord.replace(/[a-z]/g, ' _');
  $displayWord.text(underScores);
  console.log(underScores.length);
  const underScoresNoWhite = underScores.replace(/\s/g, '');
  console.log(underScoresNoWhite.length);



//guess button, on click, capture user input. - WORKS

  $guessButton.on('click', function() {
    console.log('Clicked');
    userLetter = $inputText.val();
    console.log(userLetter);
    return userLetter;
  });

  const indices = [];
  const correctChars = underScoresNoWhite.split('');
  const incorrectChars = [];

  $guessButton.on('click', function () {

  // log index number of userLetter in currentWord with each turn,
  // make correctChars array to store correctChars
  // loop through correctChars

    // if user letter matches any of the currentword letters, push to index array, then make correctChars equal the userLetter

    for(var i=0; i<correctChars.length;i++) {
      if (currentWord[i] === userLetter) {
        indices.push(i);
        correctChars[i] = userLetter;
        check = true;
      //remake string with spaces
        correctCharsSpace = correctChars.join(' ');
        $displayWord.text(correctCharsSpace);
// if the first part of the loop didn't run returns the letter to the incorrectguess box.
      }
    }

    if (!currentWord.includes(userLetter)) {
      incorrectChars.push(userLetter);
          // incorrectCharsSpace = incorrectChars.join(' ');
      $incorrectGuess.text(incorrectChars);
    }
//add loop over the array, as length changes, change image 



      //if the length of indices === length of current word then win,

    console.log(indices);
    console.log(correctChars);
    console.log(userLetter);
    console.log(incorrectChars);
    console.log(check);
    console.log(turns);


  });



//reset for new game. DOESN'T WORK
  function resetBoard() {
  //clear the guesses
    clearInterval($inputText);
    clearInterval($incorrectGuess);
  }

  $reset.on('click',resetBoard);


});
