import"./auth-C3x3DcjY.js";import"./main-BhGFCTzb.js";import{b as g,v as p}from"./firestore-eDyhnHo-.js";let d=[],l="All";const y=["All","Advocates","Judges","Journalists","Doctors","Teachers","Politicians","Businessmen","Engineers","Government Officers","Social Workers","Artists","Students","Writers","Religious Scholars","Sports Personalities"];document.addEventListener("DOMContentLoaded",async()=>{document.getElementById("personalities-grid")&&(f(),u(),d=await g(),c())});function f(){const r=document.getElementById("directory-category-tabs");r&&(r.innerHTML=y.map(o=>`
    <button class="filter-btn ${o===l?"active":""}" data-cat="${o}">
      ${o}
    </button>
  `).join(""),r.querySelectorAll(".filter-btn").forEach(o=>{o.addEventListener("click",a=>{l=a.target.getAttribute("data-cat"),r.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("active")),a.target.classList.add("active"),c()})}))}function u(){const r=document.getElementById("directory-search-input");r&&r.addEventListener("input",()=>{c()})}function c(){const r=document.getElementById("personalities-grid"),o=document.getElementById("directory-search-input"),a=o?o.value.trim().toLowerCase():"";if(!r)return;let e=d;if(l!=="All"&&(e=e.filter(t=>t.category&&t.category.toLowerCase()===l.toLowerCase())),a&&(e=e.filter(t=>{const n=t.fullName&&t.fullName.toLowerCase().includes(a),s=t.designation&&t.designation.toLowerCase().includes(a),m=t.biography&&t.biography.toLowerCase().includes(a);return n||s||m})),e.length===0){r.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <p style="font-size: 1.1rem; font-weight: 700; color: var(--text-muted);">No personalities found matching your search.</p>
        <p style="font-size: 0.85rem; color: var(--text-light); margin-top: 0.5rem;">Try selecting a different category or clearing your search term.</p>
      </div>
    `;return}r.innerHTML=e.map(t=>`
    <div class="personality-card">
      <img src="${t.photo}" alt="${i(t.fullName)}" class="personality-avatar" loading="lazy" />
      <span class="badge badge-blue" style="font-size: 0.7rem;">${i(t.category)}</span>
      <h3 class="personality-name">${i(t.fullName)}</h3>
      <div class="personality-role">${i(t.designation)}</div>
      <p style="font-size: 0.85rem; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.5;">
        ${i(t.biography||"Prominent personality of Jacobabad district.")}
      </p>
      <button class="btn btn-secondary view-profile-btn" data-id="${t.id}" style="width: 100%; margin-top: auto; font-size: 0.85rem; padding: 0.5rem;">
        View Full Profile &rarr;
      </button>
    </div>
  `).join(""),r.querySelectorAll(".view-profile-btn").forEach(t=>{t.addEventListener("click",n=>{const s=n.target.getAttribute("data-id");v(s)})})}async function v(r){const o=document.getElementById("personality-modal"),a=document.getElementById("personality-modal-body");if(!o||!a)return;a.innerHTML='<p class="text-center" style="padding: 2rem;">Loading profile...</p>',o.classList.remove("hidden");const e=await p(r);if(!e){a.innerHTML='<p class="text-center" style="padding: 2rem;">Profile not found.</p>';return}const t=Array.isArray(e.gallery)&&e.gallery.length>0?`
    <div style="margin-top: 1.5rem;">
      <h4 style="font-family: var(--font-heading); font-size: 1rem; margin-bottom: 0.75rem;">Photo Gallery</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 0.5rem;">
        ${e.gallery.map(s=>`<img src="${s}" style="width: 100%; height: 90px; object-fit: cover; border-radius: 6px;" />`).join("")}
      </div>
    </div>
  `:"";a.innerHTML=`
    <div style="text-align: center; margin-bottom: 1.5rem;">
      <img src="${e.photo}" alt="${i(e.fullName)}" style="width: 130px; height: 130px; border-radius: 50%; object-fit: cover; border: 4px solid var(--primary); margin: 0 auto 1rem auto;" />
      <span class="badge badge-red" style="margin-bottom: 0.5rem; inline-block;">${i(e.category)}</span>
      <h2 style="font-family: var(--font-heading); font-size: 1.6rem; margin-bottom: 0.25rem;">${i(e.fullName)}</h2>
      <div style="font-size: 0.95rem; font-weight: 700; color: var(--accent-blue);">${i(e.designation)}</div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 1rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
      <div>
        <h4 style="font-size: 0.9rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em; margin-bottom: 0.3rem;">Biography</h4>
        <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-main);">${i(e.biography||"No biography available.")}</p>
      </div>

      ${e.education?`
        <div>
          <h4 style="font-size: 0.9rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em; margin-bottom: 0.3rem;">Education</h4>
          <p style="font-size: 0.95rem; color: var(--text-main);">🎓 ${i(e.education)}</p>
        </div>
      `:""}

      ${e.achievements?`
        <div>
          <h4 style="font-size: 0.9rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em; margin-bottom: 0.3rem;">Key Achievements</h4>
          <p style="font-size: 0.95rem; color: var(--text-main);">🏆 ${i(e.achievements)}</p>
        </div>
      `:""}

      ${e.office?`
        <div>
          <h4 style="font-size: 0.9rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em; margin-bottom: 0.3rem;">Office / Address</h4>
          <p style="font-size: 0.95rem; color: var(--text-main);">📍 ${i(e.office)}</p>
        </div>
      `:""}

      ${e.contact?`
        <div>
          <h4 style="font-size: 0.9rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em; margin-bottom: 0.3rem;">Contact Information</h4>
          <p style="font-size: 0.95rem; color: var(--text-main);">📞 ${i(e.contact)}</p>
        </div>
      `:""}

      ${t}
    </div>
  `;const n=document.getElementById("close-personality-modal");n&&(n.onclick=()=>o.classList.add("hidden"))}function i(r){return r?r.replace(/[&<>'"]/g,o=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[o]||o):""}
