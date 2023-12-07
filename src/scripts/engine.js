const state = {
    view: {
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time"),
        score: document.querySelector("#score"),
        squares: document.querySelectorAll(".square"),
        level: document.querySelector('#level')
    },
    value: {
        gameVelocity: 1000,
        hitPosition: 0, 
        result: 0,
        currentTime: 60,
        level: 0,
        error: 0,
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

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.mp3`)
    audio.play();
    audio.playbackRate = 3;
   }
   function playLost(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.mp3`)
    audio.play();
    audio.playbackRate = 1;
   }

function countDown(){
    state.value.currentTime--;
    state.view.timeLeft.textContent = state.value.currentTime;

    if(state.value.currentTime <= 0) {
        if (state.value.result < 25){
            alert('TIME OUT! Your Score: ' + state.value.result);
        } else {
            alert('TIME OUT! Your Score:' + state.value.result + 'CONGRATULATIONS!');
        }
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        playLost('gameOver');
    }
}

function moveEnemy() {
    state.value.timerId = setInterval(randomSquare, state.value.gameVelocity);
}

function addListnerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => { 
            if(square.id === state.value.hitPosition && state.value.result <= 30){
                state.value.result++;
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null;
                playSound('hit');
            
            } else if(square.id === state.value.hitPosition && state.value.result > 30){
                state.value.result = state.value.result + 5;
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null;
                playSound('hit');
            
            } else {
                state.value.error++
                playLost('chipmunk');
            }
        })
    });
}

function levelUp(score){
    if(score == 10) {
        alert('LEVEL UP!');
        state.value.gameVelocity = 800;
        state.value.level++;
    }else if (score == 20) {
        alert('LEVEL UP!')
        state.value.gameVelocity = 700;
        state.value.level++;
    } else if (score == 30) {
        alert('LEVEL UP MAX!')
        state.value.gameVelocity = 500;
        state.value.level++;
    }

    state.view.level.textContent = state.value.level;
}

function lifeCount(error) {

}

function init() {
    addListnerHitBox();
    moveEnemy();
    levelUp(state.value.result);
}

init();