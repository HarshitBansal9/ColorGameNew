let paragraph = document.querySelector(".rgb-answer");
let resultParagraph = document.querySelector(".result")
let userButton = document.getElementsByClassName("buttons")
let x, y, z;
let rndVar1;
let rndVar2;
let rndVar3;
let answer;
let answerColor;
let params = (new URL(document.location)).searchParams;
let difficulty = params.get("difficulty");
console.log(difficulty)
let cnt = 0;
let score = 0;
var f = "score.txt";

function submitScore(score) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5000/submit", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        score,
    }));
}
// 2. Append somewhere
var body = document.getElementsByClassName("button-container")[0];
if (difficulty == "easy") {

}
const buttonNames = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen"
];
if (difficulty == "easy") {
    var width = 3
    var height = 2
    var limit1 = 0
    var limit2 = 255
}
if (difficulty == "medium") {
    var width = 4
    var height = 2
    var limit1 = 0
    var limit2 = 255
}
if (difficulty == "hard") {
    var width = 5
    var height = 3
    var limit1 = 0
    var limit2 = 255
}

for (let i = 0; i < height; i++) {
    var row = document.createElement("div");
    // var row1 = document.getElementsByClassName("row")[0];
    for (let j = 0; j < width; j++) {
        var button = document.createElement("button");
        button.className = `buttons ${buttonNames[(i * width) + j]}`;
        button.innerText = "";
        row.appendChild(button);
    }
    body.appendChild(row);
}



function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
function disableButtons(a) {
    for (let i = 0; i < userButton.length; i++) {
        userButton[i].disabled = true;
    }
}
function enableButtons(b) {
    for (let i = 0; i < userButton.length; i++) {
        userButton[i].disabled = false;
    }
}

disableButtons("");

document.querySelector(".NewColors").addEventListener("click", function () {
    cnt++;
    if (cnt == 10) {
        window.location.replace("file:///C:/Users/harsh/Desktop/Frontend%20Masters/Color%20game/initialpage.html");
    }
    console.log(cnt);
    document.querySelector(".result").innerText = "";
    enableButtons("");
    for (let i = 0; i <= width * height - 1; i++) {
        for (let j = 1; j <= 3; j++) {
            if (j === 1) {
                rndVar1 = getRndInteger(limit1, limit2);
                x = rndVar1
            }
            if (j === 2) {
                rndVar2 = getRndInteger(limit1, limit2);
                y = rndVar2;
            } else {
                rndVar3 = getRndInteger(limit1, limit2);
                z = rndVar3;
            }
        }
        document.querySelector(`.${buttonNames[i]}`).style.backgroundColor = "rgb(" + x + ", " + y + ", " + z + ")";

    }
    answer = document.querySelector(`.${buttonNames[getRndInteger(0, 5)]}`);
    console.log(answer.backgroundColor)
    answerColor = window.getComputedStyle(answer).backgroundColor;
    paragraph.innerText = answerColor;
    console.log(answerColor.toS)
});
document.querySelector('.button-container').addEventListener('click', function (event) {
    var userInput = event.target.style.backgroundColor;
    if (userInput === answerColor) {
        document.querySelector(".result").innerText = "You are right!";
        score += 10;
        submitScore(score)
        document.querySelector(".choose-new-colors").innerText = "Choose new colors";
        disableButtons("");
    }
    else {
        userButton.disabled = true;
        document.querySelector(".result").innerText = "You are wrong";
        disableButtons("");
        document.querySelector(".choose-new-colors").innerText = "Choose new colors";
        console.log(score);
    }
});
