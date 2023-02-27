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
