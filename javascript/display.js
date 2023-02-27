// Hien thi san pham
localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listData));
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
// Chuyen trang
$.addEventListener("click", (e) => {
  //-----Chuyen trang-----
  // main_buy
  if (e.target.matches(".buy_display") || e.target.matches("#back2")) {
    document.querySelector("#order").style.display = "none";
    if (document.querySelector(".main_confirm").style.display == "block") {
      getApi()
        .then((res) => res.json())
        .then((data) => {
          data.forEach((e, i) => {
            if (e.OrderNumber == orderNumber) {
              putApi(orderNumber, false);
            }
          });
        });
    }
    document.querySelector(".home").style.color = "black";
    document.querySelector(".order").style.color = "black";
    document.querySelector(".carts").style.color = "red";
    document.querySelector(".payment").style.color = "black";
    document.querySelector(".confirm_item_buy").style.display = "none";
    document.querySelectorAll(".item_buy").forEach((e) => {
      e.remove();
    });
    document.querySelectorAll(".list_buy").forEach((e) => {
      e.remove();
    });
    document.querySelectorAll(".confirm_user").forEach((e) => {
      e.remove();
    });
    const listItem = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
    mainMenu.style.display = "none";
    mainBuy.style.display = "block";
    document.querySelector(".main_confirm").style.display = "none";
    displayItem(listItem);
    totalAll();
    if (getItemLocalstorage().length == 0) {
      document.querySelector(".img").style.display = "block";
      document.querySelector(".title").style.display = "none";
    } else {
      document.querySelector(".img").style.display = "none";
      document.querySelector(".title").style.display = "grid";
    }
    document.querySelectorAll(".buy-name").forEach((e) => {
      getListLocalstorage().forEach((value) => {
        if (e.textContent == value.name) {
          if (value.so_luong == 0) {
            document.querySelectorAll(".plus-icon").forEach((e) => {
              if (
                e.parentNode.previousElementSibling.textContent == value.name
              ) {
                e.remove();
              }
            });
          }
        }
      });
    });
  }
  const arrOrder = [];
  if (e.target.matches(".order")) {
    document.querySelectorAll(".order-grid-items").forEach((e) => e.remove());
    document.querySelector(".main_menu").style.display = "none";
    document.querySelector(".main_info").style.display = "none";
    document.querySelector(".main_buy").style.display = "none";
    document.querySelector(".main_confirm").style.display = "none";
    document.querySelector("#order").style.display = "block";
    document.querySelector(".home").style.color = "black";
    document.querySelector(".carts").style.color = "black";
    document.querySelector(".order").style.color = "black";
    document.querySelector(".payment").style.color = "black";
    document.querySelector(".order").style.color = "red";
    getApi()
      .then((res) => res.json())
      .then((data) => {
        data.forEach((e) => {
          if (e.completed == true) {
            arrOrder.push(e);
          }
        });
        arrOrder.forEach((e) => {
          document.querySelector(".order-menu").insertAdjacentHTML(
            "beforeend",
            `            <div class="order-grid-items">
              <span class="order-grid-item">${e.id}</span
              ><span class="order-grid-item">${e.name}</span
              ><span class="order-grid-item">Đang xử lý</span
              ><span class="order-grid-item">${e.total}<strong> $</strong></span
              ><span class="order-grid-item">${e.date}</span>
              <div class="order-grid-item order-detail">
                Xem chi tiết
              </div>
            </div>`
          );
        });
        document.querySelector(".all-order").textContent = arrOrder.length;
      });
  }
  if (e.target.matches("#back") || e.target.matches(".home")) {
    document.querySelector("#order").style.display = "none";
    if (document.querySelector(".main_confirm").style.display == "block") {
      getApi()
        .then((res) => res.json())
        .then((data) => {
          data.forEach((e, i) => {
            if (e.OrderNumber == orderNumber) {
              putApi(orderNumber, false);
            }
          });
        });
    }
    document.querySelector(".home").style.color = "red";
    document.querySelector(".carts").style.color = "black";
    document.querySelector(".payment").style.color = "black";
    document.querySelector(".order").style.color = "black";
    document.querySelector(".info").textContent = "";
    mainMenu.style.display = "block";
    mainBuy.style.display = "none";
    const back = document.querySelector("#back");
    document.querySelectorAll(".list_buy").forEach((e) => {
      e.remove();
    });
    document.querySelector(".main_confirm").style.display = "none";
    document.querySelectorAll(".confirm_user").forEach((e) => e.remove());
    arrayItemAdd.splice(0, arrayItemAdd.length);
    getItemLocalstorage().forEach((e) => arrayItemAdd.push(e));
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
  }
  if (e.target.matches(".close") || e.target.matches(".cancer")) {
    document.querySelector(".home").style.color = "black";
    document.querySelector(".carts").style.color = "red";
    document.querySelector(".payment").style.color = "black";
    if (getItemLocalstorage().length == 0) {
      document.querySelector(".img").style.display = "block";
      document.querySelector(".title").style.display = "none";
    } else {
      document.querySelector(".img").style.display = "none";
      document.querySelector(".title").style.display = "grid";
    }
    document.querySelector(".main_info").style.display = "none";
    mainBuy.style.display = "block";
    $.style.backgroundColor = "white";
    document.querySelector("header").style.display = "block";
    document.querySelector(".max_item").textContent = "";
    document.querySelectorAll(".list_buy").forEach((e) => {
      e.remove();
    });
    displayItem(getItemLocalstorage());
    document.querySelector(".bill").textContent = totalAll();
  }
  // main_info
  if (e.target.matches("#buy") || e.target.matches(".payment")) {
    document.querySelector("#order").style.display = "none";
    if (false) {
      alert("Bạn chưa chọn sản phẩm nào");
    } else {
      document.querySelector(".info").textContent = "";
      $.style.backgroundColor = "rgba(128, 128, 128, 1)";
      mainBuy.style.display = "none";
      document.querySelector(".order").style.color = "black";
      document.querySelector("header").style.display = "none";
      document.querySelector(".main_info").style.display = "block";
      document.querySelector(".main_menu").style.display = "none";
      document.querySelectorAll(".form_wrong").forEach((e) => {
        e.textContent = "";
      });
      document.querySelector(".info").textContent = "";
    }
  }
  if (e.target.matches(".order-detail")) {
    setTimeout(() => {
      document.querySelector("#order-detail").style.display = "flex";
      document.querySelector("#order").style.display = "none";
    });
    getApi()
      .then((res) => res.json())
      .then((data) => {
        data.forEach((value) => {
          if (
            value.id ==
            e.target.previousElementSibling.previousElementSibling
              .previousElementSibling.previousElementSibling
              .previousElementSibling.textContent
          ) {
            document.querySelector("#order-detail").insertAdjacentHTML(
              "beforeend",
              `<div class="order-detail-body">
              <div class="order-detail-title">
                <h1>Thông tin đơn hàng</h1>
              </div>
              <p>Mã đơn hàng</p>
              <p class="madonhang">${value.id}</p>
              <p>Số điện thoại</p>
              <p>${value.phonenumber}</p>
              <p>Email</p>
              <p>${value.email}</p>
              <p>Địa chỉ</p>
              <p>${value.address}</p>
              <p>Ghi chú</p>
              <p>${value.message}</p>
              <div class="order-detail-list">
                <p>Danh sách sản phẩm
                <i class="fa-sharp fa-solid fa-caret-right show-detail-item"></i>
                <i class="fa-solid fa-caret-left hide-detail-item"></i>
                </p>
              </div>
                <div class="list-item-order" style="display: none">
                </div>
            </div>`
            );
          }
        });
      });
  }
  if (
    !e.target.matches(".order-detail-body") &&
    e.target.matches(".order-detail-overlay")
  ) {
    document.querySelector(".order-detail-body").remove();
    document.querySelector("#order").style.display = "block";
    document.querySelector("#order-detail").style.display = "none";
  }
  if (e.target.matches(".show-detail-item")) {
    setTimeout(() => {
      document.querySelector(".show-detail-item").style.display = "none";
      document.querySelector(".hide-detail-item").style.display = "inline";
    }, 500);
    getApi()
      .then((res) => res.json())
      .then((data) => {
        document.querySelector(".list-item-order").style.display = "grid";
        data.forEach((value) => {
          if (value.id == document.querySelector(".madonhang").textContent) {
            value.order.forEach((e) => {
              document.querySelector(".list-item-order").insertAdjacentHTML(
                "beforeend",
                `<span class="tensanpham">${e.name}</span>
                  <span class="soluong">${e.soluong}</span>`
              );
            });
          }
        });
      });
  }
  if (e.target.matches(".hide-detail-item")) {
    document.querySelector(".show-detail-item").style.display = "inline";
    document.querySelector(".hide-detail-item").style.display = "none";
    document.querySelectorAll(".tensanpham").forEach((e) => e.remove());
    document.querySelectorAll(".soluong").forEach((e) => e.remove());
  }
  //-----Add Item-----
  if (e.target.matches(".item-add")) {
    countList(e.target);
    addItem(e.target);
    countItem(e.target);
  }
  //-----Del Item-----
  if (e.target.matches(".buy-del")) {
    let newList = [];
    getListLocalstorage().forEach((value) => {
      if (
        value.name ==
        e.target.parentNode.previousElementSibling.previousElementSibling
          .previousElementSibling.previousElementSibling.textContent
      ) {
        value.so_luong =
          value.so_luong +
          Number(
            e.target.parentNode.previousElementSibling.previousElementSibling
              .previousElementSibling.textContent
          );
      }
      newList.push(value);
    });
    localStorage.setItem(keyLocalStorageListSP, JSON.stringify(newList));
    const itemDelName =
      e.target.parentNode.previousElementSibling.previousElementSibling
        .previousElementSibling.previousElementSibling;
    delItemBuy(itemDelName);
    if (document.querySelectorAll(".buy-del").length == 0) {
      document.querySelector(".img").style.display = "block";
      document.querySelector(".title").style.display = "none";
    }
    countItem();
    totalAll();
  }
  //-----Increase/Decrease Item----
  if (e.target.matches(".plus-icon")) {
    const listItem = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
    listItem.forEach((value) => {
      if (
        value.name == e.target.parentNode.previousElementSibling.textContent
      ) {
        value.soluong++;
      }
    });
    let listNew = [];
    getListLocalstorage().forEach((value) => {
      if (
        value.name == e.target.parentNode.previousElementSibling.textContent
      ) {
        value.so_luong--;
        if (value.so_luong == 0) {
          console.log(e.target);
          e.target.style.display = "none";
        }
      }
      listNew.push(value);
    });
    localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listNew));
    localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(listItem));
    e.target.previousElementSibling.textContent =
      Number(e.target.previousElementSibling.textContent) + 1;
    countItem();
    totalPlus(e.target);
  }
  if (e.target.matches(".minus-icon")) {
    const listItem = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
    listItem.forEach((value, i) => {
      if (
        value.name == e.target.parentNode.previousElementSibling.textContent
      ) {
        value.soluong--;
        if (value.soluong == 0) {
          listItem.splice(i, 1);
          arrayItemAdd.forEach((e, i) => {
            if (e.name == value.name) {
              arrayItemAdd.splice(i, 1);
            }
          });
        }
      }
    });
    localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(listItem));
    e.target.nextElementSibling.textContent =
      Number(e.target.nextElementSibling.textContent) - 1;
    if (e.target.nextElementSibling.textContent == 0) {
      e.target.parentNode.parentNode.remove();
    }
    let newList = [];
    getListLocalstorage().forEach((value) => {
      if (
        value.name == e.target.parentNode.previousElementSibling.textContent
      ) {
        value.so_luong++;
      }
      newList.push(value);
    });
    localStorage.setItem(keyLocalStorageListSP, JSON.stringify(newList));
    totalMinus(e.target);
    countItem();
    if (getItemLocalstorage().length == 0) {
      document.querySelector(".img").style.display = "block";
      document.querySelector(".title").style.display = "none";
    }
    if (e.target.nextElementSibling.textContent < 20) {
      e.target.nextElementSibling.nextElementSibling.style.display = "block";
    }
  }
  //-----Show details-----
  if (e.target.matches(".details")) {
    if (document.querySelector(".confirm_item_buy").style.display == "block") {
      e.preventDefault();
    } else {
      document.querySelector(".confirm_item_buy").style.display = "block";
      getItemLocalstorage().forEach((e) => {
        document.querySelector(".confirm_item_buy").insertAdjacentHTML(
          "beforeend",
          `
        <div class="item_buy">
        <span class="item_buy_name">${e.name}</span> <span>${e.price}</span><span>${e.soluong}</span>
      </div>
        `
        );
      });
    }
  }
  if (e.target.matches(".close_list")) {
    document.querySelector(".confirm_item_buy").style.display = "none";
    document.querySelectorAll(".item_buy").forEach((e) => {
      e.remove();
    });
  }
  //-----Delete order from api
  if (e.target.matches(".return_item")) {
    document.querySelectorAll(".list_buy").forEach((e) => e.remove());
    document.querySelector(".bill").textContent = "0";
    let arr = [];
    getListLocalstorage().forEach((value) => {
      getItemLocalstorage().forEach((e) => {
        if (e.name == value.name) {
          value.so_luong = Number(e.soluong) + Number(value.so_luong);
        }
      });
      arr.push(value);
    });
    setListLocalstorage(arr);
    getApi()
      .then((res) => res.json())
      .then((data) => {
        data.forEach((e, i) => {
          if (e.OrderNumber == orderNumber) {
            deleteApi(e.OrderNumber);
            arrayItemAdd.splice(0, arrayItemAdd.length);
            localStorage.setItem(keyLocalStorageItemCart, JSON.stringify([]));
            document.querySelectorAll(".confirm_user").forEach((e) => {
              e.remove();
            });
            document.querySelector(".confirm_item_buy").style.display = "none";
            countItem();
          }
        });
      });
  }
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
  if (
    document.querySelectorAll(".confirm_user").length == 0 ||
    document.querySelector(".confirm_order").textContent == 0
  ) {
    document.querySelector(".finish").preventDefault();
  } else {
    putApi(orderNumber, true);
    success();
    const item = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
    item.forEach((value) => {
      const template = `<div class="item">
                <div class="item-imgs">
                  <img src="${value.src}" alt="" class="item-img"/>
                </div>
                <div class="item-icon"><i class="fa-solid fa-cart-plus item-add"></i></div>
                <div class="item-title">${value.name}</div>
                <div class="item-info">
                  <div class="item-price">Giá: ${value.gia}</div>
                  <div class="item-quality">Số lượng: ${value.so_luong}</div>
                </div>
              </div>`;
      listItem.insertAdjacentHTML("beforeend", template);
    });
  }
});
