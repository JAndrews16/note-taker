const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notepadAr = require("./db/db.json");
let noteId = 0;

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
  
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    let notes = fs.readFile("./db/db.json");
    return res.json(JSON.parse(notes));
})

app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    noteId++;
  
    notepadAr.push(newNote);
    req.body.id = noteId;
    res.json(newNote);
  });

  app.delete("/api/notes/:id", function(req, res) {
    let noteId = req.params.id;
    let idInt = parseInt(noteId);

    if(item.id = idInt) {
    let deletedNote = notepadAr.filter(item.id);
    
    notepadAr.pop(deletedNote);
    }
});

app.get("*", function(req, res) {
    res.redirect("/");
});