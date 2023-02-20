const listData = [
  {
    id: 1,
    name: "Quần áo nam",
    so_luong: 20,
    gia: 100,
    src: "./imgs/item1.jpg",
    quality: 1,
  },
  {
    id: 2,
    name: "Điện thoại",
    so_luong: 20,
    gia: 500,
    src: "./imgs/item2.jpeg",
    quality: 1,
  },
  {
    id: 3,
    name: "Macbook",
    so_luong: 20,
    gia: 1000,
    src: "./imgs/item3.jpg",
    quality: 1,
  },
  {
    id: 4,
    name: "Máy ảnh",
    so_luong: 20,
    gia: 1200,
    src: "./imgs/item4.jpg",
    quality: 1,
  },
  {
    id: 5,
    name: "Đồng hồ",
    so_luong: 20,
    gia: 1400,
    src: "./imgs/item5.jpg",
    quality: 1,
  },
  {
    id: 6,
    name: "Giày nam",
    so_luong: 20,
    gia: 1500,
    src: "./imgs/item6.jpg",
    quality: 1,
  },
  {
    id: 7,
    name: "Tủ lạnh",
    so_luong: 20,
    gia: 1600,
    src: "./imgs/item7.jpg",
    quality: 1,
  },
  {
    id: 8,
    name: "Điều hòa",
    so_luong: 20,
    gia: 1700,
    src: "./imgs/item8.jpg",
    quality: 1,
  },
  {
    id: 9,
    name: "Máy giặt",
    so_luong: 20,
    gia: 2000,
    src: "./imgs/item9.jpg",
    quality: 1,
  },
  {
    id: 10,
    name: "Váy đầm nữ",
    so_luong: 20,
    gia: 300,
    src: "./imgs/item10.jpg",
    quality: 1,
  },
  {
    id: 11,
    name: "Mắt kính",
    so_luong: 20,
    gia: 400,
    src: "./imgs/item11.jpg",
    quality: 1,
  },
  {
    id: 12,
    name: "Thắt lưng da",
    so_luong: 20,
    gia: 200,
    src: "./imgs/item12.jpg",
    quality: 1,
  },
];
const keyLocalStorageListSP = "DANHSACHSP";
const keyLocalStorageItemCart = "DANHSACHITEMCART";
const listItem = document.querySelector(".list");
const $ = document.body;
const item = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
let orderNumber = 0;
localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listData));
item.forEach((value) => {
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
const arrayItemAdd = [];
const mainMenu = document.querySelector(".main_menu");
const mainBuy = document.querySelector(".main_buy");
const buyDiplay = document.querySelector(".buy");
const delItem = document.querySelector(".buy-del");
$.addEventListener("click", (e) => {
  //-----Chuyen trang-----
  // main_buy
  if (e.target.matches(".buy_display")) {
    if (document.querySelector(".main_confirm").style.display == "block") {
      document.querySelector(".buy_display").preventDefault();
    }
    document.querySelector(".confirm_item_buy").style.display = "none";
    document.querySelectorAll(".item_buy").forEach((e) => {
      e.remove();
    });
    document.querySelectorAll(".list_buy").forEach((e) => {
      e.remove();
    });
    document.querySelectorAll(".confirm_user").forEach((e) => {
      e.remove();
    });
    const listItem = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
    mainMenu.style.display = "none";
    mainBuy.style.display = "block";
    document.querySelector(".main_confirm").style.display = "none";
    displayItem(listItem);
    total();
    if (getItemLocalstorage().length == 0) {
      document.querySelector(".img").style.display = "block";
      document.querySelector(".title").style.display = "none";
    } else {
      document.querySelector(".img").style.display = "none";
      document.querySelector(".title").style.display = "grid";
    }
  }
  if (e.target.matches("#back") || e.target.matches(".home")) {
    document.querySelector(".info").textContent = "";
    mainMenu.style.display = "block";
    mainBuy.style.display = "none";
    const back = document.querySelector("#back");
    document.querySelectorAll(".list_buy").forEach((e) => {
      e.remove();
    });
    arrayItemAdd.splice(0, arrayItemAdd.length);
    getItemLocalstorage().forEach((e) => arrayItemAdd.push(e));
    // console.log(arrayItemAdd);
    // console.log(getItemLocalstorage());
  }
  if (e.target.matches(".close") || e.target.matches(".cancer")) {
    if (getItemLocalstorage().length == 0) {
      document.querySelector(".img").style.display = "block";
    } else {
      document.querySelector(".img").style.display = "none";
    }
    document.querySelector(".main_info").style.display = "none";
    mainBuy.style.display = "block";
    $.style.backgroundColor = "white";
    document.querySelector("header").style.display = "block";
    document.querySelector(".max_item").textContent = "";
    document.querySelectorAll(".list_buy").forEach((e) => {
      e.remove();
    });
    displayItem(getItemLocalstorage());
  }
  if (e.target.matches("#back2")) {
    countItem();
    putApi(orderNumber, false);
    document.querySelector(".main_info").style.display = "none";
    document.querySelector(".main_confirm").style.display = "none";
    document.querySelector(".main_buy").style.display = "block";
    document.querySelectorAll(".confirm_user").forEach((e) => {
      e.remove();
    });
    document.querySelector(".max_item").textContent = "";
    document.querySelector(".confirm_item_buy").style.display = "none";
    document.querySelectorAll(".item_buy").forEach((e) => {
      e.remove();
    });
    if (document.querySelectorAll(".list_buy").length == 0) {
      document.querySelector(".img").style.display = "block";
      document.querySelector(".title").style.display = "none";
    } else {
      document.querySelector(".title").style.display = "grid";
    }
  }
  // main_info
  if (e.target.matches("#buy") || e.target.matches(".payment")) {
    if (document.querySelector(".img").style.display == "block") {
      alert("Bạn chưa chọn sản phẩm nào!");
      document.querySelector("#buy").preventDefault();
    } else {
      document.querySelector(".info").textContent = "";
      $.style.backgroundColor = "rgba(128, 128, 128, 1)";
      mainBuy.style.display = "none";
      document.querySelector("header").style.display = "none";
      document.querySelector(".main_info").style.display = "block";
      document.querySelectorAll(".form_wrong").forEach((e) => {
        e.textContent = "";
      });
      document.querySelector(".info").textContent = "";
    }
  }
  //-----Add Item-----
  if (e.target.matches(".item-add")) {
    countList(e.target);
    addItem(e.target);
    countItem(e.target);
  }
  //-----Del Item-----
  if (e.target.matches(".buy-del")) {
    const itemDelName =
      e.target.parentNode.previousElementSibling.previousElementSibling
        .previousElementSibling.previousElementSibling;
    delItemBuy(itemDelName);
    total();
    if (document.querySelectorAll(".buy-del").length == 0) {
      document.querySelector(".img").style.display = "block";
      document.querySelector(".title").style.display = "none";
    }
    countItem();
  }
  //-----Increase/Decrease Item----
  if (e.target.matches(".plus-icon")) {
    const listItem = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
    listItem.forEach((value) => {
      if (
        value.name == e.target.parentNode.previousElementSibling.textContent
      ) {
        value.soluong++;
      }
    });
    localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(listItem));
    const listBuy = document.querySelectorAll(".list_buy");
    listBuy.forEach((e) => {
      e.remove();
    });
    displayItem(listItem);
    total();
    countItem();
    console.log(e.target.parentNode.previousElementSibling.textContent);
  }
  if (e.target.matches(".minus-icon")) {
    const listItem = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
    listItem.forEach((value, i) => {
      if (
        value.name == e.target.parentNode.previousElementSibling.textContent
      ) {
        value.soluong--;
        if (value.soluong == 0) {
          listItem.splice(i, 1);
          arrayItemAdd.forEach((e, i) => {
            if (e.name == value.name) {
              arrayItemAdd.splice(i, 1);
            }
          });
        }
      }
    });
    localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(listItem));
    const listBuy = document.querySelectorAll(".list_buy");
    listBuy.forEach((e) => {
      e.remove();
    });
    displayItem(listItem);
    total();
    countItem();
    if (getItemLocalstorage().length == 0) {
      document.querySelector(".img").style.display = "block";
    }
  }

  //-----Show details-----
  if (e.target.matches(".details")) {
    if (document.querySelector(".confirm_item_buy").style.display == "block") {
      e.preventDefault();
    } else {
      document.querySelector(".confirm_item_buy").style.display = "block";
      getItemLocalstorage().forEach((e) => {
        document.querySelector(".confirm_item_buy").insertAdjacentHTML(
          "beforeend",
          `
      <div class="item_buy">
      <span>${e.name}</span> <span>${e.price}</span><span>${e.soluong}</span>
    </div>
      `
        );
      });
    }
  }
  if (e.target.matches(".close_list")) {
    document.querySelector(".confirm_item_buy").style.display = "none";
    document.querySelectorAll(".item_buy").forEach((e) => {
      e.remove();
    });
  }
  //-----Delete order from api
  if (e.target.matches(".return_item")) {
    countItem();
    document.querySelectorAll(".list_buy").forEach((e) => e.remove());
    document.querySelector(".bill").textContent = "0";
    getApi()
      .then((res) => res.json())
      .then((data) => {
        data.forEach((e, i) => {
          if (e.OrderNumber == orderNumber) {
            deleteApi(e.OrderNumber);
            arrayItemAdd.splice(0, arrayItemAdd.length);
            localStorage.setItem(keyLocalStorageItemCart, JSON.stringify([]));
            document.querySelectorAll(".confirm_user").forEach((e) => {
              e.remove();
            });
            document.querySelector(".confirm_item_buy").style.display = "none";
          }
        });
      });
  }
});
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
        ${e.soluong}
        <i class="fa-solid fa-plus plus-icon ${e.name}"></i>
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
//-----Delete item-----
function delItemBuy(name) {
  name.parentNode.remove();
  arrayItemAdd.forEach((e, i) => {
    if (e.name == name.textContent) {
      arrayItemAdd.splice(i, 1);
    }
  });
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(arrayItemAdd));
}
//-----Total Price-----
function total() {
  const list = document.querySelectorAll(".buy-sum");
  let total = 0;
  list.forEach((e) => {
    total += Number(e.textContent);
  });
  document.querySelector(".bill").textContent = total;
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
  // console.log(listNew);
  localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listNew));
  // console.log(getListLocalstorage());
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
//-----Localstorage-----
function getItemLocalstorage() {
  return JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
}
function getListLocalstorage() {
  return JSON.parse(localStorage.getItem(keyLocalStorageListSP));
}
function setListLocalstorage(arr) {
  localStorage.setItem(keyLocalStorageListSP, JSON.stringify(arr));
}
// localStorage.clear();
