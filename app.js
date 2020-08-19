const express = require("express");
const morgan = require("morgan");
const postList = require("./views/postList");
const postDetails = require("./views/postDetails");
const dataBank = require("./db/index");


const app = express();

app.use(morgan('dev'));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try{
  const data = await dataBank.query("SELECT * FROM posts");
  const data1 = await dataBank.query("SELECT * FROM users")
  const posts = data.rows;
  const users = data1.rows
  res.send(postList(posts,users));
  } catch (error){
    console.error(error);
    res.status(500).send(`something went wrong: ${error}`)
  }
});

app.get("/posts/:id", async (req, res) => {
  const data = await dataBank.query("SELECT * FROM users");
  const post = data.rows;
  res.send(postDetails(post));
});

const PORT = 1337;

app.listen(PORT, async () => {
  console.log(`App listening in port ${PORT}`);
});