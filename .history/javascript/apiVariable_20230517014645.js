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
getProvincesApi.then((data) => {
  data.forEach((item) => {
    arrayCity.push(item);
  });
});
console.log(arrayCity);
const getDistrictsApi = () => {
  return async () => {
    const res = await fetch("https://provinces.open-api.vn/api/d/");
    const data = await res.json();
    return data;
  };
};
const getWardsApi = () => {
  return async () => {
    const res = await fetch("https://provinces.open-api.vn/api/w/");
    const data = await res.json();
    return data;
  };
};
// Api fetch data
// promiseCity
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     data.forEach((e) => {
//       arrayCity.push(e);
//       selectCity.insertAdjacentHTML(
//         "afterbegin",
//         `
//       <option class="city-choose" select value="${e.code}">${e.name}</option>`
//       );
//     });
//   });
promiseDistrict
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((e) => {
      arrayDistric.push(e);
    });
  });
proemiseWard
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((e) => {
      arrayWard.push(e);
    });
  });
// (function getApi(value) {
//   fetch(value)
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// })("https://provinces.open-api.vn/api/");
// const api = (() => {
//   const getData = async (url) => {
//     const res = await fetch(url);
//     const data = await res.json();
//     return data;
//   };
//   return getData;
// })();
// api.getData("https://provinces.open-api.vn/api/");
// const getData = async (url) => {
//   const res = await fetch(url, {
//     method: "GET",
//     // mode: "no-cors",
//     headers: { "Content-type": "application/json" },
//   });
//   return res.json();
//   // const data = await res.json();
// };

// getData("https://63e9d3fa811db3d7ef016dcc.mockapi.io/api/shop/tasks").then(
//   (data) => console.log(data)
// );
api
  .getApi1("https://63e9d3fa811db3d7ef016dcc.mockapi.io/api/shop/tasks")
  .then((data) => console.log(data));

// function getApi() {
//   return fetch("https://63e9d3fa811db3d7ef016dcc.mockapi.io/api/shop/tasks", {
//     method: "GET",
//     headers: { "content-type": "application/json" },
//   }).then((res) => res.json());
// }
