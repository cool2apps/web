// include.js
/*
function includeHTML() {
  document.querySelectorAll('[data-include]').forEach(async (el) => {
    const file = el.getAttribute('data-include');
    const response = await fetch(file);
    if (response.ok) {
      el.innerHTML = await response.text();
      if (file === 'header.html') initThemeSwitcher?.(); // Tema düğmesi için
    } else {
      el.innerHTML = "Include file not found.";
    }
  });
}
  */
document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");
  includes.forEach(el => {
    const file = el.getAttribute("data-include");
    fetch(file)
      .then(res => res.text())
      .then(data => {
        el.innerHTML = data;
        if (file.includes("header")) initThemeSwitcher();
      });
  });
});
  
