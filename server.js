var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 9000;

// Expose the public directory to access CSS files
app.use(express.static(path.join(__dirname, './app/public/home.html')));


// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

// Add the application routes
require(path.join(__dirname, './app/routing/apiRoutes'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes'))(app);

// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT THAT IS OVER " + PORT);
});
