
function check(guess, answer) {
    let out = [];
    
    Array.from(guess).forEach((e, i) => {
        
        // if (i > answer.length - 1) {
        //     out.push(3);
        //     return;
        // }
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
    // if(guess.length < answer.length) {
    //     // guess += " ".repeat(answer.length-guess.length);
    //     for(let i = 0; i < answer.length-guess.length; i++) {
    //         out.push(-1);
    //     }
    // }
    console.log(out);
    return out;
}
document.getElementById('submit_button').addEventListener("click", () => {
        let textbox = document.getElementById("input_text");
        let guessbox = document.getElementById("guess_box");
        console.log(textbox.value);
        let guess = document.createElement("div");
        guess.setAttribute("class","g-3 container p-1");
        let answer = "farts"
        let k = check(textbox.value, answer);
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
        guessbox.appendChild(guess);
        textbox.value="";
    }
    );
