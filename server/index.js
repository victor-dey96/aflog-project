const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "essaydatabase", // Creating database connection
});

app.post("/Essays", (req, res) => {
  //request and response
  const title = req.body.title;
  const author = req.body.author;
  const text = req.body.text; //data from frontend

  db.query(
    "INSERT INTO essays (title, author, text) VALUES(?,?,?)",
    [title, author, text],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/Essays", (req, res) => {
  db.query("SELECT * FROM essays", (err, result) => {
    // fetching data from db
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/Essays/:id", (req, res) => {
  //custom route
  console.log(req.params.id);
  db.query(
    "DELETE FROM essays WHERE idessays = ?", //mysql query
    [req.params.id], //using parameter in backend
    (err, result) => {
      // fetching data from db
      if (err) {
        console.log(err);
      } else {
        res.send("delete success");
      }
    }
  );
});

db.connect((err) => {
  if (err) throw err;
  console.log("connected");
});

app.listen(4000, () => {
  console.log("works?");
});