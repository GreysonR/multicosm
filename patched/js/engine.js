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
				curLayer: 0,
				get layer() {
					return world.layers[world.curLayer];
				},

				createLayer: function(color) {
					let index = world.layers.length;
					let layer = {
						color: color,
						// index: index,
						walls: [],
						portals: [],
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
				createPortal: function(position, width, height, layerIn, layerTo) {
					// Portal in layerIn
					let portal1 = {
						type: "portal",
						position: position,
						width: width,
						height: height,
						to: layerTo,
						
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
						
						color: world.layers[layerIn].color,
					}
					world.layers[layerTo].portals.push(portal2);

					portal1.sibling = portal2;
					portal2.sibling = portal1;
				},
			}
			// Create default layer
			world.createLayer("#DDE2ED");

			// Add to global worlds
			this.worlds[index] = world;

			return world;
		},
		set: function(index) {
			this.curWorld = this.worlds[index];
			this.worldIndex = index;

			engine.player.position = new vec(this.curWorld.start);
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
			if (!curWorld) return;

			// Get the current layer
			const { end, layer, curLayer } = curWorld;
			const { walls, portals } = layer;

			ctx.clearRect(0, 0, canv.width, canv.height);

			Render.trigger("beforeRender");
			ctx.save();

			// Render Background
			ctx.fillStyle = layer.color;
			ctx.fillRect(0, 0, canv.width, canv.height);

			// Render player
			const player = engine.player;
			ctx.fillStyle = "#FC607C";
			ctx.fillRect(player.position.x, player.position.y, 32, 32);

			// Render End
			if (curLayer === end.layer) {
				ctx.fillStyle = "#6BCB6F";
				ctx.fillRect(end.position.x, end.position.y, 32, 32);
			}

			// Render Walls
			ctx.fillStyle = "#525252";
			for (let i = 0; i < walls.length; i++) {
				let wall = walls[i];
				ctx.fillRect(wall.position.x, wall.position.y, wall.width, wall.height);
			}

			// Render Portals
			for (let i = 0; i < portals.length; i++) {
				let portal = portals[i];
				ctx.fillStyle = portal.color;
				ctx.fillRect(portal.position.x, portal.position.y, portal.width, portal.height);
			}


			ctx.restore();
			Render.trigger("afterRender");
		}
		Render.layer = 0;
		Render.enabled = true;

		
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
		move: function (direction, fromPortal) { // Moves player in specified direction
			const player = engine.player;

			if (player.moving || !player.alive) return;

			// ~ Make normalized vec from direction
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
			let { walls, portals } = layer;

			// - first, find all bodies in line with player AND in the right direction
			function getBodies(allBodies) {
				for (let i = 0; i < allBodies.length; i++) {
					let body = allBodies[i];
					let bodyPos = body.position.add({x: body.width/2, y: body.height/2});
					
					if (dir.x !== 0) {
						let dist = Math.abs(bodyPos.y - playerPos.y);
						if (dist < body.height / 2 + 16 && (bodyPos.x - playerPos.x) * dir.x > 0) {
							if (body.type !== "portal" || body.height > body.width) {
								bodies.push(body);
							}
						}
					}
					else if (dir.y !== 0) {
						let dist = Math.abs(bodyPos.x - playerPos.x);
						if (dist < body.width / 2 + 16 && (bodyPos.y - playerPos.y) * dir.y > 0) {
							if (body.type !== "portal" || body.width > body.height) {
								bodies.push(body);
							}
						}
					}
				}
			}
			getBodies(walls);
			getBodies(portals);
			if (curLayer === curWorld.end.layer) getBodies([ { position: curWorld.end.position, width: 32, height: 32, isEnd: true } ]);

			// - next, get the closest body to player
			let leastDist = Infinity;
			let collisionBody;
			for (let i = 0; i < bodies.length; i++) {
				let body = bodies[i];
				let dist;

				if (dir.x !== 0) {
					dist = Math.abs(body.position.x - player.position.x);
				}
				if (dir.y !== 0) {
					dist = Math.abs(body.position.y - player.position.y);
				}
				if (dist < leastDist) {
					leastDist = dist;
					collisionBody = body;
				}
			}
			
			// - finally, move the player
			// get the position player moves to
			let finalPos = new vec(player.position);
			if (!collisionBody) {
				if (dir.x !== 0) {
					finalPos.x = canv.width/2 + (canv.width/2 + 100) * dir.x;
				}
				else if (dir.y !== 0) {
					finalPos.y = canv.height/2 + (canv.height/2 + 100) * dir.y;
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


			if (collisionBody && collisionBody.type === "portal") {
				if (fromPortal === true) {
					animations.move(player.position, finalPos, ease.linear, 0.8);	
				}
				else {
					animations.move(player.position, finalPos, ease.in);	
				}
				setTimeout(() => {
					// ~ Move player to other side of portal
					let initPos = new vec(finalPos);
					if (dir.x === 1) {
						initPos.x = collisionBody.position.x + collisionBody.width;
					}
					if (dir.x === -1) {
						initPos.x = collisionBody.position.x - 32;
					}
					if (dir.y === 1) {
						initPos.y = collisionBody.position.y + collisionBody.height;
					}
					if (dir.y === -1) {
						initPos.y = collisionBody.position.y - 32;
					}
					player.position = initPos;

					// ~ Swap layers
					curWorld.curLayer = collisionBody.to;
					
					// ~ Move again
					player.move(direction, true);
				}, player.animation.duration + engine.Performance.delta);
			}
			else {
				if (fromPortal === true) {
					animations.move(player.position, finalPos, ease.out);
				}
				else {
					animations.move(player.position, finalPos);
				}
			}

			// - Lose if didn't hit a body
			if (!collisionBody) {
				player.alive = false;

				setTimeout(() => {
					player.alive = true;
					curWorld.curLayer = 0;
					player.position = new vec(curWorld.start);
				}, 500);
			}
			// - Win if hit the end
			else if (collisionBody.isEnd) {
				setTimeout(() => {
					document.getElementById("enterContinue").classList.add("active");
					document.getElementById("winText").classList.add("active");
					player.alive = false;
				}, player.animation.duration);
			}
		}
	}
}

engine.Render();