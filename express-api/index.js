const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./utils/dbConn");
const notFound = require("./utils/notFound");
const app = express()
connectDB();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = 'whsec_h...';
const  User = require('./userModel')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}))

app.use(cors())

app.post('/createuser', async(req,res,next) =>{
  try {
    const newUser = new User({
        ...req.body
    })
    await newUser.save()
    if(!newUser) return res.status(400).json({message: "User not created"})
    res.status(201).json({message: "User  created", newUser})

  } catch (error) {
      console.log(error);
      next(error)
  }
})

app.post('/pay', async (req, res) => {
    const {email} = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 7500,
        currency: 'usd',
        // Verify your integration in this guide by including this parameter
        metadata: {integration_check: 'accept_a_payment'},
        receipt_email: email,
      });

      res.json({'client_secret': paymentIntent['client_secret']})
})
  
app.post('/sub', async (req, res) => {
  const {email, payment_method, plan, name} = req.body;

    // check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    // Check if the user is already subscribed
    if (user.subscribed) {
        return res.status(400).json({ error: "User is already subscribed" });
    }

    const customer = await stripe.customers.create({
      payment_method: payment_method,
      email: email,
      currency: usd,
      name: name,
      invoice_settings: {
        default_payment_method: payment_method,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: plan}],
      expand: ['latest_invoice.payment_intent']
    });
    
    if(subscription){
      console.log(customer);
    }

    const status = subscription['latest_invoice']['payment_intent']['status'] 
    const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']

    res.status(200).json({'client_secret': client_secret, 'status': status});

    console.log({'client_secret': client_secret});
    console.log({'status': status});
})

app.post('/webhooks', (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  }
  catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const email = event['data']['object']['receipt_email'] // contains the email that will recive the recipt for the payment (users email usually)
      console.log(`PaymentIntent was successful for ${email}!`)
      break;
    }
    default:
      // Unexpected event type
      return res.status(400).end();
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({received: true});
})

app.use(notFound);

mongoose.connection.once("open", () => {
  console.log("connected to DB");
  app.listen(process.env.PORT, () => {
    console.log(`connected to backend - ${process.env.PORT}`);
  });
});
