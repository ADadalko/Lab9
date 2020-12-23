
const editModule = require("./js/editModule");
const deleteModule = require("./js/deleteModule");
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbClimate;

app.use(express.static(__dirname + "/html"));
app.use(express.static(__dirname + "/js"));
app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/resource"));

app.set("view engine", "pug");

let dbClient;

app.use(express.static(__dirname + "/public"));

let day = "2020-12-06";
let date = "6-го декабря 2020 года";

mongoClient.connect(function (err, client) {
  if (err) return console.log(err);
  dbClient = client;
  app.locals.collection = client.db("usersdb").collection("users");
  const db = client.db("usersdb");
  let counter = 1;
  db.collection("users")
    .find({ day: day })
    .count(function (err, add) {
      counter = add;
    });
  let degrees = [];
  let a = {
    result: 0,
  };
  db.collection("users")
    .find({ day: day })
    .toArray(function (err, doc) {
      for (i = 0; i < counter; i++) {
        degrees.push(doc[i].age);
      }
      a = {
        result: Math.min(...degrees),
      };
      console.log(
        date + " минимальная температура среди всех регионов составляла " +
          Math.min(...degrees) +
          " градуса(ов) по Цельсию"
      );
    });
  app.use("/climate", function (req, res) {
    res.render("climate", a);
  });
  app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
  });
});

app.get("/api/users", function (req, res) {
  const collection = req.app.locals.collection;
  collection.find({}).toArray(function (err, users) {
    if (err) return console.log(err);
    res.send(users);
  });
});
app.get("/api/users/:id", function (req, res) {
  const id = new objectId(req.params.id);
  const collection = req.app.locals.collection;
  collection.findOne({ _id: id }, function (err, user) {
    if (err) return console.log(err);
    res.send(user);
  });
});

app.post("/api/users", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const userName = req.body.name;
  const userAge = req.body.age;
  const climatePrecipitation = req.body.precipitation;
  const climateDay = req.body.day;
  const user = {
    name: userName,
    age: userAge,
    precipitation: climatePrecipitation,
    day: climateDay,
  };

  const collection = req.app.locals.collection;
  collection.insertOne(user, function (err, result) {
    if (err) return console.log(err);
    res.send(user);
  });
});

app.delete("/api/users/:id", function (req, res) {
  const id = new objectId(req.params.id);
  const collection = req.app.locals.collection;
  collection.findOneAndDelete({ _id: id }, function (err, result) {
    if (err) return console.log(err);
    let user = result.value;
    res.send(user);
  });
});

app.put("/api/users", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const id = new objectId(req.body.id);
  const userName = req.body.name;
  const userAge = req.body.age;
  const climatePrecipitation = req.body.precipitation;
  const climateDay = req.body.day;

  const collection = req.app.locals.collection;
  collection.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        age: userAge,
        name: userName,
        precipitation: climatePrecipitation,
        day: climateDay,
      },
    },
    { returnOriginal: false },
    function (err, result) {
      if (err) return console.log(err);
      const user = result.value;
      edit = result.value;
      res.send(user);
    }
  );
});

process.on("SIGINT", () => {
  dbClient.close();
  process.exit();
});
