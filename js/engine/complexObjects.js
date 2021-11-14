"use strict";

class Button {
	power = 1;
	out = false;
	type = "button";
	offset = new vec(0, 0);
	
	active = false;
	_default = false;
	get default() { return this._default }
	set default(val) {
		if (this.default !== val) {
			this._default = val;

			if (this.default === true) {
				animations.buttonDown(this, 0, 0);
			}
			else {
				animations.buttonUp(this, 0, 0);
			}
		}
	}

	permanentPress = true;
	pressed = false;

	constructor(options) {
		this.position = options.position;
		this.width = options.width;
		this.height = options.height;
		this.direction = options.direction;
	}
	trigger() {
		if (!this.active) {
			this.active = true;
			if (this.out) this.out.updatePower(this);
			animations.buttonDown(this);
		}
		else {
			this.active = false;
			if (this.out) this.out.updatePower(this);
			animations.buttonUp(this);
		}
	}
	reset() {
		this.pressed = false;

		if (this.active !== this.default) {
			this.active = this.default;

			if (!this.active) {
				if (this.out) this.out.updatePower(this);
				animations.buttonUp(this);
			}
			else {
				if (this.out) this.out.updatePower(this);
				animations.buttonDown(this);
			}
		}
	}
}
class Piston {
	type = "piston";
	
	power = 0;
	maxPower = 1;

	offset = new vec(0, 0);

	active = true;
	_default = true;
	get default() { return this._default }
	set default(val) {
		if (this.default !== val) {
			this._default = val;
			this.active = val;

			if (this.default === true) {
				animations.pistonOn(this, 0, 0);
			}
			else {
				animations.pistonOff(this, 0, 0);
			}
		}
	}

	constructor(options) {
		this.position = options.position;
		this.width = options.width;
		this.height = options.height;
		this.direction = options.direction;
		this.active = options.active ?? true;
		this.default = options.default ?? true;

		return this;
	}
	setDefault(val) {
		this.default = val;
		return this;
	}
	setMaxPower(val) {
		this.maxPower = val;
		return this;
	}
	updatePower(obj) {
		if (obj.active) this.power += obj.power;
		else this.power -= obj.power;

		if (this.power >= this.maxPower) {
			this.trigger(!this.default);
		}
		else if (this.active !== this.default) {
			this.trigger(this.default);
		}
	}
	trigger(active = !this.active, instant = false) {
		if (this.active !== active) {
			this.active = active;
	
			if (!active) {
				if (instant) animations.pistonOff(this, 0, 0);
				else animations.pistonOff(this);
			}
			else {
				if (instant) animations.pistonOn(this, 0, 0);
				else animations.pistonOn(this);
			}
		}
	}
	reset() {
		if (this.active !== this.default) {
			this.active = this.default;
			
			if (this.active) {
				animations.pistonOn(this, 50, 0);
			}
			else {
				animations.pistonOff(this, 50, 0);
			}
		}
	}
}

class Wire {
	type = "wire";
	power = 0;
	maxPower = 1;
	in = [];
	out = [];
	vertices = [];
	color = "#32B4D0";

	constructor(options) {
		this.vertices = options.vertices;
	}

	connectIn(obj) {
		if (obj.type) {
			this.in.push(obj);

			if (obj.type === "wire") obj.out.push(this);
			else obj.out = this;
		}
		else {
			console.error("connected obj does not have type: ");
			console.error(obj);
		}

		return this;
	}
	connectOut(obj) {
		if (obj.type) {
			this.out.push(obj);

			if (obj.type === "wire") {
				obj.connectIn(this);
			}
			else {
				obj.in = this;

				if (obj.maxPower) {
					this.updateMaxPower(obj.maxPower);
				}
			}
		}
		else {
			console.error("connected obj does not have type: ");
			console.error(obj);
		}

		return this;
	}
	updateMaxPower(max) {
		this.maxPower = max;

		this.in.forEach(obj => {
			if (obj.type === "wire") {
				obj.updateMaxPower(Math.max(1, max - 1));
			}
		});
	}
	updatePower(obj) {
		if (obj.active) this.power += obj.power;
		else this.power -= obj.power;

		for (let i = 0; i < this.out.length; i++) {
			let out = this.out[i];
			if (out && out.updatePower) {
				out.updatePower(obj);
			}
		}
	}
}