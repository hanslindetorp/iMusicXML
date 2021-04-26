


var picked;
var missed;
var gameLevel;

var game = document.querySelector("game-engine");
window.onload = () => location.href = "#";

// character control - works with keycommands as well.
document.querySelector(".button.left").addEventListener("pointerdown", e => game.keyDown("ArrowLeft"));
document.querySelector(".button.right").addEventListener("pointerdown", e => game.keyDown("ArrowRight"));
document.querySelector(".button.left").addEventListener("pointerup", e => game.keyUp("ArrowLeft"));
document.querySelector(".button.right").addEventListener("pointerup", e => game.keyUp("ArrowRight"));


var navigationMenu = document.querySelector("nav");
if(webAudioXML){
	// register the global game variable to WebAudioXML which makes it possible
	// to map any game variable to any WebAudioXML audio property.
	webAudioXML.setVariable("gameLevel", game.levels.level1);
}

iMusic.onload = e => location.href = "#start";

function nav(target){

		navigationMenu.style.display = ["#intro", "#game", "#complete", "#gameOver"].includes(target) ? "block" : "none";

		if(target == "#game"){
			initLevel("game");
		} else {
			game.stop();
		}
		location.href = target;
}

function initLevel(t){
	picked = 0;
	missed = 0;

	gameLevel = game.play(t);

	updateScore();

}





var pan = document.querySelector("#pan");


document.querySelector(".game-character").addEventListener("pick", function(event) {

	let flower = document.createElement("div");
	this.appendChild(flower);

	// reduce picking to hidden the pan-area
	if(event.detail.element.intersect(pan)){
		pick();
	} else {
		event.preventDefault();
	}

});

document.querySelectorAll(".game-collectable").forEach(el => el.addEventListener("outside", event => {

	if(event.detail.this.nrOfCollisions){return}

	// this function is called when an object hits the ground
	// in this setup the Motif is played refering to the file name
	// (Read more about playing Motifs: https://github.com/hanslindetorp/imusic/blob/master/motifs.md)
	iMusic.play("miss");
	miss();
}));

var picking = false;
function pick(){
	if(!picking){
		picked++;
		updateScore();
		iMusic.play("pick");
		picking = true;
		setTimeout(e => picking = false, 100);
	}
}


function miss(){
	missed++;
	updateScore();
}

var pancakeHeight = 16;
var maxPancakes = 17;
var pickedElement = document.querySelector("#picked");
var missedElement = document.querySelector("#missed");
var nrOfIntensityLevels = 9;

var pickedNr = document.querySelector(".scoreNr.picked span");
var missedNr = document.querySelector(".scoreNr.missed span");

function updateScore(){

	// this calculates the intensity level based on the numbers of
	// missed pancakes and calls iMusic to respond accordingly.
	let intensityLevel = Math.min(nrOfIntensityLevels, 1 + missed ? 1 + Math.floor(missed / 2) : 0);
	iMusic.select("intensity", intensityLevel);

	// graphical score indication
	pickedElement.style.height = picked * pancakeHeight + "px";
	missedElement.style.height = (maxPancakes - missed) * pancakeHeight + "px";

	// numbers on screen update
	pickedNr.innerHTML = picked;
	missedNr.innerHTML = missed;


	gameLevel.gameObjects.forEach((item, i) => {

		// activate more pancakes
		item.active = i * 2 <= picked;
		item.visible = item.active;
	});

	// increase speed
	gameLevel.pancakeSpeed = 1 + (picked / maxPancakes) * 6;

	if(picked == maxPancakes){
		iMusic.play("complete");
		gameLevel.stop();
		setTimeout(e => nav("#complete"), 500);
	}
	if(missed == maxPancakes){
		iMusic.play("game-over");
		gameLevel.stop();
		setTimeout(e => nav("#gameOver"), 500);
	}
}
