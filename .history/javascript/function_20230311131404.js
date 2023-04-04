//-----Count item-----
function countItem() {
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
function plusItem(name) {
  const list = getItemList();
  const newList = getList();
  list.forEach((e) => {
    if (e.name == name.parentNode.previousElementSibling.textContent) {
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
//-----Random ID using Date()
function randomID() {
  const time = new Date().getTime();
  return time;
}
function mathID() {
  return Math.floor(Math.random() * 3);
}
function styleApiOrder() {
  document.querySelectorAll(".order-gird-items").forEach((e) => {
    e.style.display = "flex";
  });
}
//-----Create order----
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
    const arrId = [];
    getApi().then((data) =>
      data.forEach((value) => arrId.push(value.info.orderNumber))
    );
    const orderUser = {
      orderNumber: mathID(),
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
    if (checkID(orderUser.orderNumber, arrId)) {
      setOrder(orderUser);
      alert("Lưu thông tin thành công");
    } else {
      console.log(arrId);
      createOrder();
    }
  }
}
//----Check uniqueID----
function checkID(value, arr) {
  if (!arr.includes(value)) {
    return true;
  } else {
    return false;
  }
}
//-----Return item buy-----
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
//-----Delete item buy to form-----
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
//-----Add list item buy to local-----
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
//-----Delete data localUser-----
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
//-----Delete info-----
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
}