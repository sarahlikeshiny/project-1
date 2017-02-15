console.log('js is connected - woo');

$(() => {

//global constants
  const words = ['cat', 'dog', 'horse', 'penguin', 'monkey'];
  const $displayWord =$('.word');
  const $guessButton = $('#guess');
  const $inputText =$('textarea');
  const $incorrectGuess=$('.incorrect');
  const $reset=$('#reset');
  const $winLoseMsg = $('.word');
  const $picture = $('img');
  const $timedMode= $('#timed');
  const $showtimer = $('.timer');
  let userLetter= '';
  let correctCharsSpace =[];
  let timerOn = false;
  const images = [
    'step-zero.png',
    'step-one.png',
    'step-two.png',
    'step-three.png',
    'step-four.png',
    'step-five.png',
    'step-six.png',
    'step-seven.png'
  ];




// ------------New Game----------------------------
  $reset.on('click', function () {
    location.reload(true);
  });
//listen for click to activate timed mode.
  $timedMode.on('click', startStopTimer);

//select word at random
  const currentWord = words[Math.floor(Math.random() * words.length)];
  console.log(currentWord);

//create underscores for display


  const underScores = currentWord.replace(/[a-z]/g, ' _');
  $displayWord.text(underScores);
  // console.log(underScores.length);
  const underScoresNoWhite = underScores.replace(/\s/g, '');
  // console.log(underScoresNoWhite.length);
  // (function typeWriter() {
  //   const timeOut = setTimeout(function() {
  //     underScores++;
  //     var type = underScores.substring(0, underScores);
  //     $displayWord.text(type);
  //     typeWriter();
  //
  //     if (underScores === length) {
  //       clearTimeout(timeOut);
  //     }
  //
  //   }, 110);

  // }());

//click guess button, capture user input, check for duplicates

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
//check for correct answer, display string with correct letters.
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
//if letter is not present, add to incorrect guesses box
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
    } //the timer version need to go here, need to do this bit unless the timer is pressed then do the other bit.
    if (timerOn === false) {
      const image = `images/${images[incorrectChars.length]}`;
      $picture.attr('src', image);
      if(incorrectChars.length === 7) {
        $winLoseMsg.text('Sorry You Lose');
      }
    }
  });

// ------------------TIMER----------------------------

  let timeRemaining = 30;
  let timerIsRunning = false;
  let timerId = null;


//   function startStopTimer() {
//   // stop the timer if it is running
//     if(timerIsRunning) {
//       clearInterval(timerId);
//       timerIsRunning = false;
//     } else {
//     // start the timer if it is NOT running
//       timerId = setInterval(() => {
//         timeRemaining--;
//         $showtimer.text(timeRemaining);
// //stop timer at 0 and change image to final and add lose message
//         if(timeRemaining === 0) {
//           clearInterval(timerId);
//           $picture.attr('src','../images/step-seven.png');
//           $winLoseMsg.text('Sorry You Lose');
//         }
//       }, 1000);
//       timerIsRunning = true;
//     }
//   }

  // // ------------SPEED MODE FUNCTION------------
  function startStopTimer (){
    console.log('startStopTimer');
    let i = 1;
    const timerId = setInterval(() => {
      $picture.attr('src', `images/${images[i]}`);

      if(i === 7) {
        clearInterval(timerId);
        console.log('Game over!');
      }

      i++;
    }, 500);

  }

  // if (timerOn === true) {
  //   changeImage();
  //   startStopTimer();
  // }

  // $timedMode.on('click', startStopTimer);
// $timedMode.on('click', changeImage);

});

//once hangman is hanged dont allow any more letters to be input
//once a letter is used dont allow this to be input against
//
