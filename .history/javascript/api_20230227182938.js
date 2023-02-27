// -----Select district + select ward-----
document.body.addEventListener("click", (e) => {
  if (e.target.matches(".select-city")) {
    districChoose();
  }
  if (e.target.matches(".select-district")) {
    wardChoose();
  }
});
//-----Creat Order ------
document.querySelector(".show").addEventListener("click", (e) => {
  let diachi = "";
  let quantily = 0;
  getItemLocalstorage().forEach((e) => {
    quantily += e.soluong;
  });
  totalPrice = document.querySelector(".bill").textContent;
  input.forEach((e) => {
    if (e.value == "") {
      console.log(e);
      console.log(e.parentNode.previousElementSibling);
      e.parentNode.previousElementSibling.textContent =
        "Bạn cần điền thông tin vào ô dưới";
    }
  });
  if (
    selectCity.value == "--Chọn Tỉnh/Thành phố--" ||
    selectDistrict.value == "--Chọn Huyện/Quận--" ||
    selectWard.value == "--Chọn Xã--"
  ) {
    selectDistrict.parentNode.previousElementSibling.textContent =
      "Bạn cần điền đầy đủ thông tin!";
  } else {
    arrayCity.forEach((e) => {
      if (e.code == selectCity.value) {
        city = e.name;
      }
    });
    arrayDistric.forEach((e) => {
      if (e.code == selectDistrict.value) {
        district = e.name;
      }
    });
    arrayWard.forEach((e) => {
      if (e.code == selectWard.value) {
        ward = e.name;
      }
    });
    diachi =
      document.querySelector(".form_home").value +
      " " +
      city +
      " " +
      district +
      " " +
      ward;
  }
  const userInfo = {
    name: ho + " " + ten,
    email: email,
    phonenumber: sodienthoai,
    address: diachi,
    message: message,
    id: randomID(),
    order: getItemLocalstorage(),
    total: totalAll(),
    date:
      date.getDate() +
      "/" +
      Number(date.getMonth() + 1) +
      "/" +
      date.getFullYear(),
  };
  if (
    userInfo.name != "" &&
    userInfo.email != "" &&
    userInfo.phonenumber != false &&
    userInfo.address != "" &&
    document.querySelector(".form_home").value != "" &&
    document.querySelector(".info").textContent == ""
  ) {
    document.querySelector(".main_info").style.display = "none";
    document.querySelector(".main_confirm").style.display = "block";
    document.querySelector(".main_buy").style.display = "none";
    document.querySelector("header").style.display = "block";
    $.style.backgroundColor = "white";
    document.querySelector(".home").style.color = "black";
    document.querySelector(".carts").style.color = "black";
    document.querySelector(".payment").style.color = "red";
    postApi(userInfo);
    setTimeout((e) => {
      getApi()
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((tasks) => {
          tasks.forEach((e) => {
            if (e.id == userInfo.id) {
              orderNumber = e.OrderNumber;
              document.querySelector(".confirm_grid").insertAdjacentHTML(
                "beforeend",
                `
              <div class="confirm_id confirm_user"><span class="show_item_buy">${
                e.id
              }</span>
          <div class="details">Details <i class="fa-solid fa-caret-down"></i>
          </div>
              
              </div>
              <div class="confirm_name confirm_user">${e.name}</div>
              <div class="confirm_date confirm_user">${date.getDate()}/${
                  date.getMonth() + 1
                }/${date.getFullYear()}</div>
              <div class="confirm_order confirm_user">${
                getItemLocalstorage().length
              }</div>
              <div class="confirm_quantily confirm_user">${quantily}</div>
              <div class="confirm_price confirm_user">${totalAll()}$</div>
              <div class="confirm_user">
                <i class="fa-solid fa-circle-xmark return_item"></i>
              </div>
              `
              );
            }
          });
        })
        .catch((error) => {});
    }, 1000);
  }
});
