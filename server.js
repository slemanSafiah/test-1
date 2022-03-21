var express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/api", (req, res) => {
  return res.json({
    unix: Date.now().valueOf(),
    utc: new Date(Date.now()).toUTCString(),
  });
});

app.get("/api/:time", (req, res) => {
  console.log(new Date(req.params.time));
  let utcTime, unixTime;
  if (req.params.time.length === 13) {
    (unixTime = parseInt(req.params.time)),
      (utcTime = new Date(parseInt(req.params.time)).toUTCString());
  } else if (new Date(req.params.time).toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  } else {
    utcTime = new Date(req.params.time).toUTCString();
    unixTime = new Date(req.params.time).valueOf();
  }
  res.json({
    unix: unixTime,
    utc: utcTime,
  });
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// * process.env.PORT

var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
