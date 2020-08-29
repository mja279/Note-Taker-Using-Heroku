// LOAD DATA
// Linking our routes to a series of "data" sources.
var router = require("express").Router();
var notesData = require("../db/db.json");

// ROUTING


  // API GET Requests
  // Below code handles when users "visit" a page.

  router.get("/notes", function(req, res) {
   notesData.getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.json(err))
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.

  router.post("/notes", function(req, res) {
    notesData.saveNote(req.body)
    .then(notes => res.json(notes))
    .catch(err => res.json(err))
  });

  // Delete notes
//  DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
//   This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, 
//   you'll need to read all notes from the `db.json` file,  remove the note with the given `id` property, 
//   and then rewrite the notes to the `db.json` file.

router.delete("/notes/:id", function(req, res) {
  notesData.deleteNote(req.params.id)
  .then(() => res.json({message:"deleted"}))
  .catch(err => res.json(err))
});

module.exports = router;
