await Canvas();
world.gravity.y = 10;
let gameOver = false;

// --- CHARACTERS (Repositioned to fit the new layout) ---
let tralalero = new Sprite();
tralalero.x = -300;      // Starts on the new 'groundA_new' platform
tralalero.y = 100;
tralalero.width = 20; 
tralalero.height = 20; 
tralalero.rotationLock = true;
tralalero.scale = 0.2;
tralalero.img = 'sprites/tralalero.png'; 
tralalero.img.offset.y = -210; 

let tung = new Sprite();
tung.x = 230;            // Placed on 'groundA_right' platform
tung.y = 130;             
tung.width = 20;
tung.height = 20;
tung.rotationLock = true;
tung.physics = 'kinematic'; 
tung.vel.x = 3;    
tung.scale = 0.2;
tung.img = 'sprites/ttts.png';

let ballerina = new Sprite();
ballerina.x = 120;       // Placed on 'walld' (green top platform)
ballerina.y = -260;
ballerina.width = 20;
ballerina.height = 20;
ballerina.rotationLock = true;
ballerina.physics = 'kinematic'; 
ballerina.vel.x = 3;    
ballerina.scale = 0.2;
ballerina.img = 'sprites/ballerinacapp.png';

let jumpCount = 0;
const maxJumps = 2;
const jumpVel = -7;

// --- NEW WALLS & PLATFORMS ---
let walla = new Sprite(); 
walla.x = -500; 
walla.y = 0; 
walla.width = 20; 
walla.height = 600; 
walla.physics = 'static'; 
walla.color = 'gray'; 

let wallb = new Sprite(); 
wallb.x = 500; 
wallb.y = 0; 
wallb.width = 20; 
wallb.height = 600; 
wallb.physics = 'static'; 
wallb.color = 'gray'; 

let groundB_new = new Sprite();
groundB_new.x = 0;
groundB_new.y = 300;
groundB_new.width = 1050;
groundB_new.height = 20;
groundB_new.physics = 'static';
groundB_new.color = 'orange';

let puzzleWall1 = new Sprite();
puzzleWall1.x = 0;
puzzleWall1.y = 150;
puzzleWall1.width = 20;
puzzleWall1.height = 260;
puzzleWall1.physics = 'static';
puzzleWall1.color = 'red';

let groundA_new = new Sprite();
groundA_new.x = -230;
groundA_new.y = 170;
groundA_new.width = 240;
groundA_new.height = 20;
groundA_new.physics = 'static';
groundA_new.color = 'dark gray';

let groundA_right = new Sprite();
groundA_right.x = 230;
groundA_right.y = 170;
groundA_right.width = 240;
groundA_right.height = 20;
groundA_right.physics = 'static';
groundA_right.color = 'orange';

// CHANGED TO KINEMATIC: Pink lift platform moving vertically
let puzzleWall2 = new Sprite();
puzzleWall2.x = -400;
puzzleWall2.y = 300;
puzzleWall2.width = 120;
puzzleWall2.height = 20;
puzzleWall2.physics = 'kinematic'; 
puzzleWall2.color = 'pink';
puzzleWall2.vel.y = 2; // Starts moving downwards

let wallc = new Sprite();
wallc.x = 0;
wallc.y = 30;
wallc.width = 520;
wallc.height = 20;
wallc.physics = 'static';
wallc.color = 'blue';

let puzzleWall3 = new Sprite();
puzzleWall3.x = 120;
puzzleWall3.y = -20;
puzzleWall3.width = 20;
puzzleWall3.height = 400;
puzzleWall3.physics = 'static';
puzzleWall3.color = 'black';

let walle = new Sprite();
walle.x = 250;
walle.y = -110;
walle.width = 180;
walle.height = 20;
walle.physics = 'static';
walle.color = 'orange';

let walle_left = new Sprite();
walle_left.x = -200;
walle_left.y = -110;
walle_left.width = 160;
walle_left.height = 20;
walle_left.physics = 'static';
walle_left.color = 'white';

// CHANGED TO KINEMATIC: Purple lift platform moving vertically
let puzzleWall4 = new Sprite();
puzzleWall4.x = -80;
puzzleWall4.y = -150;
puzzleWall4.width = 120;
puzzleWall4.height = 20;
puzzleWall4.physics = 'kinematic'; 
puzzleWall4.color = 'purple';
puzzleWall4.vel.y = -2; // Starts moving upwards

let walld = new Sprite();
walld.x = 120;
walld.y = -220;
walld.width = 300;
walld.height = 20;
walld.physics = 'static';
walld.color = 'green';

// --- NEW EDGE TRACKING FOR ENEMY PATROLS ---
let edgeTungLeft = groundA_right.x - (groundA_right.width / 2);
let edgeTungRight = groundA_right.x + (groundA_right.width / 2);

let edgeBallerinaLeft = walld.x - (walld.width / 2);
let edgeBallerinaRight = walld.x + (walld.width / 2);

q5.update = function () {
	if (gameOver) {
		background('pink'); 
		fill('red');
		textSize(40);
		textAlign(CENTER);
		text("GAME OVER", 0, 0); 
		tralalero.vel.x = 0;
		tralalero.vel.y = 0;
		tung.vel.x = 0;
		ballerina.vel.x = 0;
		puzzleWall2.vel.y = 0;
		puzzleWall4.vel.y = 0;
		return; 
	}

	if (q5.bgImage) {
		background(q5.bgImage);
	} else {
		background('skyblue'); 
	}

	text('Use arrow keys to move!', 0, -200);
	
	tralalero.debug = mouse.pressing();

	if (kb.pressing('left')) tralalero.vel.x = -7;
	else if (kb.pressing('right')) tralalero.vel.x = 7;
	else tralalero.vel.x = 0;
	
	if ((mouse.presses() || kb.presses('space') || kb.presses('up')) && jumpCount < maxJumps) {
		tralalero.vel.y = jumpVel;
		jumpCount++;
	}

	// Moving Platform 1 Logic (Pink Platform: bounces up and down between y=-100 and y=150)
	if (puzzleWall2.y >= 150) {
		puzzleWall2.vel.y = -2;
	} else if (puzzleWall2.y <= -100) {
		puzzleWall2.vel.y = 2;
	}

	// Moving Platform 2 Logic (Purple Platform: bounces up and down between y=-230 and y=-50)
	if (puzzleWall4.y >= -50) {
		puzzleWall4.vel.y = -2;
	} else if (puzzleWall4.y <= -230) {
		puzzleWall4.vel.y = 2;
	}

	// Reset jumps if touching any of the static or moving platforms
	if (tralalero.collide(groundB_new) || tralalero.collide(puzzleWall1) || tralalero.collide(groundA_new) ||
		tralalero.collide(groundA_right) || tralalero.collide(puzzleWall2) || tralalero.collide(wallc) ||
		tralalero.collide(puzzleWall3) || tralalero.collide(walle) || tralalero.collide(walle_left) ||
		tralalero.collide(puzzleWall4) || tralalero.collide(walld) || tralalero.collide(walla) || tralalero.collide(wallb)) {
		jumpCount = 0;
	}

	// Enemy Tung movement boundaries
	if (tung.x >= edgeTungRight - (tung.width / 2)) {
		tung.vel.x = -3; 
	} else if (tung.x <= edgeTungLeft + (tung.width / 2)) {
		tung.vel.x = 3;
	}

	// Enemy Ballerina movement boundaries
	if (ballerina.x >= edgeBallerinaRight - (ballerina.width / 2)) {
		ballerina.vel.x = -3; 
	} else if (ballerina.x <= edgeBallerinaLeft + (ballerina.width / 2)) {
		ballerina.vel.x = 3;
	}

	if (tralalero.collides(tung) || tralalero.collides(ballerina)) {
		gameOver = true;
	}
};
