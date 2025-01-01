const express = require('express');
const app = express();
const connection = require('./DB/connection.js');
const dotenv = require('dotenv');
const errormiddleware = require('./errormiddleware.js');
const router = require('./routes/route.js');
const cookieParser=require('cookie-parser');
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', router);
app.use(errormiddleware);
connection()
    .then(() => {
        console.log("DB listening");
        
        app.listen(3000, () => {
            console.log("server listening");
        })
    })
    .catch((e) => {
    console.log(e);
    
})