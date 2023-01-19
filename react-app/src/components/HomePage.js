import React, { useState } from "react";
import axios from "axios";
// MUI Components
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
// stripe
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// Util imports
import { makeStyles } from "@material-ui/core/styles";
// Custom Components
import CardInput from "./CardInput";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "35vh auto",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
  },
  div: {
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "space-between",
  },
  button: {
    margin: "2em auto 1em",
  },
});

function HomePage() {
  const classes = useStyles();
  // State
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [plan, setPlan] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitPay = async (event) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const res = await axios.post("http://localhost:3000/pay", { email: email });

    const clientSecret = res.data["client_secret"];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        console.log("Money is in the bank!");
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  const handleSubmitSub = async (event) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: email,
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      const res = await axios.post("http://localhost:3000/sub", {
        name: name,
        email: email,
        payment_method: result.paymentMethod.id,
        plan: plan,
      });
      // eslint-disable-next-line camelcase
      log("Response: >>>>>> ", res.data);
      const { client_secret, status } = res.data;

      if (status === "requires_action") {
        stripe.confirmCardPayment(client_secret).then(function (result) {
          if (result.error) {
            console.log("There was an issue!");
            console.log(result.error);
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc)
          } else {
            console.log("You got the money!");
            // Show a success message to your customer
          }
        });
      } else {
        console.log("You got the money!");
        // No additional information was needed
        // Show a success message to your customer
      }
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <TextField
          label="Full Name"
          id="outlined-name-input"
          helperText={`This will be your full name`}
          margin="normal"
          variant="outlined"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          id="outlined-email-input"
          helperText={`Email you'll recive updates and receipts on`}
          margin="normal"
          variant="outlined"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "2px",
            marginBottom: "20px",
          }}
        >
          <label
            htmlFor="plan"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            Plan
          </label>
          <select
            name="plan"
            id="plan"
            style={{ width: "100%", padding: "10px 6px" }}
            value={plan}
            onChange={(e) => {
              if (e.target.value === "standard") {
                return setPlan(process.env.STANDARD_PRICE_ID);
              }
              if (e.target.value === "premium") {
                return setPlan(process.env.PREMIUM_PRICE_ID);
              }
              return;
            }}
          >
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
        </div>
        <CardInput />
        {/* <CardElement /> */}
        <div className={classes.div}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSubmitPay}
          >
            Pay
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSubmitSub}
          >
            Subscription
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default HomePage;
