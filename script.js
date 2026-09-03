// Dados da linha do tempo
const events = [
  {
    year: "1500",
    title: "Chegada dos Portugueses",
    desc: "Pedro Álvares Cabral aportou no litoral da Bahia, iniciando a história do Brasil colonial."
  },
  {
    year: "1808",
    title: "Chegada da Família Real",
    desc: "Dom João VI transfere a corte portuguesa para o Rio de Janeiro, elevando o Brasil a sede do Império."
  },
  {
    year: "1822",
    title: "Independência do Brasil",
    desc: "Em 7 de setembro, Dom Pedro I proclama a independência às margens do Ipiranga, em São Paulo."
  },
  {
    year: "1889",
    title: "Proclamação da República",
    desc: "O Marechal Deodoro da Fonseca proclama a República, encerrando o período monárquico."
  },
  {
    year: "1988",
    title: "Constituição Cidadã",
    desc: "A nova Constituição Federal é promulgada, consolidando os direitos fundamentais dos brasileiros."
  }
];

// Renderizar linha do tempo
function renderTimeline() {
  const container = document.getElementById("timeline");
  if (!container) return;

  events.forEach((ev, i) => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    item.style.transitionDelay = `${i * 0.1}s`;
    item.innerHTML = `
      <div class="timeline-item__year">${ev.year}</div>
      <div class="timeline-item__text">
        <h4>${ev.title}</h4>
        <p>${ev.desc}</p>
      </div>
    `;
    container.appendChild(item);
  });
}

// Animação de entrada com IntersectionObserver
function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".timeline-item").forEach((el) => observer.observe(el));
}

// Smooth scroll para âncoras internas
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// Contador regressivo até 7 de setembro (ou próximo ano)
function getNextIndependenceDay() {
  const now = new Date();
  let year = now.getFullYear();
  let target = new Date(year, 8, 7); // mês 8 = setembro
  if (now >= target) target = new Date(year + 1, 8, 7);
  return target;
}

function formatCountdown(ms) {
  const total = Math.floor(ms / 1000);
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return { d, h, m, s };
}

function injectCountdown() {
  const heroContent = document.querySelector(".hero__content");
  if (!heroContent) return;

  const wrapper = document.createElement("div");
  wrapper.id = "countdown";
  wrapper.style.cssText = `
    display: flex; gap: 1.2rem; margin-top: 2rem;
    font-family: 'Montserrat', sans-serif;
  `;

  const units = ["d", "h", "m", "s"];
  const labels = ["dias", "horas", "min", "seg"];

  units.forEach((unit, i) => {
    const box = document.createElement("div");
    box.style.cssText = `
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 10px;
      padding: 0.6rem 1rem;
      text-align: center;
      min-width: 64px;
    `;
    box.innerHTML = `
      <div id="cd-${unit}" style="font-size:1.5rem;font-weight:800;color:#FFDF00;line-height:1">00</div>
      <div style="font-size:0.62rem;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-top:0.2rem">${labels[i]}</div>
    `;
    wrapper.appendChild(box);
  });

  heroContent.appendChild(wrapper);

  function tick() {
    const diff = getNextIndependenceDay() - new Date();
    if (diff <= 0) {
      document.getElementById("countdown").innerHTML =
        '<p style="color:#FFDF00;font-weight:700;font-family:Montserrat,sans-serif">🎉 Feliz 7 de Setembro!</p>';
      return;
    }
    const { d, h, m, s } = formatCountdown(diff);
    document.getElementById("cd-d").textContent = String(d).padStart(2, "0");
    document.getElementById("cd-h").textContent = String(h).padStart(2, "0");
    document.getElementById("cd-m").textContent = String(m).padStart(2, "0");
    document.getElementById("cd-s").textContent = String(s).padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000);
}

// Init
renderTimeline();
setupScrollAnimations();
setupSmoothScroll();
injectCountdown();
