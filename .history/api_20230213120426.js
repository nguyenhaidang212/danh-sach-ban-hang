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
const arrayCity = [];
const arrayDistric = [];
const arrayWard = [];
let city = [];
let district = [];
let ward = [];
let email;
let sodienthoai;
let diachi;
let message;
let ho;
let ten;
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
btnConfirm.addEventListener("click", (e) => {
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
  }
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
    ", " +
    city +
    " " +
    district +
    " " +
    ward;
  const userInfo = {
    ho_va_ten: ho + " " + ten,
    email: email,
    sodienthoai: sodienthoai,
    diachi: diachi,
    message: message,
    id: randomID(),
  };
  if (userInfo.ho_va_ten == "") {
    console.log(1);
  }
  console.log(userInfo);
});
input.forEach((e) => {
  e.addEventListener("focus", (e) => {
    e.target.parentNode.previousElementSibling.textContent = "";
  });
});
document.querySelector(".form_username").addEventListener("blur", (e) => {
  const ho = ValidateName(e.target);
});
document.querySelector(".form_username2").addEventListener("blur", (e) => {
  const ten = ValidateName(e.target);
});
document.querySelector(".form_number").addEventListener("blur", (e) => {
  ValidatePhone(e.target);
});
document.querySelector(".form_email").addEventListener("blur", (e) => {
  ValidateEmail(e.target);
});
document.querySelector(".form_home").addEventListener("blur", (e) => {
  diachi = e.target.value;
});
document.querySelector(".form_message").addEventListener("blur", (e) => {
  message = e.target.value;
});
function ValidateName(value) {
  if (/^[a-zA-Z \/]+$/.test(value.value)) {
    name = value.value;
    return name;
  }
  value.parentNode.previousElementSibling.textContent =
    "Thông tin không phù hợp (tên chỉ bao gồm a-z A-Z)";
}
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
    email = mail.value;
    return true;
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
    phone = value.value;
    return true;
  }
  value.parentNode.previousElementSibling.textContent =
    "Thông tin không phù hợp (số điện thoại bao gồm 10 chữ số!)";
}
function randomID() {
  const time = new Date().getTime();
  return time;
}