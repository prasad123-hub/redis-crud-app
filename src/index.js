import express from "express";
import cors from "cors";
import { Client, Repository } from "redis-om";
import { userSchema } from "./schema/user.schema.js";
import { productSchema } from "./schema/product.schema.js";

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

// CREATE REDIS CLIENT
const client = new Client();
await client.open(
  "redis://prasad:Prasad_123@redis-10128.c14.us-east-1-2.ec2.cloud.redislabs.com:10128"
); //redis://<username>:<password>@endpoint

// ***************************************************************************************
// *********************** USER SIGNUP/LOGIN FUNCTIONALITY********************************
// ***************************************************************************************

//user Repo
const userRepository = client.fetchRepository(userSchema); // redis get connected to our schema
await userRepository.dropIndex();
await userRepository.createIndex();

// product repo
const productRepository = client.fetchRepository(productSchema);
await productRepository.dropIndex();
await productRepository.createIndex();

// GET ALL USERS
app.get("/users", async (req, res) => {
  res.send(await userRepository.search().returnAll()); //check on localhost:8000 you will get empty array []
});

// SignUp
// POST user
app.post("/signup", async (req, res) => {
  const user = userRepository.createEntity();

  user.name = req.body.name;
  user.email = req.body.email;
  user.active = false;
  user.id = await userRepository.save(user);

  res.send(user);
});

// Login user
app.post("/login", async (req, res) => {
  try {
    let result = await userRepository
      .search()
      .where("email")
      .equals(req.body.email)
      .returnAll();
    console.log(result[0].name);
    res.status(200).send("Logged In Successfully");
  } catch (error) {
    console.log("Invalid Credentials");
    res.status(404).send("Invalid Credentials");
  }
});

// update user
app.put("/users/:id", async (req, res) => {
  const user = await userRepository.fetch(req.params.id);

  user.active = req.body.active;
  await userRepository.save(user);
  res.send(user);
});

// delete user
app.delete("/users/:id", async (req, res) => {
  await userRepository.remove(req.params.id);
  res.send(null);
});

// ***************************************************************************************
// *********************** PRODUCT CRUD FUNCTIONALITY ************************************
// ***************************************************************************************

// GET ALL PRODUCTS
// get products
app.get("/products", async (req, res) => {
  const products = await productRepository.search().returnAll();
  res.send(products);
});

// add product
app.post("/product/add", async (req, res) => {
  const product = productRepository.createEntity();

  product.productName = req.body.productName;
  product.productDescription = req.body.productDescription;
  product.productPrice = req.body.productPrice;
  product.productCategory = req.body.productCategory;
  product.id = await productRepository.save(product);

  res.send(product);
});

// update product
app.put("/product/:id", async (req, res) => {
  const product = await productRepository.fetch(req.params.id);

  product.productName = req.body.productName;
  product.productDescription = req.body.productDescription;
  product.productPrice = req.body.productPrice;
  product.productCategory = req.body.productCategory;
  product.id = await productRepository.save(product);

  res.send(product);
});

// Delete Product
app.delete("/product/:id", async (req, res) => {
  await productRepository.remove(req.params.id);
  res.send(null);
});

app.listen(8000, () => {
  console.log("App started on port 8000");
});
