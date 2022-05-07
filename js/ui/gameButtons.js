"use strict";

Render.loadImg("home.svg");
Render.loadImg("reset.svg");

const gameButtons = {
	hovering: false,

	width: 48,
	height: 94,
	top: 5,
	right: 6,

	opacity: 0.8,
}

Render.on("afterRender", () => {
	if (inTitle || inHome) return;
	const { top, right, width, height, opacity } = gameButtons;
	const x = 800 - right - width;
	

	// background
	ctx.fillStyle = "#404040";
	Render.roundedRect(x, top, width, height, 8);

	if (gameButtons.hovering == "home") ctx.globalAlpha = 1; 
	else ctx.globalAlpha = opacity;
	if (Render.images["home"]) ctx.drawImage(Render.images["home"], x + 7, top + 5, 34, 33);

	if (gameButtons.hovering == "reset") ctx.globalAlpha = 1; 
	else ctx.globalAlpha = opacity;
	if (Render.images["reset"]) ctx.drawImage(Render.images["reset"], x + 7, top + 53, 34, 34);

	ctx.globalAlpha = 1;
});


canv.addEventListener("mousemove", event => {
	const { top, right, width, height } = gameButtons;
	const x = 800 - right - width;
	let mx = event.offsetX / canv.width * 800;
	let my = event.offsetY / canv.height * 480;
	let hovering = false;

	if (my > top && my < top + height && mx > x && mx < x + width) {
		if (Math.abs(mx - (x + 7) - 34/2) < 34/2 && Math.abs(my - top - 5 - 33/2) < 33/2) { // hovering home button
			hovering = "home";
		}
		if (Math.abs(mx - (x + 7) - 34/2) < 34/2 && Math.abs(my - top - 53 - 34/2) < 34/2) { // hovering reset button
			hovering = "reset";
		}
	}

	if (hovering !== false) {
		canv.style.cursor = "pointer";
	}
	else if (layerView.hovering === false) {
		canv.style.cursor = "";
	}

	gameButtons.hovering = hovering;
});

canv.addEventListener("click", () => {
	let { hovering } = gameButtons;
	if (hovering !== false) {
		if (hovering === "home") {
			openHome();
		}
		if (hovering === "reset") {
			events.trigger("reset", true);
		}
	}
});