document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("featured-grid");
  if (!grid || typeof appsData === "undefined") return;

  const featuredApps = appsData.filter(item => item.featured);

  if (featuredApps.length === 0) {
    grid.innerHTML = "<p>No featured apps available yet.</p>";
    return;
  }

  grid.innerHTML = featuredApps.map(app => `
    <article class="card">
      <header class="flex items-center gap-2">
        <img src="/assets/picture/app/${app.id}.png" alt="${app.name} icon" width="48" height="48">
        <h3>${app.name}</h3>
      </header>
      <img src="/assets/picture/app/${app.id}.jpg" alt="${app.name} banner">
      <p>${app.description}</p>
      <footer class="flex justify-center gap-2">
        ${app.ios ? `<a href="${app.ios}" target="_blank">
          <img src="/assets/picture/badge/app-store-badge${document.documentElement.getAttribute("data-theme")==='dark' ? '-white' : ''}.svg" alt="App Store" height="40">
        </a>` : ""}
        ${app.android ? `<a href="${app.android}" target="_blank">
          <img src="/assets/picture/badge/google-play-badge.svg" alt="Google Play" height="40">
        </a>` : ""}
      </footer>
    </article>
  `).join("");
});
