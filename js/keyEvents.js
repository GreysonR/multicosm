"use strict";

const events = {
	up: [ function(keydown) { if (keydown) player.move("up") } ],
	down: [ function(keydown) { if (keydown) player.move("down") } ],
	left: [ function(keydown) { if (keydown) player.move("left") } ],
	right: [ function(keydown) { if (keydown) player.move("right") } ],
	reset: [ function(keydown) {
		if (keydown && !player.moving) {
			let world = World.curWorld;

			// reset player
			player.alive = true;
			player.render = true;
			world.curLayer = 0;
			player.position = new vec(world.start);
			
			// reset buttons / wires
			for (let l = 0; l < world.layers.length; l++) {
				let layer = world.layers[l];
				let { buttons, pistons, wires } = layer;
				
				for (let i = 0; i < pistons.length; i++) {
					pistons[i].reset();
				}
				for (let i = 0; i < buttons.length; i++) {
					buttons[i].reset();
				}
			}
		}
	} ],
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
	if (key === "r") events.trigger("reset", true);
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
		let outComplex = ""; // wiring code

		let numButtons = 0;
		let numPistons = 0;
		
		function getNext() {
			let iStart = res.indexOf("<rect", index);
			let iEnd = res.indexOf("/>", iStart);

			if (iStart > index) {
				// define color vars
				let wall = "#494949";
				let portals = [ "#DDE2ED", "#F08E47", "#7A51D3" ];
				let spike = "#F44545";
				let button = "#FE4A49";
				let piston = "#383838";

				// get string of current rect
				let rectText = res.slice(iStart + 5, iEnd);

				// create rect object from string
				if (rectText == "") return;
				let rectArr = rectText.trim().split('"');
				let rect = (() => {
					let obj  = {};
					for (let i = 0; i < rectArr.length; i += 2) {
						obj[rectArr[i].replace("=", "").replace(/[" "]/g, "")] = !isNaN(Number(rectArr[i + 1])) ? Number(rectArr[i + 1]) : rectArr[i + 1];
					}
					return obj;
				})();

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
					out += `\n\tlevel.createWall(new vec(${ rect.x }, ${ rect.y }), ${ rect.width }, ${ rect.height }, ${ layer });`;
				}
				else if (portals.includes(rect.fill) && portals.indexOf(rect.fill) > layer) { // export as teleporter
					let vecStr = "1, 0";
					let alongY = rect.width < rect.height;
					if (alongY) {
						if (rect.rx === 0) vecStr = "1, 0";
						else vecStr = "-1, 0";
					}
					else {
						if (rect.rx === 0) vecStr = "0, 1";
						else vecStr = "0, -1";
					}
					let reflective = Math.min(rect.width, rect.height) === 7;

					if (reflective) {
						let direction = new vec(vecStr);
						rect.x -= direction.x;
						rect.y -= direction.y;
					}

					outPortal += `\n\tlevel.createPortal(new vec(${ rect.x }, ${ rect.y }), ${ alongY ? 6 : rect.width }, ${ alongY ? rect.height : 6 }, ${ layer }, ${ portals.indexOf(rect.fill) }, new vec(${ vecStr })${ reflective ? ", true" : "" });`;
				}
				else if (rect.fill === spike) {
					let vec = "1, 0";
					if (rect.width < rect.height) {
						if (rect.rx === 0) vec = "1, 0";
						else vec = "-1, 0";
					}
					else {
						if (rect.rx === 0) vec = "0, 1";
						else vec = "0, -1";
					}

					outSpike += `\n\tlevel.createSpike(new vec(${ rect.x }, ${ rect.y }), ${ Math.max(rect.width, rect.height) }, ${ layer }, new vec(${ vec }));`;
				}
				else if (rect.fill === button) {
					let vecStr = "1, 0";
					let alongY = rect.width < rect.height;
					if (alongY) {
						if (rect.rx === 0) vecStr = "1, 0";
						else vecStr = "-1, 0";
					}
					else {
						if (rect.rx === 0) vecStr = "0, 1";
						else vecStr = "0, -1";
					}

					let name = "button" + numButtons++;
					let group = Math.round(Math.abs(Number(rect.transform ? rect.transform.replace("rotate(", "").split(" ")[0] : 0)) * 100);
					let comment = "// complex group " + group;
					let text = `\n\tlet ${ name } = level.createButton(new vec(${ Math.round(rect.x) }, ${ Math.round(rect.y) }), ${ rect.width }, ${ rect.height }, ${ layer }, new vec(${ vecStr }));`;

					if (!group) {
						outComplex += "\n\t" + text;
					}
					else if (outComplex.includes(comment)) {
						let i = outComplex.indexOf(comment) + comment.length;
						outComplex = outComplex.slice(0, i) + text + outComplex.slice(i);
					}
					else {
						outComplex += "\n\t" + comment + text;
					}
				}
				else if (rect.fill === piston) {
					let vecStr = "0, 1";
					let alongY = rect.width < rect.height;
					if (alongY) {
						if (rect.rx === 0) vecStr = "0, 1";
						else vecStr = "0, -1";
					}
					else {
						if (rect.rx === 0) vecStr = "1, 0";
						else vecStr = "-1, 0";
					}

					let setDefault = rect.opacity && rect.opacity === 0.5 ? ".setDefault(false)" : "";
					console.log(rect.opacity);

					let name = "piston" + numPistons++;
					let group = Math.round(Math.abs(Number(rect.transform ? rect.transform.replace("rotate(", "").split(" ")[0] : 0)) * 100);
					let comment = "// complex group " + group;
					let text = `\n\tlet ${ name } = level.createPiston(new vec(${ Math.round(rect.x) }, ${ Math.round(rect.y) }), ${ rect.width }, ${ rect.height }, ${ layer }, new vec(${ vecStr }))${ setDefault };`;

					if (!group) {
						outComplex += "\n\t" + text;
					}
					else if (outComplex.includes(comment)) {
						let i = outComplex.indexOf(comment) + comment.length;
						outComplex = outComplex.slice(0, i) + text + outComplex.slice(i);
					}
					else {
						outComplex += "\n\t" + comment + text;
					}
				}

				index = iEnd + 2;
			}
			else {
				index = -1;
			}
		}
		let numWires = 0;
		function getNextWire() {
			let iStart = res.indexOf("<path", index);
			// if (res.indexOf("<path", index) > -1) iStart = Math.min(res.indexOf("<path", index), iStart);
			let iEnd = res.indexOf("/>", index);

			if (iStart > index) {
				index = iEnd + 2;

				let text = res.slice(iStart + 5, iEnd);
				if (text == "") return;
				let wireArr = text.trim().split('"').flatMap((v, i, arr) => {
					if (i % 2 === 0 && v !== "") {
						return [ [ v, arr[i + 1] ] ];
					}
					else {
						return [];
					}
				});
				let wireObj = (() => {
					let obj  = {};
					for (let i = 0; i < wireArr.length; i++) {
						obj[wireArr[i][0].replace("=", "").replace(/[" "]/g, "")] = wireArr[i][1];
					}
					return obj;
				})();

				// parse path
				let pathArr = wireObj["d"].replace(/M/g, "!M").replace(/H/g, "!H").replace(/V/g, "!V").replace(/L/g, "!L").split("!").filter(v => v != "");
				let x = 0;
				let y = 0;
				let path = [];
				for (let i = 0; i < pathArr.length; i++) {
					let func = pathArr[i][0]
					let part = pathArr[i].slice(1).split(" ");

					if (func === "M") {
						x = Math.round(Number(part[0]));
						y = Math.round(Number(part[1]));
					}
					else if (func === "H") {
						x = Math.round(Number(part[0]));

						if (isNaN(Number(part[0]))) console.error(part, pathArr);
					}
					else if (func === "V") {
						y = Math.round(Number(part[0]));
					}
					else if (func === "L") {
						x = Math.round(Number(part[0]));
						y = Math.round(Number(part[1]));
					}
					else {
						console.error(func, part);
						console.error(pathArr, i);
					}

					path.push(`new vec(${ x }, ${ y })`);
				}

				let wireName = "wire" + numWires++;
				let group = Math.round((Number(wireObj["stroke-width"]) - 4) * 100);
				let comment = "// complex group " + group;
				let newText = `\n\tlet ${ wireName } = level.createWire([ ${ path.join(", ") } ], ${ layer });`;

				if (!group) {
					outComplex += "\n\t" + text;
				}
				else if (outComplex.includes(comment)) {
					let i = outComplex.indexOf(comment) + comment.length;
					outComplex = outComplex.slice(0, i) + newText + outComplex.slice(i);
				}
				else {
					outComplex += "\n\t" + comment + newText;
				}
			}
			else {
				index = -1;
			}
		}

		let n = 0;
		while (index !== -1 && n < 100) {
			getNext();
			n++
		}
		index = 0;
		while (index !== -1 && n < 100) {
			getNextWire();
			n++;
		}

		out += outPortal ? "\n" + outPortal : "";
		out += outSpike ? "\n" + outSpike : "";
		out += outComplex ? "\n" + outComplex : "";

		out = "\n\t" + out.trim();

		navigator.clipboard.writeText(out);
		console.log(out);
		input.value = "";
	}
});