//-----Choose district-----
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
//-----Choose ward-----
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
