"use stric"
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const User = require('./app/models/user');
const cors = require('cors'),
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cor())
const PORT = process.env.PORT || 8080

const mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDB');

// ROUTES FOR API
//
const router = express.Router()

// middleware to use for all requests
router.use((req,res,next)=>{
  console.log('something');
  next() // make sure go to the next routes don't stop here.
})



router.get('/',(req,res)=>{
  res.json({msg:"Hello is me"})
})

router.route('/users')
.post((req,res)=>{
  let user = new User()
  user.name = req.body.name
  user.save((err)=>{
    if(err){
      res.send(err)
    }
    res.json({message:'User created'})
  })
})

.get((req,res)=>{
  User.find((err,users)=>{
    if (err)
    res.send(err)
    res.json(users)

  })
})

router.route('/users/:user_id')
.get((req,res)=>{
  User.findById(req.params.user_id,(err,user)=>{
    if(err)
    res.send(err)
    res.json(user)

  })
})
.put((req,res)=>{
  User.findById(req.params.user_id,(err,user)=>{
    if(err)
    res.send(err)
    user.name = req.body.name

    user.save((err)=>{
      if(err)
      res.send(err)
      res.json({message:'User updated'})
    })
  })
})
.delete((req,res)=>{
  User.remove({
    _id:req.params.user_id
  },(err,user)=>{
    if(err)
    res.send(err)
    res.json({message:"Deleted success"})
  })
})
// Register routes
app.use('/api',router)

app.listen(PORT,()=>{
  console.log('Server start @ port'+PORT);
})
