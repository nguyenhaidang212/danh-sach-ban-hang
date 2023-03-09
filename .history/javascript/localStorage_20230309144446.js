setListLocalstorage(listData);
setListItem([]);
setOrder([]);
//-----Localstorage-----
const getItemList = () => {
  return JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
};
const getList = function getListLocalstorage() {
  return JSON.parse(localStorage.getItem(keyLocalStorageListSP));
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
