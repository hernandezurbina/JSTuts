// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var par = document.querySelector('p');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var numBalls = 10;
var numBallsOnScreen = 0;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Shape(x, y, velX, velY, exists){
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.exists = exists;
}

function Ball(x, y, velX, velY, exists, color, size){
	Shape.call(this, x, y, velX, velY, exists);
	this.color = color;
	this.size = size;
}

// class Ball inherits Shape's methods
Ball.prototype = Object.create(Shape.prototype);

// but keeps its own constructor
Ball.prototype.constructor = Ball;


Ball.prototype.draw = function(){
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	ctx.fill();
}

Ball.prototype.update = function(){
	if((this.x + this.size) >= width){
		this.velX = -(this.velX);
	}

	if((this.x - this.size) <= 0){
		this.velX = -(this.velX);
	}

	if((this.y + this.size) >= height){
		this.velY = -(this.velY);
	}

	if((this.y - this.size) <= 0){
		this.velY = -(this.velY);
	}

	this.x += this.velX;
	this.y += this.velY;

}

Ball.prototype.collisionDetect = function(){
	for(var j = 0; j < balls.length; j++){
		if(!(this === balls[j])){
			var dx = this.x - balls[j].x;
			var dy = this.y - balls[j].y;
			var distance = Math.sqrt((dx * dx) + (dy * dy));

			if(distance < this.size + balls[j].size){
				balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0,255) + ')';				
			}
		}
	}
}

function EvilCircle(x, y, exists, color, size, velX, velY){
	Shape.call(this, x, y, exists);
	this.color = color;
	this.size = size;
	this.velX = velX;
	this.velY = velY;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function(){
	ctx.beginPath();
	ctx.strokeStyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	ctx.lineWidth = 3;
	ctx.stroke();
}

EvilCircle.prototype.checkBounds = function(){
	if((this.x + this.size) >= width){
		this.x -= this.size;
	}

	if((this.x - this.size) <= 0){
		this.x += this.size;
	}

	if((this.y + this.size) >= height){
		this.y -= this.size;
	}

	if((this.y - this.size) <= 0){
		this.y += this.size;
	}
}

EvilCircle.prototype.setControls = function(){
	var _this = this;
	window.onkeydown = function(event){
		if(event.keyCode === 65){
			_this.x -= _this.velX;
		}
		else if(event.keyCode === 68){
			_this.x += _this.velX;
		}
		else if(event.keyCode === 87){
			_this.y -= _this.velY;
		}
		else if(event.keyCode === 83){
			_this.y += _this.velY;
		}
	}
}

EvilCircle.prototype.collisionDetect = function(){
	for(var j = 0; j < balls.length; j++){
		if(balls[j].exists){
			var dx = this.x - balls[j].x;
			var dy = this.y - balls[j].y;
			var distance = Math.sqrt((dx * dx) + (dy * dy));

			if(distance < this.size + balls[j].size){
				balls[j].exists = false;
			}
		}
	}	
}


var balls = [];
var eCircle = new EvilCircle(
	random(0, width),
	random(0, height),
	true,
	'rgb(255, 255, 255)',
	10,
	20,
	20
	);

eCircle.setControls();


function loop(){
	ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
	ctx.fillRect(0, 0, width, height);

	while(balls.length < numBalls){
		var ball = new Ball(
			random(0, width),
			random(0, height),
			random(-7, 7),
			random(-7, 7),
			true,
			'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')', 
			random(10, 20)
			);
		balls.push(ball);
	}

	numBallsOnScreen = 0;

	for(var i = 0; i < balls.length; i++){		
		if(balls[i].exists){
			numBallsOnScreen++;
			balls[i].draw();
			balls[i].update();
			balls[i].collisionDetect();			
		}
	}
	
	eCircle.draw();
	eCircle.checkBounds();
	eCircle.collisionDetect();

	par.textContent = "Score: " + (numBalls - numBallsOnScreen);

	requestAnimationFrame(loop);
}

loop();


