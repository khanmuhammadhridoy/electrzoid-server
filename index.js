const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const fileUpload = require("express-fileupload");
const ObjectID = require("mongodb").ObjectID;
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("database working !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9sgcr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const electricCollection = client.db("electrzoid").collection("member");
  app.post("/addMember", (req, res) => {
    const file = req.files.file;
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    const newImg = file.data;
    const encImg = newImg.toString("base64");

    const image = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(encImg, "base64"),
    };

    electricCollection
      .insertOne({ name, role, email, image })
      .then((result) => {
        res.send(result.insertedCount > 0);
      });
  });
  app.post("/ismember", (req, res) => {
    const email = req.body.email;
    console.log(email);
    electricCollection.find({ email: email }).toArray((err, members) => {
      console.log(members);
      res.send(members.length > 0);
    });
  });
  app.get("/members", (req, res) => {
    electricCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });
  app.delete("/memberDelete/:id", (req, res) => {
    electricCollection
      .findOneAndDelete({
        _id: { $in: [ObjectID(req.params.id)] },
      })
      .toArray((err, items) => {
        res.send(items);
      });
  });
});

client.connect((err) => {
  const servicesCollection = client.db("electrzoid").collection("services");
  app.post("/addService", (req, res) => {
    const file = req.files.file;
    const name = req.body.name;
    const price = req.body.price;
    const newImg = file.data;
    const encImg = newImg.toString("base64");
    const image = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(encImg, "base64"),
    };
    servicesCollection.insertOne({ name, price, image }).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/services", (req, res) => {
    servicesCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });
  app.delete("/serviceDelete/:id", (req, res) => {
    servicesCollection
      .findOneAndDelete({
        _id: { $in: [ObjectID(req.params.id)] },
      })
      .toArray((err, items) => {
        res.send(items);
      });
  });
});

client.connect((err) => {
  const messageCollection = client.db("electrzoid").collection("message");
  app.post("/messages", (req, res) => {
    const newEvent = req.body;
    messageCollection.insertOne(newEvent).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/messages", (req, res) => {
    messageCollection.find().toArray((err, items) => {
      res.send(items);
    });
  });
});
client.connect((err) => {
  const ordersCollection = client.db("electrzoid").collection("orders");

  app.post("/addOrders", (req, res) => {
    const newOrders = req.body;
    ordersCollection.insertOne(newOrders).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
  app.post("/member", (req, res) => {
    const email = req.body.email;
    console.log(email);
    ordersCollection.find({ email: email }).toArray((err, members) => {
      console.log(members);
      res.send(members.length > 0);
    });
  });
  app.get("/orders", (req, res) => {
    ordersCollection.find().toArray((err, items) => {
      res.send(items);
    });
  });
});
client.connect((err) => {
  const reviewsCollection = client.db("electrzoid").collection("reviews");
  app.post("/addReviews", (req, res) => {
    const newEvent = req.body;
    reviewsCollection.insertOne(newEvent).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
  app.get("/reviews", (req, res) => {
    reviewsCollection.find().toArray((err, items) => {
      res.send(items);
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
