const optionCity = document.querySelector(".option-city");
const arrayCity = [];
const arrayDistric = [];
const arrayWard = [];
const promiseCity = fetch("https://provinces.open-api.vn/api/");
const promiseDistrict = fetch("https://provinces.open-api.vn/api/d/");
const proemiseWard = fetch("https://provinces.open-api.vn/api/w/");
const orderApi = fetch(
  "https://63e9d3fa811db3d7ef016dcc.mockapi.io/api/shop/tasks"
);
const getProvincesApi = (() => {
  return async () => {
    const res = await fetch("https://provinces.open-api.vn/api/");
    const data = await res.json();
    return data;
  };
})();
const getDistrictsApi = (() => {
  return async () => {
    const res = await fetch("https://provinces.open-api.vn/api/d/");
    const data = await res.json();
    return data;
  };
})();
const getWardsApi = (() => {
  return async () => {
    const res = await fetch("https://provinces.open-api.vn/api/w/");
    const data = await res.json();
    return data;
  };
})();
