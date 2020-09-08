// LOAD DATA
// Linking our routes to a series of "data" sources.
const router = require("express").Router();
const notesData = require("../db/db.json");
const fs = require("fs");

// ROUTING

  // API GET Requests
  // Below code handles when users "visit" a page.

  router.get("/notes", function(req, res) {
    fs.readFile("./db/db.json", "utf8", function(error, data) {
      if(error){console.log(error)}
      return res.json(JSON.parse(data));
     }) 
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
      raw.push(req.body);
      console.log("pushed new item")
      fs.writeFile("./db/db.json", JSON.stringify(raw), function(err) {
        if(err) return err;
        console.log("write success")
        res.end();
      })
    })
  });

  // Delete notes

router.delete("/notes/:id", function(req, res) {

  let id = req.params.id;

  fs.readFile("./db/db.json", "utf8", function(error, data) {
    if(error){console.log(error)}

    let notes = JSON.parse(data);

    for(let i=0; i < notes.length; i++){
      if(id == notes[i].id){
        notes.splice(i,1);
        fs.writeFile("./db/db.json", JSON.stringify(notes), function(err) {
          if(err) return err;
          console.log("delete success")
        })
      }
    }
  })
  res.end(); 
});

module.exports = router;
