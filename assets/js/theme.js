// assets/js/theme.js
function initThemeSwitcher() {
  const switcher = document.getElementById("themeSwitcher");
  if (!switcher) return;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const userTheme = localStorage.getItem("theme"); // "light" | "dark" | "auto" | null

  function applyTheme(theme) {
    if (theme === "auto") {
      document.documentElement.setAttribute("data-theme", prefersDark.matches ? "dark" : "light");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    updateIcon(theme);

    const logo = document.getElementById("site-logo");
    if (theme === "dark") {
      logo.src = "/assets/picture/logo-dark.jpg";
    } else if (theme === "light") {
      logo.src = "/assets/picture/logo.jpg";
    } else {
      // Sistem temasına göre
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      logo.src = prefersDark
        ? "/assets/picture/logo-dark.jpg"
        : "/assets/picture/logo.jpg";
    }
  }

  function updateIcon(theme) {
    const icon = document.getElementById("themeIcon");
     if (theme === "dark" || (theme === "system" && isSystemDark)) {
      document.documentElement.classList.add("dark");
      icon.src = "/assets/picture/icon/theme-dark.png";
    } else if (theme === "light" || (theme === "system" && !isSystemDark)) {
      document.documentElement.classList.add("light");
      icon.src = "/assets/picture/icon/theme-light.png";
    }
    if (theme === "system") {
      icon.src = "/assets/picture/icon/theme-system.png";
    }
  }

  // Başlangıç teması
  const startTheme = userTheme || "auto";
  applyTheme(startTheme);

  // Sistem teması değiştiğinde (sadece auto aktifse)
  prefersDark.addEventListener("change", () => {
    if (localStorage.getItem("theme") === "auto") {
      applyTheme("auto");
    }
  });

  // Düğmeye tıklayınca sıradaki moda geç
  switcher.addEventListener("click", () => {
    const current = localStorage.getItem("theme") || "auto";
    let theme1 = "light";
    let theme2 = "light";
    if (current === "auto") {
      theme1 = prefersDark.matches ? "dark" : "light";
    } else {
      theme1 =  current;
    }
    let next;
    if (current === "light") next = "dark";
    else if (current === "dark") next = "auto";
    else next = "light";
    localStorage.setItem("theme", next);
    applyTheme(next);
    if (next === "auto") {
      theme2 = prefersDark.matches ? "dark" : "light";
    } else {
      theme2 =  next;
    }
    if (theme1 !== theme2) {
      setTimeout(() => location.reload(), 150);
    }
  });

}

document.addEventListener("DOMContentLoaded", initThemeSwitcher);