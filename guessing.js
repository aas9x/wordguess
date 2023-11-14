
function check(guess, answer) {
    let out = [];
    
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
document.getElementById("restart_game").addEventListener("click", () => {
        let guessbox = document.getElementById("guess_box");
        let textbox = document.getElementById("input_text");
        textbox.value = "";
        // console.log("found", guessbox);
        guessbox.innerHTML = "";
        getRandomWord((e) => {
            answer = e;
            console.log(e);
        });

});
document.getElementById('submit_button').addEventListener("click", () => {
        let textbox = document.getElementById("input_text");
        let guessbox = document.getElementById("guess_box");
        
        // console.log(textbox.value);
        // console.log(textbox.value.match(/^[a-z]+$/i));
        if(!textbox.value.match(/^[a-z]+$/i) || guessbox.children.length > 5) {
            return;
        }
        let guess = document.createElement("div");
        guess.setAttribute("class","g-3 container p-1");
        
        
        // console.log(answer);
        
        let k = check(textbox.value.toLowerCase(), answer.toLowerCase());
        let correct = 0;
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
        
        ;
        if(correct == answer.length & answer.length == textbox.value.length ) {
            console.log('You got it right!');
        }
        guessbox.appendChild(guess);
        textbox.value="";
        
    }
    );
