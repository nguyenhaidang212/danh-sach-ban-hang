const MAX = 20;
const listData = [
  {
    id: 1,
    name: "Surface Laptop Go",
    so_luong: 20,
    gia: 100,
    src: "./imgs/lap1.png",
    quality: 1,
  },
  {
    id: 2,
    name: "Apple Macbook Pro 13",
    so_luong: 20,
    gia: 500,
    src: "./imgs/lap2.png",
    quality: 1,
  },
  {
    id: 3,
    name: "Lenovo Thinkpad P14s",
    so_luong: 20,
    gia: 1000,
    src: "./imgs/lap3.png",
    quality: 1,
  },
  {
    id: 4,
    name: "HP Pavilion 14-dv2073TU",
    so_luong: 20,
    gia: 1200,
    src: "./imgs/lap4.png",
    quality: 1,
  },
  {
    id: 5,
    name: "MSI Gaming GF63 Thin",
    so_luong: 20,
    gia: 1400,
    src: "./imgs/lap5.png",
    quality: 1,
  },
  {
    id: 6,
    name: "MSI Modern 15",
    so_luong: 20,
    gia: 1500,
    src: "./imgs/lap6.png",
    quality: 1,
  },
  {
    id: 7,
    name: "MSI Gaming Katana GF66",
    so_luong: 20,
    gia: 1600,
    src: "./imgs/lap7.png",
    quality: 1,
  },
  {
    id: 8,
    name: "Lenovo IdeaPad Gaming 3",
    so_luong: 20,
    gia: 1700,
    src: "./imgs/lap8.png",
    quality: 1,
  },
  {
    id: 9,
    name: "Macbook Air",
    so_luong: 20,
    gia: 2000,
    src: "./imgs/lap9.png",
    quality: 1,
  },
  {
    id: 10,
    name: "Macbook Air 13",
    so_luong: 20,
    gia: 300,
    src: "./imgs/lap10.png",
    quality: 1,
  },
  {
    id: 11,
    name: "Lenovo IdeaPad Slim 5 Pro",
    so_luong: 20,
    gia: 400,
    src: "./imgs/lap11.png",
    quality: 1,
  },
  {
    id: 12,
    name: "Lenovo Thinkpad E15 G4",
    so_luong: 20,
    gia: 200,
    src: "./imgs/lap12.png",
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
    document.querySelector(".home").style.color = "black";
    document.querySelector(".carts").style.color = "red";
    document.querySelector(".payment").style.color = "black";
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
    document.querySelectorAll(".buy-name").forEach((e) => {
      getListLocalstorage().forEach((value) => {
        if (e.textContent == value.name) {
          if (value.so_luong == 0) {
            document.querySelectorAll(".plus-icon").forEach((e) => {
              if (
                e.parentNode.previousElementSibling.textContent == value.name
              ) {
                e.remove();
              }
            });
          }
        }
      });
    });
  }
  if (e.target.matches("#back") || e.target.matches(".home")) {
    document.querySelector(".home").style.color = "red";
    document.querySelector(".carts").style.color = "black";
    document.querySelector(".info").textContent = "";
    mainMenu.style.display = "block";
    mainBuy.style.display = "none";
    const back = document.querySelector("#back");
    document.querySelectorAll(".list_buy").forEach((e) => {
      e.remove();
    });
    arrayItemAdd.splice(0, arrayItemAdd.length);
    getItemLocalstorage().forEach((e) => arrayItemAdd.push(e));
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
  if (e.target.matches(".close") || e.target.matches(".cancer")) {
    document.querySelector(".home").style.color = "black";
    document.querySelector(".carts").style.color = "red";
    document.querySelector(".payment").style.color = "black";
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
    document.querySelector(".home").style.color = "black";
    document.querySelector(".carts").style.color = "red";
    document.querySelector(".payment").style.color = "black";
  }
  // main_info
  if (e.target.matches("#buy") || e.target.matches(".payment")) {
    if (false) {
      alert("Bạn chưa chọn sản phẩm nào");
    } else {
      document.querySelector(".info").textContent = "";
      $.style.backgroundColor = "rgba(128, 128, 128, 1)";
      mainBuy.style.display = "none";
      document.querySelector("header").style.display = "none";
      document.querySelector(".main_info").style.display = "block";
      document.querySelector(".main_menu").style.display = "none";
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
    let newList = [];
    getListLocalstorage().forEach((value) => {
      if (
        value.name ==
        e.target.parentNode.previousElementSibling.previousElementSibling
          .previousElementSibling.previousElementSibling.textContent
      ) {
        value.so_luong =
          value.so_luong +
          Number(
            e.target.parentNode.previousElementSibling.previousElementSibling
              .previousElementSibling.textContent
          );
      }
      newList.push(value);
    });
    localStorage.setItem(keyLocalStorageListSP, JSON.stringify(newList));
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
    let listNew = [];
    getListLocalstorage().forEach((value) => {
      if (
        value.name == e.target.parentNode.previousElementSibling.textContent
      ) {
        value.so_luong--;
        if (value.so_luong == 0) {
          console.log(e.target);
          e.target.style.display = "none";
        }
      }
      listNew.push(value);
    });
    localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listNew));
    localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(listItem));
    e.target.previousElementSibling.textContent =
      Number(e.target.previousElementSibling.textContent) + 1;
    total();
    countItem();
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
    e.target.nextElementSibling.textContent =
      Number(e.target.nextElementSibling.textContent) - 1;
    if (e.target.nextElementSibling.textContent == 0) {
      e.target.parentNode.parentNode.remove();
    }
    let newList = [];
    getListLocalstorage().forEach((value) => {
      if (
        value.name == e.target.parentNode.previousElementSibling.textContent
      ) {
        value.so_luong++;
      }
      newList.push(value);
    });
    localStorage.setItem(keyLocalStorageListSP, JSON.stringify(newList));
    total();
    countItem();
    if (getItemLocalstorage().length == 0) {
      document.querySelector(".img").style.display = "block";
      document.querySelector(".title").style.display = "none";
    }
    if (e.target.nextElementSibling.textContent < 20) {
      e.target.nextElementSibling.nextElementSibling.style.display = "block";
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
