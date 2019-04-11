const player = {name:'Thomas',rank:'Mid',age:25};

for(let prop in player){
	if(!player.hasOwnProperty(prop)) continue;
console.log(prop+': '+player[prop]);
}
