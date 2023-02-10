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
const arrayDistric = [];
promiseDistrict
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // console.log(data);
    data.forEach((e) => {
      arrayDistric.push(e);
    });
  })
  .catch((error) => {});
const selectDistrict = document.querySelector(".select-district");
// console.log(data);
setTimeout((e) => {
  console.log(arrayDistric);
  // if (selectCity.value == "--Chọn Tỉnh/Thành phố--") {
  //   console.log("ban can chon tinh/thanh pho truoc");
  // }
}, 2000);
