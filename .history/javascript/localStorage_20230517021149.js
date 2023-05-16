//-----Localstorage-----
// Lấy danh sách sản phẩm của shop
const getList = function getListLocalstorage() {
  return JSON.parse(localStorage.getItem(keyLocalStorageListSP));
};
// Lấy danh sách sản phẩm đã mua
const getItemList = () => {
  return JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
};
// Lấy đơn hàng vừa tạo trên LocalStorage
const getOrder = () => {
  return JSON.parse(localStorage.getItem(userOrder));
};
// Cập nhật danh sách đơn hàng trên LocalStorage
function setListLocalstorage(arr) {
  localStorage.setItem(keyLocalStorageListSP, JSON.stringify(arr));
}
// Cập nhật danh sách sản phẩm của shop trên LocalStorage
function setListItem(arr) {
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(arr));
}
// Tạo đơn hàng mới trên LocalStorage
function setOrder(arr) {
  localStorage.setItem(userOrder, JSON.stringify(arr));
}
// localStorage.clear();
if (getList() === null) {
  setListLocalstorage(listData);
}
setListItem([]);
setOrder([]);
listItemRender(getList());
// getApi().then((data) => {
//   apiOrders.splice(0, apiOrders.length);
//   data.forEach((e) => apiOrders.push(e));
// });
