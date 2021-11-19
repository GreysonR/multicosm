"use strict";

const { World, Render, Performance, player } = engine;

// saving
var newlyBeatLevels = [];
var data = (JSON.parse(localStorage.getItem("multicosmData")) ?? {
	world: 0,
	level: 0,
	coins: 0,
	worlds: {
		"0": {
			unlocked: true,
			completed: false,
			completedLevels: [],
			coins: [],
		},
		"1": {
			prev: "0",
			unlocked: false,
			cost: 5,
			completed: false,
			completedLevels: [],
			coins: [],
		},
	}
});
var allWorlds = {
	worldIndex: 0,
	levelIndex: 0,
	get curWorld() {
		return this[this.worldIndex];
	},
	get curLevel() {
		return this[this.worldIndex].levels[this.levelIndex];
	},
	"0": {
		levels: [
			(function level1() {
				let level = World.create(-1, new vec(139, 329), new vec(668, 361));
				
				level.createWall(new vec(-172, -214), 1144, 301, 0);
				level.createWall(new vec(-209, 393), 1218, 209, 0);
				level.createWall(new vec(-164, -122), 264, 724, 0);
				level.createWall(new vec(700, -131), 295, 742, 0);
				level.createWall(new vec(211, 167), 378, 463, 0);
				level.createCoin(new vec(147, 216), 0);
				level.createCoin(new vec(676, 234), 0);
				level.createInternalCorner(new vec(100, 393), 3, 0);
				level.createInternalCorner(new vec(211, 393), 2, 0);
				level.createInternalCorner(new vec(100, 87), 0, 0);
				level.createInternalCorner(new vec(700, 87), 1, 0);
				level.createInternalCorner(new vec(700, 393), 2, 0);
				level.createInternalCorner(new vec(589, 393), 3, 0);
			
				return level;
			})(),
			(function level2() {
				let level = World.create(-1, new vec(80, 217), new vec(487, 348));
			
				level.createWall(new vec(-193, 249), 680, 394, 0);
				level.createWall(new vec(-122, 0), 172, 480, 0);
				level.createWall(new vec(-210, -223), 697, 362, 0);
				level.createWall(new vec(331, -188), 469, 245, 0);
				level.createWall(new vec(644, -178), 283, 427, 0);
				level.createCoin(new vec(447, 225), 0);
				level.createCoin(new vec(495, 110), 0);
				level.createInternalCorner(new vec(50, 139), 0, 0);
				level.createInternalCorner(new vec(50, 249), 3, 0);
				level.createInternalCorner(new vec(487, 57), 0, 0);
				level.createInternalCorner(new vec(644, 57), 1, 0);
				return level;
			})(),
			(function level3() {
				let level = World.create(-1, new vec(164, 57), new vec(648, 300));
			
				level.createWall(new vec(0, -216), 800, 273, 0);
				level.createWall(new vec(0, 440), 800, 152, 0);
				level.createWall(new vec(-231, -50), 351, 597, 0);
				level.createWall(new vec(680, -73), 251, 643, 0);
				level.createWall(new vec(0, 124), 223, 423, 0);
				level.createWall(new vec(483, 367), 424, 247, 0);
				level.createWall(new vec(483, 217), 317, 83, 0);
				level.createWall(new vec(87, 124), 295, 176, 0);
				level.createCoin(new vec(392, 188), 0);
				level.createCoin(new vec(343, 308), 0);
				level.createInternalCorner(new vec(120, 57), 0, 0);
				level.createInternalCorner(new vec(223, 300), 0, 0);
				level.createInternalCorner(new vec(483, 440), 2, 0);
				level.createInternalCorner(new vec(680, 217), 2, 0);
				level.createInternalCorner(new vec(680, 367), 2, 0);
				level.createInternalCorner(new vec(680, 57), 1, 0);
				level.createInternalCorner(new vec(680, 300), 1, 0);
				level.createInternalCorner(new vec(223, 440), 3, 0);
				level.createInternalCorner(new vec(120, 124), 3, 0);
				return level;
			})(),
			(function level4() {
				let level = World.create(-1, new vec(663, 57), new vec(202, 266));
				
				level.createWall(new vec(-99, -158), 998, 215, 0);
				level.createWall(new vec(478, 155), 322, 56, 0);
				level.createWall(new vec(-114, 107), 419, 104, 0);
				level.createWall(new vec(740, -110), 190, 701, 0);
				level.createWall(new vec(-83, 411), 883, 217, 0);
				level.createWall(new vec(234, 356), 665, 260, 0);
				level.createWall(new vec(234, 324), 71, 191, 0);
				level.createWall(new vec(-126, 107), 186, 421, 0);
				level.createInternalCorner(new vec(305, 356), 3, 0);
				level.createInternalCorner(new vec(740, 356), 2, 0);
				level.createInternalCorner(new vec(740, 211), 1, 0);
				level.createInternalCorner(new vec(740, 155), 2, 0);
				level.createInternalCorner(new vec(740, 57), 1, 0);
				level.createInternalCorner(new vec(60, 211), 0, 0);
				level.createInternalCorner(new vec(60, 411), 3, 0);
				level.createInternalCorner(new vec(234, 411), 2, 0);
				level.createCoin(new vec(315, 329), 0);
				level.createCoin(new vec(70, 221), 0);
				
				return level;
			})(),
		],
	},
	"1": {
		levels: [
			(function initLevel5() {
				let level = World.create(-1, new vec(146, 148), new vec(614, 389));
			
				level.createLayer("#F08E47");
				
				// ~ layer 0
				level.createWall(new vec(654, 0), 146, 480, 0);
				level.createWall(new vec(0, 0), 146, 480, 0);
				level.createWall(new vec(110, 0), 580, 60, 0);
				level.createWall(new vec(119, 421), 562, 59, 0);
				level.createWall(new vec(119, 180), 562, 120, 0);
				level.createWall(new vec(110, 284), 202, 152, 0);
				level.createWall(new vec(488, 50), 193, 140, 0);
			
				level.createPortal(new vec(482, 69), 6, 102, 0, 1, new vec(-1, 0));
				level.createPortal(new vec(576, 300), 70, 6, 0, 1, new vec(0, 1));
				
				// ~ layer 1
				level.createWall(new vec(0, 0), 482, 480, 1);
				level.createWall(new vec(654, 0), 146, 480, 1);
				level.createWall(new vec(452, 306), 232, 174, 1);
				level.createWall(new vec(452, 0), 232, 60, 1);
				
				return level;
			})(),
			(function initLevel6() {
				let level = World.create(-1, new vec(256, 358), new vec(698, 388));
			
				level.createLayer("#F08E47");
				
				// ~ layer 0
				level.createWall(new vec(730, 0), 70, 480, 0);
				level.createWall(new vec(0, 0), 70, 480, 0);
				level.createWall(new vec(0, 0), 800, 60, 0);
				level.createWall(new vec(141, 269), 434, 60, 0);
				level.createWall(new vec(297, 122), 139, 177, 0);
				level.createWall(new vec(301, 308), 274, 133, 0);
				level.createWall(new vec(222, 20), 214, 144, 0);
				level.createWall(new vec(0, 420), 800, 60, 0);
				
				level.createPortal(new vec(291, 168), 6, 96, 0, 1, new vec(-1, 0));
				level.createPortal(new vec(485, 263), 70, 6, 0, 1, new vec(0, -1));
				
				// ~ layer 1
				level.createWall(new vec(730, 0), 70, 480, 1);
				level.createWall(new vec(264, 0), 493, 154, 1);
				level.createWall(new vec(416, 97), 314, 166, 1);
				level.createWall(new vec(0, 0), 291, 443, 1);
				level.createWall(new vec(416, 232), 60, 126, 1);
				level.createWall(new vec(565, 241), 187, 54, 1);
				level.createWall(new vec(0, 420), 771, 60, 1);

				return level;
			})(),
			(function initLevel7() {
				let level = World.create(-1, new vec(170, 170), new vec(170, 278));
			
				level.createLayer("#F08E47");
				
				// ~ layer 0
				level.createWall(new vec(0, 0), 151, 480, 0);
				level.createWall(new vec(74, 0), 340, 77, 0);
				level.createWall(new vec(74, 403), 340, 77, 0);
				level.createWall(new vec(99, 202), 201, 76, 0);
				level.createWall(new vec(512, 123), 60, 235, 0);
				
				level.createPortal(new vec(506, 170), 6, 140, 0, 1, new vec(-1, 0));
				
				// ~ layer 1
				level.createWall(new vec(0, 0), 800, 150, 1);
				level.createWall(new vec(0, 330), 800, 150, 1);
				level.createWall(new vec(741, 105), 59, 270, 1);
				level.createWall(new vec(0, 113), 506, 254, 1);

				return level;
			})(),
			(function initLevel8() {
				let level = World.create(-1, new vec(97, 70), new vec(671, 318));
			
				level.createLayer("#F08E47");
				
				// ~ layer 0
				level.createWall(new vec(0, 410), 800, 70, 0);
				level.createWall(new vec(460, 350), 340, 90, 0);
				level.createWall(new vec(0, 0), 800, 70, 0);
				level.createWall(new vec(306, 175), 100, 115, 0);
				level.createWall(new vec(59, 134), 138, 91, 0);
				level.createWall(new vec(406, 36), 352, 189, 0);
				level.createWall(new vec(378, 175), 50, 50, 0);
				level.createWall(new vec(703, 0), 97, 480, 0);
				level.createWall(new vec(0, 0), 97, 480, 0);
				
				level.createPortal(new vec(412, 225), 116, 6, 0, 1, new vec(0, 1));
				
				// ~ layer 1
				level.createWall(new vec(0, 410), 800, 70, 1);
				level.createWall(new vec(633, 231), 99, 214, 1);
				level.createWall(new vec(404, 231), 132, 67, 1);
				level.createWall(new vec(329, 0), 471, 40, 1);
				level.createWall(new vec(299, 0), 181, 140, 1);
				level.createWall(new vec(703, 40), 97, 370, 1);
				level.createWall(new vec(0, 0), 329, 480, 1);
				level.createWall(new vec(633, 0), 99, 140, 1);
			
				level.createSpike(new vec(329, 186), 150, 1, new vec(1, 0));

				return level;
			})(),
		],
	},
}

function save() {
	console.log(data);
	localStorage.setItem("multicosmData", JSON.stringify(data));
}
function reset() {
	localStorage.clear();
	window.location.reload();
}

// init levels
(function initLevelTest() {
	let level = World.create(-1, new vec(135, 364), new vec(631, 348));
	level.createLayer("#F08E47");
	// level.createLayer("#7A51D3");

	level.end.layer = 1;
	
	// ~ layer 0
	level.createWall(new vec(0, 0), 800, 64, 0);
	level.createWall(new vec(0, 430), 800, 50, 0);
	level.createWall(new vec(0, 0), 50, 480, 0);
	level.createWall(new vec(750, 0), 50, 480, 0);
	level.createWall(new vec(516, 189), 234, 291, 0);
	level.createWall(new vec(0, 228), 286, 44, 0);

	level.createPortal(new vec(510, 330), 6, 100, 0, 1, new vec(-1, 0), true);

	level.createSpike(new vec(64, 64), 175, 0, new vec(0, 1));


	// ~ layer 1
	level.createWall(new vec(0, 0), 800, 50, 1);
	level.createWall(new vec(0, 430), 800, 50, 1);
	level.createWall(new vec(0, 0), 50, 480, 1);
	level.createWall(new vec(750, 0), 50, 480, 1);
	level.createWall(new vec(516, 242), 115, 238, 1);
	level.createWall(new vec(0, 242), 212, 50, 1);
	level.createWall(new vec(406, 242), 141, 88, 1);
	level.createWall(new vec(327, 24), 439, 125, 1);

	// complex group 1
	let wire1 = level.createWire([ new vec(364, 452), new vec(25, 452), new vec(25, 269), new vec(93, 269), new vec(93, 277) ], 1);
	let wire0 = level.createWire([ new vec(619, 266), new vec(575, 266), new vec(575, 452), new vec(364, 452), new vec(364, 441) ], 1);
	let piston0 = level.createPiston(new vec(631, 256), 119, 20, 1, new vec(-1, 0)).setMaxPower(2);
	let button1 = level.createButton(new vec(52, 292), 82, 11, 1, new vec(0, 1));
	let button0 = level.createButton(new vec(324, 419), 82, 11, 1, new vec(0, -1));

	wire0.connectIn(button0);
	wire0.connectIn(wire1);
	wire0.connectOut(piston0);
	wire1.connectIn(button1);

	button0.permanentPress = false;
	button1.permanentPress = true;

	piston0.default = false;
});
(function initLevelTest2() {
	let level = World.create(-1, new vec(125, 310), new vec(158, 342));
	level.layers[0].color = "#DAD9E3";
	// level.createLayer("#F08E47");

	// ~ layer 0
	level.createWall(new vec(-100, -139), 1028, 203, 0);
	level.createWall(new vec(566, 430), 313, 149, 0);
	level.createWall(new vec(750, -117), 247, 730, 0);
	level.createWall(new vec(-93, -122), 143, 394, 0);
	level.createWall(new vec(194, 192), 280, 80, 0);
	level.createWall(new vec(-100, 222), 216, 50, 0);
	level.createInternalCorner(new vec(50, 222), 3, 0);
	level.createInternalCorner(new vec(50, 64), 0, 0);
	level.createInternalCorner(new vec(750, 64), 1, 0);
	level.createInternalCorner(new vec(750, 430), 2, 0);

	level.createSpike(new vec(116, 64), 78, 0, new vec(0, 1));

	// complex group 2
	let wire1 = level.createWire([ new vec(42, 107), new vec(24, 107), new vec(24, 37), new vec(205, 37), new vec(205, 51) ], 0);
	let wire0 = level.createWire([ new vec(98, 247), new vec(24, 247), new vec(24, 107) ], 0);
	let piston2 = level.createPiston(new vec(116, 237), 78, 20, 0, new vec(1, 0)).setDefault(false);
	let piston1 = level.createPiston(new vec(194, 64), 20, 128, 0, new vec(0, 1)).setDefault(false);
	let button0 = level.createButton(new vec(50, 66), 11, 82, 0, new vec(1, 0));
	// complex group 1
	let wire2 = level.createWire([ new vec(410, 48), new vec(410, 32), new vec(782, 32), new vec(782, 458), new vec(707, 458), new vec(707, 439) ], 0);
	let piston0 = level.createPiston(new vec(400, 64), 20, 85, 0, new vec(0, 1)).setDefault(false);
	let button1 = level.createButton(new vec(663, 419), 82, 11, 0, new vec(0, -1));

	button1.permanentPress = false;

	wire1.connectIn(button0);
	wire0.connectIn(wire1);
	wire0.connectOut(piston2);
	wire1.connectOut(piston1);

	wire2.connectIn(button1);
	wire2.connectOut(piston0);
	return level;
})();

(function initLevel9() {
	let level = World.create(-1, new vec(384, 365), new vec(44, 93));

	level.createLayer("#F08E47");
	
	// ~ layer 0
	level.createWall(new vec(354, 0), 199, 226, 0);
	level.createWall(new vec(0, 397), 800, 83, 0);
	level.createWall(new vec(503, 0), 297, 480, 0);
	level.createWall(new vec(0, 186), 175, 40, 0);
	level.createWall(new vec(125, 0), 280, 40, 0);
	level.createWall(new vec(125, 0), 50, 226, 0);
	
	level.createPortal(new vec(497, 295), 6, 100, 0, 1, new vec(-1, 0));
	level.createPortal(new vec(348, 42), 6, 126, 0, 1, new vec(-1, 0));
	level.createPortal(new vec(44, 180), 70, 6, 0, 1, new vec(0, -1));
	
	// ~ layer 1
	level.createWall(new vec(0, 402), 800, 78, 1);
	level.createWall(new vec(760, 0), 40, 480, 1);
	level.createWall(new vec(0, 44), 40, 345, 1);
	level.createWall(new vec(249, 0), 347, 40, 1);
	level.createWall(new vec(497, 0), 303, 106, 1);
	level.createWall(new vec(0, 0), 348, 180, 1);
	level.createWall(new vec(0, 253), 497, 227, 1);

	level.createSpike(new vec(748, 180), 153, 1, new vec(-1, 0));
	return level;
})();
(function initLevel13() {
	let level = World.create(-1, new vec(207, 408), new vec(416, 275));

	level.createLayer("#F08E47");
	level.createLayer("#7A51D3");
	
	// ~ layer 0
	level.createWall(new vec(760, 0), 130, 480, 0);
	level.createWall(new vec(-107, 268), 260, 301, 0);
	level.createWall(new vec(-102, 9), 192, 386, 0);
	level.createWall(new vec(-102, -119), 255, 262, 0);
	level.createWall(new vec(0, -108), 800, 148, 0);
	level.createWall(new vec(0, 440), 467, 129, 0);
	level.createWall(new vec(414, 367), 154, 145, 0);
	level.createWall(new vec(674, 307), 236, 282, 0);
	level.createWall(new vec(414, 398), 386, 163, 0);
	level.createWall(new vec(498, 268), 70, 212, 0);
	level.createWall(new vec(340, -135), 634, 362, 0);

	level.createPortal(new vec(334, 145), 6, 80, 0, 1, new vec(-1, 0), true);
	level.createPortal(new vec(350, 226), 100, 6, 0, 1, new vec(0, 1), true);
	level.createPortal(new vec(416, 361), 80, 6, 0, 2, new vec(0, -1), true);
	level.createPortal(new vec(754, 227), 6, 80, 0, 2, new vec(-1, 0), true);

	level.createSpike(new vec(568, 227), 52, 0, new vec(0, 1));
	
	// ~ layer 1
	level.createWall(new vec(-196, 60), 236, 526, 1);
	level.createWall(new vec(760, 0), 289, 480, 1);
	level.createWall(new vec(-160, -137), 400, 362, 1);
	level.createWall(new vec(-152, -68), 240, 397, 1);
	level.createWall(new vec(-32, -96), 317, 181, 1);
	level.createWall(new vec(507, -107), 293, 147, 1);
	level.createWall(new vec(281, 371), 241, 273, 1);
	level.createWall(new vec(-53, 450), 181, 154, 1);
	level.createWall(new vec(-176, 414), 264, 230, 1);
	level.createWall(new vec(621, 440), 304, 173, 1);
	level.createWall(new vec(340, 135), 200, 92, 1);
	level.createWall(new vec(621, 129), 292, 98, 1);
	level.createWall(new vec(716, -137), 296, 362, 1);
	level.createWall(new vec(500, 135), 40, 126, 1);

	level.createPortal(new vec(710, 40), 6, 89, 1, 2, new vec(-1, 0), true);
	level.createPortal(new vec(275, 382), 6, 89, 1, 2, new vec(-1, 0), true);

	level.createSpike(new vec(495, 0), 35, 1, new vec(-1, 0));

	// ~ layer 2
	level.createWall(new vec(-142, 367), 310, 189, 2);
	level.createWall(new vec(136, 346), 32, 134, 2);
	level.createWall(new vec(-125, 0), 185, 480, 2);
	level.createWall(new vec(-108, 427), 312, 129, 2);
	level.createWall(new vec(760, 207), 210, 117, 2);
	level.createWall(new vec(716, -176), 238, 324, 2);
	level.createWall(new vec(108, 103), 96, 168, 2);
	level.createWall(new vec(-142, -169), 346, 209, 2);
	level.createWall(new vec(281, 367), 268, 307, 2);
	level.createWall(new vec(108, 103), 308, 124, 2);
	level.createWall(new vec(320, -144), 480, 184, 2);

	level.createSpike(new vec(60, 40), 140, 2, new vec(0, 1));
	level.createSpike(new vec(204, -29), 64, 2, new vec(1, 0));
	level.createSpike(new vec(204, 227), 39, 2, new vec(1, 0));
	level.createSpike(new vec(96, 107), 159, 2, new vec(-1, 0));
	level.createSpike(new vec(308, -29), 64, 2, new vec(-1, 0));
	level.createSpike(new vec(113, 91), 298, 2, new vec(0, -1));
	return level;
})();

Render.on("beforeRender", () => {
	animate.run();
});

if (data.level > 1) {
	document.getElementById("enterContinue").classList.remove("active");
	document.getElementById("tutorial").classList.remove("active");
	player.alive = true;
}
World.set(data.level, data.layer);

function setLevel(level) {
	World.set(level);
	localStorage.setItem("level", level);
}