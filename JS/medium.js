
document.querySelector(".start-page span").onclick = () => {
    document.querySelector(".player-name-overlay").style.display = "block";
    document.querySelector(".player-name-modal").style.display = "block";
};

function submitPlayerName() {
    let playerName = document.getElementById("player-name-input").value.trim();

    if (!playerName) {
        playerName = "Unknown";
    }

    document.querySelector(".playerInfo .player-name").innerHTML = playerName;
    document.querySelector(".player-name-overlay").style.display = "none";
    document.querySelector(".player-name-modal").style.display = "none";
    document.querySelector(".start-page").remove();

    startTimer(60);
    revealAllCards();
}


let duration = 1000;

let elementsContainer = document.querySelector(".main-class");

let elements = Array.from(elementsContainer.children);

let rangeOrder = Array.from(Array(elements.length).keys());

shuffle(rangeOrder);

elements.forEach((element, index) => {
    element.style.order = rangeOrder[index];
    
    element.addEventListener("click", () => {
        flipedCard(element);
    });
});


function startTimer(seconds) {
    const canvas = document.getElementById("timerCanvas");
    const ctx = canvas.getContext("2d");
    const radius = canvas.width / 2 - 10; 
    let timeLeft = seconds;
    const interval = 1000; 

    function drawTimer() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "#34495e"; 
        ctx.lineWidth = 10;
        ctx.stroke();

        // Draw the progress circle
        const endAngle = (Math.PI * 2) * (timeLeft / seconds) - Math.PI / 2;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, -Math.PI / 2, endAngle);
        ctx.strokeStyle = "#e74c3c"; 
        ctx.lineWidth = 10;
        ctx.stroke();

        // Draw the time text
        ctx.font = "30px Arial";
        ctx.fillStyle = "#f1c40f"; 
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(timeLeft, canvas.width / 2, canvas.height / 2);
    }

    // Start the countdown
    let timer = setInterval(() => {
        timeLeft--;
        drawTimer();

        if (timeLeft <= 0) {
            clearInterval(timer);
            gameOver(); 
        }
    }, interval);

    drawTimer();
}


function gameOver() {
    document.querySelector(".custom-modal").style.display = "block";
    document.querySelector(".modal-overlay").style.display = "block";

    document.querySelector(".yes-button").addEventListener("click", function () {
        location.reload();
    });

    document.querySelector(".no-button").addEventListener("click", function () {
        document.querySelector(".custom-modal").style.display = "none";
        document.querySelector(".modal-overlay").style.display = "none";
        document.querySelector(".main-class").style.pointerEvents = "none";
    });
}


function winingAlert(){
    document.querySelector(".custom-modal-win").style.display = "block";
    document.querySelector(".modal-overlay-win").style.display = "block";

    document.querySelector(".yes-button-win").addEventListener("click", function () {
        location.reload();
    });

}


function flipedCard(card) {

    card.classList.add("is-flipped");

    let allFlipedElements = elements.filter(fl=> fl.classList.contains("is-flipped"));

    if (allFlipedElements.length === 2) {
        noClicking();
        checkMatched(allFlipedElements[0], allFlipedElements[1]);
    }
}



function noClicking() {
    elementsContainer.classList.add("no-clicking");

    setTimeout(() => {
        elementsContainer.classList.remove("no-clicking");
    }, duration);
}

function checkMatched(firstCard, secondCard) {

    let tries = document.querySelector(".triesInfo .no-Tries");

    if (firstCard.dataset.frout === secondCard.dataset.frout) {
        firstCard.classList.remove("is-flipped");
        secondCard.classList.remove("is-flipped");

        firstCard.classList.add(`has-match`, `matched`);
        secondCard.classList.add(`has-match`, `matched`);

        document.getElementById("succss").play();

        if (document.querySelectorAll(".has-match").length === elements.length) {
            setTimeout(() => {
                winingAlert();
            }, 500);
        }

        
    } else {
        tries.innerHTML = +(tries.innerHTML)+1
        setTimeout(() => {
            firstCard.classList.remove("is-flipped");
            secondCard.classList.remove("is-flipped");
        }, duration);
        document.getElementById("fail").play();
    }
}

function shuffle(array) {
    let current = array.length,
        temp,
        random;

    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;

        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
}


function revealAllCards() {
    elements.forEach(element => element.classList.add("is-flipped")); 

    setTimeout(() => {
        elements.forEach(element => element.classList.remove("is-flipped")); 
    }, 2000);
}