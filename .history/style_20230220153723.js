const menu = document.querySelectorAll(".menu-link");
menu.forEach((e) => {
  e.addEventListener("mouseenter", (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
  });
});
