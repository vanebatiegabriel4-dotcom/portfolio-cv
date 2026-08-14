/**
 * VANE BATIE GABRIEL — PORTFOLIO OFFICIEL
 * Interactivité, Canvas Cyber Particules, Terminal CLI, Modales & Formulaire
 */

document.addEventListener('DOMContentLoaded', () => {
  initCyberCanvas();
  initNavbar();
  initSkillsFilter();
  initProjectModals();
  initCyberTerminal();
  initContactForm();
  initCVDownload();
});

/* ==========================================================================
   1. CANVAS PARTICULES & RÉSEAU CYBER AFRICA
   ========================================================================== */
function initCyberCanvas() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];
  const particleCount = 45;
  const maxDistance = 140;
  
  let mouse = { x: null, y: null, radius: 150 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? 'rgba(0, 240, 255,' : 'rgba(157, 78, 221,';
      this.baseAlpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Interaction souris
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color} ${this.baseAlpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color.includes('240') ? '#00f0ff' : '#9d4edd';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. NAVBAR & NAVIGATION FLUIDE
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const icon = toggleBtn.querySelector('i');
      if (navLinks.classList.contains('mobile-open')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        links.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   3. FILTRAGE DES COMPÉTENCES
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. DONNÉES & GESTIONNAIRE DES MODALES DE PROJETS
   ========================================================================== */
const PROJECTS_DATA = {
  1: {
    num: "PROJET 01",
    title: "Angrylörd Sécurity — Identité Visuelle & Branding",
    badge: "Branding & Direction Artistique",
    image: "assets/angrylord_logo.jpg",
    lead: "Création complète du branding, de la charte graphique et des supports visuels pour Angrylörd Sécurity, structure panafricaine moderne de cybersécurité.",
    objectives: [
      "Conception du logo emblématique et des variantes vectorielles",
      "Élaboration de la charte graphique Cyber Africa (Bleu électrique + Violet néon)",
      "Design des templates de documents techniques et rapports d'audits",
      "Création de visuels pédagogiques et supports de sensibilisation cyber"
    ],
    techStack: ["Adobe Illustrator", "Photoshop", "Figma", "Branding Strategy", "Cyber Aesthetics"],
    deliverables: "Charte graphique complète (PDF & Web), pack de logos HD, maquettes de présentation et gabarits de rapports techniques."
  },
  2: {
    num: "PROJET 02",
    title: "Présentation PowerPoint : “IA dans l’éducation africaine”",
    badge: "Design de Présentation & Data-Design",
    image: "assets/hero_cyber_soc.jpg",
    lead: "Conception d'un diaporama stratégique de 8 diapositives à fort impact visuel, explorant le potentiel transformateur de l'intelligence artificielle pour l'éducation en Afrique.",
    objectives: [
      "8 diapositives structurées au design futuriste Cyber Africa",
      "Mise en avant percutante des chiffres clés et statistiques sectorielles",
      "Création d'iconographies personnalisées et infographies sur mesure",
      "Harmonie chromatique haute visibilité pour projections et webinaires"
    ],
    techStack: ["PowerPoint Pro", "Data Visualization", "Vector Icons", "Motion Transitions"],
    deliverables: "Présentation PPTX 16:9 haute résolution, version PDF interactive et livret de présentation pour conférencier."
  },
  3: {
    num: "PROJET 03",
    title: "TP & Rapport : IA appliquée aux jeux vidéo",
    badge: "Ingénierie Pédagogique & IA",
    image: "assets/hero_cyber_soc.jpg",
    lead: "Structuration pédagogique complète d'un travail pratique (TP) universitaire et technique sur l'intégration des algorithmes d'IA dans l'industrie vidéoludique.",
    objectives: [
      "Partie 1 : Introduction et histoire des agents intelligents dans les jeux",
      "Partie 2 : Modélisation des algorithmes (Pathfinding A*, Arbres de décision, Minimax)",
      "Partie 3 : Études de cas concrets (Jeux d'action, stratégie temps réel, PNJ adaptatifs)",
      "Partie 4 : Rédaction du rapport complet + Diaporama de restitution"
    ],
    techStack: ["Algorithmes IA", "Python Gaming Logic", "Rapport Technique", "PowerPoint"],
    deliverables: "Guide de TP pas-à-pas avec code d'exemples, rapport académique formaté et support de soutenance."
  },
  4: {
    num: "PROJET 04",
    title: "Images Réalistes pour Modules de Formation Cyber",
    badge: "Génération Visuelle & Vulgarisation",
    image: "assets/hero_cyber_soc.jpg",
    lead: "Production d'une série d'images réalistes professionnelles pour illustrer des scénarios d'entraînement tactique et de gestion de crise cyber.",
    objectives: [
      "Sécurité & surveillance des frontières numériques et physiques",
      "Exercices conjoints de réponse aux cyberattaques et coopération inter-agences",
      "Modernisation des centres de commandement et souveraineté des équipements",
      "Génération ciblée garantissant un réalisme adapté au contexte africain"
    ],
    techStack: ["Génération d'images réalistes", "Prompt Engineering Avancé", "Post-traitement HD"],
    deliverables: "Série d'illustrations haute fidélité (4K), fiches de mise en situation et banques d'images d'exercices."
  },
  5: {
    num: "PROJET 05",
    title: "Installation, Déploiement & Optimisation d'Outils",
    badge: "Support Technique & Systèmes",
    image: "assets/angrylord_logo.jpg",
    lead: "Interventions d'optimisation système, mise en place d'environnements de développement et sécurisation logicielle sur PC et Android.",
    objectives: [
      "Déploiement complet d'environnements Python (PC Windows, Linux & Android Termux)",
      "Installation et paramétrage de suites bureautiques et outils d'administration",
      "Nettoyage approfondi et sécurisé des répertoires Windows.old",
      "Désinstallation et éradication de programmes corrompus (ex: IObit corrompu)",
      "Recherche, benchmark et configuration de solutions VPN P2P chiffrées"
    ],
    techStack: ["Python 3", "Termux / Android", "Windows PowerShell", "VPN P2P", "System Cleanup"],
    deliverables: "Scripts d'automatisation, guides d'installation rapide et environnement de travail prêt à l'emploi."
  }
};

function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!modal) return;

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      const data = PROJECTS_DATA[projectId];
      if (!data) return;

      document.getElementById('modalNum').textContent = data.num;
      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalBadge').textContent = data.badge;
      document.getElementById('modalImage').src = data.image;
      document.getElementById('modalLead').textContent = data.lead;

      // Objectifs
      const objList = document.getElementById('modalObjectives');
      objList.innerHTML = '';
      data.objectives.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check-circle"></i> <span>${item}</span>`;
        objList.appendChild(li);
      });

      // Stack
      const stackList = document.getElementById('modalStack');
      stackList.innerHTML = '';
      data.techStack.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'tag-pill';
        span.textContent = tech;
        stackList.appendChild(span);
      });

      document.getElementById('modalDeliverables').textContent = data.deliverables;

      modal.showModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.close();
    });
  }

  modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      modal.close();
    }
  });
}

/* ==========================================================================
   5. TERMINAL CYBER INTERACTIF (MINI CLI)
   ========================================================================== */
function initCyberTerminal() {
  const input = document.getElementById('terminalInput');
  const output = document.getElementById('terminalOutput');
  if (!input || !output) return;

  const COMMANDS = {
    help: `
Commandes disponibles :
  <span class="cyber-highlight">about</span>        : Biographie et présentation de Gabriel Vane Batie
  <span class="cyber-highlight">skills</span>       : Liste des compétences clés (Design, Cyber, Tech)
  <span class="cyber-highlight">projects</span>     : Aperçu des 5 projets récents
  <span class="cyber-highlight">vision</span>       : Le manifeste Futuristic Cyber Africa
  <span class="cyber-highlight">contact</span>      : Coordonnées et réseaux officiels
  <span class="cyber-highlight">python</span>       : Stack Python & environnements
  <span class="cyber-highlight">angrylörd</span>    : Message de sécurité d'Angrylörd Sécurity
  <span class="cyber-highlight">cv</span>           : Télécharger le CV
  <span class="cyber-highlight">clear</span>        : Effacer l'écran du terminal
`,
    about: `
<span class="purple">VANE BATIE Gabriel</span> — Fondateur & Creative Lead d'Angrylörd Sécurity.
Basé à <span class="cyber-highlight">Libreville, Gabon 🇬🇦</span>.
Je combine design futuriste, rigueur technique et pédagogie pour rendre la cybersécurité accessible, moderne et impactante sur le continent africain.
`,
    skills: `
<span class="cyber-highlight">🎨 Création & Design</span> : Logo design, Infographies, Motion, PPT Modernes, Style Cyber Africa.
<span class="purple">🛡️ Cybersécurité & Éducation</span> : Vulgarisation, Modules de formation, Images réalistes, Branding cyber.
<span class="success">💻 Technique</span> : Environnements Python (PC & Android), Documents techniques, Structuration TP.
`,
    projects: `
1. <span class="cyber-highlight">Angrylörd Sécurity</span> — Identité visuelle & Branding complet.
2. <span class="cyber-highlight">Présentation PPT</span> — “IA dans l’éducation africaine” (8 slides).
3. <span class="cyber-highlight">TP & Rapport</span> — IA appliquée aux jeux vidéo (Rapport + PPT).
4. <span class="cyber-highlight">Modules visuels</span> — Sécurité des frontières & exercices réalistes.
5. <span class="cyber-highlight">Support & Outils</span> — Environnements Python, VPN P2P, optimisation OS.
`,
    vision: `
<span class="purple">“Je veux bâtir une identité cyber africaine forte, moderne, futuriste et accessible.”</span>
Angrylörd Sécurity est une mission pour éduquer, protéger, inspirer et valoriser la cybersécurité en Afrique.
`,
    contact: `
📍 <span class="cyber-highlight">Libreville, Gabon</span>
📧 Email : <span class="cyber-highlight">contact.vanebatie@angrylord.sec</span> (ou formulaire ci-dessous)
📱 WhatsApp / Telegram : Accessible via les boutons de contact
`,
    python: `
[✓] Python 3.12 (Windows 11 x64)
[✓] Python & Termux (Android Mobile Environment)
[✓] Scripts d'automatisation & utilitaires d'audit
[✓] Notebooks & analyses pédagogiques
`,
    angrylörd: `
<pre style="color: var(--neon-purple-bright); font-size: 0.75rem;">
  ___                            _                   _ 
 / _ \\                          | |                 | |
/ /_\\ \\_ __   __ _ _ __ _   _  | |     ___  _ __ __| |
|  _  | '_ \\ / _\` | '__| | | | | |    / _ \\| '__/ _\` |
| | | | | | | (_| | |  | |_| | | |___| (_) | | | (_| |
\\_| |_/_| |_|\\__, |_|   \\__, | \\_____/\\___/|_|  \\__,_|
              __/ |      __/ |                         
             |___/      |___/                          
</pre>
<span class="success">Statut opérationnel : 100% Cyber Africa Shield Activé.</span>
`,
    clear: ''
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = input.value.trim();
      const cmd = rawCmd.toLowerCase();
      input.value = '';

      if (cmd === 'clear') {
        output.innerHTML = '';
        return;
      }

      const line = document.createElement('div');
      line.className = 'terminal-line';
      line.innerHTML = `<span class="terminal-prompt">gabriel@cyber-africa:~$</span> ${rawCmd}`;
      output.appendChild(line);

      const resp = document.createElement('div');
      resp.className = 'terminal-line';

      if (cmd === '') {
        // Ne rien faire
      } else if (COMMANDS[cmd]) {
        resp.innerHTML = COMMANDS[cmd];
        output.appendChild(resp);
      } else if (cmd === 'cv') {
        resp.innerHTML = `<span class="success">Téléchargement du CV de Gabriel Vane Batie en cours...</span>`;
        output.appendChild(resp);
        triggerCVDownload();
      } else {
        resp.innerHTML = `<span style="color: var(--cyber-red);">Commande inconnue: "${rawCmd}". Tapez <span class="cyber-highlight">help</span> pour la liste.</span>`;
        output.appendChild(resp);
      }

      output.scrollTop = output.scrollHeight;
    }
  });
}

/* ==========================================================================
   6. FORMULAIRE DE CONTACT & TOAST NOTIFICATIONS
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Chiffrement & Envoi...`;

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
      form.reset();
      showToast("Message chiffré transmis avec succès à Gabriel Vane Batie !");
    }, 1200);
  });
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fas fa-check-circle toast-icon"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* ==========================================================================
   7. GESTIONNAIRE DE TÉLÉCHARGEMENT CV
   ========================================================================== */
function initCVDownload() {
  const cvButtons = document.querySelectorAll('[data-action="download-cv"]');
  cvButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerCVDownload();
    });
  });
}

function triggerCVDownload() {
  showToast("Génération de la fiche profil & CV synthétique de Gabriel Vane Batie...");
  
  const cvContent = `====================================================================
VANE BATIE GABRIEL — CURRICULUM VITAE SYNTHÉTIQUE
Fondateur & Creative Lead — Angrylörd Sécurity
Localisation : Libreville, Gabon
====================================================================

PROFIL PROFESSIONNEL :
Créatif et passionné de cybersécurité, je conçois des identités visuelles 
puissantes, des supports pédagogiques modernes et des contenus techniques
pour renforcer la culture cyber en Afrique.

PÔLES D'EXPERTISE :
1. CRÉATION & DESIGN
   - Logo Design & Branding Cyber Africa (Bleu électrique + Violet néon)
   - Infographies, Iconographies, Motion Design
   - Présentations PowerPoint Modernes & Data-design

2. CYBERSÉCURITÉ & ÉDUCATION
   - Vulgarisation des concepts cyber
   - Création de modules de formation et supports d'entraînement
   - Production d'images réalistes pour la formation tactique
   - Construction d'identités visuelles pour structures cyber

3. TECHNIQUE & SYSTÈMES
   - Mise en place d'environnements Python (PC Windows & Android Termux)
   - Rédaction de documents techniques, TP et rapports
   - Optimisation logicielle, dépannage et protocoles VPN P2P

PROJETS MAJEURS :
- Angrylörd Sécurity : Identité visuelle et branding complet
- Présentation “IA dans l’éducation africaine” (8 slides stratégiques)
- TP : IA appliquée aux jeux vidéo (Rapport + Diaporama)
- Images Réalistes pour l'entraînement à la sécurité des frontières
- Déploiement et sécurisation d'environnements Python & outils systèmes

CONTACT :
Libreville, Gabon
Angrylörd Sécurity — https://angrylord.sec
====================================================================`;

  const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'CV_VANE_BATIE_Gabriel_Angrylord_Security.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
