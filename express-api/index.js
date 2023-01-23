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
// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const  User = require('./userModel')

// parse application/x-www-form-urlencodedgghbbb ggbbgb
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

  try {
    const {email, payment_method, plan, name} = req.body;
    // check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
          console.log( "User not found" )
        return res.status(404).json({ error: "User not found" });
    }
    // Check if the user is already subscribed
    if (user.subscribed) {
      console.log( "User is already subscribed" )
        return res.status(400).json({ error: "User is already subscribed" });

    }

    const customer = await stripe.customers.create({
      payment_method: payment_method,
      email: email,
      name: name,
      invoice_settings: {
        default_payment_method: payment_method,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: plan}],
      expand: ['latest_invoice.payment_intent'],
    });
    
    if(subscription){
      console.log(subscription);
    }

      const status = subscription['latest_invoice']['payment_intent']['status'] 
      const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']

      // (Wrong implementation but update the user if the status is succeeded  
      // -- until wehook is applied to it, then this will be moved to the webhook
      if(status === "succeeded"){
       // Determine the plan name based on the plan ID
          let planName;
          if (plan === process.env.STANDARD_PRICE_ID) {
            planName = "standard";
          } else if (plan === process.env.PREMIUM_PRICE_ID) {
            planName = "premium";
          } else {
            planName = "basic";
          }

          user.subscribed = true;
          user.subscription = planName;
          user.customerIdOnStripe = customer.id
          try {
              await user.save();
              console.log({user});
          } catch (error) {
              return res.status(500).json({ error: "Error updating user" });
          }
      }

      res.status(200).json({'client_secret': client_secret, 'status': status});

      console.log({'client_secret': client_secret});
      console.log({'status': status});

  } catch (error) {
    return res.status(500).json({ error: "Error creating Subscription" });
  }
  
})

app.post('/cancel-subscription', async (req, res) => {
  const { customerId } = req.body;

  // Check if the customer exists
  const customer = await stripe.customers.retrieve(customerId);
  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  // Cancel the customer's subscription
  await stripe.subscriptions.del(customer.subscriptions.data[0].id);

  // Update the user's subscribed status and subscription plan
  await User.updateOne({ email: customer.email }, { $set: { subscribed: false, subscription: "basic" } });

  res.status(200).json({ message: "Subscription cancelled" });
});

// app.post('/webhooks', (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let event;

//     try {
//       event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
//       console.log(event);
//     }
//     catch (err) {
//         return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded': {
//       const email = event['data']['object']['receipt_email'] 
//       // contains the email that will recieve the receipt for the payment (users email usually)
//       console.log(`PaymentIntent was successful for ${email}!`)
//       break;
//     }

//     case 'payment_intent.payment_failed': {
//       const email = event['data']['object']['receipt_email'] 
//       // contains the email that will recieve the receipt for the payment (users email usually)
//       console.log(`PaymentIntent was failed for ${email}!`)
//       break;
//     }

//     case ' payment_intent.requires_action': {
//       const email = event['data']['object']['receipt_email'] 
//       // contains the email that will recieve the receipt for the payment (users email usually)
//       console.log(`PaymentIntent was required action for ${email}!`)
//       break;
//     }
   
//     case 'customer.subscription.created': {
//       const email = event['data']['object']['receipt_email'] 
//       // contains the email that will recieve the update for the payment (users email usually)
//       console.log(`customer subscription created for ${email}!`)
//       break;
//     }

//     case 'customer.subscription.updated': {
//       const email = event['data']['object']['receipt_email'] 
//       // contains the email that will recieve the update for the payment (users email usually)
//       console.log(`customer subscription updated for ${email}!`)
//       break;
//     }

//     case 'customer.subscription.deleted': {
//       const email = event['data']['object']['receipt_email'] 
//       // contains the email that will recieve the delete for the payment (users email usually)
//       console.log(`customer subscription deleted for ${email}!`)
//       break;
//     }

//     default:
//       // Unexpected event type
//       return res.status(400).end();
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   res.json({received: true});
// })

app.use(notFound);

//optional
// app.post('/webhook', async (req, res) => {
//   const event = req.body;

//   if (event.type === 'invoice.payment_succeeded') {
//     // retrieve the subscription
//     const subscription = await stripe.subscriptions.retrieve(event.data.object.subscription);

//     // check if the subscription is active
//     if (subscription.status === 'active') {
//       // cancel the subscription
//       const canceledSubscription = await stripe.subscriptions.update(subscription.id, { cancel_at_period_end: true });

//       // send a response to Stripe to acknowledge receipt of the webhook event
//       res.json({ received: true });
//     }
//   }
// });


mongoose.connection.once("open", () => {
  console.log("connected to DB");
  app.listen(process.env.PORT, () => {
    console.log(`connected to backend - ${process.env.PORT}`);
  });
});

