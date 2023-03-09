// -----Select district + select ward-----
document.body.addEventListener("click", (e) => {
  if (e.target.matches(".select-city")) {
    districChoose();
    wardChoose();
  }
  if (e.target.matches(".select-district")) {
    wardChoose();
  }
});
//-----Creat Order ------
