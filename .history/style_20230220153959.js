const menu = document.querySelectorAll(".menu-link");
const line = document.querySelector(".line");
menu.forEach((e) => {
  e.addEventListener("mouseenter", (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    console.log(left, top, width, height);
    line.style.width = `${width}px`;
    line.style.height = `${height}px`;
    line.style.left = `${left}px`;
    line.style.top = `${top}px`;
  });
});
