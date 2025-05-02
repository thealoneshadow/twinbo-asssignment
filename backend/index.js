const express = require("express");
const app = express();
app.get("/", (_, res) => res.send("Hello from Node!"));
app.listen(3001, () => console.log("Server on http://localhost:3001"));
