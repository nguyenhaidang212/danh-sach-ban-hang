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
});
