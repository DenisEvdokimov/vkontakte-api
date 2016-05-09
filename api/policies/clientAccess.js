module.exports = function(req, res, next) {	
  var token = req.cookies['vkontakte'];    
  
  if(token){
	  if(TokenService.authorization(token)){		  
		  return next();
	  }
	  return res.customResponse(500, NotificationService.createTooFreqError());
  }    
  return res.customResponse(401, {});  	     
};