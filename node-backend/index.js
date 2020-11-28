const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require("./routes");

mongoose
  .connect("mongodb://mongo-service/database", { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use(cors({origin: '*'}));
    app.use("/api", routes);

    app.listen(3000, () => {
      console.log("Server has started!");
    });
  });