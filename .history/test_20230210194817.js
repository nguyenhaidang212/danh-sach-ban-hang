const endpoint =
  "https://provinces.open-api.vn/redoc#operation/show_all_divisions_api__get";

const promise = fetch("https://provinces.open-api.vn/api/");
promise
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
