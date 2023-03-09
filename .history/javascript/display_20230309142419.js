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
    renderOrderLists();
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
