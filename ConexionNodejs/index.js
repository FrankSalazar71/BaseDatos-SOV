const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'dbRestaurante'
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Conexión Realizada con exito");
});