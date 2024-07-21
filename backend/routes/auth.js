const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET ='ShipiPriya45';

//Create a user using: Post "/api/auth/createuser".no login require
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min : 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','password must be atleast 5 character').isLength({ min: 5 }),
], async (req, res)=>{
  let success = false;
  //if there are errors, return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    //check whether the user with this email exists already

    try{

        let user= await User.findOne({email:req.body.email});
        if(user){
          return res.status(400).json({success,error: "Sorry a user with this email already exists"})
        }

        //password ko salt de rhe taki hacker isko hack nh kr paye
        //bcz od salt only password in form of hash get sr=tore in db so hacker can not hack it 
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt) 
        //create a new user
        user = await User.create({
        name: req.body.name,
        password: secPass,
        email:req.body.email,
      });
      const data={
        user:{
          id:user.id
        }
      }
      const authToken=jwt.sign(data,JWT_SECRET);
      
      success = true;
      res.json({success,authToken})
        //catch error
    } catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error accured");
    }
   
})

// route 2: authenticate a user using :Post "/api/auth/login" . No login required
router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','password cannot be blank').exists(),
], async (req, res)=>{
  let success=false;

  //if there are errors , return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

const {email,password} = req.body;
try{
  let user = await User.findOne({email});
  if(!user){
    return res.status(400).json({error: "please try to login with correct credentials"});

  }
  const passwordCompare = await bcrypt.compare(password,user.password);
  if(!passwordCompare){
    success =false;
    return res.status(400).json({success,error: "please try to login with correct credentials"});
  }

  const data={
    user:{
      id: user.id
    }
  }
  const authToken = jwt.sign(data, JWT_SECRET);
  success = true;
  res.json({success,authToken})

}catch (error){
  console.error(error.message);
      res.status(500).send("Internal Server Error accured");

}

});


// Route 3 : Get loggedin User Details using : POST "/api/auth/getuser" .Login required

router.post('/getuser',fetchuser, async (req, res)=>{
try{
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
}
catch(error){
  console.error(error.message);
  res.status(500).send("Internal server error");
}
})
module.exports = router