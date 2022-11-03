const SIGNS = { ROCK: 'rock', PAPER: 'paper', SCISSORS: 'scissors' };
let gameScoreElem = document.querySelector('.game-score-value');
let player1Elem = document.querySelector('.player1 .game-sign');
let player2Elem = document.querySelector('.player2 .game-sign');
let playgroundInit = document.querySelector('.playground-init');
let playgroundBattle = document.querySelector('.playground-battle');
let playAgainBtn = document.querySelector('.battle-result-again');
let battleResultElem = document.querySelector('.battle-result-title');
let rockElem = document.querySelector('.game-sign--' + SIGNS.ROCK);
let scissorsElem = document.querySelector('.game-sign--' + SIGNS.SCISSORS);
let paperElem = document.querySelector('.game-sign--' + SIGNS.PAPER);


let p1 = getRandomSign();
let p2 = getRandomSign();
let state = {
    p1,
    p2,
    score: 0,
    isInit: false,
    lastBattle: whoWon(p1, p2)
};

function getRandomSign() {
    const rand = Math.floor(Math.random() * Object.keys(SIGNS).length);
    return SIGNS[Object.keys(SIGNS)[rand]];
}


// p1: 1, p2: -1, draw: 0
function whoWon(p1, p2) {
    switch (true) {
        case (p1 === p2):
            return 0;
        case p1 === SIGNS.PAPER && p2 === SIGNS.ROCK:
            return 1;
        case p1 === SIGNS.SCISSORS && p2 === SIGNS.PAPER:
            return 1;
        case p1 === SIGNS.ROCK && p2 === SIGNS.SCISSORS:
            return 1;
        default:
            return -1;
    }
}

playAgainBtn.addEventListener('click', () => {
    setState({ ...state, isInit: true });
})

function addSignClicks() {
    for (const key in SIGNS) {
        if (Object.hasOwnProperty.call(SIGNS, key)) {
            let elem = document.querySelector('.game-sign--' + SIGNS[key]);
            elem.addEventListener('click', () => {
                p1 = SIGNS[key];
                p2 = getRandomSign();
                lastBattle = whoWon(p1, p2);
                score = state.score + lastBattle;
                setState({ ...state, p1, p2, score, isInit: false, lastBattle });
            });
        }
    }
}

function setState(newState) {
    state = { ...newState };
    updateUI();
}

function init() {
    playgroundBattle.style.display = 'none';
    playgroundInit.style.display = 'flex';
}
function battle() {
    playgroundBattle.style.display = 'flex';
    playgroundInit.style.display = 'none';
}

function updateUI() {
    gameScoreElem.innerHTML = state.score;
    player1Elem.className = 'game-sign';
    player2Elem.className = 'game-sign';
    if (state.lastBattle === 1) {
        battleResultElem.innerHTML = 'You win';
        player1Elem.classList.add('game-sign--winner');
    } else if (state.lastBattle === -1) {
        player2Elem.classList.add('game-sign--winner');
        battleResultElem.innerHTML = 'You lose';
    } else {
        battleResultElem.innerHTML = 'Draw';
    }
    player1Elem.classList.add('game-sign--' + state.p1);
    player2Elem.classList.add('game-sign--' + state.p2);
    if (state.isInit) {
        init();
    } else {
        battle();
    }
}
addSignClicks();
updateUI();