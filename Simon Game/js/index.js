let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright")
const onButton = document.querySelector("#on");
const strictButton = document.querySelector("#strict");
const startButton = document.querySelector("#start");

//write the program in the order of the game
//strict Button

strictButton.addEventListener("click", (event) => {
     if (strictButton.checked == true) {
        strict = true;
     }
     else {
        strict = false;
     }
})

//on button
onButton.addEventListener("click", (event) => {
    if (onButton.checked == true) {
        on = true;
        turnCounter.innerHTML = "-";
    }
    else {
        on = false;
        turnCounter.innerHTML = "";
        clearColor();
        clearInterval(intervalId);
    }
})

//start button
startButton.addEventListener("click", (event) => {
    if (on || win ) {
        play();
    }
})

function play() {
        
    win = false; 
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;
    for (var i = 0; i < 20; i++){
        order.push(Math.floor(Math.random() * 4) + 1);

    }
    compTurn = true;
    intervalId = setInterval(gameTurn, 800);

}

function gameTurn (){
    on = false; //Does not let player click a button

    if (flash == turn) {  //Checks if the number of flashes is equal to the turn counter
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    } //This basically preps the game for the player to make an input

    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] == 1) one();
            if (order[flash] == 2) two();
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();
            flash++;

        }, 200);
    }
}

function one() {
    // if(noise){
    //     let audio = document.getElementById("clip1");
    //     audio.play();
    // }
    noise = true;
    topLeft.style.backgroundColor = "lightgreen";
}
function two() {
    if(noise){
        let audio = document.getElementById("clip2");
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = "tomato";
}
function three() {
    if(noise){
        let audio = document.getElementById("clip3");
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor= "yellow";
}
function four() {
    if(noise){
        let audio = document.getElementById("clip4");
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = "lightskyblue";
}
function clearColor() {
    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";
  }

function flashColor() {
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";
  }

topLeft.addEventListener("click", (event) =>{
    if (on) {
        playerOrder.push(1)
        check(); //checks if the player was corect
        one()
        if(!win) {
            setTimeout(() =>{
                clearColor();
            }, 300)
        }
    }
})


topRight.addEventListener("click", (event) =>{
    if (on) {
        playerOrder.push(2)
        check(); //checks if the player was corect
        two()
        if(!win) {
            setTimeout(() =>{
                clearColor();
            }, 300)
        }
    }
})

bottomLeft.addEventListener("click", (event) =>{
    if (on) {
        playerOrder.push(3)
        check(); //checks if the player was corect
        three()
        if(!win) {
            setTimeout(() =>{
                clearColor();
            }, 300)
        }
    }
})

bottomRight.addEventListener("click", (event) =>{
    if (on) {
        playerOrder.push(4)
        check(); //checks if the player was corect
        four()
        if(!win) {
            setTimeout(() =>{
                clearColor();
            }, 300)
        }
    }
})

function check() {
    if (playerOrder[playerOrder.length-1 ] !== order[playerOrder.length -1]) 
    good = false;

    if (playerOrder.length == 20 && good == true) {
        winGame()
    }

    if (good == false) {
        flashColor();
        turnCounter.innerHTML = "NO!"
        setTimeout(() => {
            turnCounter.innerHTML = turn
            clearColor()
        }, 800)

        if (strict) {
            play()
        }
        else {
            compTurn = true;
            flash = 0;
            playerOrder = [];
            good = true;
            intervalId = setInterval(gameTurn, 800)
        }
    
        noise = false;
    }
    
    // Condition that player got it correct but has not completed the game yet
 if (turn = playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn
    intervalId = setInterval(gameTurn, 800);

 }


 function winGame() {
    flashColor();
    turnCounter.innerHTML = "WIN!"
    on = false;
    win = true; 
 }

}








