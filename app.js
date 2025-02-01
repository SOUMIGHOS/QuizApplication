const quizData = [
    {
        question: "Which of the following is a client-side language?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "JavaScript Object Notation",
        d: "Helicopters Terminals Motorboats Lamborghinis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "None of the above",
        correct: "b",
    },
    {
        question: "What does CSS stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "JavaScript Object Notation",
        d: "Helicopters Terminals Motorboats Lamborghinis",
        correct: "b",
    }
];

let index = 0;
let correct = 0, incorrect = 0;
const total = quizData.length;

let questionBox = document.getElementById("questionBox");
let allInputs = document.querySelectorAll("input[type='radio']");

const loadQuestion = () => {
    if (index === total) {
        return quizEnd();
    }
    reset();
    
    const data = quizData[index];
    questionBox.innerHTML = `${index + 1}) ${data.question}`;
    
    allInputs[0].nextElementSibling.innerText = data.a;
    allInputs[1].nextElementSibling.innerText = data.b;
    allInputs[2].nextElementSibling.innerText = data.c;
    allInputs[3].nextElementSibling.innerText = data.d;
};

document.querySelector("#submit").addEventListener("click", function () {
    const ans = getAnswer();
    
    // Prevent proceeding if no option is selected
    if (!ans) {
        alert("Please select an answer before submitting.");
        return;
    }

    if (ans === quizData[index].correct) {
        correct++;
    } else {
        incorrect++;
    }

    index++;
    loadQuestion();
});

const getAnswer = () => {
    const selectedOption = [...allInputs].find(input => input.checked);
    return selectedOption ? selectedOption.value : null;
};

const reset = () => {
    allInputs.forEach(inputEl => inputEl.checked = false);
};

const quizEnd = () => {
    document.querySelector(".container").innerHTML = `
        <div class="col text-center">
            <h3 class="w-100">Hi, you've scored ${correct} / ${total} 🎉</h3>
            <button id="restart" class="btn btn-primary mt-3">Restart Quiz</button>
        </div>
    `;

    // Restart the quiz when the button is clicked
    document.getElementById("restart").addEventListener("click", function () {
        index = 0;
        correct = 0;
        incorrect = 0;
        document.querySelector(".container").innerHTML = `
            <h3 id="questionBox"></h3>
            <div class="col box">
                <input name="option" type="radio" id="first" value="a" required>
                <label for="first"></label>
            </div>
            <div class="col box">
                <input name="option" type="radio" id="second" value="b" required>
                <label for="second"></label>
            </div>
            <div class="col box">
                <input name="option" type="radio" id="third" value="c" required>
                <label for="third"></label>
            </div>
            <div class="col box">
                <input name="option" type="radio" id="fourth" value="d" required>
                <label for="fourth"></label>
            </div>
            <button id="submit" class="btn btn-success mt-3">Submit</button>
        `;

        // Reinitialize event listeners and questions
        allInputs = document.querySelectorAll("input[type='radio']");
        document.querySelector("#submit").addEventListener("click", function () {
            const ans = getAnswer();
            if (!ans) {
                alert("Please select an answer before submitting.");
                return;
            }

            if (ans === quizData[index].correct) {
                correct++;
            } else {
                incorrect++;
            }

            index++;
            loadQuestion();
        });

        loadQuestion();
    });
};

loadQuestion();
