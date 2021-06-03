const cors = require('cors');
const express = require('express');
const mysql = require('mysql');

const BAD_REQUEST = "bad request";

const app = express();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

app.use(cors());

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
});

app.get('/test', (req, res) => {
  const { table } = req.query;

  pool.query(`select * from ${table}`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

app.get('/login', (req, res) => {
  const userID = req.query.userID;
  const userPassword = req.query.userPassword;

  if(typeof userID  === "undefined" || typeof userPassword  === "undefined"){
    return res.send(BAD_REQUEST);
  }

  pool.query(`select name, id, type from Users where id='${userID}' and password='${userPassword}'`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});