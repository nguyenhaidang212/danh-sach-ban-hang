$.addEventListener("click", (e) => {
  // Xác nhận mua đơn hàng
  if (e.target.matches(".btn_confirm")) {
    setOrder([]);
    validateForm();
    createOrder();
    getApi().then((data) => {
      data.forEach((value) => {
        arrayID.push(value.info.orderNumber);
      });
    });
  }
  //   Đóng form thông tin
  if (e.target.matches(".buy_form_close")) {
    deleteInfo();
    formWrong();
    mainInfo.style.display = "none";
    document.querySelector(".overlay").style.display = "none";
  }
  //   Chọn tỉnh/ thành phố/ huyện
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
