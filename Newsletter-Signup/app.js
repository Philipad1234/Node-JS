const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let email = req.body.email;

  let data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  let jsonData = JSON.stringify(data)

  let url = "https://us10.api.mailchimp.com/3.0/lists/a4130ea5bc";

  let options = {
    method: "POST",
    auth: "Philip1:090044886a8fe8f0bc8ab7c9c8745702-us10"
  }

  let request = https.request(url, options, function(response) {

if (response.statusCode === 200){
  res.sendFile(__dirname + "/success.html")
}else{
  res.sendFile(__dirname + "/failure.html")
}

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })

request.write(jsonData);
request.end();

})

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
})

// API Key
// 090044886a8fe8f0bc8ab7c9c8745702-us10

// List Id
// a4130ea5bc
