var express = require('express');
var router = express.Router();
var Creatures = require('../classes/Creatures');
var Map = require('../classes/Map');
var pieces = require('../classes/Pieces');
var request=require('request-then');

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

router.get('/getPopulation',function(req, res, next) {
	res.send(population)
});
router.get('/move',function(req, res, next) {
    request('http://127.0.0.1:3000/map/getMap').then(function(response){
    	//console.log(response)
        console.log("toto")
		var tmpMap=new Map(1,1,1,1)
        console.log("titi")
        for (var i in population)
        {
        	console.log("i = " + i)
            population[i].move(tmpMap.generate(JSON.parse(response.body)))
        }
        res.send(population)
	})

});

module.exports = router;
