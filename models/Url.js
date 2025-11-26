const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
  fullUrl : {type:String,required:true},
  shortname : {type:String,required:true,unique:true}
})

module.exports = mongoose.model('User', urlSchema);