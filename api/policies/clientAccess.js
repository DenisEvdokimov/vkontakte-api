var moment = require('moment');

module.exports = function(req, res, next) {	
  var token = req.cookies['vkontakte'];    
  if(token){
	  //return res.customResponse(500, NotificationService.createServerError());
	  
//	  if(NotificationService.isTooFreq(token)){
//		  return res.customResponse(500, NotificationService.createTooFreqError());
//	  }
	  if(TokenService.authorization(token)){		  
		  return next();
	  }
	  return res.customResponse(500, NotificationService.createTooFreqError());
  }    
  return res.customResponse(401, {});
  
//  Clients.findOne({ip: req.ip}).exec(function(err, client){
//	  if(client == null){
//		  Clients.create({ip: req.ip, last_request: date}).exec(function(err, client){
//	  		if(err){
//	  			return res.json(500, NotificationService.createServerError());
//	  		}
//	  		return next();
//		  });
//	  }else{		  		  
//		  var d1 = moment(date);
//		  var d2 = moment(client.last_request);
//		  var time = d1.diff(d2);
//		  if(d1.diff(d2) < 30000){
//			  return res.json(500, NotificationService.createTooFreqError());
//		  }
//		  Clients.update(client, {last_request: date}).exec(function(err, client){
//	  		if(err){
//	  			return res.json(500, NotificationService.createServerError());
//	  		}
//	  		return next();
//		  });		  
//	  }
//  });	      
};