var Map= class {
	constructor(terrain, size, start, finish)
	{
		// attributes
		this.terrain=terrain;
		this.size=size;
		this.start=start;
		this.finish=finish;
		
		
		//methodes
		this.print = function() {
			console.log("taille : " + this.size);
			console.log("depart : " + this.start);
			console.log("arrive : " + this.finish);
			for (var i in this.terrain) {
				console.log(this.terrain[i])
			}
		}
	}
	
}

module.exports = Map;
