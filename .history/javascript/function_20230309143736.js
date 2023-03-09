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
