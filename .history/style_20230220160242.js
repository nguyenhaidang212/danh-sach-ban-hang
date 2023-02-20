const menu = document.querySelectorAll(".menu-link");
const line = document.querySelector(".line");
menu.forEach((e) => {
  e.addEventListener("mouseenter", (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const offSetBottom = 2;
    line.style.width = `${width}px`;
    line.style.left = `${left}px`;
    line.style.top = `${top + height + offSetBottom}px`;
  });
});
// document.querySelector(".header-menu").addEventListener("mouseleave", (e) => {
//   line.style.width = 0;
// });
