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
  const $incorrectChars=$('.incorrect');
  let turns = 0;



//randomly select a word from the array - currentWord - WORKS
  const currentWord = words[Math.floor(Math.random() * words.length)];
  console.log(currentWord);

//symbolise letters from the word selected and display on the screen -WORKS
  const underScores = currentWord.replace(/[a-z]/g, ' _');
  $displayWord.text(underScores);
  console.log(underScores);



//guess button, on click, capture user input. - WORKS
  let userLetter = '';

  $guessButton.on('click', function() {
    console.log('Clicked');
    userLetter = $inputText.val();
    console.log(userLetter);
    return userLetter;
  });

//compare input to word - starts on window load? always returns a match, also needs to loop round the whole string
//split string (string.split), then check for matches with the input character (index.of), then if a match, display character and of not display character in the incorrect answer area. -WORKS

  const currentWordChars = currentWord.split('');
  console.log(currentWordChars);

  if (turns <=7) {
  $guessButton.on('click', function () {
    for (let i = 0; i < currentWordChars.length; i ++)
      if (currentWordChars.indexOf(userLetter) >-1 ){
        console.log('a match');
        $displayWord.text(userLetter.toUpperCase());
//replace dashes with the letter that has been matched, in the correct position in the word.

      } else {
        console.log('no match');
        $incorrectChars.text(userLetter.toUpperCase());
        turns ++;
      }
  });
  }




//if letter is in word, replace underscore with letter

//else add letter to p.incorrect, and add 1 to turns, and update gallows picture

//when turns = 7, or word is complete finish game, add text 'you win' or 'you lose' to
});
