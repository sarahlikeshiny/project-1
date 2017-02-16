console.log('js is connected - woo');
//to do;
//refactor, add key listeners rather than clicks., don;t allow any more entries after game over - disable not working?.
$(() => {

//global constants
  const words = ['cat', 'dog', 'horse', 'penguin', 'monkey'];
  const $displayWord =$('#word');
  // const $guessButton = $('#guess');
  const $inputText =$('textarea');
  const $incorrectGuess=$('.incorrect');
  const $reset=$('#reset');
  const $winLoseMsg = $('#word');
  const $picture = $('img');
  const $timedMode= $('#timed');
  const $showtimer = $('#timer');
  let correctCharsSpace =[];
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
  $timedMode.on('click', countDown);

//select word at random
  const currentWord = words[Math.floor(Math.random() * words.length)];
  console.log(currentWord);

//create underscores for display
  const underScores = currentWord.replace(/[a-z]/g, ' _');
  $displayWord.text(underScores);
  console.log(underScores);
  const underScoresNoWhite = underScores.replace(/\s/g, '');
  console.log(underScoresNoWhite.length);

//click guess button, capture user input, check for duplicates
  let userLetter = '';

  $inputText.on('keyup', function (e){
    if (e.keyCode === 13) {
      userLetter = $inputText.val();
    }
    return userLetter;
  });

  $inputText.on('keyup', function (e) {
    if (e.keyCode === 13) {
      console.log(userLetter);
      checkMatch();
      winLose();
    }
  });

  const indices = [];
  const correctChars = underScoresNoWhite.split('');
  const incorrectChars = [];

  function checkMatch (){
    for(var i=0; i<correctChars.length;i++) {
      if (currentWord[i] === userLetter) {
        indices.push(i);
        console.log(correctChars);
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
  }

  function winLose () {
    if (indices.length === currentWord.length) {
      console.log('win');
      $winLoseMsg.text('You Win!');
      $inputText.disabled=true;
      console.log($inputText.disabled);
    } else {
      const image = `images/${images[incorrectChars.length]}`;
      $picture.attr('src', image);
      if(incorrectChars.length === 7) {
        $winLoseMsg.text('Sorry You Lose');
        $inputText.disabled =true;
        console.log(image);
      }
    }
  }

// ------------------TIMER----------------------------

  let timeRemaining = 35;
  let timerIsRunning = false;
  let timerId = null;

  function countDown() {
    if(timerIsRunning) {
      clearInterval(timerId);
      timerIsRunning = false;
    } else {
      timerId = setInterval(() => {
        timeRemaining--;
        $showtimer.text(timeRemaining);
        if(timeRemaining === 10){
          $showtimer.css('color', 'red');
        }
        if(timeRemaining === 0) {
          clearInterval(timerId);
        }
      }, 1000);
      timerIsRunning = true;
    }
  }

  // // // ------------SPEED MODE FUNCTION------------
  function startStopTimer (){
    console.log('startStopTimer');
    let i = 1;
    const timerId = setInterval(() => {
      $picture.attr('src', `images/${images[i]}`);

      if(i === 7) {
        clearInterval(timerId);
        $winLoseMsg.text('Game over!');
        $inputText.disabled =true;
      }
      i++;
    }, 5000);
  }

});
