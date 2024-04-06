const bodyParser = require("body-parser");
const express= require("express");
const https = require("https");
import "index.css";

const app= express();
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res)
{
    res.sendFile(__dirname+"/index.html")
})

app.post("/", function(req,res)
{
    const query= req.body.cityName;
    const unit= "metric"
    const apikey= "356c8ed0c719616febda7119c7c0a3b9"
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&units="+ unit+"&appid="+apikey;
    https.get(url, function(response)
    {
        // console.log(response.statusCode);

        response.on("data",function(data)
        {
            const weatherdata= JSON.parse(data)
            const temp= weatherdata.main.temp;
            const desc= weatherdata.weather[0].description
            const icon= weatherdata.weather[0].icon
            const imageurl= "http://openweathermap.org/img/wn/"+ icon + "@2x.png"
            res.write("<p>Weather description is "+ desc+ "</p>");
            res.write("<h1>The temperature  in "+query+" is "+ temp+ " in degree celcius.</h1>");
            res.write("<img src="+imageurl+">")
            res.send()

        })
    })
})



app.listen(3000, function()
{
    console.log("Server is running on port 3000.");
});
