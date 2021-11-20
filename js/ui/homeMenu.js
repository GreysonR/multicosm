"use strict";

var inHome = false;

function openHome() {
	inHome = true;
	Render.enabled = false;

	document.getElementById("home").classList.add("active");
	document.getElementById("coinCount").innerHTML = data.coins;

	loadWorldSelect();
	// loadLevelSelect(0);
}
function closeHome() {
	inHome = true;
	Render.enabled = true;

	document.getElementById("home").classList.remove("active");
}
function loadWorldSelect() {
	let background = document.getElementById("worldsBackground");
	let nodes = background.getElementsByTagName("circle");
	let worldSelect = document.getElementById("worldSelect");
	let levelSelect = document.getElementById("levelSelect");

	worldSelect.classList.add("active");
	levelSelect.classList.remove("active");

	for (let i = 0; i < nodes.length; i++) {
		if (allWorlds[i]) {
			if (!data.worlds[i]) {
				data.worlds[i] = {
					unlocked: false,
					completed: false,
					completedLevels: [],
					coins: [],
				}
			}

			let node = nodes[i];
			let world = data.worlds[i];

			if (world.completed) {
				node.classList.add("complete");
				node.classList.remove("unlocked");
			}
			else if (world.unlocked) {
				node.classList.add("unlocked");
				node.classList.remove("complete");
			}
			else {
				node.classList.remove("unlocked");
				node.classList.remove("complete");
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

		levelDiv.onclick = function() {
			if (unlocked) {
				World.set(level.index);
				events.reset(true);
				closeHome();
			}
		}
		levelDiv.onmouseover = function() {
			if (unlocked) {
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
}
openHome();

document.getElementById("worldsBackground").addEventListener("mousemove", event => {
	let elem = event.target;
	let position = new vec(event.offsetX, event.offsetY);
	mouse.x = position.x;
	mouse.y = position.y;

	if (elem.tagName === "circle" && elem.onmouseleave == null) {
		let index = Array.prototype.indexOf.call(elem.parentNode.children, elem) / 2;
		let title = document.getElementById("worldLabel");
		let costUI = document.getElementById("coinCost");
		let titleY = 70;

		// Update ui showing cost of world
		let world = data.worlds[index];
		if (world && !world.unlocked && world.cost && data.worlds[world.prev].completed) {
			let costPos = new vec(Number(elem.getAttribute("cx")), Number(elem.getAttribute("cy"))).sub({ x: 0, y: 70 });
			costUI.innerHTML = world.cost;
			costUI.classList.add("active");
			costUI.style.transform = `translate(${ costPos.x }px, ${ costPos.y }px) translateX(-50%)`;

			titleY = 92;
		}

		// Update title 
		let pos = new vec(Number(elem.getAttribute("cx")), Number(elem.getAttribute("cy"))).sub({ x: 0, y: titleY });
		title.innerHTML = world && (!world.prev || data.worlds[world.prev].completed) ? (world.name || "World " + (index + 1)) : "???";
		title.classList.add("active");
		title.style.transform = `translate(${ pos.x }px, ${ pos.y }px) translateX(-50%)`;

		elem.onmouseleave = function() {
			elem.onmouseleave = null;
			elem.onclick = null;
			title.classList.remove("active");
			costUI.classList.remove("active");
		}
		elem.onclick = function() {
			if (!world) return;

			if (world.unlocked) { // go to level select menu
				loadLevelSelect(index);
			}
			else if (data.worlds[world.prev].completed) { // attempt to buy world
				if (!world.cost || data.coins >= world.cost) {
					if (world.cost) data.coins -= world.cost;
					document.getElementById("coinCount").innerHTML = data.coins;

					world.unlocked = true;
					elem.classList.add("unlocked");
					costUI.classList.remove("active");
					
					save();
				}
			}
		}
	}
});