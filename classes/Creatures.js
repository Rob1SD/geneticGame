var Creatures= class {
	constructor(hp, legs, brain, nb_pieces)
	{
		// attributes
		this.nb_pieces=nb_pieces
		this.hp = 1 + hp;
		this.legs = legs;
		this.brain = brain;
		this.weigth= hp + legs + brain
		
		this.sp = (legs) / (1 + legs + brain + hp);
		this.pos = [0,0]
		
		
		//methodes
		this.print = function() {
			console.log("nb_pieces : " + this.nb_pieces  + " hp : " + this.hp  + " legs : " + this.legs + " brain : " + this.brain + " weigth : " + this.weigth + " sp : " + this.sp)
		}
	}
	
}

module.exports = Creatures;
