const optionCity = document.querySelector(".option-city");
const arrayCity = [];
const arrayDistric = [];
const arrayWard = [];
// const promiseCity = fetch("https://provinces.open-api.vn/api/");
// const promiseDistrict = fetch("https://provinces.open-api.vn/api/d/");
// const proemiseWard = fetch("https://provinces.open-api.vn/api/w/");
// const orderApi = fetch(
//   "https://63e9d3fa811db3d7ef016dcc.mockapi.io/api/shop/tasks"
// );
const url = "https://63e9d3fa811db3d7ef016dcc.mockapi.io/api/shop/tasks";
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
const api = (() => {
  const postApi = async (value) => {
    const res = await fetch(
      "https://63e9d3fa811db3d7ef016dcc.mockapi.io/api/shop/tasks",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(value),
      }
    );
  };
  const getApi = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    return data;
  };
  const deleteApi = async (url, id) => {
    const res = await fetch(url + id, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  };
  return {
    postApi,
    getApi,
    deleteApi,
  };
})();
// api.getApi1(url).then((data) => console.log(data));
// api.getApi();
