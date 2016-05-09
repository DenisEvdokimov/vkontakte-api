/**
 * NotificationController
 *
 * @description :: Server-side logic for managing Notifications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {		  	
		
	sendNotification: function(req, res){
		try {
			var ids = req.body.ids;
			var text = req.body.text;
			if(ids == null || text == null){
				NotificationService.throwServerError();
			}
			if(typeof ids === 'string'){
				ids = JSON.parse(ids);
			}			
			//if ids is number
			if(Number.isInteger(ids)){
				ids = [ids];
			}
			if(!Array.isArray(ids)){
				NotificationService.throwServerError();
			}
			if(ids.length == 0){
				NotificationService.throwServerError();
			}
			NotificationService.sendNotification(ids, text, function(err, result){
				if(err){
					return res.customResponse(500, err);
				}
				return res.customResponse(200, result);
			});				
		}catch(e){
			return res.customResponse(500, e);
		}
	}
};