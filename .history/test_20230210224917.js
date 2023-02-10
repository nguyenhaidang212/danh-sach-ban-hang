const promiseCity = fetch("https://provinces.open-api.vn/api/");
const selectCity = document.querySelector(".select-city");
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
const promiseDistrict = fetch("https://provinces.open-api.vn/api/d/");
const proemiseWard = fetch("https://provinces.open-api.vn/api/w/");
const arrayDistric = [];
const arrayWard = [];
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
const selectDistrict = document.querySelector(".select-district");
const selectWard = document.querySelector(".select-ward");
// console.log(data);
setTimeout((e) => {
  console.log(arrayDistric);
  // console.log(1);
  // selectCity.addEventListener("click", (e) => {
  //   if (selectCity.value == "--Chọn Tỉnh/Thành phố--") {
  //     selectDistrict.removeChild("option");
  //   }
  // });
  selectDistrict.addEventListener("click", function (e) {
    if (selectCity.value == "--Chọn Tỉnh/Thành phố--") {
      console.log("ban can chon tinh/thanh pho truoc");
    }
    arrayDistric.forEach((e) => {
      if (e.province_code == selectCity.value) {
        selectDistrict.insertAdjacentHTML(
          "afterbegin",
          `<option selected>${e.name}</option>
          `
        );
        console.log(1);
      }
    });
  });
}, 1000);
