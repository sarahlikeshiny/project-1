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
  const words = ['cat', 'dog', 'horse', 'penguin'];
  const $displayWord =$('.word');
  const $guessButton = $('#guess');
  const $inputText =$('textarea');
  let $userLetter = '';



//randomly select a word from the array - currentWord - WORKS
  const currentWord = words[Math.floor(Math.random() * words.length)];
  console.log(currentWord);

//symbolise letters from the word selected and display on the screen -WORKS
  const underScores = currentWord.replace(/[a-z]/g, ' _');
  $displayWord.text(underScores);
  console.log(underScores);



//guess button, on click, capture user input. - WORKS

  $guessButton.on('click', function() {
    console.log('Clicked');
    $userLetter = $inputText.val();
    console.log($userLetter);
    return $userLetter;
  });

//compare input to word - starts on window load? always returns a match, also needs to loop round the whole string

  for (let i = 0; i < currentWord.length; i ++) {
    if (currentWord.includes(($userLetter.toLowerCase())===true) {
      console.log('a match');
    } else {
      console.log('no match');
    }
  }

//if letter is in word, replace underscore with letter

//else add letter to p.incorrect, and add 1 to turns, and update gallows picture

//when turns = 7, or word is complete finish game, add text 'you win' or 'you lose' to
});
