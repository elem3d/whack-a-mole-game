const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: " + (e.pageY - 40) + "px; left: " + (e.pageX - 20) + "px;")
})


const state = {
    view: {
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time"),
        score: document.querySelector("#score"),
        squares: document.querySelectorAll(".square"),
        level: document.querySelector('#level'),
        lifeCounter: document.querySelector('#life'),
        missed: document.querySelector('#missed'),
    },
    value: {
        gameVelocity: 1000,
        hitPosition: 0, 
        result: 0,
        currentTime: 120,
        level: 1,
        life: 5,
        error: 0,
        missed: 0,
    },

    actions: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
        levelUpId: setInterval(levelUp, 100),
        errorId: setInterval(lifeCount, 100),
        lifeId: setInterval(death, 100),
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
        square.classList.remove('enemy-hit')
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];

    randomSquare.classList.add('enemy');
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
            alert('TIME OUT! Your Score: ' + state.value.result + '   Volte ou recarregue a página e clique ok para tentar de novo. :)');
        } else {
            alert('TIME OUT! Your Score: ' + state.value.result + ' PARABÉNS!' + '   Volte ou recarregue a página e clique ok para tentar de novo. :)');
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
            if(square.id === state.value.hitPosition){
                playSound3('hit')
                square.classList.remove('enemy')
                square.classList.add('enemy-hit');
                state.value.result++;
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null;
            
            } else {
                state.value.error++;
                state.value.missed++;
                state.view.missed.textContent = state.value.missed;
                playSound1('chipmunk');
            }
        })
    });
}

function levelUp(){
    if(state.value.result === 10) {
        playSound1('levelUp')
        alert('LEVEL UP! A velocidade aumentou');
        state.value.level++;
        state.value.result++;
        clearInterval(state.value.timerId);
        state.value.timerId = setInterval(randomSquare, 800);
    }else if (state.value.result === 30) {
        playSound1('levelUp')
        alert('LEVEL UP! A velocidade aumentou')
        state.value.level++;
        state.value.result++;
        clearInterval(state.value.timerId);
        state.value.timerId = setInterval(randomSquare, 700);
    } else if (state.value.result === 50) {
        playSound1('levelUp')
        alert('LEVEL UP! A velocidade aumentou ')
        state.value.level++;
        state.value.result++;
        clearInterval(state.value.timerId);
        state.value.timerId = setInterval(randomSquare, 500);
    } else if (state.value.result === 60) {
        playSound1('levelUp')
        alert('INSANE LEVEL! Parabéns por chegar até aqui, boa sorte com o nível nsano de velocidade')
        state.value.level++;
        state.value.result++;
        clearInterval(state.value.timerId);
        state.value.timerId = setInterval(randomSquare, 400);
    }

    state.view.level.textContent = state.value.level;
    state.view.score.textContent = state.value.result;
}

function moveEnemy() {
    state.value.timerId = setInterval(randomSquare, state.value.gameVelocity)
}

function lifeCount() {
    
    if(state.value.error === 3) {
        state.value.life--;
        state.view.lifeCounter.textContent = state.value.life;
        state.value.error = 0;
    }
}

function death(){
    if(state.value.life === 0) {
        playSound1('gameOver');
        alert('GAME OVER! Score: ' + state.value.result + '   Volte ou recarregue a página e clique ok para tentar de novo. ;)');
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.levelUpId);
        clearInterval(state.actions.errorId);
        clearInterval(state.actions.enemyId);
    }

}

function init() {
    alert('Para jogar, bata na cabeça das doninhas que querem destruir o seu gramado')
    addListnerHitBox();
    moveEnemy();
}

init();




