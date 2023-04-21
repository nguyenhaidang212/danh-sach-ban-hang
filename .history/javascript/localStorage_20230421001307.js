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
setListLocalstorage(listData);
console.log(getList().length);
setListItem([]);
setOrder([]);
