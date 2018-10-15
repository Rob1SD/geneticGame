var express = require('express');
var router = express.Router();
var Map = require('../classes/Map');
/* GET home page. */

var map;
router.get('/init/:size/:start/:finish', function(request, res, next) {
	var terrain = []
	var map_size=request.params.size;
	var map_start=request.params.start;
	map_start=map_start.toString().split(":")
	var map_finish=request.params.finish;
	map_finish=map_finish.toString().split(":")
	console.log(map_start)
	console.log(map_finish)
	for (var i = 0; i < map_size; ++i){
		var line = []
		for (var j = 0; j < map_size; ++j) {
			
			if (i == map_start[0] && j == map_start[1])
				line.push(-1)
			else if (i == map_finish[0] && j == map_finish[1])
				line.push(-2)
			else
				line.push(0)
		}
		terrain.push(line)
	}
	map=new Map(terrain, map_size, map_start, map_finish)
	map.print();
	res.send(map);
});

module.exports = router;
