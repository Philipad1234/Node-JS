const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html")

})

app.post("/", function(req, res){


  const query = req.body.cityName;
  const apiKey = "4f17d56080be5d9b4d152604bc39a776";
  const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" +  apiKey +"&units=" + unit;

    https.get(url, function(response) {

      response.on("data", function(data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imgURL = "http://openweathermap.org/img/wn/"+  icon  +"@2x.png"

        res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius.</h1>")
        res.write("<h2>The weather is currently " + weatherDescription + "</h2>");
        res.write("<img src=" + imgURL + ">");
        res.send()
      })
    })


})




app.listen(3000, function() {
  console.log("Server started on port 3000")
})
