const player = {name:'Thomas',rank:'Mid',age:25};

for(let prop in player){
	if(!player.hasOwnProperty(prop)) continue;
console.log(prop+': '+player[prop]);
}
---------------------------------------------------------
function randFace(){
	console.log(111);
}
const hand = [randFace(), randFace(), randFace()]

for(let i=0;i<hand.length;i++)
console.log(`Roll ${i+1}: ${hand[i]}`);
