let city = [];
let district = [];
let ward = [];
let email = "";
let sodienthoai = "";
let message = "";
let ho = "";
let ten = "";
let address = "";
const formUser = document.querySelector(".form_username");
const formName = document.querySelector(".form_username2");
const formEmail = document.querySelector(".form_email");
const formNumber = document.querySelector(".form_number");
const selectCity = document.querySelector(".select-city");
const selectDistrict = document.querySelector(".select-district");
const selectWard = document.querySelector(".select-ward");

//-----Validate function
function ValidateName(value) {
  if (/^[a-zA-Z \/]+$/.test(value.value)) {
    return value.value;
  } else {
    value.parentNode.nextElementSibling.textContent =
      "Thông tin không phù hợp (tên chỉ bao gồm a-z A-Z)";
    return false;
  }
}
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
    return mail.value;
  }
  mail.parentNode.nextElementSibling.textContent =
    "Thông tin không phù hợp (email có dạng: abc@gmail.com hoặc abc@yahoo.com)";
  return false;
}
function ValidatePhone(value) {
  if (/^0\d{9}$/.test(value.value)) {
    return value.value;
  }
  value.parentNode.nextElementSibling.textContent =
    "Thông tin không phù hợp (số điện thoại bao gồm 10 chữ số!)";
  return false;
}
function validateForm() {
  if (formUser.value === "") {
    document.querySelector(".wrong1").textContent =
      "Bạn cần nhập thông tin ở trên";
  }
  if (formName.value === "") {
    document.querySelector(".wrong2").textContent =
      "Bạn cần nhập thông tin ở trên";
  }
  if (formEmail.value === "") {
    document.querySelector(".wrong3").textContent =
      "Bạn cần nhập thông tin ở trên";
  }
  if (formNumber.value === "") {
    document.querySelector(".wrong4").textContent =
      "Bạn cần nhập thông tin ở trên";
  }
  if (
    selectCity.value == "" ||
    selectDistrict.value == "--Chọn Huyện/Quận--" ||
    selectWard.value == "--Chọn Xã--"
  ) {
    document.querySelector(".wrong5").textContent =
      "Bạn cần nhập thông tin ở trên";
  }
}
formUser.addEventListener("focus", (e) => {
  document.querySelector(".wrong1").textContent = "";
});
formName.addEventListener("focus", (e) => {
  document.querySelector(".wrong2").textContent = "";
});
formEmail.addEventListener("focus", (e) => {
  document.querySelector(".wrong3").textContent = "";
});
formNumber.addEventListener("focus", (e) => {
  document.querySelector(".wrong4").textContent = "";
});
formUser.addEventListener("blur", (e) => {
  ho = ValidateName(e.target);
});
formName.addEventListener("blur", (e) => {
  ten = ValidateName(e.target);
});
formEmail.addEventListener("blur", (e) => {
  email = ValidateEmail(e.target);
});
formNumber.addEventListener("blur", (e) => {
  sodienthoai = ValidatePhone(e.target);
});
document.querySelectorAll("select").forEach((e) => {
  e.addEventListener("click", (e) => {
    document.querySelector(".wrong5").textContent = "";
  });
});
