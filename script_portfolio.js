// Safe query helpers (avoid crashes if element is missing)
const $  = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ==============================
// 1) Theme: respect system pref, allow toggle, and persist
// ==============================

const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

// Apply saved theme, else apply system preference
root.classList.toggle('light', savedTheme ? savedTheme === 'light' : prefersLight);

// Hook up the theme toggle button (if present)
const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  });
}

// ==============================
// 2) Mobile drawer (off-canvas nav)
// ==============================

const drawer   = document.getElementById('drawer');
const openBtn  = document.getElementById('openMenu');   // "☰" button
const closeBtn = document.getElementById('closeMenu');  // "✕" button

// Open/close drawer and handle accessibility + body scroll lock
const setDrawer = (open) => {
  if (!drawer || !openBtn) return;
  drawer.classList.toggle('hidden', !open);
  drawer.setAttribute('aria-hidden', String(!open));
  openBtn.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
};

openBtn  && openBtn.addEventListener('click', () => setDrawer(true));
closeBtn && closeBtn.addEventListener('click', () => setDrawer(false));

// Click on the backdrop area (the aside itself) closes the drawer
drawer && drawer.addEventListener('click', (e) => {
  if (e.target === drawer) setDrawer(false);
});

// ==============================
// 3) Resume: open your hosted PDF
// ==============================

const resumeUrl = 'https://drive.google.com/file/d/1RykcDERmNFAq_len-LcWDOMNsiLPxLSn/view?usp=sharing';

const clickResume = () => {
  window.location.href = resumeUrl;
};

const resumeBtn        = document.getElementById('resumeBtn');
const resumeBtnMobile  = document.getElementById('resumeBtnMobile');

resumeBtn       && resumeBtn.addEventListener('click', (e) => { e.preventDefault(); clickResume(); });
resumeBtnMobile && resumeBtnMobile.addEventListener('click', (e) => { e.preventDefault(); clickResume(); });

// ==============================
// 4) Data (Projects, Coursework, Certifications)
// ==============================

const projects = [
  {
    title: 'Amazon Product Recommendation System',
    desc: 'Developed and evaluated recommendation algorithms on Amazon product reviews to deliver personalized suggestions. Built a robust engine that enhances user experience and drives customer engagement.',
    tech: ['Python','Surprise Library','Grid Search CV','Matplotlib','Seaborn'],
    links: [{ label:'Github', href:'https://github.com/Gaumit-Kauts/Amazon-Product-Recommendation-System.git' }]
  },
  {
    title: 'FoodHub Data Analysis',
    desc: 'Data cleaning & analysis on NYC restaurant orders; actionable insights with pandas and Matplotlib.',
    tech: ['Python','Pandas','Matplotlib','Seaborn'],
    links: [{ label:'Github', href:'https://github.com/Gaumit-Kauts/FoodHub-Data-Analysis.git' }]
  },
  {
    title: 'EduLead Optimizer',
    desc: 'Built ML models to predict which leads are most likely to convert, and uncovered key factors driving customer acquisition. Created detailed lead profiles to help ExtraaLearn target high-potential prospects effectively.',
    tech: ['Scikit-Learn','Python'],
    links: [{ label:'Github', href:'https://github.com/Gaumit-Kauts/EduLeadOptimizer.git' }]
  },
  {
    title: 'Airplane Booking System',
    desc: 'Built a full-stack flight management platform with SQL + PHP backend and a responsive HTML, CSS, JS frontend. Designed robust ER/EER models, implemented secure database transactions, and created an intuitive interface for booking, managing, and disputing flights.',
    tech: ['HTML', 'CSS', 'JavaScript','SQL', 'PHP'],
    links: [{ label:'Github', href:'https://github.com/Gaumit-Kauts/AirPlane-Booking-System.git' }]
  }

];

const coursework = [
  {
  title: 'Scalable Data Analytics',
  desc: 'Learning distributed and big-data technologies including Hadoop, PySpark, Airflow, MySQL, NoSQL databases, and data-lake architectures for large-scale data processing and analytics.',
  tech: ['Hadoop', 'PySpark', 'Airflow', 'MySQL', 'NoSQL', 'Data Lakes']
},
{
  title: 'Deep Learning',
  desc: 'Learning and implementing supervised learning techniques and diverse neural network architectures. Applying deep learning to classify text and image data, exploring optimization algorithms, and using TensorFlow, PyTorch, and core Python libraries for advanced model development.',
  tech: [
    'Supervised Learning',
    'Neural Network Architectures',
    'Text & Image Classification',
    'Optimization Algorithms',
    'TensorFlow',
    'PyTorch',
    'NumPy',
    'Pandas',
    'scikit-learn'
  ]
},

  {
    title: 'Data Structures and Algorithms',
    desc: 'Covered arrays, linked lists, stacks, queues, hash maps, trees, and graphs. Implemented sorting, searching, and traversal algorithms while analyzing complexity and problem-solving strategies.',
    tech: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Hash Maps', 'Algorithms']
  },
  {
    title: 'Principles of Software Development',
    desc: 'Learned object-oriented programming principles (encapsulation, inheritance, polymorphism, abstraction) in Java. Applied OOP concepts to build structured, maintainable, and reusable software.',
    tech: ['Java', 'OOP', 'Design Principles', 'Encapsulation', 'Inheritance', 'Polymorphism']
  },
  {
    title: 'Operating Systems',
    desc: 'Implemented process scheduling and memory management algorithms (FIFO, page replacement). Gained hands-on experience coding in Java and C to simulate OS internals such as threads and synchronization.',
    tech: ['Java', 'C', 'Threading', 'Process Scheduling', 'Memory Management']
  },
  {
    title: 'Computer Networks',
    desc: 'Studied network layers, architectures, and protocols. Implemented client-server programming in Python and coded network protocols to understand real-world communication systems.',
    tech: ['Python', 'TCP/IP', 'UDP', 'Socket Programming', 'HTTP', 'Networking Protocols']
  },
  {
    title: 'Database Management Systems',
    desc: 'Explored relational design, schema constraints (primary/foreign keys), and SQL. Built CRUD operations and connected MySQL to backend services using PHP and JavaScript.',
    tech: ['MySQL', 'SQL', 'JavaScript', 'PHP', 'HTML', 'CSS']
  },
  {
    title: 'Software Testing, Reliability and Quality',
    desc: 'Learned unit, integration, and regression testing. Practiced automation with Pytest, Selenium, and Java testing frameworks, focusing on QA, reliability, and defect tracking.',
    tech: ['Pytest', 'Selenium', 'JUnit', 'Regression Testing', 'Unit Testing', 'QA']
  },
  {
    title: 'Embedded Systems',
    desc: 'Programmed microcontrollers in Embedded C using PIC16KF. Designed projects demonstrating peripheral control, UART communication, and processor-level functionality.',
    tech: ['Embedded C', 'PIC16KF Microcontroller', 'UART', 'PWM', 'Hardware Debugging']
  },
  {
    title: 'Software Project Management',
    desc: 'Explored Agile, Waterfall, and Scrum methodologies. Applied Microsoft Project for scheduling and tracking, resource allocation, and team collaboration exercises.',
    tech: ['Agile', 'Scrum', 'Waterfall', 'MS Project', 'Teamwork', 'Resource Management']
  }
];


const certifications = [
  {
    title: 'DATA SCIENCE AND MACHINE LEARNING: MAKING DATA-DRIVEN DECISIONS',
    issuer: 'MIT Schwarzman College of Computing',
    issued: 'September, 2024',
    skills: ['Machine Learning Algorithms', 'Data Science', 'Artificial Intelligence' ,'Linear Algebra','Statistics','Data Analysis'],
    credentialUrl: 'https://www.mygreatlearning.com/certificate/EHPHYRMX'
  }
];

// ==============================
// 5) Renderers (pure functions → HTML strings)
// ==============================

// One project card
const projectCard = (p) => `
  <article class="card reveal">
    <div class="thumb" role="img" aria-label="${p.title}"></div>
    <div class="card-body">
      <h3>${p.title}</h3>
      <div class="meta">${p.tech.join(' • ')}</div>
      <p class="subtitle">${p.desc}</p>
      <div class="actions">
        ${p.links.map(l => `<a class="btn" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`).join('')}
      </div>
    </div>
  </article>
`;

// One certification card
const certCard = (c) => `
  <article class="card reveal">
    <div class="thumb"></div>
    <div class="card-body">
      <h3>${c.title}</h3>
      <div class="cert-line">${c.issuer} • ${c.issued}</div>
      ${c.skills?.length ? `<div class="meta" style="margin-top:6px">${c.skills.join(' • ')}</div>` : ''}
      <div class="actions">
        ${c.credentialUrl ? `<a class="btn" href="${c.credentialUrl}" target="_blank" rel="noopener">Credentials</a>` : ''}
      </div>
    </div>
  </article>
`;

// One coursework card
const courseCard = (cw) => `
  <article class="card reveal">
    <div class="thumb" role="img" aria-label="${cw.title}"></div>
    <div class="card-body">
      <h3>${cw.title}</h3>
      <div class="meta">${cw.tech.join(' • ')}</div>
      <p class="subtitle">${cw.desc}</p>
    </div>
  </article>
`;

// ==============================
// 6) Mount to the DOM (only if sections exist)
// ==============================

const projectGrid = document.getElementById('projectGrid');
projectGrid && (projectGrid.innerHTML = projects.map(projectCard).join(''));

const certGrid = document.getElementById('certification_grid');
certGrid && (certGrid.innerHTML = certifications.map(certCard).join(''));

const courseGrid = document.getElementById('course_grid');
courseGrid && (courseGrid.innerHTML = coursework.map(courseCard).join(''));

// ==============================
// 7) Reveal-on-scroll (IntersectionObserver)
// ==============================

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    io.unobserve(entry.target);
  });
}, { threshold: 0.12 });

// Observe any .reveal elements that are present
$$('.reveal').forEach((el) => io.observe(el));

// ==============================
// 8) Footer year
// ==============================

const yearEl = document.getElementById('year');
yearEl && (yearEl.textContent = new Date().getFullYear());

