"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
//put {} around the function
const { getCollection } = require("./exercises/exercise-1-2");
const { createGreeting } = require("./exercises/exercise-2");
const { getGreeting } = require("./exercises/exercise-2");
const { moreGreetings } = require("./exercises/exercise-2");
const PORT = process.env.PORT || 8000;
express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // exercise 1

  .get("/ex-1/:dbName/:collection", getCollection)

  // exercise 2
  .post("/ex-2/greeting", createGreeting)
  .get("/ex-2/:_id", getGreeting)
  .get("/ex-2/greeting", moreGreetings)
  // handle 404s
  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
