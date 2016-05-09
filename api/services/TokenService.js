var crypto = require('crypto');
var moment = require('moment');

const SALT = 'SALT';

var encode = function(value){	
	var cipher = crypto.createCipher('aes192', SALT);
    var code = cipher.update(value, 'utf8', 'hex');
    code += cipher.final('hex');
    return code;    
}; 

var decode = function(code){	
	var decipher = crypto.createDecipher('aes192', SALT);
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

var data = {
	lastRequest: {}	
};

module.exports = {
	
	createToken(){
		var curDate = moment.utc().local().format('YYYY-MM-DD HH:mm:ss');
		data.lastRequest = curDate;
		return this.serialize(data);
	},		
	
	authorization(token){
		var curDate = moment();
		var data = this.unserialize(token);
		if(data){
			var lastRequest = moment(data.lastRequest);			
			if(curDate.diff(lastRequest) > 333){				
				return true;
			}
		}		
		console.log('Too freq');
		return false;
	},
	
	serialize(data){
		var token = JSON.stringify(data);				
		return encode(token);
	},
	
	unserialize(token){
		token = decode(token);
		var data = JSON.parse(token);
		if(!check(data)){
			return null;
		}
		return data;
	}
		
};
