module.exports = app => {
  const roles = require("../controllers/role.controller.js");


 //get campaigns
 app.get("/get/campaigns", roles.getCampaigns);

 //get active campaigns
 app.get("/get/campaign/active", roles.getCampaignActive);

 //get closed campaigns
 app.get("/get/campaign/close", roles.getCampaignClose);




};
