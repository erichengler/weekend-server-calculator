const express = require( 'express' );
const app = express();
const port = process.env.PORT || 5001;
app.use(express.json());

// Array to store inputs and calc type
let calcInput = [];

// Request functions go here


app.use(express.static('server/public'));
app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});