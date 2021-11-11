"use strict";

const events = {
	up: [ function(keydown) { if (keydown) player.move("up") } ],
	down: [ function(keydown) { if (keydown) player.move("down") } ],
	left: [ function(keydown) { if (keydown) player.move("left") } ],
	right: [ function(keydown) { if (keydown) player.move("right") } ],
	enter: [ function(keydown) {
		if (keydown) {
			let enterText = document.getElementById("enterContinue");
			if (!enterText.classList.contains("active")) return;
			
			enterText.classList.remove("active");
			document.getElementById("winText").classList.remove("active");

			let tutorial = document.getElementById("tutorial");
			if (tutorial.classList.contains("active")) {
				tutorial.classList.remove("active");
				player.alive = true;
			}
			else {
				if (World.worldIndex + 1 === World.worlds.length) {
					let win = document.getElementById("win");
					win.classList.add("active");
				}
				else {
					World.set(World.worldIndex + 1);
					player.alive = true;
					curLevel = World.worldIndex;
					save();
				}
			}
		}
	} ],

	trigger: function(event, value) {
		let curEvents = events[event];
		if (curEvents && curEvents.length > 0) {
			for (let i = 0; i < curEvents.length; i++) {
				curEvents[i](value);
			}
		}
	}
}
const keys = {
	set up(val) {
		this._up = val;
		events.trigger("up", val);
	},
	set down(val) {
		this._down = val;
		events.trigger("down", val);
	},
	set left(val) {
		this._left = val;
		events.trigger("left", val);
	},
	set right(val) {
		this._right = val;
		events.trigger("right", val);
	},

	get up() {
		return this._up;
	},
	get down() {
		return this._down;
	},
	get left() {
		return this._left;
	},
	get right() {
		return this._right;
	},
	_up: false,
	_down: false,
	_left: false,
	_right: false,
}
window.addEventListener("keydown", event => {
	const key = event.key.toLowerCase();

	if (key === "w" || key === "arrowup") events.trigger("up", true);
	if (key === "s" || key === "arrowdown") events.trigger("down", true);
	if (key === "a" || key === "arrowleft") events.trigger("left", true);
	if (key === "d" || key === "arrowright") events.trigger("right", true);

	if (key === "q" && event.altKey) {
		document.getElementById("devTools").classList.toggle("active");
	}

	if (key === "enter" || key === " ") events.trigger("enter", true);
});
window.addEventListener("keyup", event => {
	const key = event.key.toLowerCase();

	if (key === "w" || key === "arrowup") events.trigger("up", false);
	if (key === "s" || key === "arrowdown") events.trigger("down", false);
	if (key === "a" || key === "arrowleft") events.trigger("left", false);
	if (key === "d" || key === "arrowright") events.trigger("right", false);

	if (key === "x") reset();
});


document.getElementById("mapInput").addEventListener("input", event => {
	let input = event.target;
	let fr = new FileReader();
	fr.readAsText(input.files[0]);

	let fname = input.files[0].name;
	let layer = window.layer ?? fname.includes("A") ? 0 : fname.includes("B") ? 1 : fname.includes("C") ? 2 : 0;

	fr.onload = function() {
		// Compile file
		let res = fr.result;
		let index = 0;
		
		let out = ""; // wall code
		let outPortal = ""; // portal code
		let outSpike = ""; // spike code
		
		function getNext() {
			let iStart = res.indexOf("<rect", index);
			let iEnd = res.indexOf("/>", index);
			let levelName = "level";

			if (iStart > index) {
				// define color vars
				let wall = "#494949";
				let portals = [ "#DDE2ED", "#F09D3C", "#9F51DC" ];
				let spikes = "#F44545";

				// get string of current rect
				let rectText = res.slice(iStart + 5, iEnd);

				// create rect object from string
				let rectArr = rectText.trim().split(" ");
				let rect = {};
				for (let i = 0; i < rectArr.length; i++) {
					let piece = rectArr[i].split("=");
					if (piece[0] === "") continue;

					try {
						piece[1] = piece[1].replace(/\"/g, "");
						rect[piece[0]] = !isNaN(Number(piece[1])) ? Number(piece[1]) : piece[1];
					}
					catch(err) {
						console.error(i, rectArr);
						console.error(err);
					}
				}
				// add obj defaults
				if (!rect.x) rect.x = 0;
				if (!rect.y) rect.y = 0;
				if (!rect.rx) rect.rx = 0;
				if (!rect.fill) rect.fill = wall;

				if (!rect.width || !rect.height) {
					console.error(rectText);
					index = iEnd + 2;
					return;
				}

				if (!rect.fill || rect.fill === wall) { // export as wall
					out += `\n\t${ levelName }.createWall(new vec(${ rect.x }, ${ rect.y }), ${ rect.width }, ${ rect.height }, ${ layer });`;
				}
				else if (portals.includes(rect.fill) && portals.indexOf(rect.fill) > layer) { // export as teleporter
					let vec = "1, 0";
					if (rect.width < rect.height) {
						if (rect.rx === 0) vec = "1, 0";
						else vec = "-1, 0";
					}
					else {
						if (rect.rx === 0) vec = "0, 1";
						else vec = "0, -1";
					}

					outPortal += `\n\t${ levelName }.createPortal(new vec(${ rect.x }, ${ rect.y }), ${ rect.width }, ${ rect.height }, ${ layer }, ${ portals.indexOf(rect.fill) }, new vec(${ vec }), true);`;
				}
				else if (rect.fill === spikes) { // export as spike
					let vec = "1, 0";
					if (rect.width < rect.height) {
						if (rect.rx === 0) vec = "1, 0";
						else vec = "-1, 0";
					}
					else {
						if (rect.rx === 0) vec = "0, 1";
						else vec = "0, -1";
					}

					outSpike += `\n\t${ levelName }.createSpike(new vec(${ rect.x }, ${ rect.y }), ${ Math.max(rect.width, rect.height) }, ${ layer }, new vec(${ vec }));`;
				}

				index = iEnd + 2;
			}
			else {
				index = -1;
			}
		}

		while (index !== -1) {
			getNext();
		}

		out += "\n" + outPortal;
		out += (outPortal ? "\n" : "") + outSpike;
		out = "\n\t" + out.trim();
		navigator.clipboard.writeText(out);
		console.log(out);
		input.value = "";
	}
});