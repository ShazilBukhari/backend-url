const express = require('express')
require('dotenv').config()
const Url = require('./models/Url')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(express.json())

app.use(cors())
const port = 3000

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err))

app.post('/create',async(req,res)=>{
  const {fullUrl,shortname}=req.body;
  if(!fullUrl||!shortname){
    return res.status(400).json({error:"Both Fields are required"})
  }
  const exists = await Url.findOne({shortname})
  if(exists){
    return res.status(409).json({error:"Short Name is Already Existed"})
  }

  const doc = new Url({
    fullUrl,
    shortname
  })

  await doc.save()

  res.json({
    message:"Url Successfull Generated",
    shortUrl:`http://localhost:3000/${shortname}`
  })
})

app.get('/:shortname', async(req, res) => {
  const {shortname} = req.params

  const doc =  await Url.findOne({shortname})
  if(!doc){
    return res.status(404).json({error:"Url Not Found"})
  }

  return res.redirect(doc.fullUrl)

  // res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
