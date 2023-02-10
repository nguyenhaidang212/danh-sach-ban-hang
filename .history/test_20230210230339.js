const promiseCity = fetch("https://provinces.open-api.vn/api/");
const promiseDistrict = fetch("https://provinces.open-api.vn/api/d/");
const proemiseWard = fetch("https://provinces.open-api.vn/api/w/");
const selectCity = document.querySelector(".select-city");
const selectDistrict = document.querySelector(".select-district");
const selectWard = document.querySelector(".select-ward");
const arrayCity = [];
const arrayDistric = [];
const arrayWard = [];
promiseCity
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // console.log(data);
    data.forEach((e) => {
      arrayCity.push(e);
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
console.log(arrayDistric);
selectCity.addEventListener("click", (e) => {
  arrayCity.forEach((e) => {
    selectCity.insertAdjacentHTML(
      "afterbegin",
      `
    <option selected value="${e.code}">${e.name}</option>
    `
    );
  });
});
document.body.addEventListener("click", (e) => {
  if (e.target.matches(".select-district")) {
    districChoose();
  }
});
function districChoose() {
  if (selectCity.value == "--Chọn Tỉnh/Thành phố--") {
    console.log(1);
  }
  arrayDistric.forEach(e => {
    if (e.)
  })
}
