let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer1": "Robbie Williams",
        "answer2": "Lady Gaga",
        "answer3": "Tim Berners-Lee",
        "answer4": "Justin Bieber",
        "rightAnswer": 3
    },
    {
        "question": "Was bedeutet das HTML Tag &lt;a&gt;?",
        "answer1": "Text Fett",
        "answer2": "Container",
        "answer3": "Ein Link",
        "answer4": "Kursiv",
        "rightAnswer": 3
    },
    {
        "question": "Wie bindet man eine Website in eine Website ein?",
        "answer1": "&lt;iframe&gt;,&lt;frame&gt;, and &lt;frameset&gt; ",
        "answer2": "&lt;iframe&gt;",
        "answer3": "&lt;frame&gt;,",
        "answer4": "&lt;frameset&gt;,",
        "rightAnswer": 2
    },
    {
        "question": "Welches Attribut kann man NICHT für Textarea verwenden?",
        "answer1": "readonly",
        "answer2": "max",
        "answer3": "from",
        "answer4": "spellcheck",
        "rightAnswer": 1
    },
    {
        "question": "Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem Attribut title aus?",
        "answer1": "a[title]{...}",
        "answer2": "a > title {...}",
        "answer3": "a.title {...}",
        "answer4": "a=title {...}",
        "rightAnswer": 1
    },
    {
        "question": "Wie definiert man in JavaScript eine Variable?",
        "answer1": "let 100 = rate;",
        "answer2": "100 = let rate",
        "answer3": "rate = 100;",
        "answer4": "let rate = 100",
        "rightAnswer": 4
    }
];

let currentQuestion = 0;
let correctAnswers = 0;
let AUDIO_SUCCESS = new Audio('audio/correctAnswer.mp3')
let AUDIO_FAIL = new Audio('audio/wrongAnswer.mp3')
let AUDIO_END = new Audio('audio/winSound.mp3')


function init() {
    currentQuestion = 0;
    correctAnswers = 0;
    let allQuestions = document.getElementById('allQuestions').innerHTML = questions.length;;
    showQuestion();
}

function showQuestion() {
    if (gameIsOver()) {
        endOfQuiz();

    } else {
        updateProgress();
        renderNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function renderNextQuestion() {
    let current = questions[currentQuestion];
    document.getElementById('endscreen').style = 'display: none';
    document.getElementById('cardRight').style = ``;
    document.getElementById('questionText').innerHTML = current['question'];
    document.getElementById('answer1').innerHTML = current['answer1'];
    document.getElementById('answer2').innerHTML = current['answer2'];
    document.getElementById('answer3').innerHTML = current['answer3'];
    document.getElementById('answer4').innerHTML = current['answer4'];
}

function updateProgress() {
    let percent = currentQuestion / questions.length * 100;
    document.getElementById('progressBar').innerHTML = percent.toFixed(0) + `%`;
    document.getElementById('progressBar').style.width = percent + `%`;
    document.getElementById('currentQuestion').innerHTML = currentQuestion + 1;
}

function endOfQuiz() {
    document.getElementById('cardRight').style = 'display: none';
    document.getElementById('endscreen').style = ``;
    document.getElementById('allQuestionsEndscreen').innerHTML = questions.length;
    document.getElementById('correctAnswers').innerHTML = correctAnswers;
    document.getElementById('cardLeft').innerHTML += generateButtonHTML();
    AUDIO_END.volume = 0.3;
    AUDIO_END.play();
}

function answer(answer) {
    let rightAnswer = questions[currentQuestion]['rightAnswer'];
    let selectedAnswer = answer.slice(-1);
    let idOfRightAnswer = `answer${rightAnswer}`
    if (theAnswerIsCorrect(selectedAnswer, rightAnswer)) {
        correctAnswer(answer);
    } else {
        wrongAnswer(answer, idOfRightAnswer);
    }   
    lockAnswers();
}

function theAnswerIsCorrect(selectedAnswer, rightAnswer) {
    return selectedAnswer == rightAnswer;
}

function correctAnswer(answer) {
    document.getElementById(answer).parentNode.classList.add('bg-success');
    correctAnswers++;
    AUDIO_SUCCESS.volume = 0.3;
    AUDIO_SUCCESS.play();
}

function wrongAnswer(answer, idOfRightAnswer) {
    document.getElementById(answer).parentNode.classList.add('bg-danger');
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    AUDIO_FAIL.volume = 0.3;
    AUDIO_FAIL.play();
}

function lockAnswers(){
    const answerBoxes = document.querySelectorAll('[id^="answer"]') //jquerry
    for (let i = 0; i < answerBoxes.length; i++) {
        const answer = answerBoxes[i];
        answer.parentNode.classList.add('disabled');
    }
    document.getElementById('buttonNext').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    resetAnswerButtons();
    document.getElementById('buttonNext').disabled = true;
    showQuestion();
    document.getElementById('currentQuestion').innerHTML = currentQuestion + 1;
}

function resetAnswerButtons() {
    for (let index = 1; index < questions.length - 1; index++) {
        const element = $(`answer${index}`);
        element.parentNode.classList.remove('bg-danger');
        element.parentNode.classList.remove('bg-success');
        element.parentNode.classList.remove('disabled');
    }
}

function $(id) {
    return document.getElementById(id);
}

function startAgain() {
    document.getElementById('buttonContainer').outerHTML = ``;
    init();
}


function generateButtonHTML() {
    return /* html */ ` <div class="btn btn-success" id="buttonContainer">
                        <button type="button" class="btn btn-success" id="startAgainButton" onclick="startAgain()">Neue Runde</button>
                    </div>
                    `;
}