const iconWrap = document.getElementById('iconWrap');
const iconOpen = document.getElementById('iconOpen');
const iconClose = document.getElementById('iconClose');
const mainMenu = document.getElementById('mainMenu');

iconWrap.addEventListener('click',() => {
	mainMenu.classList.toggle('hide-menu');
	iconOpen.classList.toggle('hide');
	iconClose.classList.toggle('hide');
})

function myFunction() {
	var x = document.getElementById("myLinks");
	if (x.style.display === "block") {
	  x.style.display = "none";
	} else {
	  x.style.display = "block";
	}
}