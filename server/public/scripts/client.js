console.log( 'hello world' );

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