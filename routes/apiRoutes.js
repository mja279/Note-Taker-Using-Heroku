// LOAD DATA
// Linking our routes to a series of "data" sources.
const router = require("express").Router();
const notesData = require("../db/db.json");
const fs = require("fs");

// ROUTING

  // API GET Requests
  // Below code handles when users "visit" a page.

  router.get("/notes", function(req, res) {
   /*notesData.getNotes(notes => res.json(notes))
    .then(notes => res.json(notes))
    .catch(err => res.json(err))*/
    res.json(notesData.items);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.

  router.post("/notes", function(req, res) {
    console.log(req.body)
    //use fs to access db.json
    fs.readFile("./db/db.json", "utf8", function(error, data) {
      if(error){console.log(error)}

      console.log("got the file, parsing")
      console.log(data)
      let raw = JSON.parse(data);
      req.body.id = "1";
      raw.items.push(req.body);
      console.log("pushed new item")
      fs.writeFile("./db/db.json", JSON.stringify(raw), function(err) {
        if(err) return err;
        console.log("write success");
      })
    })
  });

  // Delete notes

router.delete("/notes/:id", function(req, res) {

  let id = req.body.id;

  notesData.deleteNote(id)
  console.log("note deleted")
  .then(() => res.json({message:"deleted"}))
  .catch(err => res.json(err))
});

module.exports = router;
