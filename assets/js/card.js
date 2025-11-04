document.addEventListener("DOMContentLoaded", () => {
  const theme =
    document.documentElement.getAttribute("data-theme") ||
    localStorage.getItem("theme") ||
    "light";

  const container = document.getElementById("appsContainer");
  let pageType = "featured";
  let filtered = appsData.filter((item) => item.featured);
  if (window.location.pathname.includes("games") || window.location.pathname.includes("apps")) {
    pageType = window.location.pathname.includes("games") ? "game" : "app";
    filtered = appsData.filter((item) => item.type === pageType);
  }

  filtered.forEach((app) => {
    const iconPath = `/assets/picture/app/${app.id}.png`;
    const bannerPath = `/assets/picture/app/${app.id}.jpg`;
    const appStoreBadge =
      theme === "dark"
        ? `/assets/picture/badge/app-store-badge-white.svg`
        : `/assets/picture/badge/app-store-badge.svg`;
    const googlePlayBadge =
      theme === "dark"
        ? `/assets/picture/badge/google-play-badge-white.svg`
        : `/assets/picture/badge/google-play-badge.svg`;

    const card = document.createElement("article");
    card.style.cursor = "pointer";
    card.style.padding = "0.75rem";
    card.style.borderRadius = "10px";
    card.style.border = "1px solid var(--muted-border-color, #ccc)";
    card.style.boxShadow = "0 2px 6px rgba(0,0,0,0.08)";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.justifyContent = "space-between";
    //card.style.transition = "transform 0.2s ease";
    card.style.height = "100%";
    card.style.overflow = "hidden";
    card.onclick = () => {
      window.location.href = `/app/?id=${app.id}`;
    };

    card.innerHTML = `
      <!-- Üst satır: ikon + isim -->
      <div style="display:flex; align-items:center; gap:1rem;">
        <img src="${iconPath}" alt="${app.name} icon" width="64" height="64"
          style="border-radius:20%; border:2px solid var(--card-border-color, #ccc); background:white;">
        <h3 style="margin:0;">${app.name}</h3>
      </div>

      <!-- Banner resmi -->
      <div style="margin:0.75rem 0;">
        <img src="${bannerPath}" alt="${app.name} banner" style="width:100%; border-radius:8px;">
      </div>

      <!-- Açıklama -->
      <p style="margin-bottom:0.5rem;">${app.description}</p>

      <!-- Store düğmeleri -->
      <div style="display:flex; gap:0.5rem; margin-top: auto; justify-content:center;">
        ${
          app.ios
            ? `<a href="${app.ios}" onclick="event.stopPropagation()" target="_blank">
                <img src="${appStoreBadge}" alt="App Store" style="height:50px;">
              </a>`
            : ""
        }
        ${
          app.android
            ? `<a href="${app.android}" onclick="event.stopPropagation()" target="_blank">
                <img src="${googlePlayBadge}" alt="Google Play" style="height:50px;">
              </a>`
            : ""
        }
      </div>
    `;

    card.innerHTML = `
      <!-- Üst satır: ikon + isim -->
      <div style="display:flex; align-items:center; gap:1rem;">
        <img src="${iconPath}" alt="${app.name} icon" width="64" height="64"
          style="border-radius:20%; border:2px solid var(--card-border-color, #ccc); background:white;">
        <h3 style="margin:0;">${app.name}</h3>
      </div>

      <!-- Banner resmi -->
      <div style="margin:0.75rem 0;">
        <img src="${bannerPath}" alt="${app.name} banner" style="width:100%; border-radius:8px;">
      </div>

      <!-- Açıklama -->
      <p style="margin-bottom:0.5rem;">${app.description}</p>

      <!-- Store düğmeleri -->
      <div style="display:flex; gap:0.5rem; margin-top: auto; justify-content:center;">
        ${
          app.ios
            ? `<a href="${app.ios}" onclick="event.stopPropagation()" target="_blank">
                <img src="${appStoreBadge}" alt="App Store" style="height:50px;">
              </a>`
            : ""
        }
        ${
          app.android
            ? `<a href="${app.android}" onclick="event.stopPropagation()" target="_blank">
                <img src="${googlePlayBadge}" alt="Google Play" style="height:50px;">
              </a>`
            : ""
        }
      </div>
    `;

    container.appendChild(card);
  });
});
