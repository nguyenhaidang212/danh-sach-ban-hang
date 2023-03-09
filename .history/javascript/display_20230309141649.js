localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listData));
localStorage.setItem(keyLocalStorageItemCart, JSON.stringify([]));
localStorage.setItem(userOrder, JSON.stringify([]));
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
listItemRender(item);

// Chuyển trang
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
  apiOrders.splice(0, apiOrders.length);
  document.querySelectorAll(".order-detail").forEach((e) => e.remove());
  displayHide(mainOrder, e.target);
  getApi().then((data) => {
    data.forEach((value) => {
      apiOrders.push(value);
    });
  });
});

// Thao tác trên app
$.addEventListener("click", (e) => {
  if (e.target.matches(".btn-search")) {
    arrList.splice(0, arrList.length);
    document.querySelectorAll(".order-detail").forEach((e) => e.remove());
    if (document.querySelector(".order-detail-grid")) {
      document.querySelector(".order-detail-grid").remove();
    }
    const value = e.target.previousElementSibling.value;
    e.target.previousElementSibling.value = "";
    apiOrders.forEach((order) => {
      if (order.info.username == value || order.info.orderNumber == value) {
        arrList.push(order);
      }
    });
    if (arrList.length == 0) {
      alert("Không có đơn hàng cần tìm");
    }
    arrList.forEach((order) => {
      document.querySelector(".order-gird").insertAdjacentHTML(
        "beforeend",
        `
      <span class="order-detail"> ${order.info.orderNumber}</span><span class="order-detail"> ${order.info.username}</span
    //   ><span class="order-detail">Đang xử lý</span><span class="order-detail"> ${order.total}$</span><span class="order-detail"> ${order.info.date}</span
    //   ><span class="order-detail show-detail">...</span>
      `
      );
    });
  }
  if (e.target.matches(".show-detail")) {
    document.querySelector("#order-detail").style.display = "block";
    const value =
      e.target.previousElementSibling.previousElementSibling
        .previousElementSibling.previousElementSibling.previousElementSibling
        .textContent;
    arrList.forEach((order) => {
      if (order.info.orderNumber == value) {
        document.querySelector(".order-detail-body").insertAdjacentHTML(
          "beforeend",
          `
    <div class="order-detail-grid">
      <span>Order Id</span><span>${order.info.orderNumber}</span>
      <span>Phone number</span><span>${order.info.sodienthoai}</span>
      <span>Email</span><span>${order.info.email}</span>
      <span>Address</span><span>${order.info.address}</span>
      <span>Message</span><span>${order.info.message}</span>
      <span>List items</span>
      <div class="order-detail-list">
        <div class="detail-list-title">
          <span>No.</span>
          <span>Product</span>
          <span>Quantity</span>
        </div>
      </div>
    </div>
    `
        );
        order.item.forEach((value, index) => {
          document.querySelector(".order-detail-list").insertAdjacentHTML(
            "beforeend",
            `
            <div class="detail-list-title">
              <span>${index + 1}</span>
             <span>${value.name}</span>
            <span>${value.so_luong_mua}</span>
           </div>
          `
          );
        });
      }
    });
  }
  if (
    e.target.matches(".order-detail-overlay") &&
    !e.target.matches(".order-detail-body")
  ) {
    document.querySelector("#order-detail").style.display = "none";
    document.querySelector(".order-detail-grid").remove();
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
