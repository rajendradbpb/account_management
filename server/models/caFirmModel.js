var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var constants = require("./../../config/constants")
var caFirmSchema = new mongoose.Schema({
  admin                            :{type: Schema.Types.ObjectId, ref: 'user',required: true,unique:true},
  firmType                              :{type: String},
  firmName                              :{type: String},
  incorporationDate                     :{type: String},
  gst                                   :{type: String},
  pan                                   :{type: String},
  tan                                   :{type: String},
  tel                                   :{type: String},
  mob                                   :{type: String},
  regAddress :{
    plotNo                              :{type: String},
    lane                                :{type: String},
    city                                :{type: String},
    state                               :{type: String},
    country                             :{type: String},
  },
  businessAddress :{
    plotNo                             :{type: String},
    lane                                :{type: String},
    city                               :{type: String},
    state                               :{type: String},
    country                             :{type: String},
  },
  Partners:[{
    name                                :{type: String},
    designation                         :{type: String},
    membership                           :{type: String},
  }]
});
caFirmSchema.plugin(uniqueValidator, {
  message: "Firm admin already registered"
});
var caFirmModel = mongoose.model('caFirm', caFirmSchema);
module.exports = caFirmModel;
