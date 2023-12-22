
function add(a, b) {
    return parseInt(a) + parseInt(b);
}

function subtract(a, b) {
    return parseInt(a) - parseInt(b);
}

function multiply(a, b) {
    return parseInt(a) * parseInt(b);
}

function divide(a, b) {
    if ( parseInt(b) === 0) return "Divide by Zero Error!";
    return parseInt(parseInt(a) / parseInt(b));
}

let num1 = 0;
let op = "+";
let num2 = 0;

function operate(num1, op, num2) {
    switch(op) {
        case "+":
            return parseInt(add(num1, num2));
        case "-":
            return parseInt(subtract(num1, num2));
        case "*":
            return parseInt(multiply(num1, num2));
        case "/":
            return divide(num1, num2);
        default:
            return "Invalid Operator";
    }

}

const buttons = document.querySelectorAll(".button");
const display = document.querySelector("#display");
const operators = {"+": true, "-": true, "*": true, "/": true};
let stack = [];

buttons.forEach((button) => {
    if (button.classList.contains("clear")){
        addClearClickListener(button);
    } else if (button.classList.contains("equals")){
        addEqualsClickListener(button);
    } else {
        addGenericClickListener(button);
    }

})

function addClearClickListener(button) {
    button.addEventListener("click", () => {
        display.textContent = "";
    })
}

function addEqualsClickListener(button) {
    button.addEventListener("click", () => {
        let result = parseCalculations(display.textContent);
        display.textContent = result;
    })
}

function addGenericClickListener(button) {
    button.addEventListener("click", event => {
        let clicked = event.target;
        display.textContent += clicked.textContent;
    })
}

function parseCalculations(displayString) {
    let charArray = Array.from(displayString);

    let start = 0;
    let end = 0;

    charArray.forEach((char) =>{
        if(char in operators){
            let numString = displayString.slice(start, end);
            if (numString){
                stack.push(numString);
                updateStack();
                stack.push(char)
                start = end + 1;
            }
            end += 1;
        } else if (!isNaN(char)){
            end += 1;
        } else{
            return "Invalid String";
        }
    });

    let numString = displayString.slice(start, end);
    if(numString)
        stack.push(displayString.slice(start, end));
    updateStack(true);

    return stack.pop();
}

function updateStack(end = false) {
    if (stack.length > 2){
        num2 = stack.pop();
        op = stack.pop();
        num1 = stack.pop(); 
        stack.push(operate(num1, op, num2));
    } else if (end) {
        stack.filter(() => false);
        stack.push("Parse failed.")
    }
}



