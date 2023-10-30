const iconWrap = document.getElementById("iconWrap");
const iconOpen = document.getElementById("iconOpen");
const iconClose = document.getElementById("iconClose");
const mainMenu = document.getElementById("mainMenu");

iconWrap.addEventListener("click", () => {
  mainMenu.classList.toggle("hide-menu");
  iconOpen.classList.toggle("hide");
  iconClose.classList.toggle("hide");
});

let list_boxes = document.querySelectorAll(".list_box");
let list_btns = document.querySelectorAll(".list_btn");
list_btns.forEach((element) => {
  element.addEventListener("click", () => {
    let btn_id = element.id.slice(-1);
    list_boxes[btn_id - 1].classList.toggle("open");
  });
});
