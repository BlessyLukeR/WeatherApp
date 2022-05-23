const exp = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = exp();

app.use(bodyParser.urlencoded({urlencoded:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
    console.log("gettng request");
});


app.post("/", function(req,res){

    const cityname = (req.body.query).toLowerCase();
    const appid = "57fc00d44a63763eed5689ad16d79721";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+appid +"&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode);
        console.log(url);

        response.on("data", function(data){
            var weatherdata = JSON.parse(data);
            console.log(weatherdata.main.temp);
            console.log(weatherdata.weather[0].description);
            const wea = weatherdata.weather[0].description;
            const tem = weatherdata.main.temp;
            res.write("<h1>The weather today is " + wea+ "</h1>");
            res.write("<p>The temperature is "+tem + "</p>");
            const icon =  weatherdata.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<img src = " + imgurl + ">");
            res.send();

        })

});

})
app.listen(3000, function(){
    console.log("teh server is listening!!");
})