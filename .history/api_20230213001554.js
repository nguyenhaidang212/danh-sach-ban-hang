const promiseCity = fetch("https://provinces.open-api.vn/api/");
const promiseDistrict = fetch("https://provinces.open-api.vn/api/d/");
const proemiseWard = fetch("https://provinces.open-api.vn/api/w/");
const selectCity = document.querySelector(".select-city");
const selectDistrict = document.querySelector(".select-district");
const selectWard = document.querySelector(".select-ward");
const optionCity = document.querySelector(".option-city");
const arrayCity = [];
const arrayDistric = [];
const arrayWard = [];
promiseCity
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // console.log(data);
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
  if (e.target.matches(".select-ward")) {
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
const btnConfirm = document.querySelector(".btn-confirm");
const input = document.querySelectorAll("input");
btnConfirm.addEventListener("click", (e) => {
  let city = [];
  let district = [];
  let ward = [];
  input.forEach((e) => {
    if (e.value == "") {
      e.parentNode.previousElementSibling.textContent =
        "Bạn cần điền thông tin vào ô dưới!";
      return false;
    }
  });
  arrayCity.forEach((e) => {
    if (e.value == selectCity.code) {
      city = e.name;
    }
  });
  arrayDistric.forEach((e) => {
    if (e.value == selectDistrict.value) {
      district = e.name;
    }
  });
  arrayWard.forEach((e) => {
    if (e.value == selectWard.value) {
      ward = e.name;
    }
  });
  console.log(selectCity.value, selectDistrict.value, selectWard.value);
  console.log(arrayDistric);
  diachi =
    document.querySelector(".form_message").textContent +
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
  };
  console.log(userInfo);
});
input.forEach((e) => {
  e.addEventListener("focus", (e) => {
    e.target.parentNode.previousElementSibling.textContent = "";
  });
});
document.querySelector(".form_username").addEventListener("blur", (e) => {
  // if (e.target.value != "admin") {
  //   e.target.parentNode.previousElementSibling.textContent =
  //     "Thông tin không phù hợp";
  //   return false;
  // } else {
  // }
  ho = e.target.value;
  return true;
});
let email;
let sodienthoai;
let diachi;
let message;
let ho;
let ten;
document.querySelector(".form_username2").addEventListener("blur", (e) => {
  // if (e.target.value != "admin") {
  //   e.target.parentNode.previousElementSibling.textContent =
  //     "Thông tin không phù hợp";
  //   return false;
  // } else {
  // }
  ten = e.target.value;
  return true;
});
document.querySelector(".form_number").addEventListener("blur", (e) => {
  sodienthoai = e.target.value;
});
document.querySelector(".form_email").addEventListener("blur", (e) => {
  ValidateEmail(e.target);
});
function nameValidate() {}
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
    email = mail.value;
    return true;
  }
  mail.parentNode.previousElementSibling.textContent =
    "Thông tin không phù hợp";
  return false;
}
document.querySelector(".form_home").addEventListener("blur", (e) => {
  diachi = e.target.value;
});
document.querySelector(".form_message").addEventListener("blur", (e) => {
  message = e.target.value;
});
