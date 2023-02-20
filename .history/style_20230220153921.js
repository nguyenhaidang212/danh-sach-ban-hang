const menu = document.querySelectorAll(".menu-link");
const line = document.querySelector(".line");
menu.forEach((e) => {
  e.addEventListener("mouseenter", (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    console.log(left, top, width, height);
  });
});
