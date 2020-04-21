const { MongoClient } = require("mongodb");

const getCollection = async (req, res) => {
  //getting url params :/

  const { dbName, collection } = req.params;
  //   console.log("---collection---", collection);
  //   console.log(dbName, "dbname");
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db(dbName);
  await db
    .collection(collection)
    .find()
    .toArray((err, data) => {
      if (err) {
        res.status(400).json({ status: 400, connection: "error" });
      } else {
        res.status(200).json({ status: 200, connection: data });
      }
    });

  //close the connection
};

module.exports = { getCollection };
