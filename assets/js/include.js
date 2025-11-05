// include.js

document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");
  includes.forEach(el => {
    const file = el.getAttribute("data-include");
    fetch(file)
      .then(res => res.text())
      .then(data => {
        el.innerHTML = data;
        if (file.includes("header")) {
          initThemeSwitcher();
          initMenuToggle(); // 👈 menü fonksiyonunu burada çağırıyoruz
        }    
      });
  });

});
  
function initMenuToggle() {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("nav ul.menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  }
}