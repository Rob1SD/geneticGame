var Creatures= class {
	constructor(hp, legs, brain, nb_pieces)
	{
		hp = Number(hp);
		hp = Number(legs);
		hp = Number(brain);
		hp = Number(nb_pieces);
		// attributes
		this.nb_pieces=nb_pieces
		this.hp = 1 + hp;
		this.legs = legs;
		this.brain = brain;
		this.weigth= hp + legs + brain
		
		this.sp = (legs) / (1 + legs + brain + hp);
		this.pos = [0,0];
		this.way = [];
		this.map=[];

        var getRandomInt = function(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }

		//methodes
		this.display = function()
		{
			this.map.print();
		}
		this.print = function() {
			console.log("nb_pieces : " + this.nb_pieces  + " hp : " + this.hp  + " legs : " + this.legs + " brain : " + this.brain + " weigth : " + this.weigth + " sp : " + this.sp)
		}
		this.move = function(map)
		{
			console.log(map)
			if (this.sp==0)
				return;
			var passedTime=0;
			var time = parseInt(1000/this.sp);
			var maxTime=20000
			var interv = setInterval(function () {
				passedTime+=time;

				if (map.arrayEqual(this.pos, map.finish) || passedTime >= maxTime)
				{
                    clearInterval(interv);
                    return;
				}

				this.way=map.pcc(this.pos);
				var randomiseSucces=getRandomInt(4);
				if (randomiseSucces<=brain)
				{
					this.pos=way[0]
				}
				else
				{
                    var nord = [this.pos[0]-1,this.pos[1]];
                    var sud = [this.pos[0]+1,this.pos[1]];
                    var est = [this.pos[0],this.pos[1]+1];
                    var ouest = [this.pos[0],this.pos[1]-1];
                    var bros=[];
                    if (map.getTerrainValue(nord) != 999);
                    	bros.push(nord);
                    if (map.getTerrainValue(sud) != 999);
                    	bros.push(sud);
                    if (map.getTerrainValue(est) != 999);
                    	bros.push(est);
                    if (map.getTerrainValue(ouest) != 999);
                    	bros.push(ouest);

                    var randomNextPos=getRandomInt(bros.length);
                    this.pos=bros[randomNextPos];
				}
				this.map=map;
				this.map.setTerrainValue(this.pos, "C")
            }, time)
		}
	}
	
}

module.exports = Creatures;
