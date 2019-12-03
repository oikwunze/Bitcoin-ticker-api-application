const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.post("/", (req, res) => {
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";

  var finalURL = baseURL + crypto + fiat;

  request(finalURL, function(error, response, body) {
    var data = JSON.parse(body);
    var price = data.last;

    var currentDate = data.display_timestamp;

    res.write(`<p>The current date is ${currentDate}</p>`);
    res.write(
      `<h1>The current price of ${crypto} is: ${price} ${fiat} USD</h1> `
    );
    res.send();
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
