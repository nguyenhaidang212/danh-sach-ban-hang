const listData = [
  {
    id: 1,
    name: "quan ao nam",
    so_luong: 100,
    gia: 100,
    src: "https://znews-photo.zadn.vn/w660/Uploaded/ycgmvjvj/2018_03_31/1.jpg",
  },
  {
    id: 2,
    name: "dien thoai va phu kien",
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
    name: "Tủ lạnh Aqua Inverter 456 lít",
    so_luong: 700,
    gia: 1600,
    src: "https://cdn.tgdd.vn/Products/Images/1943/284851/tu-lanh-aqua-inverter-456-lit-aqr-m525xa-fb-600x600.jpg",
  },
  {
    id: 8,
    name: "Điều hòa Panasonic N9WKH-8M 9000Btu 1 chiều",
    so_luong: 800,
    gia: 1700,
    src: "https://hangdienmaygiare.com/images/products/2020/02/22/large/dieu-hoa-1-chieu-panasonic-n9wkh-8m_1582358300.jpg",
  },
  {
    id: 9,
    name: "Máy giặt Electrolux EWF1042BDWA 10 Kg Inverter",
    so_luong: 1000,
    gia: 2000,
    src: "https://hangdienmaygiare.com/images/products/2019/09/03/large/may-giat-electrolux-ewf1042bdwa-10-kg-inverter.jpg",
  },
  {
    id: 10,
    name: "Váy đầm nữ hè công sở eo cao trẻ trung thanh lịch",
    so_luong: 2000,
    gia: 300,
    src: "https://luzy.vn/wp-content/uploads/2020/05/LZD10951-18.jpg",
  },
];
const keyLocalStorageListSP = "DANHSACHSP";
const keyLocalStorageItemCart = "DANHSACHITEMCART";
const nameList = document.querySelector(".list-name");
const idList = document.querySelector(".list-id");
const countList = document.querySelector(".list-count");
const priceList = document.querySelector(".list-price");

localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listData));
const item = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
item.forEach((value, index, array) => {
  const template = `
    <span>${value.id}</span>
    <span>${value.name}</span>
    <span>${value.so_luong}</span>
    <span>${value.gia}</span>`;
  document.querySelector(".form").insertAdjacentHTML("beforeend", template);
});
