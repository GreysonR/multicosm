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

	if (key === "enter" || key === " ") events.trigger("enter", true);
});
window.addEventListener("keyup", event => {
	const key = event.key.toLowerCase();

	if (key === "w" || key === "arrowup") events.trigger("up", false);
	if (key === "s" || key === "arrowdown") events.trigger("down", false);
	if (key === "a" || key === "arrowleft") events.trigger("left", false);
	if (key === "d" || key === "arrowright") events.trigger("right", false);
});