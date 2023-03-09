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
function renderOrderLists(value) {
  arrList.splice(0, arrList.length);
  document.querySelectorAll(".order-detail").forEach((e) => e.remove());
  if (document.querySelector(".order-detail-grid")) {
    document.querySelector(".order-detail-grid").remove();
  }
  const name = value.previousElementSibling.value;
  value.previousElementSibling.value = "";
  apiOrders.forEach((order) => {
    if (order.info.username == name || order.info.orderNumber == name) {
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
function renderOrderList(value) {
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
function renderOrder() {
  const order = getOrder();
  const item = getItemList();
  if (order.length == 0) {
    document.querySelector(".confirm_header").style.display = "block";
    document.querySelector(".confirm_context").style.display = "none";
    document.querySelector(".confirm_header2").style.display = "none";
  } else if (item.length == 0) {
    document.querySelector(".confirm_header").style.display = "none";
    document.querySelector(".confirm_header2").style.display = "block";
    document.querySelector(".confirm_context").style.display = "none";
  } else {
    document.querySelector(".confirm_header2").style.display = "none";
    document.querySelector(".confirm_header").style.display = "none";
    document.querySelector(".confirm_context").style.display = "block";
    render(item, order);
  }
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
