const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

const app = express();

const initRoutes = require("./app/routes/web");
var cors = require('cors')

// to increase the size of limit 

app.use(cors())

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(fileUpload());


initRoutes(app);
// simple route
app.get("/", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
  res.json({ message: "upload multiple files." });
});




require("./app/routes/role.routes.js")(app);



// set port, listen for requests
// const PORT = process.env.PORT || 3000;
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
