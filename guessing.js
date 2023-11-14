let guesses = 6;

let userGames = 0;
let userGuesses = 0;
let userWins = 0;
let userList = []
let userStreak = 0;

function check(guess, answer) {
    let out = [];
    userGuesses += 1;
    Array.from(guess).forEach((e, i) => {
        
        if(answer[i] == guess[i]) {
            out.push(2);
            return;

        }
        if(answer.indexOf(guess[i]) > -1) {
            out.push(1);
            return;
        }
        if(guess.length < answer.length) {
        // guess += " ".repeat(answer.length-guess.length);
            out.push(-1);
            return;
        }
        else if(guess.length > answer.length) {
            out.push(3);
            return;
        }
        out.push(0);
        
    });
    
    // console.log(out);
    return out;
}
let answer = "";
let playing = false;
getRandomWord((e) => {
    answer = e;
    console.log(e);
});
function restart() {
    let guessbox = document.getElementById("guess_box");
    let textbox = document.getElementById("input_text");
    textbox.value = "";
    userList = [];
    guesses = 6;
    // console.log("found", guessbox);
    guessbox.innerHTML = "";
    getRandomWord((e) => {
        answer = e;
        console.log(e);
    });
    updateStats();
}
document.getElementById("restart_game").addEventListener("click", () => {
    userStreak = 0;
    userGuesses -= 6-guesses;
    userGames += 1;
    restart();
});

document.getElementById('submit_button').addEventListener("click", () => {
        let textbox = document.getElementById("input_text");
        let guessbox = document.getElementById("guess_box");
        
        // console.log(textbox.value);
        // console.log(textbox.value.match(/^[a-z]+$/i));
        
        if(!textbox.value.match(/^[a-z]+$/i)) {
            return;
        }
        let guess = document.createElement("div");
        guess.setAttribute("class","g-3 container p-1");
        
        
        // console.log(answer);
        
        let k = check(textbox.value.toLowerCase(), answer.toLowerCase());
        let correct = 0;
        userList.push(textbox.value.toLowerCase());
        guesses -= 1;
        k.forEach((e, i) => {

            let letter = document.createElement("div",);
            let char = "-"; 
            if(i < textbox.value.length) {
                char = textbox.value[i];
            }
            letter.appendChild(document.createTextNode(char.toUpperCase()));
            let c = "letter ";
            // console.log(textbox.value.length,answer.length);
            if(textbox.value.length!=answer.length) {
                
                c +=  "wronglength ";
            }
            if(e == 2){
                c += "correct";
                correct += 1;
            }
            if(e == 1){
                c += "wrongspot";
            }
            if(e == 3){
                c += "toolong";
            }
            if(e == -1){
                c += "tooshort";
            }
            letter.setAttribute("class", c);
            
            guess.appendChild(letter);}
            );
        
        if(correct == answer.length & answer.length == textbox.value.length ) {
            // console.log('You got it right!');
            userWins += 1;
            userStreak +=1;
            userGames += 1;
            alert("You win!");
            updateStats();
            restart();
            return;
            
        }
        
        if(guesses <= 0 ) {
            userStreak = 0;
            userGames += 1;
            guessbox.appendChild(guess);
            updateStats();
            textbox.value="";
            alert("You Lost ;-(");
            restart()
            return;
            
        }
        
        updateStats();
        guessbox.appendChild(guess);
        textbox.value="";
    }
    );

//history and local storage 
function save() {
    // var userGames = document.getElementById("games").value;
    localStorage.setItem("myGames", userGames);
    // var userGuesses = document.getElementById("guesses").value;
    localStorage.setItem("myGuesses", userGuesses);
    // var userWins = document.getElementById("wins").value;
    localStorage.setItem("myWins", userWins);
    // var userStreak = document.getElementById("streak").value;
    localStorage.setItem("myStreak", userStreak);
    // var userList = document.getElementById("guess_list").value;
    localStorage.setItem("myList", JSON.stringify(userList));

  }

  function load() {
    // console.log("LOADED");
    if(localStorage) {
        console.log(localStorage);
        temp = localStorage.getItem("myGames")
        if(!isNaN(temp)) {
            console.log("loaded my games");
            userGames = parseInt(temp);
        } 
        else {
            userGames = 0;
        }
        // document.getElementById("games").value = userGames;
        temp = localStorage.getItem("myGuesses")
        if(!isNaN(temp)) {
            userGuesses = parseInt(temp);
        }
        else {
            userGuesses = 0;
        }
        // document.getElementById("guesses").value = userGuesses;
        temp = parseInt(localStorage.getItem("myWins"));

        if(!isNaN(temp)) {
            userWins = parseInt(temp);
        }
        else {
            userWins = 0;
        }
        // document.getElementById("wins").value = userWins;
        temp = parseInt(localStorage.getItem("myStreak"));
        if(!isNaN(temp)) {
            userStreak = parseInt(temp);
        }
        else {
            userStreak = 0;
        }
        
        // document.getElementById("streak").value = userStreak;
        if(localStorage.getItem("myList") == "") {
            userList = [];
        }
        else {
            userList = JSON.parse(localStorage.getItem("myList"));
            
        }
        
        // document.getElementById("guess_list").value = userStreak;
        
    }
    else {
        userGames = 0; 
        userGuesses = 0;
        userWins = 0;
        userList = [];
        userStreak = 0;
    }

    updateStats();
    
  }
function updateStats() {
    console.log(userGames,userGuesses,userWins,userStreak, userGuesses/userGames);
    // lnprint("Games Played:")
    document.getElementById("games").innerHTML="Games Played: " + userGames;
    document.getElementById("guesses").innerHTML="Total Guesses: " + userGuesses;
    // lnprint("Guesses per Game Rate:")
    
    // lnprint("Total Wins:")
    document.getElementById("wins").innerHTML="Wins: " + userWins;
    // lnprint("Win Streak:")
    document.getElementById("streak").innerHTML="Win Streak: " + userStreak;
    var rate = (userGuesses/userGames);
    if(rate == Infinity || isNaN(rate)) {
        console.log("HDUWAI")
        rate = 0;
    }
    console.log("rate: ", rate);
    document.getElementById("rate").innerHTML="Average Guesses per Game: " + rate;
    save(); 
    
}


document.addEventListener("DOMContentLoaded", (e) => load());

document.getElementById('clear_history').addEventListener("click", () => {
    

    userGames = 0; 
    userGuesses = 0;
    userWins = 0;
    userList = [];
    userStreak = 0;
    localStorage.clear();
    restart();
    updateStats();
    console.log(userGames,userGuesses,userWins,userStreak, userGuesses/userGames);
    }
    )
