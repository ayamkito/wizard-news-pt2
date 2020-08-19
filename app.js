const express = require("express");
const morgan = require("morgan");
// const postBank = require("./postBank");
const postList = require("./views/postList");
const postDetails = require("./views/postDetails");
const dataBank = require("./db/index");

const app = express();

app.use(morgan('dev'));
app.use(express.static("/public"));

app.get("/", async (req, res) => {
  try{
  const data = await dataBank.query("SELECT * FROM posts")
  const posts = data.rows;
  res.send(postList(posts));
  } catch (error){
    console.error(error);
    res.status(500).send(`something went wrong: ${error}`)
  }
});

// app.get("/posts/:id", (req, res) => {
//   const post = postBank.find(req.params.id);
//   res.send(postDetails(post));
// });

const PORT = 1337;

app.listen(PORT, async () => {
  console.log(`App listening in port ${PORT}`);
  // const datab = await client.query("SELECT * FROM posts")
  // console.log(datab)
});