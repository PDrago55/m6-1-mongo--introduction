const { MongoClient } = require("mongodb");
const dbFunction = async (dbName) => {
  //create a new client
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });
  //open connection to Database server
  await client.connect();
  const db = client.db(dbName);
  await db.collection("one").insertOne({ name: "Blue Rodgers" });
  console.log("Connected!");

  //close the connection to DB server

  client.close();
  console.log("disconnected");
};

dbFunction("exercise_one");
