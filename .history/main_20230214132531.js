const listData = [
  {
    id: 1,
    name: "Quần áo nam",
    so_luong: 20,
    gia: 100,
    src: "https://znews-photo.zadn.vn/w660/Uploaded/ycgmvjvj/2018_03_31/1.jpg",
    quality: 1,
  },
  {
    id: 2,
    name: "Điện thoại",
    so_luong: 20,
    gia: 500,
    src: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_12.png",
    quality: 1,
  },
  {
    id: 3,
    name: "Macbook",
    so_luong: 20,
    gia: 1000,
    src: "https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gold-600x600.jpg",
    quality: 1,
  },
  {
    id: 4,
    name: "Máy ảnh",
    so_luong: 20,
    gia: 1200,
    src: "https://www.nguyenkim.com/images/detailed/644/10036326-may-anh-canon-eos-3000d-kit-ef-s-18-55mm-den-1.jpg",
    quality: 1,
  },
  {
    id: 5,
    name: "Đồng hồ",
    so_luong: 20,
    gia: 1400,
    src: "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/Apple_Watch_SE-Cell-44mm-star1.jpg",
    quality: 1,
  },
  {
    id: 6,
    name: "Giày nam",
    so_luong: 20,
    gia: 1500,
    src: "https://cdn.elly.vn/uploads/2019/08/13121739/giay-nam-cao-cap-da-that-ELLY-EGTM2-5.jpg",
    quality: 1,
  },
  {
    id: 7,
    name: "Tủ lạnh",
    so_luong: 20,
    gia: 1600,
    src: "https://cdn.tgdd.vn/Products/Images/1943/284851/tu-lanh-aqua-inverter-456-lit-aqr-m525xa-fb-600x600.jpg",
    quality: 1,
  },
  {
    id: 8,
    name: "Điều hòa",
    so_luong: 20,
    gia: 1700,
    src: "https://hangdienmaygiare.com/images/products/2020/02/22/large/dieu-hoa-1-chieu-panasonic-n9wkh-8m_1582358300.jpg",
    quality: 1,
  },
  {
    id: 9,
    name: "Máy giặt",
    so_luong: 20,
    gia: 2000,
    src: "https://hangdienmaygiare.com/images/products/2019/09/03/large/may-giat-electrolux-ewf1042bdwa-10-kg-inverter.jpg",
    quality: 1,
  },
  {
    id: 10,
    name: "Váy đầm nữ",
    so_luong: 20,
    gia: 300,
    src: "https://luzy.vn/wp-content/uploads/2020/05/LZD10951-18.jpg",
    quality: 1,
  },
  {
    id: 11,
    name: "Mắt kính",
    so_luong: 20,
    gia: 400,
    src: "https://vn-test-11.slatic.net/p/5e0af4609b84659f759982ac0146f184.jpg_800x800q100.jpg_600x600Q100.jpg",
    quality: 1,
  },
  {
    id: 12,
    name: "Thắt lưng da",
    so_luong: 20,
    gia: 200,
    src: "https://hoianleather.com/wp-content/uploads/2021/04/That-lung-da-bo-that-danh-cho-nam-2.jpg",
    quality: 1,
  },
];
const keyLocalStorageListSP = "DANHSACHSP";
const keyLocalStorageItemCart = "DANHSACHITEMCART";
const listItem = document.querySelector(".list");
const $ = document.body;
const item = JSON.parse(localStorage.getItem(keyLocalStorageListSP));

localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listData));
item.forEach((value) => {
  const template = `<div class="item">
  <div class="item-imgs">
    <img src="${value.src}" alt="" class="item-img"/>
  </div>
  <div class="item-icon"><i class="fa-solid fa-cart-plus item-add"></i></div>
  <div class="item-title">${value.name}</div>
  <div class="item-info">
    <div class="item-price">Giá: ${value.gia}</div>
    <div class="item-quality">Số lượng: ${value.so_luong}</div>
  </div>
</div>`;
  listItem.insertAdjacentHTML("beforeend", template);
});
const itemAdd = document.querySelectorAll(".item-add");
const arrayItemAdd = [];
const mainMenu = document.querySelector(".main_menu");
const mainBuy = document.querySelector(".main_buy");
const buyDiplay = document.querySelector(".buy");
const delItem = document.querySelector(".buy-del");
$.addEventListener("click", (e) => {
  //-----Chuyen trang-----
  if (e.target.matches(".buy_display")) {
    const listItem = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
    mainMenu.style.display = "none";
    mainBuy.style.display = "block";
    displayItem(listItem);
    total();
  }
  if (e.target.matches("#back")) {
    mainMenu.style.display = "block";
    mainBuy.style.display = "none";
    const back = document.querySelector("#back");
    document.querySelectorAll(".list_buy").forEach((e) => {
      e.remove();
    });
  }
  if (e.target.matches("#buy")) {
    $.style.backgroundColor = "rgba(128, 128, 128, 1)";
    mainBuy.style.display = "none";
    document.querySelector("header").style.display = "none";
    document.querySelector(".main_info").style.display = "block";
    document.querySelectorAll(".form_wrong").forEach((e) => {
      e.textContent = "";
    });
  }
  if (e.target.matches(".close") || e.target.matches(".cancer")) {
    document.querySelector(".main_info").style.display = "none";
    mainBuy.style.display = "block";
    $.style.backgroundColor = "white";
    document.querySelector("header").style.display = "block";
    document.querySelector(".max_item").textContent = "";
  }
  if (e.target.matches("#back2")) {
    document.querySelector(".main_info").style.display = "none";
    document.querySelector(".main_confirm").style.display = "none";
    document.querySelector(".main_buy").style.display = "block";
    document.querySelectorAll(".confirm_user").forEach((e) => {
      e.remove();
    });
    document.querySelector(".confirm_item_buy").style.display = "none";
    document.querySelectorAll(".item_buy").forEach((e) => {
      e.remove();
    });
    if (getItemLocalstorage().length == 0) {
      document.querySelectorAll(".list_buy").forEach((e) => {
        e.remove();
      });
      document.querySelector(".bill").textContent = "0";
    }
  }
  //-----Add Item-----
  if (e.target.matches(".item-add")) {
    addItem(e.target);
  }
  //-----Del Item-----
  if (e.target.matches(".buy-del")) {
    const itemDelName =
      e.target.parentNode.previousElementSibling.previousElementSibling
        .previousElementSibling.previousElementSibling;
    delItemBuy(itemDelName);
    total();
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
    // console.log(listItem);
    localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(listItem));
    const listBuy = document.querySelectorAll(".list_buy");
    listBuy.forEach((e) => {
      e.remove();
    });
    displayItem(listItem);
    total();
  }
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
  if (e.target.matches(".return_item")) {
    localStorage.setItem(keyLocalStorageItemCart, JSON.stringify([]));
    document.querySelectorAll(".confirm_user").forEach((e) => {
      e.remove();
    });
  }
});
// // -----Them san pham-----
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
// //-----Hien thi san pham da mua-----
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
// //-----Xoa san pham-----
function delItemBuy(name) {
  name.parentNode.remove();
  arrayItemAdd.forEach((e, i) => {
    if (e.name == name.textContent) {
      arrayItemAdd.splice(i, 1);
    }
  });
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(arrayItemAdd));
}
function total() {
  const list = document.querySelectorAll(".buy-sum");
  let total = 0;
  list.forEach((e) => {
    total += Number(e.textContent);
  });
  document.querySelector(".bill").textContent = total;
}
function getItemLocalstorage() {
  return JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
}
function getListLocalstorage() {
  return JSON.parse(localStorage.getItem(keyLocalStorageListSP));
}
// localStorage.clear();
