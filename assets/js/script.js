var quizInfoEl = document.querySelector("#quiz-info");
var quizEl = document.querySelector("#quiz-container");
var refreshWindowEl = document.querySelector("#refresh-window");
var startQuizBtnEl = document.querySelector("#start-quiz-btn");

var seconds = document.getElementById("countdown").textContent;
var questionIndex = 0;

var userInfo = {
    userInitials: "",
    userScore: 0
};

var testInfo = {
    testQuestions: ["Question 1", 
                    "Question 2", 
                    "Question 3"],
    testAnswerA: ["Question 1 Answer A", 
                    "Question 2 Answer A", 
                    "Question 3 Answer A"],
    testAnswerB: ["Question 1 Answer B", 
                    "Question 2 Answer B", 
                    "Question 3 Answer B"],
    testAnswerC: ["Question 1 Answer C", 
                    "Question 2 Answer C", 
                    "Question 3 Answer C"],
    testAnswerUser: ["",
                    "",
                    ""],
    testAnswerActual: ["a",
                    "b",
                    "c"]
};

var refresh = function (idToRefresh) {
    idToRefresh.innerHTML='';
}

var createClearWindow = function () {

    var containerEl = document.createElement("div");
    containerEl.className = "window-container";

    refreshWindowEl.appendChild(containerEl);

    return containerEl;
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

// checks user answer against actual answer and checks if out of time for answer
var checkAnswer = function() {
    if (testInfo.testAnswerActual[questionIndex] === testInfo.testAnswerUser[questionIndex] & seconds>0) {
        return true;
    } else  if (seconds<=0) {
        endQuiz();
    } else {
        return false;
    }
}

// if user answer correct; adds 1 to score, if user answer incorrect subtracts 1 from 
// score and subtracts 10 seconds from timer
var keepScore = function(correct) {
    switch (correct) {
        case true:
            userInfo.userScore++;
            window.alert("Correct! Score = " + userInfo.userScore);
            break;
        case false:
            seconds -= 10;
            window.alert("Inorrect. 10 seconds have been deducted from your time. Score = " + userInfo.userScore);
            break;
        default:
          console.log("Something went wrong!");
      }
}

var endQuiz = function () {
    var quizFinish = true;
    finalTime = seconds; 
    // if the time <=0 and the last question hasn't been answered then the quiz wasn't finished
    if (seconds<=0 & !testInfo.testAnswerUser[9]) {
        seconds = 0;
        quizFinish = false;
    } 
    // saves the time before refreshWindow sets it back to 0
    
    refresh(refreshWindowEl);

    // create div container in a cleared out window to end of quiz info
    var containerEl = createClearWindow();

    var quizEndMessageEl = document.createElement("h1");
    if (quizFinish) { 
        quizEndMessageEl.textContent = "End of Quiz!"; 
    }
    else { 
        quizEndMessageEl.textContent = "Time is up!"
    }

    containerEl.appendChild(quizEndMessageEl);

    var quizSummaryEl = document.createElement("h2");
    quizSummaryEl.textContent = "You had a score of " + userInfo.userScore + " and finished with " + finalTime + " seconds to spare";
    containerEl.appendChild(quizSummaryEl);

}

// gets answer user chose for question after submit button hit (radio button chosen)
var getAnswer = function(event) {
    event.preventDefault();

    // checks which answer the user chose
    var answerA = document.getElementById("answer-a").checked;
    var answerB = document.getElementById("answer-b").checked;
    var answerC = document.getElementById("answer-c").checked;

    // correct notes whether the user got the answer correct
    var correct;

    // puts the user answer in the testInfo object
    if (answerA) {
        testInfo.testAnswerUser[questionIndex] = "a";
    } else if (answerB){
        testInfo.testAnswerUser[questionIndex] = "b";
    } else if (answerC) {
        testInfo.testAnswerUser[questionIndex] = "c";
    } else {
          console.log("Something went wrong!");
      }
   
    // checks if a radio box has been chosen
    if (!(answerA || answerB || answerC)) {
        window.alert("You need to submit an answer");
    } else if (questionIndex < (testInfo.testQuestions.length)) {
        // checks the user answer against the actual answer
        correct = checkAnswer(questionIndex);
        keepScore(correct);
        questionIndex++;
    } 

    // go back to the quiz for next question
    if (questionIndex < (testInfo.testQuestions.length) & seconds > 0) {
        startQuiz(event);
    // end of quiz
    } else {
        endQuiz();
    }
// end of getAnswer function
}

// puts test questions into form in HTML
var createTestQuestions = function(event) {

    event.preventDefault();

    // create div container in a cleared out window to hold question and form
    var containerEl = createClearWindow();
    
    // create question in h3
    var questionEl = document.createElement("h3");
    questionEl.className = "question";
    questionEl.textContent = testInfo.testQuestions[questionIndex];

    containerEl.appendChild(questionEl);

    // create form that will contain questions
    var formEl = document.createElement("form");
    formEl.id = "question-form";

    containerEl.appendChild(formEl);

    var answerArray = ['a', 'b', 'c'];
    
    // create radio buttons for answers A, B and C as loop through answerArray
    for (j = 0; j < (answerArray.length); j++) {
       
        var answerEl = document.createElement("input");
        var answerLabelEl = document.createElement("label");

        // creates radio buttons A, B and  C
        answerEl.type = "radio";
        answerEl.id = "answer-" + answerArray[j];
        answerEl.name = "question" + (questionIndex+1).toString();
        answerEl.value = "answer-" + answerArray[j];

        // creates labels for the radio buttons A, B and C
        answerLabelEl.for = "question" + (questionIndex+1).toString();
        answerLabelEl.textContent = eval('testInfo.testAnswer' + answerArray[j].toUpperCase() + '[questionIndex]');
        
        // break puts buttons on different lines
        var breakEl = document.createElement("br");

        // puts the answer choices (radio buttons and labels) into the html
        formEl.append(answerEl, answerLabelEl, breakEl);
    } 
   
    // creates submit button for each question
    var submitBtnEl = document.createElement("button")
    submitBtnEl.id = "submit-answer-btn";
    // the onclick for the submit button calls the getAnswer function which will
    // also create each of the new question -- this onclick is the listening event for
    // the submit button on the questions
    submitBtnEl.setAttribute("onclick", "getAnswer(event)");
    submitBtnEl.textContent = "Submit";

    // puts the submit button into the form
    formEl.append(submitBtnEl);

    // puts the form into the container
    containerEl.appendChild(formEl);
// end of createTestQuestions function
};

var startTimer = function () {
    var countdown = setInterval(function() {
        seconds--;
        if (seconds <= 0) {
            clearInterval(countdown);
            seconds = 0;
        }
        document.getElementById("countdown").textContent = seconds;
    }, 1000);    
}

var startQuiz = function(event) {
    event.preventDefault();
    // only start timer at first question
    if (questionIndex === 0) {
        startTimer();
    } 
   
    // clears out window for fresh question
    refresh(refreshWindowEl);
    // creates questions one at a time based on array monitored by questionIndex
    createTestQuestions(event);    
};


userPrompt();

startQuizBtnEl.addEventListener("click", startQuiz);



