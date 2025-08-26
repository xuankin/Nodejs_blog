const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const morgan = require("morgan");
const hbs = require("express-handlebars");
const { log } = require("console");
const route = require("./routes");
// app.use(morgan("combined"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources/views"));

// Routes init
route(app);

// 127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
