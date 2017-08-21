
var utility = {};
utility.isEmpty = function(data) {
  if(!data || data == "")
    return true;
  else {
    return false;
  }
}

module.exports = utility;
