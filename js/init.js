"use strict";

const { World, Render, Performance, player } = engine;

// saving
var curLevel = Number(localStorage.getItem("level") ?? 1);
function save() {
	localStorage.setItem("level", curLevel);
}
function reset() {
	localStorage.clear();
	window.location.reload();
}

// init levels
(function initLevelTest() {
	let level = World.create(World.worlds.length, new vec(135, 364), new vec(631, 348));
	level.createLayer("#F48D43");
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
})();
(function initLevelTest2() {
	let level = World.create(World.worlds.length, new vec(125, 310), new vec(158, 342));
	// level.createLayer("#F48D43");

	// ~ layer 0
	level.createWall(new vec(0, 0), 800, 64, 0);
	level.createWall(new vec(566, 430), 234, 50, 0);
	level.createWall(new vec(750, 0), 50, 480, 0);
	level.createWall(new vec(0, 0), 50, 272, 0);
	level.createWall(new vec(194, 192), 280, 80, 0);
	level.createWall(new vec(0, 222), 116, 50, 0);

	level.createSpike(new vec(116, 64), 78, 0, new vec(0, 1));

	// complex group 2
	let wire1 = level.createWire([ new vec(42, 107), new vec(24, 107), new vec(24, 60), new vec(46, 37), new vec(205, 37), new vec(205, 51) ], 0);
	let wire0 = level.createWire([ new vec(98, 247), new vec(24, 247), new vec(24, 107) ], 0);
	let piston2 = level.createPiston(new vec(116, 237), 78, 20, 0, new vec(1, 0)).setDefault(false);
	let piston1 = level.createPiston(new vec(194, 64), 20, 128, 0, new vec(0, 1)).setDefault(false);
	let button0 = level.createButton(new vec(50, 66), 11, 82, 0, new vec(1, 0));
	// complex group 1
	let wire2 = level.createWire([ new vec(410, 48), new vec(410, 32), new vec(776, 32), new vec(776, 451), new vec(707, 451), new vec(707, 439) ], 0);
	let piston0 = level.createPiston(new vec(400, 64), 20, 85, 0, new vec(0, 1)).setDefault(false);
	let button1 = level.createButton(new vec(663, 419), 82, 11, 0, new vec(0, -1));

	wire1.connectIn(button0);
	wire0.connectIn(wire1);
	wire0.connectOut(piston2);
	wire1.connectOut(piston1);

	wire2.connectIn(button1);
	wire2.connectOut(piston0);
})();
(function initLevel1() {
	let level = World.create(World.worlds.length, new vec(139, 329), new vec(668, 361));
	
	level.createWall(new vec(0, 0), 800, 87, 0);
	level.createWall(new vec(0, 393), 800, 87, 0);
	level.createWall(new vec(0, 0), 100, 480, 0);
	level.createWall(new vec(700, 0), 100, 480, 0);
	level.createWall(new vec(211, 167), 378, 313, 0);
})();
(function initLevel2() {
	let level = World.create(World.worlds.length, new vec(80, 217), new vec(487, 348));

	level.createWall(new vec(0, 249), 487, 231, 0);
	level.createWall(new vec(0, 0), 50, 275, 0);
	level.createWall(new vec(0, 0), 487, 139, 0);
	level.createWall(new vec(462, 0), 207, 57, 0);
	level.createWall(new vec(644, 0), 156, 249, 0);
})();
(function initLevel3() {
	let level = World.create(World.worlds.length, new vec(164, 57), new vec(648, 300));

	level.createWall(new vec(0, 0), 800, 57, 0);
	level.createWall(new vec(0, 440), 800, 40, 0);
	level.createWall(new vec(0, 39), 120, 419, 0);
	level.createWall(new vec(680, 39), 120, 419, 0);
	level.createWall(new vec(87, 281), 136, 159, 0);
	level.createWall(new vec(483, 367), 216, 83, 0);
	level.createWall(new vec(483, 217), 237, 83, 0);
	level.createWall(new vec(87, 124), 295, 176, 0);
})();
(function initLevel4() {
	let level = World.create(World.worlds.length, new vec(663, 57), new vec(202, 266));
	
	level.createWall(new vec(0, 0), 800, 56, 0);
	level.createWall(new vec(478, 154), 322, 56, 0);
	level.createWall(new vec(0, 106), 305, 104, 0);
	level.createWall(new vec(740, 0), 60, 479, 0);
	level.createWall(new vec(0, 423), 800, 56, 0);
	level.createWall(new vec(234, 355), 533, 82, 0);
	level.createWall(new vec(234, 323), 71, 49, 0);
	level.createWall(new vec(0, 188), 60, 257, 0);
})();
(function initLevel5() {
	let level = World.create(World.worlds.length, new vec(146, 148), new vec(614, 389));

	level.createLayer("#F48D43");
	
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
})();
(function initLevel6() {
	let level = World.create(World.worlds.length, new vec(256, 358), new vec(698, 388));

	level.createLayer("#F48D43");
	
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
})();
(function initLevel7() {
	let level = World.create(World.worlds.length, new vec(170, 170), new vec(170, 278));

	level.createLayer("#F48D43");
	
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
})();
(function initLevel8() {
	let level = World.create(World.worlds.length, new vec(97, 70), new vec(671, 318));

	level.createLayer("#F48D43");
	
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
})();
(function initLevel9() {
	let level = World.create(World.worlds.length, new vec(384, 365), new vec(44, 93));

	level.createLayer("#F48D43");
	
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
})();
(function initLevel10() {
	let level = World.create(World.worlds.length, new vec(130, 360), new vec(698, 50));

	level.createLayer("#F48D43");
	level.createLayer("#7A51D3");
	// World.set(level.index);
	
	// ~ layer 0
	level.createWall(new vec(0, 430), 800, 50, 0);
	level.createWall(new vec(0, 0), 511, 322, 0);
	level.createWall(new vec(365, 207), 435, 273, 0);
	level.createWall(new vec(730, 0), 70, 480, 0);
	level.createWall(new vec(0, 0), 110, 480, 0);
	level.createWall(new vec(0, 0), 800, 50, 0);

	level.createPortal(new vec(359, 326), 6, 100, 0, 1, new vec(-1, 0));
	level.createPortal(new vec(515, 201), 100, 6, 0, 2, new vec(0, -1));
	
	// ~ layer 1
	level.createWall(new vec(0, 430), 800, 50, 1);
	level.createWall(new vec(0, 17), 268, 288, 1);
	level.createWall(new vec(543, 201), 239, 271, 1);
	level.createWall(new vec(0, 262), 359, 204, 1);
	level.createWall(new vec(730, 0), 70, 480, 1);
	level.createWall(new vec(0, 0), 800, 60, 1);

	level.createPortal(new vec(268, 99), 6, 100, 1, 2, new vec(1, 0));

	// ~ layer 2
	level.createWall(new vec(0, 331), 800, 149, 2);
	level.createWall(new vec(274, 48), 379, 153, 2);
	level.createWall(new vec(618, 0), 182, 480, 2);
	level.createWall(new vec(0, 0), 139, 427, 2);
	level.createWall(new vec(0, 0), 800, 96, 2);
})();
(function initLevel11() {
	let level = World.create(World.worlds.length, new vec(384, 244), new vec(694, 50));

	level.createLayer("#F48D43");
	level.createLayer("#7A51D3");
	
	// ~ layer 0
	level.createWall(new vec(614, 290), 186, 190, 0);
	level.createWall(new vec(416, 242), 50, 238, 0);
	level.createWall(new vec(416, 145), 198, 45, 0);
	level.createWall(new vec(0, 0), 249, 480, 0);
	level.createWall(new vec(671, 0), 129, 50, 0);

	level.createPortal(new vec(249, 190), 6, 100, 0, 1, new vec(1, 0));
	level.createPortal(new vec(466, 371), 6, 100, 0, 1, new vec(1, 0));
	level.createPortal(new vec(626, 284), 100, 6, 0, 2, new vec(0, -1));
	
	// ~ layer 1
	level.createWall(new vec(472, 362), 103, 118, 1);
	level.createWall(new vec(533, 19), 267, 461, 1);
	level.createWall(new vec(268, 134), 246, 90, 1);
	level.createWall(new vec(258, 436), 139, 44, 1);
	level.createWall(new vec(0, 228), 90, 252, 1);
	level.createWall(new vec(255, 134), 55, 165, 1);
	level.createWall(new vec(472, 134), 84, 283, 1);
	level.createWall(new vec(0, 5), 131, 239, 1);
	level.createWall(new vec(0, 362), 310, 118, 1);
	level.createWall(new vec(0, 0), 800, 50, 1);

	level.createPortal(new vec(527, 52), 6, 80, 1, 2, new vec(-1, 0));

	// ~ layer 2
	level.createWall(new vec(728, 0), 72, 480, 2);
	level.createWall(new vec(0, 0), 527, 167, 2);
	level.createWall(new vec(0, 113), 427, 367, 2);
	level.createWall(new vec(0, 0), 800, 50, 2);
	level.createWall(new vec(318, 378), 482, 102, 2);
	level.createWall(new vec(587, 225), 180, 59, 2);
})();
(function initLevel12() {
	let level = World.create(World.worlds.length, new vec(96, 282), new vec(170, 40));

	level.createLayer("#F48D43");
	level.createLayer("#7A51D3");
	
	// ~ layer 0
	level.createWall(new vec(0, 430), 505, 50, 0);
	level.createWall(new vec(0, 269), 96, 211, 0);
	level.createWall(new vec(130, 0), 278, 40, 0);
	level.createWall(new vec(232, 0), 129, 115, 0);
	level.createWall(new vec(486, 0), 314, 40, 0);
	level.createWall(new vec(467, 104), 38, 210, 0);
	level.createWall(new vec(659, 274), 40, 68, 0);
	level.createWall(new vec(699, 0), 101, 165, 0);
	level.createWall(new vec(760, 0), 40, 480, 0);
	level.createWall(new vec(467, 274), 232, 40, 0);
	
	level.createPortal(new vec(132, 424), 100, 6, 0, 1, new vec(0, -1), true);
	level.createPortal(new vec(365, 424), 100, 6, 0, 1, new vec(0, -1), true);
	level.createPortal(new vec(505, 165), 6, 100, 0, 1, new vec(1, 0));
	
	// ~ layer 1
	level.createWall(new vec(127, 430), 394, 50, 1);
	level.createWall(new vec(234, 267), 127, 213, 1);
	level.createWall(new vec(234, 0), 127, 162, 1);
	level.createWall(new vec(0, 162), 40, 190, 1);
	level.createWall(new vec(467, 0), 91, 163, 1);
	level.createWall(new vec(127, 0), 367, 40, 1);
	level.createWall(new vec(511, 0), 289, 480, 1);
	level.createWall(new vec(467, 267), 97, 213, 1);
	
	level.createPortal(new vec(40, 217), 6, 80, 1, 2, new vec(1, 0), true);
	level.createPortal(new vec(137, 40), 95, 6, 1, 2, new vec(0, 1), true);

	// ~ layer 2
	level.createWall(new vec(130, 199), 40, 116, 2);
	level.createWall(new vec(0, 423), 345, 40, 2);
	level.createWall(new vec(-15, 199), 55, 116, 2);
	level.createWall(new vec(0, 0), 385, 40, 2);
	level.createWall(new vec(305, 315), 40, 148, 2);
	level.createWall(new vec(345, 0), 40, 100, 2);

	level.createSpike(new vec(246, 40), 86, 2, new vec(0, 1));
})();
(function initLevel13() {
	let level = World.create(World.worlds.length, new vec(207, 408), new vec(416, 275));

	level.createLayer("#F48D43");
	level.createLayer("#7A51D3");
	
	// ~ layer 0
	level.createWall(new vec(760, 0), 40, 412, 0);
	level.createWall(new vec(0, 268), 153, 212, 0);
	level.createWall(new vec(0, 111), 90, 182, 0);
	level.createWall(new vec(0, 0), 153, 143, 0);
	level.createWall(new vec(0, 0), 800, 40, 0);
	level.createWall(new vec(0, 440), 467, 40, 0);
	level.createWall(new vec(414, 367), 100, 113, 0);
	level.createWall(new vec(674, 307), 126, 173, 0);
	level.createWall(new vec(477, 398), 216, 82, 0);
	level.createWall(new vec(498, 268), 70, 150, 0);
	level.createWall(new vec(340, 0), 423, 227, 0);

	level.createPortal(new vec(334, 145), 6, 80, 0, 1, new vec(-1, 0), true);
	level.createPortal(new vec(350, 226), 100, 6, 0, 1, new vec(0, 1), true);
	level.createPortal(new vec(416, 361), 80, 6, 0, 2, new vec(0, -1), true);
	level.createPortal(new vec(754, 227), 6, 80, 0, 2, new vec(-1, 0), true);

	level.createSpike(new vec(568, 227), 52, 0, new vec(0, 1));
	
	// ~ layer 1
	level.createWall(new vec(0, 197), 40, 283, 1);
	level.createWall(new vec(760, 0), 40, 480, 1);
	level.createWall(new vec(0, 0), 240, 225, 1);
	level.createWall(new vec(0, 20), 88, 309, 1);
	level.createWall(new vec(200, 0), 85, 85, 1);
	level.createWall(new vec(507, 0), 293, 40, 1);
	level.createWall(new vec(281, 371), 241, 109, 1);
	level.createWall(new vec(40, 450), 88, 30, 1);
	level.createWall(new vec(11, 414), 77, 66, 1);
	level.createWall(new vec(621, 440), 179, 40, 1);
	level.createWall(new vec(340, 135), 200, 92, 1);
	level.createWall(new vec(621, 129), 179, 98, 1);
	level.createWall(new vec(716, 7), 84, 150, 1);
	level.createWall(new vec(500, 197), 40, 64, 1);

	level.createPortal(new vec(710, 40), 6, 89, 1, 2, new vec(-1, 0), true);
	level.createPortal(new vec(275, 382), 6, 89, 1, 2, new vec(-1, 0), true);

	level.createSpike(new vec(495, 0), 35, 1, new vec(-1, 0));

	// ~ layer 2
	level.createWall(new vec(0, 367), 168, 71, 2);
	level.createWall(new vec(136, 346), 32, 70, 2);
	level.createWall(new vec(0, 0), 60, 416, 2);
	level.createWall(new vec(0, 427), 204, 53, 2);
	level.createWall(new vec(760, 207), 40, 117, 2);
	level.createWall(new vec(716, 11), 84, 137, 2);
	level.createWall(new vec(108, 103), 96, 168, 2);
	level.createWall(new vec(12, 0), 192, 40, 2);
	level.createWall(new vec(281, 367), 268, 113, 2);
	level.createWall(new vec(143, 103), 273, 124, 2);
	level.createWall(new vec(320, 0), 480, 40, 2);

	level.createSpike(new vec(60, 40), 140, 2, new vec(0, 1));
	level.createSpike(new vec(204, -29), 64, 2, new vec(1, 0));
	level.createSpike(new vec(204, 227), 39, 2, new vec(1, 0));
	level.createSpike(new vec(96, 107), 159, 2, new vec(-1, 0));
	level.createSpike(new vec(308, -29), 64, 2, new vec(-1, 0));
	level.createSpike(new vec(113, 91), 298, 2, new vec(0, -1));
})();
(function initLevel14() {
	let level = World.create(World.worlds.length, new vec(154, 181), new vec(93, 307));

	level.createLayer("#F48D43");
	level.createLayer("#7A51D3");
	
	// ~ layer 0
	level.createWall(new vec(760, 86), 40, 342, 0);
	level.createWall(new vec(125, 307), 118, 64, 0);
	level.createWall(new vec(0, 0), 90, 261, 0);
	level.createWall(new vec(210, 24), 153, 151, 0);
	level.createWall(new vec(0, 440), 800, 40, 0);
	level.createWall(new vec(380, 400), 420, 56, 0);
	level.createWall(new vec(66, 0), 734, 40, 0);
	level.createWall(new vec(417, 181), 209, 40, 0);
	level.createWall(new vec(417, 80), 63, 63, 0);
	level.createWall(new vec(527, 111), 98, 32, 0);
	level.createWall(new vec(210, 221), 153, 40, 0);
	level.createWall(new vec(313, 313), 92, 148, 0);
	level.createWall(new vec(0, 240), 25, 221, 0);
	level.createWall(new vec(585, 17), 40, 61, 0);

	level.createPortal(new vec(233, 434), 80, 6, 0, 2, new vec(0, -1), true);
	level.createPortal(new vec(754, 143), 6, 117, 0, 2, new vec(-1, 0), true);
	level.createPortal(new vec(204, 42), 6, 80, 0, 1, new vec(-1, 0), true);
	level.createPortal(new vec(27, 434), 80, 6, 0, 1, new vec(0, -1), true);

	level.createSpike(new vec(131, 295), 106, 0, new vec(0, -1));
	level.createSpike(new vec(321, 301), 76, 0, new vec(0, -1));
	level.createSpike(new vec(301, 320), 78, 0, new vec(-1, 0));
	level.createSpike(new vec(243, 313), 52, 0, new vec(1, 0));
	level.createSpike(new vec(90, 136), 120, 0, new vec(1, 0));
	level.createSpike(new vec(125, 428), 89, 0, new vec(0, -1));
	level.createSpike(new vec(88, 40), 105, 0, new vec(0, 1));
	level.createSpike(new vec(90, 37), 40, 0, new vec(1, 0));
	
	// ~ layer 1
	level.createWall(new vec(760, 0), 40, 440, 1);
	level.createWall(new vec(210, 25), 127, 127, 1);
	level.createWall(new vec(0, 440), 215, 40, 1);
	level.createWall(new vec(293, 400), 507, 80, 1);
	level.createWall(new vec(210, 0), 590, 50, 1);
	level.createWall(new vec(0, 0), 40, 152, 1);
	level.createWall(new vec(0, 122), 121, 148, 1);
	level.createWall(new vec(0, 240), 236, 119, 1);
	level.createWall(new vec(109, 420), 209, 60, 1);
	level.createWall(new vec(0, 420), 25, 41, 1);
	level.createWall(new vec(594, 0), 206, 152, 1);
	level.createWall(new vec(576, 240), 125, 115, 1);
	level.createWall(new vec(293, 240), 217, 183, 1);
	level.createWall(new vec(400, 114), 110, 38, 1);
	level.createWall(new vec(121, 0), 157, 40, 1);

	level.createSpike(new vec(564, 246), 103, 1, new vec(-1, 0));
	level.createSpike(new vec(582, 228), 113, 1, new vec(0, -1));
	level.createSpike(new vec(406, 102), 98, 1, new vec(0, -1));
	level.createSpike(new vec(406, 152), 98, 1, new vec(0, 1));
	level.createSpike(new vec(510, 118), 30, 1, new vec(1, 0));
	level.createSpike(new vec(388, 118), 30, 1, new vec(-1, 0));
	level.createSpike(new vec(701, 246), 103, 1, new vec(1, 0));
	level.createSpike(new vec(582, 355), 113, 1, new vec(0, 1));
	level.createSpike(new vec(121, 152), 53, 1, new vec(1, 0));

	// ~ layer 2
	level.createWall(new vec(760, 134), 40, 134, 2);
	level.createWall(new vec(170, 440), 630, 40, 2);
	level.createWall(new vec(390, 353), 410, 116, 2);
	level.createWall(new vec(42, 0), 758, 50, 2);
	level.createWall(new vec(402, 181), 265, 40, 2);
	level.createWall(new vec(390, 114), 50, 176, 2);
	level.createWall(new vec(170, 185), 100, 202, 2);
	level.createWall(new vec(0, 0), 100, 125, 2);
	level.createWall(new vec(0, 260), 227, 127, 2);

	level.createSpike(new vec(440, 221), 219, 2, new vec(0, 1));
	level.createSpike(new vec(667, 187), 28, 2, new vec(1, 0));
})();
(function initLevel15() {
	let level = World.create(World.worlds.length, new vec(384, 224), new vec(519, 80));

	level.createLayer("#F48D43");
	level.createLayer("#7A51D3");
	
	// ~ layer 0
	level.createWall(new vec(290, 152), 180, 72, 0);
	level.createWall(new vec(18, 455), 312, 25, 0);
	level.createWall(new vec(0, 327), 50, 40, 0);
	level.createWall(new vec(0, 434), 50, 46, 0);
	level.createWall(new vec(470, 414), 121, 66, 0);
	level.createWall(new vec(511, 25), 65, 55, 0);
	level.createWall(new vec(164, 16), 126, 64, 0);
	level.createWall(new vec(551, 25), 249, 135, 0);
	level.createWall(new vec(722, 148), 78, 191, 0);
	level.createWall(new vec(0, 0), 800, 40, 0);
	level.createWall(new vec(682, 327), 118, 153, 0);
	level.createWall(new vec(0, 30), 89, 194, 0);
	level.createWall(new vec(0, 205), 25, 162, 0);
	level.createWall(new vec(290, 434), 196, 46, 0);

	level.createPortal(new vec(481, 408), 100, 6, 0, 2, new vec(0, -1), true);
	level.createPortal(new vec(89, 449), 75, 6, 0, 2, new vec(0, -1), true);
	level.createPortal(new vec(89, 120), 6, 100, 0, 1, new vec(1, 0), true);

	level.createSpike(new vec(670, 331), 149, 0, new vec(-1, 0));
	level.createSpike(new vec(710, 160), 123, 0, new vec(-1, 0));
	level.createSpike(new vec(293, 140), 174, 0, new vec(0, -1));
	level.createSpike(new vec(167, 80), 120, 0, new vec(0, 1));
	
	// ~ layer 1
	level.createWall(new vec(450, 151), 137, 173, 1);
	level.createWall(new vec(467, 24), 50, 79, 1);
	level.createWall(new vec(245, 0), 523, 50, 1);
	level.createWall(new vec(0, 400), 800, 80, 1);
	level.createWall(new vec(0, 226), 297, 197, 1);
	level.createWall(new vec(705, 0), 95, 437, 1);
	level.createWall(new vec(0, 114), 89, 151, 1);

	level.createPortal(new vec(444, 153), 6, 71, 1, 2, new vec(-1, 0));
	level.createPortal(new vec(297, 50), 100, 6, 1, 2, new vec(0, 1), true);

	level.createSpike(new vec(587, 157), 164, 1, new vec(1, 0));
	level.createSpike(new vec(438, 224), 94, 1, new vec(-1, 0));
	level.createSpike(new vec(233, 3), 44, 1, new vec(-1, 0));
	level.createSpike(new vec(453, 324), 131, 1, new vec(0, 1));
	level.createSpike(new vec(470, 103), 44, 1, new vec(0, 1));

	// ~ layer 2
	level.createWall(new vec(397, 230), 129, 109, 2);
	level.createWall(new vec(397, 143), 47, 96, 2);
	level.createWall(new vec(397, 110), 129, 45, 2);
	level.createWall(new vec(494, 110), 32, 80, 2);
	level.createWall(new vec(192, 251), 89, 50, 2);
	level.createWall(new vec(312, 142), 100, 55, 2);
	level.createWall(new vec(0, 175), 89, 76, 2);
	level.createWall(new vec(0, 92), 132, 105, 2);
	level.createWall(new vec(0, 25), 165, 85, 2);
	level.createWall(new vec(166, 251), 50, 229, 2);
	level.createWall(new vec(166, 414), 634, 66, 2);
	level.createWall(new vec(0, 455), 202, 25, 2);
	level.createWall(new vec(0, 411), 44, 69, 2);
	level.createWall(new vec(0, 201), 44, 111, 2);
	level.createWall(new vec(581, 36), 148, 119, 2);
	level.createWall(new vec(509, 230), 119, 59, 2);
	level.createWall(new vec(722, 25), 78, 455, 2);
	level.createWall(new vec(0, 0), 800, 50, 2);

	level.createSpike(new vec(526, 113), 42, 2, new vec(1, 0));
	level.createSpike(new vec(628, 233), 53, 2, new vec(1, 0));
	level.createSpike(new vec(526, 289), 47, 2, new vec(1, 0));
	level.createSpike(new vec(165, 50), 56, 2, new vec(1, 0));
	level.createSpike(new vec(400, 98), 123, 2, new vec(0, -1));
	level.createSpike(new vec(315, 130), 82, 2, new vec(0, -1));
	level.createSpike(new vec(300, 150), 44, 2, new vec(-1, 0));
	level.createSpike(new vec(132, 110), 84, 2, new vec(1, 0));
	level.createSpike(new vec(44, 251), 57, 2, new vec(1, 0));
	level.createSpike(new vec(44, 414), 41, 2, new vec(1, 0));
	level.createSpike(new vec(281, 254), 44, 2, new vec(1, 0));
	level.createSpike(new vec(385, 197), 104, 2, new vec(-1, 0));
})();
(function initLevel16() {
	let level = World.create(World.worlds.length, new vec(384, 111), new vec(460, 167));

	level.createLayer("#F48D43");
	level.createLayer("#7A51D3");
	// World.set(level.index);
	
	// ~ layer 0
	level.createWall(new vec(760, 239), 40, 100, 0);
	level.createWall(new vec(0, 307), 153, 173, 0);
	level.createWall(new vec(0, 107), 90, 222, 0);
	level.createWall(new vec(0, 0), 153, 143, 0);
	level.createWall(new vec(127, 440), 315, 40, 0);
	level.createWall(new vec(397, 390), 403, 90, 0);
	level.createWall(new vec(340, 143), 120, 84, 0);

	level.createPortal(new vec(334, 145), 6, 80, 0, 1, new vec(-1, 0), true);
	level.createPortal(new vec(350, 226), 100, 6, 0, 1, new vec(0, 1), true);
	level.createPortal(new vec(754, 249), 6, 80, 0, 2, new vec(-1, 0), true);
	level.createPortal(new vec(416, 384), 80, 6, 0, 2, new vec(0, -1), true);

	level.createSpike(new vec(90, 143), 130, 0, new vec(1, 0));
	level.createSpike(new vec(153, 310), 130, 0, new vec(1, 0));
	level.createSpike(new vec(153, 3), 108, 0, new vec(1, 0));
	
	// ~ layer 1
	level.createWall(new vec(340, 124), 200, 103, 1);
	level.createWall(new vec(0, 391), 540, 89, 1);
	level.createWall(new vec(692, 275), 108, 147, 1);
	level.createWall(new vec(760, 51), 40, 103, 1);
	level.createWall(new vec(660, 391), 140, 89, 1);
	level.createWall(new vec(163, 175), 56, 78, 1);
	level.createWall(new vec(0, 199), 40, 188, 1);
	level.createWall(new vec(710, -16), 90, 84, 1);
	level.createWall(new vec(340, -16), 200, 67, 1);
	level.createWall(new vec(163, 0), 56, 51, 1);
	level.createWall(new vec(0, 0), 179, 253, 1);
	level.createWall(new vec(0, 359), 126, 121, 1);
	level.createWall(new vec(660, 135), 140, 186, 1);

	level.createPortal(new vec(678, 129), 80, 6, 1, 2, new vec(0, -1));
	level.createPortal(new vec(39, 256), 6, 100, 1, 2, new vec(1, 0), true);

	level.createSpike(new vec(540, 127), 97, 1, new vec(1, 0));
	level.createSpike(new vec(540, 394), 86, 1, new vec(1, 0));
	level.createSpike(new vec(540, -20), 64, 1, new vec(1, 0));
	level.createSpike(new vec(648, 394), 90, 1, new vec(-1, 0));
	level.createSpike(new vec(698, -20), 64, 1, new vec(-1, 0));
	level.createSpike(new vec(648, 139), 112, 1, new vec(-1, 0));
	level.createSpike(new vec(343, 112), 194, 1, new vec(0, -1));
	level.createSpike(new vec(344, 51), 192, 1, new vec(0, 1));
	level.createSpike(new vec(722, 68), 38, 1, new vec(0, 1));

	// ~ layer 2
	level.createWall(new vec(358, 390), 157, 90, 2);
	level.createWall(new vec(670, 390), 130, 90, 2);
	level.createWall(new vec(760, 121), 50, 291, 2);
	level.createWall(new vec(0, 0), 207, 164, 2);
	level.createWall(new vec(174, 0), 97, 129, 2);
	level.createWall(new vec(358, 307), 53, 115, 2);
	level.createWall(new vec(326, 164), 85, 53, 2);
	level.createWall(new vec(166, 450), 233, 30, 2);
	level.createWall(new vec(0, 359), 207, 121, 2);
	level.createWall(new vec(515, 307), 155, 30, 2);
	level.createWall(new vec(231, 0), 180, 50, 2);
	level.createWall(new vec(496, 0), 178, 50, 2);
	level.createWall(new vec(296, 0), 504, 40, 2);
	level.createWall(new vec(0, 135), 40, 263, 2);
	level.createWall(new vec(603, 0), 197, 129, 2);

	level.createSpike(new vec(329, 152), 79, 2, new vec(0, -1));
	level.createSpike(new vec(718, 378), 42, 2, new vec(0, -1));
	level.createSpike(new vec(207, 438), 96, 2, new vec(0, -1));
	level.createSpike(new vec(748, 184), 65, 2, new vec(-1, 0));
	level.createSpike(new vec(658, 394), 86, 2, new vec(-1, 0));
	level.createSpike(new vec(515, 394), 86, 2, new vec(1, 0));
	level.createSpike(new vec(411, 167), 47, 2, new vec(1, 0));
})();
(function initLevel0() {
	let level = World.create(World.worlds.length, new vec(384, 224), new vec(668, 361));
	
	level.createLayer("#F48D43");
	
	// ~ layer 0
	level.createWall(new vec(0, 0), 43, 480, 0);
	level.createWall(new vec(761, 0), 39, 480, 0);

	level.createPortal(new vec(42, 200), 6, 80, 0, 1, new vec(1, 0), true);
	level.createPortal(new vec(755, 200), 6, 80, 0, 1, new vec(-1, 0), true);

	// ~ layer 1
	level.createWall(new vec(0, 0), 43, 480, 1);
	level.createWall(new vec(761, 0), 39, 480, 1);
})();

Render.on("beforeRender", () => {
	animate.run();
});

if (curLevel > 1) {
	document.getElementById("enterContinue").classList.remove("active");
	document.getElementById("tutorial").classList.remove("active");
	player.alive = true;
}
World.set(curLevel);

function setLevel(level) {
	World.set(level);
	localStorage.setItem("level", level);
}