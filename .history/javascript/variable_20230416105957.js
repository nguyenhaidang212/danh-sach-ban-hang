const listData = [
  {
    id: 1,
    name: "Surface Laptop Go (THH-00035)(i5 1035G1/8GB RAM/128GB SSD/12.4 Cảm ứng/Win 10/Vàng)(Bảo hành tại HACOM)",
    countItem: 10,
    gia: 100,
    src: "./imgs/lap1.png",
    countItemBuy: 1,
  },
  {
    id: 2,
    name: "Laptop Apple Macbook Pro 13 (Z16R0003V) (Apple M2 /8C CPU/10C GPU/16GB/256GB SSD/13.3/Mac OS/Xám)",
    countItem: 120,
    gia: 500,
    src: "./imgs/lap2.png",
    countItemBuy: 1,
  },
  {
    id: 3,
    name: "Laptop Lenovo Thinkpad P14s (21AK006WVA) (i7 1260P/24GB RAM/512GB SSD/14 2.2K/T550 4Gb/Dos/Đen)",
    countItem: 120,
    gia: 1000,
    src: "./imgs/lap3.png",
    countItemBuy: 1,
  },
  {
    id: 4,
    name: "Laptop Lenovo IdeaPad Slim 5 Pro 14AR7H (82SJ0028VN) (R7 6800HS/16GB RAM/512GB SSD/14 2.8K/Win11/Xám)",
    countItem: 120,
    gia: 1200,
    src: "./imgs/lap4.png",
    countItemBuy: 1,
  },
  {
    id: 5,
    name: "Laptop Lenovo IdeaPad Gaming 3 15ARH7 (82SB007HVN) (R7 6800H/8GB RAM/512GB SSD/15.6 FHD/RTX 3050 4GB/Win11/Xám)",
    countItem: 120,
    gia: 1400,
    src: "./imgs/lap13.png",
    countItemBuy: 1,
  },
  {
    id: 6,
    name: "Laptop MSI Gaming GF63 Thin (11UD-473VN) (i5 11400H/8GB RAM/512GBSSD/RTX3050Ti 4G/15.6 inch FHD/Win11)",
    countItem: 120,
    gia: 1500,
    src: "./imgs/lap6.png",
    countItemBuy: 1,
  },
  {
    id: 7,
    name: "Laptop Lenovo IdeaPad 3 14IAU7 (82RJ001BVN) (i5 1235U/8GB RAM/512GB SSD/14 FHD/Win11/Xanh)",
    countItem: 120,
    gia: 1600,
    src: "./imgs/lap14.png",
    countItemBuy: 1,
  },
  {
    id: 8,
    name: "Laptop MSI Gaming Katana GF66 (12UCK-699VN) (i5 12450H 8GB RAM/512GB SSD/RTX3050 4G/15.6 inch FHD 144Hz/Win11/Đen) (2022)",
    countItem: 120,
    gia: 1700,
    src: "./imgs/lap8.png",
    countItemBuy: 1,
  },
  {
    id: 9,
    name: "Laptop MSI Modern 15 (A11M-1024VN) (i5 1155G7/8GB RAM/512GB SSD/15.6 inch FHD/Win10/ Vỏ nhôm/Xám)",
    countItem: 120,
    gia: 2000,
    src: "./imgs/lap9.png",
    countItemBuy: 1,
  },
  {
    id: 10,
    name: "Apple Macbook Air (MLY33SA/A) (Apple M2/8C CPU/8C GPU/8GB RAM/256GB SSD/13.6 inch IPS/Mac OS/Đen) (2022)",
    countItem: 120,
    gia: 300,
    src: "./imgs/lap10.png",
    countItemBuy: 1,
  },
  {
    id: 11,
    name: "Apple Macbook Air 13 (MGN63SA/A) (Apple M1/8GB RAM/256GB SSD/13.3 inch IPS/Mac OS/Xám) (NEW)",
    countItem: 120,
    gia: 400,
    src: "./imgs/lap11.png",
    countItemBuy: 1,
  },
  {
    id: 12,
    name: "Laptop LG Gram 16ZD90Q-G.AX51A5 (i5-1240P/8GB RAM/256GB SSD/16.0 inch WQXGA/Dos/Trắng) (2022)",
    countItem: 120,
    gia: 200,
    src: "./imgs/lap12.png",
    countItemBuy: 1,
  },
];
const keyLocalStorageListSP = "DANHSACHSP";
const keyLocalStorageItemCart = "DANHSACHITEMCART";
const item = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
const userOrder = "Donhang";
const $ = document.body;
const listItem = document.querySelector(".list");
let orderNumber = 0;
const arrayItemAdd = [];
const buyDiplay = document.querySelector(".buy");
const delItem = document.querySelector(".buy-del");
const arrList = [];

const optionCity = document.querySelector(".option-city");
const btnConfirm = document.querySelector(".btn-confirm");
const input = document.querySelectorAll("input");
const formSelect = document.querySelectorAll(".form-select");
const arrayCity = [];
const arrayDistric = [];
const arrayWard = [];
const date = new Date();
