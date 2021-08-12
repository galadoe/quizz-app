const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: 'How many member are in BTS?',
    choice1: '8',
    choice2: '7',
    choice3: '10',
    choice4: '6',
    answer: 2
  },
  {
    question: 'When did Enhypen debut?',
    choice1: 'Jan. 1st, 2021',
    choice2: 'Aug. 17th, 2020',
    choice3: 'Nov 30th, 2020',
    choice4: 'June 13th, 2019',
    answer: 3
  },
  {
    question: 'Whose the leader in Ateez?',
    choice1: 'HongJoong',
    choice2: 'Mingi',
    choice3: 'Wooyoung',
    choice4: 'Yeosan',
    answer: 1
  },
  {
    question: 'The maknae line in BTS',
    choice1: 'RM, Jin, Suga, J-hope',
    choice2: 'Suga, Jimin, V',
    choice3: 'RM, Jimin, JungKook',
    choice4: 'Jimin, V, JungKook',
    answer: 4
  },
  {
    question: 'How many members of Enhypen are not Korean?',
    choice1: '1',
    choice2: '3',
    choice3: '5',
    choice4: '4',
    answer: 2
  }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('/end.html')
  }

  questionCounter++
  progressText.innerText = `Question ${question} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
}

choice.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if(classToApply === 'correct'){
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()

    }, 1000)
  })
})

incrementScore = num => {
  score += num
  scoreText.innerText = score
}

startGame()
