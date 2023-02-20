const menu = document.querySelectorAll(".menu-link");
menu.forEach((e) => {
  e.addEventListener("mouseenter", (e) => {
    console.log(e.target);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    console.log(left, top, width, height);
  });
});
