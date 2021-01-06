//var quizInfoEl = document.querySelector("#quiz-info");
var quizEl = document.querySelector("#quiz-container");
var refreshWindowEl = document.querySelector("#refresh-window");
var userInfo = {
    userInitials: "",
    userScore: 0
};

var testInfo = {
    testQuestions: ["Question 1", 
                    "Question 2", 
                    "Question 3", 
                    "Question 4", 
                    "Question 5", 
                    "Question 6", 
                    "Question 7", 
                    "Question 8", 
                    "Question 9", 
                    "Question 10"],
    testAnswerA: ["Question 1 Answer A", 
                    "Question 2 Answer A", 
                    "Question 3 Answer A", 
                    "Question 4 Answer A", 
                    "Question 5 Answer A", 
                    "Question 6 Answer A", 
                    "Question 7 Answer A", 
                    "Question 8 Answer A", 
                    "Question 9 Answer A", 
                    "Question 10 Answer A"],
    testAnswerB: ["Question 1 Answer B", 
                    "Question 2 Answer B", 
                    "Question 3 Answer B", 
                    "Question 4 Answer B", 
                    "Question 5 Answer B", 
                    "Question 6 Answer B", 
                    "Question 7 Answer B", 
                    "Question 8 Answer B", 
                    "Question 9 Answer B", 
                    "Question 10 Answer B"],
    testAnswerC: ["Question 1 Answer C", 
                    "Question 2 Answer C", 
                    "Question 3 Answer C", 
                    "Question 4 Answer C", 
                    "Question 5 Answer C", 
                    "Question 6 Answer C", 
                    "Question 7 Answer C", 
                    "Question 8 Answer C", 
                    "Question 9 Answer C", 
                    "Question 10 Answer C"],
    testAnswerActual: ["Answer 1",
                    "Answer 2",
                    "Answer 3",
                    "Answer 4",
                    "Answer 5",
                    "Answer 6",
                    "Answer 7",
                    "Answer 8",
                    "Answer 9",
                    "Answer 10"]
};

var refresh = function (idToRefresh) {
    idToRefresh.innerHTML='';

}

// prompts for user initials
var userPrompt = function() {
    // to accomodate all name types only an empty string is rejected as name initials
    userInfo.Initials = window.prompt("Welcome to your Code Quiz Challenge! Please enter your initials.");
    if (!userInfo.Initials) {
        window.alert("You have not entered anything. Please try again.");
        userPrompt();
    };
};

// puts test questions into form in HTML
var createTestQuestions = function(index) {
   
   

    // create div container to hold question and form
    var containerEl = document.createElement("div");
    containerEl.className = "question-container";

    quizEl.appendChild(containerEl);

    // create question in h3
    var questionEl = document.createElement("h3");
    questionEl.className = "question";
    questionEl.textContent = testInfo.testQuestions[index];


    // create form that will contain questions
    var formEl = document.createElement("form");
    formEl.className = "question-form";

    var answerArray = ['a', 'b', 'c'];
    console.log(answerArray);
    
    for (j = 0; j < answerArray.length; j++) {
       
         // create radio button for answer A
        var answerEl = document.createElement("input");
        answerEl.type = "radio";
        answerEl.id = "answer-" + answerArray[j].value;
        answerEl.name = "question" + (index+1).toString();
        answerEl.value = "answer-" + answerArray[j].value;

        var answerLabelEl = document.createElement("label");
        answerLabelEl.for = "question" + (index+1).toString();
        answerLabelEl.textContent = eval('testInfo.testAnswer' + answerArray[j].toUpperCase() + '[index]');
 
        var breakEl = document.createElement("br");

        console.log(answerEl, answerLabelEl);

        formEl.append(answerEl, answerLabelEl, breakEl);
    } 

    var submitEl = document.createElement("label");
    submitEl.type = "submit";
    submitEl.textContent = "Submit";

    containerEl.append(questionEl,formEl, submitEl);

};


var startQuiz = function(event) {
    refresh(refreshWindowEl);
    for (i=0 ; i < testInfo.testQuestions.length; i++) {
        //event.preventDefault();
        //document.body.innerHTML = '';
        createTestQuestions(i);
    }
    
};


userPrompt();

quizEl.addEventListener("click", startQuiz);
