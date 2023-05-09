const order = document.querySelector(".order");
$.addEventListener("click", (e) => {
  // Trả lại đơn hàng vừa mua
  if (e.target.matches(".return_order")) {
    returnOrder(e.target.parentNode.getAttribute("value"));
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
