const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const myConnection = require('express-myconnection');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '1111310322',
    database: 'jupiter'
}, 'single'));

app.use('/api', routes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

