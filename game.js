var Cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

var tilesFlipped =0;
var OpenCards = [];
var shuffleCards = [];
var shuffleCards = shuffle(Cards);

var grid = document.querySelector("#grid");
function Cardsdisplay() {
    for (var i = 0; i < Cards.length; i++) {
        grid.innerHTML += ` <div class="card"></div>`;
        console.log(i);
    }
    $('.card').prepend('<i></i>');
    for (var i = 0; i < Cards.length; i++) {
        $('.card').eq(i).find('i').addClass(shuffleCards[i]);
    }
}

Cardsdisplay();

var scoreValue = 0;
var scoreBox = document.querySelector('#scorebox');

function score() {
    scoreValue = scoreValue + 10;
    scoreBox.innerText = scoreValue;
}

var movesValue = 0;
var movesBox = document.querySelector('#movesbox');

function moves() {
    movesValue = movesValue + 1;
    movesBox.innerText = movesValue;
}



var timeValue = 0;
var seconds = 0;
var minutes = 0;
var mins, sec, clearTime;
var timeBox = document.querySelector('#timesbox');

function startTime() {
    if (seconds === 60) {
        minutes = minutes + 1;
        seconds = 0;
    }
    mins = (minutes < 10) ? ('0' + minutes + ':') : (minutes + ':');
    sec = (seconds < 10) ? ('0' + seconds) : (seconds);
    timeValue = mins + sec;
    timeBox.innerText = timeValue;
    seconds++;
    clearTime = setTimeout("startTime( )", 1000);
}

function stopTime() {
    if (seconds !== 0 || minutes !== 0 || hours !== 0) {
        clearTimeout(clearTime);
    }
}

function time() {
    if (seconds === 0 && minutes === 0) {
        startTime();
    }
}

var restartbtn = document.getElementById('restart')
restartbtn.addEventListener('click',function reload(){
    location.reload();
});


$('#grid').on('click', '.card', function (event) {
    time();
    if ($(this).attr('class') === 'card' && OpenCards.length < 2) {

        if (OpenCards.length === 0) {
            $(this).toggleClass('open');
            OpenCards.push($(this).children().attr('class'));
        }

        else if (OpenCards.length === 1) {
            $(this).toggleClass('open');
            OpenCards.push($(this).children().attr('class'));
                    
            if (OpenCards[0] === OpenCards[1]) {
                $('.card').filter($('.open')).toggleClass('open match');
                OpenCards = [];
                score();
                tilesFlipped = tilesFlipped + 2;
            }

            else {
                function flipBack() {
                    $('.card').filter($('.open')).toggleClass('open');
                    OpenCards = [];
                    moves();
                }
                setTimeout(flipBack, 600);
            }
        }
       
        if (tilesFlipped === Cards.length) {
            stopTime();
            document.getElementById("scoreboard").style.display = 'flex';
            document.getElementById("scoreboard").innerHTML = `  <h1>You Won</h1>
                                                                 <h4>Score :- ${ scoreValue}</h4>
                                                                 <h4>Moves :- ${ movesValue}</h4>
                                                                 <h4>Time :- ${ timeValue}</h4>
                                                                `;
            grid.style.display = 'none';
        }
    }
});
