"use strict";

const canv = document.getElementById("canv");
const ctx = canv.getContext("2d");

const engine = {
	Performance: {
		fps: 60,
		lastUpdate: 0,
		delta: 16.67,
		update() {
			let Performance = engine.Performance;
			let cur = performance.now();
			Performance.delta = cur - Performance.lastUpdate;
			Performance.lastUpdate = cur;
			Performance.fps = 1000 / Performance.delta;

		}
	},
	World: {
		worlds: [],
		curWorld: undefined,
		worldIndex: -1,
		
		create: function(index = this.worlds.length, start, end) {
			let world = {
				index: index,
				start: start,
				end: {
					position: end,
					layer: 0,
				},

				layers: [],
				get curLayer() {
					return world._curLayer;
				},
				set curLayer(val) {
					world._curLayer = val;
					world.curViewingLayer = val;
				},
				_curLayer: 0,
				curViewingLayer: 0,
				get layer() {
					return world.layers[world.curLayer];
				},
				get viewingLayer() {
					return world.layers[world.curViewingLayer];
				},

				createLayer: function(color) {
					let index = world.layers.length;
					let layer = {
						color: color,
						// index: index,
						walls: [],
						portals: [],
						spikes: [],
					}
					
					world.layers[index] = layer;
					return layer;
				},
				createWall: function(position, width, height, layer) {
					let wall = {
						type: "wall",
						position: position,
						width: width,
						height: height,
					}
					world.layers[layer].walls.push(wall);
				},
				createPortal: function(position, width, height, layerIn, layerTo, direction, flipped = false) {
					// Portal in layerIn
					let portal1 = {
						type: "portal",
						position: position,
						width: width,
						height: height,
						to: layerTo,
						direction: direction,
						points: [],
						sizes: [],
						
						color: world.layers[layerTo].color,
					}
					world.layers[layerIn].portals.push(portal1);
					
					// Portal in layerTo
					let portal2 = {
						type: "portal",
						position: position,
						width: width,
						height: height,
						to: layerIn,
						direction: flipped ? direction : direction.inverse(),
						points: [],
						sizes: [],
						
						color: world.layers[layerIn].color,
					}
					world.layers[layerTo].portals.push(portal2);

					function genPoints(portal) { // generates points for each part of rendered portal (basically caches the points)
						function rotV(vert) { // rotates vertice to correct position
							vert.x = (vert.x / 100) * Math.max(width, height);
							let direction = portal.direction;

							if (direction.x !== 0) {
								let tmp = vert.x;
								vert.x = vert.y;
								vert.y = tmp;
	
								if (direction.x > 0) {
									vert.x = vert.x * -1 + 5;
								}
								else {
									vert.x -= 6;
								}
							}
							if (direction.y > 0) {
								vert.y = vert.y * -1 + 5;
							}
							else if (direction.y < 0) {
								vert.y -= 6;
							}

							return vert;
						}
						function rotS(vert) {
							let direction = portal.direction;
							vert.x = (vert.x / 100) * Math.max(width, height);
							if (direction.x !== 0) {
								let tmp = vert.x;
								vert.x = vert.y;
								vert.y = tmp;
							}
							return vert;
						}

						// sizes
						portal.sizes.push(rotS(new vec(92, 6)));
						portal.sizes.push(rotS(new vec(100, 7)));
						portal.sizes.push(rotS(new vec(15,  7)));
						portal.sizes.push(rotS(new vec(42,  7)));
						portal.sizes.push(rotS(new vec(15,  7)));

						// points
						portal.points.push(rotV(new vec(4,  0)));
						portal.points.push(rotV(new vec(0,  6)));
						portal.points.push(rotV(new vec(0,  6)));
						portal.points.push(rotV(new vec(29, 6)));
						portal.points.push(rotV(new vec(85, 6)));
					}
					genPoints(portal1);
					genPoints(portal2);

					portal1.sibling = portal2;
					portal2.sibling = portal1;
				},
				createSpike: function(position, len, layer, direction, sHeight = 12) { // direction = direction that points of spikes face
					let width;
					let height;

					if (direction.x !== 0) {
						width = 12;
						height = len;
					}
					else {
						height = 12;
						width = len;
					}

					let verts = [];
					let spike = {
						type: "spike",
						position: position,
						direction: direction,
						width: width,
						height: height,
						vertices: verts,
					}

					// - compute vertices
					let num = Math.floor((len - 24) / 12); // 24px for start and end, 12px "wavelength"
					let scale = len / ((num + 2) * 12);
					
					function rotV(vert) { // rotates vertice to correct position
						if (direction.x !== 0) {
							let tmp = vert.x;
							vert.x = vert.y;
							vert.y = tmp;

							if (direction.x > 0) {
								vert.x = vert.x * -1 + sHeight;
							}
						}
						if (direction.y > 0) {
							vert.y = vert.y * -1 + sHeight;
						}

						vert.add2(position);
						return vert;
					}

					verts.push(rotV(new vec(len, sHeight)));
					verts.push(rotV(new vec(0, sHeight)));

					for (let i = 0; i < num * 2 + 1; i++) {
						// ~ make vertice of left-to-right spikes - looks like /\/\/\/\/\ before rotated
						let x = (i * 6 + 12) * scale;
						let y = (i % 2) * 5;

						// ~ add to verts
						verts.push(rotV(new vec(x, y)));
					}

					world.layers[layer].spikes.push(spike);
				} 
			}
			// Create default layer
			world.createLayer("#F7ECE1"); // DDE2ED

			// Add to global worlds
			this.worlds[index] = world;

			return world;
		},
		set: function(index) {
			// Set world
			index = Math.min(index, this.worlds.length - 1);
			this.worldIndex = index;
			this.curWorld = this.worlds[index];

			// Reset player
			engine.player.position = new vec(this.curWorld.start);

			if (engine.player.trail) {
				engine.player.trail.lastPositions.length = 0;
			}
		},
		switchView: function(index) {
			this.curWorld.curViewingLayer = index;
		}
	},
	Render: (() => {
		const Render = function() {
			requestAnimationFrame(Render);
			engine.Performance.update();
			
			// Check if renderer is enabled
			if (Render.enabled !== true) return;

			// Check if the world exists
			const { World } = engine;
			const { curWorld } = World;
			const pr = Render.pixelRatio; // pixel ratio
			if (!curWorld) return;

			// Get the current layer
			const { end, viewingLayer:layer, curLayer, curViewingLayer } = curWorld;
			const { walls, portals, spikes } = layer;

			ctx.clearRect(0, 0, canv.width, canv.height);

			ctx.save();
			ctx.translate(Render.position.x, Render.position.y)
			// ctx.translate(-8 + Render.position.x, -5 + Render.position.y)
			// ctx.scale(1.02, 1.02);
			
			// Render Background
			ctx.fillStyle = layer.color;
			ctx.fillRect(0, 0, canv.width / pr, canv.height / pr);

			Render.trigger("beforeRender");

			// Render player
			if (player.render && curViewingLayer === curLayer) {
				const player = engine.player;
				ctx.fillStyle = "#FF537D";
				// ctx.fillRect(player.position.x, player.position.y, 32, 32);
				Render.roundedRect(player.position.x, player.position.y, 32, 32, 2);
			}

			// Render Portals
			for (let i = 0; i < portals.length; i++) {
				let portal = portals[i];

				// render particles
				updatePortalParticles(portal);
				if (portal.particles) {
					updateBodyParticles(portal);

					if (portal.particles) {
						let now = performance.now();
						for (let j = 0; j < portal.particles.length; j++) {
							let p = portal.particles[j];
							let decay = Math.max(0, 1 - (now - p.creationTime) / p.options.decayTime);

							ctx.globalAlpha = p.options.opacity;
							ctx.fillStyle = p.options.color;
							ctx.fillRect(p.position.x, p.position.y, p.options.size * decay, p.options.size * decay);
						}
						ctx.globalAlpha = 1;
					}
				}

				// simple portal
				/*ctx.fillStyle = portal.color;
				ctx.fillRect(portal.position.x, portal.position.y, portal.width, portal.height);
				/* */

				// decent portal
				/*
				let rounds;
				let ra = 4;
				if (portal.direction.x > 0) rounds = [ 0, ra, ra, 0 ];
				else if (portal.direction.x < 0) rounds = [ ra, 0, 0, ra ];
				else if (portal.direction.y > 0) rounds = [ 0, 0, ra, ra ];
				else if (portal.direction.y < 0) rounds = [ ra, ra, 0, 0 ];
				ctx.fillStyle = portal.color;
				Render.roundedRect(portal.position.x, portal.position.y, portal.width, portal.height, rounds);
				/* */

				// fancy portal
				let { position, points, sizes } = portal;
				let colors = [ portal.color, "#4F4F4F", "#3D3D3D", "#3D3D3D", "#3D3D3D" ];
				for (let i = 0; i < points.length; i++) {
					ctx.fillStyle = colors[i];
					let pt = points[i];
					let size = sizes[i];

					if (i <= 1) {
						let rounds;
						let ra = 3;
						if (portal.direction.x > 0) rounds = [ 0, ra, ra, 0 ];
						else if (portal.direction.x < 0) rounds = [ ra, 0, 0, ra ];
						else if (portal.direction.y > 0) rounds = [ 0, 0, ra, ra ];
						else if (portal.direction.y < 0) rounds = [ ra, ra, 0, 0 ];
						Render.roundedRect(position.x + pt.x, position.y + pt.y, size.x, size.y, rounds);
					}
					else {
						/*
						let rounds;
						let ra = 3;
						if (portal.direction.x > 0) rounds = [ 0, ra, ra, 0 ];
						else if (portal.direction.x < 0) rounds = [ ra, 0, 0, ra ];
						else if (portal.direction.y > 0) rounds = [ 0, 0, ra, ra ];
						else if (portal.direction.y < 0) rounds = [ ra, ra, 0, 0 ];*/

						Render.roundedRect(position.x + pt.x, position.y + pt.y, size.x, size.y, 4);
					}
				}
				/* */
			}

			
			// Render End
			if (curViewingLayer === end.layer) {
				ctx.fillStyle = "#6BCB6F";
				Render.roundedRect(end.position.x, end.position.y, 32, 32, 3);
			}

			// Render particles
			if (player.particles) {
				updateBodyParticles(player);

				if (player.particles) {
					ctx.fillStyle = "#FF537D";

					for (let j = 0; j < player.particles.length; j++) {
						let p = player.particles[j];
						ctx.globalAlpha = p.options.opacity;
						ctx.fillStyle = p.options.color;
						ctx.fillRect(p.position.x, p.position.y, p.options.size, p.options.size);
					}
					ctx.globalAlpha = 1;
				}
			}

			// Render spikes
			for (let i = 0; i < spikes.length; i++) {
				let spike = spikes[i];
				let verts = spike.vertices;
				ctx.fillStyle = "#F44545";
				ctx.strokeStyle = "#F44545";
				ctx.lineWidth = 0.5;
				
				ctx.beginPath();
				ctx.moveTo(verts[0].x, verts[0].y);
				for (let i = 1; i < verts.length; i++) {
					ctx.lineTo(verts[i].x, verts[i].y);
				}
				ctx.closePath();
				ctx.fill();
				ctx.stroke();
			}

			// Render Walls
			ctx.fillStyle = "#494949";
			for (let i = 0; i < walls.length; i++) {
				let wall = walls[i];
				// ctx.fillRect(wall.position.x - 0.5, wall.position.y - 0.5, wall.width + 0.5, wall.height + 0.5);
				Render.roundedRect(wall.position.x, wall.position.y, wall.width, wall.height, 3);
			}

			Render.trigger("afterRender");
			ctx.restore();
		}
		Render.pixelRatio = 1;
		Render.layer = 0;
		Render.enabled = true;
		Render.position = new vec(0, 0);

		// ~ useful function for rendering
		Render.roundedRect = function(x, y, width, height, radius) {
			ctx.beginPath();

			let ra, rb, rc, rd;
			if (typeof radius === "object") {
				ra = radius[1];
				rb = radius[2];
				rc = radius[3];
				rd = radius[0];
			}
			else {
				ra = rb = rc = rd = radius;
			}

			ctx.moveTo(x + rd, y);
			ctx.lineTo(x + width - ra, y);
			ctx.arcTo(x + width, y, x + width, y + ra, ra);
			ctx.lineTo(x + width, y + height - rb);
			ctx.arcTo(x + width, y + height, x + width - rb, y + height, rb);
			ctx.lineTo(x + rc, y + height);
			ctx.arcTo(x, y + height, x, y + height - rc, rc);
			ctx.lineTo(x, y + rd);
			ctx.arcTo(x, y, x + rd, y, rd);

			ctx.closePath();
			ctx.fill();
		}
		Render.cameraShake = function(dx = 15, dy = 15, times = 10, duration = 30) {
			let i = 0;
			function shake() {
				let m = i % 2 == 0 ? 1 : -1;
				let x = dx * m * (1 - i / times);
				let y = dy * m * (1 - i / times);
				let randomness = 0.5;
				let amt = (Math.random() * randomness + (1 - randomness));
				let pos = new vec(amt * x, amt * y);

				animations.cameraShake(Render.position, pos, duration, () => {
					i++;
					if (i < times - 1) {
						shake();
					}
					else {
						animations.cameraShake(Render.position, new vec(0, 0), duration);
					}
				});
			}
			shake();
		}

		// ~ resolution / pixel ratio stuff
		Render.setPixelRatio = function(pr) {
			Render.pixelRatio = pr;
			canv.width = 800 * pr;
			canv.height = 480 * pr;
			// canv.style.transform = `scale(${ 1/pr })`;
			ctx.scale(pr, pr);
			rescaleCanv();
		}
		Render.setPixelRatio(window.devicePixelRatio * 1.2);

		// ~ images
		Render.images = {}
		Render.loadImg = function(name) {
			let img = new Image();
			img.src = "./images/" + name;

			img.onload = function() {
				Render.images[name.split(".")[0]] = img;
			}
		}
		
		// ~ events
		Render.events = {
			beforeRender: [],
			afterRender: [],
		}
		Render.on = function(event, callback) {
			if (Render.events[event]) {
				Render.events[event].push(callback);
			}
			else {
				console.warn(event + " is not a valid event");
			}
		}
		Render.off = function(event, callback) {
			event = Render.events[event];
			event.splice(event.indexOf(callback), 1);
		}
		Render.trigger = function(event) {
			// Trigger each event
			Render.events[event].forEach(callback => {
				callback();
			});
		}

		return Render;
	})(),
	player: {
		position: new vec(0, 0),
		moving: false,
		alive: false,
		render: true,
		width: 32,
		height: 32,
		move: function (direction, fromPortal) { // Moves player in specified direction
			const player = engine.player;

			if (player.moving && !fromPortal || !player.alive) return;

			// - Make normalized vec from direction
			let dir = new vec(0, 0);
			if (direction === "up") dir.y = -1;
			if (direction === "down") dir.y = 1;
			if (direction === "left") dir.x = -1;
			if (direction === "right") dir.x = 1;

			// ~ Do a collision check to find closest body in line of player
			// very funky, don't question it
			let playerPos = player.position.add(new vec(16, 16));

			let bodies = [];
			let curWorld = World.curWorld;
			let curLayer = curWorld.curLayer;
			let layer = curWorld.layer;
			let { walls, portals, spikes } = layer;

			// - find all bodies in line with player AND in the movement direction
			function getBodies(allBodies) {
				for (let i = 0; i < allBodies.length; i++) {
					let body = allBodies[i];
					let bodyPos = body.position.add({x: body.width/2, y: body.height/2});
					
					if (dir.x !== 0) { // moving horizontally
						let dist = Math.abs(bodyPos.y - playerPos.y);
						if (dist < body.height / 2 + 15 && (bodyPos.x - playerPos.x) * dir.x > 0) {
							if ((body.type !== "portal" && body.type !== "spike") || -dir.x === body.direction.x) { // check if you're going into the portal
								let insideBody = (Math.abs((body.position.x + body.width/2) - (player.position.x + 16)) < body.width/2 + 16) && (Math.abs((body.position.y + body.height/2) - (player.position.y + 16)) < body.height/2 + 16);
								if (body.type !== "spike" || !insideBody) { // check you're not inside spikes
									bodies.push(body);
								}
							}
						}
					}
					else if (dir.y !== 0) { // moving vertically
						let dist = Math.abs(bodyPos.x - playerPos.x);
						if (dist < body.width / 2 + 15 && (bodyPos.y - playerPos.y) * dir.y > 0) {
							if ((body.type !== "portal" && body.type !== "spike") || -dir.y === body.direction.y) { // Check if you're going into the portal
								let insideBody = (Math.abs((body.position.x + body.width/2) - (player.position.x + 16)) < body.width/2 + 16) && (Math.abs((body.position.y + body.height/2) - (player.position.y + 16)) < body.height/2 + 16);
								if (body.type !== "spike" || !insideBody) { // check you're not inside spikes
									bodies.push(body);
								}
							}
						}
					}
				}
			}
			getBodies(walls);
			getBodies(portals);
			getBodies(spikes);
			if (curLayer === curWorld.end.layer) getBodies([ { position: curWorld.end.position, width: 32, height: 32, isEnd: true } ]);

			// - get the closest body to player
			let leastDist = Infinity;
			let collisionBody;
			for (let i = 0; i < bodies.length; i++) {
				let body = bodies[i];
				let dist;
				let bodyPos = body.position.add({ x: body.width/2, y: body.height/2 });
				let playerPos = player.position.add({ x: 16, y: 16 });

				if (dir.x !== 0) { // moving horizontally
					dist = Math.abs(bodyPos.x - playerPos.x);
				}
				if (dir.y !== 0) { // moving vertically
					dist = Math.abs(bodyPos.y - playerPos.y);
				}
				if (dist < leastDist) {
					leastDist = dist;
					collisionBody = body;
				}
			}
			
			// ~ move the player
			// - get the final position player moves to
			let finalPos = new vec(player.position);
			if (!collisionBody) {
				if (dir.x !== 0) { // moving horizontally
					finalPos.x = canv.width/2 + (canv.width/2 + 100) * dir.x;
				}
				else if (dir.y !== 0) { // moving vertically
					finalPos.y = canv.height/2 + (canv.height/2 + 100) * dir.y;
				}
			}
			else if (collisionBody.type === "spike") {
				let pen = 24;
				if (dir.x === 1) {
					finalPos.x = collisionBody.position.x - 32 + pen;
				}
				if (dir.x === -1) {
					finalPos.x = collisionBody.position.x + collisionBody.width - pen;
				}
				if (dir.y === 1) {
					finalPos.y = collisionBody.position.y - 32 + pen;
				}
				if (dir.y === -1) {
					finalPos.y = collisionBody.position.y + collisionBody.height - pen;
				}
			}
			else if (collisionBody.type === "portal") {
				let pen = 32;
				if (dir.x === 1) {
					finalPos.x = collisionBody.position.x - 32 + pen;
				}
				if (dir.x === -1) {
					finalPos.x = collisionBody.position.x + collisionBody.width - pen;
				}
				if (dir.y === 1) {
					finalPos.y = collisionBody.position.y - 32 + pen;
				}
				if (dir.y === -1) {
					finalPos.y = collisionBody.position.y + collisionBody.height - pen;
				}
			}
			else if (!collisionBody.isEnd) {
				if (dir.x === 1) {
					finalPos.x = collisionBody.position.x - 32;
				}
				if (dir.x === -1) {
					finalPos.x = collisionBody.position.x + collisionBody.width;
				}
				if (dir.y === 1) {
					finalPos.y = collisionBody.position.y - 32;
				}
				if (dir.y === -1) {
					finalPos.y = collisionBody.position.y + collisionBody.height;
				}
			}
			else if (collisionBody.isEnd) {
				finalPos = new vec(collisionBody.position);
			}

			// - run animation to move to final position
			let toDeath = collisionBody === undefined || collisionBody.type === "spike";
			if (!toDeath && collisionBody.type === "portal") {
				if (fromPortal === true) {
					animations.move(player.position, finalPos, ease.linear, 1.2, true);	
				}
				else {
					animations.move(player.position, finalPos, ease.in, 0.8, true);	
				}

				setTimeout(() => {
					let sibDir = collisionBody.sibling.direction;
					let initPos = new vec(finalPos);
					if (!sibDir.equals(collisionBody.direction)) {
						// ~ Move player to other side of portal
						if (dir.x === 1) {
							initPos.x = collisionBody.position.x + collisionBody.width;
							initPos.y = Math.max(collisionBody.position.y, Math.min(collisionBody.position.y + collisionBody.height - 32, initPos.y));
						}
						if (dir.x === -1) {
							initPos.x = collisionBody.position.x - 32;
							initPos.y = Math.max(collisionBody.position.y, Math.min(collisionBody.position.y + collisionBody.height - 32, initPos.y));
						}
						if (dir.y === 1) {
							initPos.y = collisionBody.position.y + collisionBody.height;
							initPos.x = Math.max(collisionBody.position.x, Math.min(collisionBody.position.x + collisionBody.width - 32, initPos.x));
						}
						if (dir.y === -1) {
							initPos.y = collisionBody.position.y - 32;
							initPos.x = Math.max(collisionBody.position.x, Math.min(collisionBody.position.x + collisionBody.width - 32, initPos.x));
						}
						player.position = initPos;
					}

					// ~ Swap layers
					curWorld.curLayer = collisionBody.to;

					// ~ Create particles
					addBodyParticles(collisionBody.sibling, collisionBody.sibling.direction, initPos);
					
					// ~ Move again
					let newDir = sibDir.x === -1 ? "left" : sibDir.x === 1 ? "right" : sibDir.y === 1 ? "down" : "up";
					player.move(newDir, true);
				}, player.animation.duration + engine.Performance.delta * 2);
			}
			else {
				if (fromPortal === true) {
					if (toDeath) {
						animations.move(player.position, finalPos, ease.linear, 1.1);
					}
					else {
						animations.move(player.position, finalPos, ease.out, 1.6);
					}
				}
				else {
					if (collisionBody === undefined) {
						animations.move(player.position, finalPos, ease.linear, 1.4);
					}
					else {
						animations.move(player.position, finalPos);
					}
				}
			}

			if (toDeath) {
				setTimeout(() => {
					Render.cameraShake(8 * dir.x, 8 * dir.y, 3, 45);
				}, player.animation.duration);
			}

			// Set camera to current layer when moved
			engine.World.switchView(curLayer);

			// - Lose if didn't hit a body
			if (toDeath) {
				player.alive = false;

				setTimeout(() => {
					// death particles
					let particlePosition = new vec(Math.max(0, Math.min(800, finalPos.x)), Math.max(0, Math.min(480, finalPos.y)));
					particlePosition.sub2({ x: 16, y: 16 });
					addBodyParticles(player, dir.inverse(), particlePosition, collisionBody !== undefined);

					// stop rendering player
					player.render = false;

					// wait a bit before resetting
					setTimeout(() => {
						player.alive = true;
						player.render = true;
						curWorld.curLayer = 0;
						player.position = new vec(curWorld.start);
					}, 900);
				}, player.animation.duration);
			}
			// - Win if hit the end
			else if (collisionBody.isEnd) {
				setTimeout(() => {
					document.getElementById("enterContinue").classList.add("active");
					document.getElementById("winText").classList.add("active");
					player.alive = false;
					
					window.dispatchEvent(new CustomEvent("levelWin"));
				}, player.animation.duration);
			}
		}
	}
}