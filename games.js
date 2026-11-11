"use strict";

const GAMES = [
  {
    name: "Bomb Sweeper",
    url: "https://schreys.github.io/bomb-sweeper-v2/",
    img: "img/bomb-sweeper.jpg",
    desc: "Game & Watch-remake: ruim de bommen op in 45 doolhof-levels.",
    tags: ["Puzzel", "Game & Watch"],
    color: "#ffb347",
  },
  {
    name: "Crazy Tower",
    url: "https://schreys.github.io/crazy-tower/",
    img: "img/crazy-tower.jpg",
    desc: "Stapel 50 blokken. Ze worden kleiner en sneller...",
    tags: ["Arcade", "Muziek"],
    color: "#ff3fd0",
  },
  {
    name: "Lifeboat",
    url: "https://schreys.github.io/lifeboat/",
    img: "img/lifeboat.jpg",
    desc: "Het schip staat in brand! Vang de springers met je reddingsboot.",
    tags: ["Arcade", "Game & Watch"],
    color: "#ff6b4a",
  },
  {
    name: "Kattendoku",
    url: "https://schreys.github.io/kattendoku/",
    img: "img/kattendoku.jpg",
    desc: "Logische puzzel: één kat per kleur, rij en kolom.",
    tags: ["Puzzel", "Highscores"],
    color: "#f2895a",
  },
  {
    name: "Rummikub",
    url: "https://rummikub-fax2.onrender.com/",
    img: "img/rummikub.jpg",
    desc: "Speel online met vrienden of tegen bots.",
    tags: ["Multiplayer", "Bordspel"],
    color: "#3ddc84",
    slow: true,
  },
  {
    name: "Carcassonne",
    url: "https://carcassonne-cszv.onrender.com/",
    img: "img/carcassonne.jpg",
    desc: "Bouw steden, wegen en kloosters. Met Horror-, Kerst- en Spelletjes-thema.",
    tags: ["Multiplayer", "Bordspel"],
    color: "#e08a4e",
    slow: true,
  },
];

const grid = document.getElementById("games");

for (const g of GAMES) {
  const a = document.createElement("a");
  a.className = "card";
  a.href = g.url;
  a.style.setProperty("--accent", g.color);

  const shot = document.createElement("div");
  shot.className = "shot";
  const img = document.createElement("img");
  img.src = g.img;
  img.alt = `Screenshot van ${g.name}`;
  img.loading = "lazy";
  shot.append(img);
  if (g.slow) {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = "start soms traag";
    badge.title = "Draait op een gratis server die even moet opstarten";
    shot.append(badge);
  }

  const body = document.createElement("div");
  body.className = "body";
  const h2 = document.createElement("h2");
  h2.textContent = g.name;
  const p = document.createElement("p");
  p.textContent = g.desc;
  const tags = document.createElement("ul");
  tags.className = "tags";
  for (const t of g.tags) {
    const li = document.createElement("li");
    li.textContent = t;
    tags.append(li);
  }
  const play = document.createElement("span");
  play.className = "play";
  play.textContent = "▶ SPELEN";
  body.append(h2, p, tags, play);

  a.append(shot, body);
  grid.append(a);
}

// Arrow keys move through the menu like an arcade cabinet.
document.addEventListener("keydown", (e) => {
  const cards = [...grid.children];
  const i = cards.indexOf(document.activeElement);
  const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
  const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[e.key];
  if (!step) return;
  e.preventDefault();
  const next = i < 0 ? 0 : Math.min(cards.length - 1, Math.max(0, i + step));
  cards[next].focus();
});
