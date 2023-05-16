// Trang đơn hàng đã mua
const order = document.querySelector(".order");
order.addEventListener("click", (e) => {
  if (apiOrders.length === 0) {
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
});
//-----Trả lại đơn hàng-----
function returnOrder(value) {
  const newList = [];
  if (confirm("Bạn muốn trả lại đơn hàng này?") == true) {
    apiOrders.forEach((e, index) => {
      if (e.info.orderNumber == value) {
        api.deleteApi(e.OrderNumber);
        getList().forEach((item) => {
          e.item.forEach((value) => {
            if (value.name == item.name) {
              item.countItem += value.countItemBuy;
            }
          });
          newList.push(item);
        });
        apiOrders.splice(index, 1);
      }
    });
    setListLocalstorage(newList);
    document.querySelectorAll(".order_list").forEach((e) => e.remove());
    renderOrderLists1();
    if (apiOrders.length === 0) {
      document.querySelector(".img_order").style.display = "block";
      document.querySelector(".orders_content").style.display = "none";
    } else {
      document.querySelector(".orders_content").style.display = "block";
      document.querySelector(".img_order").style.display = "none";
    }
  }
}
