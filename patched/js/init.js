"use strict";

const { World, Render, player } = engine;

(function initLevel1() {
	let level1 = World.create(World.worlds.length, new vec(90, 225), new vec(649, 392));
	World.set(level1.index);

	level1.createLayer("#F09D3C");
	level1.createLayer("#9F51DC");
	
	level1.createWall(new vec(0, 0), 681, 87, 0);
	level1.createWall(new vec(681, 0), 119, 480, 0);
	level1.createWall(new vec(446, 167), 112, 400, 0);

	
	// ~ Extra for testing
	// layer 0
	level1.createWall(new vec(0, 302), 230, 60, 0);
	level1.createPortal(new vec(50, 296), 100, 6, 0, 1);

	// layer 1
	level1.createWall(new vec(0, 425), 233, 55, 1);
	level1.createWall(new vec(233, 0), 567, 480, 1);
	level1.createWall(new vec(0, 0), 20, 480, 1);
	level1.createWall(new vec(0, 0), 233, 296, 1);
	level1.createPortal(new vec(227, 325), 6, 100, 1, 2);

	// layer 2
	level1.createWall(new vec(564, 0), 242, 480, 2);
	level1.createWall(new vec(0, 0), 227, 480, 2);
	level1.createPortal(new vec(558, 325), 6, 100, 2, 0);
});
(function initLevel1() {
	let level = World.create(World.worlds.length, new vec(90, 225), new vec(649, 392));
	World.set(level.index);

	// level.createLayer("#F09D3C");
	// level.createLayer("#9F51DC");
	
	level.createWall(new vec(324, 0), 357, 87, 0);
	level.createWall(new vec(681, 0), 119, 480, 0);
	level.createWall(new vec(446, 167), 112, 400, 0);
})();
(function initLevel2() {
	let level = World.create(World.worlds.length, new vec(644, 108), new vec(159, 381));

	// level.createLayer("#F09D3C");
	// level.createLayer("#9F51DC");
	
	level.createWall(new vec(112, 0), 564, 57, 0);
	level.createWall(new vec(676, 0), 124, 480, 0);
	level.createWall(new vec(0, 140), 86, 248, 0);
	level.createWall(new vec(86, 140), 105, 82, 0);
	level.createWall(new vec(191, 140), 105, 193, 0);
	level.createWall(new vec(429, 193), 247, 140, 0);
	level.createWall(new vec(296, 453), 380, 27, 0);
})();
(function initLevel3() {
	let level = World.create(World.worlds.length, new vec(713, 57), new vec(622, 421));

	level.createLayer("#F09D3C");
	// level.createLayer("#9F51DC");

	// Layer 0
	level.createPortal(new vec(255, 174), 101, 6, 0, 1);
	level.createPortal(new vec(255, 323), 6, 130, 0, 1);
	
	level.createWall(new vec(0, 0), 255, 480, 0);
	level.createWall(new vec(0, 0), 255, 480, 0);
	level.createWall(new vec(255, 0), 490, 57, 0);
	level.createWall(new vec(745, 0), 55, 300, 0);
	level.createWall(new vec(255, 453), 399, 27, 0);
	level.createWall(new vec(255, 453), 399, 27, 0);
	level.createWall(new vec(255, 180), 399, 120, 0);

	// Layer 1
	level.createWall(new vec(261, 323), 261, 157, 1);
	level.createWall(new vec(0, 174), 56, 86, 1);
	level.createWall(new vec(0, -6), 516, 180, 1);
	level.createWall(new vec(516, 0), 284, 480, 1);
	level.createWall(new vec(0, 453), 261, 27, 1);
})();
(function initLevel4() {
	let level = World.create(World.worlds.length, new vec(64, 60), new vec(626, 300));

	level.createLayer("#F09D3C");
	// level.createLayer("#9F51DC");

	// Layer 0
	level.createPortal(new vec(162, 300), 6, 140, 0, 1);
	
	level.createWall(new vec(0, 0), 745, 58, 0);
	level.createWall(new vec(745, 0), 55, 480, 0);
	level.createWall(new vec(122, 250), 40, 230, 0);
	level.createWall(new vec(255, 440), 490, 40, 0);
	level.createWall(new vec(255, 250), 403, 50, 0);

	// Layer 1
	level.createWall(new vec(0, 0), 800, 300, 1);
	level.createWall(new vec(0, 180), 27, 273, 1);
	level.createWall(new vec(0, 440), 800, 40, 1);
	level.createWall(new vec(168, 300), 638, 140, 1);
})();
(function initLevel5() {
	let level = World.create(World.worlds.length, new vec(259, 365), new vec(93, 140));

	level.createLayer("#F09D3C");
	// level.createLayer("#9F51DC");

	// Layer 0
	level.createPortal(new vec(605, 40), 6, 130, 0, 1);
	level.createPortal(new vec(40, 391), 85, 6, 0, 1);
	level.createPortal(new vec(605, 182), 6, 66, 0, 1);
	level.createPortal(new vec(456, 182), 6, 66, 0, 1);
	level.createPortal(new vec(605, 327), 6, 70, 0, 1);
	
	level.createWall(new vec(125, 0), 40, 77, 0);
	level.createWall(new vec(0, 0), 125, 40, 0);
	level.createWall(new vec(0, 40), 40, 312, 0);
	level.createWall(new vec(342, 132), 40, 191, 0);
	level.createWall(new vec(342, 0), 269, 40, 0);
	level.createWall(new vec(611, 0), 189, 480, 0);
	level.createWall(new vec(0, 397), 611, 83, 0);
	level.createWall(new vec(342, 172), 114, 85, 0);

	// Layer 1
	level.createWall(new vec(605, 253), 97, 70, 1);
	level.createWall(new vec(708, 0), 92, 123, 1);
	level.createWall(new vec(780, 308), 20, 124, 1);
	level.createWall(new vec(0, 0), 86, 40, 1);
	level.createWall(new vec(0, 40), 40, 415, 1);
	level.createWall(new vec(0, 40), 40, 415, 1);
	level.createWall(new vec(462, 0), 143, 480, 1);
	level.createWall(new vec(40, 253), 187, 138, 1);
	level.createWall(new vec(0, 455), 462, 25, 1);
})();
(function initLevel6() {
	let level = World.create(World.worlds.length, new vec(310, 174), new vec(40, 221));

	level.createLayer("#F09D3C");
	level.createLayer("#9F51DC");

	// Layer 0
	level.createPortal(new vec(565, 174), 6, 75, 0, 1);
	level.createPortal(new vec(42, 302), 69, 6, 0, 1);
	level.createPortal(new vec(445, 391), 80, 6, 0, 1);
	
	level.createWall(new vec(0, 308), 113, 89, 0);
	level.createWall(new vec(0, 148), 40, 160, 0);
	level.createWall(new vec(403, 0), 71, 40, 0);
	level.createWall(new vec(0, 0), 310, 40, 0);
	level.createWall(new vec(270, 40), 40, 245, 0);
	level.createWall(new vec(624, 0), 136, 175, 0);
	level.createWall(new vec(624, 0), 136, 168, 0);
	level.createWall(new vec(0, 397), 611, 83, 0);
	level.createWall(new vec(565, 253), 58, 32, 0);
	level.createWall(new vec(760, 0), 40, 480, 0);
	level.createWall(new vec(525, 94), 40, 191, 0);

	// Layer 1
	level.createPortal(new vec(565, 25), 6, 70, 1, 2);
	level.createPortal(new vec(412, 141), 66, 6, 1, 2);
	level.createPortal(new vec(397, 385), 6, 75, 1, 2);
	level.createPortal(new vec(161, 194), 66, 6, 1, 2);

	level.createWall(new vec(0, 0), 571, 20, 1);
	level.createWall(new vec(0, 97), 154, 205, 1);
	level.createWall(new vec(154, 97), 79, 97, 1);
	level.createWall(new vec(0, 20), 40, 22, 1);
	level.createWall(new vec(300, 174), 30, 34, 1);
	level.createWall(new vec(300, 147), 271, 27, 1);
	level.createWall(new vec(0, 461), 571, 19, 1);
	level.createWall(new vec(0, 302), 37, 114, 1);
	level.createWall(new vec(403, 391), 37, 70, 1);
	level.createWall(new vec(403, 302), 168, 89, 1);
	level.createWall(new vec(571, 0), 229, 480, 1);

	// Layer 2
	level.createWall(new vec(357, 200), 40, 136, 2);
	level.createWall(new vec(0, 142), 40, 58, 2);
	level.createWall(new vec(104, 200), 50, 102, 2);
	level.createWall(new vec(0, 383), 397, 97, 2);
	level.createWall(new vec(154, 200), 79, 30, 2);
	level.createWall(new vec(0, 0), 565, 142, 2);
	level.createWall(new vec(565, 0), 235, 20, 2);
	level.createWall(new vec(672, 396), 82, 30, 2);
	level.createWall(new vec(490, 302), 52, 34, 2);
	level.createWall(new vec(754, 76), 46, 260, 2);
	level.createWall(new vec(780, 20), 20, 14, 2);
	level.createWall(new vec(542, 100), 94, 236, 2);
})();


Render.on("beforeRender", () => {
	animate.run();
});