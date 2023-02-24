console.log( 'hello world' );

// Variables to tell calculator whether it is adding, subtracting, multiplying or diving
let addition = false;
let subtraction = false;
let multiplication = false;
let division = false;
// Functions to change from one calculation to another
function add() {
    addition = true;
    subtraction = false;
    multiplication = false;
    division = false;
    document.getElementById("addButton").style.border = "2px solid black"
    document.getElementById("subtractButton").style.border = ""
    document.getElementById("multiplyButton").style.border = ""
    document.getElementById("divideButton").style.border = ""
}
function subtract() {
    addition = false;
    subtraction = true;
    multiplication = false;
    division = false;
    document.getElementById("subtractButton").style.border = "2px solid black"
    document.getElementById("addButton").style.border = ""
    document.getElementById("multiplyButton").style.border = ""
    document.getElementById("divideButton").style.border = ""
}
function multiply() {
    addition = false;
    subtraction = false;
    multiplication = true;
    division = false;
    document.getElementById("multiplyButton").style.border = "2px solid black"
    document.getElementById("addButton").style.border = ""
    document.getElementById("subtractButton").style.border = ""
    document.getElementById("divideButton").style.border = ""
}
function divide() {
    addition = false;
    subtraction = false;
    multiplication = false;
    division = true;
    document.getElementById("divideButton").style.border = "2px solid black"
    document.getElementById("addButton").style.border = ""
    document.getElementById("subtractButton").style.border = ""
    document.getElementById("multiplyButton").style.border = ""
}
// Clear function to clear both input fields and calculation type
function clearInput() {
    let input1 = document.getElementById('input1')
    let input2 = document.getElementById('input2')
    input1.value = '';
    input2.value = '';
    addition = false;
    subtraction = false;
    multiplication = false;
    division = false;
    document.getElementById("divideButton").style.border = ""
    document.getElementById("addButton").style.border = ""
    document.getElementById("subtractButton").style.border = ""
    document.getElementById("multiplyButton").style.border = ""
}




function calculator () {
    let input1 = document.querySelector('#input1');
    let calcType;
    let input2 = document.querySelector('#input2');
}