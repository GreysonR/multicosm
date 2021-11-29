"use strict";

// https://easings.net/
const animate = {
	running: [],
	run: function() {
		let i = this.running.length;

		if (i > 0) {
			for (i; i--;) {
				this.running[i]();
			}
		}
	},
	create: function({ duration = 600, curve = ease.inOut.sine, start = 0, delay = 0, oncancel, onend, callback }) {
		let t = start * duration;
		let p = t !== 0 && t !== 1 ? curve(t) : t === 0 ? 0 : 1;
		let run = true;

		function loop() {
			if (run === true) {
				t += Performance.delta;

				p = curve(t / duration);
				callback(p);

				if (t >= duration) {
					run = false;
					animate.running.splice(animate.running.indexOf(loop), 1);
				}
				if (t >= duration) {
					if (typeof onend === "function") {
						onend();
					}
				}
			}
		}

		if (delay > 0) {
			setTimeout(() => {
				this.running.push(loop);
			}, delay);
		}
		else {
			this.running.push(loop);
		}

		return {
			duration: duration,
			get percent() {
				return p;
			},
			set percent(value) {
				p = Math.max(0, Math.min(value, 1));
			},
			stop: () => {
				if (run === true) {
					run = false;
					if (typeof oncancel === "function") {
						oncancel(p);
					}
					return p;
				}
			},
			start: () => {
				if (run === false) {
					run = true;
					setTimeout(loop, delay);
				}
			},
		};
	},
	linear: x => x,
	in: {
		sine: x => 1 - Math.cos((x * Math.PI) / 2),
		quadratic: x => x ** 2,
		cubic: x => x ** 3,
		quartic: x => x ** 4,
		quintic: x => x ** 5,
		exponential: x => x === 0 ? 0 : pow(2, 10 * x - 10),
		circular: x => 1 - Math.sqrt(1 - Math.pow(x, 2)),
		back: x => { const c1 = 1.70158; const c3 = c1 + 1; return c3 * x ** 3 - c1 * x ** 2; }
	},
	out: {
		sine: x => Math.sin((x * Math.PI) / 2),
		quadratic: x => 1 - (1 - x) ** 2,
		cubic: x => 1 - Math.pow(1 - x, 3),
		quartic: x => 1 - Math.pow(1 - x, 4),
		quintic: x => 1 - Math.pow(1 - x, 5),
		exponential: x => x === 1 ? 1 : 1 - Math.pow(2, -10 * x),
		circular: x => Math.sqrt(1 - Math.pow(x - 1, 2)),
		back: x => { const c1 = 2; const c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); }
	},
	inOut: {
		sine: x => -(Math.cos(Math.PI * x) - 1) / 2,
		quadratic: x => x < 0.5 ? 2 * x ** 2 : 1 - Math.pow(-2 * x + 2, 2) / 2,
		cubic: x => x < 0.5 ? 4 * x ** 3 : 1 - Math.pow(-2 * x + 2, 3) / 2,
		quartic: x => x < 0.5 ? 8 * x ** 4 : 1 - Math.pow(-2 * x + 2, 4) / 2,
		quintic: x => x < 0.5 ? 16 * x ** 5 : 1 - Math.pow(-2 * x + 2, 5) / 2,
		exponential: x => x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2,
		circular: x => x < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2,
		back: x => { const c1 = 1.70158; const c2 = c1 * 1.525; return x < 0.5 ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2; },
	}
}
const ease = animate;


const animations = {
	move: function(from, to, coins=[], curveType = ease.inOut, durationMult = 1.2, keepMoving = false) {
		if (Array.isArray(durationMult)) {
			coins = durationMult;
			durationMult = 1.2;
		}
		if (Array.isArray(curveType)) {
			coins = curveType;
			curveType = ease.inOut;
		}

		let diff = to.sub(from);
		let dir = diff.normalized();
		let m = 0.38;
		let duration = Math.min(200, diff.length * m) * durationMult; // 160, 0.38
		let curve = typeof curveType === "function" ? curveType : curveType.cubic;


		let gradient;
		if (from.x - to.x) {
			let dx = Math.sign(from.x - to.x);
			gradient = ctx.createLinearGradient(200*dx + 32, 0, -200*dx + 32,0);
		}
		else {
			let dy = Math.sign(from.y - to.y);
			gradient = ctx.createLinearGradient(0,200*dy + 32, 0,-200*dy + 32);
		}
		gradient.addColorStop(0, "#FF537D00");
		gradient.addColorStop(1, "#FF537D");


		player.moving = true;
		Trail.addBody(player, gradient);

		function stop() {
			player.position = to;
			delete player.animation;

			player.moving = keepMoving;
			Trail.removeBody(player);
		}

		player.animation = animate.create({
			duration: duration,
			curve: curve,
			callback: (p) => {
				player.position = from.add(diff.mult(p));

				for (let i = 0; i < coins.length; i++) {
					let coin = coins[i];
					let d = player.position.add(16).sub(coin.position.add(12.5)).mult(dir);
					if (!coin.collected && (d.x > 0 || d.y > 0)) { // pick up coin
						coin.collected = true;

						if (!coin.collectedPrev) {
							World.curWorld.collectedCoins.push(coin.id);
						}
					}
				}
			},
			onend: stop,
			oncancel: stop,
		});
	},
	cameraShake: function(from, to, duration, callback) {
		let diff = to.sub(from);

		return animate.create({
			duration: duration,
			curve: ease.linear,
			callback: (p) => {
				Render.position = from.add(diff.mult(p));
			},
			onend: () => {
				Render.position = to;

				if (callback) {
					callback();
				}
			},
		});
	},
	buttonDown: function(button) {
		let to = button.direction.mult(-6);

		return animate.create({
			duration: 150,
			delay: 20,
			curve: ease.out.back,
			callback: (p) => {
				button.offset = to.mult(p);
			},
			onend: () => {
				button.offset = to;
			},
		});
	},
	buttonUp: function(button) {
		let diff = button.direction.mult(6);
		let from = new vec(button.offset);

		return animate.create({
			duration: 100,
			delay: 20,
			curve: ease.out.cubic,
			callback: (p) => {
				button.offset = from.add(diff.mult(p));
			},
			onend: () => {
				button.offset = new vec(0, 0);
			},
		});
	},
	pistonOff: function(piston, duration = 400, delay = 0) {
		let from = new vec(piston.offset);
		let diff = piston.direction.mult(-Math.max(piston.width, piston.height)).sub(from);

		let anim = animate.create({
			delay: delay,
			duration: duration,
			curve: ease.out.cubic,
			callback: (p) => {
				piston.offset = from.add(diff.mult(p));
			},
			onend: () => {
				piston.offset = from.add(diff);
				delete piston.animation;
			},
		});

		if (piston.animation) piston.animation.stop();
		piston.animation = anim;
	},
	pistonOn: function(piston, duration = 400, delay = 0) {
		let from = new vec(piston.offset);
		let diff = piston.direction.mult(Math.max(piston.width, piston.height));

		let anim = animate.create({
			delay: delay,
			duration: duration,
			curve: ease.out.cubic,
			callback: (p) => {
				piston.offset = from.add(diff.mult(p));
			},
			onend: () => {
				piston.offset = from.add(diff);
				delete piston.animation;
			},
		});
		if (piston.animation) piston.animation.stop();
		piston.animation = anim;
	},
}