const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
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

const jsonParser = bodyParser.json();

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
});

app.get('/assignments', (req, res) => {
  const userID = req.query.userID;
  const userType = req.query.userType

  if(typeof userID  === "undefined" || typeof userType  === "undefined"){
    return res.send(BAD_REQUEST);
  }

  if(userType === "student") {
    pool.query(`select id, type, grade, submittedAnswer from Assignments where student='${userID}'`, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.send(results);
      }
    });
  }else if(userType === "instructor") {
    pool.query(`select id, student, type, grade, submittedAnswer from Assignments`, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.send(results);
      }
    });
  } 
});

// for post actions due to time constraints we're going to be foolishly trusting here
app.post('/assignments', jsonParser, (req, res) => {
  console.log("cool messaage", req.body);
  switch(req.body.action) {
    case "submit-assignment":
      pool.query(`update Assignments set submittedAnswer = '${req.body.submissionAnswer}' where id = '${req.body.assignmentID}'`, (err, results) => {
        if (err) {
          return res.send(err);
        } else {
          return res.send(results);
        }
      });
      break;
    case "grade-assignment":
      pool.query(`update Assignments set grade = '${req.body.grade}' where id = '${req.body.assignmentID}'`, (err, results) => {
        if (err) {
          return res.send(err);
        } else {
          return res.send(results);
        }
      });
      break;
    default:
      return res.send(BAD_REQUEST);
  }
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