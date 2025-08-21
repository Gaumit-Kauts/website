// --- Theme: respect system preference, allow toggling, and persist
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if(saved){ root.classList.toggle('light', saved === 'light'); }
    else { root.classList.toggle('light', prefersLight); }

    document.getElementById('themeToggle').addEventListener('click', () =>{
      root.classList.toggle('light');
      localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
    });

    // --- Mobile drawer
    const drawer = document.getElementById('drawer');
    const openBtn = document.getElementById('openMenu');
    const closeBtn = document.getElementById('closeMenu');
    const setDrawer = (open)=>{
      drawer.classList.toggle('hidden', !open);
      drawer.setAttribute('aria-hidden', String(!open));
      openBtn.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    }
    openBtn?.addEventListener('click', ()=> setDrawer(true));
    closeBtn?.addEventListener('click', ()=> setDrawer(false));
    drawer?.addEventListener('click', (e)=>{ if(e.target === drawer) setDrawer(false); });

    // --- resume download (replace href with your PDF path)
    const resumeUrl = 'resume.pdf'; // put your real file in the same folder
    const clickResume = ()=>{
      if(resumeUrl === 'resume.pdf') 
      window.location.href = "https://drive.google.com/file/d/1OX7nKRLWUqtGp90-Mjfg5EQygs-IvxRj/view?usp=drive_link";
    }
    document.getElementById('resumeBtn').addEventListener('click', (e)=>{ e.preventDefault(); clickResume(); });
    document.getElementById('resumeBtnMobile').addEventListener('click', (e)=>{ e.preventDefault(); clickResume(); });

    // --- Projects: edit here
    const projects = [
      {
        
        title: 'Amazon Product Recommendation System',
        desc: 'Developed and evaluated recommendation algorithms on Amazon product reviews to deliver personalized suggestions. Built a robust engine that enhances user experience and drives customer engagement.',
        tech: ['Python','Surprise Library','Grid Search CV','Matplotlib','Seaborn'],
        links: [{label:'Github', href:'https://github.com/Gaumit-Kauts/Amazon-Product-Recommendation-System.git'}]
      },
      {
        title: 'FoodHub Data Analysis',
        desc: 'Data cleaning & analysis on NYC restaurant orders; actionable insights with pandas and Matplotlib.',
        tech: ['Python','Pandas','Matplotlib','Seaborn'],
        links: [{label:'Github', href:'https://github.com/Gaumit-Kauts/FoodHub-Data-Analysis.git'}]
      },
      {
        title: 'EduLead Optimizer',
        desc: 'Built ML models to predict which leads are most likely to convert, and uncovered key factors driving customer acquisition. Created detailed lead profiles to help ExtraaLearn target high-potential prospects effectively.',
        tech: ['Scikit-Learn','Python'],
        links: [{label:'Github', href:'https://github.com/Gaumit-Kauts/EduLeadOptimizer.git'}]
      },
      {
        title: 'Airplane Booking System',
        desc: 'uilt a full-stack flight management platform with SQL + PHP backend and a responsive HTML, CSS, JS frontend. Designed robust ER/EER models, implemented secure database transactions, and created an intuitive interface for booking, managing, and disputing flights, delivering a seamless and reliable user experience.',
        tech: ['HTML', 'CSS', 'JavaScript','SQL', 'PHP'],
        links: [{label:'Github', href:'https://github.com/Gaumit-Kauts/AirPlane-Booking-System.git'}]
      }
    ];

    const certifications = [
      {
        title: 'DATA SCIENCE AND MACHINE LEARNING: MAKING DATA-DRIVEN DECISIONS',
        issuer: 'MIT Schwarzman College of Computing',
        issued: 'September,2024',
        skills: ["Machine Learning Algorithms", "Data Science", "Artificial Intelligence" ,"Linear Algebra","Statistics","Data Analysis"],
        credentialUrl: 'https://www.mygreatlearning.com/certificate/EHPHYRMX'
      },
    ];
    const grid = document.getElementById('projectGrid');
    const card = (p)=> `
      <article class="card reveal">
        <div class="thumb" role="img" aria-label="${p.title}"></div>
        <div class="card-body">
          
          <h3>${p.title}</h3>
          <div class="meta">${p.tech.join(' • ')}</div>
          <p class="subtitle">${p.desc}</p>
          <div class="actions">
            ${p.links.map(l=>`<a class="btn" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`).join('')}
          </div>
        </div>
      </article>`;
    grid.innerHTML = projects.map(card).join('');
    
    //for certifications
    const certgrid = document.getElementById('certification_grid')
    const certCard = (c) => `
      <article class="card reveal">
        <div class="thumb">
          
        </div>
        <div class="card-body">
          <h3>${c.title}</h3>
          <div class="cert-line">
            ${c.issuer} • ${c.issued}
          </div>
          ${c.skills?.length ? `<div class="meta" style="margin-top:6px">${c.skills.join(' • ')}</div>` : ``}
          <div class="actions">
            ${c.credentialUrl ? `<a class="btn" href="${c.credentialUrl}" target="_blank" rel="noopener">Credentials</a>` : ``}
          </div>
        </div>
      </article>
    `
    certgrid.innerHTML = certifications.map(certCard).join('');
    // --- Reveal on scroll
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold:.12 });
    document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

    // --- Year
    document.getElementById('year').textContent = new Date().getFullYear();