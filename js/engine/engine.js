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
		get curWorld() {
			return this.worlds[this.worldIndex];
		},
		worldIndex: -1,
		
		create: function(index = -1, start, end) {
			index = index === -1 ? this.worlds.length : index;

			let world = {
				index: index,
				start: start,
				numCoins: 0,
				collectedCoins: [],
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

				createLayer: function(color, portalColor = false) {
					let index = world.layers.length;
					let layer = {
						color: color,
						portalColor: portalColor || color,
						// index: index,
						walls: [],
						internalCorners: [],
						coins: [],
						portals: [],
						spikes: [],

						buttons: [],
						wires: [],
						pistons: [],
					}
					
					world.layers[index] = layer;
					return layer;
				},
				createWall: function(position, width, height, layer) {
					world.layers[layer].walls.push({
						type: "wall",
						position: position,
						width: width,
						height: height,
					});
				},
				createInternalCorner: function(position, dir, layer) {
					let offset = { x: -1, y: -1 };
					if (dir >= 2) offset.y = 1;
					if (dir === 1 || dir === 2) offset.x = 1;

					let inWall2 = 0;
					let inWall3 = 0;

					for (let i = 0; i < world.layers[layer].walls.length; i++) {
						let wall = world.layers[layer].walls[i];
						let w = wall.width / 2;
						let h = wall.height / 2;
						let pos = wall.position.add({ x: w, y: h });

						if (w > 22 && h > 22 && Math.abs(pos.x - (position.x + offset.x * 16)) <= w - 16 && Math.abs(pos.y - (position.y + offset.y * 16)) <= h - 16) {
							inWall2++;
						}
						if (w > 55 && h > 55 && Math.abs(pos.x - (position.x + offset.x * 45)) <= w - 45 && Math.abs(pos.y - (position.y + offset.y * 45)) <= h - 45) {
							inWall3++;
						}
					}

					world.layers[layer].internalCorners.push({
						type: "internalCorner",
						position: position,
						direction: dir,
						inset1: inWall2 >= 2,
						inset2: inWall2 >= 2 && inWall3 >= 2,
					});
				},
				createCoin: function(position, layer) {
					world.layers[layer].coins.push({
						type: "coin",
						position: position,
						width: 25,
						height: 25,
						collected: false,
						collectedPrev: false,
						id: world.numCoins,
					});
					world.numCoins++;
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
						
						color: world.layers[layerTo].portalColor,
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
						
						color: world.layers[layerIn].portalColor,
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
						portal.sizes.push(rotS(new vec(92, 6.5)));
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
				},
				createButton: function(position, width, height, layer, direction) { // direction = direction button faces
					let obj = new Button({
						position: position,
						width: width,
						height: height,
						direction: direction,
					});
					world.layers[layer].buttons.push(obj);
					return obj;
				},
				createWire: function(vertices, layer) {
					let obj = new Wire({
						vertices: vertices,
					});
					world.layers[layer].wires.push(obj);
					return obj;
				},
				createPiston: function(position, width, height, layer, direction, active) {
					let obj = new Piston({
						position: position,
						width: width,
						height: height,
						direction: direction,
						active: active,
					});
					world.layers[layer].pistons.push(obj);
					return obj;
				},
			}
			// Create default layer
			world.createLayer("#F6EEE5"); // DDE2ED

			// Add to global worlds
			this.worlds[index] = world;

			return world;
		},
		set: function(index) {
			// Set world
			this.worldIndex = index;
			allWorlds.levelIndex = index;

			// Reset player
			let curWorld = this.curWorld;
			engine.player.position = new vec(curWorld.start);
			if (engine.player.trail) {
				engine.player.trail.lastPositions.length = 0;
			}

			// Load coins
			let levelIndex = allWorlds.relLevelIndex;
			let coins = data.worlds[allWorlds.worldIndex].coins;
			curWorld.layers.forEach(layer => {
				layer.coins.forEach(coin => {
					// console.log(coins[levelIndex], coin.id)
					if (coins[levelIndex] && coins[levelIndex].includes(coin.id)) { 
						coin.collectedPrev = true;
					}
				});
			});
		},
		switchView: function(index) {
			this.curWorld.curViewingLayer = index;
		}
	},
	Render: (() => {
		const Render = function() {
			requestAnimationFrame(Render);
			engine.Performance.update();

			Render.trigger("beforeTick");
			
			// Check if renderer is enabled
			if (Render.enabled !== true) {
				Render.trigger("afterTick");
				return
			};

			// Check if the world exists
			const { World } = engine;
			const { curWorld } = World;
			if (!curWorld) return;

			// Get the current layer
			const { end, viewingLayer:layer, curLayer, curViewingLayer } = curWorld;
			const { walls, internalCorners, coins, portals, spikes, buttons, wires, pistons } = layer;

			ctx.clearRect(0, 0, canv.width, canv.height);

			ctx.save();
			ctx.translate(Render.position.x, Render.position.y);
			// ctx.translate(-8 + Render.position.x, -5 + Render.position.y)
			// ctx.scale(1.02, 1.02);
			
			
			// Render Background
			ctx.fillStyle = layer.color;
			ctx.fillRect(0, 0, 800, 480);

			/*
			if (Render.lastBackground !== layer.color) {
				Render.lastBackground = layer.color;
				canv.style.background = layer.color;
			}
			*/

			Render.trigger("beforeRender");

			// ~ Render coins
			ctx.fillStyle = "#FFD465";
			ctx.strokeStyle = "#E2A734";// F0B542
			ctx.lineWidth = 3.5;
			for (let i = 0; i < coins.length; i++) {
				let coin = coins[i];

				if (!coin.collected) {
					if (coin.collectedPrev) ctx.globalAlpha = 0.4;

					ctx.beginPath();
					Render.roundedRect(coin.position.x + 1.5, coin.position.y + 1.5, 17, 17, 4);
					ctx.fill();
					ctx.stroke();

					if (coin.collectedPrev) ctx.globalAlpha = 1;
				}
			}

			// ~ Render player
			if (player.render && curViewingLayer === curLayer) {
				const player = engine.player;
				ctx.fillStyle = "#FF537D";
				// ctx.fillRect(player.position.x, player.position.y, 32, 32);

				Render.roundedRect(player.position.x, player.position.y, 32, 32, 3);
				/*
				let sw = 7;
				Render.roundedRect(player.position.x + sw/2, player.position.y + sw/2, 32 - sw, 32 - sw, 1);
				ctx.strokeStyle = "#FF537D";
				ctx.lineWidth = sw;
				ctx.stroke();/** */
			}

			// ~ Render Portals
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
							// Render.roundedRect(p.position.x, p.position.y, p.options.size * decay, p.options.size * decay, 1.5);
							ctx.beginPath();
							ctx.arc(p.position.x, p.position.y, p.options.size * decay / 2, 0, Math.PI*2);
							ctx.fill();
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
				Render.roundedRect(portal.position.x, portal.position.y, portal.width, portal.height, Render.getRound(portal.direction, 3));
				/* */

				// fancy portal
				let { position, points, sizes } = portal;
				let colors = [ portal.color, "#4F4F4F", "#3D3D3D", "#3D3D3D", "#3D3D3D" ];
				for (let i = 0; i < points.length; i++) {
					ctx.fillStyle = colors[i];
					let pt = points[i];
					let size = sizes[i];

					if (i <= 1) {
						Render.roundedRect(position.x + pt.x, position.y + pt.y, size.x, size.y, Render.getRounds(portal.direction, 3));
					}
					else {
						Render.roundedRect(position.x + pt.x, position.y + pt.y, size.x, size.y, 4);
					}
				}
				/* */
			}

			
			// ~ Render End
			if (curViewingLayer === end.layer) {
				ctx.fillStyle = end.color || "#6BCB6F";
				Render.roundedRect(end.position.x, end.position.y, 32, 32, 3);
			}

			// ~ Render particles
			if (player.particles) {
				updateBodyParticles(player);

				if (player.particles) {
					ctx.fillStyle = "#FF537D";

					for (let j = 0; j < player.particles.length; j++) {
						let p = player.particles[j];
						ctx.globalAlpha = p.options.opacity;
						ctx.fillStyle = p.options.color;
						// ctx.fillRect(p.position.x, p.position.y, p.options.size, p.options.size);
						
						ctx.beginPath();
						ctx.arc(p.position.x, p.position.y, p.options.size / 2.5, 0, Math.PI*2);
						ctx.fill();
					}
					ctx.globalAlpha = 1;
				}
			}

			// ~ Render spikes
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

			// ~ Render buttons
			ctx.fillStyle = "#FE4A49";
			for (let i = 0; i < buttons.length; i++) {
				let obj = buttons[i];

				if (!obj.singlePress) ctx.fillStyle = "#35ABEE";
				Render.roundedRect(obj.position.x + obj.offset.x, obj.position.y + obj.offset.y, obj.width, obj.height, Render.getRounds(obj.direction, 4));
				if (!obj.singlePress) ctx.fillStyle = "#FE4A49";
			}
			// ~ Render pistons
			ctx.fillStyle = "#383838";
			for (let i = 0; i < pistons.length; i++) {
				let obj = pistons[i];

				let w = obj.width;
				let h = obj.height;
				let pos = obj.position.add(obj.offset);
				let dir = obj.direction;

				if (dir.x < 0) pos.x += 5 * dir.x; 
				if (dir.y < 0) pos.y += 5 * dir.y; 

				if (obj.active) {
					pos.add2(dir.mult(-5));
					w += Math.abs(dir.x * 5);
					h += Math.abs(dir.y * 5);
				}

				Render.roundedRect(pos.x, pos.y, w + Math.abs(dir.x) * 5, h + Math.abs(dir.y) * 5, Render.getRounds(dir, 6));
			}

			// ~ Render internal corners
			ctx.fillStyle = "#494949";
			for (let i = 0; i < internalCorners.length; i++) {
				let corner = internalCorners[i];
				ctx.beginPath();
				Render.corner(corner.position.x, corner.position.y, corner.direction, 7);
				ctx.fill();
			}

			// ~ Render walls
			ctx.fillStyle = "#494949";
			ctx.beginPath();
			for (let i = 0; i < walls.length; i++) {
				let wall = walls[i];
				// ctx.fillRect(wall.position.x - 0.5, wall.position.y - 0.5, wall.width + 0.5, wall.height + 0.5);
				Render.roundedRect(wall.position.x, wall.position.y, wall.width, wall.height, 8, false);
			}
			ctx.strokeStyle = "#494949";
			ctx.lineWidth = 1;
			ctx.stroke();
			ctx.fill();

			// inset stuff
			ctx.beginPath();
			ctx.fillStyle = "#404040";
			let insetAmt = 18;
			for (let i = 0; i < walls.length; i++) {
				let wall = walls[i];
				if (wall.width > insetAmt * 2 + 10 && wall.height > insetAmt*2 + 10) {
					Render.roundedRect(wall.position.x + insetAmt, wall.position.y + insetAmt, wall.width - insetAmt*2, wall.height - insetAmt*2, 8, false);
				}
			}
			for (let i = 0; i < internalCorners.length; i++) {
				let corner = internalCorners[i];
				if (corner.inset1) {
					let offset = { x: -1, y: -1 };
					let dir = corner.direction;
					if (dir >= 2) offset.y = 1;
					if (dir === 1 || dir === 2) offset.x = 1;
					Render.corner(corner.position.x + insetAmt * offset.x, corner.position.y + insetAmt * offset.y, corner.direction, 8);
				}
			}
			ctx.fill();
			
			ctx.beginPath();
			ctx.fillStyle = "#3a3a3a";
			insetAmt = 45;
			for (let i = 0; i < walls.length; i++) {
				let wall = walls[i];
				if (wall.width > insetAmt * 2 + 16 && wall.height > insetAmt*2 + 16) {
					Render.roundedRect(wall.position.x + insetAmt, wall.position.y + insetAmt, wall.width - insetAmt*2, wall.height - insetAmt*2, 10, false);
				}
			}
			ctx.fill();

			ctx.beginPath();
			for (let i = 0; i < internalCorners.length; i++) {
				let corner = internalCorners[i];
				if (corner.inset2) {
					let offset = { x: -1, y: -1 };
					let dir = corner.direction;
					if (dir >= 2) offset.y = 1;
					if (dir === 1 || dir === 2) offset.x = 1;
					Render.corner(corner.position.x + insetAmt * offset.x, corner.position.y + insetAmt * offset.y, corner.direction, 8);
				}
			}
			ctx.fill();
			/* */

			// ~ Render Wires
			ctx.lineWidth = 4;
			ctx.lineJoin = "round";
			ctx.lineCap = "round";
			for (let i = 0; i < wires.length; i++) {
				let obj = wires[i];
				let verts = obj.vertices;

				ctx.beginPath();
				ctx.moveTo(verts[0].x, verts[0].y);
				for (let i = 1; i < verts.length; i++) {
					ctx.lineTo(verts[i].x, verts[i].y);
				}

				ctx.strokeStyle = "#676767";
				ctx.stroke();
				
				if (obj.power > obj.maxPower) {
					ctx.strokeStyle = "#F83F3F";
					ctx.stroke();
				}
				else {
					let opacity = (Math.round(Math.min(1, (obj.power / obj.maxPower) ** 1.5) * 255)).toString(16).toUpperCase().padStart(2, "0");
					ctx.strokeStyle = "#32B4D0" + opacity;
					ctx.stroke();
				}
			}

			if (curWorld.afterRender) curWorld.afterRender();
			Render.trigger("afterRender");
			ctx.restore();
			Render.trigger("afterTick");
		}
		Render.pixelRatio = 1;
		Render.layer = 0;
		Render.enabled = true;
		Render.lastBackground = "";
		Render.position = new vec(0, 0);

		Render.fancyCorners = false;
		
		/*
		try {
			ctx.getImageData(0, 0, 1, 1);
			Render.fancyCorners = true;
		}
		catch(err) {
			Render.fancyCorners = false;
		}
		/**/

		// ~ useful function for rendering
		Render.getRounds = function(direction, amount) {
			let rounds;
			if (direction.x > 0) rounds = [ 0, amount, amount, 0 ];
			else if (direction.x < 0) rounds = [ amount, 0, 0, amount ];
			else if (direction.y > 0) rounds = [ 0, 0, amount, amount ];
			else if (direction.y < 0) rounds = [ amount, amount, 0, 0 ];

			return rounds;
		}
		Render.roundedRect = function(x, y, width, height, radius, fill=true) {
			if (fill) ctx.beginPath();

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

			if (fill) {
				ctx.closePath();
				ctx.fill();
			}
		}
		Render.corner = function(x, y, dir, radius) {
			if (dir === 0) {
				ctx.moveTo(x, y + radius);
				ctx.arcTo(x, y, x + radius, y, radius);
			}
			if (dir === 1) {
				ctx.moveTo(x - radius, y);
				ctx.arcTo(x, y, x, y + radius, radius);
			}
			if (dir === 2) {
				ctx.moveTo(x, y - radius);
				ctx.arcTo(x, y, x - radius, y, radius);
			}
			if (dir === 3) {
				ctx.moveTo(x, y - radius);
				ctx.arcTo(x, y, x + radius, y, radius);
			}
			ctx.lineTo(x, y);
			ctx.closePath();
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
		Render.setPixelRatio(window.devicePixelRatio);

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
			beforeTick: [],
			afterTick: [],
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
			let events = Render.events[event];
			for (let i = 0; i < events.length; i++) {
				events[i]();
			}
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
		looping: false,
		onMoveEnd: false,
		move: function (direction, fromPortal, teleports = 0) { // Moves player in specified direction
			const player = engine.player;

			if (player.moving && !fromPortal || !player.alive || !Render.enabled) return;
			
			let lastLooping = player.looping;

			// - Make normalized vec from direction
			let dir = new vec(0, 0);
			if (direction === "up") dir.y = -1;
			if (direction === "down") dir.y = 1;
			if (direction === "left") dir.x = -1;
			if (direction === "right") dir.x = 1;

			// ~ Do a collision check to find closest body in line of player
			let playerPos = player.position.add(new vec(16, 16));

			let bodies = [];
			let curWorld = World.curWorld;
			let curLayer = curWorld.curLayer;
			let layer = curWorld.layer;
			let { walls, coins, portals, spikes, buttons, pistons } = layer;

			// - find all bodies in line with player in the movement direction
			function getBodies(allBodies) {
				for (let i = 0; i < allBodies.length; i++) {
					let body = allBodies[i];
					let pos = body.position;
					let bodyPos = body.position.add({x: body.width/2, y: body.height/2});

					if (body.offset) {
						pos = pos.add(body.offset);
						bodyPos.add2(body.offset);
					}

					let strictAngles = [ "portal", "spike", "button" ]; // objects that require you to go directly into them
					
					if (dir.x !== 0) { // moving horizontally
						let dist = Math.abs(bodyPos.y - playerPos.y);
						if (dist < body.height / 2 + 15 && (bodyPos.x - playerPos.x) * dir.x > 0) {
							if (!strictAngles.includes(body.type) || -dir.x === body.direction.x) { // check if you're going into the portal
								let insideBody = (Math.abs((pos.x + body.width/2) - (player.position.x + 16)) < body.width/2 + 16) && (Math.abs((pos.y + body.height/2) - (player.position.y + 16)) < body.height/2 + 16);
								if ((body.type !== "spike") || !insideBody) { // check you're not inside spikes
									bodies.push(body);
								}
							}
						}
					}
					else if (dir.y !== 0) { // moving vertically
						let dist = Math.abs(bodyPos.x - playerPos.x);
						if (dist < body.width / 2 + 15 && (bodyPos.y - playerPos.y) * dir.y > 0) {
							if (!strictAngles.includes(body.type) || -dir.y === body.direction.y) { // Check if you're going into the portal
								let insideBody = (Math.abs((pos.x + body.width/2) - (player.position.x + 16)) < body.width/2 + 16) && (Math.abs((pos.y + body.height/2) - (player.position.y + 16)) < body.height/2 + 16);
								if ((body.type !== "spike") || !insideBody) { // check you're not inside spikes
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
			getBodies(buttons);
			getBodies(pistons);
			if (curLayer === curWorld.end.layer) getBodies([ { position: curWorld.end.position, width: 32, height: 32, isEnd: true } ]);

			// - get the closest body to player
			let leastDist = Infinity;
			let collisionBody;
			for (let i = 0; i < bodies.length; i++) {
				let body = bodies[i];
				let dist;
				let bodyPos = body.position.add({ x: body.width/2, y: body.height/2 });
				bodyPos.add2(dir.mult({ x: -body.width/2, y: -body.height/2 }));
				let playerPos = player.position.add({ x: 16, y: 16 }).add(dir.mult({ x: -16, y: -16 }));

				if (body.offset) bodyPos.add2(body.offset);

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
			let insideBody = collisionBody === undefined ? false : (Math.abs((collisionBody.position.x + collisionBody.width/2) - (player.position.x + 16)) < collisionBody.width/2 + 16)
						  && (Math.abs((collisionBody.position.y + collisionBody.height/2) - (player.position.y + 16)) < collisionBody.height/2 + 16);
			
			// ~ move the player
			// - get the final position player moves to
			let finalPos = new vec(player.position);
			if (!collisionBody) {
				if (dir.x !== 0) { // moving horizontally
					finalPos.x = 400 + 450 * dir.x;
				}
				else if (dir.y !== 0) { // moving vertically
					finalPos.y = 240 + 290 * dir.y;
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
			else if (collisionBody.type === "button") {
				let pen;
				if (!collisionBody.singlePress) pen = insideBody ? collisionBody.active ? 7 : 1 : collisionBody.active ? 1 : 7;
				else pen = collisionBody.pressed ? collisionBody.active ? 7 : 1 : collisionBody.active ? 1 : 7;

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

			if (collisionBody && collisionBody.type === "piston") {
				finalPos.add2(collisionBody.offset.mult(dir.abs()));
			}

			// - get coins in path
			bodies = [];
			getBodies(coins);

			// - run animation to move to final position
			let toDeath = collisionBody === undefined || collisionBody.type === "spike";
			if (!toDeath && collisionBody.type === "portal") {
				if (fromPortal === true) {
					animations.move(player.position, finalPos, bodies, ease.linear, 1.2, true);	
				}
				else {
					animations.move(player.position, finalPos, bodies, ease.in, 0.8, true);	
				}

				setTimeout(() => {
					if (lastLooping === player.looping) {
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
						if (teleports >= 3) {
							player.looping = true;
						}
						
						let newDir = sibDir.x === -1 ? "left" : sibDir.x === 1 ? "right" : sibDir.y === 1 ? "down" : "up";
						player.move(newDir, true, ++teleports);
					}
				}, player.animation.duration + engine.Performance.delta * 2);
			}
			else {
				if (fromPortal === true) {
					if (toDeath && collisionBody) {
						animations.move(player.position, finalPos, bodies, ease.out.sine, 1.3);
					}
					else {
						animations.move(player.position, finalPos, bodies, ease.out.cubic, 1.6);
					}
				}
				else {
					if (collisionBody === undefined) {
						animations.move(player.position, finalPos, bodies, ease.inOut.cubic);
					}
					else {
						animations.move(player.position, finalPos, bodies);
					}
				}
			}

			// Run onMoveEnd event
			if (!toDeath && collisionBody.type !== "portal") {
				setTimeout(() => {
					if (typeof player.onMoveEnd === "function") {
						player.onMoveEnd();
						player.onMoveEnd = false;
					}
				}, player.animation.duration + engine.Performance.delta * 2);
			}

			// Toggle button
			if (!toDeath && collisionBody.type === "button" && player.position.sub(finalPos).length > 6 && (!collisionBody.singlePress || !collisionBody.pressed)) {
				setTimeout(() => {
					collisionBody.pressed = true;
					collisionBody.trigger();
				}, Math.max(0, player.animation.duration - 50));
			}

			// Set camera to current layer when moving
			engine.World.switchView(curLayer);

			// - Lose
			if (toDeath) {
				player.alive = false;

				setTimeout(() => {
					// death particles
					let particlePosition = new vec(Math.max(0, Math.min(800, finalPos.x)), Math.max(0, Math.min(480, finalPos.y)));
					particlePosition.sub2({ x: 16, y: 16 });
					addBodyParticles(player, dir.inverse(), particlePosition, collisionBody !== undefined);

					// camera shake
					Render.cameraShake(8 * dir.x, 8 * dir.y, 3, 45);

					// stop rendering player
					player.render = false;

					// wait a bit before resetting
					setTimeout(() => {
						events.reset(true, true, true);
					}, 900);
				}, player.animation.duration);
			}
			// - Win if hit the end
			else if (collisionBody.isEnd) {
				setTimeout(() => {
					document.getElementById("enterContinue").classList.add("active");
					document.getElementById("winText").classList.add("active");
					document.getElementById("enterContinue").style.background = World.curWorld.layers[0].color;
					document.getElementById("winText").style.background = World.curWorld.layers[0].color;
					player.alive = false;


					// ~ update stats
					let curWorld = World.curWorld;
					let levelData = data.worlds[allWorlds.worldIndex];

					if (!levelData.completedLevels.includes(World.worldIndex)) levelData.completedLevels.push(World.worldIndex);

					if (curWorld.collectedCoins.length > 0) {
						let coins = levelData.coins;
						let levelIndex = allWorlds.relLevelIndex;

						if (!coins[levelIndex]) coins[levelIndex] = [];

						for (let i = 0; i < curWorld.collectedCoins.length; i++) {
							let coin = curWorld.collectedCoins[i];
							if (!coins[levelIndex].includes(coin)) {
								coins[levelIndex].push(coin);
							}
						}


						data.coins += curWorld.collectedCoins.length;
					}

					for (let i = 0; i < curWorld.layers.length; i++) {
						let layer = curWorld.layers[i];
						for (let j = 0; j < layer.coins.length; j++) {
							let coin = layer.coins[j];
							if (coin.collected) {
								coin.collectedPrev = true;
							}
						}
					}

					save();
					
					window.dispatchEvent(new CustomEvent("levelWin"));
				}, player.animation.duration);
			}
		}
	}
}