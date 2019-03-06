/**
 * Declaring base directory
 */
global.__basedir = __dirname;

/**
 * Preprocessing modules
 */
const express = require("express");
const parser = require("body-parser");
const path = require("path");
const api = require("./server/routes/api");

/**
 * Declaration
 */
const port = 3000;

/**
 * Application setup
 */
const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist/")));
app.use("/api", api);

/** Allow cross origin requests */
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Max-Age", "3600");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});

/**
 * API routing
 */
app.get("/", (req, res) => {
  res.sendFile(express.static(path.join(__dirname, "dist/")));
  res.writeHead(200, "Content-Type: text/html");
  res.end("<h3>Express server is running properly...</h3>");
});

/**
 * Server starting...
 */
app.listen(port, "localhost", () => {
  console.log(`Server is starting at port: ${port}`);
});
