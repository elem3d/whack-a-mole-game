const state {
    view: {

        null: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time"),
        sore: document.querySelector("#score"),
        squares: document.querySelectorAll(".square")
    }

    value: {}
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
}

function addListnerHitBox() {
    state.view.squares.forEach((square) => {
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];

    randomSquare.classList("enemy");
}

function init() {
    alert("Olá!")
    randomSquare()
}

init();