const order = document.querySelector(".order");
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
});
