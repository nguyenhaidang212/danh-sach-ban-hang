//-----Danh sách sản phẩm đang bán-----
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
        <div class="item-quality">Số lượng: ${value.countItem}</div>
      </div>
    </div>`;
    listItem.insertAdjacentHTML("beforeend", template);
  });
}
//-----Danh sách các đơn hàng đã mua-----
function renderOrderLists1() {
  // api.getApi().then((data) => {
  //   apiOrders.splice(0, apiOrders.length);
  //   data.forEach((item) => {
  //     apiOrders.push(item);
  //   });
  // });
  console.log(apiOrders.length);
  apiOrders.forEach((order) => {
    let count = 0;
    order.item.forEach((e) => (count += e.countItemBuy));
    document.querySelector(".orders_list").insertAdjacentHTML(
      "afterbegin",
      `
      <div class="order_list">
      <div>
      <span class="order-detail"> ${order.info.orderNumber}</span>
      <div class="order-detail-item">Details <i class="fa-sharp fa-solid fa-caret-down"></i></div>
      </div>
      <span id="username" class="order-detail"> ${order.info.username}</span>
      <span class="order-detail">${order.info.date}</span>
          <span class="order-detail">${order.item.length}</span>
          <span class="order-detail"> ${count}</span>
          <span class="order-detail">$ ${order.total}</span>
          <span class="order-detail show-detail" value="${order.info.orderNumber}"><i class="fa-regular fa-square-xmark return_order"></i></span>
    </div>
    `
    );
  });
}
//-----Chi tiết các sản phẩm của đơn hàng đã mua-----
function renderOrderList(value) {
  apiOrders.forEach((e) => {
    if (e.info.orderNumber == value) {
      document.querySelector(".order-detail-body").insertAdjacentHTML(
        "beforeend",
        `
    <div class="order-detail-grid">
      <span>Mã đơn hàng</span><span>${e.info.orderNumber}</span>
      <span>Số điện thoại</span><span>${e.info.sodienthoai}</span>
      <span>Email</span><span>${e.info.email}</span>
      <span>Địa chỉ</span><span>${e.info.address}</span>
      <span>Ghi chú</span><span id="message">${e.info.message}</span>
      <span>Danh sách sản phẩm</span>
      <div class="order-detail-list">
        <div class="detail-list-title">
        </div>
      </div>
    </div>
    `
      );
      e.item.forEach((value, index) => {
        document.querySelector(".order-detail-list").insertAdjacentHTML(
          "beforeend",
          `
            <div class="detail-list-title">
              <span>Sản phẩm ${index + 1}:</span>
             <span>${value.name}</span>
            <span>${value.countItemBuy} cái</span>
           </div>
          `
        );
      });
    }
  });
}
//-----Danh sách sản phẩm ở giỏ hàng-----
function displayItem(arr) {
  document.querySelectorAll(".list_buy").forEach((e) => e.remove());
  arr.forEach((e) => {
    getItemList().forEach((value) => {
      if (value.id === e.id) {
        const price = Number(e.gia) * Number(e.countItemBuy);
        document.querySelector(".buy").insertAdjacentHTML(
          "beforebegin",
          `<div class="list_buy">
          <img id="buy-img" src="${value.src}" alt="">
          <div class="buy-name">${value.name}</div>
          <div class="buy-quality">
          <i class="fa-solid fa-minus minus-icon"></i>
          <span>${e.countItemBuy}</span>
          <i class="fa-solid fa-plus plus-icon"></i>
          </div>
          <div class="buy-price">$ ${value.gia}</div>
          <div class="buy-sum">$ ${price}</div>
          <div><i class="fa-solid fa-circle-xmark buy-del"></i></div>
        </div>`
        );
      }
    });
  });
  totalAll();
}
// Chuyển trang
const mainMenu = document.querySelector(".main_menu");
const mainBuy = document.querySelector(".main_buy");
const mainInfo = document.querySelector(".main_info");
const mainOrder = document.querySelector("#order");
function displayHide(value, color) {
  document.querySelectorAll(".none").forEach((e) => (e.style.color = "black"));
  color.style.color = "red";
  mainMenu.style.display = "none";
  mainBuy.style.display = "none";
  mainOrder.style.display = "none";
  value.style.display = "block";
}
