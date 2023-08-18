import express from "express"; //import express library
const app = express(); //create an express library
app.get("/", (req, res) => {
  res.send("Hello World! o");
});
app.listen(4001);
