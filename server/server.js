const express = require( 'express' );
const app = express();
const port = process.env.PORT || 5001;
app.use(express.json());

// Array to store inputs and calc type
let calcInputArray = [];
let currentAnswer;

// GET request for input data and calculation type
app.get( '/history', (req, res) => {
    console.log( 'GET request made for /history' );
    res.send( calcInputArray );
});

// POST request for input data and operation type in history
app.post( '/history', (req, res) => {
    console.log( 'POST request made for /history' );
    let currentCalc = req.body;

    // Calculator logic based on input numbers and operation type
    if ( currentCalc.calcType === '+' ) {
        currentAnswer = Number(currentCalc.input1) + Number(currentCalc.input2);
    } else if ( currentCalc.calcType === '-' ) {
        currentAnswer = Number(currentCalc.input1) - Number(currentCalc.input2);
    } else if ( currentCalc.calcType === '*' ) {
        currentAnswer = Number(currentCalc.input1) * Number(currentCalc.input2);
    } else if ( currentCalc.calcType === '/' ) {
        currentAnswer = Number(currentCalc.input1) / Number(currentCalc.input2);
    }
    console.log( currentAnswer );
    currentCalc.answer = currentAnswer;

    calcInputArray.push( currentCalc );
    console.log( calcInputArray );
    res.sendStatus(201);
});



app.use(express.static('server/public'));
app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});