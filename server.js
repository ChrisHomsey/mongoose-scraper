// Import all dependencies!
const   express = require('express'),
        mongoose = require('mongoose'),
        path = require('path'),
        bodyParser = require('body-parser'),
        cheerio = require('cheerio'),
        request = require('request'),
        exphbs = require('express-handlebars');

// Store models in db
const db = require("./models");

// Create Express App and set connection port
const app = express();
const PORT = process.env.PORT || 3000;

// Set static directory
app.use(express.static(path.join(__dirname, 'public')));

// Use that Body Parser thing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set Handlebars as template engine
app.engine('handlebars', exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set("view engine", 'handlebars');

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {});

// Import Routes
require("./routes/api.js")(app, cheerio, request);
require("./routes/view.js")(app);

app.listen(PORT, ()=> console.log(`App listening on port ${PORT}`))