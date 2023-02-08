const listData = [
  {
    id: 1,
    name: "quan ao nam",
    so_luong: 100,
    gia: 100,
  },
  {
    id: 2,
    name: "dien thoai va phu kien",
    so_luong: 200,
    gia: 500,
  },
  {
    id: 3,
    name: "thiet bi dien tu",
    so_luong: 300,
    gia: 1000,
  },
  {
    id: 4,
    name: "may anh va may quay",
    so_luong: 400,
    gia: 1200,
  },
  {
    id: 5,
    name: "dong ho",
    so_luong: 500,
    gia: 1400,
  },
  {
    id: 6,
    name: "giay dep",
    so_luong: 600,
    gia: 1500,
  },
  {
    id: 7,
    name: "thiet bi gia dung",
    so_luong: 700,
    gia: 1600,
  },
  {
    id: 8,
    name: "the thao va du lich",
    so_luong: 800,
    gia: 1700,
  },
  {
    id: 9,
    name: "phuong tien",
    so_luong: 1000,
    gia: 2000,
  },
  {
    id: 10,
    name: "thoi trang nu",
    so_luong: 2000,
    gia: 300,
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
  console.log(value.name);
});
