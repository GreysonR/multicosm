"use strict";

const { World, Render, Performance, player } = engine;

// saving
var newlyBeatLevels = [];
var data = (JSON.parse(localStorage.getItem("multicosmData")) ?? {});

function mergeObj(obj1, obj2) { // Merges obj2 over obj1
	Object.keys(obj2).forEach(key => {
		if (typeof obj2[key] === "object" && !Array.isArray(obj2[key])) {
			if (!obj1[key]) obj1[key] = {};
			mergeObj(obj1[key], obj2[key]);
		}
		else {
			obj1[key] = obj2[key];
		}
	});

	return obj1;
}
(function loadData() {
	let defaultData = {
		world: 0,
		level: 0,
		coins: 0,
		worlds: {
			"0": {
				name: "Introduction",
				unlocked: true,
				completed: false,
				completedLevels: [],
				coins: [],
			},
			"1": {
				name: "A New Dimension",
				prev: "0",
				cost: 5,
				unlocked: false,
				completed: false,
				completedLevels: [],
				coins: [],
			},
			"2": {
				name: "There's More",
				prev: "1",
				cost: 10,
				unlocked: false,
				completed: false,
				completedLevels: [],
				coins: [],
			},
		}
	}

	data = mergeObj(defaultData, data);
})();

var allWorlds = {
	worldIndex: 0,
	levelIndex: 0,
	get curWorld() {
		return this[this.worldIndex];
	},
	get curLevel() {
		return this[this.worldIndex].levels[this.levelIndex];
	},
	get relLevelIndex() {
		return allWorlds.levelIndex - allWorlds.curWorld.levels[0].index;
	},
	"0": {
		levels: [
			/*(function initLevelTest2() {
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
			})(),/**/
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
				level.createWall(new vec(654, -89), 248, 656, 0);
				level.createWall(new vec(-124, -120), 270, 728, 0);
				level.createWall(new vec(-72, -137), 952, 197, 0);
				level.createWall(new vec(-34, 421), 845, 146, 0);
				level.createWall(new vec(-34, 180), 914, 120, 0);
				level.createWall(new vec(-101, 193), 413, 337, 0);
				level.createWall(new vec(488, -89), 288, 389, 0);
				level.createInternalCorner(new vec(146, 60), 0, 0);
				level.createInternalCorner(new vec(146, 180), 3, 0);
				level.createInternalCorner(new vec(488, 60), 1, 0);
				level.createInternalCorner(new vec(488, 180), 2, 0);
				level.createInternalCorner(new vec(312, 300), 0, 0);
				level.createInternalCorner(new vec(312, 421), 3, 0);
				level.createInternalCorner(new vec(654, 300), 1, 0);
				level.createInternalCorner(new vec(654, 421), 2, 0);

				level.createPortal(new vec(482, 69), 6, 102, 0, 1, new vec(-1, 0));
				level.createPortal(new vec(576, 300), 70, 6, 0, 1, new vec(0, 1));
				
				// ~ layer 1
				level.createWall(new vec(-215, -85), 697, 680, 1);
				level.createWall(new vec(654, -109), 242, 704, 1);
				level.createWall(new vec(337, 306), 451, 303, 1);
				level.createWall(new vec(246, -134), 650, 194, 1);
				level.createCoin(new vec(621, 243), 1);
				level.createInternalCorner(new vec(482, 60), 0, 1);
				level.createInternalCorner(new vec(482, 306), 3, 1);
				level.createInternalCorner(new vec(654, 60), 1, 1);
				level.createInternalCorner(new vec(654, 306), 2, 1);
				
				return level;
			})(),
			(function initLevel6() {
				let level = World.create(-1, new vec(222, 358), new vec(698, 388));
			
				level.createLayer("#F08E47");
				
				// ~ layer 0
				level.createWall(new vec(730, -66), 215, 612, 0);
				level.createWall(new vec(-109, -88), 179, 656, 0);
				level.createWall(new vec(-117, -171), 1034, 231, 0);
				level.createWall(new vec(141, 269), 434, 60, 0);
				level.createWall(new vec(297, 0), 139, 480, 0);
				level.createWall(new vec(271, 269), 304, 211, 0);
				level.createWall(new vec(222, -79), 214, 243, 0);
				level.createWall(new vec(-89, 420), 978, 201, 0);
				level.createCoin(new vec(448, 240), 0);
				level.createInternalCorner(new vec(436, 60), 0, 0);
				level.createInternalCorner(new vec(70, 60), 0, 0);
				level.createInternalCorner(new vec(730, 420), 2, 0);
				level.createInternalCorner(new vec(271, 420), 2, 0);
				level.createInternalCorner(new vec(297, 269), 2, 0);
				level.createInternalCorner(new vec(70, 420), 3, 0);
				level.createInternalCorner(new vec(436, 269), 3, 0);
				level.createInternalCorner(new vec(575, 420), 3, 0);
				level.createInternalCorner(new vec(730, 60), 1, 0);
				level.createInternalCorner(new vec(297, 164), 1, 0);
				level.createInternalCorner(new vec(222, 60), 1, 0);
				level.createInternalCorner(new vec(271, 329), 1, 0);
				
				level.createPortal(new vec(291, 168), 6, 96, 0, 1, new vec(-1, 0));
				level.createPortal(new vec(485, 263), 70, 6, 0, 1, new vec(0, -1));
				
				// ~ layer 1
				level.createWall(new vec(730, -141), 191, 715, 1);
				level.createWall(new vec(-55, -126), 907, 280, 1);
				level.createWall(new vec(416, -101), 368, 364, 1);
				level.createWall(new vec(-116, -141), 407, 715, 1);
				level.createWall(new vec(416, 0), 60, 358, 1);
				level.createWall(new vec(565, -81), 304, 376, 1);
				level.createWall(new vec(-91, 420), 982, 178, 1);
				level.createCoin(new vec(306, 388), 1);
				level.createInternalCorner(new vec(291, 420), 3, 1);
				level.createInternalCorner(new vec(416, 154), 1, 1);
				level.createInternalCorner(new vec(730, 295), 1, 1);
				level.createInternalCorner(new vec(565, 263), 1, 1);
				level.createInternalCorner(new vec(730, 420), 2, 1);
				level.createInternalCorner(new vec(291, 154), 0, 1);
				level.createInternalCorner(new vec(476, 263), 0, 1);

				return level;
			})(),
			(function initLevel7() {
				let level = World.create(-1, new vec(170, 170), new vec(170, 278));
			
				level.createLayer("#F08E47");
				
				// ~ layer 0
				level.createWall(new vec(-89, -123), 240, 707, 0);
				level.createWall(new vec(-89, -123), 503, 200, 0);
				level.createWall(new vec(-137, 403), 551, 137, 0);
				level.createWall(new vec(0, 202), 300, 76, 0);
				level.createWall(new vec(512, 123), 60, 235, 0);
				level.createInternalCorner(new vec(151, 77), 0, 0);
				level.createInternalCorner(new vec(151, 278), 0, 0);
				level.createInternalCorner(new vec(151, 202), 3, 0);
				level.createInternalCorner(new vec(151, 403), 3, 0);
				level.createCoin(new vec(177, 85), 0);
				
				level.createPortal(new vec(506, 170), 6, 140, 0, 1, new vec(-1, 0));
				
				// ~ layer 1
				level.createWall(new vec(0, -99), 919, 249, 1);
				level.createWall(new vec(0, 330), 892, 234, 1);
				level.createWall(new vec(741, -89), 192, 658, 1);
				level.createWall(new vec(-126, -70), 632, 620, 1);
				level.createInternalCorner(new vec(506, 150), 0, 1);
				level.createInternalCorner(new vec(741, 150), 1, 1);
				level.createInternalCorner(new vec(741, 330), 2, 1);
				level.createInternalCorner(new vec(506, 330), 3, 1);

				return level;
			})(),
			(function initLevel8() {
				let level = World.create(-1, new vec(97, 70), new vec(671, 318));
			
				level.createLayer("#F08E47");
				
				// ~ layer 0
				level.createWall(new vec(-73, 410), 946, 153, 0);
				level.createWall(new vec(460, 350), 477, 188, 0);
				level.createWall(new vec(-105, -100), 1010, 170, 0);
				level.createWall(new vec(306, 175), 100, 115, 0);
				level.createWall(new vec(-45, 134), 242, 91, 0);
				level.createWall(new vec(406, -79), 489, 304, 0);
				level.createWall(new vec(306, 175), 342, 50, 0);
				level.createWall(new vec(703, -100), 234, 663, 0);
				level.createWall(new vec(-95, -83), 192, 646, 0);
				level.createInternalCorner(new vec(97, 70), 0, 0);
				level.createInternalCorner(new vec(97, 225), 0, 0);
				level.createInternalCorner(new vec(406, 225), 0, 0);
				level.createInternalCorner(new vec(460, 410), 2, 0);
				level.createInternalCorner(new vec(406, 175), 2, 0);
				level.createInternalCorner(new vec(703, 350), 2, 0);
				level.createInternalCorner(new vec(703, 225), 1, 0);
				level.createInternalCorner(new vec(406, 70), 1, 0);
				level.createInternalCorner(new vec(97, 410), 3, 0);
				level.createInternalCorner(new vec(97, 134), 3, 0);
				
				level.createPortal(new vec(412, 225), 116, 6, 0, 1, new vec(0, 1));
				
				// ~ layer 1
				level.createWall(new vec(-88, 410), 976, 169, 1);
				level.createWall(new vec(633, 231), 195, 363, 1);
				level.createWall(new vec(404, 231), 132, 67, 1);
				level.createWall(new vec(197, -104), 677, 144, 1);
				level.createWall(new vec(208, -65), 272, 205, 1);
				level.createWall(new vec(703, -104), 247, 658, 1);
				level.createWall(new vec(-142, -138), 471, 754, 1);
				level.createWall(new vec(633, -112), 179, 252, 1);
				level.createInternalCorner(new vec(480, 40), 0, 1);
				level.createInternalCorner(new vec(329, 140), 0, 1);
				level.createInternalCorner(new vec(703, 140), 1, 1);
				level.createInternalCorner(new vec(633, 40), 1, 1);
				level.createInternalCorner(new vec(703, 231), 2, 1);
				level.createInternalCorner(new vec(633, 410), 2, 1);
				level.createInternalCorner(new vec(329, 410), 3, 1);
				level.createCoin(new vec(674, 148), 1);
			
				level.createSpike(new vec(329, 186), 150, 1, new vec(1, 0));

				return level;
			})(),
			(function initLevel9() {
				let level = World.create(-1, new vec(384, 365), new vec(82, 59));
			
				level.createLayer("#F08E47");
				
				// ~ layer 0
				level.createWall(new vec(354, -87), 363, 313, 0);
				level.createWall(new vec(-104, 397), 904, 196, 0);
				level.createWall(new vec(503, -120), 414, 713, 0);
				level.createWall(new vec(-104, 186), 316, 40, 0);
				level.createWall(new vec(0, -98), 405, 138, 0);
				level.createWall(new vec(172, -75), 40, 301, 0);
				level.createWall(new vec(-93, -75), 164, 301, 0);
				level.createInternalCorner(new vec(212, 40), 0, 0);
				level.createInternalCorner(new vec(172, 186), 2, 0);
				level.createInternalCorner(new vec(172, 40), 1, 0);
				level.createInternalCorner(new vec(71, 40), 0, 0);
				level.createInternalCorner(new vec(71, 186), 3, 0);
				level.createInternalCorner(new vec(354, 40), 1, 0);
				level.createInternalCorner(new vec(503, 226), 1, 0);
				level.createInternalCorner(new vec(503, 397), 2, 0);
				level.createCoin(new vec(218, 232), 0);
				
				level.createPortal(new vec(497, 295), 6, 100, 0, 1, new vec(-1, 0));
				level.createPortal(new vec(348, 42), 6, 126, 0, 1, new vec(-1, 0));
				level.createPortal(new vec(82, 180), 70, 6, 0, 1, new vec(0, -1));
				
				// ~ layer 1
				level.createWall(new vec(-117, 402), 968, 148, 1);
				level.createWall(new vec(760, -97), 149, 674, 1);
				level.createWall(new vec(-104, 0), 184, 433, 1);
				level.createWall(new vec(249, -97), 347, 137, 1);
				level.createWall(new vec(497, -132), 394, 238, 1);
				level.createWall(new vec(-91, -97), 439, 277, 1);
				level.createWall(new vec(-79, 253), 576, 297, 1);
				level.createInternalCorner(new vec(348, 40), 0, 1);
				level.createInternalCorner(new vec(497, 40), 1, 1);
				level.createInternalCorner(new vec(760, 106), 1, 1);
				level.createInternalCorner(new vec(760, 402), 2, 1);
				level.createInternalCorner(new vec(80, 253), 3, 1);
				level.createInternalCorner(new vec(497, 402), 3, 1);
				level.createInternalCorner(new vec(80, 180), 0, 1);
				level.createCoin(new vec(470, 221), 1);

				level.createSpike(new vec(748, 180), 153, 1, new vec(-1, 0));

				return level;
			})(),
		],
	},
	"2": {
		levels: [
			(function initLevel10() {
				let level = World.create(-1, new vec(130, 360), new vec(698, 50));
			
				level.createLayer("#F08E47");
				level.createLayer("#7A51D3");
				
				// ~ layer 0
				level.createWall(new vec(-92, 430), 984, 156, 0);
				level.createWall(new vec(-92, -91), 603, 413, 0);
				level.createWall(new vec(365, 207), 524, 354, 0);
				level.createWall(new vec(730, -92), 211, 664, 0);
				level.createWall(new vec(-107, -66), 217, 612, 0);
				level.createWall(new vec(-106, -109), 1012, 159, 0);
				level.createInternalCorner(new vec(110, 322), 0, 0);
				level.createInternalCorner(new vec(365, 322), 1, 0);
				level.createInternalCorner(new vec(365, 430), 2, 0);
				level.createInternalCorner(new vec(110, 430), 3, 0);
				level.createInternalCorner(new vec(511, 50), 0, 0);
				level.createInternalCorner(new vec(730, 50), 1, 0);
				level.createInternalCorner(new vec(730, 207), 2, 0);
				level.createInternalCorner(new vec(511, 207), 3, 0);

				level.createPortal(new vec(359, 326), 6, 100, 0, 1, new vec(-1, 0));
				level.createPortal(new vec(515, 201), 100, 6, 0, 2, new vec(0, -1));

				// ~ layer 1
				level.createWall(new vec(-88, -108), 356, 538, 1);
				level.createWall(new vec(543, 201), 351, 368, 1);
				level.createWall(new vec(-112, 262), 471, 326, 1);
				level.createWall(new vec(730, -60), 214, 600, 1);
				level.createWall(new vec(-71, -129), 942, 189, 1);
				level.createWall(new vec(-94, 430), 988, 127, 1);
				level.createInternalCorner(new vec(268, 60), 0, 1);
				level.createInternalCorner(new vec(730, 60), 1, 1);
				level.createInternalCorner(new vec(730, 201), 2, 1);
				level.createInternalCorner(new vec(268, 262), 3, 1);
				level.createInternalCorner(new vec(359, 430), 3, 1);
				level.createInternalCorner(new vec(543, 430), 2, 1);
				level.createCoin(new vec(377, 231), 1);

				level.createPortal(new vec(268, 99), 6, 100, 1, 2, new vec(1, 0));

				// ~ layer 2
				level.createWall(new vec(-98, 331), 996, 267, 2);
				level.createWall(new vec(274, -42), 497, 243, 2);
				level.createWall(new vec(618, -104), 297, 688, 2);
				level.createWall(new vec(-98, -84), 237, 595, 2);
				level.createWall(new vec(-89, -104), 978, 200, 2);
				level.createInternalCorner(new vec(139, 96), 0, 2);
				level.createInternalCorner(new vec(139, 331), 3, 2);
				level.createInternalCorner(new vec(618, 331), 2, 2);
				level.createInternalCorner(new vec(274, 96), 1, 2);
				level.createInternalCorner(new vec(618, 201), 1, 2);
				level.createCoin(new vec(584, 300), 2);

				return level;
			})(),
			(function initLevel11() {
				let level = World.create(-1, new vec(384, 244), new vec(694, 50));
			
				level.createLayer("#F08E47");
				level.createLayer("#7A51D3");
				
				// ~ layer 0
				level.createWall(new vec(614, 290), 304, 296, 0);
				level.createWall(new vec(416, 242), 50, 354, 0);
				level.createWall(new vec(416, -132), 198, 322, 0);
				level.createWall(new vec(-25, 293), 304, 263, 0);
				level.createWall(new vec(91, -132), 471, 218, 0);
				level.createWall(new vec(-99, -106), 348, 692, 0);
				level.createWall(new vec(449, -154), 418, 204, 0);
				level.createCoin(new vec(432, 198), 0);
				level.createCoin(new vec(278, 94), 0);
				level.createInternalCorner(new vec(249, 86), 0, 0);
				level.createInternalCorner(new vec(416, 86), 1, 0);
				level.createInternalCorner(new vec(614, 50), 0, 0);
				level.createInternalCorner(new vec(249, 293), 3, 0);

				level.createPortal(new vec(249, 190), 6, 100, 0, 1, new vec(1, 0));
				level.createPortal(new vec(466, 371), 6, 100, 0, 1, new vec(1, 0));
				level.createPortal(new vec(626, 284), 100, 6, 0, 2, new vec(0, -1));

				// ~ layer 1
				level.createWall(new vec(533, -57), 357, 626, 1);
				level.createWall(new vec(255, 134), 392, 90, 1);
				level.createWall(new vec(83, 436), 314, 146, 1);
				level.createWall(new vec(-79, 69), 169, 480, 1);
				level.createWall(new vec(255, 134), 55, 165, 1);
				level.createWall(new vec(472, 134), 438, 415, 1);
				level.createWall(new vec(-56, -91), 187, 335, 1);
				level.createWall(new vec(-92, 362), 402, 207, 1);
				level.createWall(new vec(-72, -97), 872, 147, 1);
				level.createInternalCorner(new vec(131, 50), 0, 1);
				level.createInternalCorner(new vec(533, 50), 1, 1);
				level.createInternalCorner(new vec(533, 134), 2, 1);
				level.createInternalCorner(new vec(90, 244), 0, 1);
				level.createInternalCorner(new vec(90, 362), 3, 1);
				level.createInternalCorner(new vec(310, 436), 3, 1);
				level.createInternalCorner(new vec(310, 224), 0, 1);
				level.createInternalCorner(new vec(472, 224), 1, 1);

				level.createPortal(new vec(527, 52), 6, 80, 1, 2, new vec(-1, 0));

				// ~ layer 2
				level.createWall(new vec(728, -84), 246, 648, 2);
				level.createWall(new vec(-140, -84), 667, 251, 2);
				level.createWall(new vec(-150, 29), 577, 535, 2);
				level.createWall(new vec(-53, -114), 906, 164, 2);
				level.createWall(new vec(193, 378), 732, 216, 2);
				level.createWall(new vec(587, 225), 266, 59, 2);
				level.createInternalCorner(new vec(427, 167), 0, 2);
				level.createInternalCorner(new vec(527, 50), 0, 2);
				level.createInternalCorner(new vec(728, 50), 1, 2);
				level.createInternalCorner(new vec(427, 378), 3, 2);
				level.createInternalCorner(new vec(728, 284), 1, 2);
				level.createInternalCorner(new vec(728, 378), 2, 2);
				level.createInternalCorner(new vec(728, 225), 2, 2);

				return level;
			})(),
			(function initLevel12() {
				let level = World.create(-1, new vec(96, 282), new vec(195, 40));
			
				level.createLayer("#F08E47");
				level.createLayer("#7A51D3");
				
				// ~ layer 0
				level.createWall(new vec(0, 430), 505, 157, 0);
				level.createWall(new vec(-122, 269), 218, 318, 0);
				level.createWall(new vec(130, -118), 278, 158, 0);
				level.createWall(new vec(232, -103), 129, 218, 0);
				level.createWall(new vec(486, -87), 409, 127, 0);
				level.createWall(new vec(467, 104), 38, 210, 0);
				level.createWall(new vec(659, 274), 40, 68, 0);
				level.createWall(new vec(689, -103), 243, 268, 0);
				level.createWall(new vec(760, -76), 123, 634, 0);
				level.createWall(new vec(467, 274), 232, 40, 0);
				level.createCoin(new vec(659, 241), 0);
				level.createInternalCorner(new vec(232, 40), 1, 0);
				level.createInternalCorner(new vec(96, 430), 3, 0);
				level.createInternalCorner(new vec(361, 40), 0, 0);
				level.createInternalCorner(new vec(505, 274), 3, 0);
				level.createInternalCorner(new vec(760, 165), 1, 0);
				level.createInternalCorner(new vec(699, 40), 1, 0);
				level.createInternalCorner(new vec(659, 314), 1, 0);

				level.createPortal(new vec(132, 424), 100, 6, 0, 1, new vec(0, -1), true);
				level.createPortal(new vec(365, 424), 100, 6, 0, 1, new vec(0, -1), true);
				level.createPortal(new vec(505, 165), 6, 100, 0, 1, new vec(1, 0));

				// ~ layer 1
				level.createWall(new vec(127, 430), 485, 193, 1);
				level.createWall(new vec(234, 267), 128, 310, 1);
				level.createWall(new vec(234, -114), 128, 276, 1);
				level.createWall(new vec(-131, 162), 171, 190, 1);
				level.createWall(new vec(468, -114), 144, 277, 1);
				level.createWall(new vec(127, -106), 458, 146, 1);
				level.createWall(new vec(511, -106), 348, 692, 1);
				level.createWall(new vec(468, 267), 144, 284, 1);
				level.createInternalCorner(new vec(234, 40), 1, 1);
				level.createInternalCorner(new vec(362, 40), 0, 1);
				level.createInternalCorner(new vec(511, 163), 1, 1);
				level.createInternalCorner(new vec(468, 40), 1, 1);
				level.createInternalCorner(new vec(511, 267), 2, 1);
				level.createInternalCorner(new vec(468, 430), 2, 1);
				level.createInternalCorner(new vec(234, 430), 2, 1);
				level.createInternalCorner(new vec(362, 430), 3, 1);

				level.createPortal(new vec(39, 217), 6, 80, 1, 2, new vec(1, 0), true);
				level.createPortal(new vec(137, 39), 95, 6, 1, 2, new vec(0, 1), true);

				// ~ layer 2
				level.createWall(new vec(130, 199), 70, 130, 2);
				level.createWall(new vec(-95, 430), 450, 171, 2);
				level.createWall(new vec(-95, 199), 135, 116, 2);
				level.createWall(new vec(-121, -99), 506, 139, 2);
				level.createWall(new vec(305, 315), 50, 239, 2);
				level.createWall(new vec(345, -89), 40, 189, 2);
				level.createCoin(new vec(280, 46), 2);
				level.createCoin(new vec(105, 400), 2);
				level.createInternalCorner(new vec(345, 40), 1, 2);
				level.createInternalCorner(new vec(305, 430), 2, 2);

				level.createSpike(new vec(246, 40), 86, 2, new vec(0, 1));

				return level;
			})(),
			(function initLevel10() {
				let level = World.create(-1, new vec(207, 408), new vec(416, 275));
			
				level.createLayer("#F08E47");
				level.createLayer("#7A51D3");
				
				// ~ layer 0
				level.createWall(new vec(760, -78), 130, 636, 0);
				level.createWall(new vec(-107, 268), 260, 321, 0);
				level.createWall(new vec(-102, -45), 192, 479, 0);
				level.createWall(new vec(-102, -108), 255, 251, 0);
				level.createWall(new vec(-71, -108), 942, 148, 0);
				level.createWall(new vec(0, 440), 467, 156, 0);
				level.createWall(new vec(414, 367), 154, 194, 0);
				level.createWall(new vec(674, 307), 236, 282, 0);
				level.createWall(new vec(414, 398), 386, 163, 0);
				level.createWall(new vec(498, 268), 70, 278, 0);
				level.createWall(new vec(340, -86), 561, 313, 0);
				level.createInternalCorner(new vec(90, 143), 0, 0);
				level.createInternalCorner(new vec(153, 40), 0, 0);
				level.createInternalCorner(new vec(340, 40), 1, 0);
				level.createInternalCorner(new vec(90, 268), 3, 0);
				level.createInternalCorner(new vec(153, 440), 3, 0);
				level.createInternalCorner(new vec(568, 398), 3, 0);
				level.createInternalCorner(new vec(414, 440), 2, 0);
				level.createInternalCorner(new vec(498, 367), 2, 0);
				level.createInternalCorner(new vec(674, 398), 2, 0);
				level.createInternalCorner(new vec(760, 307), 2, 0);
				level.createInternalCorner(new vec(760, 227), 1, 0);

				level.createPortal(new vec(334, 145), 6, 80, 0, 1, new vec(-1, 0), true);
				level.createPortal(new vec(350, 226), 100, 6, 0, 1, new vec(0, 1), true);
				level.createPortal(new vec(416, 361), 80, 6, 0, 2, new vec(0, -1), true);
				level.createPortal(new vec(754, 227), 6, 80, 0, 2, new vec(-1, 0), true);

				level.createSpike(new vec(568, 227), 52, 0, new vec(0, 1));

				// ~ layer 1
				level.createWall(new vec(-119, 60), 159, 490, 1);
				level.createWall(new vec(760, -77), 289, 634, 1);
				level.createWall(new vec(-110, -96), 350, 323, 1);
				level.createWall(new vec(-110, -65), 198, 394, 1);
				level.createWall(new vec(-32, -96), 317, 181, 1);
				level.createWall(new vec(507, -107), 397, 147, 1);
				level.createWall(new vec(281, 371), 241, 273, 1);
				level.createWall(new vec(-53, 450), 181, 154, 1);
				level.createWall(new vec(-110, 414), 198, 190, 1);
				level.createWall(new vec(621, 440), 304, 173, 1);
				level.createWall(new vec(340, 135), 200, 92, 1);
				level.createWall(new vec(621, 129), 292, 98, 1);
				level.createWall(new vec(716, -137), 296, 362, 1);
				level.createWall(new vec(500, 135), 40, 126, 1);
				level.createInternalCorner(new vec(240, 85), 0, 1);
				level.createInternalCorner(new vec(88, 225), 0, 1);
				level.createInternalCorner(new vec(40, 329), 0, 1);
				level.createInternalCorner(new vec(501, 227), 1, 1);
				level.createInternalCorner(new vec(716, 40), 1, 1);
				level.createInternalCorner(new vec(760, 227), 1, 1);
				level.createInternalCorner(new vec(760, 440), 2, 1);
				level.createInternalCorner(new vec(716, 129), 2, 1);
				level.createInternalCorner(new vec(88, 450), 3, 1);
				level.createInternalCorner(new vec(40, 414), 3, 1);

				level.createPortal(new vec(710, 40), 6, 89, 1, 2, new vec(-1, 0), true);
				level.createPortal(new vec(275, 382), 6, 89, 1, 2, new vec(-1, 0), true);

				level.createSpike(new vec(495, 0), 35, 1, new vec(-1, 0));

				// ~ layer 2
				level.createWall(new vec(-142, 367), 310, 189, 2);
				level.createWall(new vec(136, 346), 32, 134, 2);
				level.createWall(new vec(-125, -61), 185, 602, 2);
				level.createWall(new vec(-108, 427), 312, 129, 2);
				level.createWall(new vec(760, 207), 210, 117, 2);
				level.createWall(new vec(716, -176), 238, 324, 2);
				level.createWall(new vec(108, 103), 96, 168, 2);
				level.createWall(new vec(-142, -169), 346, 209, 2);
				level.createWall(new vec(281, 367), 268, 307, 2);
				level.createWall(new vec(108, 103), 308, 124, 2);
				level.createWall(new vec(320, -144), 480, 184, 2);
				level.createInternalCorner(new vec(60, 40), 0, 2);
				level.createInternalCorner(new vec(60, 367), 3, 2);
				level.createInternalCorner(new vec(136, 367), 2, 2);
				level.createInternalCorner(new vec(168, 427), 3, 2);
				level.createInternalCorner(new vec(204, 227), 0, 2);
				level.createInternalCorner(new vec(716, 40), 1, 2);

				level.createSpike(new vec(60, 40), 140, 2, new vec(0, 1));
				level.createSpike(new vec(204, -29), 64, 2, new vec(1, 0));
				level.createSpike(new vec(204, 227), 39, 2, new vec(1, 0));
				level.createSpike(new vec(96, 107), 159, 2, new vec(-1, 0));
				level.createSpike(new vec(308, -29), 64, 2, new vec(-1, 0));
				level.createSpike(new vec(113, 91), 298, 2, new vec(0, -1));

				level.createCoin(new vec(176, 396), 2);
				level.createCoin(new vec(72, 341), 2);
				level.createCoin(new vec(471, 235), 1);

				return level;
			})(),
		]
	},
}

function save() {
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