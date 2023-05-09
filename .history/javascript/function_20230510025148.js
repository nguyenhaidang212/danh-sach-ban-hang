//-----Count item-----
// function countItem() {
//   let count = 0;
//   getItemList().forEach((e) => {
//     count += e.countItemBuy;
//   });
//   document.querySelector(".buy_count").textContent = count;
//   if (count == 0) {
//     document.querySelector(".buy_count").style.display = "none";
//   } else {
//     document.querySelector(".buy_count").style.display = "block";
//   }
// }
// function totalAll() {
//   let total = 0;
//   getItemList().forEach((e) => {
//     total += Number(e.gia) * Number(e.countItemBuy);
//   });
//   document.querySelector(".bill").textContent = total;
//   return total;
// }
// function minusItem(name, value) {
//   const list = getItemList();
//   list.forEach((e, index) => {
//     if (e.name == name) {
//       e.countItemBuy--;
//       if (e.countItemBuy == 0) {
//         if (confirm("Bạn muốn trả lại đơn hàng này?") == true) {
//           list.splice(index, 1);
//           value.remove();
//         } else e.countItemBuy++;
//       }
//     }
//   });
//   setListItem(list);
//   displayItem(list);
//   if (list.length == 0) {
//     document.querySelector(".img").style.display = "block";
//     document.querySelector("#main_buy").style.display = "none";
//   }
// }
// function plusItem(name) {
//   const list = getItemList();
//   const newList = getList();
//   list.forEach((e) => {
//     if (e.name == name.parentNode.previousElementSibling.textContent) {
//       newList.forEach((item) => {
//         if (item.name == e.name) {
//           if (e.countItemBuy == item.countItem) {
//             alert("Bạn đã chọn tối đa số lượng sản phẩm");
//           } else {
//             e.countItemBuy++;
//           }
//         }
//       });
//     }
//   });
//   setListLocalstorage(newList);
//   setListItem(list);
//   displayItem(list);
// }
//-----Tạo đơn hàng----
// function createOrder() {
//   let cityName, districtName, wardName;
//   arrayCity.forEach((e) => {
//     if (e.code == selectCity.value) {
//       cityName = e.name;
//     }
//   });
//   arrayDistric.forEach((e) => {
//     if (e.code == selectDistrict.value) {
//       districtName = e.name;
//     }
//   });
//   arrayWard.forEach((e) => {
//     if (e.code == selectWard.value) {
//       wardName = e.name;
//     }
//   });
//   if (
//     email != false &&
//     sodienthoai != false &&
//     cityName != undefined &&
//     districtName != undefined &&
//     wardName != undefined &&
//     ho != false &&
//     ten != false
//   ) {
//     const arrId = [];
//     getApi().then((data) =>
//       data.forEach((value) => arrId.push(value.info.orderNumber))
//     );
//     const orderUser = {
//       orderNumber: Math.floor(Math.random() * 100000),
//       date:
//         date.getFullYear() +
//         "/" +
//         Number(date.getMonth() + 1) +
//         "/" +
//         date.getDate(),
//       username: ho + " " + ten,
//       email: email,
//       sodienthoai: sodienthoai,
//       address:
//         document.querySelector(".form_home").value +
//         " " +
//         cityName +
//         " " +
//         districtName +
//         " " +
//         wardName,
//       message: document.querySelector("textarea").value,
//     };
//     setOrder(orderUser);
//     document.querySelector(".order_success").style.display = "block";
//     document.querySelector(".orders_content").style.display = "block";
//     document.querySelector(".img_order").style.display = "none";
//     document.querySelector(".overlay").style.display = "none";
//     mainInfo.style.display = "none";
//     mainMenu.style.display = "none";
//     mainBuy.style.display = "none";
//     document
//       .querySelectorAll(".none")
//       .forEach((e) => (e.style.color = "black"));
//     // Gửi đơn hàng lên API
//     const item = getItemList();
//     const info = getOrder();
//     const create = {
//       info,
//       item,
//       total: totalAll(),
//     };
//     postApi(create);
//     getApi().then((data) => {
//       apiOrders.splice(0, apiOrders.length);
//       data.forEach((e) => apiOrders.push(e));
//     });
//     deleteData();
//     totalAll();
//     countItem();
//   }
// }
//-----UniqueID function-----
// function checkID() {
//   const order = getOrder();
//   if (arrayID.includes(order.orderNumber)) {
//     order.orderNumber = Math.floor(Math.random() * 100000);
//     setOrder(order);
//     checkID();
//   } else {
//     return true;
//   }
// }
//-----Trả lại sản phẩm-----
// function returnItem() {
//   document.querySelectorAll(".confirm_order").forEach((e) => e.remove());
//   const listItem = getItemList();
//   const list = getList();
//   list.forEach((e) => {
//     listItem.forEach((value) => {
//       if (value.name == e.name) {
//         e.countItem += value.countItemBuy;
//         e.countItemBuy -= value.countItemBuy;
//       }
//     });
//   });
//   setListLocalstorage(list);
//   setListItem([]);
//   totalAll();
//   countItem();
//   document.querySelector(".confirm_context").style.display = "none";
//   document.querySelector(".confirm_header2").style.display = "block";
// }
//-----Delete item buy to form-----
// function delItemBuy(name, value) {
//   value.remove();
//   const itemList = getItemList();
//   const list = getList();
//   itemList.forEach((e, index) => {
//     if (e.name == name) {
//       itemList.splice(index, 1);
//       setListItem(itemList);
//     }
//   });
//   if (getItemList().length == 0) {
//     document.querySelector(".img").style.display = "block";
//     document.querySelector(".total").style.display = "none";
//     document.querySelector("#main_buy").style.display = "none";
//     document.querySelector(".btn_buy").style.display = "none";
//   }
// }
// //-----Add list item buy to localStorage-----
// function getItemBuy(name) {
//   let count = 0;
//   const newList = [];
//   const itemList = getItemList();
//   getList().forEach((e) => {
//     if (e.name == name) {
//       if (e.countItem == 0) {
//         alert("Sản phẩm hiện đang hết hàng");
//       } else {
//         itemList.forEach((value) => {
//           if (value.name == name) {
//             if (value.countItemBuy == e.countItem || e.countItem == 0) {
//               alert("Bạn đã chọn tối đa số lượng sản phẩm");
//             } else value.countItemBuy++;
//           } else count++;
//           newList.push(value);
//         });
//         if (count == itemList.length) {
//           newList.push(e);
//         }
//       }
//     }
//   });
//   setListItem(newList);
// }
//-----Delete data localUser-----
function deleteData() {
  const listItem = getItemList();
  const list = getList();
  list.forEach((e) => {
    listItem.forEach((value) => {
      if (e.name == value.name) {
        e.countItem -= value.countItemBuy;
      }
    });
  });
  setOrder([]);
  setListItem([]);
  setListLocalstorage(list);
  deleteInfo();
}
//-----Trả lại đơn hàng-----
function returnOrder(value) {
  const newList = [];
  if (confirm("Bạn muốn trả lại đơn hàng này?") == true) {
    apiOrders.forEach((e, index) => {
      if (e.info.orderNumber == value) {
        apiOrders.splice(index, 1);
        deleteApi(e.OrderNumber);
      }
      getList().forEach((item) => {
        e.item.forEach((value) => {
          if (value.name == item.name) {
            item.countItem += value.countItemBuy;
          }
        });
        newList.push(item);
      });
    });
    setListLocalstorage(newList);
    document.querySelectorAll(".order_list").forEach((e) => e.remove());
    renderOrderLists1();
    if (apiOrders.length == 0) {
      document.querySelector(".img_order").style.display = "block";
      document.querySelector(".orders_content").style.display = "none";
    } else {
      document.querySelector(".orders_content").style.display = "block";
      document.querySelector(".img_order").style.display = "none";
    }
  }
}
//-----Xóa thông tin-----
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
      if (e.countItem == 0) {
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
//-----Chọn Quận/Huyện-----
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
//-----Chọn xã-----
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
