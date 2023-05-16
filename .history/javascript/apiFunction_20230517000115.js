//-----Api function-----
function postApi(value) {
  fetch("https://63e9d3fa811db3d7ef016dcc.mockapi.io/api/shop/tasks", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(value),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
}
function getApi() {
  return fetch("https://63e9d3fa811db3d7ef016dcc.mockapi.io/api/shop/tasks", {
    method: "GET",
    headers: { "content-type": "application/json" },
  }).then((res) => res.json());
}
function deleteApi(value) {
  fetch("https://63e9d3fa811db3d7ef016dcc.mockapi.io/api/shop/tasks/" + value, {
    method: "DELETE",
  });
}
function putApi(value, status) {
  fetch("https://63e9d3fa811db3d7ef016dcc.mockapi.io/api/shop/tasks/" + value, {
    method: "PUT", // or PATCH
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ completed: status }),
  });
}
const callNow = function () {
  console.log("now");
};
callNow();
