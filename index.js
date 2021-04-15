const express = require("express");
const app = express();
// const MongoClient = require("mongodb").MongoClient;
// const ObjectID = require("mongodb").ObjectID;
// const cors = require("cors");
// const bodyParser = require("body-parser");
require("dotenv").config();

const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("database working !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
});

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9sgcr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// client.connect((err) => {
//   const bookCollection = client.db("newrite").collection("books");

//   app.get("/books", (req, res) => {
//     bookCollection.find().toArray((err, items) => {
//       res.send(items);
//     });
//   });

//   app.post("/addbook", (req, res) => {
//     const newEvent = req.body;
//     bookCollection.insertOne(newEvent).then((result) => {
//       res.send(result.insertedCount > 0);
//     });
//   });

//   app.get("/books/:id", (req, res) => {
//     bookCollection
//       .find({
//         _id: { $in: [ObjectID(req.params.id)] },
//       })
//       .toArray((err, items) => {
//         res.send(items);
//       });
//   });
//   app.delete("/deleteEvent/:id", (req, res) => {
//     bookCollection
//       .findOneAndDelete({
//         _id: { $in: [ObjectID(req.params.id)] },
//       })
//       .toArray((err, items) => {
//         res.send(items);
//       });
//   });
// });
// client.connect((err) => {
//   const bookCollection = client.db("newrite").collection("orders");
//   app.post("/addOrders", (req, res) => {
//     const newOrders = req.body;
//     bookCollection.insertOne(newOrders).then((result) => {
//       res.send(result.insertedCount > 0);
//     });
//   });
//   app.get("/order", (req, res) => {
//     const queryEmail = req.query.email;
//     bookCollection.find({ email: queryEmail }).toArray((err, items) => {
//       res.send(items);
//     });
//   });
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
