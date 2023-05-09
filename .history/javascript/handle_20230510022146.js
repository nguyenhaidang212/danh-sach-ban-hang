const home = document.querySelector(".home");
const cart = document.querySelector(".buy_display");
const order = document.querySelector(".order");
const mainMenu = document.querySelector(".main_menu");
const mainBuy = document.querySelector(".main_buy");
const mainInfo = document.querySelector(".main_info");
const mainOrder = document.querySelector("#order");
const delItem = document.querySelector(".buy-del");
const arrayID = [];
const apiOrders = [];

listItemRender(getList());
getApi().then((data) => {
  apiOrders.splice(0, apiOrders.length);
  data.forEach((e) => apiOrders.push(e));
});
// Chuyển trang
// Trang mua hàng
home.addEventListener("click", (e) => {
  document.querySelector(".order_success").style.display = "none";
  getApi().then((data) => {
    apiOrders.splice(0, apiOrders.length);
    data.forEach((e) => {
      apiOrders.push(e);
    });
  });
  displayHide(mainMenu, e.target);
  listItemRender(getList());
  formWrong();
});
// Trang giỏ hàng
cart.addEventListener("click", (e) => {
  document.querySelector(".order_success").style.display = "none";
  getApi().then((data) => {
    apiOrders.splice(0, apiOrders.length);
    data.forEach((e) => {
      apiOrders.push(e);
    });
  });
  displayHide(mainBuy, e.target);
  if (getItemList().length == 0) {
    document.querySelector(".img").style.display = "block";
    document.querySelector("#main_buy").style.display = "none";
    document.querySelector(".total").style.display = "none";
    document.querySelector(".btn_buy").style.display = "none";
  } else {
    document.querySelector(".img").style.display = "none";
    document.querySelector("#main_buy").style.display = "block";
    document.querySelector(".total").style.display = "block";
    document.querySelector(".btn_buy").style.display = "block";
    displayItem(getItemList());
    totalAll();
  }
  formWrong();
});
// Trang đơn hàng đã mua
order.addEventListener("click", (e) => {
  if (apiOrders.length == 0) {
    document.querySelector(".img_order").style.display = "block";
    document.querySelector(".orders_content").style.display = "none";
  } else {
    document.querySelector(".orders_content").style.display = "block";
    document.querySelector(".img_order").style.display = "none";
  }
  document.querySelector(".order_success").style.display = "none";
  document.querySelectorAll(".order_list").forEach((e) => e.remove());
  document.querySelectorAll(".order_list").forEach((e) => e.remove());
  displayHide(mainOrder, e.target);
  renderOrderLists1();
});
// Thao tác trên app
$.addEventListener("click", (e) => {
  if (e.target.matches(".btn_back")) {
    document
      .querySelectorAll(".none")
      .forEach((e) => (e.style.color = "black"));
    document.querySelector(".order_success").style.display = "none";
    mainBuy.style.display = "none";
    mainOrder.style.display = "none";
    mainMenu.style.display = "block";
    document.querySelector(".home").style.color = "red";
    listItemRender(getList());
    formWrong();
  }
  if (e.target.matches(".btn_success")) {
    document.querySelectorAll(".order_list").forEach((e) => e.remove());
    document.querySelector(".order_success").style.display = "none";
    mainBuy.style.display = "none";
    mainOrder.style.display = "block";
    mainMenu.style.display = "none";
    document.querySelector(".order").style.color = "red";
    listItemRender(getList());
    formWrong();
    renderOrderLists1();
  }
  if (e.target.matches(".btn_buy")) {
    mainInfo.style.display = "block";
    document.querySelector(".overlay").style.display = "block";
  }
  if (e.target.matches(".buy_form_close")) {
    deleteInfo();
    formWrong();
    clearInfo();
    mainInfo.style.display = "none";
    document.querySelector(".overlay").style.display = "none";
  }
  if (e.target.matches(".order-detail-item")) {
    document.querySelector("#order-detail").style.display = "block";
    renderOrderList(e.target.previousElementSibling.textContent);
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
    if (confirm("Bạn muốn xóa sản phẩm này?") == true) {
      delItemBuy(
        e.target.parentNode.previousElementSibling.previousElementSibling
          .previousElementSibling.previousElementSibling.textContent,
        e.target.parentNode.parentNode
      );
      totalAll();
      countItem();
    }
  }
  if (e.target.matches(".plus-icon")) {
    plusItem(e.target);
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
    setOrder([]);
    validateForm();
    createOrder();
    getApi().then((data) => {
      data.forEach((value) => {
        arrayID.push(value.info.orderNumber);
      });
    });
  }
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
// localStorage.clear();
