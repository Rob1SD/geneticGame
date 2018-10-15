var Map= class {
	constructor(terrain, size, start, finish)
	{
		// attributes
		this.terrain=terrain;
		this.size=size;
		this.start=[Number(start[0]), Number(start[1])];
		this.finish=[Number(finish[0]), Number(finish[1])];
		// this.finish=finish;
		
		
		//methodes
		this.print = function() {
			console.log("taille : " + this.size);
			console.log("depart : " + this.start);
			console.log("arrive : " + this.finish);
			for (var i in this.terrain) {
				console.log(this.terrain[i])
			}
		}
		this.getTerrainValue = function(point)
		{
			var value = terrain[point[0]]? terrain[point[0]][point[1]]? terrain[point[0]][point[1]] : 999 : 999;

			return value;
		}
		this.setTerrainValue = function(point, value)
		{
			this.terrain[point[0]][point[1]] = value;
		}
		this.arrayEqual = function(a,b)
		{
			var res=true;
			if (a.length != b.length)
				return false;
			for (var i in a)
			{
				if (a[i]!=b[i])
				{
					res=false;
					break;
				}
			}
			return res;
		}
		this.pcc = function(start)
		{
            var newTerrain = JSON.parse(JSON.stringify(this.terrain));
            // console.log("terrain1")
            // console.log(terrain)

            var size = this.size;

            var inc=function(cell) {
                // console.log("terrain")
                // console.log(terrain)
                var x = Number(cell[0]);
                var y = Number(cell[1]);

                if (x >=size || x < 0 || y >=size || y < 0 || newTerrain[x][y] == -2)
                    return;
                // console.log("size")
                // console.log(size)

                if (x+1<size) {
                    if (newTerrain[x+1][y] >=0 && (newTerrain[x+1][y] > newTerrain[x][y]) || newTerrain[x+1][y] == 0) {

                        if (newTerrain[x+1][y] == 0)
                            newTerrain[x+1][y] = Math.max(newTerrain[x][y] + 1, 1);
                        else
                            newTerrain[x+1][y] = Math.min(newTerrain[x][y] + 1, newTerrain[x+1][y]);

                    }
                }
                if (x<size && y+1 < size) {
                    if (newTerrain[x][y+1] >=0 && (newTerrain[x][y+1] > newTerrain[x][y]  || newTerrain[x][y+1] == 0)) {
                        if (newTerrain[x][y+1] == 0)
                            newTerrain[x][y+1] = Math.max(newTerrain[x][y] + 1, 1);
                        else
                            newTerrain[x][y+1] = Math.min(newTerrain[x][y] + 1, newTerrain[x][y+1]);

                    }
                }
                if (x<size && y-1 >= 0) {
                    if (newTerrain[x][y-1] >=0 && (newTerrain[x][y-1] > newTerrain[x][y]  || newTerrain[x][y-1] == 0)) {

                        if (newTerrain[x][y-1] == 0)
                            newTerrain[x][y-1] = Math.max(newTerrain[x][y] + 1, 1);
                        else
                            newTerrain[x][y-1] = Math.min(newTerrain[x][y] + 1, newTerrain[x][y-1]);





                    }
                }
                if (x-1>=0 && y < size) {
                    if (newTerrain[x-1][y] >=0 && (newTerrain[x-1][y] > newTerrain[x][y] || newTerrain[x-1][y] == 0)) {


                        if (newTerrain[x-1][y] == 0)
                            newTerrain[x-1][y] = Math.max(newTerrain[x][y] + 1, 1);
                        else
                            newTerrain[x-1][y] = Math.min(newTerrain[x][y] + 1, newTerrain[x-1][y]);

                    }
                }

                if (newTerrain[x+1] && newTerrain[x+1][y] >= newTerrain[x][y])
                {
                    // console.log("inc([x+1,y]);")
                    inc([x+1,y]);
                }
                if (newTerrain[x][y-1] && newTerrain[x][y-1] >= newTerrain[x][y])
                {
                    // console.log("inc([x,y-1]);")
                    inc([x,y-1]);
                }
                if (newTerrain[x-1] && newTerrain[x-1][y] >= newTerrain[x][y])
                {
                    // console.log("inc([x-1,y]);")
                    inc([x-1,y]);
                }
                if (newTerrain[x][y+1] && newTerrain[x][y+1] >= newTerrain[x][y])
                {
                    // console.log("inc([x,y+1]);")
                    inc([x,y+1]);
                }




            }
            inc(start);
            var newMap= new Map(newTerrain, size, start, this.finish);
            newMap.print();
            var objToSend=[]
            objToSend.push(newMap);
            var currPos=newMap.finish;
            var way=[];
            // while (!currPos.isEqual(newMap.start))
            while (!newMap.arrayEqual(currPos, newMap.start))
            {
                var nord = [currPos[0]-1,currPos[1]];
                var sud = [currPos[0]+1,currPos[1]];
                var est = [currPos[0],currPos[1]+1];
                var ouest = [currPos[0],currPos[1]-1];
                var bros=[];
                bros.push(nord);
                bros.push(sud);
                bros.push(est);
                bros.push(ouest);
                var notFinish = function(point)
                {
                    var value = newMap.getTerrainValue(point);
                    return value!=-2?value:999
                }
                var min = Math.min(Math.min(notFinish(nord),notFinish(sud)), Math.min(notFinish(est),notFinish(ouest)))
                for (var bro in bros)
                {
                    if (newMap.getTerrainValue(bros[bro]) == min)
                    {
                        way.push(bros[bro]);
                        currPos=bros[bro];
                        console.log(currPos)
                        console.log(newMap.getTerrainValue(currPos))
                        break;
                    }
                }
            }
            way=way.reverse();
            objToSend.push(way);
		}

	}
	
}

module.exports = Map;
