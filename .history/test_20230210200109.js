const endpoint =
  "https://provinces.open-api.vn/redoc#operation/show_all_divisions_api__get";

const promise = fetch("https://provinces.open-api.vn/api/");
const dropdownList = document.querySelector(".menu-city");
promise
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
