const MAX = 20;
const listData = [
  {
    id: 1,
    name: "Surface Laptop Go (THH-00035)(i5 1035G1/8GB RAM/128GB SSD/12.4 Cảm ứng/Win 10/Vàng)(Bảo hành tại HACOM)",
    so_luong: 20,
    gia: 100,
    src: "./imgs/lap1.png",
    quality: 1,
  },
  {
    id: 2,
    name: "Laptop Apple Macbook Pro 13 (Z16R0003V) (Apple M2 /8C CPU/10C GPU/16GB/256GB SSD/13.3/Mac OS/Xám)",
    so_luong: 20,
    gia: 500,
    src: "./imgs/lap2.png",
    quality: 1,
  },
  {
    id: 3,
    name: "Laptop Lenovo Thinkpad P14s (21AK006WVA) (i7 1260P/24GB RAM/512GB SSD/14 2.2K/T550 4Gb/Dos/Đen)",
    so_luong: 20,
    gia: 1000,
    src: "./imgs/lap3.png",
    quality: 1,
  },
  {
    id: 4,
    name: "Laptop Lenovo IdeaPad Slim 5 Pro 14AR7H (82SJ0028VN) (R7 6800HS/16GB RAM/512GB SSD/14 2.8K/Win11/Xám)",
    so_luong: 20,
    gia: 1200,
    src: "./imgs/lap4.png",
    quality: 1,
  },
  {
    id: 5,
    name: "Laptop Lenovo IdeaPad Gaming 3 15ARH7 (82SB007HVN) (R7 6800H/8GB RAM/512GB SSD/15.6 FHD/RTX 3050 4GB/Win11/Xám)",
    so_luong: 20,
    gia: 1400,
    src: "./imgs/lap13.png",
    quality: 1,
  },
  {
    id: 6,
    name: "Laptop MSI Gaming GF63 Thin (11UD-473VN) (i5 11400H/8GB RAM/512GBSSD/RTX3050Ti 4G/15.6 inch FHD/Win11)",
    so_luong: 20,
    gia: 1500,
    src: "./imgs/lap6.png",
    quality: 1,
  },
  {
    id: 7,
    name: "Laptop Lenovo IdeaPad 3 14IAU7 (82RJ001BVN) (i5 1235U/8GB RAM/512GB SSD/14 FHD/Win11/Xanh)",
    so_luong: 20,
    gia: 1600,
    src: "./imgs/lap14.png",
    quality: 1,
  },
  {
    id: 8,
    name: "Laptop MSI Gaming Katana GF66 (12UCK-699VN) (i5 12450H 8GB RAM/512GB SSD/RTX3050 4G/15.6 inch FHD 144Hz/Win11/Đen) (2022)",
    so_luong: 20,
    gia: 1700,
    src: "./imgs/lap8.png",
    quality: 1,
  },
  {
    id: 9,
    name: "Laptop MSI Modern 15 (A11M-1024VN) (i5 1155G7/8GB RAM/512GB SSD/15.6 inch FHD/Win10/ Vỏ nhôm/Xám)",
    so_luong: 20,
    gia: 2000,
    src: "./imgs/lap9.png",
    quality: 1,
  },
  {
    id: 10,
    name: "Apple Macbook Air (MLY33SA/A) (Apple M2/8C CPU/8C GPU/8GB RAM/256GB SSD/13.6 inch IPS/Mac OS/Đen) (2022)",
    so_luong: 20,
    gia: 300,
    src: "./imgs/lap10.png",
    quality: 1,
  },
  {
    id: 11,
    name: "Apple Macbook Air 13 (MGN63SA/A) (Apple M1/8GB RAM/256GB SSD/13.3 inch IPS/Mac OS/Xám) (NEW)",
    so_luong: 20,
    gia: 400,
    src: "./imgs/lap11.png",
    quality: 1,
  },
  {
    id: 12,
    name: "Laptop LG Gram 16ZD90Q-G.AX51A5 (i5-1240P/8GB RAM/256GB SSD/16.0 inch WQXGA/Dos/Trắng) (2022)",
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
  if (e.target.matches(".buy_display") || e.target.matches("#back2")) {
    document.querySelector("#order").style.display = "none";
    if (document.querySelector(".main_confirm").style.display == "block") {
      getApi()
        .then((res) => res.json())
        .then((data) => {
          data.forEach((e, i) => {
            if (e.OrderNumber == orderNumber) {
              putApi(orderNumber, false);
            }
          });
        });
    }
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
    totalAll();
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
  if (e.target.matches(".order")) {
    document.querySelectorAll(".order-item").forEach((e) => e.remove());
    document.querySelector(".main_menu").style.display = "none";
    document.querySelector(".main_info").style.display = "none";
    document.querySelector(".main_buy").style.display = "none";
    document.querySelector(".main_confirm").style.display = "none";
    document.querySelector("#order").style.display = "block";
    const arr = [];
    getApi()
      .then((res) => res.json())
      .then((data) => {
        data.forEach((e) => {
          if (e.completed == true) {
            arr.push(e);
          }
        });
        console.log(arr);
        arr.forEach((e) => {
          document.querySelector("#order").insertAdjacentHTML(
            "beforeend",
            `      <div class="order-grid-items">
            <span class="order-grid-item">${e.id}</span
            ><span class="order-grid-item">${e.name}</span
            ><span class="order-grid-item">${e.completed}</span
            ><span class="order-grid-item">${e.total}</span
            ><span class="order-grid-item">${e.date}</span>
            <span class="order-grid-item">...</span>
          </div>`
          );
        });
      });
  }
  if (e.target.matches("#back") || e.target.matches(".home")) {
    document.querySelector("#order").style.display = "none";
    if (document.querySelector(".main_confirm").style.display == "block") {
      getApi()
        .then((res) => res.json())
        .then((data) => {
          data.forEach((e, i) => {
            if (e.OrderNumber == orderNumber) {
              putApi(orderNumber, false);
            }
          });
        });
    }
    document.querySelector(".home").style.color = "red";
    document.querySelector(".carts").style.color = "black";
    document.querySelector(".payment").style.color = "black";
    document.querySelector(".info").textContent = "";
    mainMenu.style.display = "block";
    mainBuy.style.display = "none";
    const back = document.querySelector("#back");
    document.querySelectorAll(".list_buy").forEach((e) => {
      e.remove();
    });
    document.querySelector(".main_confirm").style.display = "none";
    document.querySelectorAll(".confirm_user").forEach((e) => e.remove());
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
      document.querySelector(".title").style.display = "none";
    } else {
      document.querySelector(".img").style.display = "none";
      document.querySelector(".title").style.display = "grid";
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
    document.querySelector(".bill").textContent = totalAll();
  }
  // main_info
  if (e.target.matches("#buy") || e.target.matches(".payment")) {
    document.querySelector("#order").style.display = "none";
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
    if (document.querySelectorAll(".buy-del").length == 0) {
      document.querySelector(".img").style.display = "block";
      document.querySelector(".title").style.display = "none";
    }
    countItem();
    totalAll();
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
    countItem();
    totalPlus(e.target);
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
    totalMinus(e.target);
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
      <span class="item_buy_name">${e.name}</span> <span>${e.price}</span><span>${e.soluong}</span>
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
    document.querySelectorAll(".list_buy").forEach((e) => e.remove());
    document.querySelector(".bill").textContent = "0";
    let arr = [];
    getListLocalstorage().forEach((value) => {
      getItemLocalstorage().forEach((e) => {
        if (e.name == value.name) {
          value.so_luong = Number(e.soluong) + Number(value.so_luong);
        }
      });
      arr.push(value);
    });
    setListLocalstorage(arr);
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
            countItem();
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
