const promiseCity = fetch("https://provinces.open-api.vn/api/");
const promiseDistrict = fetch("https://provinces.open-api.vn/api/d/");
const proemiseWard = fetch("https://provinces.open-api.vn/api/w/");
const selectCity = document.querySelector(".select-city");
const selectDistrict = document.querySelector(".select-district");
const selectWard = document.querySelector(".select-ward");
const arrayDistric = [];
const arrayWard = [];
promiseCity
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // console.log(data);
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
promiseDistrict
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // console.log(data);
    data.forEach((e) => {
      // console.log(typeof e);
      arrayDistric.push(e);
      // console.log(arrayDistric);
    });
  })
  .catch((error) => {});
proemiseWard
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((e) => {
      arrayWard.push(e);
    });
  });
