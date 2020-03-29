const path = require('path');

const express = require('express');

const cors = require('cors');
const sgMail = require('@sendgrid/mail');
require('dotenv/config');
var bodyParser = require('body-parser')

const app = express();
app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


const port = 8201;

app.get('/api/products', (req, res) => {
  console.log("Recevied request")
  res.sendFile(path.join(__dirname, 'data', 'products.json'));
});

app.get("/url", (req, res, next) => {
  res.json(["Tony","Lisa","Michael","Ginger","Food"]);
 });

app.listen(port, () => {
  console.log(`[products] API listening on port ${port}.`);
});


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/api/email",(req,res, next)=>{

  console.log(req.body)
  const msg = {
    to: 'moustafaElhadary96@gmail.com',
    from: 'test@example.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: JSON.stringify(req.body),
  };
  res.json(msg);
  sgMail.send(msg);
})
 