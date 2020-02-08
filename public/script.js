const question = document.querySelector('#question');
const price = document.querySelector('#price')
const answers = document.querySelectorAll('.btnAns');
const gameBoard = document.querySelector('#gameBoard');
const goodAnsH2 = document.querySelector('.goodAns');
const tipH2 = document.querySelector('.tip')


fillQuestionElements = (data) => {
  if (data.winner === true) {
    gameBoard.style.display = 'none';
    goodAnsH2.innerText = 'Congratulations! You are a WINNER!';
    tipH2.innerText = `You Won 1 000 000$!`
    return;
  }

  if (data.loser === true) {
    gameBoard.style.display = 'none';
    goodAnsH2.innerText = 'Maybe next time!';
    return;
  }

  question.innerText = data.question
  answers.forEach((answer, index) => {
    answer.innerText = data.answers[index];
  })

  price.innerText = `${data.win}$`

}

showNextQuestion = () => {
  fetch('/question', {
    method: 'GET'// This is Default but...Let it Be
  })
    .then(data => data.json())
    .then(data => {
      fillQuestionElements(data)
    })
}

const goodAnswersSpan = document.querySelector('#goodAnswers')

handleAnswerFeedBack = (data) => {
  goodAnswersSpan.innerText = data.goodAnswers;
  showNextQuestion();
}

sendAnswers = (answerIndex) => {
  fetch(`/answers/${answerIndex}`, {
    method: 'POST',
  })
    .then(data => data.json())
    .then(data => {
      handleAnswerFeedBack(data);
    })
}

answers.forEach((answer, index) => {
  answer.addEventListener('click', (event) => {
    const answerIndex = event.target.dataset.answers // Get a Data-Answers Attribute property by dataset.'name of att"
    tipH2.innerText = '';
    sendAnswers(answerIndex)
  })
}) // Or do that with 'index' able in forEach method

handleFriendAnswer = (data) => {
  tipH2.innerHTML = data.text
}


callToAFriend = () => {
  callToAFriendID.innerText = 'USED';
  fetch('/help/friend', {
    method: 'GET',
  })
    .then(data => data.json())
    .then(data => {
      handleFriendAnswer(data);
    })
}

let callToAFriendID = document.querySelector('#callToAFriend')
callToAFriendID.addEventListener('click', callToAFriend)

handleHalfOnHalf = (data) => {
  if (typeof data.text === 'string') {
    tipH2.innerText = data.text
  } else {
    answers.forEach((answer) => {
      if (data.answerToRemove.indexOf(answer.innerText) > -1) {
        answer.innerText = 'Odrzucona'
      }
    })
  }
}

halfOnHalf = () => {
  halfonHalfBtn.innerText = 'USED';
  fetch('/help/half')
    .then(data => data.json())
    .then(data => {
      handleHalfOnHalf(data);
    })
}

let halfonHalfBtn = document.querySelector('#halfOnHalf');
halfonHalfBtn.addEventListener('click', halfOnHalf)

handleCrowdAnswer = (data) => {
  if (typeof data.text === 'string') {
    tipH2.innerText = data.text
  } else {
    data.chart.forEach((percent, index) => {
      answers[index].innerText = `${answers[index].innerText} : ${percent}%`
    })
  }
}

questionToCrowd = () => {
  crowd.innerText = 'USED';
  fetch('/help/crowd')
    .then(data => data.json())
    .then(data => {
      handleCrowdAnswer(data);
    })
}

let crowd = document.querySelector('#questionToCrowd')
crowd.addEventListener('click', questionToCrowd)

showNextQuestion();