// Trang mua hàng
const home = document.querySelector(".home");
home.addEventListener("click", (e) => {
  document.querySelector(".order_success").style.display = "none";
  // api.getApi1().then((data) => {
  //   apiOrders.splice(0, apiOrders.length);
  //   data.forEach((e) => {
  //     apiOrders.push(e);
  //   });
  // });
  api.getApi().then((data) => {
    apiOrders.splice(0, apiOrders.length);
    data.forEach((item) => apiOrders.push(item));
  });
  displayHide(mainMenu, e.target);
  listItemRender(getList());
  formWrong();
});
// Mua sản phẩm
$.addEventListener("click", (e) => {
  if (e.target.matches(".item-add")) {
    getItemBuy(e.target.parentNode.nextElementSibling.textContent);
    countItem();
  }
});
//-----Thêm sản phẩm vào đơn hàng-----
function getItemBuy(name) {
  let count = 0;
  const newList = [];
  const itemList = getItemList();
  getList().forEach((e) => {
    if (e.name === name) {
      if (e.countItem === 0) {
        alert("Sản phẩm hiện đang hết hàng");
      } else {
        itemList.forEach((value) => {
          if (value.name === name) {
            if (value.countItemBuy === e.countItem || e.countItem === 0) {
              alert("Bạn đã chọn tối đa số lượng sản phẩm");
            } else value.countItemBuy++;
          } else count++;
          newList.push(value);
        });
        if (count === itemList.length) {
          newList.push(e);
        }
      }
    }
  });
  setListItem(newList);
}
$.addEventListener("click", (e) => {
  // Quay lại trang mua hàng
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
  // Mua hàng thành công
  if (e.target.matches(".btn_success")) {
    document.querySelectorAll(".order_list").forEach((e) => e.remove());
    document.querySelector(".order_success").style.display = "none";
    mainBuy.style.display = "none";
    mainOrder.style.display = "block";
    mainMenu.style.display = "none";
    document.querySelector(".order").style.color = "red";
    console.log(apiOrders);
    listItemRender(getList());
    formWrong();
    renderOrderLists1();
  }
});
