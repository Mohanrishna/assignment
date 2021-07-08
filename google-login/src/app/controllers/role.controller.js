const Role = require("../models/role.model.js");

// Create and Save a new Role
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Roles
  const role = new Role({
    title : req.body.title,
  
  })

}



 //get active campaigns
 exports.getCampaigns = (req, res) => {
  Role.getCampaigns((err, data) => {
    data.sort((a,b) => a.totalAmount - b.totalAmount).reverse();
    var result = [];
    for( var i = 0, n = data.length;  i < n;  ++i ) {
        var o = data[i];
        result[i] = { title: o.title, totalAmount: o.totalAmount,backersCount: o.backersCount,endDate: o.endDate };
    }

    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Role."
      });
    else res.send(result);
  });
};




 //get active campaigns
 exports.getCampaignActive = (req, res) => {
  Role.getCampaignActive((err, data) => {


     let result  = data.filter(function (e) {
      return new Date(e.endDate) >= new Date() 
  });
   
  let resultFilter  = result.filter(function (e) {
    const currentDate = new Date();
    const last30DaysDate = new Date(currentDate.setDate(currentDate.getDate() - 30));
    return new Date(e.created) >= last30DaysDate
});

    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Role."
      });
    else res.send(resultFilter);
  });
};



 //get closed campaigns
 exports.getCampaignClose = (req, res) => {
  Role.getCampaignClose((err, data) => {


    let result  = data.filter(function (e) {
      let x = ((new Date(e.endDate) < new Date()  || e.procuredAmount >= e.totalAmount) && (e.procuredAmount!=0 || e.totalAmount!=0 || e.endDate !=null))
      return  x
  });
   
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Role."
      });
    else res.send(result);
  });
};






