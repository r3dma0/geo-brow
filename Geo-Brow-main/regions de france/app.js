let linksResponsive = document.querySelector('#linksResponsive');
let burgerButton = document.querySelector('#burgerBtn');
var menuOpened = false;
var trainingMod = false;
var answer = '';
var indexIncrease = 0;
var numberOfError = 0;
var timerValue = '';
var score =0;
var timerValuePoint;
let svgMap = document.querySelector('svg');
let startBtn = document.querySelector('#startButton');
let trainBtn = document.querySelector('#trainingBtn');
let questionDisplay = document.getElementById('questionContainer');
let chrono = document.getElementById('timerNumber');
let jauge = document.getElementById('jauge');
let circle1 = document.getElementById('circle1');
let circle2 = document.getElementById('circle2');
let circle3 = document.getElementById('circle3');
var paths = document.querySelector('#allMap').querySelectorAll('.land');
var question = ["Corse", "Grand Est", "Nouvelle-Aquitaine", "Auvergne-Rhone-Alpes", "Bourgogne-Franche-Comte", "Ile-de-France", "Occitanie", "Hauts-de-France", "Normandie", "Pays de la Loire","Provence-Alpes-Cote d'Azur","Bretagne"];
var totalScore = '';
var resetTimerPoint = false;
var correct;
svgMap.style.opacity = '0.1'
questionDisplay.style.opacity = '0.1'
document.getElementById('scoreAlert').style.display = 'none';
questionDisplay.style.display = 'none';

/* NAVBAR*/

linksResponsive.style.display = 'none';
function burgerButtonCLicked() {
    if (menuOpened == false) {
        linksResponsive.style.display = 'flex';
        linksResponsive.style.animation = 'menuAppear 0.1s linear';
        linksResponsive.style.top = '12vh';
        burgerButton.src = 'ressources/closeIcon.png';
        burgerButton.style.scale = '0.9';
        menuOpened = true;
    }
    else {
        linksResponsive.style.animation = 'menuDisappear 0.1s linear';
        linksResponsive.style.top = '-50%';
        burgerButton.style.scale = '1';
        burgerButton.src = 'ressources/burgerIcon.png';
        burgerButton.style.scale = '0.9';
        menuOpened =false;
        linksResponsive.style.display = 'none';
    }
}
linksResponsive.addEventListener("click",burgerButtonCLicked);

// RESET toutes les variables pour une nouvelle partie

function resetData() {
    questionDisplay.style.opacity = '1';
    questionDisplay.classList.add('bumpText')
    setTimeout(function(){questionDisplay.classList.remove('bumpText');},500)
    jaugeModifier(0,false)
    document.getElementById('welcomeTxt').classList.add('textGone');
    answer = '';
    indexIncrease = 0;
    numberOfError = 0;
    timerValue = 31;
    timerValuePoint = 0;
    svgMap.style.opacity = '1';
    questionDisplay.style.display = 'inline';
    startBtn.style.display = "none"; // faire disparaitre le bouton start
    trainBtn.style.display = 'none';
    questionDisplay.textContent = question[indexIncrease];
    timerValuePoint
    score = 0;
}
// jauge anim
function jaugeModifier(percentScore,appear) {
    jauge.style.display = 'flex';
    document.getElementById('scoreAlert').style.display = 'block';
    if (appear == true) {
        document.getElementById('scoreAlert').style.left = 'auto';
        jauge.style.width = String(`${percentScore}%`);
        jauge.textContent = parseInt(percentScore);
    }
    else {
        document.getElementById('scoreAlert').style.left = '-200vw';
        jauge.style.width = '0%';
        jauge.textContent = '';
    }
}

// TIMER

function timer() {
    if (trainingMod == false) {
        if (startBtn.style.display == 'none') {
            // fait baisser la valeur du timer toutes les secondes
            if (timerValue >= 1) {
                timerValue --;
                chrono.textContent = timerValue;
                setTimeout(timer,1000)
            // si la valeur est negative apparition bouton restart + fin du jeu
            } else {
                gameFinished()
            }
        }
    }
}

// permet de changer l'ordre des regions a chaque parties
function shuffleArray(question){
    question.sort(()=> Math.random() - 0.5);
}

/*GAME START*/

function  gameStart(){
    shuffleArray(question);
    resetData()
    timer();
    timerPoint(false);
    jaugeModifier(0,false);
}

function train(){
    if (trainingMod == false) {
        document.getElementById('switch').style.backgroundColor = '#0c385c';
        document.getElementById('slider').style.transform = 'translate(100%,0px)';
        trainingMod = true;
        chrono.textContent = 'TRAIN';
        document.getElementById('timer').style.backgroundImage = 'linear-gradient(to left,#b8b8b8,#555,#b8b8b8)';
        }
    else {
        document.getElementById('switch').style.backgroundColor = '#ccc';
        document.getElementById('slider').style.transform = 'translate(-5%,0px)'
        trainingMod = false;
        document.getElementById('timer').style.backgroundImage = 'linear-gradient(to left,rgb(0, 174, 255),#1479cc,rgb(0, 174, 255))';
        chrono.textContent = '00';}
}

// permet que chaque regions soient cliquable
paths.forEach(function (path) {
    path.addEventListener('click', function(e){
        answer = this.id;
        if (startBtn.style.display == 'none') {
        winChecking(answer,question);} // verifie si l'id de la reponse correspond a la question
    })
})

// permet de montrer le bouton restart apres une partie (et le score.. )
function gameFinished() {
    questionDisplay.style.display = 'none';
    startBtn.textContent = "restart ?";
    svgMap.style.opacity = '0.3'
    startBtn.style.display = "block";
    trainBtn.style.display = 'block'
    questionDisplay.style.opacity = '0.3';
    console.log(question.length)
    totalScore = (score/((question.length-1)*100))*100
    console.log(totalScore)
    if (trainingMod == false) {
        if (totalScore<=15) {
            jaugeModifier(0,true);
        }
        else {jaugeModifier(totalScore,true);score = 0;}
    }
    else{score = 0;jauge.style.display = 'none';}
}

// permet de faire l'animation de couleur correspondente selon si c'est une bonne ou mauvaise reponse
function animColor(goodOrBad) {
    document.getElementById(answer).classList.add(goodOrBad)
    setTimeout(function(){document.getElementById(answer).classList.remove(goodOrBad);},300)
}

function answerParameter(numberOfErrorP, indexIncreaseP, question, bumpP) {
    numberOfError += numberOfErrorP;
    indexIncrease += indexIncreaseP;
    questionDisplay.textContent = String(question[indexIncrease]);

    if (bumpP == true) {
        document.getElementById('questionContainer').classList.add('bumpText')
        setTimeout(function(){document.getElementById('questionContainer').classList.remove('bumpText');},500)
    }
}

function winChecking(answer,question) {
    if (answer==question[indexIncrease]) {
        if (indexIncrease==question.length-1) {
            gameFinished()
        }
        else {
            clearErrorDisplay()
            animColor('goodAnwser');
            answerParameter( 0, 1, question, true );
            resetTimerPoint = true;
            correct = true;
            numberOfError = 0;
        }
    }
    else {
    errorsIndicatorDisplay(numberOfError)
    animColor('badAnwser');
    if (numberOfError==2) {
        circle1.style.backgroundColor = 'red';
        circle2.style.backgroundColor = 'red';
        circle3.style.backgroundColor = 'red';
        if (indexIncrease==question.length-1) {
            gameFinished()
    }
    else {
        answerParameter(0, 1, question, true);
        resetTimerPoint = true;
        numberOfError = 0;
    }
    }
    else {
        answerParameter(1, 0, question, false);
    }
}
}

function errorsIndicatorDisplay(error) {
    if (error == 0) {
        circle1.style.backgroundColor = 'red';
        circle2.style.backgroundColor = 'white';
        circle3.style.backgroundColor = 'white';
    }
    else if (error == 1) {
        circle1.style.backgroundColor = 'red';
        circle2.style.backgroundColor = 'red';
        circle3.style.backgroundColor = 'white';
    }
    else if (error == 2) {
        circle1.style.backgroundColor = 'red';
        circle2.style.backgroundColor = 'red';
        circle3.style.backgroundColor = 'red';
        setTimeout(clearErrorDisplay,500)
    }
}

function clearErrorDisplay() {
    circle1.style.backgroundColor = 'white';
    circle2.style.backgroundColor = 'white';
    circle3.style.backgroundColor = 'white';
}

function calcScore(timerValuePoint) {
    timerValuePoint *= 10;
    timerValuePoint = 100 - timerValuePoint
    score += timerValuePoint
    console.log(score);
}


function timerPoint(reset) {
    if (startBtn.style.display == 'none') {
        if (timerValuePoint <= 100) {
            if (resetTimerPoint == true) {
                if (correct == true) {
                    calcScore(timerValuePoint)
                    correct = false;
                }
                timerValuePoint = 0;
                resetTimerPoint = false;
            }
            timerValuePoint++ ;
            console.log(timerValuePoint)
            setTimeout(timerPoint,1000);
        }
    }
}