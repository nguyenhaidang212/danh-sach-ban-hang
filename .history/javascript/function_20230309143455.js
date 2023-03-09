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
      getItemList().forEach((item) => {
        if (item.name == e.parentNode.previousElementSibling.textContent) {
          if (item.so_luong == 0) {
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
  getItemList().forEach((e) => {
    count += e.so_luong_mua;
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

function styleApiOrder() {
  document.querySelectorAll(".order-gird-items").forEach((e) => {
    e.style.display = "flex";
  });
}
function createOrder() {
  let cityName, districtName, wardName;
  arrayCity.forEach((e) => {
    if (e.code == selectCity.value) {
      cityName = e.name;
    }
  });
  arrayDistric.forEach((e) => {
    if (e.code == selectDistrict.value) {
      districtName = e.name;
    }
  });
  arrayWard.forEach((e) => {
    if (e.code == selectWard.value) {
      wardName = e.name;
    }
  });
  if (
    email != false &&
    sodienthoai != false &&
    cityName != undefined &&
    districtName != undefined &&
    wardName != undefined &&
    ho != undefined &&
    ten != undefined
  ) {
    const orderUser = {
      orderNumber: new Date().getTime(),
      date:
        date.getFullYear() +
        "/" +
        Number(date.getMonth() + 1) +
        "/" +
        date.getDate(),
      username: ho + " " + ten,
      email: email,
      sodienthoai: sodienthoai,
      address:
        document.querySelector(".form_home").value +
        " " +
        cityName +
        " " +
        districtName +
        " " +
        wardName,
      message: document.querySelector("textarea").value,
    };
    setOrder(orderUser);
    alert("Lưu thông tin thành công");
  }
}
function returnItem() {
  document.querySelectorAll(".confirm_order").forEach((e) => e.remove());
  const listItem = getItemList();
  const list = getList();
  list.forEach((e) => {
    listItem.forEach((value) => {
      if (value.name == e.name) {
        e.so_luong = e.so_luong + value.so_luong_mua;
        e.so_luong_mua = e.so_luong_mua - value.so_luong_mua;
      }
    });
  });
  setListLocalstorage(list);
  setListItem([]);
  totalAll();
  countItem();
}
function validateForm() {
  if (formUser.value == "") {
    document.querySelector(".wrong1").textContent =
      "Bạn cần nhập thông tin ở trên";
  }
  if (ten == "") {
    document.querySelector(".wrong2").textContent =
      "Bạn cần nhập thông tin ở trên";
  }
  if (email == "") {
    document.querySelector(".wrong3").textContent =
      "Bạn cần nhập thông tin ở trên";
  }
  if (sodienthoai == "" || sodienthoai.length != 10) {
    document.querySelector(".wrong4").textContent =
      "Bạn cần nhập thông tin ở trên";
  }
  if (
    selectCity.value == "" ||
    selectDistrict.value == "--Chọn Huyện/Quận--" ||
    selectWard.value == "--Chọn Xã--"
  ) {
    document.querySelector(".wrong5").textContent =
      "Bạn cần nhập thông tin ở trên";
  }
}
function minusItem(name, value) {
  const list = getItemList();
  const newList = getList();
  list.forEach((e, index) => {
    if (e.name == name) {
      e.so_luong_mua--;
      e.so_luong++;
      newList.forEach((item) => {
        if (item.name == e.name) {
          item.so_luong++;
          item.so_luong_mua--;
        }
      });
      if (e.so_luong_mua == 0) {
        list.splice(index, 1);
        value.remove();
      }
    }
  });
  setListLocalstorage(newList);
  setListItem(list);
  displayItem(list);
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
function displayHide(value, color) {
  document.querySelectorAll(".none").forEach((e) => (e.style.color = "black"));
  color.style.color = "red";
  mainMenu.style.display = "none";
  mainBuy.style.display = "none";
  mainInfo.style.display = "none";
  mainPayment.style.display = "none";
  mainOrder.style.display = "none";
  document.querySelector(".success").style.display = "none";
  value.style.display = "block";
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
function formWrong() {
  document.querySelectorAll(".form_wrong").forEach((e) => {
    e.textContent = "";
  });
}
