let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

// CHANGE 1: Added move counter for draw condition
let moveCount = 0; // ADDED

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;

    //  CHANGE 2: Reset moveCount during reset
    moveCount = 0; // ADDED

    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.classList.add("o");
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("x");
            turnO = true;
        }

        box.disabled = true;

        //  CHANGE 3: Increment counter after every move
        moveCount++; // ADDED

        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";

        //  CHANGE 4: Remove win class during reset
        box.classList.remove("x", "o", "win"); // UPDATED
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {

                //  CHANGE 5: Highlight winning boxes
                boxes[pattern[0]].classList.add("win"); // ADDED
                boxes[pattern[1]].classList.add("win"); // ADDED
                boxes[pattern[2]].classList.add("win"); // ADDED

                showWinner(pos1Val);
                return; // ADDED (stop checking after winner is found)
            }
        }
    }

    //  CHANGE 6: Handle draw condition
    if (moveCount === 9) { // ADDED
        msg.innerText = "Match Draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
