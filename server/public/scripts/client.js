console.log( 'hello world' );

// Stretch input field querySelector
let stretchInput = document.querySelector('#stretchInput');

// Variable to tell calculator whether it is adding, subtracting, multiplying or diving
let calculation = ''

// Operation functions to change from one operation to another
function add() {
    calculation = '+';
    document.getElementById("addButton").style.border = "2px solid black"
    document.getElementById("subtractButton").style.border = ""
    document.getElementById("multiplyButton").style.border = ""
    document.getElementById("divideButton").style.border = ""
}
function subtract() {
    calculation = '-';
    document.getElementById("subtractButton").style.border = "2px solid black"
    document.getElementById("addButton").style.border = ""
    document.getElementById("multiplyButton").style.border = ""
    document.getElementById("divideButton").style.border = ""
}
function multiply() {
    calculation = '*';
    document.getElementById("multiplyButton").style.border = "2px solid black"
    document.getElementById("addButton").style.border = ""
    document.getElementById("subtractButton").style.border = ""
    document.getElementById("divideButton").style.border = ""
}
function divide() {
    calculation = '/';
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
    calculation = '';
    document.getElementById("divideButton").style.border = ""
    document.getElementById("addButton").style.border = ""
    document.getElementById("subtractButton").style.border = ""
    document.getElementById("multiplyButton").style.border = ""
}



// * STRETCH FUNCTIONS *

// Clear function to clear stretch input field
function clearStretch() {
    stretchInput.value = '';
}

// Function to select operation type on stretch calculator ( tried a shortcut version )
function stretchOp(event) {
    calculation = event.target.innerHTML;
    // If stretch input field is empty, create a '-' for negative numbers
    if ( calculation === '-' && stretchInput.value === '' ) {
        stretchInput.value = '-';
    } 
    // If input field is not empty or starting with a '-', add operation to input field
    if ( stretchInput.value !== '' && stretchInput.value !== '-' ) {
        stretchInput.value += calculation;
    }
}

// Function to add numbers to stretch input field on button press
function stretchNum(event) {
    stretchInput.value += event.target.innerHTML;
}

// The only working alternative to using eval that I found in my research (not sure what this is doing but it works)
// I realize this isn't following the rules of having the calculator logic on the server side, but I couldn't figure that out for the stretch side
// I maybe could have done it with only 2 numbers plugged into my input1 and input2 but adding 2+ operation types and 3+ numbers made it difficult
function iCopiedThis(fn) {
    return new Function('return ' + fn)();
  }
  
 function stretchEquals() {
    let answerDiv = document.querySelector('#answer');
    answerDiv.innerHTML = iCopiedThis( stretchInput.value )

   let stretchHistoryDiv = document.querySelector('#stretchHistory');
    stretchHistoryDiv.innerHTML += `
        ${stretchInput.value} = ${answerDiv.innerHTML}<br /><br />
    `;
    stretchInput.value = '';
 }

function deleteStretch() {
    let stretchHistoryDiv = document.querySelector('#stretchHistory');
    stretchHistoryDiv.innerHTML = '';
}

// * END OF STRETCH FUNCTIONS



// Equals function to send input data and operation type to the server
function equals() {
    let historyDiv = document.querySelector('#history');
    historyDiv.innerHTML = '';

    // Object to send to server based on user inputs and operation type
        let calculationForServer = {
            input1: document.querySelector('#input1').value,
            calcType: calculation,
            input2: document.querySelector('#input2').value,
        }

    // Axios request matching the POST request from server.js
    axios.post( '/history', calculationForServer ).then((response) => {
        console.log( response );
    }).catch((error)=> {
        console.log(error);
        alert('something went wrong');
    });

    // Axios request matching the GET request from server.js
    axios.get( '/history' ).then((response) => {
        let equationsFromServer = response.data;
        console.log( equationsFromServer );
        for ( let equation of equationsFromServer ) {
            let answerDiv = document.querySelector('#answer');
            answerDiv.innerHTML = equation.answer

            historyDiv.innerHTML += `
            <p>${equation.input1} ${equation.calcType} ${equation.input2} = ${equation.answer}</p>
            `;
        }
    }).catch((error)=> {
        console.log(error);
        alert('something went wrong');
    });
}

// Function to delete entire history
function deleteBase() {
    let historyDiv = document.querySelector('#history');
    historyDiv.innerHTML = '';
    axios.delete( `/history` ).then((response) => {
    }).catch((error) => {
        console.log( error );
        alert( 'Something went wrong.' );
    })
}