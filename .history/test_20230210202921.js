const promiseCity = fetch("https://provinces.open-api.vn/api/");
const selectCity = document.querySelector(".select-city");
promiseCity
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    data.forEach((e) => {
      selectCity.insertAdjacentHTML(
        "afterbegin",
        `
        <option value="${e.code}">${e.name}</option>
        `
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
  if (e.target.parentNode.matches(".select-city")) {
    console.log(e.target.value);
  }
});
