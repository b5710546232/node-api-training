const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 8080

// ROUTES FOR API
//
const router = express.Router()

router.get('/',(req,res)=>{
  res.json({msg:"Hello is me"})
})

// Register routes
app.use('/api',router)

app.listen(PORT,()=>{
  console.log('Server start @ port'+PORT);
})
