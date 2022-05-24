"use strict";

var inHome = false;
var inLevelSelect = false;
let homeArrowSelected;
let lastWorldArrow;

if (data.world) {
	let parent = document.getElementById("worldsBackground");
	lastWorldArrow = parent.children[data.world];
}

function openHome() {
	World.set(1);
	inHome = true;
	Render.enabled = false;

	document.getElementById("home").classList.add("active");
	document.getElementById("coinCount").innerHTML = data.coins;

	
	document.getElementById("levelComplete").classList.remove("active");

	loadWorldSelect();
	// loadLevelSelect(0);
	addHomeArrow();
}
function closeHome() {
	inHome = false;
	Render.enabled = true;

	document.getElementById("home").classList.remove("active");
	removeHomeArrow();
}
function arrowElemPos(elem) {
	if (elem.nodeName === "circle")
		return new vec(Number(elem.getAttribute("cx")), Number(elem.getAttribute("cy")));
	else {
		return new vec(elem.offsetLeft + 418 - document.getElementById("levels").clientWidth / 2, 248);
	}
}
function moveHomeArrow(event) {
	let key = event.key.toLowerCase();
	let parent = document.getElementById("levelSelect").classList.contains("active") ? document.getElementById("levels") : document.getElementById("worldsBackground");

	if (key === "enter" || key === " ") {
		data.useKeyboard = true;
		homeArrowSelected.click();
		return;
	}

	let selectedPos = arrowElemPos(homeArrowSelected);
	let minDist = Infinity;
	let minElem;

	if (key === "w" || key === "arrowup") {
		for (let i = parent.childElementCount; i--;) {
			let elem = parent.children[i];

			if ((elem.nodeName === "circle" || elem.classList.contains("level")) && elem !== homeArrowSelected) {
				let pos = arrowElemPos(elem);
				if (pos.y < selectedPos.y && pos.x === selectedPos.x) {
					if (Math.abs(pos.y - selectedPos.y) < minDist) {
						minDist = Math.abs(pos.y - selectedPos.y);
						minElem = elem;
					}
				}
			}
		}
	}
	if (key === "s" || key === "arrowdown") {
		for (let i = parent.childElementCount; i--;) {
			let elem = parent.children[i];

			if ((elem.nodeName === "circle" || elem.classList.contains("level")) && elem !== homeArrowSelected) {
				let pos = arrowElemPos(elem);
				if (pos.y > selectedPos.y && pos.x === selectedPos.x) {
					if (Math.abs(pos.y - selectedPos.y) < minDist) {
						minDist = Math.abs(pos.y - selectedPos.y);
						minElem = elem;
					}
				}
			}
		}
	}
	if (key === "a" || key === "arrowleft") {
		for (let i = parent.childElementCount; i--;) {
			let elem = parent.children[i];

			if ((elem.nodeName === "circle" || elem.classList.contains("level")) && elem !== homeArrowSelected) {
				let pos = arrowElemPos(elem);
				if (pos.x < selectedPos.x && pos.y === selectedPos.y) {
					if (Math.abs(pos.x - selectedPos.x) < minDist) {
						minDist = Math.abs(pos.x - selectedPos.x);
						minElem = elem;
					}
				}
			}
		}
	}
	if (key === "d" || key === "arrowright") {
		for (let i = parent.childElementCount; i--;) {
			let elem = parent.children[i];

			if ((elem.nodeName === "circle" || elem.classList.contains("level")) && elem !== homeArrowSelected) {
				let pos = arrowElemPos(elem);
				if (pos.x > selectedPos.x && pos.y === selectedPos.y) {
					if (Math.abs(pos.x - selectedPos.x) < minDist) {
						minDist = Math.abs(pos.x - selectedPos.x);
						minElem = elem;
					}
				}
			}
		}
	}
	if (minElem) {
		let arrow = document.getElementById("homeArrow");
		let pos = arrowElemPos(minElem);
		
		arrow.style.left = pos.x + "px";
		arrow.style.top = pos.y + "px";
		arrow.style.opacity = 1;
		data.useKeyboard = true;
		homeArrowSelected = minElem;

		if (parent === document.getElementById("worldsBackground")) {
			lastWorldArrow = minElem;
		}
	}
}
function removeHomeArrow() {
	window.removeEventListener("mousemove", removeHomeArrow);
	window.removeEventListener("keydown", moveHomeArrow);
}
function addHomeArrow(level) {
	let parent = document.getElementById("levelSelect").classList.contains("active") ? document.getElementById("levels") : document.getElementById("worldsBackground");
	homeArrowSelected = parent.children[0];

	if (parent.id === "worldsBackground") {
		if (lastWorldArrow) {
			homeArrowSelected = lastWorldArrow;
		}
	}
	else if (level && !level.completed) {
		let n = level.completedLevels.length;

		for (let i = 0; i < parent.childElementCount; i++) {
			if (parent.children[i].classList.contains("level"))
				n--;
			if (n === -1) {
				homeArrowSelected = parent.children[i];
				break;
			}
		}
	}

	window.addEventListener("keydown", moveHomeArrow);

	let arrow = document.getElementById("homeArrow");
	let pos = arrowElemPos(homeArrowSelected);
	arrow.style.left = pos.x + "px";
	arrow.style.top  = pos.y + "px";
	arrow.style.opacity = Number(data.useKeyboard);
}
function loadWorldSelect() {
	let background = document.getElementById("worldsBackground");
	let nodes = background.getElementsByTagName("circle");
	let worldSelect = document.getElementById("worldSelect");
	let levelSelect = document.getElementById("levelSelect");

	worldSelect.classList.add("active");
	levelSelect.classList.remove("active");

	for (let i = 0; i < nodes.length; i++) {
		let name = worldNames[i];
		if (allWorlds[name]) {
			if (!data.worlds[name]) {
				data.worlds[name] = {
					unlocked: false,
					completed: false,
					completedLevels: [],
					coins: [],
				}
			}

			let node = nodes[i];
			let world = data.worlds[name];
			let prevWorld = data.worlds[world.prev];

			node.classList.remove("unlocked");
			node.classList.remove("complete");
			node.classList.remove("buyable");

			if (world.completed) {
				node.classList.add("complete");
			}
			else if (world.unlocked) {
				node.classList.add("unlocked");
			}
			else if (world.cost <= data.coins && (!prevWorld || prevWorld.unlocked && prevWorld.completed)) {
				node.classList.add("buyable");
			}
			
		}
	}
}
function loadLevelSelect(index) {
	let worldSelect = document.getElementById("worldSelect");
	let levelSelect = document.getElementById("levelSelect");
	let levelUI = document.getElementById("levels");
	let worldData = data.worlds[index];
	let world = allWorlds[index];
	let title = document.getElementById("levelSelectTitle");
	let levelLabel = document.getElementById("levelLabel");

	allWorlds.worldIndex = index;

	levelSelect.classList.add("active");
	worldSelect.classList.remove("active");

	title.innerHTML = worldData.name || "Select a level";
	levelUI.innerHTML = "";
	
	for (let i = 0; i < world.levels.length; i++) {
		let level = world.levels[i];
		let unlocked = i === 0 ? true : worldData.completedLevels.includes(level.index - 1);
		let completed = worldData.completedLevels.includes(level.index);
		let index = level.index - world.levels[0].index;

		let levelDiv = document.createElement("div");
		levelDiv.classList.add("level");
		if (unlocked) levelDiv.classList.add("unlocked");
		if (completed) levelDiv.classList.add("complete");

		levelDiv.onclick = function(event) {
			if (unlocked) {
				data.useKeyboard = !event.isTrusted;
				World.set(level.index);
				events.reset(true, true, true);
				closeHome();
			}
		}
		levelDiv.onmouseover = function() {
			homeArrowSelected = levelDiv;
			if (unlocked) {
				data.useKeyboard = false;

				let arrow = document.getElementById("homeArrow");
				let pos = arrowElemPos(levelDiv);
				arrow.style.opacity = 0;
				arrow.style.left = pos.x + "px";
				arrow.style.top  = pos.y + "px";

				levelLabel.innerHTML = "Level " + (index + 1);
				levelLabel.style.transform = `translate(${ levelDiv.offsetLeft + 400 - levelUI.clientWidth / 2 - levelLabel.clientWidth/4 }px, ${ levelUI.offsetTop - 70 }px)`;
				levelLabel.classList.add("active");
			}
		}
		levelDiv.onmouseout = function() {
			levelLabel.classList.remove("active");
		}

		levelUI.appendChild(levelDiv);

		for (let c = 0; c < level.numCoins; c++) {
			let coinDiv = document.createElement("div");
			coinDiv.classList.add("coin");
			if (worldData.coins[i] && worldData.coins[i].includes(c)) coinDiv.classList.add("complete");
			
			levelUI.appendChild(coinDiv);
		}
	}

	addHomeArrow(worldData);
}

document.getElementById("worldsBackground").addEventListener("mousemove", event => {
	let elem = event.target;
	let position = new vec(event.offsetX, event.offsetY);
	mouse.x = position.x;
	mouse.y = position.y;

	if (elem.tagName === "circle" && elem.onmouseleave == null) {
		let index = Array.prototype.indexOf.call(elem.parentNode.children, elem) / 2;
		let worldName = worldNames[index];
		let title = document.getElementById("worldLabel");
		let costUI = document.getElementById("coinCost");
		let titleY = 70;


		// Update ui showing cost of world
		let world = data.worlds[worldName];
		if (world && !world.unlocked && world.cost && data.worlds[world.prev].completed) {
			let costPos = new vec(Number(elem.getAttribute("cx")), Number(elem.getAttribute("cy"))).sub({ x: 0, y: 70 });
			costUI.innerHTML = world.cost;
			costUI.classList.add("active");
			costUI.style.transform = `translate(${ costPos.x }px, ${ costPos.y }px) translateX(-50%)`;

			titleY = 92;
		}

		// Update title 
		let pos = new vec(Number(elem.getAttribute("cx")), Number(elem.getAttribute("cy"))).sub({ x: 0, y: titleY });
		title.innerHTML = world && (!world.prev || data.worlds[world.prev].completed || world.unlocked) ? (world.name || (typeof worldName === "number" ? "World " + (index + 1) : worldName)) : "???";
		title.classList.add("active");
		title.style.transform = `translate(${ pos.x }px, ${ pos.y }px) translateX(-50%)`;

		let arrow = document.getElementById("homeArrow");
		let arrowPos = arrowElemPos(elem);
		arrow.style.left = arrowPos.x + "px";
		arrow.style.top =  arrowPos.y + "px";
		arrow.style.opacity = 0;
		data.useKeyboard = false;
		homeArrowSelected = elem;
		lastWorldArrow = elem;

		elem.onmouseleave = function() {
			elem.onmouseleave = null;
			title.classList.remove("active");
			costUI.classList.remove("active");
		}
	}
});

(function initWorldSelect() {
	let parent = document.getElementById("worldsBackground");
	let title = document.getElementById("worldLabel");
	let costUI = document.getElementById("coinCost");

	for (let i = parent.childElementCount; i--;) {
		let elem = parent.children[i];
		if (elem.nodeName === "circle") {
			let index = Array.prototype.indexOf.call(elem.parentNode.children, elem) / 2;
			let worldName = worldNames[index];
			let pos = new vec(Number(elem.getAttribute("cx")), Number(elem.getAttribute("cy")));
			let world = data.worlds[worldName];

			function click() {
				if (!world) return;
		
				if (world.unlocked) { // go to level select menu
					loadLevelSelect(worldName);
				}
				else if (data.worlds[world.prev].completed) { // attempt to buy world
					if (!world.cost || data.coins >= world.cost) {
						if (world.cost) data.coins -= world.cost;
						document.getElementById("coinCount").innerHTML = data.coins;
		
						world.unlocked = true;
						elem.classList.add("unlocked");
						elem.classList.remove("buyable");
						costUI.classList.remove("active");
						
						title.style.transform = `translate(${ pos.x }px, ${ (Number(elem.getAttribute("cy")) - 70) }px) translateX(-50%)`;
		
						loadWorldSelect();
						
						save();
					}
				}
			}

			elem.onclick = click;
			elem.click = click;
		}
	}
})();