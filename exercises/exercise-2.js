const { MongoClient } = require("mongodb");
const assert = require("assert");
const client = new MongoClient("mongodb://localhost:27017", {
  useUnifiedTopology: true,
});
const createGreeting = async (req, res) => {
  try {
    await client.connect();
    console.log("connected");
    const db = await client.db("Greetings");
    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);
    console.log("HELLO", req.body);
    res.status(200).json({ status: 201, data: req.body });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
    console.log(err.stack);
  }

  client.close();
  console.log("disconnected");
};

const getGreeting = async (req, res) => {
  const { _id } = req.params;

  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db("Greetings");

  db.collection("greetings").findOne(
    { _id: _id.toUpperCase() },
    (err, result) => {
      result
        ? res.status(200).json({ status: 200, _id, data: result })
        : res.status(404).json({ status: 404, _id, data: "Not Found" });
      client.close();
    }
  );
};

module.exports = { createGreeting, getGreeting };
