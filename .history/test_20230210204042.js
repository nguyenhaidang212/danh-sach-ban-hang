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
    data.forEach((e) => {
      // if (e.pr)
    });
  })
  .catch((error) => {});
const selectDistrict = document.querySelector(".select-district");
selectDistrict.addEventListener("click", (e) => {
  //   console.log(selectCity.value);
  if (selectCity.value == "--Chọn Tỉnh/Thành phố--") {
    console.log("ban can chon tinh/thanh pho truoc");
  }
});
