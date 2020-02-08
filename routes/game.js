gameRoutes = (app) => {
  let goodAnswers = 0;
  let isGameOver = false;
  let callToAFriendUsed = false;
  let questioToCrowdUsed = false;
  let halfOnHalfUsed = false;

  const questions = [
    {
      question: '1. Which programming language is the best in the world, and why JS?',
      answers: ['C++', 'Python', 'JavaScript', 'Kotlin'],
      correctAnswer: 2,
      win: 500
    },
    {
      question: '2. Can anyone be a programmer?',
      answers: ['No', 'Yeah, this is easy', 'Yes, but this is a lot of hard work', 'Only "Math Mind'],
      correctAnswer: 2,
      win: 1000
    },
    {
      question: '3. What is Kotlin?',
      answers: ['Programming language for a game', 'Ketchup in Poland', 'Programming language for mobile app', 'I still think this is Ketchup'],
      correctAnswer: 2,
      win: 2000
    },
    {
      question: '4. What is Node.js?',
      answers: ['Programming language', 'Technology of BackEnd', 'Technology of FrontEnd', "A JavaScript runtime built on Chrome's V8 JavaScript engine"],
      correctAnswer: 3,
      win: 5000
    },
    {
      question: '5. Which type in JS, return True or False?',
      answers: ['String', 'Number', 'Boolean', 'Null'],
      correctAnswer: 2,
      win: 10000
    },
    {
      question: '6. Whith what problem, can we face in Arrow Function?',
      answers: ['What is Arrow Function?', 'With "this"', 'The same like in others function', "Problem with arguments and parameters"],
      correctAnswer: 1,
      win: 20000
    },
    {
      question: '7. What is "CallBack?',
      answers: ['Function given as an argument to another function', 'Nothing in JS', 'Method in JS', "Method in jQuery"],
      correctAnswer: 0,
      win: 40000
    },
    {
      question: '8. The most important part of React.js?',
      answers: ['Components', 'Props', 'State', "Variables"],
      correctAnswer: 0,
      win: 75000
    },
    {
      question: '9. What did you not remeber, when you localhost is jammes?',
      answers: ['res.end()', 'res.writeHeade', '"GET"', "req.method"],
      correctAnswer: 0,
      win: 125000
    },
    {
      question: '10. What is the most important thing in FrontEnd Developer Work?',
      answers: ['JavaScript skill', 'Framework skill', 'CSS skill', "StackOverFlow"],
      correctAnswer: 3,
      win: 250000
    },
    {
      question: '11. React is mainly for building ?',
      answers: ['Connectivity', 'DataBase', 'User Interface', "Design Platform"],
      correctAnswer: 2,
      win: 500000
    },
    {
      question: 'Which method in a React Component is called after the component is rendered for the first time?',
      answers: [' componentDidMount', ' componentDidUpdate', ' componentMounted', "componentUpdated"],
      correctAnswer: 0,
      win: 1000000
    }
  ]

  app.get('/question', (req, res) => {
    if (goodAnswers === questions.length) {
      res.json({
        winner: true,
      })
    } else if (isGameOver) {
      res.json({
        loser: true,
      })
    } else {
      const nextQuestion = questions[goodAnswers];
      const { question, answers, win } = nextQuestion;

      res.json({
        question, answers, win
      })
    }
  })

  app.post('/answers/:index', (req, res) => {

    if (isGameOver) {
      res.json({
        loser: true,
      })
    }

    const { index } = req.params;
    const question = questions[goodAnswers];

    const isGoodAnswer = question.correctAnswer === Number(index);

    if (isGoodAnswer) {
      goodAnswers++;
    } else {
      isGameOver = true;
    }

    res.json({
      correct: isGoodAnswer,
      goodAnswers
    })

  })

  app.get('/help/friend', (req, res) => {
    if (callToAFriendUsed === true) {
      return res.json({
        text: 'This aids, is already used!',
      })
    }
    callToAFriendUsed = true;
    const doesFriendKnowAnswer = Math.random() < 0.5;
    const question = questions[goodAnswers];
    res.json({
      text: doesFriendKnowAnswer ? `Hmm, I think the correct answer is ${question.answers[question.correctAnswer]}` : "Unfortunately I don't know the answer.."
    })
  })

  app.get('/help/half', (req, res) => {
    if (halfOnHalfUsed === true) {
      return res.json({
        text: 'This aids, is already used!',
      })
    }

    halfOnHalfUsed = true;
    const question = questions[goodAnswers];
    const answersCopy = question.answers.filter((answer, index) => (
      index !== question.correctAnswer
    ))
    const spliceRandomNumber = Math.floor(Math.random() * answersCopy.length);
    answersCopy.splice(spliceRandomNumber, 1); // ~~ this is like Math.floor()

    res.json({
      answerToRemove: answersCopy
    })
  })

  app.get('/help/crowd', (req, res) => {
    if (questioToCrowdUsed === true) {
      return res.json({
        text: 'This aids, is already used!',
      })
    }

    questioToCrowdUsed = true;
    const chart = [10, 20, 30, 40]

    for (let i = chart.length - 1; i > 0; i--) {
      const change = Math.floor(Math.random() * 20 - 10); // This is scope: min number 10 , max number 20
      chart[i] += change;
      chart[i - 1] -= change;
    }

    const question = questions[goodAnswers];
    const { correctAnswer } = question;

    [chart[3], chart[correctAnswer]] = [chart[correctAnswer], chart[3]]; // Replace correct Answer with last ( the highest ) answer in the array


    res.json({
      chart,
    })
  })

}

module.exports = gameRoutes;