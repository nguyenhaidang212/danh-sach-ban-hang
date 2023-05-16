$.addEventListener("click", (e) => {
  // Xác nhận mua đơn hàng
  if (e.target.matches(".show")) {
    setOrder([]);
    validateForm();
    createOrder();
    getApi().then((data) => {
      data.forEach((value) => {
        arrayID.push(value.info.orderNumber);
      });
    });
  }
  //   Đóng form thông tin
  if (e.target.matches(".buy_form_close")) {
    deleteInfo();
    formWrong();
    mainInfo.style.display = "none";
    document.querySelector(".overlay").style.display = "none";
  }
  //   Chọn tỉnh/ thành phố/ huyện
  if (e.target.matches(".select-city")) {
    districChoose();
    wardChoose();
  }
  if (e.target.matches(".select-district")) {
    wardChoose();
  }
  if (e.target.matches(".return_order")) {
    returnOrder(e.target.parentNode.getAttribute("value"));
  }
});
//-----Xóa thông tin-----
function deleteInfo() {
  document.querySelectorAll(".form-control").forEach((e) => (e.value = ""));
  document.querySelector("textarea").value = "";
  document.querySelectorAll(".city-choose").forEach((e) => e.remove());
  document.querySelectorAll(".district").forEach((e) => e.remove());
  document.querySelectorAll(".ward").forEach((e) => e.remove());
  arrayCity.forEach((e) => {
    selectCity.insertAdjacentHTML(
      "afterbegin",
      `
      <option class="city-choose" select value="${e.code}">${e.name}</option>`
    );
  });
}
//-----Chọn Quận/Huyện-----
function districChoose() {
  const district = document.querySelectorAll(".district");
  district.forEach((e) => {
    e.remove();
  });
  arrayDistric.forEach((e) => {
    if (e.province_code == selectCity.value) {
      selectDistrict.insertAdjacentHTML(
        "afterbegin",
        `
            <option select value="${e.code}" class="district">${e.name}</option>
            `
      );
    }
  });
}
//-----Chọn xã-----
function wardChoose() {
  const ward = document.querySelectorAll(".ward");
  ward.forEach((e) => {
    e.remove();
  });
  arrayWard.forEach((e) => {
    if (e.district_code == selectDistrict.value) {
      selectWard.insertAdjacentHTML(
        "afterbegin",
        `
          <option select value="${e.code}" class="ward">${e.name}</option>
          `
      );
    }
  });
}
function createOrder() {
  let cityName, districtName, wardName;
  arrayCity.forEach((e) => {
    if (e.code == selectCity.value) {
      cityName = e.name;
    }
  });
  arrayDistric.forEach((e) => {
    if (e.code == selectDistrict.value) {
      districtName = e.name;
    }
  });
  arrayWard.forEach((e) => {
    if (e.code == selectWard.value) {
      wardName = e.name;
    }
  });
  if (
    email != false &&
    sodienthoai != false &&
    cityName != undefined &&
    districtName != undefined &&
    wardName != undefined &&
    ho != false &&
    ten != false
  ) {
    const arrId = [];
    getApi().then((data) =>
      data.forEach((value) => arrId.push(value.info.orderNumber))
    );
    const orderUser = {
      orderNumber: Math.floor(Math.random() * 100000),
      date:
        date.getFullYear() +
        "/" +
        Number(date.getMonth() + 1) +
        "/" +
        date.getDate(),
      username: ho + " " + ten,
      email: email,
      sodienthoai: sodienthoai,
      address:
        document.querySelector(".form_home").value +
        " " +
        cityName +
        " " +
        districtName +
        " " +
        wardName,
      message: document.querySelector("textarea").value,
    };
    setOrder(orderUser);
    document.querySelector(".order_success").style.display = "block";
    document.querySelector(".orders_content").style.display = "block";
    document.querySelector(".img_order").style.display = "none";
    document.querySelector(".overlay").style.display = "none";
    mainInfo.style.display = "none";
    mainMenu.style.display = "none";
    mainBuy.style.display = "none";
    document
      .querySelectorAll(".none")
      .forEach((e) => (e.style.color = "black"));
    // Gửi đơn hàng lên API
    const item = getItemList();
    const info = getOrder();
    const create = {
      info,
      item,
      total: totalAll(),
    };
    postApi(create);
    getApi().then((data) => {
      apiOrders.splice(0, apiOrders.length);
      data.forEach((e) => apiOrders.push(e));
    });
    deleteData();
    totalAll();
    countItem();
  }
}