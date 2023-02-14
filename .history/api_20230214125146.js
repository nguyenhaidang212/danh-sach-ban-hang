const promiseCity = fetch("https://provinces.open-api.vn/api/");
const promiseDistrict = fetch("https://provinces.open-api.vn/api/d/");
const proemiseWard = fetch("https://provinces.open-api.vn/api/w/");
const selectCity = document.querySelector(".select-city");
const selectDistrict = document.querySelector(".select-district");
const selectWard = document.querySelector(".select-ward");
const optionCity = document.querySelector(".option-city");
const btnConfirm = document.querySelector(".btn-confirm");
const input = document.querySelectorAll("input");
const formSelect = document.querySelectorAll(".form-select");
const orderApi = fetch(
  "https://63e9d3fa811db3d7ef016dcc.mockapi.io/api/shop/tasks"
);
const arrayCity = [];
const arrayDistric = [];
const arrayWard = [];
let city = [];
let district = [];
let ward = [];
let email = "";
let sodienthoai = "";
let diachi = "";
let message = "";
let ho = "";
let ten = "";
const date = new Date();
promiseCity
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((e) => {
      arrayCity.push(e);
      selectCity.insertAdjacentHTML(
        "afterbegin",
        `
      <option select value="${e.code}">${e.name}</option>`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
promiseDistrict
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((e) => {
      arrayDistric.push(e);
    });
  })
  .catch((error) => {});
proemiseWard
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((e) => {
      arrayWard.push(e);
    });
  });
document.body.addEventListener("click", (e) => {
  if (e.target.matches(".select-city")) {
    districChoose();
  }
  if (e.target.matches(".select-district")) {
    wardChoose();
  }
});
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
document.querySelector(".show").addEventListener("click", (e) => {
  let quantily = 0;
  getItemLocalstorage().forEach((e) => {
    quantily += e.soluong;
  });
  totalPrice = document.querySelector(".bill").textContent;
  // console.log(quantily);
  input.forEach((e) => {
    if (e.value == "") {
      e.parentNode.previousElementSibling.textContent =
        "Bạn cần điền thông tin vào ô dưới!";
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
  }
  diachi =
    document.querySelector(".form_home").value +
    " " +
    city +
    " " +
    district +
    " " +
    ward;
  const userInfo = {
    name: ho + " " + ten,
    email: email,
    phonenumber: sodienthoai,
    address: diachi,
    message: message,
    id: randomID(),
  };
  if (
    userInfo.name != "" &&
    userInfo.email != "" &&
    userInfo.phonenumber != false &&
    userInfo.address != "" &&
    document.querySelector(".form_home").value != ""
  ) {
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
              <div class="confirm_date confirm_user">${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</div>
              <div class="confirm_order confirm_user">${
                getItemLocalstorage().length
              }</div>
              <div class="confirm_quantily confirm_user">${quantily}</div>
              <div class="confirm_price confirm_user">${totalPrice}$</div>
              <div class="confirm_user">
                <i class="fa-solid fa-circle-xmark return_item"></i>
              </div>
              `
              );
            }
          });
        })
        .catch((error) => {
          // handle error
        });
    }, 500);
    document.querySelector(".main_info").style.display = "none";
    document.querySelector(".main_confirm").style.display = "block";
    document.querySelector(".main_buy").style.display = "none";
    document.querySelector("header").style.display = "block";
    $.style.backgroundColor = "white";
  }
});
input.forEach((e) => {
  e.addEventListener("focus", (e) => {
    e.target.parentNode.previousElementSibling.textContent = "";
  });
});
formSelect.forEach((e) => {
  e.addEventListener("click", (e) => {
    e.target.parentNode.previousElementSibling.textContent = "";
  });
});
document.querySelector(".form_username").addEventListener("blur", (e) => {
  ho = ValidateName(e.target);
});
document.querySelector(".form_username2").addEventListener("blur", (e) => {
  ten = ValidateName(e.target);
});
document.querySelector(".form_number").addEventListener("blur", (e) => {
  sodienthoai = ValidatePhone(e.target);
});
document.querySelector(".form_email").addEventListener("blur", (e) => {
  email = ValidateEmail(e.target);
});
document.querySelector(".form_home").addEventListener("blur", (e) => {
  diachi = e.target.value;
});
document.querySelector(".form_message").addEventListener("blur", (e) => {
  message = e.target.value;
});
function ValidateName(value) {
  if (/^[a-zA-Z \/]+$/.test(value.value)) {
    return value.value;
  }
  value.parentNode.previousElementSibling.textContent =
    "Thông tin không phù hợp (tên chỉ bao gồm a-z A-Z)";
}
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
    return mail.value;
  }
  mail.parentNode.previousElementSibling.textContent =
    "Thông tin không phù hợp (email có dạng: abc@gmail.com hoặc abc@yahoo.com)";
  return false;
}
function ValidatePhone(value) {
  if (
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
      value.value
    )
  ) {
    return value.value;
  }
  value.parentNode.previousElementSibling.textContent =
    "Thông tin không phù hợp (số điện thoại bao gồm 10 chữ số!)";
  return false;
}
function randomID() {
  const time = new Date().getTime();
  return time;
}
function postApi(value) {
  fetch("https://63e9d3fa811db3d7ef016dcc.mockapi.io/api/shop/tasks", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(value),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((tasks) => {})
    .catch((error) => {});
}
function getApi(arr = []) {
  return fetch("https://63e9d3fa811db3d7ef016dcc.mockapi.io/api/shop/tasks", {
    method: "GET",
    headers: { "content-type": "application/json" },
  });
}
function deleteApi(value) {
  fetch("https://63e9d3fa811db3d7ef016dcc.mockapi.io/api/shop/tasks/" + value, {
    method: "DELETE",
  });
}
