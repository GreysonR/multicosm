"use strict";

var inTitle = true;
var inCredits = false;
var focusedTitle = 0;
var parentTitle = document.getElementById("title");

function openTitle() {
	inTitle = true;
	document.getElementById("title").classList.add("active");
	World.set(0);

	parentTitle.children[focusedTitle].classList.remove("focused");
	focusedTitle = 0;
	parentTitle.children[focusedTitle].classList.add("focused");
}
function closeTitle() {
	inTitle = false;
	document.getElementById("title").classList.remove("active");
	World.set(1);
}
openTitle();

function openTutorial() {
	document.getElementById("tutorial").classList.add("active");
}
function closeTutorial() {
	document.getElementById("tutorial").classList.remove("active");
}
function openCredits() {
	inCredits = true;
	document.getElementById("title").classList.add("credits");
	parentTitle.children[focusedTitle].classList.remove("focused");
	focusedTitle = 3;
	parentTitle.children[focusedTitle].classList.add("focused");
}
function closeCredits() {
	inCredits = false;
	document.getElementById("title").classList.remove("credits");
	parentTitle.children[focusedTitle].classList.remove("focused");
	focusedTitle = 0;
	parentTitle.children[focusedTitle].classList.add("focused");
}

parentTitle.addEventListener("mousemove", event => {
	if (inTitle && event.target.tagName === "BUTTON") {
		parentTitle.children[focusedTitle].classList.remove("focused");
		focusedTitle = Number(event.target.id.replace("b", ""));
		parentTitle.children[focusedTitle].classList.add("focused");
	}
});
window.addEventListener("keydown", event => {
	if (inTitle) {
		let key = event.key.toLowerCase();

		if (!inCredits) {
			if ((key === "arrowup" || key === "w") && focusedTitle > 0) {
				parentTitle.children[focusedTitle].classList.remove("focused");
				focusedTitle--;
				parentTitle.children[focusedTitle].classList.add("focused");
			}
			if ((key === "arrowdown" || key === "s") && focusedTitle < 1) {
				parentTitle.children[focusedTitle].classList.remove("focused");
				focusedTitle++;
				parentTitle.children[focusedTitle].classList.add("focused");
			}
		}
		if (key === "enter" || key === " ") {
			parentTitle.children[focusedTitle].click();
		}
	}
});
