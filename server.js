const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URL =
  "mongodb://admin:qwerty@127.0.0.1:27017/apnacollege-db?authSource=admin";

const client = new MongoClient(MONGO_URL);
let db;

async function start() {
  await client.connect();
  console.log("✅ Connected to MongoDB");

  db = client.db("apnacollege-db");

  app.get("/getUsers", async (req, res) => {
    const users = await db.collection("users").find({}).toArray();
    res.json(users);
  });

  app.post("/addUser", async (req, res) => {
    const result = await db.collection("users").insertOne(req.body);
    res.json(result);
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

start().catch(err => {
  console.error("❌ Mongo connection failed:", err);
});
