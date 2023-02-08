const listData = [
  {
    id: 1,
    name: "Quần áo nam",
    so_luong: 100,
    gia: 100,
    src: "https://znews-photo.zadn.vn/w660/Uploaded/ycgmvjvj/2018_03_31/1.jpg",
  },
  {
    id: 2,
    name: "Điện thoại",
    so_luong: 200,
    gia: 500,
    src: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_12.png",
  },
  {
    id: 3,
    name: "Macbook",
    so_luong: 300,
    gia: 1000,
    src: "https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gold-600x600.jpg",
  },
  {
    id: 4,
    name: "Máy ảnh",
    so_luong: 400,
    gia: 1200,
    src: "https://www.nguyenkim.com/images/detailed/644/10036326-may-anh-canon-eos-3000d-kit-ef-s-18-55mm-den-1.jpg",
  },
  {
    id: 5,
    name: "Đồng hồ",
    so_luong: 500,
    gia: 1400,
    src: "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/Apple_Watch_SE-Cell-44mm-star1.jpg",
  },
  {
    id: 6,
    name: "Giày nam",
    so_luong: 600,
    gia: 1500,
    src: "https://cdn.elly.vn/uploads/2019/08/13121739/giay-nam-cao-cap-da-that-ELLY-EGTM2-5.jpg",
  },
  {
    id: 7,
    name: "Tủ lạnh",
    so_luong: 700,
    gia: 1600,
    src: "https://cdn.tgdd.vn/Products/Images/1943/284851/tu-lanh-aqua-inverter-456-lit-aqr-m525xa-fb-600x600.jpg",
  },
  {
    id: 8,
    name: "Điều hòa",
    so_luong: 800,
    gia: 1700,
    src: "https://hangdienmaygiare.com/images/products/2020/02/22/large/dieu-hoa-1-chieu-panasonic-n9wkh-8m_1582358300.jpg",
  },
  {
    id: 9,
    name: "Máy giặt",
    so_luong: 1000,
    gia: 2000,
    src: "https://hangdienmaygiare.com/images/products/2019/09/03/large/may-giat-electrolux-ewf1042bdwa-10-kg-inverter.jpg",
  },
  {
    id: 10,
    name: "Váy đầm nữ",
    so_luong: 2000,
    gia: 300,
    src: "https://luzy.vn/wp-content/uploads/2020/05/LZD10951-18.jpg",
  },
  {
    id: 11,
    name: "Mắt kính",
    so_luong: 2100,
    gia: 400,
    src: "https://vn-test-11.slatic.net/p/5e0af4609b84659f759982ac0146f184.jpg_800x800q100.jpg_600x600Q100.jpg",
  },
  {
    id: 12,
    name: "Thắt lưng da",
    so_luong: 200,
    gia: 200,
    src: "https://hoianleather.com/wp-content/uploads/2021/04/That-lung-da-bo-that-danh-cho-nam-2.jpg",
  },
];
const keyLocalStorageListSP = "DANHSACHSP";
const keyLocalStorageItemCart = "DANHSACHITEMCART";
let arrItemBuy = [];
const listItem = document.querySelector(".list");
const nameList = document.querySelector(".item-title");
// const idList = document.querySelector(".item-id");
const countList = document.querySelector(".item-quality");
const priceList = document.querySelector(".item-price");

localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listData));
const item = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
item.forEach((value, index, array) => {
  const template = `        <div class="item">
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

//Them san pham
const addItemIcon = document.querySelectorAll(".item-add");
addItemIcon.forEach((value, index) => {
  value.addEventListener("click", (e) => {
    const itemAdd = value.parentNode.nextElementSibling.textContent;
    item.forEach((value) => {
      if (itemAdd == value.name) {
        arrItemBuy.push(value);
      }
    });
    localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(arrItemBuy));
    const itemBuy = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
    console.log(itemBuy);
  });
});

//Trang thanh toan
const buyDisplay = document.querySelector(".buy_display");
const main = document.querySelector("main");
const mainMenu = document.querySelector(".main_menu");
const mainBuy = document.querySelector(".main_buy");
const back = document.getElementById("back");
const buy = document.querySelector(".buy");

// buyDisplay.addEventListener("click", (e) => {
//   // main.removeChild(".list");

//   mainMenu.style.display = "none";
//   mainBuy.style.display = "block";

itemBuy.forEach((value) => {
  const templateBuy = `<div class="list_buy">
    <div class="buy-name">${value.name}</div>
    <div class="buy-quality"></div>
    <div class="buy-price">${value.gia}</div>
    <div class="buy-sum">100</div>
    <div><i class="fa-solid fa-circle-xmark buy-del"></i></div>
    </div>`;
  buy.insertAdjacentHTML("beforebegin", templateBuy);
});
// });
back.addEventListener("click", (e) => {
  mainMenu.style.display = "block";
  mainBuy.style.display = "none";
});
