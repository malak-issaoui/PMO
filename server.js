
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const { Sequelize } = require('sequelize');
const db = require('./models');
db.Sequelize = Sequelize;
require('dotenv/config');
const express = require("express");
const app = express();
//use cookie parser
app.use(cookieParser('secret'));
const errorHandler = require('./middelware/error-handler');


// Enable body parser post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//routes 


const usersRoutes = require('./routes/user.routes');

app.use(`/user`, usersRoutes);
app.use(errorHandler);

let port = process.env.PORT || 3000;
db.sequelize
    .sync({ alter: false, force: false })
    .then(() => {
        app.listen(3000, () => {
            console.log('server running in port 3000');       
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database: ', error.message);
    });





    //team,op :get one by id ,get all ,update , delete  