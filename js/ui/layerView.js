"use strict";

var mouse = new vec(0, 0);
Render.loadImg("x.svg");
Render.loadImg("viewing.svg");

const layerView = {
	originalOpacity: 0.85,
	opacity: 0.85,
	hovering: false,

	top: 5,
	left: 7,
}

Render.on("afterRender", () => {
	if (inTitle || inHome) return;
	// 40px width/height of blocks, 50px total width, 5px margins
	// ctx.drawImage(Render.images.x, canv.width - 56 - 6, 6);
	let { curWorld } = World;
	let numLayers = curWorld.layers.length;
	let cam = Render.position;

	ctx.fillStyle = "#535353";

	ctx.globalAlpha = layerView.opacity;
	Render.roundedRect(layerView.left - cam.x, layerView.top - cam.y, 50, numLayers * 42 + 8, 6);

	for (let i = 0; i < numLayers; i++) {
		let x = layerView.left + 6;
		let y = i * 42 + layerView.top + 6;

		ctx.fillStyle = curWorld.layers[i].color;
		Render.roundedRect(x + cam.x, y + cam.y, 38, 38, 3);

		if (curWorld.curLayer === i && Render.images["x"] !== undefined) {
			let h = 20;
			let w = h;
			ctx.drawImage(Render.images["x"], x + 38/2 - w/2, y + 38/2 - h/2, w, h);
		}
		else if (curWorld.curViewingLayer === i && Render.images["viewing"] !== undefined) {
			let h = 20;
			let w = h * 1.5;
			ctx.drawImage(Render.images["viewing"], x + 38/2 - w/2, y + 38/2 - h/2, w, h);
		}
	}

	ctx.globalAlpha = 1;
});

canv.addEventListener("mousemove", event => {
	let { curWorld } = World;
	let numLayers = curWorld.layers.length;
	let position = new vec(event.offsetX / canv.width * 800, event.offsetY / canv.height * 480);
	let hovering = false;

	mouse.x = position.x;
	mouse.y = position.y;

	if (position.y > layerView.top && position.y < numLayers * 42 + 8 + layerView.top && position.x > layerView.left && position.x < layerView.left + 50) {
		layerView.opacity = 1;

		// check if hovering over cells
		for (let i = 0; i < numLayers; i++) {
			let x = layerView.left + 6;
			let y = i * 42 + layerView.top + 6;
			let w = 38;
			let h = 38;
			
			if (position.x > x && position.x < x + w && position.y > y && position.y < y + h) {
				hovering = i;
				break;
			}
		}
	}
	else {
		layerView.opacity = layerView.originalOpacity;
	}

	if (hovering !== false) {
		canv.style.cursor = "pointer";
	}

	layerView.hovering = hovering;
});

canv.addEventListener("click", () => {
	let hover = layerView.hovering;
	if (hover !== false) {
		let World = engine.World;
		if (World.curWorld.curViewingLayer !== hover) {
			World.switchView(hover);
		}
	}
});

window.dispatchEvent(new CustomEvent("layerViewLoad"));