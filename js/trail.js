const Trail = {
	bodies: [],
	addBody(body, color = "white") {
		body.trail = {
			color: color,
			lastPositions: [],
			length: 10,
		}

		Trail.bodies.push(body);
	},
	removeBody(body) {
		delete body.trail;
		Trail.bodies.splice(Trail.bodies.indexOf(body), 1);
	},
	Render: function() {
		for (let b = 0; b < Trail.bodies.length; b++) {
			let body = Trail.bodies[b];
			let trail = body.trail;

			// - update trail length
			trail.lastPositions.unshift(body.position.add({ x: body.width/2, y: body.height / 2 }));
			if (trail.lastPositions.length > Math.ceil(trail.length * Performance.fps / 144)) {
				trail.lastPositions.length = Math.ceil(trail.length * Performance.fps / 144);
			}

			if (trail.lastPositions.length > 1) {
				// - render trail

				let lastPos = trail.lastPositions[trail.lastPositions.length - 1];
				let bodyPos = trail.lastPositions[0];
				
				// ~ overcomplicated version
				/*

				let vecDist = lastPos.sub(bodyPos); // vector between start and end
				// ~ find points on rect perimeter that are perpendicular to p
				let perp = vecDist.normalized().normal();
				let len = Math.sqrt((body.width / 2) ** 2 + (body.height / 2) ** 2); // Largest possible distance from center
				let pointA = perp.mult(len);
				let pointB = perp.mult(-len);
				// Bound points to box - not 100% accurate, but too close to tell that it's wrong
				pointA.x = Math.max(Math.min(pointA.x, body.width / 2), -body.width / 2);
				pointA.y = Math.max(Math.min(pointA.y, body.height / 2), -body.height / 2);
				pointB.x = Math.max(Math.min(pointB.x, body.width / 2), -body.width / 2);
				pointB.y = Math.max(Math.min(pointB.y, body.height / 2), -body.height / 2);
	
				ctx.beginPath();
				ctx.moveTo(pointA.x, pointA.y);
				ctx.lineTo(pointB.x, pointB.y);
				ctx.lineTo(lastPos.x - bodyPos.x, lastPos.y - bodyPos.y);
				ctx.closePath();

				ctx.fillStyle = trail.color;
				ctx.fill();
				*/

				ctx.translate(bodyPos.x, bodyPos.y);
				ctx.fillStyle = trail.color;
				
				// ~ simple version
				if (lastPos.x - bodyPos.x) {
					let dist = lastPos.x - bodyPos.x;
					if (dist < 0) ctx.fillRect(0 + dist, -body.height/2, -dist, body.height);
					else ctx.fillRect(0, -body.height/2, dist, body.height);
				}
				else {
					let dist = lastPos.y - bodyPos.y;

					if (dist < 0) ctx.fillRect(-body.width/2, 0 + dist, body.width, -dist);
					else ctx.fillRect(-body.width/2, 0, body.width, dist);
					
				}
				
				ctx.translate(-bodyPos.x, -bodyPos.y);
			}
		}
	},
}


/*
let mouse = {
	position: new vec(0, 0),
	width: 10,
	height: 10,
}

window.addEventListener("mousemove", event => {
	mouse.position.x = event.clientX - canv.offsetLeft + canv.width/2 - mouse.width/2;
	mouse.position.y = event.clientY - canv.offsetTop + canv.height/2 - mouse.height/2;
});

Trail.addBody(mouse);
*/

Render.on("beforeRender", Trail.Render);