listItemRender(listData);
// Chuyển trang
home.addEventListener("click", (e) => {
  displayHide(mainMenu, e.target);
  listItemRender(getList());
  formWrong();
});
const back = document.querySelector(".btn_back");
back.addEventListener("click", (e) => {});
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
  formWrong();
});
// info.addEventListener("click", (e) => {
//   displayHide(mainInfo, e.target);
//   formWrong();
// });
const arrayID = [];
// payment.addEventListener("click", (e) => {
//   checkID();
//   document.querySelectorAll(".confirm_order").forEach((e) => e.remove());
//   totalAll();
//   displayHide(mainPayment, e.target);
//   renderOrder();
//   formWrong();
// });
order.addEventListener("click", (e) => {
  document.querySelectorAll(".order-detail").forEach((e) => e.remove());
  displayHide(mainOrder, e.target);
  apiOrders.splice(0, apiOrders.length);
  getApi().then((data) => {
    apiOrders.push(data);
  });
});
// Thao tác trên app
$.addEventListener("click", (e) => {
  if (e.target.matches(".btn_back")) {
    document
      .querySelectorAll(".none")
      .forEach((e) => (e.style.color = "black"));
    document.querySelector(".order_success").style.display = "none";
    mainBuy.style.display = "none";
    mainInfo.style.display = "none";
    mainPayment.style.display = "none";
    mainOrder.style.display = "none";
    mainMenu.style.display = "block";
    document.querySelector(".home").style.color = "red";
    document.querySelector(".success").style.display = "none";
    listItemRender(getList());
    formWrong();
  }
  if (e.target.matches(".btn_success")) {
    document
      .querySelectorAll(".none")
      .forEach((e) => (e.style.color = "black"));
    document.querySelector(".order_success").style.display = "none";
    mainBuy.style.display = "none";
    mainOrder.style.display = "block";
    mainMenu.style.display = "none";
    document.querySelector(".home").style.color = "red";
    document.querySelector(".success").style.display = "none";
    listItemRender(getList());
    formWrong();
  }
  if (e.target.matches(".btn_buy")) {
    document.head.style.backgroundColor = "red";
    mainInfo.style.display = "block";
    document.querySelector(".overlay").style.display = "block";
  }
  if (e.target.matches(".buy_form_close")) {
    mainInfo.style.display = "none";
    document.querySelector(".overlay").style.display = "none";
  }
  if (e.target.matches(".btn-search")) {
    renderOrderLists(e.target);
  }
  if (e.target.matches(".show-detail")) {
    document.querySelector("#order-detail").style.display = "block";
    const value =
      e.target.previousElementSibling.previousElementSibling
        .previousElementSibling.previousElementSibling.previousElementSibling
        .textContent;
    renderOrderList(value);
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
    returnItem();
  }
  if (e.target.matches(".finish")) {
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
  }
});
// localStorage.clear();