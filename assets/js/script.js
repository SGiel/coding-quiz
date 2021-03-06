var quizInfoEl = document.querySelector("#quiz-info");
var quizEl = document.querySelector("#quiz-container");
var refreshWindowEl = document.querySelector("#refresh-window");
var startQuizBtnEl = document.querySelector("#start-quiz-btn");
var saveHighScoreBtnEl = document.querySelector("#save-high-score-btn");
var linkToHighScoresEl = document.querySelector("#link-to-high-scores");

var seconds = document.getElementById("countdown").textContent;
var questionIndex = 0;

// user initials and high scores will be saved in highScores
var highScores = [];

var userInfo = {
    userInitials: "",
    userScore: 0,
    isUserHighScore: false
};

var testInfo = {
    testQuestions: ["String values must be enclosed within _______ when being assigned to variables", 
                    "Commonly used data types DO NOT Include:", 
                    "Arrays in JavaScript can be used to store",
                    "The condition in an if / else statement is enclosed with _______",
                    "A very useful tool during development and debugging for printing content to the debugger is"],
    testAnswer1: ["1. commas", 
                    "1. strings", 
                    "1. numbers and strings",
                    "1. quotes",
                    "1. JavaScript"],
    testAnswer2: ["2. curly brackets", 
                    "2. booleans", 
                    "2. other arrays",
                    "2. curly brackets",
                    "2. terminal/bash"],
    testAnswer3: ["3. quotes", 
                    "3. alerts", 
                    "3. booleans",
                    "3. parenthesis",
                    "3. for loops"],
    testAnswer4: ["4. parenthesis", 
                    "4. numbers", 
                    "4. all of the above",
                    "4. square brackets",
                    "4. console.log"],
    testAnswerUser: ["",
                    "",
                    "",
                    "",
                    ""],
    testAnswerActual: ["3",
                    "3",
                    "4",
                    "3",
                    "4"]
};

// presents high scores when user clicks button in top left
var seeHighScores = function() {
    var savedHighScores = localStorage.getItem("highScores");
    //var scoreListEl = document.createElement("p");
    var highScoresList = '';
    if (!savedHighScores) {
        alert('there are no high scores yet.')
        //linkToHighScoresEl.appendChild(scoreListEl);

    } else {
        savedHighScores = JSON.parse(savedHighScores);
        for (i = 0; i< savedHighScores.length; i++ ){
            highScoresList += "\'" + savedHighScores[i].userInitials + "\'\ " + savedHighScores[i].userScore + "; ";
        }
        alert('High Scores: ' + highScoresList);
        //linkToHighScoresEl.appendChild(scoreListEl);
    }
// end of seeHighScores function    
}

// clears out HTML in element with particular id
var refresh = function (idToRefresh) {
    idToRefresh.innerHTML='';
}

// creates a new div window-container
var createClearWindow = function () {

    var containerEl = document.createElement("div");
    containerEl.className = "window-container";

    refreshWindowEl.appendChild(containerEl);

    return containerEl;
}

// checks user answer against actual answer and checks if out of time for answer
var checkAnswer = function() {
    if (testInfo.testAnswerActual[questionIndex] === testInfo.testAnswerUser[questionIndex] && seconds>0) {
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
            break;
        case false:
            seconds -= 10;
            break;
        default:
          console.log("Something went wrong!");
      }
}

// saves user high score to local storage
var saveHighScore = function() {
    if (userInfo.isUserHighScore) {
            localStorage.setItem("highScores", highScores);
    }
// end of saveHighScore function
}

// checking if this is the user's high score
var checkHighScores = function() {

    // get high scores array saved on LocalStorage
    var savedHighScores = localStorage.getItem("highScores");
    var updatedSavedHighScores = [];

    // oldUser initialized to -1 if new user, otherwise location of old high score in local Storage
    var newUser = true;

    // check first if highScores has anything saved in it
    if (savedHighScores) {
        savedHighScores = JSON.parse(savedHighScores);
        for (i = 0; i < savedHighScores.length; i++) {

            // if user left initials it checks against other scores
            if ((savedHighScores[i].userInitials === userInfo.userInitials) && (userInfo.userScore > savedHighScores[i].userScore)) {
                userInfo.isUserHighScore = true;
                newUser = false;
                savedHighScores[i].userScore = userInfo.userScore;
                highScores = JSON.stringify(savedHighScores);
            } else if ((savedHighScores[i].userInitials === userInfo.userInitials) && (userInfo.userScore <= savedHighScores[i].userScore)) {
                newUser = false;
            }
        }
        // if user hasn't left initials yet then it is the high score
        if (newUser === true) {
            userInfo.isUserHighScore = true;
            savedHighScores.push(userInfo);
            highScores = JSON.stringify(savedHighScores);
        }
    // if nothing saved for any user, the score they currently have is high score
    } else {
        userInfo.isUserHighScore = true;
        // first time needed array declaration
        updatedSavedHighScores[0] = userInfo;
        highScores = JSON.stringify(updatedSavedHighScores);
    }
    saveHighScore();
   
// end of checkHighScore function
}

// reloads the window to start from beginning
var startOver = function (event) {
    location.reload();
}

// clears high scores in localStorage
var clearHighScores = function (event) {
    event.preventDefault();

    // clears out the high scores listed in window as well
    var clearHighScoreEl = document.querySelector("#saved-high-scores");
    clearHighScoreEl.textContent = '';

    window.alert("The high scores have been cleared.")
    localStorage.clear();
}

// puts the high score info on the page if user achieved a high score
var highScoreInfo = function () {
    // check if user had high score and save in highScores array
    checkHighScores();

    var savedHighScores = localStorage.getItem("highScores");

    // clears out window so can put user high scores up
    refresh(refreshWindowEl);
    var containerEl = createClearWindow();
    containerEl.id = 'window-container-high-scores';

    var highScoreContainerEl = document.createElement("div");
    
    var highScoreEl = document.createElement("h2");
    highScoreEl.textContent = "High scores";

    highScoreContainerEl.appendChild(highScoreEl);

   
    var highScoreStrng = '';
    // creates a single string with all the initials and high scores concatenated from the high scores stored in localStorage 
    if (savedHighScores) {
        savedHighScores = JSON.parse(savedHighScores);
        for (i = 0; i < savedHighScores.length; i++ ) {
            if (i>0) { 
                highScoreStrng += "; ";
            }
            highScoreStrng += (i+1).toString() + ". " + savedHighScores[i].userInitials + " - " + savedHighScores[i].userScore.toString();
        }
    }

    // creates the header in window to list out high scores
    scoresListDivEl = document.createElement("div");
    scoresListDivEl.id = "scores-list-container";
    scoresListEl = document.createElement("p");
    scoresListEl.id = "saved-high-scores";
    scoresListEl.textContent = highScoreStrng;

    scoresListDivEl.appendChild(scoresListEl);
    
    // creates the buttons to be displayed in window listing out high scores
    var buttonWrapperEl = document.createElement("div");
    buttonWrapperEl.id = "button-wrapper";

    var goBackBtnEl= document.createElement("button");    
    goBackBtnEl.type = "submit";
    goBackBtnEl.setAttribute("onclick", "startOver(event)");
    goBackBtnEl.textContent = "Go back";
    goBackBtnEl.id = "go-back-btn";

    var clearHighScoresBtnEl = document.createElement("button");
    clearHighScoresBtnEl.type = "submit";
    clearHighScoresBtnEl.setAttribute("onclick", "clearHighScores(event)");
    clearHighScoresBtnEl.textContent = "Clear high scores";
    clearHighScoresBtnEl.id = "clear-high-scores-btn";

    buttonWrapperEl.append(goBackBtnEl, clearHighScoresBtnEl);

    highScoreContainerEl.append(scoresListDivEl, buttonWrapperEl);

    containerEl.appendChild(highScoreContainerEl);
    
// end of highScoreInfo function
}

// clears the bottom of window where "Wrong!" or "Correct!" are displayed based on user answer to question
var clearFooterAnswer = function () {
    var answerRevealedEl = document.querySelector("#answer-reveal");
    answerRevealedEl.textContent = '';
}

// appends to bottom of window whether the user got a question correct or wrong
var answerReveal = function(correct) {
    var quizContainerEl = document.querySelector("#quiz-container");
    if (questionIndex === 0) {
        var answerRevealEl = document.createElement("h2");
        answerRevealEl.id = "answer-reveal";
    } else {
        clearFooterAnswer();
        var answerRevealEl = document.querySelector("#answer-reveal");
    }
    
    if (correct) {
        answerRevealEl.textContent = "Correct!";
    } else {
        answerRevealEl.textContent = "Wrong!";
    }
    
    if (questionIndex === 0) {
        quizContainerEl.appendChild(answerRevealEl);
    } 
// end of answerReveal function    
}

// stores initials entered by user into userInfo object
var storeUserInitials = function(event) {

    event.preventDefault();
    userInfo.userInitials = document.getElementById("initials-input").value;
    
    if (!userInfo.userInitials) {
        window.alert("Please enter your initials.")
        endQuiz();
        return;
    }
    // takes to highScoreInfo window next
    highScoreInfo();
// end of storeUserIntials function
}

// prompts for user initials as a form with a submit button
var getUserInitials = function(endQuizContainerEl) {
    
    var createFormEl = document.createElement("form");
    createFormEl.id = "initials-form";
    
    var getInitialsEl = document.createElement("label");
    getInitialsEl.id="initials-label";
    getInitialsEl.setAttribute("type", "text");
    getInitialsEl.setAttribute("for", "initials");
    getInitialsEl.textContent = "Enter initials:";

    var createInputEl = document.createElement("input");
    createInputEl.type="text";
    createInputEl.setAttribute("placeholder", "Your Initials");
    createInputEl.name = "initials"
    createInputEl.id = "initials-input";

    var createSubmitBtnEl = document.createElement("button");
    createSubmitBtnEl.type = "submit";
    createSubmitBtnEl.setAttribute("onclick", "storeUserInitials(event)");
    createSubmitBtnEl.textContent = "Submit";
    createSubmitBtnEl.id = "initials-submit-btn";
    
    createFormEl.append(getInitialsEl, createInputEl, createSubmitBtnEl);
    endQuizContainerEl.appendChild(createFormEl);
    
// end of getUserInitials function
}

// checks if it is the end of the quiz and if so gives user new window with their quiz info
var endQuiz = function () {
    // initializes that user finished quiz to true;
    var quizFinish = true;
    
    // if the time <=0 and the last question hasn't been answered then the quiz wasn't finished
    if (seconds<=0 && !testInfo.testAnswerUser[testInfo.testAnswerUser.length-1]) {
        seconds = 0;
        quizFinish = false;
    } else if (seconds<=0) {
        seconds = 0;
    }
   
    // clears out window so can put quiz results up
    refresh(refreshWindowEl);
    clearFooterAnswer();
   
    // create div container in a cleared out window to provide of quiz info
    var containerEl = createClearWindow();
    containerEl.id = "quiz-summary";

    var endQuizContainerEl = document.createElement("div")
    endQuizContainerEl.id = "end-quiz-container";

    var quizEndMessageEl = document.createElement("h1");
    if (quizFinish) { 
        quizEndMessageEl.textContent = "All done!"; 
    }
    else { 
        quizEndMessageEl.textContent = "Time is up!"
    }

    endQuizContainerEl.appendChild(quizEndMessageEl);

    var quizSummaryEl = document.createElement("h2");
    if (seconds === 1) {
        var secondsText = "second";
    } else  { 
        var secondsText = "seconds";
    }

    quizSummaryEl.textContent =  "Your final score is " + userInfo.userScore + " and you finished with " + seconds + " " + secondsText + " to spare.";
    endQuizContainerEl.appendChild(quizSummaryEl);

    getUserInitials(endQuizContainerEl);

    containerEl.appendChild(endQuizContainerEl);
    
// end of endQuiz function
}

// gets answer user chose for question after submit button hit (radio button chosen)
var getAnswer = function(event) {
    event.preventDefault();

    // correct notes whether the user got the answer correct
    var correct = false;
    
    
    // puts the user answer in the testInfo object
    testInfo.testAnswerUser[questionIndex] = event.target.id.slice(7);


    if (questionIndex < (testInfo.testQuestions.length)) {
        // checks the user answer against the actual answer
        correct = checkAnswer(questionIndex);

        answerReveal(correct);

        keepScore(correct);
        questionIndex++;
    } 

    // go back to the quiz for next question
    if (questionIndex < (testInfo.testQuestions.length) && seconds > 0) {
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

    containerEl.id = 'window-container-test-questions';
    
    // create question in h3
    var questionEl = document.createElement("h2");
    questionEl.className = "question";
    questionEl.textContent = testInfo.testQuestions[questionIndex];

    containerEl.appendChild(questionEl);

    // create form that will contain questions
    var formEl = document.createElement("form");
    formEl.id = "question-form";

    containerEl.appendChild(formEl);
    
    // create radio buttons for answers A, B and C as loop through answerArray
    for (j = 1; j < (testInfo.testQuestions.length); j++) {
        
        // creates  button for each question
        var answerBtnWrapperEl = document.createElement("div");
        answerBtnWrapperEl.id = "answer-button";

        var answerBtnEl = document.createElement("button")
        answerBtnEl.id = "answer-" + j.toString();
        answerBtnEl.name = "answer-button";
        
        answerBtnEl.value = "answer-" + j.toString();
        answerBtnEl.setAttribute("onclick", "getAnswer(event)");
        answerBtnEl.textContent = eval('testInfo.testAnswer' + j.toString() + '[questionIndex]');

        // puts the answer choices (radio buttons and labels) into the html
        answerBtnWrapperEl.appendChild(answerBtnEl);
        formEl.appendChild(answerBtnWrapperEl);
    } 

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


// userPrompt();

startQuizBtnEl.addEventListener("click", startQuiz);

linkToHighScoresEl.addEventListener("click", seeHighScores);
