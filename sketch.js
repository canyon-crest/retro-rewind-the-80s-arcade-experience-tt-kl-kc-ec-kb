await Canvas();
world.gravity.y = 10;

let tralalero = new Sprite();
tralalero.x = 0;
tralalero.y = -50;
tralalero.width = 20; 
tralalero.height = 20; 
tralalero.rotationLock = true;

tralalero.scale = 0.2;
tralalero.img = 'sprites/tralalero.png'; 
tralalero.img.offset.y = -210; 

let groundA = new Sprite();
groundA.x = -80;
groundA.y = 80; 
groundA.width = 220;
groundA.height = 20; 
groundA.rotation = 0;
groundA.physics = 'static';
groundA.color = 'yellow';

let groundB = new Sprite();
groundB.x = 80;
groundB.y = 200; 
groundB.width = 220;
groundB.height = 20; 
groundB.rotation = 0;
groundB.physics = 'static';
groundB.color = 'yellow';

let groundC = new Sprite();
groundC.x = -160;
groundC.y = -20; 
groundC.width = 220;
groundC.height = 20; 
groundC.rotation = 0;
groundC.physics = 'static';
groundC.color = 'yellow';

q5.update = function () {
	background('skyblue');

	text('Use arrow keys to move!', 0, -200);
	
	tralalero.debug = mouse.pressing();

	if (kb.pressing('left')) tralalero.vel.x = -7;
	else if (kb.pressing('right')) tralalero.vel.x = 7;
	else tralalero.vel.x = 0;
	
	if (kb.presses('up')) tralalero.vel.y = -7;
};
