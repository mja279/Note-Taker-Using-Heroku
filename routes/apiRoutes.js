// LOAD DATA
// Linking our routes to a series of "data" sources.

var notesData = require("../db/db.jason");

// ROUTING

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.

  app.get("/api/notes", function(req, res) {
    res.json(notesData);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.

  app.post("/api/notes", function(req, res) {
    if (notesData.length ++) {
      notesData.push(req.body);
      res.json(true);
    }
    else {
      console.log(err);
      res.json(false);
    }
  });

  // Delete notes
//  DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
//   This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, 
//   you'll need to read all notes from the `db.json` file,  remove the note with the given `id` property, 
//   and then rewrite the notes to the `db.json` file.
};
