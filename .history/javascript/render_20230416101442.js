//
function render(arr, order) {
  let quantity = 0;
  arr.forEach((e) => {
    quantity += Number(e.countItemBuy);
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
// show purchased order
function renderOrderLists1() {
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
// show detail purchased order
function renderOrderList(value) {
  apiOrders.forEach((e) => {
    if (e.info.orderNumber == value) {
      document.querySelector(".order-detail-body").insertAdjacentHTML(
        "beforeend",
        `
    <div class="order-detail-grid">
      <span>ID Number</span><span>${e.info.orderNumber}</span>
      <span>Phone number</span><span>${e.info.sodienthoai}</span>
      <span>Email</span><span>${e.info.email}</span>
      <span>Address</span><span>${e.info.address}</span>
      <span>Message</span><span id="message">${e.info.message}</span>
      <span>List items</span>
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
// }
function displayHide(value, color) {
  document.querySelectorAll(".none").forEach((e) => (e.style.color = "black"));
  color.style.color = "red";
  mainMenu.style.display = "none";
  mainBuy.style.display = "none";
  mainOrder.style.display = "none";
  value.style.display = "block";
}
// show order list
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
// show the list of products are buying
function displayItem(arr) {
  document.querySelectorAll(".list_buy").forEach((e) => e.remove());
  arr.forEach((e) => {
    getItemList().forEach((value) => {
      if (value.id == e.id) {
        const price = Number(e.gia) * Number(e.countItemBuy);
        buyDiplay.insertAdjacentHTML(
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

// export default displayItem;