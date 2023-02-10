const promiseCity = fetch("https://provinces.open-api.vn/api/");
const selectCity = document.querySelector(".select-city");
promiseCity
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((e) => {
      selectCity.insertAdjacentHTML(
        "afterbegin",
        `<li><a class="dropdown-item" href="#">${e.name}</a></li>`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
const promiseDistrict = fetch("https://provinces.open-api.vn/api/d/");
promiseDistrict
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {});
$.addEventListener("click", function (e) {
  con;
  if (e.target.parentNode.matches(".menu-city")) {
    console.log(e.target.value);
  }
});
