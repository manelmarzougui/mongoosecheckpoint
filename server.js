const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const connectDb = require("./config/connectDb");
const { replaceOne } = require("./models/user");
const user = require("./models/user");

app.use(express.json());

connectDb();

app.post("/add", async (req, res) => {
  try {
    let newUser = new user({ ...req.body });
    let result = await newUser.save();
    res.send({ result, msg: "sucefuly aded" });
  } catch (error) {
    console.log(error);
    res.send({ msg: "fail" });
  }
});

app.get("/getall", async (req, res) => {
  try {
    let result = await user.find();
    res.send({ result, msg: " All users" });
  } catch (error) {
    console.log(error);
    res.send({ msg: "fail" });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const id = req.params;
    let result = await user.findOne({ _id: req.params.id });
    res.send({ result, msg: " ONE users" });
  } catch (error) {
    console.log(error);
    res.send({ msg: "fail" });
  }
});

app.put("/:id", async (req, res) => {
  try {
    let result = await user.findOneAndUpdate({
      _id: req.params.id,
      $set: { ...req.body },
    });
    res.send({ result, msg: " ONE users" });
  } catch (error) {
    console.log(error);
    res.send({ msg: "fail" });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    let result = await user.findOneAndRemove({
      _id: req.params.id,
    });
    res.send({ msg: " delete users" });
  } catch (error) {
    console.log(error);
    res.send({ msg: "fail" });
  }
});

console.log(process.env);
app.listen(process.env.PORT, (err) => {
  err
    ? console.log(err)
    : console.log("server is running..." + process.env.PORT);
});
