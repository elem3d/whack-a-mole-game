const state = {
    view: {
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time"),
        sore: document.querySelector("#score"),
        squares: document.querySelectorAll(".square"),
    },
    value: {
        timerId: null,
        gameVelocity: 1000,
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];

    randomSquare.classList.add("enemy");
}

function moveEnemy() {
    state.value.timerId = setInterval(randomSquare, state.value.gameVelocity)
}

function addListnerHitBox() {
    state.view.squares.forEach((square) => {
    });
}

function init() {
    moveEnemy()
}

init();