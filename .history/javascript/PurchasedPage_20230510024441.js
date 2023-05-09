// const order = document.querySelector(".order");
$.addEventListener("click", (e) => {
  // Trả lại đơn hàng vừa mua
  if (e.target.matches(".return_order")) {
    returnOrder(e.target.parentNode.getAttribute("value"));
  }
  //   Xem thông tin chi tiết đơn hàng
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
  // Trở lại trang mua sản phẩm
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
//-----Trả lại đơn hàng-----
function returnOrder(value) {
  const newList = [];
  if (confirm("Bạn muốn trả lại đơn hàng này?") == true) {
    apiOrders.forEach((e, index) => {
      if (e.info.orderNumber == value) {
        apiOrders.splice(index, 1);
        deleteApi(e.OrderNumber);
      }
      getList().forEach((item) => {
        e.item.forEach((value) => {
          if (value.name == item.name) {
            item.countItem += value.countItemBuy;
          }
        });
        newList.push(item);
      });
    });
    setListLocalstorage(newList);
    document.querySelectorAll(".order_list").forEach((e) => e.remove());
    renderOrderLists1();
    if (apiOrders.length == 0) {
      document.querySelector(".img_order").style.display = "block";
      document.querySelector(".orders_content").style.display = "none";
    } else {
      document.querySelector(".orders_content").style.display = "block";
      document.querySelector(".img_order").style.display = "none";
    }
  }
}
