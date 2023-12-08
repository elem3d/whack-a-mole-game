const state = {
    view: {
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time"),
        score: document.querySelector("#score"),
        squares: document.querySelectorAll(".square"),
        level: document.querySelector('#level'),
        lifeCounter: document.querySelector('#life')
    },
    value: {
        gameVelocity: 1000,
        hitPosition: 0, 
        result: 0,
        currentTime: 60,
        level: 0,
        life: 3,
        error: 0,
    },

    actions: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
        levelUpId: setInterval(levelUp, 100),
        errorId: setInterval(lifeCount, 100),
        lifeId: setInterval(death, 100),
        enemyId: setInterval(moveEnemy, 100),
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

function playSound3(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.mp3`)
    audio.play();
    audio.playbackRate = 4;
   }
   function playSound1(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.mp3`)
    audio.play();
    audio.playbackRate = 1;
   }

function countDown(){
    state.value.currentTime--;
    state.view.timeLeft.textContent = state.value.currentTime;

    if(state.value.currentTime <= 0) {
        playSound1('gameOver');
        if (state.value.result < 25){
            alert('TIME OUT! Your Score: ' + state.value.result);
        } else {
            alert('TIME OUT! Your Score: ' + state.value.result + ' CONGRATULATIONS!');
        }
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.levelUpId);
        clearInterval(state.actions.errorId);
        clearInterval(state.actions.enemyId);
        state.value.level = 0;
        
    }
}

function addListnerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => { 
            if(square.id === state.value.hitPosition && state.value.result <= 30){
                state.value.result++;
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null;
                playSound3('hit');
            
            } else if(square.id === state.value.hitPosition && state.value.result > 30){
                state.value.result = state.value.result + 3;
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null;
                playSound3('hit');
            
            } else {
                state.value.error++
                playSound1('chipmunk');
            }
        })
    });
}

function levelUp(){
    state.value.gameVelocity = 1000;

    if(state.value.result === 10) {
        playSound1('levelUp')
        alert('LEVEL UP!');
        state.value.level++;
        state.value.result++;
    }else if (state.value.result === 20) {
        playSound1('levelUp')
        alert('LEVEL UP!')
        state.value.level++;
        state.value.result++;
    } else if (state.value.result === 30) {
        playSound1('levelUp')
        alert('LEVEL UP MAX!')
        state.value.level++;
        state.value.result++;
    }

    state.view.level.textContent = state.value.level;
}

function moveEnemy() {
    if(state.value.level === 0) {
        state.value.timerId = setInterval(randomSquare, state.value.gameVelocity);
    } else if(state.value.level === 1) {
        state.value.timerId = setInterval(randomSquare, (state.value.gameVelocity - 200));
    } else if(state.value.level === 2) {
        state.value.timerId = setInterval(randomSquare, (state.value.gameVelocity - 300));
    } else {
        state.value.timerId = setInterval(randomSquare, (state.value.gameVelocity - 500));
    }
}

function lifeCount() {
    if(level <= 2 && state.value.error === 5) {
        state.value.life--;
        state.view.lifeCounter.textContent = state.value.life;
        state.value.error = 0;
    } else if(level === 3 && state.value.error === 7) {
        state.value.life--;
        state.view.lifeCounter.textContent = state.value.life;
        state.value.error = 0;
    }
}

function death(){
    if(state.value.life === 0) {
        playSound1('gameOver');
        alert('GAME OVER! Score: ' + state.value.result);
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.levelUpId);
        clearInterval(state.actions.errorId);
        clearInterval(state.actions.enemyId);
        state.value.level = state.value.level -state.value.level;
        state.value.result = state.value.result - state.value.result;
    }

}

function init() {
    addListnerHitBox();
}

init();




