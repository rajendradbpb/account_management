var db = require('./server/db');
var LOG = require("./server/component/LOG");
var models = require("./server/models/index");
var waterfall = require('async-waterfall');
var password = require('password-hash-and-salt');
//*********************  Role schema  *************//
var roles = [{
    "type": "superAdmin",
    "desc": "superAdmin",
    "caFirm": null,
  },
  {
    "type": "firmAdmin",
    "desc": "firmAdmin",
    "caFirm": null,
  },
  {
    "type": "seniorAuditor",
    "desc": "seniorAuditor",
    "caFirm": null,
  },
  {
    "type": "auditor",
    "desc": "auditor",
    "caFirm": null,
  }
]


//************************************* User schema **************************///
var users = {
  superAdmin: {
    //"role":"5994bc801673f817483651c6", // this will be added dynamically
    "username": "superAdmin",
    "password": "superAdmin",
    "email": "superAdmin@yopmail.com"
  },
  firmAdmin: {
    //"role":"5994bc801673f817483651c6", // this will be added dynamically
    "username": "firmAdmin",
    "password": "firmAdmin",
    "email": "firmAdmin@yopmail.com"
  },
}
waterfall([
  function(callback) {
    LOG.info("*************  saving Role information ****************");
    models.roleModel.remove()
      .then(function(doc) {
        LOG.info("deleted prev data");
        return models.roleModel.insertMany(roles);
      })
      .then(function(roles) {
        LOG.info("Role seeded ! ");
        callback(null, false);
      })
      .catch(function(err) {
        LOG.error("Error occured in saving role", err);
        callback(null, err);
      })
  },
  function(arg1, callback) { // this will be use for user save
    if (arg1) // error return
      callback(null, arg1);
    else {
      //callback(null, false);
      models.userModel.remove()
        .then(function(doc) {
          LOG.info("deleted prev data : user");
          models.roleModel.find({
              type: "superAdmin"
            })
            .then(function(role) {
              password(users.superAdmin.password).hash(function(error, hash) {
                users.superAdmin.password = hash;
                users.superAdmin.role = role[0]._id.toString();
                new models.userModel(users.superAdmin).save();
              })

              models.roleModel.find({
                  type: "firmAdmin"
                })
                .then(function(role) {
                  password(users.superAdmin.password).hash(function(error, hash) {
                    users.firmAdmin.password = hash;
                    users.firmAdmin.role = role[0]._id.toString();
                    console.log(users.firmAdmin);
                    new models.userModel(users.firmAdmin).save();
                    callback(null, false);
                  })

                })

            })
            .catch(function(err) {
              LOG.error("error in saving user admin user", err)
              callback(null, err);
            })

        })
        // .then(function(users) {
        //   LOG.info("firm admin saved ! ");
        //   models.roleModel.find({type:"firmAdmin"})
        //   .then(function(role){
        //     console.log(">>>>>> ",role,users.firmAdmin);
        //     users.firmAdmin.role = role[0]._id.toString();
        //     console.log(users.firmAdmin);
        //     return new models.userModel(users.firmAdmin).save();
        //   })
        //   .catch(function(err){
        //     LOG.error("error in saving user admin user",err)
        //     callback(null, err);
        //   })
        //
        // })
        .then(function(firmAdmin) {
          callback(null, false)
        })
        .catch(function(err) {
          LOG.error("Error occured ", err);
          callback(null, err);
        })

    }
  }
], function(err, result) {
  if (err) {
    LOG.error(err);
  } else
    console.log("Seeding completed !!!!");
});
