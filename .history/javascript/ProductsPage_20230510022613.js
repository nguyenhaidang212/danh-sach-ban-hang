const cart = document.querySelector(".buy_display");
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
});
