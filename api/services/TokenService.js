var crypto = require('crypto');
var moment = require('moment');

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

//var data = {
//	lastRequest: {}	
//};

var TokenService = function(){
		
	var encode = function(value){	
		var cipher = crypto.createCipher(sails.config.algorithm, sails.config.salt);
	    var code = cipher.update(value, 'utf8', 'hex');
	    code += cipher.final('hex');
	    return code;    
	}; 

	var decode = function(code){	
		var decipher = crypto.createDecipher(sails.config.algorithm, sails.config.salt);
		var value = decipher.update(code, 'hex', 'utf8');
		value += decipher.final('utf8');
		return value;
	};

	var check = function(data){
		if(data.hasOwnProperty('lastRequest')){		
			return true;		
		}
		return false;
	};
	
	var serialize = function(data){
		var token = JSON.stringify(data);				
		return encode(token);
	};
	
	var unserialize = function(token){
		token = decode(token);
		var data = JSON.parse(token);
		if(!check(data)){
			return null;
		}
		return data;
	};
	
	this.createToken = function(){
		var curDate = moment.utc().local().format(DATE_FORMAT);
		var data = {
			lastRequest: curDate
		}
		return serialize(data);
	};		
	
	this.authorization = function(token){
		var curDate = moment();
		var data = unserialize(token);
		if(data){
			var lastRequest = moment(data.lastRequest);			
			if(curDate.diff(lastRequest) > sails.config.timeout){				
				return true;
			}
		}				
		return false;
	};
		
};

module.exports = new TokenService();