(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

var Rect = require('./Rect.js');
var Range = require('./Range.js');


// Börja med att namnge klassen
class BaseObject {

	constructor(el, lv){

		if(!el){
			console.log(this);
			return;
		}

		this.el = el;
		this.el.style.position = "absolute";
		this.level = lv;


		// store original CSS
		this.cssText = this.el.style.cssText;

		// store original dataSet
		this.origDataset = {};
		Object.keys(this.el.dataset).forEach(key => this.origDataset[key] = this.el.dataset[key]);


		if(this.level.running){
			this.init()
		}
	}


	init(){

		this.active = this.el.dataset.active != "false";
		this.visible = this.active;

		// reset user defined CSS
		this.el.style.cssText = this.cssText;

		// reset user defined dataset
		Object.keys(this.origDataset).forEach(key => this.el.dataset[key] = this.origDataset[key]);

		this.speed = new Range(this.el.dataset.speed).value || 0;

		this.maxSpeed = (Number(this.el.dataset.maxSpeed) || 0) / 1;
		this.initSpeed = this.speed || this.maxSpeed;


		this.respawnDelay = new Range(this.el.dataset.respawnDelay);
		this.delay = new Range(this.el.dataset.delay).value || 0;

		let delay = this.delay || this.respawnDelay.value || 0;



		if(delay && this.active){
			this.active = false;
			this.visible = false;
			this.respawnTimer = setTimeout(() => {
				this.active = true;
				this.visible = true;
				this._dispatchEvent("init");
			},  delay);
		} else {
			//this.el.style.display = "block";
			 this._dispatchEvent("init");
		}

		this.acceleration = Number(this.el.dataset.acceleration);
		this.acceleration = (typeof this.acceleration == "undefined" ? 100 : this.acceleration) / 100;

		this.moveType = this.el.dataset.move || "xy"; // x, y, xy, rotate, seek
		this.rotationAcceleration = Number(this.el.dataset.rotationAcceleration) || 1;


		this.eventName = this.el.dataset.eventName; // x, y, xy, rotate, seek


		this.seekUpdate = Number(this.el.dataset.seekUpdate) || 0;
		this.followRotation = this.el.dataset.followRotation || false;

		this.rotation = this.directionToAngle(this.el.dataset.direction) || 0;

		if(this.el.dataset.x){
			this.x = new Range(this.el.dataset.x).value;
		} else {
			this.x = parseInt(window.getComputedStyle(this.el).left) || 0;
		}

		if(this.el.dataset.y){
			this.y = new Range(this.el.dataset.y).value;
		} else {
			this.y = parseInt(window.getComputedStyle(this.el).top) || 0;
		}

		this.width = parseInt(window.getComputedStyle(this.el).width);
		this.height = parseInt(window.getComputedStyle(this.el).height);


		this.el.style.left = this.x + "px";
		this.el.style.top = this.y + "px";


  }

	getMovePos(){
		let speedFactor = this.level[this.el.dataset.speedFactor || "speedFactor"] || 1;
    return {x: Math.cos((this.rotation - 90) * Math.PI / 180) * this.speed * speedFactor,
    		y: Math.sin((this.rotation - 90) * Math.PI / 180) * this.speed * speedFactor
    }
	}

	move(movePos){
		
		if(!this.active){return}

    this.x += movePos.x;
    this.y += movePos.y;


    switch(this.el.dataset.direction){
	    case "down":
	    if(this.y > this.level.offsetHeight){this.outside()}
	    break;

	    case "up":
	    if(this.y < 0){this.outside()}
	    break;

	    case "left":
	    if(this.x < 0){this.outside()}
	    break;

	    case "right":
	    if(this.x > this.level.offsetWidth){this.outside()}
	    break;
    }
	}


    update(){
	    if(this._active){
	    	let movePos = this.getMovePos();
		    if(movePos.x || movePos.y){
			    this.move(movePos);
			    this.draw();
		    }
	    }
    }

    draw(){
	    this.el.style.left = this.x + "px";
	    this.el.style.top = this.y + "px";

	    switch(this.followRotation){

		    case "true":
		    let rotStr = 'rotate(' + this.rotation + 'deg)';
		    this.el.style.webkitTransform = rotStr;
		    this.el.style.transform = rotStr;
		    this.el.style.mozTransform = rotStr;
		    this.el.style.oTransform = rotStr;
		    break;


		    case "mirror":
		    if(this.moveType.includes("x")){
				let flipX = this.rotation > 180 && this.rotation < 360 ? -1 : 1;
			    let scaleStr = 'scaleX(' + flipX + ')';
			    this.el.style.webkitTransform = scaleStr;
			    this.el.style.transform = scaleStr;
			    this.el.style.mozTransform = scaleStr;
			    this.el.style.oTransform = scaleStr;
			} else if(this.moveType.includes("y")){
			    let flipY = this.rotation > 270 && this.rotation < 90 ? -1 : 1;
			    let scaleStr = 'scaleY(' + flipY + ')';
			    this.el.style.webkitTransform = scaleStr;
			    this.el.style.transform = scaleStr;
			    this.el.style.mozTransform = scaleStr;
			    this.el.style.oTransform = scaleStr;
			}

		    break;
	    }

    }

    get center(){
	    let pos = {};
	    pos.x = this.x + this.el.clientWidth / 2;
	    pos.y = this.y + this.el.clientHeight / 2
	    return pos;
    }

    pos(obj){
	    obj = obj ? obj.center : {x:0,y:0};
	    let rp = {}
	    let c = this.center;
	    rp.x = obj.x-c.x;
	    rp.y = obj.y-c.y;
	    rp.dist = Math.sqrt(rp.x*rp.x + rp.y*rp.y);
	    rp.angle = (Math.atan2(c.y-obj.y, c.x-obj.x) * 180 / Math.PI + 360 - 90) % 360;
	    return rp;
    }

    collision(){

    }


    outside(){

    }

		intersect(el){
			let r1 = new Rect(this.el.getBoundingClientRect());
			let r2 = new Rect(el.getBoundingClientRect());
			return r1.intersect(r2);
		}

    _dispatchEvent(eName, el, target){
	    target = target || this.el;
	    el = el || this.el;
 		let e = new CustomEvent(eName, {detail: {element:el, this: this}, cancelable: true});
		return target.dispatchEvent(e);

    }


    directionToAngle(dir, target){

	    let angle;

    	switch(dir){

			case "rotate":
			angle = 0; // this.rotation;
			break;

			case "up":
			angle = 0;
			break;

			case "down":
			angle = 180;
			break;

			case "left":
			angle = 270;
			break;

			case "right":
			angle = 90;
			break;

			case "character":
		    target = target || Range.getRandomVal(this.level.characters);
		    angle = this.pos(target).angle;
		    //console.log(angle);
			break;

			case "mouse":

			break;

			default:
			angle = parseInt(dir) || 180;
			break;
		}

		return angle;

    }

    remove(){
	    setTimeout(() => this.level.removeObject(this), 0);
    }



    set visible(state){
	    this._visible = state ? true : false;
	    this.el.style.display = this._visible ? "block" : "none";
    }

    get visible(){
	    return this._visible;
    }


    set active(state){
	    this._active = state ? true : false;
	    this.firing  = false;
			if(!state && this.respawnTimer){
				clearTimeout(this.respawnTimer);
				delete this.respawnTimer;
			}
    }

    get active(){
	    return this._active;
    }


}
// Här görs den exporterbar
module.exports = BaseObject;

},{"./Range.js":9,"./Rect.js":10}],2:[function(require,module,exports){
var BaseObject = require('./BaseObject.js');
var Shot = require('./Shot.js');
var Rect = require('./Rect.js');
var Range = require('./Range.js');


// Börja med att namnge klassen
class Character extends BaseObject {



	constructor(el, lv){

		super(el, lv);

		this.keys = [];
		this.keyPressList = {};

		if(el.dataset.keyCommands){
			this.keys = el.dataset.keyCommands.split(",");
		} else {
			// default is arrows + spacebar
			this.keys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "];

		}



		// find linked shots
		this.shotTemplates = [];

		el.classList.forEach(className => {
			this.level.querySelectorAll(".game-shot[data-link='" + className + "']").forEach(shot => {
				shot.dataset.originalWidth = shot.offsetWidth;
				shot.dataset.originalHeight = shot.offsetHeight;

				shot.style.display = "none";
				this.shotTemplates.push(shot);
			});
		});


	}


  init(){
    super.init();

    this.shots = this.shots || [];
    while(this.shots.length){
	    let shot = this.shots.pop();
	    this.level.removeChild(shot.el);
    }
		this.fireDirection = this.el.dataset.fireDirection || "rotation";
		this.rotation = this.el.dataset.rotation || 0;

  }


	keyDown(keyCode, keyPressList){

		this.keyPressList = keyPressList;

		switch(keyCode){


			case(this.keys[LEFT]):
			break;

			case(this.keys[UP]):
			//up
			break;

			case(this.keys[RIGHT]):
			if(this.acceleration&& !this.keys[RIGHT]){this.speed = 0}
			break;

			case(this.keys[DOWN]):
			//down
			break;

			case(this.keys[FIRE_LEFT]):
			//fire
			if(this.keys.length > 5){this.fireDirection = 270};
			break;

			case(this.keys[FIRE_UP]):
			//fire
			if(this.keys.length > 5){this.fireDirection = 0};
			break;

			case(this.keys[FIRE_RIGHT]):
			//fire
			if(this.keys.length > 5){this.fireDirection = 90};
			break;

			case(this.keys[FIRE_DOWN]):
			//fire
			if(this.keys.length > 5){this.fireDirection = 180};
			break;


		}

	}

	keyUp(keyCode){

	}


    update(obstacles){

			if(!this._active){
				console.log(this + " is not active");
				return;
			}

	    let accDir = this.acceleration > 0 ? -1 : 0;

	    if(this.moveType.includes("x")){
	    	if(this.keyPressList[this.keys[LEFT]]){
		    	if(this.rotation != 270){
			    	this.rotation = 270;
			    	this.speed = 0;
		    	}
		    	accDir = 1;
		    }
	    	if(this.keyPressList[this.keys[RIGHT]]){
		    	if(this.rotation != 90){
			    	this.rotation = 90;
			    	this.speed = 0;
		    	}
		    	accDir = 1;
		   	}
	    }
	    if(this.moveType.includes("y")){
	    	if(this.keyPressList[this.keys[UP]]){
		    	this.rotation = 0;
		    	accDir = 1;
		    }
	    	if(this.keyPressList[this.keys[DOWN]]){
		    	this.rotation = 180;
		    	accDir = 1;
		    }

	    }

	    if(this.moveType == "rotate"){
		    if(this.acceleration > 0){
			    accDir = this.speed > 0 ? -0.5 : (this.speed < 0 ? 2 : 0);
		    } else {
				accDir = 0;
			}

		    if(this.keyPressList[this.keys[LEFT]]){(
			    this.rotation -= this.rotationAcceleration) % 360;
			}
	    	if(this.keyPressList[this.keys[RIGHT]]){
		    	(this.rotation += this.rotationAcceleration) % 360;
		    }
	    	if(this.keyPressList[this.keys[UP]]){
		    	accDir = 1;
		    }
	    	if(this.keyPressList[this.keys[DOWN]]){
		    	if(this.acceleration){
		    		accDir = this.speed > 0 ? -3 : -1;
		    	} else {
			    	accDir = -1;
		    	}
		    }

		    if(this.acceleration){
		   		this.speed = this.speed + this.acceleration * accDir;
		   	} else {
			   	this.speed = (this.initSpeed || 1) * accDir;
		   	}

	    } else {
		    if(this.acceleration){
			    if(this.moveType == "x"){

					accDir = this.speed > 0 ? -0.5 : 0;

				    if(this.keyPressList[this.keys[LEFT]] || this.keyPressList[this.keys[RIGHT]]){
					    accDir = 1;
					}
					this.speed += this.acceleration * accDir;


			    }
				this.speed = Math.max(this.speed + this.acceleration * accDir, 0);


		    } else {
			    this.speed = this.initSpeed * accDir;
		    }

	    }
	    if(this.maxSpeed){
		     if(this.speed > this.maxSpeed){this.speed = this.maxSpeed}
		     if(this.speed < -this.maxSpeed){this.speed = -this.maxSpeed}
	    }



	    //console.log(this.speed, accelerate);

	    let movePos = this.getMovePos();

	    if(this.allowMove(movePos, obstacles)){
		    this.move(movePos);
	    }
		this.draw(movePos);




	    // FIRE

	    let wasFiring = this.firing;
	    let kpl = this.keyPressList;
		this.firing = kpl[this.keys[FIRE_LEFT]] || kpl[this.keys[FIRE_UP]] || kpl[this.keys[FIRE_RIGHT]] || kpl[this.keys[FIRE_DOWN]];
		if(!wasFiring && this.firing){
		   this.fire();
		}




    }



    fire(){
		 if(this.shotTemplates.length){
		    var angle = 0;


			switch(this.fireDirection){

				case "rotation":
				angle = this.rotation;
				break;

				case "up":
				angle = 0;
				break;

				case "down":
				angle = 180;
				break;

				case "left":
				angle = 270;
				break;

				case "right":
				angle = 90;
				break;

				case "mouse":

				break;

				default:
				angle = parseInt(this.fireDirection) || 0;
				break;

		    }

		    let temp = Range.getRandomVal(this.shotTemplates);
		    let shot = new Shot(temp, this, angle);

		    if(this._dispatchEvent("fire", shot.el) != false){
			    this.level.appendChild(shot.el);
			    this.shots.push(shot);
		    }


		    if(this.firing && shot.intensity.value){setTimeout(() => this.fire(), shot.intensity.value)}
		}
    }


    allowMove(movePos, obstacles){

	    let r1 = new Rect(this.el.getBoundingClientRect());
	    r1.move(movePos);

		var intersect = false;
	    obstacles.forEach(obj => {
		    let r2 = obj.el.getBoundingClientRect();
			let i = r1.intersect(r2);
			if(i){
				this._dispatchEvent(obj.eventName, obj.el);
			}

		    intersect = intersect || i;
	    });

	    let i = !r1.inside(this.level.rect);
	    intersect = intersect || i;

	    return !intersect;

    }



}



const LEFT = 0;
const UP = 1;
const RIGHT = 2;
const DOWN = 3;
const FIRE_LEFT = 4;
const FIRE_UP = 5;
const FIRE_RIGHT = 6;
const FIRE_DOWN = 7;


// Här görs den exporterbar
module.exports = Character;

},{"./BaseObject.js":1,"./Range.js":9,"./Rect.js":10,"./Shot.js":11}],3:[function(require,module,exports){
var BaseObject = require('./BaseObject.js');


// Börja med att namnge klassen
class Collectable extends BaseObject{

	constructor(el, lv){

		super(el, lv);

		this.nrOfCollisions = 0;
		this.eventName = this.eventName || "collect";

	}


	init(){
		super.init();
		this.nrOfCollisions = 0;
	}


  collision(){
		if(!this.active){return}
		if(this.nrOfCollisions){return}

    this.visible = false;
    this.active = false;
		this.nrOfCollisions++;

    if(this.respawnDelay){
	    //setTimeout(() => this.el.style.display = "block", delay.value);
	    this.respawnTimer = setTimeout(() => this.init(), this.respawnDelay.value);
    }
  }


	outside(){
		if(this.active){
			this.active = false;
			this._dispatchEvent("outside");
			this.collision();
		}
  }

}
// Här görs den exporterbar
module.exports = Collectable;

},{"./BaseObject.js":1}],4:[function(require,module,exports){
var BaseObject = require('./BaseObject.js');
var Shot = require('./Shot.js');
var Range = require("./Range.js");


// Börja med att namnge klassen
class Enemy extends BaseObject{

	constructor(el, lv){

		super(el, lv);
		this.rotation = this.rotation || 180;

		this.speed = this.speed || 5;
		this.fireDirection = el.dataset.fireDirection || "rotate";


		// find linked shots
		this.shotTemplates = [];

		el.classList.forEach(className => {
			this.level.querySelectorAll(".game-shot[data-link='" + className + "']").forEach(shot => {
				shot.dataset.originalWidth = shot.offsetWidth;
				shot.dataset.originalHeight = shot.offsetHeight;
				shot.style.display = "none";
				this.shotTemplates.push(shot);
			});
		});
		this.shots = [];
		this.firing = false;
		this.distToChar = Number.MAX_VALUE;

	}



	update(characters){

		if(this.active){


			if(characters.length){
				// find nearest character
				characters.sort((a, b) => {

					let dist1 = Math.sqrt(Math.pow(a.x - this.x, 2) + Math.pow(a.y - this.y, 2));
					let dist2 = Math.sqrt(Math.pow(b.x - this.x, 2) + Math.pow(b.y - this.y, 2));
					return dist1 - dist2;
				});

				let ch = characters[0];
				let dist = {x: (ch.x+ch.width/2) - (this.x+this.width/2), y: (ch.y+ch.height/2) - (this.y+this.height/2)};
				if(this.moveType.includes("x")){
					this.x += dist.x * this.speed / 100;
				}
				if(this.moveType.includes("y")){
					this.y += dist.y * this.speed / 100;
				}
				this.distanceToCharacter = Math.sqrt(dist.x * dist.x + dist.y * dist.y);
				this.targetCharacter = ch;
			}
			this.draw();


			if(this.distanceToCharacter < this.el.offsetWidth){
				if(!this.attacking){
					this.targetCharacter._dispatchEvent(this.eventName || "attack", this.el, this.targetCharacter.el);
					this.attacking = true;
					if(this.attackRate){setTimeout(() => this.attacking = false, this.attackRate)};
				}

			} else {
				this.attacking = false;
			}


		    // FIRE
		    // Check within sight
		    if(!this.firing){this.fire()}
		}

	}



	get distanceToCharacter(){
		return this.distToChar;
	}

	set distanceToCharacter(dist){
		this.distToChar = dist;
	}


	fire(){
    	if(this.shotTemplates.length && this.active){
		    this.firing = true;
		    var angle = this.directionToAngle(this.fireDirection, this.targetCharacter);
		    let temp = Range.getRandomVal(this.shotTemplates);
		    let shot = new Shot(temp, this, angle);
		    this.level.appendChild(shot.el);
		    this.shots.push(shot);
		    if(this.firing){setTimeout(() => this.fire(), shot.intensity.value)}
	    }
    }

    init(){
	    super.init();
	    if(this.shots){
		    while(this.shots.length){
			    let shot = this.shots.pop();
			    this.level.removeChild(shot.el);
		    }
	    }
	    this.attackRate = new Range(this.el.dataset.attackRate).value;


    }


}
// Här görs den exporterbar
module.exports = Enemy;

},{"./BaseObject.js":1,"./Range.js":9,"./Shot.js":11}],5:[function(require,module,exports){

var GameLevel = require('./GameLevel.js');
var Range = require('./Range.js');
var MaxSize = require('./MaxSize.js');




class GameEngine extends HTMLElement {

	constructor(){

		super();

		this.levelObjects = [];
		this.keys = {};
		this.levels = {}
		this.counter = 0;

		//this.attachShadow({mode: 'open'});
		this.levelObjects = this.querySelectorAll("game-level");
		this.levelObjects.forEach(level => {
			this.levels[level.id] = level._objects;
			level.parent = this;
		});

	}


	connectedCallback() {
		//console.log(this);


		//this.maxSize = new MaxSize(this, 1000, 562.5);

		if(this.dataset.maxSize != "false"){this.maxSize = new MaxSize(this)}

		window.addEventListener("keydown", e => this.keyDown(e.key));
		window.addEventListener("keyup", e => this.keyUp(e.key));
		window.requestAnimationFrame(() => this.animate());

	}

	keyDown(k){
		this.keys[k] = true;
		this.levelObjects.forEach(l => l.keyDown(k, this.keys));
	}

	keyUp(k){
		this.keys[k] = false;
		this.levelObjects.forEach(l => l.keyUp(k, this.keys));
	}

	animate(){
		this.levelObjects.forEach(level => level.update());
		window.requestAnimationFrame(() => this.animate());
	}




	play(id){

		let targetLevel;
		this.levelObjects.forEach(level => {
			if(level.id == id){
				targetLevel = level.start();
			} else {
				level.stop();
			}
		});
		return targetLevel;
	}

	stop(){
		this.levelObjects.forEach(level => level.stop());
	}


    getRandomValue(str){
	    return new Range(str).value;
    }
}


customElements.define('game-engine', GameEngine);
module.exports = GameEngine;

},{"./GameLevel.js":6,"./MaxSize.js":7,"./Range.js":9}],6:[function(require,module,exports){
var GameEngine = require('./GameEngine.js');
var BaseObject = require('./BaseObject.js');
var Character = require('./Character.js');
var Obstacle = require('./Obstacle.js');
var Collectable = require('./Collectable.js');
var Enemy = require('./Enemy.js');
var Rect = require('./Rect.js');



// Börja med att namnge klassen
class GameLevel extends HTMLElement {

	constructor(){

		super();


		this.id = this.getAttribute("id");
		if(!this.id){console.log("ID missing on " + el)}

		this.characters = [];
		this.gameObjects = [];
		this.enemies = [];
		this.obstacles = [];
		this.templates = [];
		this.allObjects = [];
		this.running = false;
		this.time = 0;

		this.speedFactor = this.dataset.speedFactor ? parseFloat(this.dataset.speedFactor) : 1;
	}



	connectedCallback() {
		//console.log(this);

		this.rect = new Rect(this.getBoundingClientRect());


		this._objects = {}; // ref

		this.querySelectorAll(".game-obstacle").forEach(o => {
			let obj = new Obstacle(o, this);
			this.obstacles.push(obj);
			this.newObject = obj;
		});

		this.querySelectorAll(".game-object").forEach(o => {
			let obj = new BaseObject(o, this);
			this.gameObjects.push(obj);
			this.newObject = obj;
		});

		this.querySelectorAll(".game-collectable").forEach(o => {
			let obj = new Collectable(o, this);
			this.gameObjects.push(obj);
			this.newObject = obj;
		});


		this.querySelectorAll(".game-enemy").forEach(o => {
			let obj = new Enemy(o, this);
			this.enemies.push(obj);
			this.newObject = obj;
		});

		this.querySelectorAll(".game-character").forEach(o => {
			let obj = new Character(o, this);
			this.characters.push(obj);
			this.newObject = obj;
		});

		this.querySelectorAll(".game-template").forEach(o => {
			o.style.display = "none";
			this.templates.push(o);
		});

		//this.parentNode.addLevel(this);
	}

	set newObject(obj){

		obj.el.classList.forEach(className => {
			this._objects[className] = obj;
		});
		let id = obj.el.getAttribute("id");
		if(id){this._objects[id] = obj;}
	}

	removeObject(obj){

			// remove from lists
			this.removeFromArray(this.obstacles, obj);
			this.removeFromArray(this.gameObjects, obj);
			this.removeFromArray(this.enemies, obj);
			this.removeFromArray(this.characters, obj);

			// remove references
			obj.el.classList.forEach(className => {
				if(this._objects[className] == obj){delete this._objects[className]}
			});
			let id = obj.el.getAttribute("id");
			if(this._objects[id] == obj){delete this._objects[id]}

			// remove element
			this.removeChild(obj.el);
	}

	removeFromArray(arr, obj){
		let i = arr.indexOf(obj);
		if(i>-1){arr.splice(i, 1)}
	}


	start(){
		this.running = true;
		this.obstacles.forEach(obj => obj.init());
		this.gameObjects.forEach(obj => obj.init());
		this.characters.forEach(obj => obj.init());
		this.enemies.forEach(obj => obj.init());
		this.time = 0;
		return this;
	}

	stop(){
		this.running = false;
	}

	keyDown(keyCode, keysPressed){
		this.characters.forEach(ch => ch.keyDown(keyCode, keysPressed));
	}
	keyUp(keyCode, keysPressed){
		this.characters.forEach(ch => ch.keyUp(keyCode, keysPressed));
	}

	update(){
		if(!this.running){return}
		this.obstacles.forEach(obj => obj.update());
		this.gameObjects.forEach(obj => obj.update());



		this.characters.forEach(obj => {
			obj.update(this.obstacles);
			let hits = [];
			let outside = [];

			obj.shots.forEach((shot, i) => {
				shot.update();
				let r1 = new Rect(shot.el.getBoundingClientRect());
			    if(!r1.inside(this.rect)){outside.push(i)}

				this.enemies.forEach(en => {
					let r2 = en.el.getBoundingClientRect();
					if(Rect.intersect(r1, r2)){
						if(!hits.includes(i)){hits.push(i)}
						en._dispatchEvent(shot.eventName, shot.el);
					}
				});


				this.gameObjects.forEach(obj => {
					let r2 = obj.el.getBoundingClientRect();
					if(Rect.intersect(r1, r2)){
						if(!hits.includes(i)){hits.push(i)}
						obj._dispatchEvent(shot.eventName, shot.el);
					}

				});

			});

			hits.reverse().forEach(i => {
				let shot = obj.shots.splice(i, 1).pop();
				if(shot){shot.collision(this);}
			});

			// remove all moving objects outside gamerect
			outside.reverse().forEach(i => {
				let shot = obj.shots.splice(i, 1).pop();
				if(shot){
					if(this.contains(shot.el)){this.removeChild(shot.el)}
				}
			});
		});



		this.enemies.forEach(obj => {
			obj.update(this.characters);
			let hits = [];
			let outside = [];

			obj.shots.forEach((shot, i) => {
				shot.update();
				let r1 = new Rect(shot.el.getBoundingClientRect());
			    if(!r1.inside(this.rect)){outside.push(i)}

				this.characters.forEach((ch, i, arr) => {
					let r2 = ch.el.getBoundingClientRect();
					if(Rect.intersect(r1, r2)){
						if(!hits.includes(i)){hits.push(i)}
						ch._dispatchEvent(shot.eventName, shot.el);
					}
				});
			});

			hits.reverse().forEach(i => {
				let shot = obj.shots.splice(i, 1).pop();
				if(shot){shot.collision(this);}
			});

			// remove all moving objects outside gamerect
			outside.reverse().forEach(i => {
				let shot = obj.shots.splice(i, 1).pop();

				if(shot){
					if(this.contains(shot.el)){this.removeChild(shot.el)}
				}
			});
		});



		this.gameObjects.forEach(obj => {
			let r1 = obj.el.getBoundingClientRect();
			this.characters.forEach(ch => {
				let r2 = ch.el.getBoundingClientRect();
				if(Rect.intersect(r1, r2)){
					if(ch._dispatchEvent(obj.eventName, obj)){
						obj.collision();
					}
				}

			});



		});





		this.obstacles.forEach(obj => {
			let r1 = obj.el.getBoundingClientRect();
			this.characters.forEach(ch => {
				let r2 = ch.el.getBoundingClientRect();
				if(Rect.intersect(r1, r2)){
					if(ch._dispatchEvent(obj.eventName, obj)){
						obj.collision();
					}
				}
			});
		});


	}


	get time(){
		return new Date().getTime() - this._timeOffset;
	}

	set time(t){
		this._timeOffset = new Date().getTime() + t;
	}


}
customElements.define('game-level', GameLevel);
// Här görs den exporterbar
module.exports = GameLevel;

},{"./BaseObject.js":1,"./Character.js":2,"./Collectable.js":3,"./Enemy.js":4,"./GameEngine.js":5,"./Obstacle.js":8,"./Rect.js":10}],7:[function(require,module,exports){



class MaxSize{
	
	constructor(el, w, h){
		this.el = el;
		this.el.style.display = "block";
		this.el.style.position = "absolute";
		
		
		window.addEventListener("orientationchange", e => this.scaleView());	
		window.addEventListener("resize", e => this.scaleView());
		    
		this.appWidth = w || parseInt(window.getComputedStyle(this.el).width);
		this.appHeight = h || parseInt(window.getComputedStyle(this.el).height);
		this.appRatio = this.appWidth / this.appHeight;
	
		this.el.style.position = "absolute";
		this.el.style.overflow = "hidden";
		this.el.style.width = this.appWidth + "px";
		this.el.style.height = this.appHeight + "px";
		
    	this.scaleView();
    			
	}
	
	
	
	scaleView(){


		let screenWidth = window.innerWidth;
		let screenHeight = window.innerHeight;
		
		let screenRatio = screenWidth / screenHeight;
		let landscape = screenRatio > 1;
		
		let scale = this.appRatio > screenRatio ? screenWidth / this.appRatio / this.appHeight : screenHeight * this.appRatio / this.appWidth;
		let w = this.appWidth*scale;
		let h = this.appHeight*scale;
		
		let cssScaleVal = "scale(" + scale + "," + scale + ") ";
		let cssTranslateVal = "translate(0%, 0%) ";
		let originVal = "0 0";
		
		let left = (screenWidth - w) / 2 + "px";
		let top = (screenHeight - h) / 2 + "px";
		    
		this.el.style["-ms-transform"] =  cssTranslateVal + cssScaleVal; /* IE 9 */
		this.el.style["-webkit-transform"] = cssTranslateVal + cssScaleVal; /* Chrome, Safari, Opera */
		this.el.style.transform = cssTranslateVal + cssScaleVal;

		this.el.style["-ms-transform-origin"] = originVal; /* IE 9 */
		this.el.style["-webkit-transform-origin"] = originVal; /* Chrome, Safari, Opera */
		this.el.style.transformOrigin = originVal;
			
		this.el.style.top = top;
		this.el.style.left = left;

			//width: w,
			//height: h,



	}

}
	
module.exports = MaxSize;


	
},{}],8:[function(require,module,exports){
var BaseObject = require('./BaseObject.js');

// Börja med att namnge klassen
class Obstacle extends BaseObject{

	constructor(el, lv){

		super(el, lv);
		this.eventName = el.dataset.eventName || "obstacle";
	}

}
// Här görs den exporterbar
module.exports = Obstacle;

},{"./BaseObject.js":1}],9:[function(require,module,exports){


class Range {

	constructor(str){
		
		this.values = [];
		if(str){

			let arr = str.split(",");
			arr.forEach(val => {
				
				if(val.includes("...")){
					var minMaxStrings = val.split("...");
					var numValMin = eval(minMaxStrings[0]);
					var numValMax = eval(minMaxStrings[1]);
					
					this.values.push(new MinMax(numValMin, numValMax));						
				} else {
					this.values.push(Number(val));
				}
				this.values.sort();
				
			});
			
			if(!this.values.length){
				this.values.push({min:0,max:1});
			}
			
		}

	}
	
	
	
	get value(){
		
		return Range.getRandomVal(this.values);
		
	}
	
	
	getRandomVal(dec, fn){
		return Range.getRandomVal(this.values, dec, fn);
	}
	    
}

Range.getRandomVal = function(arr, dec, fn){
	
	if(!arr){return 0}
	if(!arr.length){return 0}
	
	
	var ln = fn == "other" ? arr.length - 1 : arr.length;
	var rnd = Math.floor(Math.random()*ln);	
	var val;
	dec = dec || 0;
	
	// pick from array
	switch(fn){
		case "remove":
		val = arr.splice(rnd, 1).pop();
		break;
		
		case "other":
		val = arr.splice(rnd, 1).pop();
		arr.push(val);
		break;
		
		case "sequence":
		val = arr.shift();
		arr.push(val);
		break;
		
		case "shuffle":
		default:
		val = arr[rnd];
		break;
	}
	
	if(val instanceof MinMax){
		
		// random between two values
		
		var range = val.max-val.min+1;
		var num = val.min + Math.random()*range;
		
		var factor = Math.pow(10, dec);
		num*=factor;
		num = Math.floor(num);
		num/=factor;
		val = num;
		
	}
	return val;
		
}


class MinMax {
	
	constructor(min, max){
		this.min = Math.min(min, max);
		this.max = Math.max(min, max);
	}
	
}

module.exports = Range;
},{}],10:[function(require,module,exports){


// Börja med att namnge klassen
class Rect {

	constructor(rectObj){
		
		this.left = rectObj.left;
		this.top = rectObj.top;
		this.right = rectObj.right;
		this.bottom = rectObj.bottom;
		this.x = rectObj.x;
		this.y = rectObj.y;
		this.width = rectObj.width;
		this.height = rectObj.height;
	}
	
	move(movePos){
		let x = movePos.x || 0;
		let y = movePos.y || 0;
		this.left += x;
		this.top += y;
		this.right += x;
		this.bottom += y;
		this.x += x;
		this.y += y;
	}
	
	
	intersect(r1){
		return !(this.left > r1.right || 
		       this.right < r1.left || 
		       this.top > r1.bottom ||
		       this.bottom < r1.top);
	}
	
	inside(r1){
		
		return this.left > r1.left && this.top > r1.top && this.right < r1.right && this.bottom < r1.bottom;
	}
	
	    
}


Rect.intersect = function(r1, r2){
		
	return !(r2.left > r1.right || 
	       r2.right < r1.left || 
	       r2.top > r1.bottom ||
	       r2.bottom < r1.top);
}


// Här görs den exporterbar
module.exports = Rect;

},{}],11:[function(require,module,exports){
var BaseObject = require('./BaseObject.js');
var Range = require('./Range.js');


// Börja med att namnge klassen
class Shot extends BaseObject{

	constructor(temp, sender, angle){
		
		
		
		// clone temp element
		let el = temp.cloneNode();
		super(el, sender.level);
		
		this.el = el;
		this.el.style.display = "block";
		this.el.style.position = "absolute";
		
		let pos = sender.center;
		this.x = pos.x - Number(temp.dataset.originalWidth) / 2;
		this.y = pos.y - Number(temp.dataset.originalHeight) / 2;
				
		this.rotation = angle;
		
		this.draw();
		
	    this.intensity = new Range(temp.dataset.intensity || "0");
	    this.eventName = temp.dataset.eventName || "hit";
		
		
		this.speed = this.speed || 5;
		this.followRotation = this.el.dataset.followRotation || false;
	}
	
	collision(parent){
		parent.removeChild(this.el);
	}
    
}
// Här görs den exporterbar
module.exports = Shot;

},{"./BaseObject.js":1,"./Range.js":9}]},{},[5]);
