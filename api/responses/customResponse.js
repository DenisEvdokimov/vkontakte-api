module.exports = function(statusCode, result){
	var res = this.res;
	res.cookie('vkontakte', TokenService.createToken());
	res.json(statusCode, result);
}
