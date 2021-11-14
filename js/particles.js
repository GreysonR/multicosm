"use strict";

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

class Particle {
	position = new vec(0, 0);
	velocity = new vec(0, 0);
	options = {
		size: 6,
		color: "#F48D43",
		friction: 0.95,
		opacity: 1,
		decayTime: 1900,
	};

	constructor(position, velocity, options) {
		this.position = position;
		this.velocity = velocity;
		this.options = mergeObj(this.options, options);
		this.creationTime = options.creationTime ?? performance.now();
		this.emissive = options.emissive ?? false;
	}
}

function addBodyParticles(body, direction, pos, adjustPos = false) {
	body.particles = [];

	let alongX = direction.x !== 0;
	for (let i = 0; i < 13; i++) {
		let position;
		let velocity;

		if (alongX) {
			position = pos.add({ x: 0, y: Math.random() * 50 });
			velocity = direction.mult({ x: Math.random() ** 1.2 * 6, y: 0 });
		}
		else {
			position = pos.add({ y: 0, x: Math.random() * 50 });
			velocity = direction.mult({ y: Math.random() ** 1.2 * 6, x: 0 });
		}

		if (adjustPos) {
			if (velocity.y < 0) position.y += 32;
			if (velocity.x < 0) position.x += 32;
		}

		body.particles.push(new Particle(position, velocity, {
			color: body.color,
			decaySpeed: velocity.length / 350 + 0.008,
			decayTime: 3000,
			size: Math.round(Math.random() * 2 + 5),
		}));
		body.lastParticleUpdate = Performance.lastUpdate;
	}
}
function updateBodyParticles(body) {
	let particles = body.particles;
	const fps = Performance.fps;

	/*
	if (Performance.lastUpdate - body.lastParticleUpdate > 40) {
		delete body.lastParticleUpdate;
		delete body.particles;
		return;
	}*/
	body.lastParticleUpdate = Performance.lastUpdate;

	for (let i = 0; i < particles.length; i++) {
		let p = particles[i];
		p.velocity.mult2(1 - (1 - p.options.friction) * 144 / fps);
		p.position.add2(p.velocity.mult(144 / fps));
		p.options.opacity -= p.options.decaySpeed * 144 / fps;

		if (p.options.opacity <= 0) {
			particles.splice(i, 1);
			i--;
		}
	}

	if (body.particles.length === 0) {
		delete body.lastParticleUpdate;
		delete body.particles;
	}
}

function updatePortalParticles(portal) {
	if (portal.particles === undefined) portal.particles = [];

	if (!portal.lastEmissiveParticle) portal.lastEmissiveParticle = 0;

	const len = Math.max(portal.width, portal.height) - 5;
	if (performance.now() - portal.lastEmissiveParticle > 120) {
		portal.lastEmissiveParticle = performance.now();

		let alongX = portal.direction.x !== 0;
		let position;
		let velocity;
	
		if (alongX) {
			position = portal.position.add({ x: 0, y: Math.random() * (len - 10) + 5 });
			velocity = portal.direction.mult({ x: Math.random() * 0.3 + 0.15, y: 0 });
		}
		else {
			position = portal.position.add({ y: 0, x: Math.random() * (len - 10) + 5 });
			velocity = portal.direction.mult({ y: Math.random() * 0.3 + 0.15, x: 0 });
		}

		portal.particles.push(new Particle(position, velocity, {
			color: portal.color,
			opacity: 0.4,
			decaySpeed: (velocity.length * 0.01 + 0.003) / 3.5,
			friction: 0.995,
			size: Math.random() + 5,
			emissive: true,
		}));
	}
}