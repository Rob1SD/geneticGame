var express = require('express');
var router = express.Router();

/* GET home page. */

var map=[]
router.get('/init/:size/:start/:finish', function(request, res, next) {
	var map_size=request.params.size;
	var map_start=request.params.start;
	map_start=map_start.toString().split(":")
	var map_finish=request.params.finish;
	map_finish=map_finish.toString().split(":")
	
	
	
	
	res.send(map);
});

module.exports = router;
