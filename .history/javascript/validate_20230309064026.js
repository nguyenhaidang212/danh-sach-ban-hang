//-----Validate logic-----
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
// document.querySelector(".form_username").addEventListener("blur", (e) => {
//   ho = ValidateName(e.target);
// });
// document.querySelector(".form_username2").addEventListener("blur", (e) => {
//   ten = ValidateName(e.target);
// });
// document.querySelector(".form_number").addEventListener("blur", (e) => {
//   sodienthoai = ValidatePhone(e.target);
// });
// document.querySelector(".form_email").addEventListener("blur", (e) => {
//   email = ValidateEmail(e.target);
// });
// document.querySelector(".form_home").addEventListener("blur", (e) => {
//   diachi = e.target.value;
// });
// document.querySelector(".form_message").addEventListener("blur", (e) => {
//   message = e.target.value;
// });
//-----Validate function
function ValidateName(value) {
  if (/^[a-zA-Z \/]+$/.test(value.value)) {
    return value.value;
  }
  console.log(value.parentNode.nextElementSibling.textContent);
  value.parentNode.nextElementSibling.textContent =
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
