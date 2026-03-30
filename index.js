require('dotenv').config()
const express = require('express');
const connect = require('./utils/db')
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comments');

const port = process.env.PORT || 3550
const app = express();

connect()
app.use(express.json())
app.use("/posts", postRoutes);
app.use("/auth", userRoutes);
app.use("/:postId/comments", commentRoutes);

app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}.`)
})