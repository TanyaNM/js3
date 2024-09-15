let container_main = document.querySelector('.main');
let container_start = document.querySelector('.start');
let container_start_h3 = container_start.querySelector('h3');
let question_field = document.querySelector('.question');
let answer_buttons = document.querySelectorAll('.answer');
let start_btn = document.querySelector('.start-btn');

class Question {
    constructor(question, answer_1, answer_2, answer_3, correct, answer_5) {
        this.question = question;
        this.correct = correct;
        this.answers = [
            answer_1,
            answer_2,
            answer_3,
            this.correct,
            answer_5,
        ];
    }

    display() {
        question_field.innerHTML = this.question;

        for (let i = 0; i < this.answers.length; i += 1) {
            answer_buttons[i].innerHTML = this.answers[i];
        }
    }
}
let questions = [
     new Question("5+5", "4", "6", "2", "10", "11"),
     new Question("6-3", "5", "2", "7"," 3", "8"),
     new Question("7*10", "7", "50", "30", "70", "80"),
     new Question("7+2", "4", "5", "6", "9", "8"),
     new Question("6+5", "8", "9", "10", "11", "110"),
     new Question("100-50", "40", "60", "70", "50", "70"),
     new Question("100*100", "865", "987", "56", "10000", "4"),
     new Question("50-6", "68", "37", "98", "44", "78"),
     new Question("20-7", "300", "99", "45", "14", "98")
]
let correct_answers_given;
let total_answers_given;
let current_question_index = 0;

start_btn.addEventListener('click', function() {
    container_main.style.display = 'flex';
    container_start.style.display = 'none';
    
    correct_answers_given = 0;
    total_answers_given = 0;
    current_question_index = 0;

    displayCurrentQuestion();

    setTimeout(function() {
        container_main.style.display = 'none';
        container_start.style.display = 'flex';
        container_start_h3.innerHTML = `<h3>Ви дали ${correct_answers_given} правильних відповідей із ${total_answers_given}. Точність - ${Math.round(correct_answers_given * 100 / total_answers_given)}%.</h3>`;
    }, 1000000);
});

for (let i = 0; i < answer_buttons.length; i += 1) {
    answer_buttons[i].addEventListener('click', function() {
        if (answer_buttons[i].innerHTML === questions[current_question_index].correct) {
            correct_answers_given += 1;
            answer_buttons[i].style.background = '#00FF00';
            anime({
                targets: answer_buttons[i],
                background: '#a1afb4',
                duration: 500,
                delay: 100,
                easing: 'linear'
            });
        } else {
            answer_buttons[i].style.background = '#FF0000';
            anime({
                targets: answer_buttons[i],
                background: '#a1afb4',
                duration: 500,
                delay: 100,
                easing: 'linear'
            });
        }
        total_answers_given += 1;

        current_question_index += 1;

        if (current_question_index < questions.length) {
            displayCurrentQuestion();
        } else {
            // End of quiz, hide the main container and show the result
            container_main.style.display = 'none';
            container_start.style.display = 'flex';
            container_start_h3.innerHTML = `<h3>Ви дали ${correct_answers_given} правильних відповідей із ${total_answers_given}. Точність - ${Math.round(correct_answers_given * 100 / total_answers_given)}%.</h3>`;
        }
    });
}

function displayCurrentQuestion() {
    questions[current_question_index].display();
}
