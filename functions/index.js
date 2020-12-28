const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51I3Ow6GYmxhuBAS2uUBpn53BzmBo0RIwOJ07SOryDtRdCn3ijnwtVWcC3rNSNWwwAFyPsjp6Om8V0BN4U0K18xNK00TKbhk670')

//API

//App config
const app = express();

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json())


//API routes
app.get('/', (request, response) => response.status(200).send('Hello World'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('Payment Request Recieved for ammount: ', total);

    const paymentIntent = await stripe.paymentIntents.create({
        ammount: total, //subunits of the currency
        currency: "usd"
    });

    //OK - created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//Listen command
exports.api = functions.https.onRequest(app)

//Example endpoint
// http://localhost:5001/clone-5ac71/us-central1/api