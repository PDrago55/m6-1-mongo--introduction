const file = require("file-system");
const { MongoClient } = require("mongodb");
const assert = require("assert");

const greetings = JSON.parse(file.readFileSync("data/greetings.json"));

const client = new MongoClient("mongodb://localhost:27017", {
  useUnifiedTopology: true,
});

const batchImport = async () => {
  try {
    await client.connect();
    const db = client.db("Greetings");

    const r = await db.collection("greetings").insertMany(greetings);
    assert.equal(greetings.length, r.insertedCount);
    console.log("success");
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
  console.log("batchImport", "disconnected");
};

batchImport();