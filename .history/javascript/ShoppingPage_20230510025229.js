// const home = document.querySelector(".home");
// Mua sản phẩm
$.addEventListener("click", (e) => {
  if (e.target.matches(".item-add")) {
    getItemBuy(e.target.parentNode.nextElementSibling.textContent);
    countItem();
  }
});
//-----Add list item buy to localStorage-----
function getItemBuy(name) {
  let count = 0;
  const newList = [];
  const itemList = getItemList();
  getList().forEach((e) => {
    if (e.name == name) {
      if (e.countItem == 0) {
        alert("Sản phẩm hiện đang hết hàng");
      } else {
        itemList.forEach((value) => {
          if (value.name == name) {
            if (value.countItemBuy == e.countItem || e.countItem == 0) {
              alert("Bạn đã chọn tối đa số lượng sản phẩm");
            } else value.countItemBuy++;
          } else count++;
          newList.push(value);
        });
        if (count == itemList.length) {
          newList.push(e);
        }
      }
    }
  });
  setListItem(newList);
}
