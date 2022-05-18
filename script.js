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

function init() {
    let allQuestions = document.getElementById('allQuestions').innerHTML = questions.length;;
    showQuestion();
}

function showQuestion() {
    if (current >= questions) {

    } else {
        let current = questions[currentQuestion];
        document.getElementById('questionText').innerHTML = current['question'];
        document.getElementById('answer1').innerHTML = current['answer1'];
        document.getElementById('answer2').innerHTML = current['answer2'];
        document.getElementById('answer3').innerHTML = current['answer3'];
        document.getElementById('answer4').innerHTML = current['answer4'];
    }
}

function answer(answer) {
    let rightAnswer = questions[currentQuestion]['rightAnswer'];
    let selectedAnswer = answer.slice(-1);
    let idOfRightAnswer = `answer${rightAnswer}`
    if (selectedAnswer == rightAnswer) {
        console.log('right');
        document.getElementById(answer).parentNode.classList.add('bg-success');
    } else {
        document.getElementById(answer).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
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
    document.getElementById('answer1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer1').parentNode.classList.remove('bg-success');
    document.getElementById('answer2').parentNode.classList.remove('bg-success');
    document.getElementById('answer3').parentNode.classList.remove('bg-success');
    document.getElementById('answer4').parentNode.classList.remove('bg-success');
}