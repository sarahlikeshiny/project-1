console.log('js is connected - woo');
//to do;
 // don;t allow any more entries after game over - disable not working?.
$(() => {

//---------------global constants--------------------------
  const words = ['cat', 'dog', 'horse', 'penguin', 'monkey'];
  const $displayWord =$('#word');
  const $inputText =$('textarea');
  const $incorrectGuess=$('.incorrect');
  const $reset=$('#reset');
  const $winLoseMsg = $('#word');
  const $picture = $('img');
  const $timedMode= $('#timed');
  const $showtimer = $('#timer');
  const $error =$('.error');
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
//-------------listen for click to activate timed mode.-----------------
  $timedMode.on('click', startStopTimer);
  $timedMode.on('click', countDown);

//---------------select word from array at random-------------------------
  const currentWord = words[Math.floor(Math.random() * words.length)];

//-------------------create underscores for display------------------------
  const underScores = currentWord.replace(/[a-z]/g, ' _');
  $displayWord.text(underScores);
  const underScoresNoWhite = underScores.replace(/\s/g, '');
  console.log(underScoresNoWhite.length);

//--------------listen to text area for return keypress and grab letter-------
  let userLetter = '';

  $inputText.on('keyup', function (e){
    if (e.keyCode === 13) {
      userLetter = $inputText.val();
    }
    return userLetter;
  });
//-----------listen for return keypress and run game functions----------
  $inputText.on('keyup', function (e) {
    if (e.keyCode === 13) {
      console.log(userLetter);
      checkRepeat();
      checkMatch();
      winLose();
    }
  });

  const indices = [];
  const correctChars = underScoresNoWhite.split('');
  const incorrectChars = [];

  // -------------Check is word contains guessed letter----------------
  function checkMatch (){
    for(var i=0; i<correctChars.length;i++) {
      if (currentWord[i] === userLetter) {
        indices.push(i);
        console.log(correctChars);
        correctChars[i] = userLetter;
        $inputText.val('');
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


// -----------------win lose condition--------------
  function winLose () {
    if (indices.length === currentWord.length) {
      $winLoseMsg.text('You Win!');
      $inputText.disabled = true;
    } else {
      const image = `images/${images[incorrectChars.length]}`;
      $picture.attr('src', image);
      if(incorrectChars.length === 7) {
        $winLoseMsg.text('Sorry You Lose');
        $inputText.disabled = true;
      }
    }
  }

  //------------check for repeated letters
  function checkRepeat() {
    if ((correctChars.length > 1 || incorrectChars.length >1) && correctChars.includes(userLetter) || incorrectChars.includes(userLetter)){
      $error.text('that letter has already been guessed');
    }
  }

// ------------------Timer----------------------------

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

  // ------------Speed mode function------------
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
