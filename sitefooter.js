(function () {
  if (customElements.get('site-footer')) return;

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      if (this.shadowRoot) return;
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          :host { display: block; }
          * { box-sizing: border-box; }
          a { text-decoration: none; color: var(--text-mut); font-size: 14px; transition: color .18s; }
          a:hover { color: var(--text) !important; }
          .brand-link { color: var(--accent-strong) !important; font-size: 13.5px; font-weight: 600; display: inline-flex; align-items: center; gap: 7px; margin: 0 0 16px; transition: gap .2s; }
          .brand-link:hover { gap: 10px !important; }
        </style>
        <footer style="background:var(--bg-soft);border-top:1px solid var(--border);color:var(--text-mut);font-family:'Hanken Grotesk',sans-serif">
          <div style="max-width:1200px;margin:0 auto;padding:56px 24px 28px">
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr));gap:40px 32px">

              <div style="max-width:300px">
                <div style="display:flex;align-items:center;gap:11px;margin-bottom:16px">
                  <img src="ic_launcher.png" alt="Logo" style="width:40px;height:40px;border-radius:10px;display:block">
                  <span style="font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;color:var(--text);line-height:1.2">Door Supervisor<br>Exam Practice</span>
                </div>
                <p style="font-size:13.5px;line-height:1.65;margin:0 0 14px">A serious, explanation-led study tool for SIA Door Supervisor candidates across the UK. Independent of and unaffiliated with the SIA.</p>
                <a href="learn_the_job.html" class="brand-link">Learn the Jobs <span style="font-size:14px;line-height:1">&#8594;</span></a>
                <p style="font-size:12px;color:var(--text-dim);margin:0">&#169; 2026 SAABB Ventures (Pvt) Ltd.<br>All rights reserved.</p>
              </div>

              <div>
                <div style="font-family:'Space Mono',monospace;font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--text-dim);margin-bottom:16px">Legal</div>
                <div style="display:flex;flex-direction:column;gap:11px">
                  <a href="privacy_policy.html">Privacy Policy</a>
                  <a href="terms_and_conditions.html">Terms &amp; Conditions</a>
                  <a href="data_deletion.html">Data Deletion</a>
                </div>
              </div>

              <div>
                <div style="font-family:'Space Mono',monospace;font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--text-dim);margin-bottom:16px">Support</div>
                <div style="display:flex;flex-direction:column;gap:11px">
                  <a href="contact.html">Contact Us</a>
                  <a href="mailto:info@doorsupervisorexam.co.uk" style="color:var(--text-mut);text-decoration:none;font-size:14px;word-break:break-all" style-hover="color:var(--text)">info@doorsupervisorexam.co.uk</a>
                  <a href="mailto:ds.exampractice@gmail.com" style="color:var(--text-mut);text-decoration:none;font-size:14px;word-break:break-all" style-hover="color:var(--text)">ds.exampractice@gmail.com</a>
                </div>
              </div>

              <div>
                <div style="font-family:'Space Mono',monospace;font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--text-dim);margin-bottom:16px">Get the App</div>
                <p style="font-size:13.5px;line-height:1.6;margin:0 0 16px">1,300+ exam-style questions. Explanations, mentor tips, and progress tracking across all four SIA modules.</p>
                <a href="https://play.google.com/store/apps/details?id=com.saabbventures.dsexampractice" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;background:var(--accent);color:#fff !important;font-weight:600;font-size:13.5px;padding:11px 18px;border-radius:10px;box-shadow:0 8px 22px -10px var(--accent)">Google Play &#8594;</a>
              </div>

            </div>
            <div style="border-top:1px solid var(--border);margin-top:44px;padding-top:22px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px">
              <p style="font-size:12px;color:var(--text-dim);margin:0;max-width:640px;line-height:1.6">This application is an independent study tool. Questions are authored against the official SIA syllabus — not derived from actual exam papers. Not affiliated with or endorsed by the Security Industry Authority.</p>
            </div>
          </div>
        </footer>`;
    }
  }

  customElements.define('site-footer', SiteFooter);
})();
