const listData = [
  {
    id: 1,
    name: "Quần áo nam",
    so_luong: 100,
    gia: 100,
    src: "https://znews-photo.zadn.vn/w660/Uploaded/ycgmvjvj/2018_03_31/1.jpg",
    quality: 0,
  },
  {
    id: 2,
    name: "Điện thoại",
    so_luong: 200,
    gia: 500,
    src: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_12.png",
    quality: 0,
  },
  {
    id: 3,
    name: "Macbook",
    so_luong: 300,
    gia: 1000,
    src: "https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gold-600x600.jpg",
    quality: 0,
  },
  {
    id: 4,
    name: "Máy ảnh",
    so_luong: 400,
    gia: 1200,
    src: "https://www.nguyenkim.com/images/detailed/644/10036326-may-anh-canon-eos-3000d-kit-ef-s-18-55mm-den-1.jpg",
    quality: 0,
  },
  {
    id: 5,
    name: "Đồng hồ",
    so_luong: 500,
    gia: 1400,
    src: "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/Apple_Watch_SE-Cell-44mm-star1.jpg",
    quality: 0,
  },
  {
    id: 6,
    name: "Giày nam",
    so_luong: 600,
    gia: 1500,
    src: "https://cdn.elly.vn/uploads/2019/08/13121739/giay-nam-cao-cap-da-that-ELLY-EGTM2-5.jpg",
    quality: 0,
  },
  {
    id: 7,
    name: "Tủ lạnh",
    so_luong: 700,
    gia: 1600,
    src: "https://cdn.tgdd.vn/Products/Images/1943/284851/tu-lanh-aqua-inverter-456-lit-aqr-m525xa-fb-600x600.jpg",
    quality: 0,
  },
  {
    id: 8,
    name: "Điều hòa",
    so_luong: 800,
    gia: 1700,
    src: "https://hangdienmaygiare.com/images/products/2020/02/22/large/dieu-hoa-1-chieu-panasonic-n9wkh-8m_1582358300.jpg",
    quality: 0,
  },
  {
    id: 9,
    name: "Máy giặt",
    so_luong: 1000,
    gia: 2000,
    src: "https://hangdienmaygiare.com/images/products/2019/09/03/large/may-giat-electrolux-ewf1042bdwa-10-kg-inverter.jpg",
    quality: 0,
  },
  {
    id: 10,
    name: "Váy đầm nữ",
    so_luong: 2000,
    gia: 300,
    src: "https://luzy.vn/wp-content/uploads/2020/05/LZD10951-18.jpg",
    quality: 0,
  },
  {
    id: 11,
    name: "Mắt kính",
    so_luong: 2100,
    gia: 400,
    src: "https://vn-test-11.slatic.net/p/5e0af4609b84659f759982ac0146f184.jpg_800x800q100.jpg_600x600Q100.jpg",
    quality: 0,
  },
  {
    id: 12,
    name: "Thắt lưng da",
    so_luong: 200,
    gia: 200,
    src: "https://hoianleather.com/wp-content/uploads/2021/04/That-lung-da-bo-that-danh-cho-nam-2.jpg",
    quality: 0,
  },
];
const keyLocalStorageListSP = "DANHSACHSP";
const keyLocalStorageItemCart = "DANHSACHITEMCART";
const listItem = document.querySelector(".list");
const $ = document.body;

localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listData));
const item = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
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
    mainMenu.style.display = "none";
    mainBuy.style.display = "block";
  }
  if (e.target.matches("#back")) {
    mainMenu.style.display = "block";
    mainBuy.style.display = "none";
  }

  //-----Add Item-----
  if (e.target.matches(".item-add")) {
    addItem(e.target);
  }

  if (e.target.matches(".buy_display")) {
    displayItem();
  }

  //-----Del Item-----
  if (e.target.matches(".buy-del")) {
    const itemDelName =
      e.target.parentNode.previousElementSibling.previousElementSibling
        .previousElementSibling.previousElementSibling.textContent;
    e.target.parentNode.parentNode.remove();
    delItemBuy(itemDelName);
    addItemLocalStorage(arrayItemAdd);
  }

  //------Tang giam------
  if (e.target.matches(".plus-icon")) {
    plusItem(e.target);
    displayItem();
  }
  if (e.target.matches(".minus-icon")) {
    minusItem(e.target);
    displayItem();
  }
});

//-----Them localstorage-----
function addItemLocalStorage(array) {
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(array));
}

// -----Them san pham-----
function addItem(value) {
  const iconBuy = value.parentNode.nextElementSibling;
  item.forEach((e) => {
    if (e.name == iconBuy.textContent) {
      if (arrayItemAdd.length == 0) {
        arrayItemAdd.push(e);
      }
      arrayItemAdd.forEach((e, i) => {
        if (e.name == iconBuy.textContent) {
          e.quality++;
          console.log(e.quality);
          arrayItemAdd.splice(i, 1);
        }
      });
      arrayItemAdd.push(e);
    }
  });
  addItemLocalStorage(arrayItemAdd);
}

//-----Hien thi san pham da mua-----
function displayItem() {
  arrayItemAdd.forEach((e) => {
    buyDiplay.insertAdjacentHTML(
      "beforebegin",
      `<div class="list_buy">
      <div class="buy-name">${e.name}</div>
      <div class="buy-quality">
      <i class="fa-solid fa-minus minus-icon"></i>
      <span>
      ${e.quality}
      </span>
      <i class="fa-solid fa-plus plus-icon"></i>
      </div>
      <div class="buy-price">${e.gia}</div>
      <div class="buy-sum">${e.id}</div>
      <div><i class="fa-solid fa-circle-xmark buy-del"></i></div>
    </div>`
    );
  });
}

//-----Xoa san pham-----
function delItemBuy(name) {
  arrayItemAdd.forEach((e, i) => {
    if (e.name == name) {
      arrayItemAdd.splice(i, 1);
    }
  });
}

//----Tang giam-----
function plusItem(value) {
  arrayItemAdd.forEach((e) => {
    if (e.name == value.parentNode.previousElementSibling.textContent) {
      value.parentNode.previousElementSibling.parentNode.remove();
      e.quality++;
    }
  });
}
function minusItem(value) {
  arrayItemAdd.forEach((e, i) => {
    if (e.name == value.parentNode.previousElementSibling.textContent) {
      value.parentNode.previousElementSibling.parentNode.remove();
      if (e.quality == 1) {
        arrayItemAdd.splice(i, 1);
      }
      e.quality--;
    }
  });
}
// localStorage.clear();
