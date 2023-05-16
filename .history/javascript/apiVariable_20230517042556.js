const optionCity = document.querySelector(".option-city");
const arrayCity = [];
const arrayDistric = [];
const arrayWard = [];
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
  const getApi = async () => {
    const res = await fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    return data;
  };
  const deleteApi = async (id) => {
    const res = await fetch(
      `https://63e9d3fa811db3d7ef016dcc.mockapi.io/api/shop/tasks/${id}`,
      {
        method: "DELETE",
      }
    );
  };
  return {
    postApi,
    getApi,
    deleteApi,
  };
})();
