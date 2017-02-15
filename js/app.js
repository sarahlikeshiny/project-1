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
  const $winLoseMsg = $('h2');
  const $picture = $('img');
  let userLetter= '';
  let correctCharsSpace =[];


//need a function that clears the board and refreshes the word (exactly what refreshing the page does now)
  $reset.on('click', function () {
    location.reload(true);
  });

//randomly select a word from the array - currentWord - WORKS
  const currentWord = words[Math.floor(Math.random() * words.length)];
  console.log(currentWord);

//symbolise letters from the word selected and display on the screen
  const underScores = currentWord.replace(/[a-z]/g, ' _');
  $displayWord.text(underScores);
  // console.log(underScores.length);
  const underScoresNoWhite = underScores.replace(/\s/g, '');
  // console.log(underScoresNoWhite.length);



//guess button, on click, capture user input. - WORKS

  $guessButton.on('click', function() {
    console.log('Clicked');
    userLetter = $inputText.val();
    console.log(userLetter);
    // sort this out tomorrow
    // if (userLetter.length > 1){
    //   // userLetter=null;
    //   // alert('please enter a single letter only');

    return userLetter;

  });

  const indices = [];
  const correctChars = underScoresNoWhite.split('');
  const incorrectChars = [];

  $guessButton.on('click', function () {

    for(var i=0; i<correctChars.length;i++) {
      if (currentWord[i] === userLetter) {
        indices.push(i);
        correctChars[i] = userLetter;
        $inputText.val('');
      //remake string with spaces
        correctCharsSpace = correctChars.join(' ');
        $displayWord.text(correctCharsSpace);
      }
    }

    if (!currentWord.includes(userLetter)) {
      incorrectChars.push(userLetter);
      $incorrectGuess.text(incorrectChars);
      $inputText.val('');
    }

    // check for repeated letters
    if (userLetter === correctCharsSpace[i] || incorrectChars[i]){
      //set a message of some kind//
    }

//win/lose condition.
    if (indices.length === currentWord.length) {
      console.log('win');
      $winLoseMsg.text('You Win!');
    }
    //display pictures.
    if (incorrectChars.length === 1){
      $picture.attr('src','images/step one.png');
    } else if (incorrectChars.length === 2){
      //picture 2
      $picture.attr('src','images/step two.png');
    } else if (incorrectChars.length === 3){
      //picture 3
      $picture.attr('src','images/step three.png');
    } else if (incorrectChars.length === 4){
      //picture 4
      $picture.attr('src','images/step four.png');
    } else if (incorrectChars.length === 5){
      //picture 5
      $picture.attr('src','images/step five.png');
    } else if (incorrectChars.length === 6){
      //picture 6
      $picture.attr('src','images/step six.png');
    } else if (incorrectChars.length === 7){
      //picture 7
      $picture.attr('src','images/step seven.png');
      $winLoseMsg.text('Sorry You Lose');
    }

  });

  // timed mode
  // on button press, activate timer,every 15 secs lose a life, for every correct answer pause clock for 15 secs.

  // TIMER
  const $timedMode= $('#timed');
  const $timer = $('.timer');
  // const $timerScreen = $timer.find('.screen');
  // const $startStopBtn = $timer.find('#startStop');
  // const $resetBtn = $timer.find('#reset');


  // add event listeners to $startStopBtn & $resetBtn

  let timeRemaining = 30;
  let timerIsRunning = false;
  let timerId = null;


  function startStopTimer() {
    // stop the timer if it is running
    if(timerIsRunning) {
      clearInterval(timerId);
      timerIsRunning = false;
    } else {
      // start the timer if it is NOT running
      timerId = setInterval(() => {
        timeRemaining--;
        $timer.text(timeRemaining);

        if(timeRemaining === 0) {
          clearInterval(timerId);
          $picture.attr('src','images/step seven.png');
        }
      }, 1000);
      timerIsRunning = true;
    }
  }
  $timedMode.on('click', startStopTimer);
});
var t1;
t1 =setTimeout(,1000) //1000 = 1 sec

clearTimeout(t1);
