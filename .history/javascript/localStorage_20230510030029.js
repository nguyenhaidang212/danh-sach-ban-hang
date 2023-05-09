//-----Localstorage-----
const getList = function getListLocalstorage() {
  return JSON.parse(localStorage.getItem(keyLocalStorageListSP));
};
const getItemList = () => {
  return JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
};
const getOrder = () => {
  return JSON.parse(localStorage.getItem(userOrder));
};
function setListLocalstorage(arr) {
  localStorage.setItem(keyLocalStorageListSP, JSON.stringify(arr));
}
function setListItem(arr) {
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(arr));
}
function setOrder(arr) {
  localStorage.setItem(userOrder, JSON.stringify(arr));
}
// localStorage.clear();
if (getList() == null) {
  setListLocalstorage(listData);
}
setListItem([]);
setOrder([]);
listItemRender(getList());
getApi().then((data) => {
  apiOrders.splice(0, apiOrders.length);
  data.forEach((e) => apiOrders.push(e));
});
