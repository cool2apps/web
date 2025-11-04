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
  }

  function updateIcon(theme) {
    if (theme === "light") {
      switcher.textContent = "🌞"; // Güneş
      switcher.title = "Switch to Dark Mode";
    } else if (theme === "dark") {
      switcher.textContent = "🌜"; // Ay
      switcher.title = "Switch to Auto Mode";
    } else {
      switcher.textContent = "⚙️"; // Dişli
      switcher.title = "Follow System Theme";
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
    let next;
    if (current === "light") next = "dark";
    else if (current === "dark") next = "auto";
    else next = "light";

    localStorage.setItem("theme", next);
    applyTheme(next);
  });
}

document.addEventListener("DOMContentLoaded", initThemeSwitcher);
