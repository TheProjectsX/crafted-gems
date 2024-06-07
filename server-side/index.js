import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

dotenv.config();

// Globals
const Items_Insert_Keys = [
  "image",
  "item_name",
  "category",
  "description",
  "price",
  "rating",
  "customization",
  "processing_time",
  "stockStatus",
  "user_email",
  "user_name",
];
const Users_Insert_Keys = ["name", "email", "uid"];

// Configuring App
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());

// Configuring Database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.poi1lw7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
let db;

/* Items Routes */
// Insert a New Item - Protected Route
app.post("/items", async (req, res) => {
  const { uid } = req.headers;
  const body = req.body;

  const uidExists = await db.collection("users").findOne({ uid: uid });

  if (!uidExists) {
    res.status(401).json({ success: false, message: "User Does not Exist" });
    return;
  }

  const allData = Items_Insert_Keys.every((item) =>
    Object.keys(body).includes(item)
  );

  if (!allData) {
    res.status(400).json({ success: false, message: "Invalid Body Request" });
    return;
  }

  body["user_uid"] = uid;
  let result, status;
  try {
    const category = await db
      .collection("categories")
      .findOne({ name: body.category });
    if (category === null) {
      res
        .status(400)
        .json({ success: false, message: "Invalid Category name Provided" });
      return;
    }
    await db
      .collection("categories")
      .updateOne(
        { _id: new ObjectId(category._id) },
        { $set: { item_count: category.item_count + 1 } }
      );

    const dbResult = await db.collection("craft_items").insertOne(body);
    result = { success: true, ...dbResult };
    status = 200;
  } catch (error) {
    result = {
      success: false,
      message: "Failed to Insert Item",
      error: error.message,
    };
    status = 500;
  }

  res.status(status).json(result);
});

// Get All Items and also Filter - Public Route
app.get("/items", async (req, res) => {
  const category = req.query.category;
  const uid = req.query.uid;
  const query = {};
  if (category) {
    query["category"] = category;
  } else if (uid) {
    query["user_uid"] = uid;
  }

  const dbResult = await db.collection("craft_items").find(query).toArray();
  const result = dbResult.map((item) => {
    item["user_uid"] = undefined;
    return item;
  });
  res.status(200).json(result);
});

// Get Single Item - Public Route
app.get("/items/:id", async (req, res) => {
  const id = req.params.id;
  let query;
  try {
    query = { _id: new ObjectId(id) };
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Invalid Item id Provided" });
    return;
  }

  let result, status;
  try {
    const dbResult = await db.collection("craft_items").findOne(query);
    result = dbResult
      ? { success: true, ...dbResult, user_uid: undefined }
      : { success: false, message: "Item not Found!" };
    status = dbResult ? 200 : 404;
  } catch (error) {
    result = { success: false, message: "Item not Found!" };
    status = 404;
  }
  res.status(status).json(result);
});

// Update a New Item - Protected Route
app.put("/items/:id", async (req, res) => {
  const { uid } = req.headers;
  let body = req.body;
  const id = req.params.id;
  let query;
  try {
    query = { _id: new ObjectId(id) };
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Invalid Item id Provided" });
    return;
  }

  const oldItem = await db
    .collection("craft_items")
    .findOne({ ...query, user_uid: uid });
  if (!oldItem) {
    res.status(404).json({ success: false, message: "Item not Found" });
    return;
  }

  const newBody = {};
  Items_Insert_Keys.forEach((item) => {
    const dt = body[item];
    if (dt) {
      newBody[item] = dt;
    }
  });
  body = newBody;

  if (Object.keys(body) === 0) {
    res.status(400).json({ success: false, message: "Invalid Body Request" });
    return;
  }

  body["user_uid"] = uid;
  let result, status;
  try {
    let category = await db
      .collection("categories")
      .findOne({ name: oldItem.category });
    if (category === null) {
      res
        .status(400)
        .json({ success: false, message: "Invalid Category name Provided" });
      return;
    }
    await db
      .collection("categories")
      .updateOne(
        { _id: new ObjectId(category._id) },
        { $set: { item_count: category.item_count - 1 } }
      );

    category = await db
      .collection("categories")
      .findOne({ name: body.category });
    if (category === null) {
      res
        .status(400)
        .json({ success: false, message: "Invalid Category name Provided" });
      return;
    }
    await db
      .collection("categories")
      .updateOne(
        { _id: new ObjectId(category._id) },
        { $set: { item_count: category.item_count + 1 } }
      );

    const doc = {
      $set: body,
    };
    const dbResult = await db.collection("craft_items").updateOne(query, doc);

    result =
      dbResult.matchedCount === 0
        ? { success: false, message: "Item not Found!" }
        : dbResult.modifiedCount === 0
        ? { success: false, message: "Item Data wasn't updated" }
        : { success: true, ...dbResult };
    status =
      dbResult.matchedCount === 0
        ? 404
        : dbResult.modifiedCount === 0
        ? 400
        : 200;
  } catch (error) {
    result = {
      success: false,
      message: "Failed to Update Item",
      error: error.message,
    };
    status = 500;
  }

  res.status(status).json(result);
});

// Delete an Item - Protected Route
app.delete("/items/:id", async (req, res) => {
  const { uid } = req.headers;
  const id = req.params.id;
  let query;
  try {
    query = { _id: new ObjectId(id) };
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Invalid Item id Provided" });
    return;
  }

  const oldItem = await db
    .collection("craft_items")
    .findOne({ ...query, user_uid: uid });
  if (!oldItem) {
    res.status(404).json({ success: false, message: "Item not Found" });
    return;
  }

  let result, status;
  try {
    const category = await db
      .collection("categories")
      .findOne({ name: oldItem.category });
    if (category === null) {
      res
        .status(400)
        .json({ success: false, message: "Invalid Category name Provided" });
      return;
    }
    await db
      .collection("categories")
      .updateOne(
        { _id: new ObjectId(category._id) },
        { $set: { item_count: category.item_count - 1 } }
      );
    const dbResult = await db.collection("craft_items").deleteOne(query);
    result =
      dbResult.deletedCount > 0
        ? { success: true, ...dbResult }
        : { success: false, message: "Item not Found!" };
    status = dbResult.deletedCount > 0 ? 200 : 404;
  } catch (error) {
    result = {
      success: false,
      message: "Failed to Delete Item",
      error: error.message,
    };
    status = 500;
  }

  res.status(status).json(result);
});

/* Category Route */
// Get All Category Data - Public Route
app.get("/categories", async (req, res) => {
  const result = await db.collection("categories").find().toArray();
  res.status(200).json(result);
});

/* Reviews Route */
// Get All Reviews Data - Public Route
app.get("/reviews", async (req, res) => {
  const result = await db.collection("reviews").find().toArray();
  res.status(200).json(result);
});

/* Users Route */
// Insert New User Data
app.post("/users", async (req, res) => {
  const body = req.body;
  const allData = Users_Insert_Keys.every((item) =>
    Object.keys(body).includes(item)
  );
  if (!allData) {
    res.status(400).json({ success: false, message: "Invalid Body Request" });
    return;
  }

  const userExists = await db.collection("users").findOne({ uid: body.uid });
  if (userExists) {
    res.status(400).json({ success: false, message: "User Already Exists" });
    return;
  }

  let result, status;
  try {
    const dbResult = await db.collection("users").insertOne(body);
    result = dbResult.acknowledged
      ? { success: true, ...dbResult }
      : { success: false, message: "Failed to Add User" };
    status = dbResult.acknowledged ? 200 : 500;
  } catch (error) {
    result = {
      success: false,
      message: "Failed to Insert User",
      error: error.message,
    };
    status = 500;
  }

  res.status(status).json(result);
});

// Get all Users
app.get("/users", async (req, res) => {
  const result = await db.collection("users").find().toArray();
  res.status(200).json(result);
});

// Get a User
app.get("/users/:uid", async (req, res) => {
  const uid = req.params.uid;
  let query = { uid };

  let result, status;
  try {
    const dbResult = await db.collection("users").findOne(query);
    result = dbResult
      ? { success: true, ...dbResult }
      : { success: false, message: "User not Found!" };
    status = dbResult ? 200 : 404;
  } catch (error) {
    result = {
      success: false,
      message: "User not Found!",
      error: error.message,
    };
    status = 404;
  }
  res.status(status).json(result);
});

// Delete an User - Protected Route for Admin (Just Because!)
app.delete("/users/:uid", async (req, res) => {
  const uid = req.params.uid;
  let query = { uid };

  let result, status;
  try {
    const dbResult = await db.collection("users").deleteOne(query);
    result =
      dbResult.deletedCount > 0
        ? { success: true, ...dbResult }
        : { success: false, message: "User not Found!" };
    status = dbResult.deletedCount > 0 ? 200 : 404;
  } catch (error) {
    result = {
      success: false,
      message: "Failed to Delete User",
      error: error.message,
    };
    status = 500;
  }

  res.status(status).json(result);
});

// Connecting to MongoDB first, then Starting the Server
client
  .connect()
  .then(async () => {
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    db = client.db("crafts");
    app.listen(port, () => {
      console.log(`Running in port ${port}`);
    });
  })
  .catch(console.dir);
