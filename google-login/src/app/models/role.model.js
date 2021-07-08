const sql = require("./db.js");
const fetch = require('node-fetch');


// constructor
const Role = function(role) {
  this.title = role.title;

};






Role.getCampaigns = result => {
  fetch('https://testapi.donatekart.com/api/campaign')
  .then(res => res.json())
  .then(json => {result(null, json);})
}



Role.getCampaignActive = result => {
  fetch('https://testapi.donatekart.com/api/campaign')
  .then(res => res.json())
  .then(json => {result(null, json);})
}




Role.getCampaignClose = result => {
  fetch('https://testapi.donatekart.com/api/campaign')
  .then(res => res.json())
  .then(json => {result(null, json);})
}


module.exports = Role;
