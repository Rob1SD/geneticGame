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
router.get('/pcc/:start', function(request, res, next) {
	var terrain = JSON.parse(JSON.stringify(map.terrain));
	// console.log("terrain1")
		// console.log(terrain)
	var size = map.size;
	var start=request.params.start;
	start=start.toString().split(":")
	var inc=function(cell) {
		console.log("terrain")
		console.log(terrain)
		var x = Number(cell[0]);
		var y = Number(cell[1]);
		
		if (x >=size || x < 0 || y >=size || y < 0 || terrain[x][y] == -2)
			return;
		console.log("size")
		console.log(size)
		
		if (x+1<size) {
			if (terrain[x+1][y] >=0 && (terrain[x+1][y] > terrain[x][y]) || terrain[x+1][y] == 0) {
			
				if (terrain[x+1][y] == 0)
					terrain[x+1][y] = Math.max(terrain[x][y] + 1, 1);
				else
					terrain[x+1][y] = Math.min(terrain[x][y] + 1, terrain[x+1][y]);
				
			}
		}
		if (x<size && y+1 < size) {
			if (terrain[x][y+1] >=0 && (terrain[x][y+1] > terrain[x][y]  || terrain[x][y+1] == 0)) {
				if (terrain[x][y+1] == 0)
					terrain[x][y+1] = Math.max(terrain[x][y] + 1, 1);
				else
					terrain[x][y+1] = Math.min(terrain[x][y] + 1, terrain[x][y+1]);
				
			}
		}
		if (x<size && y-1 >= 0) {
			if (terrain[x][y-1] >=0 && (terrain[x][y-1] > terrain[x][y]  || terrain[x][y-1] == 0)) {
				
				if (terrain[x][y-1] == 0)
					terrain[x][y-1] = Math.max(terrain[x][y] + 1, 1);
				else
					terrain[x][y-1] = Math.min(terrain[x][y] + 1, terrain[x][y-1]);
			
			
			
				
				
			}
		}
		if (x-1>=0 && y < size) {
			if (terrain[x-1][y] >=0 && (terrain[x-1][y] > terrain[x][y] || terrain[x-1][y] == 0)) {
		
			
				if (terrain[x-1][y] == 0)
					terrain[x-1][y] = Math.max(terrain[x][y] + 1, 1);
				else
					terrain[x-1][y] = Math.min(terrain[x][y] + 1, terrain[x-1][y]);
				
			}
		}
		inc([x+1,y]);
		inc([x-1,y]);
		inc([x,y-1]);
		inc([x,y+1]);
	}
	inc(start);
	var newMap= new Map(terrain, size, start, map.finish);
	newMap.print();
	res.send(newMap);
});

module.exports = router;






















