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
  arr.forEach((e) => {
    item.forEach((value) => {
      if (value.id == e.id) {
        const price = Number(e.price) * Number(e.soluong);
        buyDiplay.insertAdjacentHTML(
          "beforebegin",
          `<div class="list_buy">
          <div class="buy-name">${value.name}</div>
          <div class="buy-quality">
          <i class="fa-solid fa-minus minus-icon"></i>
          <span>${e.soluong}</span>
          <i class="fa-solid fa-plus plus-icon"></i>
          </div>
          <div class="buy-price">${value.gia}</div>
          <div class="buy-sum">${price}</div>
          <div><i class="fa-solid fa-circle-xmark buy-del"></i></div>
        </div>`
        );
      }
    });
  });
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
  });
  totalAll();

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
  getItemLocalstorage().forEach((e) => {
    total += Number(e.price) * Number(e.soluong);
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
function getItemLocalstorage() {
  return JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
}
function getListLocalstorage() {
  return JSON.parse(localStorage.getItem(keyLocalStorageListSP));
}

function plusItem(name) {
  const list = getItemList();
  const newList = getList();
  list.forEach((e) => {
    if (e.name == name) {
      e.so_luong_mua++;
      e.so_luong--;
      newList.forEach((item) => {
        if (item.name == e.name) {
          item.so_luong--;
          item.so_luong_mua++;
        }
      });
    }
  });
  setListLocalstorage(newList);
  setListItem(list);
  displayItem(list);
}
function delItemBuy(name, value) {
  value.remove();
  const newList = getItemList();
  const list = getList();
  newList.forEach((e, index) => {
    if (e.name == name) {
      list.forEach((value) => {
        if (value.name == e.name) {
          value.so_luong += e.so_luong_mua;
        }
      });
      setListLocalstorage(list);
      newList.splice(index, 1);
      setListItem(newList);
    }
  });
  if (getItemList().length == 0) {
    document.querySelector(".img").style.display = "block";
    document.querySelector("#main_buy").style.display = "none";
  }
}
function getItemBuy(name) {
  const newList = [];
  const itemList = getItemList();
  getList().forEach((e) => {
    if (e.name == name) {
      if (e.so_luong == 0) {
        value.preventDefault();
      }
      e.so_luong--;
      e.so_luong_mua++;
      itemList.forEach((item, index) => {
        if (item.name == e.name) {
          itemList.splice(index, 1);
        }
      });
      itemList.push(e);
    }
    newList.push(e);
  });
  setListItem(itemList);
  setListLocalstorage(newList);
  listItemRender(newList);
}
function deleteData() {
  setOrder([]);
  setListItem([]);
  const list = getList();
  list.forEach((e) => {
    e.so_luong_mua = 0;
  });
  setListLocalstorage(list);
  deleteInfo();
}
function deleteInfo() {
  document.querySelectorAll(".form-control").forEach((e) => (e.value = ""));
  document.querySelector("textarea").value = "";
  document.querySelectorAll(".city-choose").forEach((e) => e.remove());
  document.querySelectorAll(".district").forEach((e) => e.remove());
  document.querySelectorAll(".ward").forEach((e) => e.remove());
  arrayCity.forEach((e) => {
    selectCity.insertAdjacentHTML(
      "afterbegin",
      `
    <option class="city-choose" select value="${e.code}">${e.name}</option>`
    );
  });
}
function check(value) {
  const list = getItemList();
  list.forEach((e) => {
    if (e.name == value.parentNode.previousElementSibling.textContent) {
      if (e.so_luong == 0) {
        console.log(1);
        value.style.display = "none";
      }
    }
  });
}
function formWrong() {
  document.querySelectorAll(".form_wrong").forEach((e) => {
    e.textContent = "";
  });
}
//-----Choose district-----
function districChoose() {
  const district = document.querySelectorAll(".district");
  district.forEach((e) => {
    e.remove();
  });
  arrayDistric.forEach((e) => {
    if (e.province_code == selectCity.value) {
      selectDistrict.insertAdjacentHTML(
        "afterbegin",
        `
          <option select value="${e.code}" class="district">${e.name}</option>
          `
      );
    }
  });
}
//-----Choose ward-----
function wardChoose() {
  const ward = document.querySelectorAll(".ward");
  ward.forEach((e) => {
    e.remove();
  });
  arrayWard.forEach((e) => {
    if (e.district_code == selectDistrict.value) {
      selectWard.insertAdjacentHTML(
        "afterbegin",
        `
        <option select value="${e.code}" class="ward">${e.name}</option>
        `
      );
    }
  });

function setListLocalstorage(arr) {
  localStorage.setItem(keyLocalStorageListSP, JSON.stringify(arr));
}


