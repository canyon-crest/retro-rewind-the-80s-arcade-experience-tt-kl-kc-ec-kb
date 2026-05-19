let timerDiv = document.getElementById('cave-timer-hud');
if (!timerDiv) {
	timerDiv = document.createElement('div');
	timerDiv.id = 'cave-timer-hud';
	document.body.appendChild(timerDiv);
	
	let styleEl = document.createElement('style');
	styleEl.innerHTML = `
		#cave-timer-hud {
			position: absolute;
			top: 20px;
			left: 50%;
			transform: translateX(-50%);
			background-color: rgba(25, 20, 20, 0.95);
			border: 2.5px solid #4e1500;
			border-radius: 6px;
			width: 140px;
			padding: 8px 0;
			text-align: center;
			font-family: 'Courier New', Courier, monospace;
			font-weight: bold;
			font-size: 18px;
			color: #ffeb79;
			box-shadow: 0 0 10px rgba(49, 13, 0, 0.4);
			z-index: 9999;
			pointer-events: none;
		}
	`;
	document.head.appendChild(styleEl);
}

let retryBtn = document.getElementById('cave-retry-btn');
if (!retryBtn) {
	retryBtn = document.createElement('button');
	retryBtn.id = 'cave-retry-btn';
	retryBtn.innerText = 'RETRY';
	document.body.appendChild(retryBtn);

	let styleBtn = document.createElement('style');
	styleBtn.innerHTML = `
		#cave-retry-btn {
			position: absolute;
			top: 60%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: #ffeb79;
			border: 2.5px solid #4e1500;
			border-radius: 6px;
			width: 160px;
			height: 45px;
			font-family: 'Courier New', Courier, monospace;
			font-weight: bold;
			font-size: 18px;
			color: rgb(25, 20, 20);
			cursor: pointer;
			display: none;
			z-index: 10000;
			box-shadow: 0 0 10px rgba(255, 235, 121, 0.4);
		}
		#cave-retry-btn:hover {
			background-color: #ffd83b;
		}
	`;
	document.head.appendChild(styleBtn);
}

await Canvas();
world.gravity.y = 10;
let gameOver = false;
let bgImg = await loadImage('images/bg.jpg');

let lives = 3;
const maxLives = 3;
let invincible = false;
let invincibleTimer = 0;
const invincibleDuration = 90;

let tralalero = new Sprite();
tralalero.x = -300;      
tralalero.y = 100;
tralalero.width = 240; 
tralalero.height = 490; 
tralalero.rotationLock = true;
tralalero.scale = 0.17;
tralalero.img = 'sprites/tralalero.png'; 
tralalero.img.offset.y = 0; 

let tung = new Sprite();
tung.x = 230;            
tung.y = 130;             
tung.width = 20;
tung.height = 20;
tung.rotationLock = true;
tung.physics = 'kinematic'; 
tung.vel.x = 3;    
tung.scale = 0.2;
tung.img = 'sprites/ttts.png';
tung.diameter = 50;

let ballerina = new Sprite();
ballerina.x = 120;       
ballerina.y = -260;
ballerina.width = 20;
ballerina.height = 20;
ballerina.rotationLock = true;
ballerina.physics = 'kinematic'; 
ballerina.vel.x = 3;    
ballerina.scale = 0.2;
ballerina.img = 'sprites/ballerinacapp.png';
ballerina.diameter = 50;

let jumpCount = 0;
const maxJumps = 2;
const jumpVel = -5;

let walla = new Sprite(); 
walla.x = -600; 
walla.y = -50; 
walla.width = 20; 
walla.height = 680; 
walla.physics = 'static'; 
walla.color = 'orange'; 

let wallb = new Sprite(); 
wallb.x = 600; 
wallb.y = -50; 
wallb.width = 20; 
wallb.height = 680; 
wallb.physics = 'static'; 
wallb.color = 'orange'; 

let topground = new Sprite();
topground.x = 0;
topground.y = -400;
topground.width = 1250;
topground.height = 20;
topground.physics = 'static';
topground.color = 'orange';

let groundB_new = new Sprite();
groundB_new.x = 0;
groundB_new.y = 300;
groundB_new.width = 1250;
groundB_new.height = 20;
groundB_new.physics = 'static';
groundB_new.color = 'orange';

let puzzleWall1 = new Sprite();
puzzleWall1.x = 0;
puzzleWall1.y = 170;
puzzleWall1.width = 20;
puzzleWall1.height = 280;
puzzleWall1.physics = 'static';
puzzleWall1.color = 'orange';

let groundA_new = new Sprite();
groundA_new.x = -230;
groundA_new.y = 170;
groundA_new.width = 240;
groundA_new.height = 20;
groundA_new.physics = 'static';
groundA_new.color = 'orange';

let groundA_right = new Sprite();
groundA_right.x = 230;
groundA_right.y = 170;
groundA_right.width = 200;
groundA_right.height = 20;
groundA_right.physics = 'static';
groundA_right.color = 'orange';

let puzzleWall2 = new Sprite();
puzzleWall2.x = -500;
puzzleWall2.y = 300;
puzzleWall2.width = 100;
puzzleWall2.height = 20;
puzzleWall2.physics = 'kinematic'; 
puzzleWall2.color = 'orange';
puzzleWall2.vel.y = 2; 

let wallc = new Sprite();
wallc.x = 0;
wallc.y = 30;
wallc.width = 520;
wallc.height = 20;
wallc.physics = 'static';
wallc.color = 'orange';

let wallf = new Sprite();
wallf.x = 550;
wallf.y = 0;
wallf.width = 80;
wallf.height = 20;
wallf.physics = 'static';
wallf.color = 'orange';

let puzzleWall3 = new Sprite();
puzzleWall3.x = 120;
puzzleWall3.y = -20;
puzzleWall3.width = 20;
puzzleWall3.height = 400;
puzzleWall3.physics = 'static';
puzzleWall3.color = 'orange';

let walle = new Sprite();
walle.x = 380;
walle.y = -110;
walle.width = 140;
walle.height = 20;
walle.physics = 'static';
walle.color = 'orange';

let walle_left = new Sprite();
walle_left.x = -300;
walle_left.y = -110;
walle_left.width = 100;
walle_left.height = 20;
walle_left.physics = 'static';
walle_left.color = 'orange';

let puzzleWall4 = new Sprite()
puzzleWall4.x = -80;
puzzleWall4.y = -150;
puzzleWall4.width = 100;
puzzleWall4.height = 20;
puzzleWall4.physics = 'kinematic'; 
puzzleWall4.color = 'orange';
puzzleWall4.vel.y = -2; 

let walld = new Sprite();
walld.x = 120;
walld.y = -220;
walld.width = 300;
walld.height = 20;
walld.physics = 'static';
walld.color = 'orange';

let edgeTungLeft = groundA_right.x - (groundA_right.width / 2);
let edgeTungRight = groundA_right.x + (groundA_right.width / 2);

let edgeBallerinaLeft = walld.x - (walld.width / 2);
let edgeBallerinaRight = walld.x + (walld.width / 2);

let absoluteElapsedSeconds = 0;
let timeOffset = 0;

retryBtn.onclick = function() {
	lives = 3; // Set back to 3 lives on retry
	gameOver = false;
	
	invincible = true;
	invincibleTimer = 120; 
	
	timeOffset = millis() / 1000;
	absoluteElapsedSeconds = 0;
	
	tralalero.x = -450;
	tralalero.y = 100;
	tralalero.vel.x = 0;
	tralalero.vel.y = 0;
	
	tung.x = 230;
	tung.y = 130;
	tung.vel.x = 3;
	
	ballerina.x = 120;
	ballerina.y = -260;
	ballerina.vel.x = 3;
	
	puzzleWall2.x = -500;
	puzzleWall2.y = 300;
	puzzleWall2.vel.y = 2;
	
	puzzleWall4.x = -80;
	puzzleWall4.y = -150;
	puzzleWall4.vel.y = -2;

	retryBtn.style.display = 'none';
};

q5.update = function () {
	background(bgImg);
	if (!gameOver) {
		absoluteElapsedSeconds = (millis() / 1000) - timeOffset;
	}

	let minutes = floor(absoluteElapsedSeconds / 60);
	let seconds = floor(absoluteElapsedSeconds % 60);
	let displayMin = minutes < 10 ? "0" + minutes : minutes;
	let displaySec = seconds < 10 ? "0" + seconds : seconds;
	
	timerDiv.innerText = displayMin + ":" + displaySec;

	camera.x = tralalero.x;
	camera.y = tralalero.y;

	if (gameOver) {
		background('black');

		fill('red');
		textSize(40);
		textAlign(CENTER, CENTER);
		text("GAME OVER", camera.x, camera.y - 50);

		tralalero.vel.x = 0;
		tralalero.vel.y = 0;
		tung.vel.x = 0;
		ballerina.vel.x = 0;
		puzzleWall2.vel.y = 0;
		puzzleWall4.vel.y = 0;

		retryBtn.style.display = 'block';
		return;
	}

	if (absoluteElapsedSeconds < 10) {
		fill('white');
		textFont('Arial');
		textStyle(NORMAL);
		textSize(20);
		textAlign(CENTER);
		text('Use arrow keys to move!', 0, -200);
	}
	
	tralalero.debug = mouse.pressing();

	if (kb.pressing('left')) tralalero.vel.x = -5;
	else if (kb.pressing('right')) tralalero.vel.x = 5;
	else tralalero.vel.x = 0;
	
	if ((mouse.presses() || kb.presses('space') || kb.presses('up')) && jumpCount < maxJumps) {
		tralalero.vel.y = jumpVel;
		jumpCount++;
	}

	if (puzzleWall2.y >= 150) {
		puzzleWall2.vel.y = -2;
	} else if (puzzleWall2.y <= -100) {
		puzzleWall2.vel.y = 2;
	}

	if (puzzleWall4.y >= -50) {
		puzzleWall4.vel.y = -2;
	} else if (puzzleWall4.y <= -230) {
		puzzleWall4.vel.y = 2;
	}

	if (tralalero.collide(groundB_new) || tralalero.collide(puzzleWall1) || tralalero.collide(groundA_new) ||
		tralalero.collide(groundA_right) || tralalero.collide(puzzleWall2) || tralalero.collide(wallc) ||
		tralalero.collide(puzzleWall3) || tralalero.collide(walle) || tralalero.collide(walle_left) ||
		tralalero.collide(puzzleWall4) || tralalero.collide(walld) || tralalero.collide(walla) || tralalero.collide(wallb) || tralalero.collide(wallf)
		||tralalero.collide(topground)) {
		jumpCount = 0;
	}

	if (tung.x >= edgeTungRight - (tung.width / 2)) {
		tung.vel.x = -3; 
	} else if (tung.x <= edgeTungLeft + (tung.width / 2)) {
		tung.vel.x = 3;
	}

	if (ballerina.x >= edgeBallerinaRight - (ballerina.width / 2)) {
		ballerina.vel.x = -3; 
	} else if (ballerina.x <= edgeBallerinaLeft + (ballerina.width / 2)) {
		ballerina.vel.x = 3;
	}
	    
	if (invincible) {
		invincibleTimer--;

		if (invincibleTimer <= 0) {
			invincible = false;
		}
	}

	if (!invincible && tralalero.colliding(tung)) {
		lives--;

		invincible = true;
		invincibleTimer = invincibleDuration;

		tralalero.vel.x = -5;
		tralalero.vel.y = -5;

		if (lives <= 0) {
			lives = 0;
			gameOver = true;
		}
	}

	if (!invincible && tralalero.colliding(ballerina)) {
		if (lives < maxLives) {
			lives++;
		}

		invincible = true;
		invincibleTimer = invincibleDuration;
	}

	push();
	
	rectMode(CORNER);
	fill(0, 0, 0, 200);
	stroke('#4e1500');
	strokeWeight(2);
	rect(-485, -298, 185, 36, 6);
	
	fill('#ffeb79');
	noStroke();
	textFont('Courier New');
	textStyle(BOLD);
	textSize(16);
	textAlign(LEFT, CENTER);
	text("LIVES:", -475, -280);
	
	for (let i = 0; i < lives; i++) {
		fill('red');
		circle(-405 + i * 30, -280, 18);
	}
	
	pop();
};
