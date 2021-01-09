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

// presents high scores when user clicks button
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
            highScoresList += savedHighScores[i].userInitials + " " + savedHighScores[i].userScore + "; ";
        }
        alert('High Scores: ' + highScoresList);
        //linkToHighScoresEl.appendChild(scoreListEl);
    }

    

}
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
    userInfo.userInitials = window.prompt("Welcome to your Code Quiz Challenge! Please enter your initials.");
    if (!userInfo.userInitials) {
        window.alert("You have not entered anything. Please try again.");
        userPrompt();
    };
   
};

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

var saveHighScore = function(event) {
    
    if (userInfo.isUserHighScore) {
        var saveHighScorePrmpt = window.confirm("I would like to save my high score!");
        if (saveHighScorePrmpt) {
            //saves highScores to local Storage
            localStorage.setItem("highScores", highScores);
        }
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

// end of checkHighScore function
}

// puts the high score info on the page if user achieved a high score
var highScoreInfo = function (containerEl) {

    // check if user had high score and temporarily save in highScores array
    // knowing user can decide to not store in localStorage
    checkHighScores();

    if (userInfo.isUserHighScore) {
        var quizHighScoreEl = document.createElement("h2");
        quizHighScoreEl.textContent = "This is your high Score!";
        containerEl.appendChild(quizHighScoreEl);

        var saveHighScoreBtn = document.createElement("button");
        saveHighScoreBtn.id = 'save-high-score-btn';
        saveHighScoreBtn.type = "button";
        saveHighScoreBtn.textContent = "Save My High Score!";   

        // saveHighScore function called if user clicks button to save high score
        saveHighScoreBtn.setAttribute("onclick", "saveHighScore(event)");
        containerEl.appendChild(saveHighScoreBtn);
    }
// end of highScoreInfo function
}

var endQuiz = function () {

    // initializes that user finished quiz to true;
    var quizFinish = true;
    
    // if the time <=0 and the last question hasn't been answered then the quiz wasn't finished
    if (seconds<=0 && !testInfo.testAnswerUser[9]) {
        seconds = 0;
        quizFinish = false;
    } else if (seconds<=0) {
        seconds = 0;
    }
   
    // clears out window so can put quiz results up
    refresh(refreshWindowEl);
    
    // create div container in a cleared out window to end of quiz info
    var containerEl = createClearWindow();
    containerEl.id = "quiz-summary";

    var quizEndMessageEl = document.createElement("h1");
    if (quizFinish) { 
        quizEndMessageEl.textContent = "End of Quiz!"; 
    }
    else { 
        quizEndMessageEl.textContent = "Time is up!"
    }

    containerEl.appendChild(quizEndMessageEl);

    var quizSummaryEl = document.createElement("h2");
    quizSummaryEl.textContent = userInfo.userInitials + " has a score of " + userInfo.userScore + " and finished with " + seconds + " seconds to spare";
    containerEl.appendChild(quizSummaryEl);

    highScoreInfo(containerEl);

// end of endQuiz function
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

linkToHighScoresEl.addEventListener("click", seeHighScores);
