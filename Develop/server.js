const express = require("express");
const path = require("path");
const fs = require("fs");

// Set up the Express App
const app = express();
const PORT = 3000;

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

const notepadAr = require("./db/db.json");
// const notesAr = fs.readFile(JSON.parse(notepadAr), 'utf8', function(err, data) {
//     if(err) throw err;
// });

// fs.readFile('readMe.txt', 'utf8', function (err, data) {
//     fs.writeFile('writeMe.txt', data, function(err, result) {
//        if(err) console.log('error', err);
//      });
//    });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Displays all notes
app.get("/api/notes", function(req, res) {
  return res.json(notepadAr);
});


// Create New Notes - takes in JSON input
app.post("/api/notes", function(req, res) {
  var newNote = req.body;

  newNote.id = notepadAr.length;

  console.log(notepadAr.length);
  console.log(newNote);
  
  notepadAr.push(newNote);
  console.log(notepadAr);

//   fs.writeFile(notepadAr, notesAr, function(err, result) {
//       if(err) throw err;
//   });

  res.json(newNote);
});