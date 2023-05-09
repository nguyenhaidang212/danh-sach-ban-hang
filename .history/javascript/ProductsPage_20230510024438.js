// const cart = document.querySelector(".buy_display");
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
  //   Xác nhận mua hàng
  if (e.target.matches(".btn_buy")) {
    mainInfo.style.display = "block";
    document.querySelector(".overlay").style.display = "block";
  }
  //   Quay lại trang mua hàng
  //   if (e.target.matches(".btn_back")) {
  //     document
  //       .querySelectorAll(".none")
  //       .forEach((e) => (e.style.color = "black"));
  //     document.querySelector(".order_success").style.display = "none";
  //     mainBuy.style.display = "none";
  //     mainOrder.style.display = "none";
  //     mainMenu.style.display = "block";
  //     document.querySelector(".home").style.color = "red";
  //     listItemRender(getList());
  //     formWrong();
  //   }
});
//-----Count item-----
function countItem() {
  let count = 0;
  getItemList().forEach((e) => {
    count += e.countItemBuy;
  });
  document.querySelector(".buy_count").textContent = count;
  if (count == 0) {
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
    if (e.name == name) {
      e.countItemBuy--;
      if (e.countItemBuy == 0) {
        if (confirm("Bạn muốn trả lại đơn hàng này?") == true) {
          list.splice(index, 1);
          value.remove();
        } else e.countItemBuy++;
      }
    }
  });
  setListItem(list);
  displayItem(list);
  if (list.length == 0) {
    document.querySelector(".img").style.display = "block";
    document.querySelector("#main_buy").style.display = "none";
  }
}
function plusItem(name) {
  const list = getItemList();
  const newList = getList();
  list.forEach((e) => {
    if (e.name == name.parentNode.previousElementSibling.textContent) {
      newList.forEach((item) => {
        if (item.name == e.name) {
          if (e.countItemBuy == item.countItem) {
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
