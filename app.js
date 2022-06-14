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

// jauge du score animation
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

// permet de montrer le bouton restart apres une partie (et le score.. ) quand la partie est terminer
function gameFinished() {
    questionDisplay.style.display = 'none';
    startBtn.textContent = "restart ?";
    svgMap.style.opacity = '0.3'
    startBtn.style.display = "block";
    trainBtn.style.display = 'block'
    questionDisplay.style.opacity = '0.3';
    totalScore = (score/((question.length-1)*100))*100
    if (trainingMod == false) {
        if (totalScore<=15) {
            jaugeModifier(0,true);
        }
        else {jaugeModifier(totalScore,true);score = 0;}
    }
    else{score = 0;jauge.style.display = 'none';}
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

// calcules les points uniquement quand c'est une bonne reponses
function calcScore(timerValuePoint) {
    timerValuePoint *= 10;
    timerValuePoint = 100 - timerValuePoint
    score += timerValuePoint
}

// chronometre des points qui se reset a chaque changement de questions
function timerPoint() {
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
            setTimeout(timerPoint,1000);
        }
    }
}

/*GAME START*/
function  gameStart(){
    shuffleArray(question);
    resetData()
    timer();
    timerPoint();
    jaugeModifier(0,false);
}

// parametre utiliser pour les different etat du bouton "train"
function trainParameter(rgbButton, translatePourcent, trainingModP, rgbBackground1, rgbBackground2, contentButton) {
    document.getElementById('switch').style.backgroundColor = rgbButton;
    document.getElementById('slider').style.transform = `translate(${translatePourcent},0px)`;
    trainingMod = trainingModP;
    document.getElementById('timer').style.backgroundImage = `linear-gradient(to left,${rgbBackground1},${rgbBackground2},${rgbBackground1})`;
    chrono.textContent = contentButton;
}

function train(){
    if (trainingMod == false) {
        trainParameter('#0c385c', '100%', true, '#b8b8b8', '#555', 'TRAIN')
        }
    else {
        trainParameter('#ccc', '-5%', false, 'rgb(0, 174, 255)', '#1479cc', '00')
    }
}

// etat des cercles de couleurs
function circleStatement(circle1P, circle2P, circle3P) {
    circle1.style.backgroundColor = circle1P;
    circle2.style.backgroundColor = circle2P;
    circle3.style.backgroundColor = circle3P;
}


// permet de faire l'animation de couleur correspondente selon si c'est une bonne ou mauvaise reponse
function animColor(goodOrBad) {
    document.getElementById(answer).classList.add(goodOrBad)
    setTimeout(function(){document.getElementById(answer).classList.remove(goodOrBad);},300)
}

// definie le changement selon la reponse de l'utilisateur est vrai ou non ou si c'est ca 3 eme mauvaise reponse
function answerParameter(numberOfErrorP, indexIncreaseP, question, bumpP) {
    numberOfError += numberOfErrorP;
    indexIncrease += indexIncreaseP;
    questionDisplay.textContent = String(question[indexIncrease]);

    if (bumpP == true) {
        document.getElementById('questionContainer').classList.add('bumpText')
        setTimeout(function(){document.getElementById('questionContainer').classList.remove('bumpText');},500)
    }
}

function errorsIndicatorDisplay(error) {
    if (error == 0) {
        circleStatement('red', 'white', 'white')
    }
    else if (error == 1) {
        circleStatement('red', 'red', 'white')
    }
    else if (error == 2) {
        circleStatement('red', 'red','red')
        setTimeout(circleStatement('white', 'white', 'white'),500)
    }
}

// couvre toute les possibilité de terminer la partie et de trouver ou non les reponses sauf le timer
function winChecking(answer,question) {
    if (answer==question[indexIncrease]) {
        if (indexIncrease==question.length-1) {
            gameFinished() // c'est la bonne reponse et il n'y a plus de question la partie est terminer
        }
        else {
            // c'est la bonne reponse et il reste des questions
            circleStatement('white', 'white', 'white')
            animColor('goodAnwser');
            answerParameter( 0, 1, question, true );
            resetTimerPoint = true;
            correct = true;
            numberOfError = 0;
        }
    }
    else {
        // mauvaise reponses
        errorsIndicatorDisplay(numberOfError)
        animColor('badAnwser');
        if (numberOfError==2) { // une la 3eme mauvaise reponses
            circleStatement('red', 'red', 'red')
            if (indexIncrease==question.length-1) {
                gameFinished() // c'est une mauvaise reponse + plus de question
            }
            else {
                answerParameter(0, 1, question, true); // la troisieme mauvaise reponse et il reste des questions
                resetTimerPoint = true;
                numberOfError = 0;
            }
        }
        else {
        answerParameter(1, 0, question, false); // une des trois mauvaises reponses accordée
        }
    }
}

// permet que chaque regions soient cliquable
paths.forEach(function (path) {
    path.addEventListener('click', function(e){
        answer = this.id;
        if (startBtn.style.display == 'none') {
        winChecking(answer,question);} // verifie si l'id de la reponse correspond a la question
    })
})







