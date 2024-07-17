const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note');
const { body,validationResult } = require('express-validator');

// ROUTE 1: Get all the notes using : GET "/api/auth/fetchallnotes" . Login required
router.get('/fetchallnotes',fetchuser,async (req, res)=>{
    try{
        const note= await Note.find({user: req.user.id});
    res.json(note)
    }catch(error){
        console.error(error.message);
    res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Notes using :POST "/api/auth/addnote" . Login required
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({min : 3}),
    body('description','Description must be alteast 5 characters').isLength({ min: 5 }),
],async (req, res)=>{
try{
    const {title ,description,tag}=req.body;
    //if there are errors, return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Notes({
        title,description,tag,user:req.user.id

    })
    const saveNte = await note.save()
    
    res.json(notes)
}catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})
module.exports = router