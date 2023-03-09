localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listData));
localStorage.setItem(keyLocalStorageItemCart, JSON.stringify([]));
localStorage.setItem(userOrder, JSON.stringify([]));
const listItem = document.querySelector(".list");
function listItemRender(arr) {
  document.querySelectorAll(".item").forEach((e) => e.remove());
  arr.forEach((value) => {
    const template = `<div class="item">
    <div class="item-imgs">
      <img src="${value.src}" alt="" class="item-img"/>
    </div>
    <div class="item-icon">
    <i class="fa-solid fa-cart-plus item-add"></i>
    </div>
    <div class="item-title">${value.name}</div>
    <div class="item-info">
      <div class="item-price">Giá: ${value.gia}</div>
      <div class="item-quality">Số lượng: ${value.so_luong}</div>
    </div>
  </div>`;
    listItem.insertAdjacentHTML("beforeend", template);
  });
}
item.forEach((value) => {
  const template = `<div class="item">
  <div class="item-imgs">
    <img src="${value.src}" alt="" class="item-img"/>
  </div>
  <div class="item-icon">
  <i class="fa-solid fa-cart-plus item-add"></i>
  </div>
  <div class="item-title">${value.name}</div>
  <div class="item-info">
    <div class="item-price">Giá: ${value.gia}</div>
    <div class="item-quality">Số lượng: ${value.so_luong}</div>
  </div>
</div>`;
  listItem.insertAdjacentHTML("beforeend", template);
});
home.addEventListener("click", (e) => {
  displayHide(mainMenu, e.target);
  listItemRender(getList());
  formWrong();
});
cart.addEventListener("click", (e) => {
  displayHide(mainBuy, e.target);
  if (getItemList().length == 0) {
    document.querySelector(".img").style.display = "block";
    document.querySelector("#main_buy").style.display = "none";
  } else {
    document.querySelector(".img").style.display = "none";
    document.querySelector("#main_buy").style.display = "block";
    displayItem(getItemList());
    totalAll();
  }
});
info.addEventListener("click", (e) => {
  displayHide(mainInfo, e.target);
});
payment.addEventListener("click", (e) => {
  document.querySelectorAll(".confirm_order").forEach((e) => e.remove());
  totalAll();
  displayHide(mainPayment, e.target);
  renderOrder();
});
order.addEventListener("click", (e) => {
  displayHide(mainOrder, e.target);
});
$.addEventListener("click", (e) => {
  if (e.target.matches(".btn-search")) {
    document.querySelectorAll(".order-detail").forEach((e) => e.remove());
    const value = e.target.previousElementSibling.value;
    getApi().then((data) => {
      const apiOrders = [];
      data.forEach((e) => {
        apiOrders.push(e);
      });
      const arrList = [];
      apiOrders.forEach((order) => {
        if (order.info.username == value || order.info.orderNumber == value) {
          arrList.push(order);
        }
      });
      console.log(arrList);
      if (arrList.length == 0) {
        alert("Không tìm thấy đơn hàng");
      } else {
        arrList.forEach((order) => {
          document.querySelector(".order-gird").insertAdjacentHTML(
            "beforeend",
            `
            <span class="order-detail"> ${order.info.orderNumber}</span><span class="order-detail"> ${order.info.username}</span
          ><span class="order-detail"> xu ly</span><span class="order-detail"> ${order.total}$</span><span class="order-detail"> ${order.info.date}</span
          ><span class="order-detail show-detail">...</span>`
          );
        });
      }
    });
  }
  if (e.target.matches(".show-detail")) {
    document.querySelector("#order-detail").style.display = "grid";
    // mainOrder.style.display = "none";
  }
  if (e.target.matches(".item-add")) {
    getItemBuy(e.target.parentNode.nextElementSibling.textContent);
    countItem();
  }
  if (e.target.matches(".buy-del")) {
    delItemBuy(
      e.target.parentNode.previousElementSibling.previousElementSibling
        .previousElementSibling.previousElementSibling.textContent,
      e.target.parentNode.parentNode
    );
    totalAll();
    countItem();
  }
  if (e.target.matches(".plus-icon")) {
    plusItem(e.target.parentNode.previousElementSibling.textContent);
    countItem();
  }
  if (e.target.matches(".minus-icon")) {
    minusItem(
      e.target.parentNode.previousElementSibling.textContent,
      e.target.parentNode.parentNode
    );
    countItem();
  }
  if (e.target.matches(".show")) {
    validateForm();
    createOrder();
  }
  if (e.target.matches(".select-city")) {
    districChoose();
    wardChoose();
  }
  if (e.target.matches(".select-district")) {
    wardChoose();
  }
  if (e.target.matches(".return_order")) {
    returnItem();
  }
});
function render(arr, order) {
  let quantity = 0;
  arr.forEach((e) => {
    quantity += Number(e.so_luong_mua);
  });
  document.querySelector(".confirm_grid").insertAdjacentHTML(
    "beforeend",
    `
<div class="confirm_order confirm_id ">${order.orderNumber}</div>
<div class="confirm_username confirm_order">${order.username}</div>
<div class="confirm_date confirm_order">${order.date}</div>
<div class="confirm_items confirm_order">${arr.length}</div>
<div class="confirm_quantity confirm_order">${quantity}</div>
<div class="confirm_price confirm_order">${
      document.querySelector(".bill").textContent
    }</div>
<div class="confirm_return confirm_order">
<i class="fa-solid fa-circle-xmark return_order"></i>
</div>
`
  );
}
function renderOrder() {
  const order = getOrder();
  const item = getItemList();
  if (order.length == 0) {
    document.querySelector(".confirm_header").style.display = "block";
    document.querySelector(".confirm_context").style.display = "none";
    document.querySelector(".confirm_header2").style.display = "none";
  } else if (item.length == 0) {
    document.querySelector(".confirm_header2").style.display = "block";
    document.querySelector(".confirm_context").style.display = "none";
  } else {
    document.querySelector(".confirm_header2").style.display = "none";
    document.querySelector(".confirm_header").style.display = "none";
    document.querySelector(".confirm_context").style.display = "block";
    render(item, order);
  }
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
    ho != undefined &&
    ten != undefined
  ) {
    const orderUser = {
      orderNumber: date.getTime(),
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
  }
}
function returnItem() {
  document.querySelectorAll(".confirm_order").forEach((e) => e.remove());
  const listItem = getItemList();
  const list = getList();
  list.forEach((e) => {
    listItem.forEach((value) => {
      if (value.name == e.name) {
        e.so_luong = e.so_luong + value.so_luong_mua;
        e.so_luong_mua = e.so_luong_mua - value.so_luong_mua;
      }
    });
  });
  setListLocalstorage(list);
  setListItem([]);
  totalAll();
  countItem();
}
function validateForm() {
  if (formUser.value == "") {
    document.querySelector(".wrong1").textContent =
      "Bạn cần nhập thông tin ở trên";
  }
  if (ten == "") {
    document.querySelector(".wrong2").textContent =
      "Bạn cần nhập thông tin ở trên";
  }
  if (email == "") {
    document.querySelector(".wrong3").textContent =
      "Bạn cần nhập thông tin ở trên";
  }
  if (sodienthoai == "" || sodienthoai.length != 10) {
    document.querySelector(".wrong4").textContent =
      "Bạn cần nhập thông tin ở trên";
  }
  if (
    selectCity.value == "" ||
    selectDistrict.value == "--Chọn Huyện/Quận--" ||
    selectWard.value == "--Chọn Xã--"
  ) {
    document.querySelector(".wrong5").textContent =
      "Bạn cần nhập thông tin ở trên";
  }
}

formUser.addEventListener("focus", (e) => {
  document.querySelector(".wrong1").textContent = "";
});
formName.addEventListener("focus", (e) => {
  document.querySelector(".wrong2").textContent = "";
});
formEmail.addEventListener("focus", (e) => {
  document.querySelector(".wrong3").textContent = "";
});
formNumber.addEventListener("focus", (e) => {
  document.querySelector(".wrong4").textContent = "";
});
formUser.addEventListener("blur", (e) => {
  ho = ValidateName(e.target);
});
formName.addEventListener("blur", (e) => {
  ten = ValidateName(e.target);
});
formEmail.addEventListener("blur", (e) => {
  email = ValidateEmail(e.target);
});
formNumber.addEventListener("blur", (e) => {
  sodienthoai = ValidatePhone(e.target);
});
document.querySelectorAll("select").forEach((e) => {
  e.addEventListener("click", (e) => {
    document.querySelector(".wrong5").textContent = "";
  });
});

function minusItem(name, value) {
  const list = getItemList();
  const newList = getList();
  list.forEach((e, index) => {
    if (e.name == name) {
      e.so_luong_mua--;
      e.so_luong++;
      newList.forEach((item) => {
        if (item.name == e.name) {
          item.so_luong++;
          item.so_luong_mua--;
        }
      });
      if (e.so_luong_mua == 0) {
        list.splice(index, 1);
        value.remove();
      }
    }
  });
  setListLocalstorage(newList);
  setListItem(list);
  displayItem(list);
}
function check(value) {
  const list = getItemList();
  list.forEach((e) => {
    if (e.name == value.parentNode.previousElementSibling.textContent) {
      if (e.so_luong == 0) {
        console.log(1);
        value.style.display = "none";
      }
    }
  });
}
function plusItem(name) {
  const list = getItemList();
  const newList = getList();
  list.forEach((e) => {
    if (e.name == name) {
      e.so_luong_mua++;
      e.so_luong--;
      newList.forEach((item) => {
        if (item.name == e.name) {
          item.so_luong--;
          item.so_luong_mua++;
        }
      });
    }
  });
  setListLocalstorage(newList);
  setListItem(list);
  displayItem(list);
}
function delItemBuy(name, value) {
  value.remove();
  const newList = getItemList();
  const list = getList();
  newList.forEach((e, index) => {
    if (e.name == name) {
      list.forEach((value) => {
        if (value.name == e.name) {
          value.so_luong += e.so_luong_mua;
        }
      });
      setListLocalstorage(list);
      newList.splice(index, 1);
      setListItem(newList);
    }
  });
  if (getItemList().length == 0) {
    document.querySelector(".img").style.display = "block";
    document.querySelector("#main_buy").style.display = "none";
  }
}
function getItemBuy(name) {
  const newList = [];
  const itemList = getItemList();
  getList().forEach((e) => {
    if (e.name == name) {
      if (e.so_luong == 0) {
        value.preventDefault();
      }
      e.so_luong--;
      e.so_luong_mua++;
      itemList.forEach((item, index) => {
        if (item.name == e.name) {
          itemList.splice(index, 1);
        }
      });
      itemList.push(e);
    }
    newList.push(e);
  });
  setListItem(itemList);
  setListLocalstorage(newList);
  listItemRender(newList);
}
function displayHide(value, color) {
  document.querySelectorAll(".none").forEach((e) => (e.style.color = "black"));
  color.style.color = "red";
  mainMenu.style.display = "none";
  mainBuy.style.display = "none";
  mainInfo.style.display = "none";
  mainPayment.style.display = "none";
  mainOrder.style.display = "none";
  document.querySelector(".success").style.display = "none";
  value.style.display = "block";
}
//-----Success handle-----
document.querySelector(".success").addEventListener("click", (e) => {
  countItem();
  document.querySelectorAll("input").forEach((e) => {
    e.value = "";
  });
  document.querySelectorAll(".city-choose").forEach((e) => e.remove());
  arrayCity.forEach((e) => {
    selectCity.insertAdjacentHTML(
      "afterbegin",
      `
      <option class="city-choose" select value="${e.code}">${e.name}</option>`
    );
  });
  selectDistrict.value = "--Chọn Huyện/Quận--";
  selectWard.value = "--Chọn Xã--";
  document.querySelectorAll(".confirm_user").forEach((e) => e.remove());
  document.querySelectorAll(".item").forEach((e) => e.remove());
  getListLocalstorage().forEach((value) => {
    const template = `<div class="item">
    <div class="item-imgs">
      <img src="${value.src}" alt="" class="item-img"/>
    </div>
    <div class="item-icon">
    <i class="fa-solid fa-cart-plus item-add"></i>
    </div>
    <div class="item-title">${value.name}</div>
    <div class="item-info">
      <div class="item-price">Giá: ${value.gia}</div>
      <div class="item-quality">Số lượng: ${value.so_luong}</div>
    </div>
  </div>`;
    listItem.insertAdjacentHTML("beforeend", template);
  });
  document.querySelector("textarea").value = "";
  document.querySelector(".home").style.color = "red";
  document.querySelector(".carts").style.color = "black";
  document.querySelector(".payment").style.color = "black";
  document.querySelector(".success").style.display = "none";
  document.querySelector(".main_menu").style.display = "block";
  document.querySelector("header").style.display = "block";
});
//-----Finish handle-----
document.querySelector(".finish").addEventListener("click", (e) => {
  const item = getItemList();
  const info = getOrder();
  const create = {
    info,
    item,
    total: totalAll(),
    // date: item.
  };
  postApi(create);
  deleteData();
  document.querySelector(".success").style.display = "block";
  payment.style.color = "black";
  mainPayment.style.display = "none";
  totalAll();
  countItem();
});
function deleteData() {
  setOrder([]);
  setListItem([]);
  const list = getList();
  list.forEach((e) => {
    e.so_luong_mua = 0;
  });
  setListLocalstorage(list);
  deleteInfo();
}
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
function formWrong() {
  document.querySelectorAll(".form_wrong").forEach((e) => {
    e.textContent = "";
  });
}
