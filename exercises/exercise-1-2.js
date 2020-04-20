const { MongoClient } = require("mongodb");

const getCollection = async (req, res) => {
  res.status(200).json({ status: 200, connection: "successful!" });
  //getting url params :/

  const { dbName, collection } = req.params;

  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db(dbName);
  db.collection(collection)
    .find()
    .toArray((err, data) => {
      console.log(data);
      if (err) {
        res.status(400).json({ status: 400, connection: data });
      } else {
        res.status(200).json({ status: 200, connection: "great success" });
      }
    });

  //close the connection

  client.close();
  console.log("disconnected");
};

module.exports = { getCollection };
