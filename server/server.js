const express = require( 'express' );
const app = express();
const port = process.env.PORT || 5001;
app.use(express.json());

// Array to store inputs and calc type
let calcInputArray = [];

// GET request for input data and calculation type
app.get( '/history', (req, res) => {
    console.log( 'GET request made for /history' );
    res.send( calcInputArray );
} )

// POST request for input data and calculation type in history
app.post( '/history', (req, res) => {
    console.log( 'POST request made for /history' );
    let currentCalc = req.body;
    calcInputArray.push( currentCalc );
})



app.use(express.static('server/public'));
app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});