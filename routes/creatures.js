var express = require('express');
var router = express.Router();
var Creatures = require('../classes/Creatures');
var pieces = require('../classes/Pieces');

/* GET home page. */
var getRandomInt = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
var population=[];

router.get('/randomisePopulation/:population_size/:max_pieces', function(request, res, next) {
	var population_size=request.params.population_size;
	var max_pieces=request.params.max_pieces;
	
	for (var i = 0; i < population_size; ++i) {
		
		var hp = 0;
		var legs = 0;
		var brains = 0;
		var maxRand = 4;
		
		for (var j = 0; j <= max_pieces; ++j) {
			var rand = getRandomInt(maxRand);
			if (rand == 1)
				++brains;
			else if (rand==2)
				++legs;
			else if (rand==3)
				++hp
		}
		population.push(new Creatures(hp, legs, brains, hp + legs + brains))
	}
	for (var individu in population) {
		population[individu].print();
	}
	//firstCreature.print();
	res.send('respond with a resource');
});

router.get('/getPopulation',function(request, res, next) {
	res.send(population)
});

module.exports = router;
