const express = require('express');
const cors = require('cors');
const dontenv = require('dotenv');
const mongoose = require('mongoose');
dontenv.config();

const routes = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3001; 

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

app.use("/api"  , routes);

mongoose
  .connect(
    process.env.MONGODB_URI || ""
  )
  .then((result) => {
    console.log("App is listening on url http://localhost:" + PORT);
    app.listen(3001);
  })
  .catch((err) => console.log(err));