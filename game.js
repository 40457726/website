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
        question: 'Who is Frodos loyal friend who journeyed with him from Middle Earth to Mount Doom?',
        choice1:'Gollum/Sméagol',
        choice2:'Sam',
        choice3:'Aragorn',
        choice4:'The Prince',
        answer: 2,
    },
    {
        question: 'What is the name of the Elven character with the blonde hair and blue eyes who was lethal with a bow and charming with his looks?',
        choice1:'Legolas',
        choice2:'Pippin',
        choice3:'Frodo',
        choice4:'Arwin',
        answer: 1,
    },    {
        question: 'The Lord of the Rings films are based on a novel written by which author?',
        choice1:'New Line Cinema',
        choice2:'Christopher Tolkien',
        choice3:'J.R.R. Tolkien',
        choice4:'George R.R. Martin',
        answer: 3,
    },    {
        question: 'What is the name of the mountain where the Master Ring was made?',
        choice1:'Ural Mountain',
        choice2:'Mount Doom',
        choice3:'Mountain Of Pain',
        choice4:'Vulcano Mountain',
        answer: 2,
    },    {
        question: 'What is the title of the second movie in the trilogy?',
        choice1:'Friends Forever',
        choice2:'The Second Adventure',
        choice3:'Two Towers: The Battle',
        choice4:'The Lord of the Rings: The Two Towers',
        answer: 4,
    },    {
        question: 'Who striked The One Ring with his axe, in an attempt to destroy it?',
        choice1:'Gimli',
        choice2:'Saruman',
        choice3:'The Axe Warrior',
        choice4:'Balrog',
        answer: 1,
    },    {
        question: 'Who used to own the Ring of Power until Bilbo Baggins picked it up in the cave?',
        choice1:'Gollum/Sméagol',
        choice2:'Frodo',
        choice3:'The Orc',
        choice4:'Shelob',
        answer: 1,
    },    {
        question: 'What frightened the Orcs in the Mines of Moria?',
        choice1:'Rogue Orcs',
        choice2:'Dwarves',
        choice3:'Elves',
        choice4:'Balrog',
        answer: 4,
    },    {
        question: 'Name the spider, the fictional demon that Frodo fought bravely to recover the One Ring?',
        choice1:'Uruk-hai',
        choice2:'Shelob',
        choice3:'Gandalf',
        choice4:'Elrond',
        answer: 2,
    },    {
        question: ' In The Lord Of The Rings: The Return Of The King, which army does Aragorn summon using the Sword of Elendil?',
        choice1:'Elves',
        choice2:'Army of Orcs',
        choice3:'The Army of the Dead',
        choice4:'Monsters',
        answer: 3,
    },
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

const questionsIndex = Math.floor(Math.random() * availableQuestions.lenght)
currentQuestion = availableQuestions[questionsIndex]
question.innerText = currentQuestion.question

choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
})

availableQuestions.splice(questionsIndex, 1)

acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
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