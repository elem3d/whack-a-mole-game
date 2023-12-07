const state = {
    view: {
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time"),
        score: document.querySelector("#score"),
        squares: document.querySelectorAll(".square"),
    },
    value: {
        gameVelocity: 1000,
        hitPosition: 0, 
        result: 0,
        currentTime: 60,
        level: 0,
    },

    actions: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];

    randomSquare.classList.add("enemy");
    state.value.hitPosition = randomSquare.id
}

function countDown(){
    state.value.currentTime--;
    state.view.timeLeft.textContent = state.value.currentTime;

    if(state.value.currentTime <= 0) {
        alert("TIME OUT - GAME OVER! Your Score: " + state.value.result);
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
    }
}

function moveEnemy() {
    state.value.timerId = setInterval(randomSquare, state.value.gameVelocity)
}

function addListnerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => { 
            if(square.id === state.value.hitPosition){
                state.value.result++;
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null;

            }
        })
    });
}

function levelUp(){
    state.value.gameVelocity = state.value.gameVelocity / 2;
    state.value.level = state.value.level + 5;
    alert("LEVEL UP!")
}

function playSound(audioName) {
 let audio = new Audio(`../audios/${audioName}.mp3`);
 audio.play();
}

function init() {
    addListnerHitBox();
    moveEnemy();
    if (state.value.result % 3 === 0) {
        levelUp();
    }
}

init();