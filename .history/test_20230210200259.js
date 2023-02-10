const promiseCity = fetch("https://provinces.open-api.vn/api/");
const dropdownList = document.querySelector(".menu-city");
promiseCity
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((e) => {
      console.log(e.name);
      dropdownList.insertAdjacentHTML(
        "afterbegin",
        `<li><a class="dropdown-item" href="#">${e.name}</a></li>`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
const promiseDistrict = fetch("https://provinces.open-api.vn/api/d/");
