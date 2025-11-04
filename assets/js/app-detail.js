document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const appId = params.get("id");
  if (!appId) return;

  const app = appsData.find((a) => a.id === appId);
  if (!app) return;

  // DOM elemanlarını dolduralım
  document.getElementById("app-name").textContent = app.name;
  document.getElementById("banner").src = `/assets/picture/app/${app.id}.jpg`;
  document.getElementById("icon").src = `/assets/picture/app/${app.id}.png`;
  document.getElementById("description").textContent = app.description;

  // Screenshot grid
  const screenshotsContainer = document.getElementById("screenshots");
  const count = app.screenshotCount || 0;
  const landscape = app.screenshotLandscape || false;

  for (let i = 1; i <= count; i++) {
    const img = document.createElement("img");
    img.src = `/assets/picture/app/${app.id}-${i}.jpg`;
    img.alt = `${app.name} screenshot ${i}`;
    img.classList.add("screenshot");
    screenshotsContainer.appendChild(img);
  }

  // Layout class (landscape / portrait)
  screenshotsContainer.classList.add(
    landscape ? "landscape-grid" : "portrait-grid"
  );
});
