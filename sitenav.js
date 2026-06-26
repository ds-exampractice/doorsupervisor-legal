(function () {
  if (customElements.get('site-nav')) return;

  const THEMES = {
    dark:  { '--bg':'#0a0e1a','--bg-soft':'#0e1322','--bg-elev':'#131a2c','--panel':'rgba(255,255,255,0.03)','--border':'rgba(255,255,255,0.09)','--border-strong':'rgba(255,255,255,0.17)','--text':'#eef1f7','--text-mut':'#9aa4ba','--text-dim':'#7a859c','--accent':'#5c8fd6','--accent-strong':'#79a6e6','--accent-soft':'rgba(92,143,214,0.13)','--shadow':'0 24px 60px -28px rgba(0,0,0,0.75)','--grid':'rgba(255,255,255,0.045)' },
    light: { '--bg':'#f5f6f9','--bg-soft':'#ffffff','--bg-elev':'#ffffff','--panel':'rgba(16,24,40,0.015)','--border':'rgba(16,24,40,0.10)','--border-strong':'rgba(16,24,40,0.20)','--text':'#111726','--text-mut':'#3d4d66','--text-dim':'#5e6b82','--accent':'#2f5fa3','--accent-strong':'#1e4d8a','--accent-soft':'rgba(47,95,163,0.07)','--shadow':'0 20px 44px -26px rgba(16,24,40,0.32)','--grid':'rgba(16,24,40,0.05)' }
  };

  function applyTheme(name) {
    const v = THEMES[name] || THEMES.dark;
    const r = document.documentElement;
    for (const k in v) r.style.setProperty(k, v[k]);
    r.style.colorScheme = name === 'light' ? 'light' : 'dark';
    r.style.background = v['--bg'];
  }

  // Home | Training Quizzes | Learn the Jobs | Contact
  const ITEMS = [
    { k:'home',    label:'Home',             href:'index.html' },
    { k:'quiz',    label:'Training Quizzes', href:'quiz_hub.html' },
    { k:'roles',   label:'Learn the Jobs',   href:'learn_the_job.html' },
    { k:'contact', label:'Contact',          href:'contact.html' }
  ];

  const CSS = `
    :host { display: block; }
    * { box-sizing: border-box; }
    a { text-decoration: none; transition: color .2s; }
    header { position: sticky; top: 0; z-index: 1000; }
    @media (max-width: 880px) {
      header { transition: transform .3s ease; }
      header.sn-hidden { transform: translateY(-100%); }
    }
    .sn-link { padding-bottom:3px; border-bottom:1.5px solid transparent; transition:color .2s,border-color .2s; }
    .sn-link:hover, .sn-link.act { color: var(--text) !important; }
    .sn-link.act { border-bottom-color: var(--accent) !important; }
    .sn-mob-link:hover { color: var(--text) !important; }
    .sn-ibtn { transition: border-color .2s; }
    .sn-ibtn:hover { border-color: var(--border-strong) !important; }
    .sn-cta { transition: transform .2s,box-shadow .2s; }
    .sn-cta:hover { transform: translateY(-1px); }
  `;

  class SiteNav extends HTMLElement {
    connectedCallback() {
      if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
      applyTheme(localStorage.getItem('ds-theme') || 'dark');
      this._narrow = window.innerWidth < 880;
      this._menuOpen = false;
      this._render();
      this._onResize = () => {
        const n = window.innerWidth < 880;
        if (n !== this._narrow) { this._narrow = n; if (!n) this._menuOpen = false; this._render(); }
      };
      window.addEventListener('resize', this._onResize);
    }
    disconnectedCallback() { window.removeEventListener('resize', this._onResize); }

    _toggleTheme() {
      const next = (localStorage.getItem('ds-theme') || 'dark') === 'dark' ? 'light' : 'dark';
      localStorage.setItem('ds-theme', next);
      applyTheme(next);
      this._render();
    }
    _toggleMenu() { this._menuOpen = !this._menuOpen; this._render(); }

    _themeIcon() {
      const dark = (localStorage.getItem('ds-theme') || 'dark') === 'dark';
      return dark
        ? `<span style="position:relative;width:17px;height:17px;display:block"><span style="position:absolute;inset:0;border-radius:50%;background:var(--text)"></span><span style="position:absolute;top:-3px;right:-3px;width:14px;height:14px;border-radius:50%;background:var(--bg-elev)"></span></span>`
        : `<span style="width:14px;height:14px;border-radius:50%;background:var(--text);box-shadow:0 0 0 3px color-mix(in srgb,var(--text) 22%,transparent)"></span>`;
    }

    _render() {
      const active = this.getAttribute('active') || 'home';
      const n = this._narrow;
      const icon = this._themeIcon();

      const inlineLinks = ITEMS.map(it =>
        `<a href="${it.href}" class="sn-link${active===it.k?' act':''}" style="color:${active===it.k?'var(--text)':'var(--text-mut)'};font-size:14px;font-weight:500;letter-spacing:.005em;border-bottom-color:${active===it.k?'var(--accent)':'transparent'}">${it.label}</a>`
      ).join('');

      const mobLinks = ITEMS.map(it =>
        `<a href="${it.href}" class="sn-mob-link" style="display:block;color:${active===it.k?'var(--text)':'var(--text-mut)'};font-size:16px;font-weight:500;padding:16px 0;border-bottom:1px solid var(--border)">${it.label}</a>`
      ).join('');

      const themeBtn = (id) =>
        `<button id="${id}" class="sn-ibtn" aria-label="Toggle theme" style="width:42px;height:42px;border-radius:10px;border:1px solid var(--border);background:var(--bg-elev);cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0">${icon}</button>`;

      const ctaLink = `<a href="https://play.google.com/store/apps/details?id=com.saabbventures.dsexampractice" target="_blank" rel="noopener" class="sn-cta" style="display:inline-flex;align-items:center;gap:8px;background:var(--accent);color:#fff;font-weight:600;font-size:13.5px;padding:10px 18px;border-radius:10px;letter-spacing:.01em;box-shadow:0 8px 22px -10px var(--accent)">Get the App</a>`;

      const drawer = this._menuOpen ? `
        <div style="border-top:1px solid var(--border);background:var(--bg-soft);padding:8px 24px 20px">
          ${mobLinks}
          <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--border);display:flex;align-items:stretch;gap:12px">
            <button id="sn-t2" class="sn-ibtn" aria-label="Toggle theme" style="width:50px;min-width:50px;flex:none;border-radius:10px;border:1px solid var(--border);background:var(--bg-elev);cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0">${icon}</button>
            <a href="https://play.google.com/store/apps/details?id=com.saabbventures.dsexampractice" target="_blank" rel="noopener" style="flex:1;min-width:0;display:flex;align-items:center;justify-content:center;gap:8px;background:var(--accent);color:#fff;font-weight:600;font-size:15px;padding:14px 18px;border-radius:10px;box-shadow:0 8px 22px -10px var(--accent)">Get the App</a>
          </div>
        </div>` : '';

      this.shadowRoot.innerHTML = `
        <style>${CSS}</style>
        <header style="background:color-mix(in srgb,var(--bg) 82%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--border)">
          <div style="max-width:1200px;margin:0 auto;padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between;gap:16px">
            <a href="index.html" style="display:flex;align-items:center;gap:12px;flex:none">
              <img src="ic_launcher.png" alt="Door Supervisor Exam Practice" style="width:38px;height:38px;border-radius:10px;display:block;box-shadow:0 4px 14px -4px rgba(0,0,0,.5)">
              <span style="display:flex;flex-direction:column;line-height:1.05">
                <span style="font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;color:var(--text);letter-spacing:-.01em;white-space:nowrap">Door Supervisor</span>
                <span style="font-family:'Space Mono',monospace;font-size:9.5px;letter-spacing:.22em;color:var(--text-dim);text-transform:uppercase;margin-top:2px">Exam Practice</span>
              </span>
            </a>
            ${!n ? `<nav style="display:flex;align-items:center;gap:30px">${inlineLinks}</nav>` : ''}
            <div style="display:flex;align-items:center;gap:10px;flex:none">
              ${!n ? themeBtn('sn-t1') + ctaLink : `<button id="sn-menu" aria-label="${this._menuOpen?'Close':'Open'} menu" style="width:44px;height:44px;border-radius:10px;border:1px solid var(--border);background:var(--bg-elev);cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;flex:none"><svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="20" height="2" rx="1" fill="var(--text)"/><rect x="0" y="6" width="20" height="2" rx="1" fill="var(--text)"/><rect x="0" y="12" width="20" height="2" rx="1" fill="var(--text)"/></svg></button>`}
            </div>
          </div>
          ${drawer}
        </header>`;

      const t1 = this.shadowRoot.getElementById('sn-t1'); if (t1) t1.onclick = () => this._toggleTheme();
      const t2 = this.shadowRoot.getElementById('sn-t2'); if (t2) t2.onclick = () => this._toggleTheme();
      const mb = this.shadowRoot.getElementById('sn-menu'); if (mb) mb.onclick = () => this._toggleMenu();

      // Mobile: hide on scroll down, reveal on scroll up
      if (!this._scrollBound) {
        this._lastY = window.scrollY;
        this._onScroll = () => {
          if (window.innerWidth >= 880) return;
          const hdr = this.shadowRoot.querySelector('header');
          if (!hdr) return;
          const y = window.scrollY;
          if (y > this._lastY + 4 && y > 80) hdr.classList.add('sn-hidden');
          else if (y < this._lastY - 4) hdr.classList.remove('sn-hidden');
          this._lastY = y;
        };
        window.addEventListener('scroll', this._onScroll, { passive: true });
        this._scrollBound = true;
      }
    }
  }

  customElements.define('site-nav', SiteNav);
})();
