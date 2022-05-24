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
		useKeyboard: false,
		worlds: {
			"0": {
				name: "Introduction",
				unlocked: true, // true by default
				completed: false,
				completedLevels: [],
				coins: [],
			},
			"1": {
				name: "New Dimensions",
				prev: "0",
				cost: 5,
				unlocked: false,
				completed: false,
				completedLevels: [],
				coins: [],
			},
			"2": {
				name: "Lateral Theory",
				prev: "1",
				cost: 11,
				unlocked: false,
				completed: false,
				completedLevels: [],
				coins: [],
			},
			"Crossroads": {
				name: "Crossroads",
				prev: "2",
				cost: 10,
				unlocked: false,
				completed: false,
				completedLevels: [],
				coins: [],
			},
			"Groves": {
				name: "Groves",
				prev: "Crossroads",
				cost: 6,
				unlocked: false,
				completed: false,
				completedLevels: [],
				coins: [],
			},
			"Machinery": {
				name: "Machinery",
				prev: "Crossroads",
				cost: 12,
				unlocked: false,
				completed: false,
				completedLevels: [],
				coins: [],
			},
			"Intermission": {
				name: "Intermission",
				prev: "Machinery",
				cost: 1,
				unlocked: false,
				completed: false,
				completedLevels: [],
				coins: [],
			},
			"Automation": {
				name: "Automation",
				prev: "Crossroads",
				cost: 20,
				unlocked: false,
				completed: false,
				completedLevels: [],
				coins: [],
			},
			"Extras": {
				name: "Extras",
				prev: "Automation",
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

var worldNames = [ 0, 1, 2, "Crossroads", "Groves", "Machinery", "Intermission", "Automation", "Extras" ];
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
	"Home": {
		levels: [
			(function initHomeLevel() {
				let level = World.create(-1, new vec(-100, -100), new vec(-200, -200));
				
				level.createLayer("#F18A40");
				level.createLayer("#7C5DBE");
				
				level.createWall(new vec(574, 434), 308, 140, 0);
				level.createWall(new vec(657, -44), 332, 268, 0);
				level.createWall(new vec(509, -88), 397, 131, 0);
				level.createWall(new vec(-133, -99), 464, 142, 0);
				level.createWall(new vec(-106, -111), 350, 234, 0);
				level.createWall(new vec(-104, 250), 300, 149, 0);
				level.createWall(new vec(-95, 221), 199, 370, 0);
				level.createWall(new vec(-95, 221), 241, 171, 0);
				level.createWall(new vec(-80, -99), 147, 661, 0);
				level.createWall(new vec(689, 392), 193, 170, 0);
				level.createWall(new vec(590, -111), 330, 245, 0);
				level.createWall(new vec(732, -88), 150, 662, 0);
				level.createInternalCorner(new vec(67, 123), 0, 0);
				level.createInternalCorner(new vec(104, 399), 0, 0);
				level.createInternalCorner(new vec(244, 43), 0, 0);
				level.createInternalCorner(new vec(590, 43), 1, 0);
				level.createInternalCorner(new vec(657, 134), 1, 0);
				level.createInternalCorner(new vec(732, 224), 1, 0);
				level.createInternalCorner(new vec(732, 392), 2, 0);
				level.createInternalCorner(new vec(689, 434), 2, 0);
				level.createInternalCorner(new vec(67, 221), 3, 0);
				level.createInternalCorner(new vec(146, 250), 3, 0);
				level.createPortal(new vec(726, 312), 6, 80, 0, 1, new vec(-1, 0), true);
				level.createPortal(new vec(103, 407), 6, 80, 0, 1, new vec(1, 0), true);
				level.createPortal(new vec(66, 141), 6, 80, 0, 2, new vec(1, 0), true);
				level.createPortal(new vec(584, 43), 6, 80, 0, 1, new vec(-1, 0), true);
				level.createSpike(new vec(594, 422), 95, 0, new vec(0, -1));

				return level;
			})(),
			(function initBlankLevel() {
				let level = World.create(-1, new vec(-100, -100), new vec(-200, -200));
				return level;
			})(),
		]
	},
	"0": {
		levels: [
			/*(function initLevelTest2() {
				let level = World.create(-1, new vec(125, 310), new vec(158, 342));
				level.layers[0].color = "#DAD9E3";
				// level.createLayer("#F18A40");
			
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
			
				button1.singlePress = false;
			
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

				
				Render.loadImg("keys.svg");

				level.afterRender = function() {
					let keys = Render.images["keys"];
					if (keys !== undefined) {
						let w = 135;
						let h = 89;
						ctx.globalAlpha = Math.sin(engine.Performance.lastUpdate / 500) * 0.15 + 0.8;
						ctx.drawImage(keys, (800 - w)/2, (650 - h) / 2, w, h)
						ctx.globalAlpha = 1;
					}
				}
			
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
			
				level.createLayer("#F18A40");

				Render.loadImg("pointer.svg");

				let clickedOtherLayer = false;
				window.addEventListener("layerViewLoad", () => {
					Render.on("afterRender", () => {
						if (!clickedOtherLayer) {
							let curWorld = World.curWorld;
							if (curWorld === level) {
								if (curWorld.curViewingLayer !== curWorld.curLayer) {
									clickedOtherLayer = true;
								}
								else {
									let pointer = Render.images["pointer"];
									if (pointer !== undefined) {
										let w = 27;
										let h = 37;
										let y = curWorld.curViewingLayer === 0 ? 80 : 38;
										let s = engine.Performance.lastUpdate % 1000 < 450 ? 0.9 : 1;
										ctx.drawImage(pointer, 18 + (w - w*s)/2, y + (h - h*s)/2, w * s, h * s);
									}
								}
							}
						}
					});
				});
				
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
			
				level.createLayer("#F18A40");
				
				// ~ layer 0
				level.createWall(new vec(730, -66), 215, 612, 0);
				level.createWall(new vec(-109, -88), 179, 656, 0);
				level.createWall(new vec(-117, -171), 1034, 231, 0);
				level.createWall(new vec(141, 269), 434, 60, 0);
				level.createWall(new vec(297, 0), 139, 480, 0);
				level.createWall(new vec(271, 269), 304, 310, 0);
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
			
				level.createLayer("#F18A40");
				
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
				level.createCoin(new vec(377, 178), 0);
				
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
			
				level.createLayer("#F18A40");
				
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
				level.createCoin(new vec(336, 252), 1);

				level.createSpike(new vec(329, 186), 150, 1, new vec(1, 0));

				return level;
			})(),
			(function initLevel9() {
				let level = World.create(-1, new vec(384, 365), new vec(82, 59));
			
				level.createLayer("#F18A40");
				
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
			
				level.createLayer("#F18A40");
				level.createLayer("#7C5DBE");
				
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
			
				level.createLayer("#F18A40");
				level.createLayer("#7C5DBE");
				
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
				level.createCoin(new vec(138, 150), 1);

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
			
				level.createLayer("#F18A40");
				level.createLayer("#7C5DBE");
				
				// ~ layer 0
				level.createWall(new vec(-91, 430), 596, 157, 0);
				level.createWall(new vec(-122, 269), 218, 318, 0);
				level.createWall(new vec(130, -118), 278, 158, 0);
				level.createWall(new vec(232, -103), 129, 218, 0);
				level.createWall(new vec(486, -87), 409, 127, 0);
				level.createWall(new vec(467, 152), 38, 162, 0);
				level.createWall(new vec(689, -103), 243, 268, 0);
				level.createWall(new vec(760, -76), 123, 634, 0);
				level.createWall(new vec(467, 274), 222, 40, 0);
				level.createInternalCorner(new vec(232, 40), 1, 0);
				level.createInternalCorner(new vec(96, 430), 3, 0);
				level.createInternalCorner(new vec(361, 40), 0, 0);
				level.createInternalCorner(new vec(505, 274), 3, 0);
				level.createInternalCorner(new vec(760, 165), 1, 0);
				level.createInternalCorner(new vec(689, 40), 1, 0);
				level.createCoin(new vec(659, 241), 0);
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
				level.createWall(new vec(130, 173), 70, 167, 2);
				level.createWall(new vec(-95, 430), 970, 171, 2);
				level.createWall(new vec(-95, 173), 135, 167, 2);
				level.createWall(new vec(-121, -99), 954, 139, 2);
				level.createWall(new vec(459, 340), 440, 252, 2);
				level.createWall(new vec(491, -89), 408, 207, 2);
				level.createWall(new vec(530, -89), 369, 642, 2);
				level.createCoin(new vec(434, 46), 2);
				level.createCoin(new vec(105, 400), 2);
				level.createInternalCorner(new vec(491, 40), 1, 2);
				level.createInternalCorner(new vec(530, 118), 1, 2);
				level.createInternalCorner(new vec(459, 430), 2, 2);
				level.createInternalCorner(new vec(530, 340), 2, 2);

				level.createSpike(new vec(324, 40), 167, 2, new vec(0, 1));

				return level;
			})(),
			(function initLevel14() {
				let level = World.create(-1, new vec(307, 311), new vec(460, 137));
			
				level.createLayer("#F18A40");
				level.createLayer("#7C5DBE");
				
				// ~ layer 0
				level.createWall(new vec(339, -163), 511, 300, 0);
				level.createWall(new vec(339, 302), 121, 333, 0);
				level.createWall(new vec(339, -156), 121, 325, 0);
				level.createWall(new vec(60, 169), 109, 74, 0);
				level.createWall(new vec(-150, -119), 271, 688, 0);
				level.createWall(new vec(-112, 343), 620, 251, 0);
				level.createWall(new vec(-156, -168), 1074, 244, 0);
				level.createWall(new vec(720, -76), 163, 634, 0);
				level.createWall(new vec(671, -120), 219, 296, 0);
				level.createWall(new vec(196, 398), 749, 196, 0);
				level.createInternalCorner(new vec(121, 76), 0, 0);
				level.createInternalCorner(new vec(121, 243), 0, 0);
				level.createInternalCorner(new vec(460, 137), 0, 0);
				level.createInternalCorner(new vec(339, 76), 1, 0);
				level.createInternalCorner(new vec(671, 137), 1, 0);
				level.createInternalCorner(new vec(720, 176), 1, 0);
				level.createInternalCorner(new vec(121, 169), 3, 0);
				level.createInternalCorner(new vec(121, 343), 3, 0);
				level.createInternalCorner(new vec(460, 343), 3, 0);
				level.createInternalCorner(new vec(508, 398), 3, 0);
				level.createInternalCorner(new vec(339, 343), 2, 0);
				level.createInternalCorner(new vec(720, 398), 2, 0);
				level.createCoin(new vec(525, 145), 0);
				level.createPortal(new vec(121, 75), 100, 6, 0, 1, new vec(0, 1), true);
				level.createPortal(new vec(508, 392), 100, 6, 0, 1, new vec(0, -1), true);
				level.createPortal(new vec(120, 243), 6, 100, 0, 2, new vec(1, 0), true);
				level.createSpike(new vec(498, 137), 71, 0, new vec(0, 1));
				level.createSpike(new vec(169, 176), 60, 0, new vec(1, 0));

				// ~ layer 1
				level.createWall(new vec(421, 7.81926), 87, 282.181, 1);
				level.createWall(new vec(421, -114), 462, 375, 1);
				level.createWall(new vec(153, 273), 186, 331, 1);
				level.createWall(new vec(-156, 298), 495, 291, 1);
				level.createWall(new vec(-156, 236), 219, 336, 1);
				level.createWall(new vec(-156, -209), 936, 285, 1);
				level.createWall(new vec(611, -122), 272, 726, 1);
				level.createWall(new vec(339, -165), 538.494, 354, 1);
				level.createWall(new vec(228, -165), 547, 284, 1);
				level.createWall(new vec(454, 398), 482, 226, 1);
				level.createInternalCorner(new vec(228, 76), 1, 1);
				level.createInternalCorner(new vec(339, 119), 1, 1);
				level.createInternalCorner(new vec(421, 189), 1, 1);
				level.createInternalCorner(new vec(611, 261), 1, 1);
				level.createInternalCorner(new vec(508, 261), 0, 1);
				level.createInternalCorner(new vec(611, 398), 2, 1);
				level.createInternalCorner(new vec(153, 298), 2, 1);
				level.createInternalCorner(new vec(63, 298), 3, 1);
				level.createPortal(new vec(415, 200), 6, 80, 1, 2, new vec(-1, 0));

				// ~ layer 2
				level.createWall(new vec(255, 280), 160, 297, 2);
				level.createWall(new vec(333, 189), 82, 388, 2);
				level.createWall(new vec(-140, 379), 555, 249, 2);
				level.createWall(new vec(-184, 218), 305, 359, 2);
				level.createWall(new vec(-88, -112), 343, 223, 2);
				level.createWall(new vec(637, -95), 246, 672, 2);
				level.createWall(new vec(611, -76), 272, 187, 2);
				level.createWall(new vec(611, 189), 335, 424, 2);
				level.createWall(new vec(415, -160), 112, 224, 2);
				level.createWall(new vec(294, 398), 642, 230, 2);
				level.createInternalCorner(new vec(637, 111), 1, 2);
				level.createInternalCorner(new vec(637, 189), 2, 2);
				level.createInternalCorner(new vec(611, 398), 2, 2);
				level.createInternalCorner(new vec(415, 397.5), 3, 2);
				level.createInternalCorner(new vec(121, 379), 3, 2);
				level.createInternalCorner(new vec(333, 280), 2, 2);
				level.createInternalCorner(new vec(255, 379), 2, 2);
				level.createCoin(new vec(582, 71), 2);

				return level;
			})(),
		]
	},
	"Crossroads": {
		levels: [
			(function initLevel15() {
				let level = World.create(-1, new vec(329, 207), new vec(651, 250));
			
				level.createLayer("#F18A40");
				level.createLayer("#7C5DBE");
				
				// ~ layer 0
				level.createWall(new vec(-86, -95), 332, 297, 0);
				level.createWall(new vec(-70, 311), 331, 282, 0);
				level.createWall(new vec(80, 373), 247, 155, 0);
				level.createWall(new vec(415, 202), 50, 74, 0);
				level.createWall(new vec(683, 158), 204, 404, 0);
				level.createWall(new vec(159, 429), 415, 170, 0);
				level.createWall(new vec(465, 373), 317, 220, 0);
				level.createWall(new vec(-100, 75), 180, 366, 0);
				level.createWall(new vec(96, -142), 369, 243, 0);
				level.createWall(new vec(283, -134), 627, 196, 0);
				level.createWall(new vec(740, -95), 201, 650, 0);
				level.createWall(new vec(565, 282), 235, 280, 0);
				level.createCoin(new vec(701, 72), 0);
				level.createInternalCorner(new vec(80, 202), 0, 0);
				level.createInternalCorner(new vec(246, 101), 0, 0);
				level.createInternalCorner(new vec(465, 62), 0, 0);
				level.createInternalCorner(new vec(740, 62), 1, 0);
				level.createInternalCorner(new vec(683, 282), 2, 0);
				level.createInternalCorner(new vec(740, 158), 2, 0);
				level.createInternalCorner(new vec(565, 373), 2, 0);
				level.createInternalCorner(new vec(465, 429), 2, 0);
				level.createInternalCorner(new vec(327, 429), 3, 0);
				level.createInternalCorner(new vec(261, 373), 3, 0);
				level.createInternalCorner(new vec(80, 311), 3, 0);

				level.createPortal(new vec(245, 105), 6, 85, 0, 2, new vec(1, 0), true);
				level.createPortal(new vec(465, 61), 100, 6, 0, 2, new vec(0, 1), true);
				level.createPortal(new vec(261, 100), 100, 6, 0, 1, new vec(0, 1), true);
				level.createPortal(new vec(79, 206), 6, 100, 0, 1, new vec(1, 0), true);

				// ~ layer 1
				level.createWall(new vec(-15, -115), 588, 216, 1);
				level.createWall(new vec(402, -100), 182, 250, 1);
				level.createWall(new vec(241, 430), 629, 148, 1);
				level.createWall(new vec(261, 278), 50, 202, 1);
				level.createWall(new vec(550, 244), 108, 106, 1);
				level.createWall(new vec(343, -131), 548, 210, 1);
				level.createWall(new vec(-111, -66), 191, 612, 1);
				level.createWall(new vec(750, -66), 154, 612, 1);
				level.createWall(new vec(-95, 310), 406, 268, 1);
				level.createInternalCorner(new vec(80, 101), 0, 1);
				level.createInternalCorner(new vec(402, 101), 1, 1);
				level.createInternalCorner(new vec(750, 79), 1, 1);
				level.createInternalCorner(new vec(584, 79), 0, 1);
				level.createInternalCorner(new vec(80, 310), 3, 1);
				level.createInternalCorner(new vec(311, 430), 3, 1);
				level.createInternalCorner(new vec(261, 310), 2, 1);
				level.createInternalCorner(new vec(750, 430), 2, 1);
				level.createCoin(new vec(277, 126), 1);
				level.createCoin(new vec(525, 155), 1);

				level.createPortal(new vec(311, 350), 6, 80, 1, 2, new vec(1, 0));
				level.createPortal(new vec(80, 100), 100, 6, 1, 2, new vec(0, 1), true);

				level.createSpike(new vec(390, 101), 41, 1, new vec(-1, 0));

				// ~ layer 2
				level.createWall(new vec(183, -19), 63, 221, 2);
				level.createWall(new vec(-117, -68), 188, 482, 2);
				level.createWall(new vec(317, 338), 89, 241, 2);
				level.createWall(new vec(-71, 261), 251, 306, 2);
				level.createWall(new vec(17, 430), 463, 137, 2);
				level.createWall(new vec(565, -121), 235, 279, 2);
				level.createWall(new vec(322, 394), 569, 202, 2);
				level.createWall(new vec(276, -121), 491, 183, 2);
				level.createWall(new vec(-99, -162), 564, 263, 2);
				level.createWall(new vec(632, -134), 246, 395, 2);
				level.createWall(new vec(710, 108), 168, 445, 2);
				level.createInternalCorner(new vec(71, 101), 0, 2);
				level.createInternalCorner(new vec(246, 101), 0, 2);
				level.createInternalCorner(new vec(183, 101), 1, 2);
				level.createInternalCorner(new vec(71, 261), 3, 2);
				level.createInternalCorner(new vec(180, 430), 3, 2);
				level.createInternalCorner(new vec(406, 394), 3, 2);
				level.createInternalCorner(new vec(317, 430), 2, 2);
				level.createInternalCorner(new vec(710, 394), 2, 2);
				level.createInternalCorner(new vec(710, 261), 1, 2);
				level.createInternalCorner(new vec(632, 158), 1, 2);
				level.createInternalCorner(new vec(565, 62), 1, 2);
				level.createInternalCorner(new vec(465, 62), 0, 2);

				level.createSpike(new vec(406, 382), 109, 2, new vec(0, -1));
				level.createSpike(new vec(191, 202), 47, 2, new vec(0, 1));

				return level;
			})(),
			(function initLevel19() {
				let level = World.create(-1, new vec(376, 146), new vec(59, 245));

				level.createLayer("#F18A40");
				level.createLayer("#7C5DBE");
				
				// ~ layer 0
				level.createWall(new vec(505, 440), 437, 176, 0);
				level.createWall(new vec(-122, 277), 233, 319, 0);
				level.createWall(new vec(143, 19), 30, 81, 0);
				level.createWall(new vec(232, 226), 67, 55, 0);
				level.createWall(new vec(505, 226), 69, 118, 0);
				level.createWall(new vec(505, 413), 69, 163, 0);
				level.createWall(new vec(654, 226), 325, 118, 0);
				level.createWall(new vec(708, -115), 210, 244, 0);
				level.createWall(new vec(755, 226), 244, 339, 0);
				level.createWall(new vec(-172, -98), 231, 473, 0);
				level.createWall(new vec(-68, -85), 268, 137, 0);
				level.createWall(new vec(98, -110), 335, 144, 0);
				level.createWall(new vec(331, -121), 587, 173, 0);
				level.createWall(new vec(-39, 413), 298, 203, 0);
				level.createWall(new vec(-39, 333), 239, 243, 0);
				level.createCoin(new vec(383, 253), 0);
				level.createInternalCorner(new vec(200, 34), 0, 0);
				level.createInternalCorner(new vec(173, 52), 0, 0);
				level.createInternalCorner(new vec(331, 34), 1, 0);
				level.createInternalCorner(new vec(143, 52), 1, 0);
				level.createInternalCorner(new vec(57, 52), 0, 0);
				level.createInternalCorner(new vec(59, 277), 3, 0);
				level.createInternalCorner(new vec(111, 333), 3, 0);
				level.createInternalCorner(new vec(200, 413), 3, 0);
				level.createInternalCorner(new vec(574, 440), 3, 0);
				level.createInternalCorner(new vec(755, 440), 2, 0);
				level.createInternalCorner(new vec(755, 344), 1, 0);
				level.createInternalCorner(new vec(708, 52), 1, 0);

				level.createPortal(new vec(499, 253), 6, 80, 0, 1, new vec(-1, 0));
				level.createPortal(new vec(58, 146), 6, 80, 0, 2, new vec(1, 0), true);
				level.createPortal(new vec(574, 51), 80, 6, 0, 2, new vec(0, 1), true);
				level.createPortal(new vec(59, 51), 84, 6, 0, 1, new vec(0, 1), true);

				// ~ layer 1
				level.createWall(new vec(323, 228), 176, 113, 1);
				level.createWall(new vec(-100, -164), 257, 216, 1);
				level.createWall(new vec(323, -123), 450, 187, 1);
				level.createWall(new vec(544, 409), 283, 226, 1);
				level.createWall(new vec(-136, 228), 247, 349, 1);
				level.createWall(new vec(-100, 409), 268, 168, 1);
				level.createWall(new vec(633, 285), 349, 369, 1);
				level.createWall(new vec(-75, -40), 134, 360, 1);
				level.createWall(new vec(672, -53), 321, 241, 1);
				level.createWall(new vec(544, -123), 438, 260, 1);
				level.createCoin(new vec(334, 77), 1);
				level.createInternalCorner(new vec(59, 52), 0, 1);
				level.createInternalCorner(new vec(59, 228), 3, 1);
				level.createInternalCorner(new vec(111, 409), 3, 1);
				level.createInternalCorner(new vec(633, 409), 2, 1);
				level.createInternalCorner(new vec(672, 137), 1, 1);
				level.createInternalCorner(new vec(544, 64), 1, 1);

				level.createPortal(new vec(334, 222), 80, 6, 1, 2, new vec(0, -1));

				// ~ layer 2
				level.createWall(new vec(316, -49), 139, 271, 2);
				level.createWall(new vec(276, -88), 179, 274, 2);
				level.createWall(new vec(-38, -35), 131, 181, 2);
				level.createWall(new vec(-65, -130), 520, 236, 2);
				level.createWall(new vec(276, 400), 463, 225, 2);
				level.createWall(new vec(276, 346), 58, 220, 2);
				level.createWall(new vec(521, 346), 312, 249, 2);
				level.createWall(new vec(654, -141), 287, 745, 2);
				level.createWall(new vec(521, 138), 85, 84, 2);
				level.createWall(new vec(-85, -130), 144, 379, 2);
				level.createWall(new vec(329, -149), 438, 201, 2);
				level.createCoin(new vec(343, 317), 2);
				level.createInternalCorner(new vec(93, 106), 0, 2);
				level.createInternalCorner(new vec(59, 146), 0, 2);
				level.createInternalCorner(new vec(276, 106), 1, 2);
				level.createInternalCorner(new vec(316, 186), 1, 2);
				level.createInternalCorner(new vec(654, 52), 1, 2);
				level.createInternalCorner(new vec(455, 52), 0, 2);
				level.createInternalCorner(new vec(334, 400), 3, 2);
				level.createInternalCorner(new vec(521, 400), 2, 2);
				level.createInternalCorner(new vec(654, 346), 2, 2);

				return level;
			})(),
			(function initLevel18() {
				let level = World.create(-1, new vec(305, 275), new vec(714, 139));
			
				level.createLayer("#F18A40");
				level.createLayer("#7C5DBE");
				
				// ~ layer 0
				level.createWall(new vec(-129, -119), 248, 258, 0);
				level.createWall(new vec(652, -92), 263, 231, 0);
				level.createWall(new vec(395.149, -140), 520.851, 219, 0);
				level.createWall(new vec(-119, -208), 1007, 255, 0);
				level.createWall(new vec(157, 191), 73, 80, 0);
				level.createWall(new vec(337, 221), 102, 116, 0);
				level.createWall(new vec(652, 280), 286, 292, 0);
				level.createWall(new vec(746, -92), 209, 682, 0);
				level.createWall(new vec(-147, 346), 234, 263, 0);
				level.createWall(new vec(560.964, 391), 340.036, 218, 0);
				level.createWall(new vec(-105, 391), 309.333, 227, 0);
				level.createInternalCorner(new vec(119, 47), 0, 0);
				level.createInternalCorner(new vec(395.149, 47), 1, 0);
				level.createInternalCorner(new vec(652, 79), 1, 0);
				level.createInternalCorner(new vec(746, 139), 1, 0);
				level.createInternalCorner(new vec(746, 280), 2, 0);
				level.createInternalCorner(new vec(652, 391), 2, 0);
				level.createInternalCorner(new vec(87, 391), 3, 0);
				level.createCoin(new vec(237, 110), 0);
				level.createPortal(new vec(439, 239), 6, 80, 0, 1, new vec(1, 0));
				level.createPortal(new vec(572, 78), 80, 6, 0, 1, new vec(0, 1), true);
				level.createPortal(new vec(740, 175), 6, 100, 0, 2, new vec(-1, 0), true);
				level.createSpike(new vec(87, 379), 70, 0, new vec(0, -1));
				level.createSpike(new vec(-16, 334), 96, 0, new vec(0, -1));

				// ~ layer 1
				level.createWall(new vec(-133, -116), 220, 255, 1);
				level.createWall(new vec(344.803, -160), 384.892, 209, 1);
				level.createWall(new vec(604, 232), 359, 353, 1);
				level.createWall(new vec(477, -99), 474, 178, 1);
				level.createWall(new vec(445, 232), 67, 97, 1);
				level.createWall(new vec(652, -124), 252, 728, 1);
				level.createWall(new vec(-133, -116), 187, 391, 1);
				level.createWall(new vec(292, 139), 80, 93, 1);
				level.createWall(new vec(-122, 361), 209, 265, 1);
				level.createWall(new vec(412, 392), 492, 212, 1);
				level.createWall(new vec(-74, 424), 948, 180, 1);
				level.createInternalCorner(new vec(54, 139), 0, 1);
				level.createInternalCorner(new vec(652, 79), 1, 1);
				level.createInternalCorner(new vec(477, 49), 1, 1);
				level.createInternalCorner(new vec(652, 232), 2, 1);
				level.createInternalCorner(new vec(604, 392), 2, 1);
				level.createInternalCorner(new vec(412, 424), 2, 1);
				level.createInternalCorner(new vec(87, 424), 3, 1);
				level.createCoin(new vec(387.5, 147), 1);

				level.createSpike(new vec(500.987, 380), 103.013, 1, new vec(0, -1));
				
				// ~ layer 2
				level.createWall(new vec(602, 345), 272, 232, 2);
				level.createWall(new vec(-94, -136), 815, 219, 2);
				level.createWall(new vec(362, -92), 522, 217, 2);
				level.createWall(new vec(-77, 383), 439, 246, 2);
				level.createWall(new vec(362, -83), 79, 326, 2);
				level.createWall(new vec(-110, -92), 222, 197, 2);
				level.createWall(new vec(223, -92), 419, 197, 2);
				level.createWall(new vec(-54, 275), 245, 286, 2);
				level.createWall(new vec(-65, 345), 348, 244, 2);
				level.createWall(new vec(-142, -92), 221, 664, 2);
				level.createWall(new vec(746, -97), 193, 674, 2);
				level.createWall(new vec(-65, 416), 959, 145, 2);
				level.createInternalCorner(new vec(79, 105), 0, 2);
				level.createInternalCorner(new vec(79, 275), 3, 2);
				level.createInternalCorner(new vec(191, 345), 3, 2);
				level.createInternalCorner(new vec(283, 383), 3, 2);
				level.createInternalCorner(new vec(362, 416), 3, 2);
				level.createInternalCorner(new vec(602, 416), 2, 2);
				level.createInternalCorner(new vec(746, 345), 2, 2);
				level.createInternalCorner(new vec(112, 83), 0, 2);
				level.createInternalCorner(new vec(223, 83), 1, 2);
				level.createInternalCorner(new vec(362, 105), 1, 2);
				level.createInternalCorner(new vec(746, 125), 1, 2);
				level.createInternalCorner(new vec(441, 125), 0, 2);
				level.createCoin(new vec(198, 112), 2);

				level.createSpike(new vec(79, 263), 99, 2, new vec(0, -1));

				return level;
			})(),
			(function initLevel16() {
				let level = World.create(-1, new vec(384, 224), new vec(519, 80));
			
				level.createLayer("#F18A40");
				level.createLayer("#7C5DBE");
				
				// ~ layer 0
				level.createWall(new vec(290, 152), 180, 72, 0);
				level.createWall(new vec(-55, 455), 490, 127, 0);
				level.createWall(new vec(-94, 327), 144, 40, 0);
				level.createWall(new vec(-102, 434), 152, 129, 0);
				level.createWall(new vec(470, 414), 121, 188, 0);
				level.createWall(new vec(511, -56), 136, 136, 0);
				level.createWall(new vec(164, -56), 126, 136, 0);
				level.createWall(new vec(551, -74), 349, 234, 0);
				level.createWall(new vec(722, -121), 178, 729, 0);
				level.createWall(new vec(-84, -82), 968, 122, 0);
				level.createWall(new vec(682, 327), 224, 249, 0);
				level.createWall(new vec(-84, -52), 173, 276, 0);
				level.createWall(new vec(-84, 112), 109, 255, 0);
				level.createWall(new vec(290, 434), 265, 142, 0);
				level.createInternalCorner(new vec(89, 40), 0, 0);
				level.createInternalCorner(new vec(25, 224), 0, 0);
				level.createInternalCorner(new vec(290, 40), 0, 0);
				level.createInternalCorner(new vec(164, 40), 1, 0);
				level.createInternalCorner(new vec(511, 40), 1, 0);
				level.createInternalCorner(new vec(551, 80), 1, 0);
				level.createInternalCorner(new vec(722, 160), 1, 0);
				level.createInternalCorner(new vec(722, 327), 2, 0);
				level.createInternalCorner(new vec(470, 434), 2, 0);
				level.createInternalCorner(new vec(290, 455), 2, 0);
				level.createInternalCorner(new vec(50, 455), 3, 0);
				level.createInternalCorner(new vec(25, 327), 3, 0);
				level.createCoin(new vec(375, 129), 0);
				level.createCoin(new vec(256, 197), 0);
				level.createPortal(new vec(481, 408), 100, 6, 0, 2, new vec(0, -1), true);
				level.createPortal(new vec(89, 449), 75, 6, 0, 2, new vec(0, -1), true);
				level.createPortal(new vec(88, 120), 6, 100, 0, 1, new vec(1, 0), true);
				level.createSpike(new vec(670, 335), 145, 0, new vec(-1, 0));
				level.createSpike(new vec(710, 160), 123, 0, new vec(-1, 0));
				level.createSpike(new vec(295, 140), 170, 0, new vec(0, -1));
				level.createSpike(new vec(170, 80), 114, 0, new vec(0, 1));

				// ~ layer 1
				level.createWall(new vec(450, 151), 137, 173, 1);
				level.createWall(new vec(467, -64), 50, 167, 1);
				level.createWall(new vec(245, -83), 607, 133, 1);
				level.createWall(new vec(-117, 400), 995, 156, 1);
				level.createWall(new vec(-117, 226), 414, 355, 1);
				level.createWall(new vec(705, -110), 173, 677, 1);
				level.createWall(new vec(-105, 114), 194, 262, 1);
				level.createInternalCorner(new vec(517, 50), 0, 1);
				level.createInternalCorner(new vec(467, 50), 1, 1);
				level.createInternalCorner(new vec(705, 50), 1, 1);
				level.createInternalCorner(new vec(705, 400), 2, 1);
				level.createInternalCorner(new vec(297, 400), 3, 1);
				level.createInternalCorner(new vec(89, 226), 3, 1);

				level.createPortal(new vec(444, 153), 6, 71, 1, 2, new vec(-1, 0));
				level.createPortal(new vec(297, 49), 100, 6, 1, 2, new vec(0, 1), true);

				level.createSpike(new vec(587, 161), 156, 1, new vec(1, 0));
				level.createSpike(new vec(438, 224), 90, 1, new vec(-1, 0));
				level.createSpike(new vec(233, 1), 44, 1, new vec(-1, 0));
				level.createSpike(new vec(457, 324), 123, 1, new vec(0, 1));
				level.createSpike(new vec(472, 103), 40, 1, new vec(0, 1));

				// ~ layer 2
				level.createWall(new vec(404, 230), 122, 109, 2);
				level.createWall(new vec(404, 110), 40, 216, 2);
				level.createWall(new vec(397, 110), 129, 37, 2);
				level.createWall(new vec(494, 110), 32, 80, 2);
				level.createWall(new vec(166, 251), 115, 50, 2);
				level.createWall(new vec(312, 142), 132, 55, 2);
				level.createWall(new vec(-75, 73), 164, 178, 2);
				level.createWall(new vec(-75, -42), 207, 239, 2);
				level.createWall(new vec(-75, -77), 240, 187, 2);
				level.createWall(new vec(166, 251), 50, 274, 2);
				level.createWall(new vec(166, 414), 716, 148, 2);
				level.createWall(new vec(-60, 455), 290, 78, 2);
				level.createWall(new vec(-82, 411), 126, 131, 2);
				level.createWall(new vec(-82, 110), 126, 202, 2);
				level.createWall(new vec(581, -71), 290, 226, 2);
				level.createWall(new vec(426, 230), 202, 59, 2);
				level.createWall(new vec(722, -14), 175, 584, 2);
				level.createWall(new vec(-82, -87), 964, 137, 2);
				level.createInternalCorner(new vec(89, 197), 0, 2);
				level.createInternalCorner(new vec(132, 110), 0, 2);
				level.createInternalCorner(new vec(165, 50), 0, 2);
				level.createInternalCorner(new vec(44, 251), 0, 2);
				level.createInternalCorner(new vec(216, 301), 0, 2);
				level.createInternalCorner(new vec(444, 147), 0, 2);
				level.createInternalCorner(new vec(526, 289), 0, 2);
				level.createInternalCorner(new vec(44, 455), 3, 2);
				level.createInternalCorner(new vec(166, 455), 2, 2);
				level.createInternalCorner(new vec(722, 414), 2, 2);
				level.createInternalCorner(new vec(494, 147), 1, 2);
				level.createInternalCorner(new vec(404, 197), 1, 2);
				level.createInternalCorner(new vec(722, 155), 1, 2);
				level.createInternalCorner(new vec(581, 50), 1, 2);
				level.createInternalCorner(new vec(216, 414), 3, 2);
				level.createInternalCorner(new vec(444, 230), 3, 2);
				level.createInternalCorner(new vec(397, 142), 2, 2);

				level.createSpike(new vec(526, 118), 37, 2, new vec(1, 0));
				level.createSpike(new vec(628, 236), 47, 2, new vec(1, 0));
				level.createSpike(new vec(526, 289), 43, 2, new vec(1, 0));
				level.createSpike(new vec(165, 50), 56, 2, new vec(1, 0));
				level.createSpike(new vec(400, 98), 119, 2, new vec(0, -1));
				level.createSpike(new vec(318, 130), 79, 2, new vec(0, -1));
				level.createSpike(new vec(300, 150), 44, 2, new vec(-1, 0));
				level.createSpike(new vec(132, 110), 84, 2, new vec(1, 0));
				level.createSpike(new vec(44, 251), 50, 2, new vec(1, 0));
				level.createSpike(new vec(44, 419), 36, 2, new vec(1, 0));
				level.createSpike(new vec(281, 256), 40, 2, new vec(1, 0));
				level.createSpike(new vec(392, 197), 104, 2, new vec(-1, 0));

				return level;
			})(),
			(function initLevel13() {
				let level = World.create(-1, new vec(207, 408), new vec(416, 275));
			
				level.createLayer("#F18A40");
				level.createLayer("#7C5DBE");
				
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
				level.createInternalCorner(new vec(88, 227), 0, 1);
				level.createInternalCorner(new vec(40, 329), 0, 1);
				level.createInternalCorner(new vec(501, 227), 1, 1);
				level.createInternalCorner(new vec(716, 40), 1, 1);
				level.createInternalCorner(new vec(760, 227), 1, 1);
				level.createInternalCorner(new vec(760, 440), 2, 1);
				level.createInternalCorner(new vec(716, 129), 2, 1);
				level.createInternalCorner(new vec(88, 450), 3, 1);
				level.createInternalCorner(new vec(40, 414), 3, 1);
				level.createCoin(new vec(471, 235), 1);
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
				level.createCoin(new vec(72, 341), 2);
				level.createCoin(new vec(176, 396), 2);

				level.createSpike(new vec(204, -29), 64, 2, new vec(1, 0));
				level.createSpike(new vec(204, 227), 39, 2, new vec(1, 0));
				level.createSpike(new vec(308, -29), 64, 2, new vec(-1, 0));

				return level;
			})(),
		]
	},
	"Groves": {
		levels: [
			(function initLevel20() {
				let level = World.create(-1, new vec(473, 133), new vec(289, 40));
				
				level.layers[0].color = "#E9EFBA";
				level.layers[0].portalColor = "#E9EFBA";
				level.createLayer("#F8B469");
				level.createLayer("#77AB59");
				
				// ~ layer 0
				level.createWall(new vec(261, 368), 539, 196, 0);
				level.createWall(new vec(388, 308), 214, 243, 0);
				level.createWall(new vec(-107, 408), 580, 169, 0);
				level.createWall(new vec(-121, -63), 185, 454, 0);
				level.createWall(new vec(-107, 213), 203, 356, 0);
				level.createWall(new vec(215, 130), 106, 48, 0);
				level.createWall(new vec(435, 258), 628, 266, 0);
				level.createWall(new vec(-70, -80), 166, 120, 0);
				level.createWall(new vec(184, -138), 257, 178, 0);
				level.createWall(new vec(321, -157), 330, 199, 0);
				level.createWall(new vec(321, -131), 82, 223, 0);
				level.createWall(new vec(561, -109), 408, 185, 0);
				level.createWall(new vec(701, 165), 231, 226, 0);
				level.createWall(new vec(729, -99), 315, 452, 0);
				level.createInternalCorner(new vec(64, 40), 0, 0);
				level.createInternalCorner(new vec(321, 40), 1, 0);
				level.createInternalCorner(new vec(64, 213), 3, 0);
				level.createInternalCorner(new vec(96, 408), 3, 0);
				level.createInternalCorner(new vec(388, 368), 2, 0);
				level.createInternalCorner(new vec(261, 408), 2, 0);
				level.createInternalCorner(new vec(435, 308), 2, 0);
				level.createInternalCorner(new vec(701, 258), 2, 0);
				level.createInternalCorner(new vec(729, 165), 2, 0);
				level.createInternalCorner(new vec(729, 76), 1, 0);
				level.createInternalCorner(new vec(561, 42), 1, 0);
				level.createInternalCorner(new vec(403, 42), 0, 0);
				level.createCoin(new vec(154, 146), 0);
				level.createCoin(new vec(357, 336), 0);
				level.createPortal(new vec(273, 362), 80, 6, 0, 2, new vec(0, -1), true);
				level.createPortal(new vec(95, 328), 6, 80, 0, 1, new vec(1, 0), true);
				level.createPortal(new vec(695, 178), 6, 80, 0, 1, new vec(-1, 0), true);
				level.createPortal(new vec(63, 130), 6, 80, 0, 1, new vec(1, 0), true);
				level.createSpike(new vec(454, 246), 70, 0, new vec(0, -1));
				level.createSpike(new vec(403, 42), 34, 0, new vec(1, 0));
				level.createSpike(new vec(321, 137), 34, 0, new vec(1, 0));

				// ~ layer 1
				level.createWall(new vec(270, 214), 100, 97, 1);
				level.createWall(new vec(392, 457), 378, 112, 1);
				level.createWall(new vec(370, 441), 133, 123, 1);
				level.createWall(new vec(637, 311), 311, 266, 1);
				level.createWall(new vec(-33, 287), 184, 40, 1);
				level.createWall(new vec(-95, 287), 191, 290, 1);
				level.createWall(new vec(470, -93), 457, 176, 1);
				level.createWall(new vec(-82, -83), 189, 214, 1);
				level.createWall(new vec(-73, -139), 252, 180, 1);
				level.createWall(new vec(535, -9), 372, 188, 1);
				level.createWall(new vec(-101, -83), 165, 498, 1);
				level.createWall(new vec(701, 41), 226, 416, 1);
				level.createInternalCorner(new vec(107, 41), 0, 1);
				level.createInternalCorner(new vec(64, 131), 0, 1);
				level.createInternalCorner(new vec(96, 327), 0, 1);
				level.createInternalCorner(new vec(64, 287), 3, 1);
				level.createInternalCorner(new vec(503, 457), 3, 1);
				level.createInternalCorner(new vec(637, 457), 2, 1);
				level.createInternalCorner(new vec(701, 311), 2, 1);
				level.createInternalCorner(new vec(701, 179), 1, 1);
				level.createInternalCorner(new vec(535, 83), 1, 1);
				level.createPortal(new vec(264, 221), 6, 80, 1, 2, new vec(-1, 0));
				level.createSpike(new vec(280, 202), 80, 1, new vec(0, -1));
				level.createSpike(new vec(423, 429), 71, 1, new vec(0, -1));
				level.createSpike(new vec(280, 311), 80, 1, new vec(0, 1));

				// ~ layer 2
				level.createWall(new vec(103, 368), 648, 246, 2);
				level.createWall(new vec(-125, 210), 389, 369, 2);
				level.createWall(new vec(-89, -58), 163, 330, 2);
				level.createWall(new vec(-79, 178), 182, 127, 2);
				level.createWall(new vec(-35, -90), 171, 138, 2);
				level.createWall(new vec(-35, -58), 138, 138, 2);
				level.createWall(new vec(632, 210), 148, 364, 2);
				level.createWall(new vec(677, -106), 195, 680, 2);
				level.createWall(new vec(353, -90), 286, 170, 2);
				level.createWall(new vec(461, -98), 377, 220, 2);
				level.createInternalCorner(new vec(103, 48), 0, 2);
				level.createInternalCorner(new vec(74, 80), 0, 2);
				level.createInternalCorner(new vec(74, 178), 3, 2);
				level.createInternalCorner(new vec(103, 210), 3, 2);
				level.createInternalCorner(new vec(461, 80), 1, 2);
				level.createInternalCorner(new vec(677, 122), 1, 2);
				level.createInternalCorner(new vec(677, 210), 2, 2);
				level.createInternalCorner(new vec(632, 368), 2, 2);
				level.createInternalCorner(new vec(264, 368), 3, 2);
				level.createCoin(new vec(323, 90), 2);

				level.createSpike(new vec(381, 356), 184, 2, new vec(0, -1));

				return level;
			})(),
			(function initLevel21() {
				let level = World.create(-1, new vec(546, 133), new vec(217, 270));
			
				level.layers[0].color = "#E9EFBA";
				level.layers[0].portalColor = "#E9EFBA";
				level.createLayer("#F8B469");
				level.createLayer("#77AB59");
				
				// ~ layer 0
				level.createWall(new vec(428, 394), 118, 160, 0);
				level.createWall(new vec(442, 427), 362, 127, 0);
				level.createWall(new vec(700, 311), 165, 226, 0);
				level.createWall(new vec(-73, -114), 192, 255, 0);
				level.createWall(new vec(9, -107), 208, 170, 0);
				level.createWall(new vec(-73, 302), 130, 266, 0);
				level.createWall(new vec(-92, 394), 211, 165, 0);
				level.createWall(new vec(-30, 437), 576, 109, 0);
				level.createWall(new vec(313, -59), 83, 370, 0);
				level.createWall(new vec(249, 233), 147, 106, 0);
				level.createWall(new vec(313, -134), 140, 198, 0);
				level.createWall(new vec(588, -75), 195, 115, 0);
				level.createWall(new vec(741, -29), 195, 232, 0);
				level.createWall(new vec(700, -134), 202, 267, 0);
				level.createInternalCorner(new vec(119, 63), 0, 0);
				level.createInternalCorner(new vec(313, 233), 2, 0);
				level.createInternalCorner(new vec(57, 394), 3, 0);
				level.createInternalCorner(new vec(119, 437), 3, 0);
				level.createInternalCorner(new vec(546, 427), 3, 0);
				level.createInternalCorner(new vec(428, 437), 2, 0);
				level.createInternalCorner(new vec(700, 427), 2, 0);
				level.createInternalCorner(new vec(741, 133), 1, 0);
				level.createInternalCorner(new vec(700, 40), 1, 0);
				level.createInternalCorner(new vec(396, 64), 0, 0);

				level.createPortal(new vec(307, 15), 6, 80, 0, 1, new vec(-1, 0));
				level.createPortal(new vec(395, 231), 6, 80, 0, 2, new vec(1, 0), true);
				level.createPortal(new vec(9, 140), 80, 6, 0, 2, new vec(0, 1), true);

				// ~ layer 1
				level.createWall(new vec(724, -21), 200, 439, 1);
				level.createWall(new vec(-69, -81), 376, 233, 1);
				level.createWall(new vec(665, -103), 259, 214, 1);
				level.createWall(new vec(497, -96), 91, 123, 1);
				level.createWall(new vec(-101, -59), 321, 263, 1);
				level.createWall(new vec(-76, 54), 236, 342, 1);
				level.createWall(new vec(220, 440), 301, 159, 1);
				level.createWall(new vec(620, 440), 198, 159, 1);
				level.createWall(new vec(620, 281), 158, 40, 1);
				level.createWall(new vec(434, 396), 87, 170, 1);
				level.createWall(new vec(685, 281), 202, 306, 1);
				level.createWall(new vec(307, 212), 88, 85, 1);
				level.createWall(new vec(368, 212), 63, 37, 1);
				level.createInternalCorner(new vec(220, 152), 0, 1);
				level.createInternalCorner(new vec(395, 249), 0, 1);
				level.createInternalCorner(new vec(160, 204), 0, 1);
				level.createInternalCorner(new vec(724, 111), 1, 1);
				level.createInternalCorner(new vec(685, 321), 1, 1);
				level.createInternalCorner(new vec(724, 281), 2, 1);
				level.createInternalCorner(new vec(685, 440), 2, 1);
				level.createInternalCorner(new vec(434, 440), 2, 1);
				level.createCoin(new vec(342, 176), 1);
				level.createCoin(new vec(400, 35), 1);

				level.createPortal(new vec(718, 172), 6, 80, 1, 2, new vec(-1, 0), true);

				level.createSpike(new vec(315, 200), 72, 1, new vec(0, -1));
				level.createSpike(new vec(315, 297), 72, 1, new vec(0, 1));
				level.createSpike(new vec(712, 111), 41, 1, new vec(-1, 0));

				// ~ layer 2
				level.createWall(new vec(-133, -83), 286, 224, 2);
				level.createWall(new vec(30, -97), 229, 174, 2);
				level.createWall(new vec(396, -170), 153, 210, 2);
				level.createWall(new vec(661, -147), 285, 319, 2);
				level.createWall(new vec(724, 40), 244, 320, 2);
				level.createWall(new vec(606, 252), 50, 108, 2);
				level.createWall(new vec(-61, 352), 182, 213, 2);
				level.createWall(new vec(-72, 459), 292, 121, 2);
				level.createWall(new vec(545, 430), 179, 161, 2);
				level.createWall(new vec(-116, 184), 135, 78, 2);
				level.createWall(new vec(259, 204), 137, 185, 2);
				level.createInternalCorner(new vec(724, 172), 1, 2);
				level.createInternalCorner(new vec(153, 77), 0, 2);
				level.createInternalCorner(new vec(121, 459), 3, 2);
				level.createCoin(new vec(664, 297), 2);

				return level;
			})(),
			(function initLevel33() {
				let level = World.create(-1, new vec(708, 221), new vec(391, 40));
			
				level.layers[0].color = "#E9EFBA";
				level.layers[0].portalColor = "#E9EFBA";
				level.createLayer("#F8B469");
				level.createLayer("#77AB59");
				
				// ~ layer 0
				level.createWall(new vec(274, 431), 616, 128, 0);
				level.createWall(new vec(383, 346), 195, 242, 0);
				level.createWall(new vec(383, 298), 112, 290, 0);
				level.createWall(new vec(317, 383), 261, 188, 0);
				level.createWall(new vec(-241, 202), 526, 96, 0);
				level.createWall(new vec(351, 120), 539, 50, 0);
				level.createWall(new vec(578, 120), 323, 101, 0);
				level.createWall(new vec(517, -91), 397, 131, 0);
				level.createWall(new vec(-125, -102), 383, 142, 0);
				level.createWall(new vec(-98, -114), 308, 196, 0);
				level.createWall(new vec(-125, 162), 287, 136, 0);
				level.createWall(new vec(-87, 162), 199, 426, 0);
				level.createWall(new vec(-72, -102), 147, 661, 0);
				level.createWall(new vec(697, 389), 193, 170, 0);
				level.createWall(new vec(598, -114), 330, 335, 0);
				level.createWall(new vec(740, -91), 150, 662, 0);
				level.createInternalCorner(new vec(75, 82), 0, 0);
				level.createInternalCorner(new vec(112, 298), 0, 0);
				level.createInternalCorner(new vec(210, 40), 0, 0);
				level.createInternalCorner(new vec(598, 40), 1, 0);
				level.createInternalCorner(new vec(598, 120), 2, 0);
				level.createInternalCorner(new vec(578, 170), 1, 0);
				level.createInternalCorner(new vec(740, 221), 1, 0);
				level.createInternalCorner(new vec(740, 389), 2, 0);
				level.createInternalCorner(new vec(697, 431), 2, 0);
				level.createInternalCorner(new vec(383, 383), 2, 0);
				level.createInternalCorner(new vec(317, 431), 2, 0);
				level.createInternalCorner(new vec(578, 431), 3, 0);
				level.createInternalCorner(new vec(75, 162), 3, 0);
				level.createInternalCorner(new vec(162, 202), 3, 0);
				level.createInternalCorner(new vec(495, 346), 3, 0);
				level.createCoin(new vec(521, 48), 0);
				level.createPortal(new vec(734, 309), 6, 80, 0, 1, new vec(-1, 0), true);
				level.createPortal(new vec(111, 351), 6, 80, 0, 1, new vec(1, 0), true);
				level.createPortal(new vec(162, 196), 80, 6, 0, 2, new vec(0, -1));
				level.createPortal(new vec(74, 82), 6, 80, 0, 2, new vec(1, 0), true);
				level.createPortal(new vec(592, 40), 6, 80, 0, 1, new vec(-1, 0), true);
				level.createSpike(new vec(391, 286), 95, 0, new vec(0, -1));

				// ~ layer 1
				level.createWall(new vec(278, 389), 669, 229, 1);
				level.createWall(new vec(278, 383), 313, 235, 1);
				level.createWall(new vec(-87, -74), 974, 114, 1);
				level.createWall(new vec(-99, -102), 211, 684, 1);
				level.createWall(new vec(-99, -102), 377, 283, 1);
				level.createWall(new vec(170, 253), 108, 51, 1);
				level.createWall(new vec(598, -88), 308, 218, 1);
				level.createWall(new vec(445, -102), 95, 185, 1);
				level.createWall(new vec(-115, -102), 488, 232, 1);
				level.createWall(new vec(740, -88), 166, 656, 1);
				level.createWall(new vec(373, 346), 255, 272, 1);
				level.createWall(new vec(373, 330), 40, 84, 1);
				level.createInternalCorner(new vec(373, 40), 0, 1);
				level.createInternalCorner(new vec(278, 130), 0, 1);
				level.createInternalCorner(new vec(112, 181), 0, 1);
				level.createInternalCorner(new vec(540, 40), 0, 1);
				level.createInternalCorner(new vec(598, 40), 1, 1);
				level.createInternalCorner(new vec(445, 40), 1, 1);
				level.createInternalCorner(new vec(740, 130), 1, 1);
				level.createInternalCorner(new vec(740, 389), 2, 1);
				level.createInternalCorner(new vec(373, 383), 2, 1);
				level.createInternalCorner(new vec(628, 389), 3, 1);
				level.createInternalCorner(new vec(413, 346), 3, 1);
				level.createCoin(new vec(420, 55), 1);
				level.createPortal(new vec(373, 40), 6, 80, 1, 2, new vec(1, 0));
				level.createPortal(new vec(540, 340), 80, 6, 1, 2, new vec(0, -1), true);
				level.createSpike(new vec(361, 343), 40, 1, new vec(-1, 0));

				// ~ layer 2
				level.createWall(new vec(242, 398), 735, 250, 2);
				level.createWall(new vec(147, 126), 110, 70, 2);
				level.createWall(new vec(162, -153), 638, 193, 2);
				level.createWall(new vec(-88, -101), 203, 183, 2);
				level.createWall(new vec(-88, 398), 163, 176, 2);
				level.createWall(new vec(-80, 431), 960, 181, 2);
				level.createWall(new vec(-131, -88), 179, 656, 2);
				level.createWall(new vec(-41, 253), 188, 35, 2);
				level.createWall(new vec(379, 221), 100, 93, 2);
				level.createWall(new vec(242, 346), 60, 203, 2);
				level.createWall(new vec(-106, -101), 181, 389, 2);
				level.createWall(new vec(379, -145), 161, 299, 2);
				level.createWall(new vec(394, -145), 538, 277, 2);
				level.createWall(new vec(532, 346), 445, 287, 2);
				level.createWall(new vec(711, -115), 278, 710, 2);
				level.createInternalCorner(new vec(75, 82), 0, 2);
				level.createInternalCorner(new vec(48, 288), 0, 2);
				level.createInternalCorner(new vec(379, 40), 1, 2);
				level.createInternalCorner(new vec(711, 132), 1, 2);
				level.createInternalCorner(new vec(711, 346), 2, 2);
				level.createInternalCorner(new vec(532, 398), 2, 2);
				level.createInternalCorner(new vec(242, 431), 2, 2);
				level.createInternalCorner(new vec(302, 398), 3, 2);
				level.createInternalCorner(new vec(75, 431), 3, 2);
				level.createInternalCorner(new vec(48, 398), 3, 2);
				level.createInternalCorner(new vec(75, 253), 3, 2);
				level.createInternalCorner(new vec(540, 132), 0, 2);
				level.createCoin(new vec(169, 262), 2);

				level.createSpike(new vec(230, 398), 33, 2, new vec(-1, 0));

				return level;
			})(),
		]
	},
	"Machinery": {
		levels: [
			(function initLevel22() {
				let level = World.create(-1, new vec(85, 102), new vec(708, 142));
			
				level.createLayer("#F18A40");
				
				// ~ layer 0
				level.createWall(new vec(410, -81), 130, 642, 0);
				level.createWall(new vec(740, -101), 162, 614, 0);
				level.createWall(new vec(-122, 308), 1044, 253, 0);
				level.createWall(new vec(410, 250), 526, 346, 0);
				level.createWall(new vec(-122, -81), 1044, 141, 0);
				level.createWall(new vec(-93, -81), 153, 619, 0);
				level.createWall(new vec(-106, -101), 646, 187, 0);
				level.createInternalCorner(new vec(60, 86), 0, 0);
				level.createInternalCorner(new vec(410, 86), 1, 0);
				level.createInternalCorner(new vec(740, 60), 1, 0);
				level.createInternalCorner(new vec(540, 60), 0, 0);
				level.createInternalCorner(new vec(740, 250), 2, 0);
				level.createInternalCorner(new vec(540, 250), 3, 0);
				level.createInternalCorner(new vec(60, 308), 3, 0);
				level.createInternalCorner(new vec(410, 308), 2, 0);
				level.createCoin(new vec(92, 260), 0);
				level.createCoin(new vec(656, 150), 0);
				level.createPortal(new vec(540, 94), 6, 80, 0, 1, new vec(1, 0));
				level.createPortal(new vec(284, 302), 80, 6, 0, 1, new vec(0, -1), true);
				level.createSpike(new vec(398, 86), 222, 0, new vec(-1, 0));

				// complex group 1
				var wire0 = level.createWire([ new vec(374, 318), new vec(374, 330), new vec(101, 330), new vec(101, 318) ], 0);
				var piston0 = level.createPiston(new vec(364, 224), 19.99, 83.99, 0, new vec(0, -1)).setDefault(false);
				var button0 = level.createButton(new vec(60, 297), 81.99, 10.99, 0, new vec(0, -1));
				wire0.connectIn(button0);
				wire0.connectOut(piston0);

				// ~ layer 1
				level.createWall(new vec(546, -95), 373, 670, 1);
				level.createWall(new vec(-156, 308), 986, 306, 1);
				level.createWall(new vec(-131, -87), 191, 594, 1);
				level.createWall(new vec(370, 278), 412, 175, 1);
				level.createWall(new vec(-95, 278), 374, 183, 1);
				level.createWall(new vec(-95, -87), 230, 229, 1);
				level.createWall(new vec(-131, -110), 1062, 163, 1);
				level.createInternalCorner(new vec(135, 53), 0, 1);
				level.createInternalCorner(new vec(60, 142), 0, 1);
				level.createInternalCorner(new vec(546, 53), 1, 1);
				level.createInternalCorner(new vec(546, 278), 2, 1);
				level.createInternalCorner(new vec(370, 308), 2, 1);
				level.createInternalCorner(new vec(279, 308), 3, 1);
				level.createInternalCorner(new vec(60, 278), 3, 1);
				level.createCoin(new vec(67, 203), 1);

				level.createSpike(new vec(135, 53), 79, 1, new vec(1, 0));

				return level;
			})(),
			(function initLevel23() {
				let level = World.create(-1, new vec(200, 344), new vec(490, 252));
			
				level.createLayer("#F18A40");
				level.createLayer("#7C5DBE");
				
				// ~ layer 0
				level.createWall(new vec(-94, 376), 977, 216, 0);
				level.createWall(new vec(605, -93), 278, 666, 0);
				level.createWall(new vec(-51, -93), 902, 144, 0);
				level.createWall(new vec(-76, -115), 384, 313, 0);
				level.createWall(new vec(-132, -64), 295, 627, 0);
				level.createInternalCorner(new vec(308, 51), 0, 0);
				level.createInternalCorner(new vec(163, 198), 0, 0);
				level.createInternalCorner(new vec(605, 51), 1, 0);
				level.createInternalCorner(new vec(163, 376), 3, 0);
				level.createInternalCorner(new vec(605, 376), 2, 0);
				level.createPortal(new vec(599, 252), 6, 80, 0, 1, new vec(-1, 0), true);
				level.createPortal(new vec(308, 51), 6, 80, 0, 2, new vec(1, 0));

				// ~ layer 1
				level.createWall(new vec(605, 51), 314, 533, 1);
				level.createWall(new vec(433, -83), 442, 257, 1);
				level.createWall(new vec(-90, -100), 195, 664, 1);
				level.createWall(new vec(-106, -131), 769, 182, 1);
				level.createWall(new vec(-90, 430), 664, 154, 1);
				level.createWall(new vec(341, 332), 519, 252, 1);
				level.createInternalCorner(new vec(105, 51), 0, 1);
				level.createInternalCorner(new vec(433, 51), 1, 1);
				level.createInternalCorner(new vec(605, 174), 1, 1);
				level.createInternalCorner(new vec(605, 332), 2, 1);
				level.createInternalCorner(new vec(341, 430), 2, 1);
				level.createInternalCorner(new vec(105, 430), 3, 1);
				level.createCoin(new vec(112, 236), 1);
				level.createCoin(new vec(506, 259), 1);
				level.createPortal(new vec(427, 51), 6, 80, 1, 2, new vec(-1, 0));
				level.createPortal(new vec(406, 326), 80, 6, 1, 2, new vec(0, -1), true);
				level.createSpike(new vec(105, 174), 141, 1, new vec(1, 0));
				level.createSpike(new vec(105, 418), 236, 1, new vec(0, -1));
				level.createSpike(new vec(593, 174), 78, 1, new vec(-1, 0));

				// complex group 1
				var wire0 = level.createWire([ new vec(92, 296), new vec(72, 296), new vec(72, 13), new vec(468, 13), new vec(468, 130), new vec(487, 130), new vec(487, 159) ], 1);
				var piston0 = level.createPiston(new vec(105, 284), 78, 20, 1, new vec(1, 0)).setDefault(false);
				var button0 = level.createButton(new vec(446, 174), 82, 11, 1, new vec(0, 1));
				wire0.connectIn(button0);
				wire0.connectOut(piston0);

				// ~ layer 2
				level.createWall(new vec(-83, 374), 966, 170, 2);
				level.createWall(new vec(390, 331), 486, 263, 2);
				level.createWall(new vec(486, 260), 432, 328, 2);
				level.createWall(new vec(666, -98), 228, 499, 2);
				level.createWall(new vec(-51, -93), 902, 144, 2);
				level.createWall(new vec(314, -106), 113, 296, 2);
				level.createWall(new vec(-90, -98), 223, 361, 2);
				level.createWall(new vec(-107, -86), 190, 652, 2);
				level.createInternalCorner(new vec(133, 51), 0, 2);
				level.createInternalCorner(new vec(427, 51), 0, 2);
				level.createInternalCorner(new vec(83, 263), 0, 2);
				level.createInternalCorner(new vec(83, 374), 3, 2);
				level.createInternalCorner(new vec(390, 374), 2, 2);
				level.createInternalCorner(new vec(486, 331), 2, 2);
				level.createInternalCorner(new vec(750, 260), 2, 2);
				level.createInternalCorner(new vec(750, 51), 1, 2);
				level.createInternalCorner(new vec(314, 51), 1, 2);
				level.createCoin(new vec(461, 97), 2);

				return level;
			})(),
			(function initLevel24() {
				let level = World.create(-1, new vec(325, 122), new vec(386, 398));
			
				level.createLayer("#F18A40");
				level.createLayer("#7C5DBE");
				
				// ~ layer 0
				level.createWall(new vec(296, 187), 208, 168, 0);
				level.createWall(new vec(-63, 99), 145, 453, 0);
				level.createWall(new vec(648, 232), 245, 320, 0);
				level.createWall(new vec(706, -112), 212, 456, 0);
				level.createWall(new vec(37, -150), 467, 237, 0);
				level.createWall(new vec(406, -150), 460, 252, 0);
				level.createWall(new vec(406, -62), 98, 417, 0);
				level.createWall(new vec(-91, -86), 290, 318, 0);
				level.createWall(new vec(-73, 440), 435, 117, 0);
				level.createWall(new vec(573, 430), 320, 127, 0);
				level.createWall(new vec(296, 187), 90, 378, 0);
				level.createInternalCorner(new vec(82, 232), 0, 0);
				level.createInternalCorner(new vec(199, 87), 0, 0);
				level.createInternalCorner(new vec(504, 102), 0, 0);
				level.createInternalCorner(new vec(406, 87), 1, 0);
				level.createInternalCorner(new vec(406, 187), 2, 0);
				level.createInternalCorner(new vec(706, 102), 1, 0);
				level.createInternalCorner(new vec(386, 355), 0, 0);
				level.createInternalCorner(new vec(82, 440), 3, 0);
				level.createInternalCorner(new vec(296, 440), 2, 0);
				level.createInternalCorner(new vec(648, 430), 2, 0);
				level.createInternalCorner(new vec(706, 232), 2, 0);
				level.createCoin(new vec(271, 287), 0);
				level.createPortal(new vec(503, 200), 6, 80, 0, 1, new vec(1, 0), true);
				level.createPortal(new vec(81, 360), 6, 80, 0, 2, new vec(1, 0), true);

				// complex group 1
				var wire0 = level.createWire([ new vec(183, 197), new vec(170, 197), new vec(170, 138), new vec(183, 138) ], 0);
				var piston0 = level.createPiston(new vec(199, 187), 97, 21, 0, new vec(1, 0)).setDefault(false);
				var button0 = level.createButton(new vec(199, 97), 11, 82, 0, new vec(1, 0));
				button0.singlePress = false;
				wire0.connectIn(button0);
				wire0.connectOut(piston0);

				// ~ layer 1
				level.createWall(new vec(248, -95), 256, 410, 1);
				level.createWall(new vec(-84, 239), 184, 333, 1);
				level.createWall(new vec(735, 71), 219, 529, 1);
				level.createWall(new vec(687, 42), 267, 206, 1);
				level.createWall(new vec(-131, -80), 526, 180, 1);
				level.createWall(new vec(325, -103), 600, 303, 1);
				level.createWall(new vec(-161, -85), 201, 459, 1);
				level.createWall(new vec(-84, 430), 282, 152, 1);
				level.createCoin(new vec(600, 406), 1);
				level.createInternalCorner(new vec(504, 200), 0, 1);
				level.createInternalCorner(new vec(687, 200), 1, 1);
				level.createInternalCorner(new vec(735, 248), 1, 1);
				level.createInternalCorner(new vec(100, 430), 3, 1);
				level.createInternalCorner(new vec(248, 100), 1, 1);
				level.createInternalCorner(new vec(40, 100), 0, 1);
				level.createInternalCorner(new vec(40, 239), 3, 1);
				level.createPortal(new vec(242, 207), 6, 100, 1, 2, new vec(-1, 0));

				// complex group 1
				var wire1 = level.createWire([ new vec(142, 86), new vec(142, 60), new vec(777, 60), new vec(777, 413), new vec(748, 413) ], 1);
				var piston1 = level.createPiston(new vec(687, 404), 48, 19, 1, new vec(-1, 0)).setDefault(false);
				var button1 = level.createButton(new vec(100, 100), 82, 11, 1, new vec(0, 1));
				wire1.connectIn(button1);
				wire1.connectOut(piston1);

				// ~ layer 2
				level.createWall(new vec(-96, -85), 474, 292, 2);
				level.createWall(new vec(-86, 128), 168, 448, 2);
				level.createWall(new vec(-73, 80), 315, 247, 2);
				level.createWall(new vec(360, 307), 44, 238, 2);
				level.createWall(new vec(360, 352), 395, 181, 2);
				level.createWall(new vec(624, -79), 295, 638, 2);
				level.createWall(new vec(574, -65), 158, 237, 2);
				level.createCoin(new vec(378, 274), 2);
				level.createInternalCorner(new vec(242, 207), 0, 2);
				level.createInternalCorner(new vec(82, 327), 0, 2);
				level.createInternalCorner(new vec(404, 352), 3, 2);
				level.createInternalCorner(new vec(624, 352), 2, 2);
				level.createInternalCorner(new vec(624, 172), 1, 2);

				return level;
			})(),
		]
	},
	"Intermission": {
		levels: [
			(function initLevel25() {
				let level = World.create(-1, new vec(50, 321), new vec(384, 182));
			
				level.createLayer("#F18A40");
				level.createLayer("#7C5DBE");
				
				// ~ layer 0
				level.createWall(new vec(-105, -108), 285, 353, 0);
				level.createWall(new vec(-105, 398), 268, 189, 0);
				level.createWall(new vec(459, 402), 464, 185, 0);
				level.createWall(new vec(104, -130), 355, 162, 0);
				level.createWall(new vec(361, -72), 98, 192, 0);
				level.createWall(new vec(-84, 118), 134, 428, 0);
				level.createWall(new vec(737, 321), 168, 210, 0);
				level.createWall(new vec(737, -101), 215, 217, 0);
				level.createWall(new vec(689, -130), 205, 189, 0);
				level.createWall(new vec(333, -125), 508, 149, 0);
				level.createInternalCorner(new vec(180, 32), 0, 0);
				level.createInternalCorner(new vec(50, 245), 0, 0);
				level.createInternalCorner(new vec(459, 24), 0, 0);
				level.createInternalCorner(new vec(689, 24), 1, 0);
				level.createInternalCorner(new vec(361, 32), 1, 0);
				level.createInternalCorner(new vec(737, 59), 1, 0);
				level.createInternalCorner(new vec(50, 398), 3, 0);
				level.createInternalCorner(new vec(737, 402), 2, 0);
				level.createCoin(new vec(330, 90), 0);
				level.createPortal(new vec(179, 72), 6, 80, 0, 2, new vec(1, 0), true);
				level.createPortal(new vec(657, 396), 80, 6, 0, 1, new vec(0, -1), true);
				level.createSpike(new vec(745, 116), 71, 0, new vec(0, 1));
				level.createSpike(new vec(745, 309), 71, 0, new vec(0, -1));

				// complex group 1
				var wire0 = level.createWire([ new vec(427, 107), new vec(427, 68), new vec(443, 68) ], 0);
				var piston0 = level.createPiston(new vec(416, 120), 20.99, 96.99, 0, new vec(0, 1)).setDefault(false);
				var button0 = level.createButton(new vec(459, 27), 10.99, 81.99, 0, new vec(1, 0));
				wire0.connectIn(button0);
				wire0.connectOut(piston0);

				// ~ layer 1
				level.createWall(new vec(-100, -109), 191, 221, 1);
				level.createWall(new vec(-92, -118), 556, 176, 1);
				level.createWall(new vec(309, -90), 139, 243, 1);
				level.createWall(new vec(-92, -41), 147, 555, 1);
				level.createWall(new vec(-92, 402), 196, 148, 1);
				level.createWall(new vec(583, 402), 316, 187, 1);
				level.createWall(new vec(443, 434), 303, 147, 1);
				level.createWall(new vec(360, 463), 243, 131, 1);
				level.createWall(new vec(-12, 434), 199, 131, 1);
				level.createWall(new vec(214, 247), 109, 81, 1);
				level.createWall(new vec(737, -90), 156, 283, 1);
				level.createWall(new vec(615, -109), 302, 229, 1);
				level.createWall(new vec(309, -118), 502, 190, 1);
				level.createCoin(new vec(664, 270), 1);
				level.createInternalCorner(new vec(91, 58), 0, 1);
				level.createInternalCorner(new vec(448, 72), 0, 1);
				level.createInternalCorner(new vec(55, 112), 0, 1);
				level.createInternalCorner(new vec(55, 402), 3, 1);
				level.createInternalCorner(new vec(104, 434), 3, 1);
				level.createInternalCorner(new vec(443, 463), 2, 1);
				level.createInternalCorner(new vec(583, 434), 2, 1);
				level.createInternalCorner(new vec(737, 120), 1, 1);
				level.createInternalCorner(new vec(615, 72), 1, 1);
				level.createInternalCorner(new vec(309, 58), 1, 1);
				level.createPortal(new vec(229, 241), 80, 6, 1, 2, new vec(0, -1));
				level.createSpike(new vec(448, 72), 76, 1, new vec(0, 1));
				level.createSpike(new vec(91, 58), 218, 1, new vec(0, 1));
				level.createSpike(new vec(55, 112), 135, 1, new vec(1, 0));

				// ~ layer 2
				level.createWall(new vec(-84, -106), 264, 390, 2);
				level.createWall(new vec(-84, 36), 221, 543, 2);
				level.createWall(new vec(629, 389), 254, 190, 2);
				level.createWall(new vec(704, -99), 226, 383, 2);
				level.createWall(new vec(735, 137), 160, 405, 2);
				level.createWall(new vec(-49, 431), 448, 139, 2);
				level.createWall(new vec(25, 389), 155, 151, 2);
				level.createWall(new vec(137, 463), 746, 132, 2);
				level.createWall(new vec(537, -94), 313, 162, 2);
				level.createWall(new vec(0, 162), 322, 79, 2);
				level.createWall(new vec(0, -117), 640, 171, 2);
				level.createInternalCorner(new vec(180, 162), 3, 2);
				level.createInternalCorner(new vec(137, 389), 3, 2);
				level.createInternalCorner(new vec(180, 431), 3, 2);
				level.createInternalCorner(new vec(399, 463), 3, 2);
				level.createInternalCorner(new vec(735, 389), 2, 2);
				level.createInternalCorner(new vec(629, 463), 2, 2);
				level.createInternalCorner(new vec(180, 54), 0, 2);
				level.createInternalCorner(new vec(180, 241), 0, 2);
				level.createInternalCorner(new vec(137, 284), 0, 2);
				level.createInternalCorner(new vec(735, 284), 1, 2);
				level.createInternalCorner(new vec(704, 68), 1, 2);
				level.createInternalCorner(new vec(537, 54), 1, 2);
				level.createCoin(new vec(406, 291), 2);

				level.createSpike(new vec(496, 451), 133, 2, new vec(0, -1));

				// complex group 1
				var wire2 = level.createWire([ new vec(588, 29), new vec(730, 29), new vec(730, 108), new vec(719, 108) ], 2);
				var wire1 = level.createWire([ new vec(588, 29), new vec(415, 29), new vec(415, 36) ], 2);
				var wire0 = level.createWire([ new vec(588, 29), new vec(588, 56) ], 2);
				var piston0 = level.createPiston(new vec(404, 54), 20.99, 65.99, 2, new vec(0, 1)).setDefault(false);
				var button1 = level.createButton(new vec(693, 68), 10.99, 81.99, 2, new vec(-1, 0));
				button1.singlePress = false;
				var button0 = level.createButton(new vec(547, 68), 81.99, 10.99, 2, new vec(0, 1));
				button0.singlePress = false;

				wire0.connectIn(button0);
				wire1.connectIn(wire0);
				wire1.connectIn(wire2);
				wire1.connectOut(piston0);
				wire2.connectIn(button1);
				piston0.setMaxPower(1);

				return level;
			})(),
			(function initLevel27() {
				let level = World.create(-1, new vec(686, 195), new vec(508, 398));
			
				level.createLayer("#F18A40");
				level.createLayer("#7C5DBE");
				
				// ~ layer 0
				level.createWall(new vec(229, 291), 216, 288, 0);
				level.createWall(new vec(-32, 385), 477, 206, 0);
				level.createWall(new vec(50, 0), 211, 50, 0);
				level.createWall(new vec(-150, -124), 450, 238, 0);
				level.createWall(new vec(-108, -81), 175, 479, 0);
				level.createWall(new vec(385, 146), 66, 49, 0);
				level.createWall(new vec(-100, 227), 217, 327, 0);
				level.createWall(new vec(-113, -104), 461, 170, 0);
				level.createWall(new vec(529, -87), 371, 153, 0);
				level.createWall(new vec(-59, -99), 918, 133, 0);
				level.createWall(new vec(667, -99), 233, 243, 0);
				level.createWall(new vec(718, -81), 242, 651, 0);
				level.createWall(new vec(-100, 430), 1000, 149, 0);
				level.createWall(new vec(595, 291), 329, 294, 0);
				level.createInternalCorner(new vec(348, 34), 0, 0);
				level.createInternalCorner(new vec(300, 66), 0, 0);
				level.createInternalCorner(new vec(67, 114), 0, 0);
				level.createInternalCorner(new vec(529, 34), 1, 0);
				level.createInternalCorner(new vec(667, 66), 1, 0);
				level.createInternalCorner(new vec(718, 144), 1, 0);
				level.createInternalCorner(new vec(718, 291), 2, 0);
				level.createInternalCorner(new vec(595, 430), 2, 0);
				level.createInternalCorner(new vec(445, 430), 3, 0);
				level.createInternalCorner(new vec(229, 385), 2, 0);
				level.createInternalCorner(new vec(117, 385), 3, 0);
				level.createInternalCorner(new vec(67, 227), 3, 0);
				level.createCoin(new vec(431, 42), 0);
				level.createPortal(new vec(300, 285), 80, 6, 0, 1, new vec(0, -1), true);
				level.createPortal(new vec(117, 113), 100, 6, 0, 2, new vec(0, 1), true);
				level.createSpike(new vec(117.005, 234.005), 67.99, 0, new vec(1, 0));

				// complex group 1
				var wire0 = level.createWire([ new vec(239, 342), new vec(248, 342), new vec(248, 302), new vec(433, 302) ], 0);
				var piston0 = level.createPiston(new vec(445, 291), 149.99, 20.99, 0, new vec(1, 0));
				var button0 = level.createButton(new vec(218, 301), 10.99, 81.99, 0, new vec(-1, 0));

				wire0.connectIn(button0);
				wire0.connectOut(piston0);

				// ~ layer 1
				level.createWall(new vec(-116, 430), 1032, 194, 1);
				level.createWall(new vec(-110, -99), 458, 199, 1);
				level.createWall(new vec(-134, -91), 290, 241, 1);
				level.createWall(new vec(-116, -99), 220, 678, 1);
				level.createWall(new vec(1, 291), 155, 189, 1);
				level.createWall(new vec(-75, -99), 658, 149, 1);
				level.createWall(new vec(683, -91), 398, 662, 1);
				level.createWall(new vec(583, 344), 449, 287, 1);
				level.createWall(new vec(-110, 291), 530, 312, 1);
				level.createWall(new vec(420, 137), 83, 72, 1);
				level.createInternalCorner(new vec(156, 100), 0, 1);
				level.createInternalCorner(new vec(104, 150), 0, 1);
				level.createInternalCorner(new vec(348, 50), 0, 1);
				level.createInternalCorner(new vec(683, 344), 2, 1);
				level.createInternalCorner(new vec(583, 430), 2, 1);
				level.createInternalCorner(new vec(420, 430), 3, 1);
				level.createInternalCorner(new vec(104, 291), 3, 1);
				level.createCoin(new vec(453, 108), 1);
				level.createPortal(new vec(677, 209), 6, 100, 1, 2, new vec(-1, 0), true);
				level.createSpike(new vec(104.005, 150.005), 140.99, 1, new vec(1, 0));

				// ~ layer 2
				level.createWall(new vec(-117, 430), 1034, 132, 2);
				level.createWall(new vec(421, -113), 541, 213, 2);
				level.createWall(new vec(-147, -113), 432, 227, 2);
				level.createWall(new vec(-123, -94), 240, 668, 2);
				level.createWall(new vec(683, -113), 222, 706, 2);
				level.createWall(new vec(240, 146), 112, 108, 2);
				level.createWall(new vec(-178, 338), 330, 293, 2);
				level.createWall(new vec(453, 269), 84, 276, 2);
				level.createWall(new vec(453, 309), 495, 284, 2);
				level.createWall(new vec(240, 100), 45, 59, 2);
				level.createInternalCorner(new vec(117, 114), 0, 2);
				level.createInternalCorner(new vec(240, 114), 1, 2);
				level.createInternalCorner(new vec(117, 338), 3, 2);
				level.createInternalCorner(new vec(152, 430), 3, 2);
				level.createInternalCorner(new vec(537, 309), 3, 2);
				level.createInternalCorner(new vec(285, 146), 3, 2);
				level.createInternalCorner(new vec(683, 100), 1, 2);
				level.createInternalCorner(new vec(683, 309), 2, 2);
				level.createInternalCorner(new vec(453, 430), 2, 2);
				level.createCoin(new vec(428, 375), 2);

				level.createSpike(new vec(574, 100), 109, 2, new vec(0, 1));
				level.createSpike(new vec(117, 260), 78, 2, new vec(1, 0));
				level.createSpike(new vec(441, 338), 92, 2, new vec(-1, 0));
				level.createSpike(new vec(462, 257), 65, 2, new vec(0, -1));

				// complex group 2
				var wire2 = level.createWire([ new vec(245, 218), new vec(252, 218) ], 2);
				var wire1 = level.createWire([ new vec(262, 200), new vec(262, 105), new vec(273, 105) ], 2);
				var wire0 = level.createWire([ new vec(252, 245), new vec(252, 200), new vec(337, 200) ], 2);
				var piston1 = level.createPiston(new vec(152, 204), 87.98, 20.98, 2, new vec(-1, 0));
				var piston0 = level.createPiston(new vec(240, 254), 20.98, 83.98, 2, new vec(0, 1)).setDefault(false);
				var button1 = level.createButton(new vec(285, 64), 10.98, 81.98, 2, new vec(1, 0));
				var button0 = level.createButton(new vec(352, 159), 10.98, 81.98, 2, new vec(1, 0));

				wire0.connectIn(button0);
				wire0.connectIn(wire1);
				wire0.connectOut(piston0);
				wire0.connectOut(wire2);
				wire2.connectOut(piston1);
				wire1.connectIn(button1);

				return level;
			})(),
			(function initLevel26() {
				let level = World.create(-1, new vec(557, 149), new vec(166, 280));
			
				level.createLayer("#F18A40");
				level.createLayer("#7C5DBE");
				
				// ~ layer 0
				level.createWall(new vec(-96, -126), 166, 662, 0);
				level.createWall(new vec(-105, -101), 1010, 193, 0);
				level.createWall(new vec(618, -91), 287, 654, 0);
				level.createWall(new vec(520, 297), 405, 311, 0);
				level.createWall(new vec(-105, 410), 358, 153, 0);
				level.createWall(new vec(-77, 448), 982, 130, 0);
				level.createWall(new vec(462, 385), 284, 188, 0);
				level.createWall(new vec(198, 194), 184, 124, 0);
				level.createWall(new vec(310, -41), 72, 359, 0);
				level.createInternalCorner(new vec(70, 92), 0, 0);
				level.createInternalCorner(new vec(382, 92), 0, 0);
				level.createInternalCorner(new vec(618, 92), 1, 0);
				level.createInternalCorner(new vec(310, 92), 1, 0);
				level.createInternalCorner(new vec(618, 297), 2, 0);
				level.createInternalCorner(new vec(462, 448), 2, 0);
				level.createInternalCorner(new vec(520, 385), 2, 0);
				level.createInternalCorner(new vec(310, 194), 2, 0);
				level.createInternalCorner(new vec(70, 410), 3, 0);
				level.createInternalCorner(new vec(253, 448), 3, 0);
				level.createCoin(new vec(388, 420), 0);
				level.createPortal(new vec(533, 291), 80, 6, 0, 1, new vec(0, -1), true);
				level.createPortal(new vec(440, 91), 80, 6, 0, 1, new vec(0, 1), true);
				level.createPortal(new vec(69, 92), 6, 70, 0, 2, new vec(1, 0), true);
				level.createSpike(new vec(79, 92), 119, 0, new vec(0, 1));

				// complex group 1
				var wire3 = level.createWire([ new vec(364, 302), new vec(370, 307) ], 0);
				var wire2 = level.createWire([ new vec(364, 303), new vec(270, 303) ], 0);
				var wire1 = level.createWire([ new vec(322, 136), new vec(364, 136), new vec(364, 302) ], 0);
				var wire0 = level.createWire([ new vec(270, 311), new vec(270, 303), new vec(210, 303), new vec(210, 204) ], 0);
				var piston1 = level.createPiston(new vec(382, 297), 137.99, 20.99, 0, new vec(1, 0)).setDefault(false);
				var piston0 = level.createPiston(new vec(198, 92), 20.99, 101.99, 0, new vec(0, -1)).setDefault(false);
				var button1 = level.createButton(new vec(299, 95), 10.99, 81.99, 0, new vec(-1, 0));
				var button0 = level.createButton(new vec(228, 318), 81.99, 10.99, 0, new vec(0, 1));
				wire0.connectIn(button0);
				wire0.connectOut(piston0);
				wire0.connectOut(wire2);
				wire2.connectOut(wire3);
				wire1.connectOut(wire3);
				wire3.connectOut(piston1);
				wire1.connectIn(button1);

				// ~ layer 1
				level.createWall(new vec(382, -109), 526, 201, 1);
				level.createWall(new vec(-86, -87), 225, 296, 1);
				level.createWall(new vec(-144, 12), 252, 535, 1);
				level.createWall(new vec(617, 267), 321, 329, 1);
				level.createWall(new vec(666, -87), 282, 672, 1);
				level.createWall(new vec(-110, -87), 709, 147, 1);
				level.createWall(new vec(520, 297), 287, 323, 1);
				level.createWall(new vec(-144, 372), 570, 232, 1);
				level.createWall(new vec(170, 398), 584, 206, 1);
				level.createInternalCorner(new vec(139, 60), 0, 1);
				level.createInternalCorner(new vec(108, 209), 0, 1);
				level.createInternalCorner(new vec(382, 60), 1, 1);
				level.createInternalCorner(new vec(666, 92), 1, 1);
				level.createInternalCorner(new vec(666, 267), 2, 1);
				level.createInternalCorner(new vec(617, 297), 2, 1);
				level.createInternalCorner(new vec(520, 398), 2, 1);
				level.createInternalCorner(new vec(426, 398), 3, 1);
				level.createInternalCorner(new vec(108, 372), 3, 1);
				level.createCoin(new vec(488, 342), 1);
				level.createPortal(new vec(302, 366), 80, 6, 1, 2, new vec(0, -1), true);

				// complex group 2
				var wire0 = level.createWire([ new vec(676, 226), new vec(683, 226), new vec(683, 325), new vec(545, 325), new vec(545, 383), new vec(532, 383) ], 1);
				var piston0 = level.createPiston(new vec(426, 372), 93.98, 20.98, 1, new vec(-1, 0)).setDefault(false);
				var button0 = level.createButton(new vec(655, 185), 10.98, 81.98, 1, new vec(-1, 0));
				wire0.connectIn(button0);
				wire0.connectOut(piston0);

				// ~ layer 2
				level.createWall(new vec(487, -149), 358, 241, 2);
				level.createWall(new vec(-90, -140), 792, 185, 2);
				level.createWall(new vec(-141, -87), 211, 487, 2);
				level.createWall(new vec(-141, 173), 249, 416, 2);
				level.createWall(new vec(196, 142), 146, 103, 2);
				level.createWall(new vec(-103, -149), 211, 230, 2);
				level.createWall(new vec(603, -140), 377, 760, 2);
				level.createWall(new vec(541, 245), 377, 375, 2);
				level.createWall(new vec(-160, 372), 577, 261, 2);
				level.createWall(new vec(106, 440), 817, 164, 2);
				level.createInternalCorner(new vec(108, 45), 0, 2);
				level.createInternalCorner(new vec(70, 81), 0, 2);
				level.createInternalCorner(new vec(487, 45), 1, 2);
				level.createInternalCorner(new vec(603, 92), 1, 2);
				level.createInternalCorner(new vec(541, 440), 2, 2);
				level.createInternalCorner(new vec(603, 245), 2, 2);
				level.createInternalCorner(new vec(417, 440), 3, 2);
				level.createInternalCorner(new vec(108, 372), 3, 2);
				level.createInternalCorner(new vec(70, 173), 3, 2);
				level.createCoin(new vec(462, 220), 2);

				level.createSpike(new vec(417, 428), 124, 2, new vec(0, -1));

				return level;
			})(),
		]
	},
	"Automation": {
		levels: [
			(function initLevel28() {
				let level = World.create(-1, new vec(702, 288), new vec(302, 230));
			
				level.createLayer("#F18A40");
				level.createLayer("#7C5DBE");
				
				// ~ layer 0
				level.createWall(new vec(750, -74), 142, 628, 0);
				level.createWall(new vec(690, 230), 110, 58, 0);
				level.createWall(new vec(734, 230), 183, 363, 0);
				level.createWall(new vec(158, 356), 276, 223, 0);
				level.createWall(new vec(158, 324), 86, 299, 0);
				level.createWall(new vec(334, 178), 52, 52, 0);
				level.createWall(new vec(158, 210), 52, 52, 0);
				level.createWall(new vec(-144, 377), 488, 216, 0);
				level.createWall(new vec(-127, -82), 159, 644, 0);
				level.createWall(new vec(-92, -123), 984, 163, 0);
				level.createWall(new vec(-121, -123), 203, 266, 0);
				level.createWall(new vec(-63, -139), 407, 199, 0);
				level.createWall(new vec(-80, 440), 960, 153, 0);
				level.createWall(new vec(639, -114), 267, 250, 0);
				level.createInternalCorner(new vec(82, 60), 0, 0);
				level.createInternalCorner(new vec(32, 143), 0, 0);
				level.createInternalCorner(new vec(344, 40), 0, 0);
				level.createInternalCorner(new vec(639, 40), 1, 0);
				level.createInternalCorner(new vec(750, 136), 1, 0);
				level.createInternalCorner(new vec(734, 288), 1, 0);
				level.createInternalCorner(new vec(734, 440), 2, 0);
				level.createInternalCorner(new vec(434, 440), 3, 0);
				level.createInternalCorner(new vec(244, 356), 3, 0);
				level.createInternalCorner(new vec(32, 377), 3, 0);
				level.createInternalCorner(new vec(158, 377), 2, 0);
				level.createInternalCorner(new vec(750, 230), 2, 0);
				level.createCoin(new vec(133, 151), 0);
				level.createPortal(new vec(386, 39), 80, 6, 0, 1, new vec(0, 1), true);
				level.createPortal(new vec(118, 59), 80, 6, 0, 1, new vec(0, 1), true);
				level.createPortal(new vec(744, 143), 6, 80, 0, 2, new vec(-1, 0), true);
				level.createSpike(new vec(319, 344), 107, 0, new vec(0, -1));
				level.createSpike(new vec(434, 428), 300, 0, new vec(0, -1));

				// ~ layer 1
				level.createWall(new vec(595, 265), 396, 373, 1);
				level.createWall(new vec(418, 376), 493, 262, 1);
				level.createWall(new vec(-118, 376), 383, 224, 1);
				level.createWall(new vec(-105, -143), 975, 183, 1);
				level.createWall(new vec(543, -112), 380, 225, 1);
				level.createWall(new vec(639, -92), 339, 646, 1);
				level.createWall(new vec(208, -112), 135, 360, 1);
				level.createWall(new vec(-105, -103), 212, 313, 1);
				level.createWall(new vec(-105, -143), 491, 203, 1);
				level.createWall(new vec(-144, -112), 220, 704, 1);
				level.createWall(new vec(-101, 446), 1002, 146, 1);
				level.createInternalCorner(new vec(107, 60), 0, 1);
				level.createInternalCorner(new vec(76, 210), 0, 1);
				level.createInternalCorner(new vec(76, 376), 3, 1);
				level.createInternalCorner(new vec(265, 446), 3, 1);
				level.createInternalCorner(new vec(418, 446), 2, 1);
				level.createInternalCorner(new vec(595, 376), 2, 1);
				level.createInternalCorner(new vec(639, 265), 2, 1);
				level.createInternalCorner(new vec(639, 113), 1, 1);
				level.createInternalCorner(new vec(543, 40), 1, 1);
				level.createInternalCorner(new vec(386, 40), 0, 1);
				level.createInternalCorner(new vec(343, 60), 0, 1);
				level.createInternalCorner(new vec(208, 60), 1, 1);
				level.createCoin(new vec(181, 300), 1);
				level.createPortal(new vec(300, 440), 80, 6, 1, 2, new vec(0, -1), true);
				level.createSpike(new vec(265, 389), 57, 1, new vec(1, 0));
				level.createSpike(new vec(406, 389), 57, 1, new vec(-1, 0));

				// complex group 1
				var wire0 = level.createWire([ new vec(96, 199), new vec(53, 199), new vec(53, 337) ], 1);
				var wire1 = level.createWire([ new vec(437, 387), new vec(424, 387) ], 1);
				var wire2 = level.createWire([ new vec(66, 337), new vec(53, 337), new vec(53, 465), new vec(437, 465), new vec(437, 387) ], 1);
				var wire3 = level.createWire([ new vec(648, 155), new vec(661, 155), new vec(661, 387), new vec(437, 387) ], 1);
				var piston1 = level.createPiston(new vec(107, 189), 100.99, 20.99, 1, new vec(1, 0)).setDefault(false);
				var piston0 = level.createPiston(new vec(265, 376), 153, 21, 1, new vec(-1, 0));
				var button1 = level.createButton(new vec(628, 113), 10.99, 81.99, 1, new vec(-1, 0));
				var button0 = level.createButton(new vec(76, 294), 10.99, 81.99, 1, new vec(1, 0));
				piston0.setMaxPower(1);
				wire0.connectOut(piston1);
				wire0.connectIn(button0);
				wire0.connectOut(wire2);
				wire1.connectOut(piston0);
				wire1.connectIn(wire2);
				wire3.connectOut(wire1);
				wire3.connectIn(button1);

				// ~ layer 2
				level.createWall(new vec(382, 285), 151, 378, 2);
				level.createWall(new vec(391, 411), 541, 252, 2);
				level.createWall(new vec(717, 223), 215, 409, 2);
				level.createWall(new vec(-121, 406), 322, 218, 2);
				level.createWall(new vec(-162, 372), 251, 238, 2);
				level.createWall(new vec(657, -114), 266, 257, 2);
				level.createWall(new vec(750, -133), 260, 629, 2);
				level.createWall(new vec(-99, -114), 236, 305, 2);
				level.createWall(new vec(-121, -133), 299, 224, 2);
				level.createWall(new vec(49, -133), 668, 184, 2);
				level.createWall(new vec(533, -93), 390, 184, 2);
				level.createWall(new vec(-162, -133), 251, 413, 2);
				level.createWall(new vec(-229, 14), 287, 628, 2);
				level.createWall(new vec(-215, 446), 864, 203, 2);
				level.createInternalCorner(new vec(178, 51), 0, 2);
				level.createInternalCorner(new vec(137, 91), 0, 2);
				level.createInternalCorner(new vec(89, 191), 0, 2);
				level.createInternalCorner(new vec(58, 280), 0, 2);
				level.createInternalCorner(new vec(58, 372), 3, 2);
				level.createInternalCorner(new vec(89, 406), 3, 2);
				level.createInternalCorner(new vec(201, 446), 3, 2);
				level.createInternalCorner(new vec(533, 411), 3, 2);
				level.createInternalCorner(new vec(533, 51), 1, 2);
				level.createInternalCorner(new vec(657, 91), 1, 2);
				level.createInternalCorner(new vec(750, 143), 1, 2);
				level.createInternalCorner(new vec(750, 223), 2, 2);
				level.createInternalCorner(new vec(717, 411), 2, 2);
				level.createInternalCorner(new vec(382, 446), 2, 2);
				level.createCoin(new vec(632, 198), 2);

				level.createSpike(new vec(370, 331), 115, 2, new vec(-1, 0));
				level.createSpike(new vec(705, 242), 111, 2, new vec(-1, 0));

				// complex group 1
				var wire0 = level.createWire([ new vec(525, 371), new vec(515, 371), new vec(515, 296), new vec(391, 296) ], 2);
				var piston0 = level.createPiston(new vec(334, 285), 47.99, 20.99, 2, new vec(-1, 0)).setDefault(false);
				var button0 = level.createButton(new vec(533, 329), 10.99, 81.99, 2, new vec(1, 0));
				wire0.connectIn(button0);
				wire0.connectOut(piston0);

				return level;
			})(),
			(function initLevel29() {
				let level = World.create(-1, new vec(91, 398), new vec(326, 348));
			
				level.createLayer("#F18A40");
				level.createLayer("#7C5DBE");
				
				// ~ layer 0
				level.createWall(new vec(-128, 223), 219, 359, 0);
				level.createWall(new vec(-146, -145), 212, 739, 0);
				level.createWall(new vec(60, -228), 591, 280, 0);
				level.createWall(new vec(210, -200), 723, 263, 0);
				level.createWall(new vec(-86, -122), 520, 204, 0);
				level.createWall(new vec(260, 380), 229, 251, 0);
				level.createWall(new vec(619, 300), 395, 369, 0);
				level.createWall(new vec(733, -153), 231, 735, 0);
				level.createWall(new vec(651, -145), 351, 286, 0);
				level.createWall(new vec(260, 396), 765, 253, 0);
				level.createWall(new vec(-158, 430), 1100, 191, 0);
				level.createInternalCorner(new vec(66, 82), 0, 0);
				level.createInternalCorner(new vec(434, 63), 0, 0);
				level.createInternalCorner(new vec(651, 63), 1, 0);
				level.createInternalCorner(new vec(733, 141), 1, 0);
				level.createInternalCorner(new vec(733, 300), 2, 0);
				level.createInternalCorner(new vec(619, 396), 2, 0);
				level.createInternalCorner(new vec(489, 396), 3, 0);
				level.createInternalCorner(new vec(260, 430), 2, 0);
				level.createInternalCorner(new vec(91, 430), 3, 0);
				level.createInternalCorner(new vec(66, 223), 3, 0);
				level.createCoin(new vec(496, 228), 0);
				level.createCoin(new vec(390, 356), 0);
				level.createPortal(new vec(441, 62), 90, 6, 0, 2, new vec(0, 1), true);
				level.createPortal(new vec(613, 316), 6, 80, 0, 2, new vec(-1, 0), true);
				level.createPortal(new vec(90, 268), 6, 80, 0, 1, new vec(1, 0), true);
				level.createPortal(new vec(727, 143), 6, 80, 0, 1, new vec(-1, 0), true);
				level.createSpike(new vec(569, 63), 82, 0, new vec(0, 1));

				// complex group 1
				var wire0 = level.createWire([ new vec(531, 403), new vec(531, 424), new vec(369, 424), new vec(369, 387) ], 0);
				var piston0 = level.createPiston(new vec(358, 310), 20.99, 69.99, 0, new vec(0, -1)).setDefault(false);
				var button0 = level.createButton(new vec(490, 385), 81.99, 10.99, 0, new vec(0, -1));
				button0.singlePress = false;
				wire0.connectIn(button0);
				wire0.connectOut(piston0);

				// ~ layer 1
				level.createWall(new vec(215, -154), 377, 217, 1);
				level.createWall(new vec(-141, -141), 595, 177, 1);
				level.createWall(new vec(393, -86), 155, 277, 1);
				level.createWall(new vec(733, -50), 226, 631, 1);
				level.createWall(new vec(680, -116), 259, 257, 1);
				level.createWall(new vec(440, -101), 474, 174, 1);
				level.createWall(new vec(459, 273), 480, 360, 1);
				level.createWall(new vec(-117, -130), 208, 744, 1);
				level.createWall(new vec(215, 300), 91, 293, 1);
				level.createWall(new vec(91, 396), 516, 246, 1);
				level.createWall(new vec(393, 300), 207, 293, 1);
				level.createWall(new vec(-141, 348), 447, 285, 1);
				level.createInternalCorner(new vec(91, 36), 0, 1);
				level.createInternalCorner(new vec(215, 36), 1, 1);
				level.createInternalCorner(new vec(393, 63), 1, 1);
				level.createInternalCorner(new vec(548, 73), 0, 1);
				level.createInternalCorner(new vec(680, 73), 1, 1);
				level.createInternalCorner(new vec(733, 141), 1, 1);
				level.createInternalCorner(new vec(733, 273), 2, 1);
				level.createInternalCorner(new vec(459, 300), 2, 1);
				level.createInternalCorner(new vec(393, 396), 2, 1);
				level.createInternalCorner(new vec(306, 396), 3, 1);
				level.createInternalCorner(new vec(215, 348), 2, 1);
				level.createInternalCorner(new vec(91, 348), 3, 1);
				level.createCoin(new vec(317, 73), 1);
				level.createPortal(new vec(310, 390), 80, 6, 1, 2, new vec(0, -1), true);
				level.createSpike(new vec(469, 261), 79, 1, new vec(0, -1));
				level.createSpike(new vec(91, 336), 75, 1, new vec(0, -1));

				// complex group 1
				var wire1 = level.createWire([ new vec(480, 54), new vec(480, 183) ], 1);
				var wire0 = level.createWire([ new vec(223, 53), new vec(593, 53), new vec(593, 64) ], 1);
				var piston1 = level.createPiston(new vec(469, 191), 20.99, 81.99, 1, new vec(0, 1));
				var piston0 = level.createPiston(new vec(91, 42), 123.99, 20.99, 1, new vec(-1, 0));
				var button0 = level.createButton(new vec(551, 73), 81.99, 10.99, 1, new vec(0, 1));
				wire0.connectIn(button0);
				wire0.connectOut(wire1);
				wire0.connectOut(piston0);
				wire1.connectOut(piston1);

				// ~ layer 2
				level.createWall(new vec(-139, 348), 449, 279, 2);
				level.createWall(new vec(-114, 313), 335, 287, 2);
				level.createWall(new vec(-139, -111), 285, 705, 2);
				level.createWall(new vec(423, -162), 413, 225, 2);
				level.createWall(new vec(-201, -132), 950, 172, 2);
				level.createWall(new vec(-129, -132), 291, 289, 2);
				level.createWall(new vec(221, 103), 89, 54, 2);
				level.createWall(new vec(619, 131), 423, 485, 2);
				level.createWall(new vec(571, -118), 372, 399, 2);
				level.createWall(new vec(534, -118), 352, 213, 2);
				level.createWall(new vec(473, 205), 363, 76, 2);
				level.createWall(new vec(278, 452), 351, 102, 2);
				level.createWall(new vec(0, 396), 917, 198, 2);
				level.createInternalCorner(new vec(162, 40), 0, 2);
				level.createInternalCorner(new vec(423, 40), 1, 2);
				level.createInternalCorner(new vec(534, 63), 1, 2);
				level.createInternalCorner(new vec(571, 95), 1, 2);
				level.createInternalCorner(new vec(571, 205), 2, 2);
				level.createInternalCorner(new vec(619, 281), 1, 2);
				level.createInternalCorner(new vec(619, 396), 2, 2);
				level.createInternalCorner(new vec(310, 396), 3, 2);
				level.createInternalCorner(new vec(221, 348), 3, 2);
				level.createInternalCorner(new vec(146, 313), 3, 2);
				level.createInternalCorner(new vec(146, 157), 0, 2);

				level.createSpike(new vec(146, 205), 108, 2, new vec(1, 0));
				level.createSpike(new vec(349, 40), 74, 2, new vec(0, 1));

				// complex group 1
				var wire0 = level.createWire([ new vec(484, 268), new vec(484, 251), new vec(594, 251), new vec(594, 166), new vec(583, 166) ], 2);
				var piston0 = level.createPiston(new vec(473, 281), 20.99, 66.99, 2, new vec(0, 1)).setDefault(false);
				var button0 = level.createButton(new vec(560, 123), 10.99, 81.99, 2, new vec(-1, 0));
				wire0.connectIn(button0);
				wire0.connectOut(piston0);

				return level;
			})(),
			(function initLevel30() {
				let level = World.create(-1, new vec(172, 111), new vec(111, 30));
			
				level.createLayer("#F18A40");
				level.createLayer("#7C5DBE");
				
				// ~ layer 0
				level.createWall(new vec(143, -129), 99, 240, 0);
				level.createWall(new vec(-172, -129), 725, 159, 0);
				level.createWall(new vec(-141, 460), 624, 142, 0);
				level.createWall(new vec(483, 218), 126, 98, 0);
				level.createWall(new vec(591, -117), 400, 180, 0);
				level.createWall(new vec(-108, 396), 209, 206, 0);
				level.createWall(new vec(-166, 347), 214, 243, 0);
				level.createWall(new vec(-150, -167), 198, 229, 0);
				level.createWall(new vec(-150, 428), 283, 196, 0);
				level.createWall(new vec(328, 250), 80, 97, 0);
				level.createWall(new vec(752, -108), 262, 696, 0);
				level.createWall(new vec(609, 428), 336, 174, 0);
				level.createWall(new vec(720, -108), 379, 335, 0);
				level.createInternalCorner(new vec(48, 30), 0, 0);
				level.createInternalCorner(new vec(143, 30), 1, 0);
				level.createInternalCorner(new vec(242, 30), 0, 0);
				level.createInternalCorner(new vec(720, 63), 1, 0);
				level.createInternalCorner(new vec(752, 227), 1, 0);
				level.createInternalCorner(new vec(752, 428), 2, 0);
				level.createInternalCorner(new vec(133, 460), 3, 0);
				level.createInternalCorner(new vec(101, 428), 3, 0);
				level.createInternalCorner(new vec(48, 396), 3, 0);
				level.createCoin(new vec(727, 339), 0);
				level.createPortal(new vec(714, 63), 6, 80, 0, 1, new vec(-1, 0), true);
				level.createPortal(new vec(609, 227), 6, 80, 0, 1, new vec(1, 0));
				level.createPortal(new vec(288, 454), 80, 6, 0, 2, new vec(0, -1), true);
				level.createPortal(new vec(501, 212), 90, 6, 0, 2, new vec(0, -1));
				level.createSpike(new vec(740, 267), 161, 0, new vec(-1, 0));
				level.createSpike(new vec(333, 347), 69, 0, new vec(0, 1));
				level.createSpike(new vec(240, 30), 162, 0, new vec(0, 1));
				level.createSpike(new vec(242, 28), 73, 0, new vec(1, 0));

				// complex group 1
				var wire0 = level.createWire([ new vec(505, 24), new vec(505, 14), new vec(225, 12), new vec(224, 52), new vec(235, 52) ], 0);
				var piston0 = level.createPiston(new vec(242, 42), 77.99, 20.99, 0, new vec(1, 0)).setDefault(false);
				var button0 = level.createButton(new vec(464, 30), 81.99, 10.99, 0, new vec(0, 1));
				button0.singlePress = false;
				button0.singlePress = false;
				wire0.connectIn(button0);
				wire0.connectOut(piston0);

				// ~ layer 1
				level.createWall(new vec(-173, -144), 343, 255, 1);
				level.createWall(new vec(-173, -130), 237, 384, 1);
				level.createWall(new vec(-173, 35), 205, 357, 1);
				level.createWall(new vec(-148, -153), 360, 216, 1);
				level.createWall(new vec(-106, 440), 1012, 154, 1);
				level.createWall(new vec(615, 201), 331, 425, 1);
				level.createWall(new vec(135, 307), 216, 60, 1);
				level.createWall(new vec(292, 259), 59, 108, 1);
				level.createWall(new vec(422, 307), 86, 275, 1);
				level.createWall(new vec(422, 342), 492, 265, 1);
				level.createWall(new vec(-136, -159), 1072, 199, 1);
				level.createWall(new vec(540, -159), 389, 222, 1);
				level.createWall(new vec(-126, 344), 190, 266, 1);
				level.createWall(new vec(720, -130), 220, 740, 1);
				level.createInternalCorner(new vec(64, 111), 0, 1);
				level.createInternalCorner(new vec(32, 254), 0, 1);
				level.createInternalCorner(new vec(170, 63), 0, 1);
				level.createInternalCorner(new vec(212, 40), 0, 1);
				level.createInternalCorner(new vec(540, 40), 1, 1);
				level.createInternalCorner(new vec(720, 63), 1, 1);
				level.createInternalCorner(new vec(720, 201), 2, 1);
				level.createInternalCorner(new vec(615, 342), 2, 1);
				level.createInternalCorner(new vec(508, 342), 3, 1);
				level.createInternalCorner(new vec(64, 440), 3, 1);
				level.createInternalCorner(new vec(32, 344), 3, 1);
				level.createInternalCorner(new vec(422, 440), 2, 1);
				level.createInternalCorner(new vec(292, 307), 2, 1);
				level.createCoin(new vec(105, 319), 1);
				level.createPortal(new vec(260, 39), 80, 6, 1, 2, new vec(0, 1), true);
				level.createSpike(new vec(212, 295), 80, 1, new vec(0, -1));

				// ~ layer 2
				level.createWall(new vec(-113, -131), 1026, 171, 2);
				level.createWall(new vec(469, -103), 444, 315, 2);
				level.createWall(new vec(239, 159), 541, 53, 2);
				level.createWall(new vec(533, 359), 396, 223, 2);
				level.createWall(new vec(369, 396), 544, 215, 2);
				level.createWall(new vec(-252, -131), 297, 742, 2);
				level.createWall(new vec(-157, -103), 232, 315, 2);
				level.createWall(new vec(-136, 396), 211, 219, 2);
				level.createWall(new vec(-157, 430), 357, 181, 2);
				level.createWall(new vec(-97, 460), 994, 138, 2);
				level.createWall(new vec(645, -112), 268, 704, 2);
				level.createWall(new vec(591, 321), 338, 277, 2);
				level.createWall(new vec(207, 289), 81, 75, 2);
				level.createWall(new vec(369, 321), 81, 271, 2);
				level.createInternalCorner(new vec(75, 40), 0, 2);
				level.createInternalCorner(new vec(45, 212), 0, 2);
				level.createInternalCorner(new vec(469, 40), 1, 2);
				level.createInternalCorner(new vec(469, 159), 2, 2);
				level.createInternalCorner(new vec(645, 212), 1, 2);
				level.createInternalCorner(new vec(645, 321), 2, 2);
				level.createInternalCorner(new vec(591, 359), 2, 2);
				level.createInternalCorner(new vec(533, 396), 2, 2);
				level.createInternalCorner(new vec(369, 460), 2, 2);
				level.createInternalCorner(new vec(450, 396), 3, 2);
				level.createInternalCorner(new vec(200, 460), 3, 2);
				level.createInternalCorner(new vec(75, 430), 3, 2);
				level.createInternalCorner(new vec(45, 396), 3, 2);
				level.createCoin(new vec(82, 400), 2);

				level.createSpike(new vec(371, 40), 98, 2, new vec(0, 1));

				// complex group 1
				var wire0 = level.createWire([ new vec(361, 32), new vec(361, 20), new vec(496, 20), new vec(496, 188), new vec(450, 188), new vec(450, 203) ], 2);
				var piston0 = level.createPiston(new vec(350, 40), 20.99, 118.99, 2, new vec(0, 1)).setDefault(false);
				var button0 = level.createButton(new vec(409, 212), 81.99, 10.99, 2, new vec(0, 1));
				button0.singlePress = false;
				button0.singlePress = false;
				button0.singlePress = false;
				wire0.connectIn(button0);
				wire0.connectOut(piston0);

				return level;
			})(),
		]
	},
	"Extras": {
		levels: [
			(function initLevel31() {
				let level = World.create(-1, new vec(154, 181), new vec(93, 307));

				level.layers[0].color = "#EBD2B4";
				level.layers[0].portalColor = "#FFF3E5";
				level.createLayer("#73C78F", "#45B069");
				level.createLayer("#EFBACC", "#FF96BB");
				
				// ~ layer 0
				level.createWall(new vec(732, -117), 169, 623, 0);
				level.createWall(new vec(125, 307), 118, 64, 0);
				level.createWall(new vec(-82, -87), 172, 348, 0);
				level.createWall(new vec(210, -104), 153, 279, 0);
				level.createWall(new vec(-68, 440), 936, 123, 0);
				level.createWall(new vec(316, 400), 592, 163, 0);
				level.createWall(new vec(-37, -104), 932, 144, 0);
				level.createWall(new vec(417, 181), 209, 40, 0);
				level.createWall(new vec(417, 80), 63, 63, 0);
				level.createWall(new vec(527, 111), 98, 32, 0);
				level.createWall(new vec(210, 221), 153, 40, 0);
				level.createWall(new vec(313, 313), 92, 238, 0);
				level.createWall(new vec(-93, 111), 118, 401, 0);
				level.createWall(new vec(585, -38), 40, 116, 0);
				level.createInternalCorner(new vec(90, 40), 0, 0);
				level.createInternalCorner(new vec(210, 40), 1, 0);
				level.createInternalCorner(new vec(25, 261), 0, 0);
				level.createInternalCorner(new vec(25, 440), 3, 0);
				level.createInternalCorner(new vec(313, 440), 2, 0);
				level.createInternalCorner(new vec(405, 400), 3, 0);
				level.createInternalCorner(new vec(732, 400), 2, 0);
				level.createInternalCorner(new vec(625, 40), 0, 0);
				level.createInternalCorner(new vec(363, 40), 0, 0);
				level.createInternalCorner(new vec(585, 40), 1, 0);
				level.createInternalCorner(new vec(732, 40), 1, 0);
				level.createCoin(new vec(95, 189), 0);
				level.createPortal(new vec(233, 434), 80, 6, 0, 2, new vec(0, -1), true);
				level.createPortal(new vec(726, 143), 6, 117, 0, 2, new vec(-1, 0), true);
				level.createPortal(new vec(204, 42), 6, 80, 0, 1, new vec(-1, 0), true);
				level.createPortal(new vec(27, 434), 80, 6, 0, 1, new vec(0, -1), true);
				level.createSpike(new vec(130, 295), 108, 0, new vec(0, -1));
				level.createSpike(new vec(318, 301), 82, 0, new vec(0, -1));
				level.createSpike(new vec(720, 40), 38, 0, new vec(-1, 0));
				level.createSpike(new vec(301, 318), 82, 0, new vec(-1, 0));
				level.createSpike(new vec(243, 312), 54, 0, new vec(1, 0));
				level.createSpike(new vec(90, 136), 120, 0, new vec(1, 0));
				level.createSpike(new vec(125, 428), 89, 0, new vec(0, -1));
				level.createSpike(new vec(90, 40), 103, 0, new vec(0, 1));

				// ~ layer 1
				level.createWall(new vec(760, -76), 118, 632, 1);
				level.createWall(new vec(210, -126), 127, 278, 1);
				level.createWall(new vec(-82, 440), 318, 124, 1);
				level.createWall(new vec(293, 440), 332, 124, 1);
				level.createWall(new vec(560, 374), 318, 182, 1);
				level.createWall(new vec(210, -154), 698, 204, 1);
				level.createWall(new vec(-123, -119), 183, 375, 1);
				level.createWall(new vec(-113, 122), 234, 216, 1);
				level.createWall(new vec(-98, 240), 334, 118, 1);
				level.createWall(new vec(-98, 420), 123, 128, 1);
				level.createWall(new vec(594, -119), 305, 271, 1);
				level.createWall(new vec(576, 240), 125, 86, 1);
				level.createWall(new vec(293, 240), 217, 163, 1);
				level.createWall(new vec(400, 114), 110, 38, 1);
				level.createWall(new vec(-129, -146), 670, 186, 1);
				level.createInternalCorner(new vec(760, 374), 2, 1);
				level.createInternalCorner(new vec(760, 152), 1, 1);
				level.createInternalCorner(new vec(594, 50), 1, 1);
				level.createInternalCorner(new vec(210, 40), 1, 1);
				level.createInternalCorner(new vec(60, 40), 0, 1);
				level.createInternalCorner(new vec(560, 440), 2, 1);
				level.createInternalCorner(new vec(337, 50), 0, 1);
				level.createInternalCorner(new vec(60, 122), 3, 1);
				level.createInternalCorner(new vec(121, 240), 3, 1);
				level.createInternalCorner(new vec(25, 441), 3, 1);
				level.createCoin(new vec(305, 414), 1);

				level.createSpike(new vec(564, 245), 73, 1, new vec(-1, 0));
				level.createSpike(new vec(582, 228), 113, 1, new vec(0, -1));
				level.createSpike(new vec(405, 102), 100, 1, new vec(0, -1));
				level.createSpike(new vec(405, 152), 100, 1, new vec(0, 1));
				level.createSpike(new vec(510, 119), 28, 1, new vec(1, 0));
				level.createSpike(new vec(388, 119), 28, 1, new vec(-1, 0));
				level.createSpike(new vec(701, 245), 73, 1, new vec(1, 0));
				level.createSpike(new vec(582, 326), 113, 1, new vec(0, 1));
				level.createSpike(new vec(121, 152), 53, 1, new vec(1, 0));

				// ~ layer 2
				level.createWall(new vec(732, 134), 213, 134, 2);
				level.createWall(new vec(170, 440), 630, 145, 2);
				level.createWall(new vec(367, 353), 543, 213, 2);
				level.createWall(new vec(-82, -186), 928, 236, 2);
				level.createWall(new vec(367, 181), 277, 40, 2);
				level.createWall(new vec(367, 114), 50, 176, 2);
				level.createWall(new vec(170, 185), 100, 202, 2);
				level.createWall(new vec(-91, -135), 191, 260, 2);
				level.createWall(new vec(-182, 260), 409, 127, 2);
				level.createInternalCorner(new vec(100, 50), 0, 2);
				level.createInternalCorner(new vec(170, 260), 2, 2);
				level.createInternalCorner(new vec(417, 181), 3, 2);
				level.createInternalCorner(new vec(417, 221), 0, 2);
				level.createInternalCorner(new vec(367, 440), 2, 2);

				level.createSpike(new vec(417, 221), 222, 2, new vec(0, 1));
				level.createSpike(new vec(644, 186), 30, 2, new vec(1, 0));

				return level;
			})(),
			(function initLevel32() {
				let level = World.create(-1, new vec(178, 218), new vec(308, 175));

				level.layers[0].color = "#F3DABB";
				level.layers[0].portalColor = "#FFF3E5";
				level.createLayer("#73C78F", "#45B069");
				level.createLayer("#EFBACC", "#FF96BB");
				
				// ~ layer 0
				level.createWall(new vec(172, 331), 214, 40, 0);
				level.createWall(new vec(377, 420), 554, 169, 0);
				level.createWall(new vec(295, 207), 50, 55, 0);
				level.createWall(new vec(-151, 170), 230, 201, 0);
				level.createWall(new vec(156, -117), 83, 200, 0);
				level.createWall(new vec(156, -149), 189, 199, 0);
				level.createWall(new vec(504, -149), 146, 199, 0);
				level.createWall(new vec(726, 371), 215, 184, 0);
				level.createWall(new vec(726, -97), 154, 212, 0);
				level.createWall(new vec(760, 176), 202, 293, 0);
				level.createWall(new vec(490, 279), 147, 84, 0);
				level.createWall(new vec(-131, 83), 174, 489, 0);
				level.createWall(new vec(437, 176), 200, 50, 0);
				level.createInternalCorner(new vec(239, 50), 0, 0);
				level.createInternalCorner(new vec(760, 371), 2, 0);
				level.createInternalCorner(new vec(726, 420), 2, 0);
				level.createInternalCorner(new vec(43, 371), 0, 0);
				level.createInternalCorner(new vec(43, 170), 3, 0);
				level.createCoin(new vec(691, 56), 0);
				level.createPortal(new vec(42, 374), 6, 80, 0, 1, new vec(1, 0), true);
				level.createPortal(new vec(240, 49), 100, 6, 0, 2, new vec(0, 1), true);
				level.createPortal(new vec(242, 325), 135, 6, 0, 2, new vec(0, -1));
				level.createPortal(new vec(551, 170), 80, 6, 0, 1, new vec(0, -1));
				level.createSpike(new vec(283, 213), 43, 0, new vec(-1, 0));

				// ~ layer 1
				level.createWall(new vec(-83, 120), 355, 133, 1);
				level.createWall(new vec(-83, 456), 207, 161, 1);
				level.createWall(new vec(192, 334), 80, 86, 1);
				level.createWall(new vec(-111, -162), 362, 415, 1);
				level.createWall(new vec(0, -162), 631, 205, 1);
				level.createWall(new vec(377, -162), 254, 230, 1);
				level.createWall(new vec(377, 120), 261, 50, 1);
				level.createWall(new vec(509, -128), 334, 169, 1);
				level.createWall(new vec(721, -162), 211, 338, 1);
				level.createWall(new vec(-129, 68), 172, 589, 1);
				level.createWall(new vec(377, 120), 174, 214, 1);
				level.createWall(new vec(641, 424), 355, 167, 1);
				level.createInternalCorner(new vec(251, 43), 0, 1);
				level.createInternalCorner(new vec(377, 43), 1, 1);
				level.createInternalCorner(new vec(721, 41), 1, 1);
				level.createInternalCorner(new vec(631, 41), 0, 1);
				level.createInternalCorner(new vec(551, 170), 0, 1);
				level.createInternalCorner(new vec(43, 253), 0, 1);
				level.createInternalCorner(new vec(43, 456), 3, 1);
				level.createInternalCorner(new vec(251, 120), 3, 1);
				level.createCoin(new vec(346, 264), 1);
				level.createPortal(new vec(636, 40), 80, 6, 1, 2, new vec(0, 1), true);
				level.createSpike(new vec(709, 53), 112, 1, new vec(-1, 0));
				level.createSpike(new vec(638, 125), 34, 1, new vec(1, 0));
				level.createSpike(new vec(272, 209), 38, 1, new vec(1, 0));

				// ~ layer 2
				level.createWall(new vec(-114, -116), 233, 259, 2);
				level.createWall(new vec(-87, 100), 222, 43, 2);
				level.createWall(new vec(213, 219), 226, 106, 2);
				level.createWall(new vec(-87, 410), 419, 166, 2);
				level.createWall(new vec(245, 446), 515, 124, 2);
				level.createWall(new vec(0, -133), 367, 169, 2);
				level.createWall(new vec(213, -108), 418, 158, 2);
				level.createWall(new vec(721, -152), 220, 272, 2);
				level.createWall(new vec(213, 177), 85, 148, 2);
				level.createWall(new vec(559, -141), 234, 182, 2);
				level.createWall(new vec(-93, 380), 238, 183, 2);
				level.createWall(new vec(673, 219), 248, 383, 2);
				level.createInternalCorner(new vec(119, 36), 0, 2);
				level.createInternalCorner(new vec(213, 36), 1, 2);
				level.createInternalCorner(new vec(721, 41), 1, 2);
				level.createInternalCorner(new vec(673, 446), 2, 2);
				level.createInternalCorner(new vec(332, 446), 3, 2);
				level.createInternalCorner(new vec(145, 410), 3, 2);
				level.createInternalCorner(new vec(298, 219), 3, 2);
				level.createInternalCorner(new vec(631, 41), 0, 2);
				level.createInternalCorner(new vec(119, 100), 3, 2);
				level.createCoin(new vec(355, 416), 2);

				return level;
			})(),
			(function initLevel17() {
				let level = World.create(-1, new vec(384, 111), new vec(460, 167));
			
				level.layers[0].color = "#E9EFBA";
				level.layers[0].portalColor = "#E9EFBA";
				level.createLayer("#F8B469");
				level.createLayer("#77AB59");
				
				// ~ layer 0
				level.createWall(new vec(760, 239), 144, 100, 0);
				level.createWall(new vec(-114, 307), 267, 269, 0);
				level.createWall(new vec(-114, 3), 204, 430, 0);
				level.createWall(new vec(-120, -79), 273, 222, 0);
				level.createWall(new vec(52, 440), 465, 127, 0);
				level.createWall(new vec(397, 390), 542, 195, 0);
				level.createWall(new vec(340, 143), 120, 84, 0);
				level.createInternalCorner(new vec(90, 143), 0, 0);
				level.createInternalCorner(new vec(90, 307), 3, 0);
				level.createInternalCorner(new vec(153, 440), 3, 0);
				level.createInternalCorner(new vec(397, 440), 2, 0);

				level.createPortal(new vec(334, 145), 6, 80, 0, 1, new vec(-1, 0), true);
				level.createPortal(new vec(350, 226), 100, 6, 0, 1, new vec(0, 1), true);
				level.createPortal(new vec(754, 249), 6, 80, 0, 2, new vec(-1, 0), true);
				level.createPortal(new vec(416, 384), 80, 6, 0, 2, new vec(0, -1), true);

				level.createSpike(new vec(90, 143), 130, 0, new vec(1, 0));
				level.createSpike(new vec(153, 313), 127, 0, new vec(1, 0));
				level.createSpike(new vec(153, 3), 108, 0, new vec(1, 0));

				// ~ layer 1
				level.createWall(new vec(-73, 391), 613, 205, 1);
				level.createWall(new vec(692, 225), 228, 330, 1);
				level.createWall(new vec(760, 0), 146, 205, 1);
				level.createWall(new vec(660, 391), 238, 188, 1);
				level.createWall(new vec(-89, 175), 308, 78, 1);
				level.createWall(new vec(-89, 180), 129, 226, 1);
				level.createWall(new vec(710, -119), 189, 187, 1);
				level.createWall(new vec(340, -142), 200, 193, 1);
				level.createWall(new vec(59, -104), 160, 155, 1);
				level.createWall(new vec(-113, -68), 292, 321, 1);
				level.createWall(new vec(-94, 359), 220, 214, 1);
				level.createWall(new vec(660, 135), 242, 186, 1);
				level.createWall(new vec(340, 124), 200, 103, 1);
				level.createInternalCorner(new vec(179, 51), 0, 1);
				level.createInternalCorner(new vec(179, 175), 3, 1);
				level.createInternalCorner(new vec(126, 391), 3, 1);
				level.createInternalCorner(new vec(40, 359), 3, 1);
				level.createInternalCorner(new vec(760, 68), 1, 1);
				level.createInternalCorner(new vec(692, 321), 1, 1);
				level.createInternalCorner(new vec(760, 135), 2, 1);
				level.createInternalCorner(new vec(692, 391), 2, 1);
				level.createInternalCorner(new vec(40, 253), 0, 1);
				level.createCoin(new vec(677, 51), 1);
				level.createCoin(new vec(620, 293), 1);
				level.createCoin(new vec(423, 248), 1);

				level.createPortal(new vec(678, 129), 80, 6, 1, 2, new vec(0, -1));
				level.createPortal(new vec(39, 256), 6, 100, 1, 2, new vec(1, 0), true);

				level.createSpike(new vec(540, 131), 93, 1, new vec(1, 0));
				level.createSpike(new vec(540, 400), 80, 1, new vec(1, 0));
				level.createSpike(new vec(540, -20), 64, 1, new vec(1, 0));
				level.createSpike(new vec(648, 400), 84, 1, new vec(-1, 0));
				level.createSpike(new vec(698, -20), 64, 1, new vec(-1, 0));
				level.createSpike(new vec(648, 143), 108, 1, new vec(-1, 0));
				level.createSpike(new vec(347, 112), 186, 1, new vec(0, -1));
				level.createSpike(new vec(347, 51), 186, 1, new vec(0, 1));
				level.createSpike(new vec(722, 68), 38, 1, new vec(0, 1));

				// ~ layer 2
				level.createWall(new vec(358, 390), 157, 154, 2);
				level.createWall(new vec(670, 390), 226, 171, 2);
				level.createWall(new vec(760, 14), 136, 486, 2);
				level.createWall(new vec(-77, -70), 284, 234, 2);
				level.createWall(new vec(60, -126), 211, 255, 2);
				level.createWall(new vec(358, 307), 53, 216, 2);
				level.createWall(new vec(326, 164), 85, 53, 2);
				level.createWall(new vec(99, 450), 367, 85, 2);
				level.createWall(new vec(-96, 359), 303, 201, 2);
				level.createWall(new vec(515, 307), 155, 30, 2);
				level.createWall(new vec(148, -90), 263, 140, 2);
				level.createWall(new vec(496, -57), 203, 107, 2);
				level.createWall(new vec(296, -90), 504, 120, 2);
				level.createWall(new vec(-69, 65), 109, 403, 2);
				level.createWall(new vec(603, -85), 268, 214, 2);
				level.createInternalCorner(new vec(271, 50), 0, 2);
				level.createInternalCorner(new vec(411, 30), 0, 2);
				level.createInternalCorner(new vec(496, 30), 1, 2);
				level.createInternalCorner(new vec(207, 129), 0, 2);
				level.createInternalCorner(new vec(40, 164), 0, 2);
				level.createInternalCorner(new vec(603, 50), 1, 2);
				level.createInternalCorner(new vec(760, 129), 1, 2);
				level.createInternalCorner(new vec(760, 390), 2, 2);
				level.createInternalCorner(new vec(411, 390), 3, 2);
				level.createInternalCorner(new vec(207, 450), 3, 2);
				level.createInternalCorner(new vec(40, 359), 3, 2);
				level.createInternalCorner(new vec(358, 450), 2, 2);

				level.createSpike(new vec(333, 152), 71, 2, new vec(0, -1));
				level.createSpike(new vec(718, 378), 42, 2, new vec(0, -1));
				level.createSpike(new vec(207, 438), 96, 2, new vec(0, -1));
				level.createSpike(new vec(748, 184), 65, 2, new vec(-1, 0));
				level.createSpike(new vec(658, 396), 84, 2, new vec(-1, 0));
				level.createSpike(new vec(515, 396), 84, 2, new vec(1, 0));
				level.createSpike(new vec(411, 169), 43, 2, new vec(1, 0));

				return level;
			})(),
		],
	},
}

function save() {
	let parent = document.getElementById("worldsBackground");
	for (let i = 0; i < parent.childElementCount; i++) {
		let elem = parent.children[i];
		if (elem === lastWorldArrow) {
			data.world = i;
		}
	}
	localStorage.setItem("multicosmData", JSON.stringify(data));
}
function reset() {
	localStorage.clear();
	window.location.reload();
}

// init levels
(function initLevelTest() {
	let level = World.create(-1, new vec(135, 364), new vec(631, 348));
	level.createLayer("#F18A40");
	// level.createLayer("#7C5DBE");

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

	button0.singlePress = false;
	button1.singlePress = true;

	piston0.default = false;
});
(function initLevelTest2() {
	let level = World.create(-1, new vec(125, 310), new vec(158, 342));
	level.layers[0].color = "#DAD9E3";
	// level.createLayer("#F18A40");

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

	button1.singlePress = false;

	wire1.connectIn(button0);
	wire0.connectIn(wire1);
	wire0.connectOut(piston2);
	wire1.connectOut(piston1);

	wire2.connectIn(button1);
	wire2.connectOut(piston0);
	return level;
});

Render.on("beforeRender", () => {
	animate.run();
});

if (data.level > 1) {
	document.getElementById("levelComplete").classList.remove("active");
	document.getElementById("tutorial").classList.remove("active");
	player.alive = true;
}
// World.set(data.level, data.layer);