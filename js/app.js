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
  const $winLoseMsg = $('.word');
  const $picture = $('img');
  let userLetter= '';
  let correctCharsSpace =[];
  const $images = new Array();
  // $images[0]= new Image();
  // $images[0].src='./images/step-zero.png';
  $images[1]= new Image();
  $images[1].src='./images/step-one.png';
  $images[2]= new Image();
  $images[2].src='./images/step-two.png';
  $images[3]= new Image();
  $images[3].src='./images/step-three.png';
  $images[4]= new Image();
  $images[4].src='./images/step-four.png';
  $images[5]= new Image();
  $images[5].src='./images/step-five.png';
  $images[6]= new Image();
  $images[6].src='./images/step-six.png';
  $images[7]= new Image();
  $images[7].src='./images/step-seven.png';




// ------------New Game----------------------------
  $reset.on('click', function () {
    location.reload(true);
  });

//select word at random
  const currentWord = words[Math.floor(Math.random() * words.length)];
  console.log(currentWord);

//create underscores for display
  const underScores = currentWord.replace(/[a-z]/g, ' _');
  $displayWord.text(underScores);
  // console.log(underScores.length);
  const underScoresNoWhite = underScores.replace(/\s/g, '');
  // console.log(underScoresNoWhite.length);



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
    }
    //display pictures.
    if (incorrectChars.length === 1){
      $picture.attr($images[1]);
    } else if (incorrectChars.length === 2){
      //picture 2
      $picture.attr($images[2]);
    } else if (incorrectChars.length === 3){
      //picture 3
      $picture.attr($images[3]);
    } else if (incorrectChars.length === 4){
      //picture 4
      $picture.attr($images[4]);
    } else if (incorrectChars.length === 5){
      //picture 5
      $picture.attr($images[5]);
    } else if (incorrectChars.length === 6){
      //picture 6
      $picture.attr($images[6]);
    } else if (incorrectChars.length === 7){
      //picture 7
      $picture.attr($images[7]);
      $winLoseMsg.text('Sorry You Lose');
    }

  });


  // timed mode
  // on button press, activate timer,every 5 secs lose a life, for every correct answer pause clock for 5 secs.

  // ------------------TIMER----------------------------
  const $timedMode= $('#timed');
  const $timer = $('.timer');
  // // const $timerScreen = $timer.find('.screen');
  // // const $startStopBtn = $timer.find('#startStop');
  // // const $resetBtn = $timer.find('#reset');
  //
  //
  // // add event listeners to $startStopBtn & $resetBtn
  //
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
//stop timer at 0 and change image to final and add lose message
        if(timeRemaining === 0) {
          clearInterval(timerId);
          $picture.attr('src','../images/step-seven.png');
          $winLoseMsg.text('Sorry You Lose');
        }
      }, 1000);
      timerIsRunning = true;
    }
  }

  //------------SPEED MODE FUNCTION------------
  // function changeImage (){
  //   for (let i = 0; i<= $images.length; i++ ){
  //     $picture.attr('src', $images[i]);
  //     console.log($images[i]);
  //   }
  //   setInterval(changeImage,5000);
  // }


//fade next image in every 5 seconds
  // let $img = $images, i = 0, speed = 100;
  // window.setInterval(function() {
  //     $img.attr('src', $images[(++i % $images.length)]);
  //   });
  // }, 5000);
  $timedMode.on('click', startStopTimer);
  // $timedMode.on('click', changeImage);

});


//once hangman is hanged dont allow any more letters to be input
//once a letter is used dont allow this to be input against
//
