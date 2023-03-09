//-----Add item----
function addItem(value) {
  item.forEach((e) => {
    if (e.name == value.parentNode.nextElementSibling.textContent) {
      const object = {
        id: e.id,
        soluong: e.quality,
        name: e.name,
        price: e.gia,
      };
      arrayItemAdd.forEach((e, i) => {
        if (object.id == e.id) {
          object.soluong = e.soluong + 1;
          arrayItemAdd.splice(i, 1);
        }
      });
      arrayItemAdd.push(object);
    }
  });
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(arrayItemAdd));
}
//-----Show item-----
function displayItem(arr) {
  document.querySelectorAll(".list_buy").forEach((e) => e.remove());
  arr.forEach((e) => {
    item.forEach((value) => {
      if (value.id == e.id) {
        const price = Number(e.gia) * Number(e.so_luong_mua);
        buyDiplay.insertAdjacentHTML(
          "beforebegin",
          `<div class="list_buy">
          <div class="buy-name">${value.name}</div>
          <div class="buy-quality">
          <i class="fa-solid fa-minus minus-icon"></i>
          <span>${e.so_luong_mua}</span>
          <i class="fa-solid fa-plus plus-icon"></i>
          </div>
          <div class="buy-price">${value.gia}</div>
          <div class="buy-sum">${price}</div>
          <div><i class="fa-solid fa-circle-xmark buy-del"></i></div>
        </div>`
        );
      }
    });
    document.querySelectorAll(".plus-icon").forEach((e) => {
      console.log(e.parentNode.previousElementSibling.textContent);
      getItemList().forEach((item) => {
        if (item.name == e.parentNode.previousElementSibling.textContent) {
          if (item.so_luong == 5) {
            e.style.display = "none";
          } else e.style.display = "block";
        }
      });
    });
  });
  if (arr.length == 0) {
    document.querySelector(".img").style.display = "block";
    document.querySelector("#main_buy").style.display = "none";
  }
  totalAll();
}
//-----Count item-----
function countItem(value = 0) {
  let count = 0;
  getItemLocalstorage().forEach((e) => {
    count += e.soluong;
  });
  document.querySelector(".buy_count").textContent = count;
  if (count == 0) {
    document.querySelector(".buy_count").style.display = "none";
  } else {
    document.querySelector(".buy_count").style.display = "block";
  }
}
//-----Delete item-----
function delItemBuy(name) {
  name.parentNode.remove();
  const arr = getItemLocalstorage();
  arr.forEach((e, i) => {
    if (e.name == name.textContent) {
      arr.splice(i, 1);
    }
  });
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(arr));
}
//-----Total Price-----
function totalPlus(value = 0) {
  totalAll();
  value.parentNode.nextElementSibling.nextElementSibling.textContent =
    Number(value.previousElementSibling.textContent) *
    Number(value.parentNode.nextElementSibling.textContent);
}
function totalMinus(value = 0) {
  totalAll();
  value.parentNode.nextElementSibling.nextElementSibling.textContent =
    Number(value.nextElementSibling.textContent) *
    Number(value.parentNode.nextElementSibling.textContent);
}
function totalAll() {
  let total = 0;
  getItemList().forEach((e) => {
    total += Number(e.gia) * Number(e.so_luong_mua);
  });
  document.querySelector(".bill").textContent = total;
  return total;
}
//-----Count item-----
function countList(value) {
  listNew = [];
  getListLocalstorage().map((e) => {
    if (e.name == value.parentNode.nextElementSibling.textContent) {
      if (e.so_luong == 0) {
        alert("Không đủ sản phẩm");
        value.preventDefault();
      } else {
        e.so_luong -= 1;
      }
    }
    listNew.push(e);
  });
  localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listNew));
  document.querySelectorAll(".item").forEach((e) => e.remove());
  getListLocalstorage().forEach((value) => {
    const template = `<div class="item">
      <div class="item-imgs">
        <img src="${value.src}" alt="" class="item-img"/>
      </div>
      <div class="item-icon">
      <i class="fa-solid fa-cart-plus item-add"></i>
      </div>
      <div class="item-title">${value.name}</div>
      <div class="item-info">
        <div class="item-price">Giá: ${value.gia}</div>
        <div class="item-quality">Số lượng: ${value.so_luong}</div>
      </div>
    </div>`;
    listItem.insertAdjacentHTML("beforeend", template);
  });
}
//-----Random ID using Date()
function randomID() {
  const time = new Date().getTime();
  return time;
}
function uniqueID() {
  let id = 0;
  return function () {
    return ++id;
  };
}
const getUniqueId = uniqueID();

//-----Success function-----
function success() {
  document.querySelector(".success").style.display = "block";
  document.querySelector(".main_confirm").style.display = "none";
  document.querySelector("header").style.display = "none";
  localStorage.setItem(
    keyLocalStorageListSP,
    JSON.stringify(getListLocalstorage())
  );
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify([]));
  arrayItemAdd.splice(0, arrayItemAdd.length);
}
//-----Localstorage-----
const getItemList = function getItemLocalstorage() {
  return JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
};
const getList = function getListLocalstorage() {
  return JSON.parse(localStorage.getItem(keyLocalStorageListSP));
};
function setListLocalstorage(arr) {
  localStorage.setItem(keyLocalStorageListSP, JSON.stringify(arr));
}
function setListItem(arr) {
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(arr));
}
// localStorage.clear();
