"use strict";

const { World, Render, Performance, player } = engine;
var curLevel = Number(localStorage.getItem("level") ?? 1);

function save() {
	localStorage.setItem("level", curLevel);
}
function reset() {
	localStorage.clear();
	window.location.reload();
}

(function initLevelTest() {
	let level = World.create(World.worlds.length, new vec(90, 225), new vec(649, 392));

	level.createLayer("#F09D3C");
	level.createLayer("#9F51DC");
	
	level.createWall(new vec(0, 0), 681, 87, 0);
	level.createWall(new vec(681, 0), 119, 480, 0);
	level.createWall(new vec(446, 167), 112, 400, 0);

	
	// ~ Extra for testing
	// layer 0
	level.createWall(new vec(0, 302), 230, 60, 0);
	level.createWall(new vec(0, 0), 40, 480, 0);
	level.createWall(new vec(0, 440), 800, 40, 0);
	level.createPortal(new vec(50, 296), 100, 6, 0, 1, new vec(0, -1));

	level.createSpike(new vec(434, 330), 108, 0, new vec(-1, 0));
	level.createSpike(new vec(446, 155), 112, 0, new vec(0, -1));
	level.createSpike(new vec(130, 87), 550, 0, new vec(0, 1), 6);


	// layer 1
	level.createWall(new vec(0, 425), 233, 55, 1);
	level.createWall(new vec(233, 0), 567, 480, 1);
	level.createWall(new vec(0, 0), 20, 480, 1);
	level.createWall(new vec(0, 0), 233, 296, 1);
	level.createPortal(new vec(227, 325), 6, 90, 1, 2, new vec(-1, 0));

	// layer 2
	level.createWall(new vec(564, 0), 242, 480, 2);
	level.createWall(new vec(0, 0), 227, 480, 2);
	// level1.createPortal(new vec(558, 325), 6, 100, 2, 0, new vec(-1, 0));
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
	level.createWall(new vec(0, 0), 50, 249, 0);
	level.createWall(new vec(0, 0), 487, 139, 0);
	level.createWall(new vec(487, 0), 157, 57, 0);
	level.createWall(new vec(644, 0), 156, 249, 0);
})();
(function initLevel3() {
	let level = World.create(World.worlds.length, new vec(164, 57), new vec(648, 300));

	level.createWall(new vec(0, 0), 800, 57, 0);
	level.createWall(new vec(0, 440), 800, 40, 0);
	level.createWall(new vec(0, 57), 120, 383, 0);
	level.createWall(new vec(680, 57), 120, 383, 0);
	level.createWall(new vec(120, 300), 121, 140, 0);
	level.createWall(new vec(483, 367), 197, 73, 0);
	level.createWall(new vec(483, 217), 197, 83, 0);
	level.createWall(new vec(120, 124), 262, 176, 0);
})();
(function initLevel4() {
	let level = World.create(World.worlds.length, new vec(663, 57), new vec(202, 266));
	
	level.createWall(new vec(0, 0), 800, 56, 0);
	level.createWall(new vec(478, 154), 322, 56, 0);
	level.createWall(new vec(0, 106), 305, 104, 0);
	level.createWall(new vec(740, 0), 60, 479, 0);
	level.createWall(new vec(0, 423), 800, 56, 0);
	level.createWall(new vec(234, 355), 506, 68, 0);
	level.createWall(new vec(234, 323), 71, 32, 0);
	level.createWall(new vec(0, 210), 60, 213, 0);
})();
(function initLevel5() {
	let level = World.create(World.worlds.length, new vec(146, 148), new vec(614, 389));

	level.createLayer("#F09D3C");
	
	// Layer 0
	level.createWall(new vec(654, 0), 146, 480, 0);
	level.createWall(new vec(0, 0), 146, 480, 0);
	level.createWall(new vec(146, 0), 508, 60, 0);
	level.createWall(new vec(146, 421), 508, 59, 0);
	level.createWall(new vec(146, 180), 508, 120, 0);
	level.createWall(new vec(146, 299), 166, 122, 0);
	level.createWall(new vec(488, 60), 166, 120, 0);
	
	level.createPortal(new vec(482, 69), 6, 102, 0, 1, new vec(-1, 0));
	level.createPortal(new vec(576, 300), 70, 6, 0, 1, new vec(0, 1));
	
	// Layer 1
	level.createWall(new vec(0, 0), 482, 480, 1);
	level.createWall(new vec(654, 0), 146, 480, 1);
	level.createWall(new vec(482, 307), 172, 173, 1);
	level.createWall(new vec(482, 0), 172, 60, 1);
})();
(function initLevel6() {
	let level = World.create(World.worlds.length, new vec(256, 358), new vec(698, 388));

	level.createLayer("#F09D3C");
	
	// Layer 0
	level.createWall(new vec(730, 0), 70, 480, 0);
	level.createWall(new vec(0, 0), 70, 480, 0);
	level.createWall(new vec(70, 0), 660, 60, 0);
	level.createWall(new vec(141, 269), 434, 60, 0);
	level.createWall(new vec(297, 164), 139, 105, 0);
	level.createWall(new vec(301, 329), 274, 91, 0);
	level.createWall(new vec(222, 60), 214, 104, 0);
	level.createWall(new vec(70, 420), 660, 60, 0);
	
	level.createPortal(new vec(291, 168), 6, 96, 0, 1, new vec(-1, 0));
	level.createPortal(new vec(485, 263), 70, 6, 0, 1, new vec(0, -1));
	
	// Layer 1
	level.createWall(new vec(730, 0), 70, 480, 1);
	level.createWall(new vec(0, 0), 70, 480, 1);
	level.createWall(new vec(291, 0), 439, 154, 1);
	level.createWall(new vec(416, 97), 314, 166, 1);
	level.createWall(new vec(70, 0), 221, 420, 1);
	level.createWall(new vec(416, 263), 60, 95, 1);
	level.createWall(new vec(565, 263), 165, 32, 1);
	level.createWall(new vec(70, 420), 660, 60, 1);
})();
(function initLevel7() {
	let level = World.create(World.worlds.length, new vec(170, 170), new vec(170, 278));

	level.createLayer("#F09D3C");
	
	// Layer 0
	level.createWall(new vec(0, 0), 151, 480, 0);
	level.createWall(new vec(151, 0), 649, 77, 0);
	level.createWall(new vec(151, 403), 649, 77, 0);
	level.createWall(new vec(151, 202), 149, 76, 0);
	level.createWall(new vec(512, 165), 288, 151, 0);
	
	level.createPortal(new vec(506, 170), 6, 140, 0, 1, new vec(-1, 0));
	
	// Layer 1
	level.createWall(new vec(0, 0), 800, 150, 1);
	level.createWall(new vec(0, 330), 800, 150, 1);
	level.createWall(new vec(741, 150), 59, 180, 1);
	level.createWall(new vec(0, 150), 506, 180, 1);
})();
(function initLevel8() {
	let level = World.create(World.worlds.length, new vec(97, 70), new vec(671, 318));

	level.createLayer("#F09D3C");
	
	// Layer 0
	level.createWall(new vec(0, 410), 800, 70, 0);
	level.createWall(new vec(460, 350), 243, 60, 0);
	level.createWall(new vec(0, 0), 800, 70, 0);
	level.createWall(new vec(306, 175), 100, 115, 0);
	level.createWall(new vec(97, 134), 100, 91, 0);
	level.createWall(new vec(406, 70), 297, 155, 0);
	level.createWall(new vec(703, 70), 97, 340, 0);
	level.createWall(new vec(0, 70), 97, 340, 0);
	
	level.createPortal(new vec(412, 225), 116, 6, 0, 1, new vec(0, 1));
	
	// Layer 1
	level.createWall(new vec(0, 410), 800, 70, 1);
	level.createWall(new vec(633, 231), 70, 179, 1);
	level.createWall(new vec(404, 231), 132, 67, 1);
	level.createWall(new vec(329, 0), 471, 40, 1);
	level.createWall(new vec(329, 40), 151, 100, 1);
	level.createWall(new vec(703, 40), 97, 370, 1);
	level.createWall(new vec(0, 0), 329, 410, 1);
	level.createWall(new vec(633, 40), 70, 100, 1);

	level.createSpike(new vec(329, 186), 60, 1, new vec(1, 0));
})();
(function initLevel9() {
	let level = World.create(World.worlds.length, new vec(384, 365), new vec(44, 93));

	level.createLayer("#F09D3C");
	
	// Layer 0
	level.createWall(new vec(354, 0), 149, 226, 0);
	level.createWall(new vec(0, 397), 800, 83, 0);
	level.createWall(new vec(503, 0), 297, 397, 0);
	level.createWall(new vec(0, 186), 175, 40, 0);
	level.createWall(new vec(175, 0), 179, 40, 0);
	level.createWall(new vec(125, 0), 50, 186, 0);
	
	level.createPortal(new vec(497, 295), 6, 100, 0, 1, new vec(-1, 0));
	level.createPortal(new vec(348, 42), 6, 126, 0, 1, new vec(-1, 0));
	level.createPortal(new vec(44, 180), 70, 6, 0, 1, new vec(0, -1));
	
	// Layer 1
	level.createWall(new vec(0, 402), 800, 78, 1);
	level.createWall(new vec(760, 0), 40, 402, 1);
	level.createWall(new vec(0, 180), 40, 73, 1);
	level.createWall(new vec(348, 0), 149, 40, 1);
	level.createWall(new vec(497, 0), 263, 106, 1);
	level.createWall(new vec(0, 0), 348, 180, 1);
	level.createWall(new vec(0, 253), 497, 149, 1);

	level.createSpike(new vec(748, 253), 93, 1, new vec(-1, 0));
})();
(function initLevel10() {
	let level = World.create(World.worlds.length, new vec(130, 360), new vec(698, 50));

	level.createLayer("#F09D3C");
	level.createLayer("#9F51DC");
	// World.set(level.index);
	
	// Layer 0
	level.createWall(new vec(0, 430), 800, 50, 0);
	level.createWall(new vec(50, 50), 461, 272, 0);
	level.createWall(new vec(365, 207), 365, 223, 0);
	level.createWall(new vec(730, 0), 70, 480, 0);
	level.createWall(new vec(0, 0), 130, 480, 0);
	level.createWall(new vec(0, 0), 800, 50, 0);
	
	level.createPortal(new vec(359, 326), 6, 100, 0, 1, new vec(-1, 0));
	level.createPortal(new vec(515, 201), 100, 6, 0, 2, new vec(0, -1));
	
	// Layer 1
	level.createWall(new vec(0, 430), 800, 50, 1);
	level.createWall(new vec(0, 60), 268, 202, 1);
	level.createWall(new vec(543, 201), 187, 229, 1);
	level.createWall(new vec(0, 262), 359, 168, 1);
	level.createWall(new vec(730, 0), 70, 480, 1);
	level.createWall(new vec(0, 0), 800, 60, 1);

	level.createPortal(new vec(268, 99), 6, 100, 1, 2, new vec(1, 0));

	// Layer 2
	level.createWall(new vec(0, 331), 800, 149, 2);
	level.createWall(new vec(274, 96), 344, 105, 2);
	level.createWall(new vec(618, 0), 182, 480, 2);
	level.createWall(new vec(0, 96), 139, 235, 2);
	level.createWall(new vec(0, 0), 800, 96, 2);
})();
(function initLevel10B() {
	return;
	let level = World.create(World.worlds.length, new vec(698, 50), new vec(110, 322));

	level.createLayer("#F09D3C");
	level.createLayer("#9F51DC");
	// World.set(level.index);
	
	// Layer 0
	level.createWall(new vec(0, 430), 800, 50, 0);
	level.createWall(new vec(50, 50), 461, 272, 0);
	level.createWall(new vec(365, 207), 365, 223, 0);
	level.createWall(new vec(730, 0), 70, 480, 0);
	level.createWall(new vec(0, 0), 110, 480, 0);
	level.createWall(new vec(0, 0), 800, 50, 0);
	
	level.createPortal(new vec(515, 201), 100, 6, 0, 2, new vec(0, -1));
	level.createPortal(new vec(359, 326), 6, 100, 0, 1, new vec(-1, 0));
	
	// Layer 1
	level.createWall(new vec(0, 430), 800, 50, 1);
	level.createWall(new vec(50, 50), 218, 269, 1);
	level.createWall(new vec(543, 201), 187, 229, 1);
	level.createWall(new vec(50, 262), 309, 168, 1);
	level.createWall(new vec(730, 0), 70, 480, 1);
	level.createWall(new vec(0, 50), 50, 380, 1);
	level.createWall(new vec(0, 0), 800, 60, 1);
	
	level.createPortal(new vec(268, 99), 6, 100, 1, 2, new vec(1, 0));

	// Layer 2
	level.createWall(new vec(0, 331), 800, 149, 2);
	level.createWall(new vec(274, 50), 344, 151, 2);
	level.createWall(new vec(618, 0), 182, 480, 2);
	level.createWall(new vec(0, 50), 139, 380, 2);
	level.createWall(new vec(0, 0), 800, 96, 2);
})();
(function initLevel11() {
	let level = World.create(World.worlds.length, new vec(384, 244), new vec(694, 50));

	level.createLayer("#F09D3C");
	level.createLayer("#9F51DC");
	
	// Layer 0
	level.createWall(new vec(614, 290), 186, 190, 0);
	level.createWall(new vec(416, 242), 50, 238, 0);
	level.createWall(new vec(416, 145), 198, 45, 0);
	level.createWall(new vec(0, 0), 249, 480, 0);
	level.createWall(new vec(671, 0), 129, 50, 0);

	level.createPortal(new vec(249, 190), 6, 100, 0, 1, new vec(1, 0));
	level.createPortal(new vec(466, 371), 6, 100, 0, 1, new vec(1, 0));
	level.createPortal(new vec(626, 284), 100, 6, 0, 2, new vec(0, -1));
	
	// Layer 1
	level.createWall(new vec(472, 362), 61, 118, 1);
	level.createWall(new vec(533, 50), 267, 430, 1);
	level.createWall(new vec(310, 134), 162, 90, 1);
	level.createWall(new vec(310, 436), 87, 44, 1);
	level.createWall(new vec(0, 228), 90, 252, 1);
	level.createWall(new vec(255, 134), 55, 165, 1);
	level.createWall(new vec(472, 134), 61, 228, 1);
	level.createWall(new vec(0, 50), 131, 194, 1);
	level.createWall(new vec(0, 362), 310, 118, 1);
	level.createWall(new vec(0, 0), 800, 50, 1);

	level.createPortal(new vec(527, 52), 6, 80, 1, 2, new vec(-1, 0));

	// Layer 2
	level.createWall(new vec(728, 0), 72, 480, 2);
	level.createWall(new vec(0, 0), 250, 480, 2);
	level.createWall(new vec(0, 0), 0, 0, 2);
	level.createWall(new vec(0, 0), 800, 50, 2);
	level.createWall(new vec(336, 378), 464, 102, 2);
	level.createWall(new vec(587, 225), 141, 59, 2);
	level.createWall(new vec(402, 50), 125, 95, 2);
})();
(function initLevel12() {
	let level = World.create(World.worlds.length, new vec(96, 282), new vec(170, 40));

	level.createLayer("#F09D3C");
	level.createLayer("#9F51DC");
	
	// Layer 0
	level.createWall(new vec(0, 430), 505, 50, 0);
	level.createWall(new vec(0, 269), 96, 161, 0);
	level.createWall(new vec(130, 0), 278, 40, 0);
	level.createWall(new vec(232, 40), 129, 75, 0);
	level.createWall(new vec(486, 0), 314, 40, 0);
	level.createWall(new vec(467, 104), 38, 210, 0);
	level.createWall(new vec(659, 274), 40, 68, 0);
	level.createWall(new vec(699, 40), 101, 125, 0);
	level.createWall(new vec(760, 165), 40, 315, 0);
	level.createWall(new vec(505, 274), 194, 40, 0);
	
	level.createPortal(new vec(132, 424), 100, 6, 0, 1, new vec(0, -1), true);
	level.createPortal(new vec(365, 424), 100, 6, 0, 1, new vec(0, -1), true);
	level.createPortal(new vec(505, 165), 6, 100, 0, 1, new vec(1, 0));
	
	// Layer 1
	level.createWall(new vec(127, 430), 343, 50, 1);
	level.createWall(new vec(234, 267), 127, 163, 1);
	level.createWall(new vec(234, 0), 127, 162, 1);
	level.createWall(new vec(0, 162), 40, 190, 1);
	level.createWall(new vec(467, 0), 44, 163, 1);
	level.createWall(new vec(127, 0), 343, 40, 1);
	level.createWall(new vec(511, 0), 289, 480, 1);
	level.createWall(new vec(467, 267), 44, 213, 1);
	
	level.createPortal(new vec(40, 217), 6, 80, 1, 2, new vec(1, 0), true);
	level.createPortal(new vec(137, 40), 95, 6, 1, 2, new vec(0, 1), true);

	// Layer 2
	level.createWall(new vec(130, 199), 40, 116, 2);
	level.createWall(new vec(0, 423), 345, 40, 2);
	level.createWall(new vec(0, 199), 40, 116, 2);
	level.createWall(new vec(0, 0), 385, 40, 2);
	level.createWall(new vec(305, 315), 40, 108, 2);
	level.createWall(new vec(345, 0), 40, 100, 2);

	level.createSpike(new vec(246, 40), 86, 2, new vec(0, 1));
})();
(function initLevel14() {
	let level = World.create(World.worlds.length, new vec(384, 224), new vec(519, 80));

	level.createLayer("#F09D3C");
	level.createLayer("#9F51DC");
	
	// Layer 0
	level.createWall(new vec(290, 152), 180, 72, 0);
	level.createWall(new vec(50, 455), 280, 25, 0);
	level.createWall(new vec(0, 327), 50, 40, 0);
	level.createWall(new vec(0, 434), 50, 46, 0);
	level.createWall(new vec(470, 414), 121, 66, 0);
	level.createWall(new vec(511, 40), 40, 40, 0);
	level.createWall(new vec(164, 40), 126, 40, 0);
	level.createWall(new vec(551, 40), 249, 120, 0);
	level.createWall(new vec(722, 160), 78, 167, 0);
	level.createWall(new vec(0, 0), 800, 40, 0);
	level.createWall(new vec(682, 327), 118, 153, 0);
	level.createWall(new vec(0, 40), 89, 184, 0);
	level.createWall(new vec(0, 224), 25, 143, 0);
	level.createWall(new vec(290, 434), 180, 46, 0);

	level.createPortal(new vec(481, 408), 100, 6, 0, 2, new vec(0, -1), true);
	level.createPortal(new vec(89, 449), 75, 6, 0, 2, new vec(0, -1), true);
	level.createPortal(new vec(89, 120), 6, 100, 0, 1, new vec(1, 0), true);

	level.createSpike(new vec(670, 327), 153, 0, new vec(-1, 0));
	level.createSpike(new vec(710, 160), 123, 0, new vec(-1, 0));
	level.createSpike(new vec(290, 140), 180, 0, new vec(0, -1));
	level.createSpike(new vec(164, 80), 126, 0, new vec(0, 1));
	
	// Layer 1
	level.createWall(new vec(450, 151), 137, 173, 1);
	level.createWall(new vec(467, 50), 50, 53, 1);
	level.createWall(new vec(245, 0), 460, 50, 1);
	level.createWall(new vec(0, 400), 800, 80, 1);
	level.createWall(new vec(0, 226), 297, 174, 1);
	level.createWall(new vec(705, 0), 95, 400, 1);
	level.createWall(new vec(0, 114), 89, 112, 1);

	level.createPortal(new vec(444, 153), 6, 71, 1, 2, new vec(-1, 0));
	level.createPortal(new vec(297, 50), 100, 6, 1, 2, new vec(0, 1), true);

	level.createSpike(new vec(587, 157), 167, 1, new vec(1, 0));
	level.createSpike(new vec(438, 224), 100, 1, new vec(-1, 0));
	level.createSpike(new vec(233, 0), 50, 1, new vec(-1, 0));
	level.createSpike(new vec(450, 324), 137, 1, new vec(0, 1));
	level.createSpike(new vec(467, 103), 50, 1, new vec(0, 1));

	// Layer 2
	level.createWall(new vec(397, 230), 129, 109, 2);
	level.createWall(new vec(397, 155), 47, 84, 2);
	level.createWall(new vec(397, 110), 129, 45, 2);
	level.createWall(new vec(494, 110), 32, 80, 2);
	level.createWall(new vec(215, 251), 66, 50, 2);
	level.createWall(new vec(312, 147), 100, 50, 2);
	level.createWall(new vec(0, 50), 89, 201, 2);
	level.createWall(new vec(0, 110), 132, 87, 2);
	level.createWall(new vec(0, 50), 165, 60, 2);
	level.createWall(new vec(166, 251), 50, 229, 2);
	level.createWall(new vec(166, 414), 634, 66, 2);
	level.createWall(new vec(0, 455), 167, 25, 2);
	level.createWall(new vec(0, 411), 44, 69, 2);
	level.createWall(new vec(0, 251), 44, 61, 2);
	level.createWall(new vec(581, 40), 141, 115, 2);
	level.createWall(new vec(526, 230), 102, 59, 2);
	level.createWall(new vec(722, 40), 78, 70, 2);
	level.createWall(new vec(722, 110), 78, 370, 2);
	level.createWall(new vec(0, 0), 800, 50, 2);

	level.createSpike(new vec(300, 147), 50, 2, new vec(-1, 0));
	level.createSpike(new vec(385, 197), 104, 2, new vec(-1, 0));

	level.createSpike(new vec(526, 110), 45, 2, new vec(1, 0));
	level.createSpike(new vec(628, 230), 59, 2, new vec(1, 0));
	level.createSpike(new vec(526, 289), 50, 2, new vec(1, 0));
	level.createSpike(new vec(165, 50), 60, 2, new vec(1, 0));
	level.createSpike(new vec(397, 98), 129, 2, new vec(0, -1));
	level.createSpike(new vec(312, 135), 85, 2, new vec(0, -1));
	level.createSpike(new vec(132, 110), 87, 2, new vec(1, 0));
	level.createSpike(new vec(44, 251), 61, 2, new vec(1, 0));
	level.createSpike(new vec(44, 411), 44, 2, new vec(1, 0));
	level.createSpike(new vec(281, 251), 50, 2, new vec(1, 0));
})();
(function initLevel15() {
	let level = World.create(World.worlds.length, new vec(154, 181), new vec(93, 307));

	level.createLayer("#F09D3C");
	level.createLayer("#9F51DC");
	
	// Layer 0
	level.createWall(new vec(760, 86), 40, 314, 0);
	level.createWall(new vec(125, 307), 118, 64, 0);
	level.createWall(new vec(0, 0), 90, 261, 0);
	level.createWall(new vec(210, 40), 153, 135, 0);
	level.createWall(new vec(0, 440), 800, 40, 0);
	level.createWall(new vec(405, 400), 395, 40, 0);
	level.createWall(new vec(210, 0), 590, 40, 0);
	level.createWall(new vec(417, 181), 209, 40, 0);
	level.createWall(new vec(417, 80), 63, 63, 0);
	level.createWall(new vec(527, 111), 98, 32, 0);
	level.createWall(new vec(210, 221), 153, 40, 0);
	level.createWall(new vec(313, 313), 92, 127, 0);
	level.createWall(new vec(0, 261), 25, 179, 0);
	level.createWall(new vec(90, 0), 120, 40, 0);
	level.createWall(new vec(585, 40), 40, 38, 0);

	level.createPortal(new vec(233, 434), 80, 6, 0, 2, new vec(0, -1), true);
	level.createPortal(new vec(754, 143), 6, 117, 0, 2, new vec(-1, 0), true);
	level.createPortal(new vec(204, 42), 6, 80, 0, 1, new vec(-1, 0), true);
	level.createPortal(new vec(27, 434), 80, 6, 0, 1, new vec(0, -1), true);

	level.createSpike(new vec(125, 295), 118, 0, new vec(0, -1));
	level.createSpike(new vec(313, 301), 92, 0, new vec(0, -1));
	level.createSpike(new vec(301, 313), 85, 0, new vec(-1, 0));
	level.createSpike(new vec(243, 307), 64, 0, new vec(1, 0));
	level.createSpike(new vec(90, 136), 125, 0, new vec(1, 0));
	level.createSpike(new vec(125, 428), 89, 0, new vec(0, -1));
	level.createSpike(new vec(88, 40), 108, 0, new vec(0, 1));
	level.createSpike(new vec(90, 37), 40, 0, new vec(1, 0));
	
	// Layer 1
	level.createWall(new vec(760, 0), 40, 400, 1);
	level.createWall(new vec(210, 50), 127, 102, 1);
	level.createWall(new vec(0, 440), 800, 40, 1);
	level.createWall(new vec(293, 400), 507, 40, 1);
	level.createWall(new vec(210, 0), 590, 50, 1);
	level.createWall(new vec(0, 0), 40, 240, 1);
	level.createWall(new vec(40, 122), 81, 118, 1);
	level.createWall(new vec(109, 240), 127, 119, 1);
	level.createWall(new vec(109, 420), 184, 20, 1);
	level.createWall(new vec(0, 420), 25, 20, 1);
	level.createWall(new vec(594, 0), 206, 152, 1);
	level.createWall(new vec(576, 240), 125, 115, 1);
	level.createWall(new vec(293, 240), 217, 160, 1);
	level.createWall(new vec(400, 114), 110, 38, 1);
	level.createWall(new vec(0, 240), 109, 119, 1);
	level.createWall(new vec(121, 0), 89, 40, 1);

	level.createSpike(new vec(564, 240), 115, 1, new vec(-1, 0));
	level.createSpike(new vec(576, 228), 125, 1, new vec(0, -1));
	level.createSpike(new vec(400, 102), 110, 1, new vec(0, -1));
	level.createSpike(new vec(400, 152), 110, 1, new vec(0, 1));
	level.createSpike(new vec(510, 114), 38, 1, new vec(1, 0));
	level.createSpike(new vec(388, 114), 38, 1, new vec(-1, 0));
	level.createSpike(new vec(701, 240), 115, 1, new vec(1, 0));
	level.createSpike(new vec(576, 355), 125, 1, new vec(0, 1));
	level.createSpike(new vec(121, 152), 53, 1, new vec(1, 0));

	// Layer 2
	level.createWall(new vec(760, 134), 40, 134, 2);
	level.createWall(new vec(170, 440), 630, 40, 2);
	level.createWall(new vec(390, 353), 410, 87, 2);
	level.createWall(new vec(100, 0), 700, 50, 2);
	level.createWall(new vec(440, 181), 227, 40, 2);
	level.createWall(new vec(390, 114), 50, 176, 2);
	level.createWall(new vec(170, 185), 100, 202, 2);
	level.createWall(new vec(0, 0), 100, 125, 2);
	level.createWall(new vec(0, 260), 170, 127, 2);

	level.createSpike(new vec(440, 221), 227, 2, new vec(0, 1));
	level.createSpike(new vec(667, 181), 40, 2, new vec(1, 0));
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