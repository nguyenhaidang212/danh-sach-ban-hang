const home = document.querySelector(".home");
// Mua sản phẩm
$.addEventListener("click", (e) => {
    if (e.target.matches(".item-add")) {
        getItemBuy(e.target.parentNode.nextElementSibling.textContent);
        countItem();
      }
}
