const { MongoClient } = require("mongodb");

const getCollection = async (req, res) => {
  res.status(200).json({ status: 200, connection: "successful!" });
};
