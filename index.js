const express = require("express");
var cors = require("cors");
require("dotenv").config();
const shortid = require("shortid");
const Razorpay = require("razorpay");

const app = express();

const port = process.env.PORT || 9000;

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


app.use(cors());

app.get("/", (req, res) => {
  res.send("Revieww");
});

const razorpay = new Razorpay({
  key_id: "rzp_test_EFPqH2h7KrzvNW",
  key_secret: "DXDbTQzxguIzWflAwOpVF6Bb",
});


app.get("/checkout", async (req, res) => {

  const payment_capture = 1;
  const amount = 499;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    return res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "failed to create payment please try again later" });
  }
});




app.listen(port, () => {
  console.log(`express server is running at http://localhost:${port}`);
});