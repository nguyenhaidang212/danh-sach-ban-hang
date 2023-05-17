// Trang thông tin
$.addEventListener("click", (e) => {
  // Xác nhận mua đơn hàng
  if (e.target.matches(".btn-confirm")) {
    setOrder([]);
    validateForm();
    createOrder();
  }
  // Đóng form thông tin
  if (e.target.matches(".buy_form_close")) {
    deleteInfo();
    formWrong();
    mainInfo.style.display = "none";
    document.querySelector(".overlay").style.display = "none";
  }
  // Chọn tỉnh/quận/xã
  if (e.target.matches(".select-city")) {
    districChoose();
    wardChoose();
  }
  if (e.target.matches(".select-district")) {
    wardChoose();
  }
});
//-----Xóa thông tin khách hàng vừa nhập-----
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
// Tạo đơn hàng
function createOrder() {
  let cityName = "",
    districtName = "",
    wardName = "";
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
    api
      .getApi()
      .then((data) =>
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
        wardName +
        ", " +
        districtName +
        ", " +
        cityName,
      message: document.querySelector("textarea").value,
    };
    checkID();
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
    api.postApi(create);
    api.getApi().then((data) => {
      apiOrders.splice(0, apiOrders.length);
      data.forEach((item) => {
        apiOrders.push(item);
      });
    });
    deleteData();
    totalAll();
    countItem();
  }
}
//-----RandomID + UniqueID function-----
function checkID() {
  console.log(arrID);
  const order = getOrder();
  if (arrayID.includes(order.orderNumber)) {
    order.orderNumber = Math.floor(Math.random() * 100000);
    setOrder(order);
    checkID();
  } else {
    return true;
  }
}
//-----Delete data localUser-----
function deleteData() {
  const listItem = getItemList();
  const list = getList();
  list.forEach((e) => {
    listItem.forEach((value) => {
      if (e.name === value.name) {
        e.countItem -= value.countItemBuy;
      }
    });
  });
  setOrder([]);
  setListItem([]);
  setListLocalstorage(list);
  deleteInfo();
}
//-----Xóa thông tin sau khi mua hàng thành công-----
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
// Xóa cảnh báo
function formWrong() {
  document.querySelectorAll(".form_wrong").forEach((e) => {
    e.textContent = "";
  });
}
getProvincesApi().then((data) => {
  data.forEach((item) => {
    arrayCity.push(item);
  });
});
getDistrictsApi().then((data) => {
  data.forEach((item) => {
    arrayDistric.push(item);
  });
});
getWardsApi().then((data) => {
  data.forEach((item) => {
    arrayWard.push(item);
  });
});
