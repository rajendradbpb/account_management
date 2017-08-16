var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var constants = require('./../../config/constants');
var validator = require('validator');
var Schema = mongoose.Schema;
var password = require('password-hash-and-salt');
var clientSchema = new mongoose.Schema({
    firm_name         : {type: String, unique : true,required: constants.messages.errors.undefinedFirmname},
    firm_type         : {type: String,required: constants.messages.errors.undefinedFirmType},
    inc_date		  : {type: Date,default: new Date()},
  	pan 			  : {type: String, required: constants.messages.errors.undefinedPan}
    isDelete          : {type: Boolean, default:false},

});
clientsSchema.plugin(uniqueValidator, {message: "Firm_name already exists"});

var clientModel = mongoose.model('client', clientSchema);
module.exports = clientModel;
