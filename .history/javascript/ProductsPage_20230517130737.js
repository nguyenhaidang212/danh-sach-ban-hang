// Trang giỏ hàng
const cart = document.querySelector(".buy_display");
cart.addEventListener("click", (e) => {
  document.querySelector(".order_success").style.display = "none";
  api.getApi().then((data) => {
    apiOrders.splice(0, apiOrders.length);
    arrId.splice(0, arrId.length);
    data.forEach((item) => {
      apiOrders.push(item);
      arrId.push(item.info.orderNumber);
    });
  });
  displayHide(mainBuy, e.target);
  if (getItemList().length === 0) {
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
$.addEventListener("click", (e) => {
  // Thêm bớt sản phẩm trong giỏ hàng
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
  // Xóa sản phẩm
  if (e.target.matches(".buy-del")) {
    if (confirm("Bạn muốn xóa sản phẩm này?") === true) {
      delItemBuy(
        e.target.parentNode.previousElementSibling.previousElementSibling
          .previousElementSibling.previousElementSibling.textContent,
        e.target.parentNode.parentNode
      );
      totalAll();
      countItem();
    }
  }
  //   Xác nhận mua hàng
  if (e.target.matches(".btn_buy")) {
    if (arrayCity) {
      document.querySelectorAll(".city-choose").forEach((e) => e.remove());
      arrayCity.forEach((e) => {
        selectCity.insertAdjacentHTML(
          "afterbegin",
          `
        <option class="city-choose" select value="${e.code}">${e.name}</option>`
        );
      });
    }
    mainInfo.style.display = "block";
    document.querySelector(".overlay").style.display = "block";
  }
});
//-----Count item-----
function countItem() {
  let count = 0;
  if (getItemList()) {
    count = getItemList().length;
  }
  document.querySelector(".buy_count").textContent = count;
  if (count === 0) {
    document.querySelector(".buy_count").style.display = "none";
  } else {
    document.querySelector(".buy_count").style.display = "block";
  }
}
function totalAll() {
  let total = 0;
  getItemList().forEach((e) => {
    total += Number(e.gia) * Number(e.countItemBuy);
  });
  document.querySelector(".bill").textContent = total;
  return total;
}
function minusItem(name, value) {
  const list = getItemList();
  list.forEach((e, index) => {
    if (e.name === name) {
      e.countItemBuy--;
      if (e.countItemBuy === 0) {
        if (confirm("Bạn muốn xóa sản phẩm này?") === true) {
          list.splice(index, 1);
          value.remove();
        } else e.countItemBuy++;
      }
    }
  });
  setListItem(list);
  displayItem(list);
  if (list.length === 0) {
    document.querySelector(".img").style.display = "block";
    document.querySelector("#main_buy").style.display = "none";
  }
}
function plusItem(name) {
  const list = getItemList();
  const newList = getList();
  list.forEach((e) => {
    if (e.name === name.parentNode.previousElementSibling.textContent) {
      newList.forEach((item) => {
        if (item.name === e.name) {
          if (e.countItemBuy === item.countItem) {
            alert("Bạn đã chọn tối đa số lượng sản phẩm");
          } else {
            e.countItemBuy++;
          }
        }
      });
    }
  });
  setListLocalstorage(newList);
  setListItem(list);
  displayItem(list);
}
//-----Trả lại sản phẩm-----
function returnItem() {
  document.querySelectorAll(".confirm_order").forEach((e) => e.remove());
  const listItem = getItemList();
  const list = getList();
  list.forEach((e) => {
    listItem.forEach((value) => {
      if (value.name === e.name) {
        e.countItem += value.countItemBuy;
        e.countItemBuy -= value.countItemBuy;
      }
    });
  });
  setListLocalstorage(list);
  setListItem([]);
  totalAll();
  countItem();
  document.querySelector(".confirm_context").style.display = "none";
  document.querySelector(".confirm_header2").style.display = "block";
}
//-----Xóa sản phẩm trong giỏ hàng-----
function delItemBuy(name, value) {
  value.remove();
  const itemList = getItemList();
  itemList.forEach((e, index) => {
    if (e.name === name) {
      itemList.splice(index, 1);
      setListItem(itemList);
    }
  });
  if (getItemList().length === 0) {
    document.querySelector(".img").style.display = "block";
    document.querySelector(".total").style.display = "none";
    document.querySelector("#main_buy").style.display = "none";
    document.querySelector(".btn_buy").style.display = "none";
  }
}
