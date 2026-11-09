// Video de ejemplo (demo). Cámbialo por tus propios videos con licencia.
const DEMO_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

// Catálogo de ejemplo (títulos ficticios)
const animes = [
  { id: 1, title: "Cazadores del Alba", genre: "Acción", year: 2025, rating: 4.9, emoji: "⚔️", colors: ["#7c3aed", "#0891b2"], episodes: 12, desc: "Un joven guerrero cruza mundos prohibidos para detener a las sombras que devoran el amanecer." },
  { id: 2, title: "Neón Ronin", genre: "Acción", year: 2026, rating: 4.7, emoji: "🗡️", colors: ["#db2777", "#4c1d95"], episodes: 24, desc: "En una ciudad cyberpunk, un samurái sin amo busca redención entre luces y traiciones." },
  { id: 3, title: "Academia Estelar", genre: "Nuevos", year: 2026, rating: 4.5, emoji: "🌟", colors: ["#2563eb", "#9333ea"], episodes: 10, desc: "Estudiantes de todo el universo compiten para convertirse en guardianes de las estrellas." },
  { id: 4, title: "Corazón de Cristal", genre: "Romance", year: 2025, rating: 4.8, emoji: "💎", colors: ["#ec4899", "#6366f1"], episodes: 13, desc: "Dos almas que se encuentran en distintas vidas intentan romper una antigua maldición." },
  { id: 5, title: "Sakura Eterna", genre: "Romance", year: 2024, rating: 4.6, emoji: "🌸", colors: ["#f472b6", "#7c3aed"], episodes: 12, desc: "Un verano, un festival y una promesa que cambiará el futuro de dos amigos de infancia." },
  { id: 6, title: "Dragón de Medianoche", genre: "Populares", year: 2024, rating: 4.9, emoji: "🐉", colors: ["#0f766e", "#6d28d9"], episodes: 26, desc: "Un dragón dormido despierta y una joven herrera es la única capaz de entenderlo." },
  { id: 7, title: "Mecha Zero", genre: "Populares", year: 2025, rating: 4.7, emoji: "🤖", colors: ["#0ea5e9", "#be185d"], episodes: 20, desc: "La humanidad entera depende de un piloto novato y un robot que nadie logra controlar." },
  { id: 8, title: "Club de los Fantasmas", genre: "Nuevos", year: 2026, rating: 4.4, emoji: "👻", colors: ["#8b5cf6", "#14b8a6"], episodes: 8, desc: "Un club escolar resuelve misterios sobrenaturales con mucho humor y algo de miedo." },
  { id: 9, title: "Luna Roja", genre: "Populares", year: 2023, rating: 4.8, emoji: "🌙", colors: ["#b91c1c", "#312e81"], episodes: 24, desc: "Cuando la luna se tiñe de rojo, los guardianes de la noche despiertan sus poderes." },
  { id: 10, title: "Ritmo de Verano", genre: "Romance", year: 2026, rating: 4.3, emoji: "🎸", colors: ["#f59e0b", "#db2777"], episodes: 12, desc: "Una banda de secundaria sueña con tocar en el festival más grande del país." },
  { id: 11, title: "Guerreros del Vacío", genre: "Acción", year: 2025, rating: 4.6, emoji: "🚀", colors: ["#1d4ed8", "#7e22ce"], episodes: 16, desc: "Un escuadrón espacial defiende la última colonia humana de una invasión misteriosa." },
  { id: 12, title: "Aventuras en el Bosque", genre: "Nuevos", year: 2026, rating: 4.5, emoji: "🦊", colors: ["#16a34a", "#7c3aed"], episodes: 12, desc: "Un zorro mágico guía a un niño por un bosque lleno de criaturas y secretos." }
];

// Secciones de la página
const sections = [
  { id: "populares", title: "🔥 Populares", filter: a => a.genre === "Populares" || a.rating >= 4.8 },
  { id: "nuevos", title: "🆕 Nuevos episodios", filter: a => a.year === 2026 },
  { id: "accion", title: "⚔️ Acción", filter: a => a.genre === "Acción" },
  { id: "romance", title: "💖 Romance", filter: a => a.genre === "Romance" }
];

const rowsEl = document.getElementById("rows");
const modal = document.getElementById("modal");
const player = document.getElementById("player");
const episodesEl = document.getElementById("episodes");

// Crear tarjetas y filas
function createCard(anime) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="poster" style="background:linear-gradient(160deg, ${anime.colors[0]}, ${anime.colors[1]})">
      <span class="rating">★ ${anime.rating}</span>
      ${anime.emoji}
    </div>
    <div class="card-info">
      <h3>${anime.title}</h3>
      <span>${anime.genre} · ${anime.year}</span>
    </div>`;
  card.addEventListener("click", () => openModal(anime));
  return card;
}

sections.forEach(sec => {
  const list = animes.filter(sec.filter);
  if (!list.length) return;
  const row = document.createElement("section");
  row.className = "row";
  row.id = sec.id;
  row.innerHTML = `<h2>${sec.title}</h2><div class="slider"></div>`;
  const slider = row.querySelector(".slider");
  list.forEach(a => slider.appendChild(createCard(a)));
  rowsEl.appendChild(row);
});

// Reproductor / modal
function openModal(anime, episode = 1) {
  document.getElementById("modalTitle").textContent = anime.title;
  document.getElementById("modalMeta").textContent =
    `${anime.genre} · ${anime.year} · ★ ${anime.rating} · ${anime.episodes} episodios`;
  document.getElementById("modalDesc").textContent = anime.desc;

  episodesEl.innerHTML = "";
  const total = Math.min(anime.episodes, 12);
  for (let i = 1; i <= total; i++) {
    const li = document.createElement("li");
    li.innerHTML = `<span>Episodio ${i}</span><small>24 min</small>`;
    if (i === episode) li.classList.add("active");
    li.addEventListener("click", () => playEpisode(li));
    episodesEl.appendChild(li);
  }

  player.src = DEMO_VIDEO;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function playEpisode(li) {
  episodesEl.querySelectorAll("li").forEach(x => x.classList.remove("active"));
  li.classList.add("active");
  player.src = DEMO_VIDEO;
  player.play().catch(() => {});
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  player.pause();
  player.removeAttribute("src");
  player.load();
  document.body.style.overflow = "";
}

document.getElementById("closeModal").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// Botones del hero
document.getElementById("heroPlay").addEventListener("click", () => openModal(animes[0]));
document.getElementById("heroInfo").addEventListener("click", () => openModal(animes[0]));

// Header: cambio al hacer scroll y menú móvil
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

const nav = document.getElementById("nav");
document.getElementById("menuBtn").addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
