var fs = require('fs');
var crypto = require('crypto');
var moment = require('moment');

const TOO_FREQ_ERROR = {
	code: 1,
	description: 'Too frequently'
};

const SERVER_ERROR = {
	code: 2,
	description: 'Server fatal error'
};

module.exports = {
		
	throwServerError: function(){
		throw SERVER_ERROR;
	},
	
	throwTooFreqError: function(){
		throw TOO_FREQ_ERROR;
	},
		
	createServerError: function(){
		return SERVER_ERROR;
	}, 
	
	createTooFreqError: function(){
		return TOO_FREQ_ERROR;
	},
		
	sendNotification: function(ids, text, callback){
		if(ids.length > 100){
			 return callback(SERVER_ERROR, null);
		}		
		
		var queryTemp = 'SELECT array_agg(id) AS ids FROM users WHERE id IN (' + ids.join() + ') AND show_notification = true';
		Users.query(queryTemp, function(err, recipients){			
			if(err){
				return callback(SERVER_ERROR, null);
			}			
			var resultIds = recipients.rows[0].ids;
			var log = '';
			var logStream = fs.createWriteStream(sails.config.paths.log, {flags : 'a'});
						
			log = 'Send messages to users: [' + resultIds + '] \n';
			logStream.write(log);						
			return callback(null, resultIds);
		});				
	}	
};
