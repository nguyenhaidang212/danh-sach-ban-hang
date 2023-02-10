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
    });
  })
  .catch((error) => {
    console.log(error);
  });
