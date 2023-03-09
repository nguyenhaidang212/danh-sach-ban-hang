// Hien thi san pham
localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listData));
localStorage.setItem(keyLocalStorageItemCart, JSON.stringify([]));
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
// Chuyen trang
home.addEventListener("click", (e) => {
  displayHide(mainMenu, e.target);
  listItemRender(getList());
});
cart.addEventListener("click", (e) => {
  displayHide(mainBuy, e.target);
  if (getItemList().length == 0) {
    document.querySelector(".img").style.display = "block";
    document.querySelector("#main_buy").style.display = "none";
  } else {
    document.querySelector(".img").style.display = "none";
    document.querySelector("#main_buy").style.display = "block";
  }
});
info.addEventListener("click", (e) => {
  displayHide(mainInfo, e.target);
});
payment.addEventListener("click", (e) => {
  displayHide(mainPayment, e.target);
});
order.addEventListener("click", (e) => {
  displayHide(mainOrder, e.target);
});
$.addEventListener("click", (e) => {
  if (e.target.matches(".item-add")) {
    getItemBuy(e.target);
  }
});
function getItemBuy(value) {
  const name = value.parentNode.nextElementSibling.textContent;
  const newList = [];
  const itemList = getItemList();
  getList().forEach((e) => {
    if (e.name == name) {
      if (e.so_luong == 0) {
        value.preventDefault();
      }
      e.so_luong--;
      itemList.forEach((item, index) => {
        if (item.name == e.name) {
          itemList.splice(index, 1);
          e.quanlity++;
        }
      });
      itemList.push(e);
    }
    newList.push(e);
  });
  console.log(itemList);
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