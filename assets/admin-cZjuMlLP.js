import{p as j,l as U}from"./auth-CdF7lbPK.js";import{g as B,a as h,b as A,s as _,c as q,u as I,d as R,e as z,f as J,h as F,i as O,j as G,k as K,l as Y,m as V,n as W,o as Q,p as X}from"./firestore-9L-DLiGS.js";const N="ji_cloudinary_cloud_name",M="ji_cloudinary_preset";let p=localStorage.getItem(N)||"demo",v=localStorage.getItem(M)||"unsigned_preset";function Z(t,a){t&&(p=t.trim(),localStorage.setItem(N,p)),a&&(v=a.trim(),localStorage.setItem(M,v))}function ee(){return{cloudName:p,uploadPreset:v}}async function P(t,a="jacobabad_insider"){if(!t)throw new Error("No file provided for upload");if(p&&p!=="demo"&&v)try{const e=new FormData;e.append("file",t),e.append("upload_preset",v),e.append("folder",a);const d=await fetch(`https://api.cloudinary.com/v1_1/${p}/image/upload`,{method:"POST",body:e});if(d.ok)return(await d.json()).secure_url;console.warn("Cloudinary upload API returned error status:",d.status)}catch(e){console.warn("Cloudinary upload network error, falling back to data URL conversion:",e)}return new Promise((e,d)=>{const n=new FileReader;n.onload=()=>e(n.result),n.onerror=o=>d(o),n.readAsDataURL(t)})}document.addEventListener("DOMContentLoaded",async()=>{switch(await j(),document.querySelectorAll(".admin-logout-btn").forEach(e=>e.addEventListener("click",()=>U())),document.body.getAttribute("data-admin-page")){case"dashboard":te();break;case"add-news":ae();break;case"manage-news":oe();break;case"manage-headlines":de();break;case"manage-personalities":re();break;case"manage-categories":le();break;case"media-library":ue();break;case"settings":me();break}});async function te(){const t=await B({includeDrafts:!0}),a=await h(),e=await A(),d=t.length,n=a.length,o=e.length,r=t.filter(l=>l.featured).length,g=t.reduce((l,m)=>l+(m.views||0),0),f=new Date().toISOString().split("T")[0],i=t.filter(l=>l.createdAt&&l.createdAt.startsWith(f)).length,u=(l,m)=>{const b=document.getElementById(l);b&&(b.textContent=m)};u("stat-total-news",d),u("stat-total-categories",n),u("stat-total-personalities",o),u("stat-today-posts",i),u("stat-featured-posts",r),u("stat-total-views",g);const s=document.getElementById("seed-data-btn");s&&s.addEventListener("click",async()=>{if(confirm("Populate Firestore with sample Jacobabad news articles, headlines, categories, and personalities?")){s.disabled=!0,s.textContent="Seeding data...";const l=await _();l.success?(alert("Initial Jacobabad sample data seeded successfully! Reloading..."),window.location.reload()):(alert("Failed to seed data: "+l.error),s.disabled=!1,s.textContent="Seed Initial Data")}});const y=document.getElementById("recent-activity-table");if(y){const l=t.slice(0,5);y.innerHTML=l.map(m=>`
      <tr>
        <td>
          <div style="font-weight: 700; color: var(--text-main);">${c(m.title)}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${L(m.createdAt)}</div>
        </td>
        <td><span class="badge badge-red">${c(m.category)}</span></td>
        <td><span class="badge ${m.status==="publish"?"badge-blue":"badge-outline"}">${m.status}</span></td>
        <td>👁️ ${m.views||0}</td>
      </tr>
    `).join("")}}async function ae(){const t=document.getElementById("news-article-form"),a=document.getElementById("news-category-select"),e=document.getElementById("cover-image-file"),d=document.getElementById("cover-image-url"),n=document.getElementById("cover-preview-img"),o=await h();a&&(a.innerHTML=o.map(i=>`<option value="${c(i.name)}">${c(i.name)}</option>`).join("")),ne(),e&&e.addEventListener("change",async i=>{const u=i.target.files[0];if(u){const s=document.getElementById("upload-status");s&&(s.textContent="Uploading image to Cloudinary...");try{const y=await P(u);d&&(d.value=y),n&&(n.src=y,n.classList.remove("hidden")),s&&(s.textContent="✓ Image uploaded successfully!")}catch(y){s&&(s.textContent="Upload failed: "+y.message)}}});const g=new URLSearchParams(window.location.search).get("edit");if(g){const i=await q(g);i&&(document.getElementById("form-page-title").textContent="Edit News Article",document.getElementById("news-title").value=i.title||"",document.getElementById("news-slug").value=i.slug||"",document.getElementById("news-summary").value=i.summary||"",document.getElementById("news-content-editor").innerHTML=i.content||"",a&&(a.value=i.category||""),document.getElementById("news-tags").value=Array.isArray(i.tags)?i.tags.join(", "):i.tags||"",document.getElementById("news-author").value=i.author||"",d&&(d.value=i.coverImage||""),n&&i.coverImage&&(n.src=i.coverImage,n.classList.remove("hidden")),document.getElementById("news-featured").checked=!!i.featured,document.getElementById("news-breaking").checked=!!i.breaking,document.getElementById("news-status").value=i.status||"publish")}const f=document.getElementById("news-title");f&&f.addEventListener("input",()=>{const i=document.getElementById("news-slug");i&&!g&&(i.value=D(f.value))}),t&&t.addEventListener("submit",async i=>{i.preventDefault();const u=document.getElementById("news-title").value,s=document.getElementById("news-slug").value||D(u),y=a.value,l=document.getElementById("news-summary").value,m=document.getElementById("news-content-editor").innerHTML,b=document.getElementById("news-tags").value,$=document.getElementById("news-author").value||"Jacobabad Insider Bureau",k=d.value||"https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",C=document.getElementById("news-featured").checked,x=document.getElementById("news-breaking").checked,S=document.getElementById("news-status").value,w=t.querySelector('button[type="submit"]');w.disabled=!0,w.textContent="Saving Article...";let E;g?E=await I(g,{title:u,slug:s,category:y,summary:l,content:m,tags:b,author:$,coverImage:k,featured:C,breaking:x,status:S}):E=await R({title:u,slug:s,category:y,summary:l,content:m,tags:b,author:$,coverImage:k,featured:C,breaking:x,status:S}),w.disabled=!1,w.textContent="Save Article",E.success?(alert(g?"Article updated successfully!":"Article published successfully!"),window.location.href="/admin/manage-news.html"):alert("Error saving article: "+E.error)})}function ne(){const t=document.getElementById("editor-toolbar"),a=document.getElementById("news-content-editor");!t||!a||t.querySelectorAll(".tool-btn").forEach(e=>{e.addEventListener("click",d=>{d.preventDefault();const n=e.getAttribute("data-cmd"),o=e.getAttribute("data-param")||null;if(n==="createLink"){const r=prompt("Enter URL link:");r&&document.execCommand(n,!1,r)}else if(n==="insertImage"){const r=prompt("Enter image URL:");r&&document.execCommand(n,!1,r)}else document.execCommand(n,!1,o)})})}async function oe(){const t=document.getElementById("manage-news-table-body"),a=document.getElementById("manage-news-search"),e=document.getElementById("manage-news-filter-cat");if(!t)return;const d=await h();e&&(e.innerHTML='<option value="All">All Categories</option>'+d.map(o=>`<option value="${c(o.name)}">${c(o.name)}</option>`).join(""));const n=await B({includeDrafts:!0});H(n),a&&a.addEventListener("input",()=>T(n)),e&&e.addEventListener("change",()=>T(n))}function T(t){const a=document.getElementById("manage-news-search"),e=document.getElementById("manage-news-filter-cat"),d=a?a.value.trim().toLowerCase():"",n=e?e.value:"All";let o=t;n!=="All"&&(o=o.filter(r=>r.category===n)),d&&(o=o.filter(r=>r.title&&r.title.toLowerCase().includes(d))),H(o)}function H(t){const a=document.getElementById("manage-news-table-body");if(a){if(t.length===0){a.innerHTML='<tr><td colspan="6" class="text-center" style="padding: 2rem;">No news articles found.</td></tr>';return}a.innerHTML=t.map(e=>`
    <tr>
      <td>
        <div style="display: flex; gap: 0.75rem; align-items: center;">
          <img src="${e.coverImage}" style="width: 50px; height: 38px; object-fit: cover; border-radius: 4px;" />
          <div>
            <div style="font-weight: 700; color: var(--text-main); font-size: 0.95rem;">${c(e.title)}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${L(e.createdAt)} • By ${c(e.author)}</div>
          </div>
        </div>
      </td>
      <td><span class="badge badge-red">${c(e.category)}</span></td>
      <td>
        <button class="badge ${e.featured?"badge-blue":"badge-outline"} toggle-featured-btn" data-id="${e.id}" data-val="${e.featured}">
          ${e.featured?"★ Featured":"☆ Normal"}
        </button>
      </td>
      <td>
        <button class="badge ${e.breaking?"badge-red":"badge-outline"} toggle-breaking-btn" data-id="${e.id}" data-val="${e.breaking}">
          ${e.breaking?"🔥 Breaking":"Standard"}
        </button>
      </td>
      <td>👁️ ${e.views||0}</td>
      <td>
        <div style="display: flex; gap: 0.4rem;">
          <a href="/admin/add-news.html?edit=${e.id}" class="btn btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;">Edit</a>
          <button class="btn btn-danger delete-article-btn" data-id="${e.id}" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;">Delete</button>
        </div>
      </td>
    </tr>
  `).join(""),a.querySelectorAll(".toggle-featured-btn").forEach(e=>{e.addEventListener("click",async d=>{const n=e.getAttribute("data-id"),o=e.getAttribute("data-val")==="true";await I(n,{featured:!o}),window.location.reload()})}),a.querySelectorAll(".toggle-breaking-btn").forEach(e=>{e.addEventListener("click",async d=>{const n=e.getAttribute("data-id"),o=e.getAttribute("data-val")==="true";await I(n,{breaking:!o}),window.location.reload()})}),a.querySelectorAll(".delete-article-btn").forEach(e=>{e.addEventListener("click",async d=>{const n=e.getAttribute("data-id");confirm("Are you sure you want to delete this news article?")&&(await z(n),window.location.reload())})})}}async function de(){const t=document.getElementById("headlines-table-body"),a=document.getElementById("add-headline-form");if(!t)return;const e=await J();ie(t,e),a&&a.addEventListener("submit",async d=>{d.preventDefault();const n=document.getElementById("headline-text-input"),o=document.getElementById("headline-link-input");n.value&&(await F(n.value.trim(),o?o.value.trim():""),n.value="",window.location.reload())})}function ie(t,a){if(a.length===0){t.innerHTML='<tr><td colspan="4" class="text-center" style="padding: 2rem;">No ticker headlines added.</td></tr>';return}t.innerHTML=a.map(e=>`
    <tr>
      <td style="font-weight: 600;">${c(e.text)}</td>
      <td><span class="badge ${e.active!==!1?"badge-blue":"badge-outline"}">${e.active!==!1?"Active":"Paused"}</span></td>
      <td>${L(e.createdAt)}</td>
      <td>
        <div style="display: flex; gap: 0.4rem;">
          <button class="btn btn-secondary toggle-headline-btn" data-id="${e.id}" data-val="${e.active!==!1}" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;">
            ${e.active!==!1?"Pause":"Activate"}
          </button>
          <button class="btn btn-danger delete-headline-btn" data-id="${e.id}" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;">Delete</button>
        </div>
      </td>
    </tr>
  `).join(""),t.querySelectorAll(".toggle-headline-btn").forEach(e=>{e.addEventListener("click",async()=>{const d=e.getAttribute("data-id"),n=e.getAttribute("data-val")==="true";await O(d,{active:!n}),window.location.reload()})}),t.querySelectorAll(".delete-headline-btn").forEach(e=>{e.addEventListener("click",async()=>{const d=e.getAttribute("data-id");confirm("Delete this headline ticker item?")&&(await G(d),window.location.reload())})})}async function re(){const t=document.getElementById("manage-personalities-table-body"),a=document.getElementById("personality-form"),e=document.getElementById("person-photo-file"),d=document.getElementById("person-photo-url");if(!t)return;const n=await A();se(t,n),e&&e.addEventListener("change",async o=>{const r=o.target.files[0];if(r){const g=await P(r);d&&(d.value=g)}}),a&&a.addEventListener("submit",async o=>{o.preventDefault();const r=document.getElementById("person-fullname").value,g=document.getElementById("person-category").value,f=document.getElementById("person-designation").value,i=document.getElementById("person-bio").value,u=document.getElementById("person-education").value,s=document.getElementById("person-achievements").value,y=document.getElementById("person-office").value,l=document.getElementById("person-contact").value,m=d.value||"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";await K({fullName:r,category:g,designation:f,biography:i,education:u,achievements:s,office:y,contact:l,photo:m}),alert("Personality profile added!"),window.location.reload()})}function se(t,a){if(a.length===0){t.innerHTML='<tr><td colspan="4" class="text-center" style="padding: 2rem;">No personalities in directory yet.</td></tr>';return}t.innerHTML=a.map(e=>`
    <tr>
      <td>
        <div style="display: flex; gap: 0.75rem; align-items: center;">
          <img src="${e.photo}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover;" />
          <div>
            <div style="font-weight: 700; color: var(--text-main);">${c(e.fullName)}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${c(e.designation)}</div>
          </div>
        </div>
      </td>
      <td><span class="badge badge-blue">${c(e.category)}</span></td>
      <td>${c(e.office||"Jacobabad")}</td>
      <td>
        <button class="btn btn-danger delete-personality-btn" data-id="${e.id}" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;">Delete</button>
      </td>
    </tr>
  `).join(""),t.querySelectorAll(".delete-personality-btn").forEach(e=>{e.addEventListener("click",async()=>{const d=e.getAttribute("data-id");confirm("Delete this personality from Jacobabad Directory?")&&(await Y(d),window.location.reload())})})}async function le(){const t=document.getElementById("categories-table-body"),a=document.getElementById("add-category-form");if(!t)return;const e=await h();ce(t,e),a&&a.addEventListener("submit",async d=>{d.preventDefault();const n=document.getElementById("category-name-input"),o=document.getElementById("category-desc-input");n.value&&(await V(n.value.trim(),o?o.value.trim():""),window.location.reload())})}function ce(t,a){t.innerHTML=a.map(e=>`
    <tr>
      <td style="font-weight: 700;">${c(e.name)}</td>
      <td><code>${c(e.slug)}</code></td>
      <td>${c(e.description||"-")}</td>
      <td>
        <button class="btn btn-danger delete-cat-btn" data-id="${e.id}" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;">Delete</button>
      </td>
    </tr>
  `).join(""),t.querySelectorAll(".delete-cat-btn").forEach(e=>{e.addEventListener("click",async()=>{const d=e.getAttribute("data-id");confirm("Delete this category?")&&(await W(d),window.location.reload())})})}async function ue(){const t=document.getElementById("media-grid");if(document.getElementById("media-library-upload"),!t)return;const a=await B({includeDrafts:!0}),e=await A(),d=new Set;a.forEach(o=>{o.coverImage&&d.add(o.coverImage),Array.isArray(o.gallery)&&o.gallery.forEach(r=>d.add(r))}),e.forEach(o=>{o.photo&&d.add(o.photo)});const n=Array.from(d);if(n.length===0){t.innerHTML='<p class="text-muted text-center" style="grid-column: 1 / -1; padding: 3rem;">No uploaded media found in database.</p>';return}t.innerHTML=n.map(o=>`
    <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden;">
      <img src="${o}" style="width: 100%; height: 140px; object-fit: cover;" />
      <div style="padding: 0.5rem; text-align: center;">
        <button class="btn btn-secondary copy-url-btn" data-url="${o}" style="width: 100%; font-size: 0.75rem; padding: 0.3rem;">Copy Image URL</button>
      </div>
    </div>
  `).join(""),t.querySelectorAll(".copy-url-btn").forEach(o=>{o.addEventListener("click",()=>{const r=o.getAttribute("data-url");navigator.clipboard.writeText(r),o.textContent="✓ Copied!",setTimeout(()=>o.textContent="Copy Image URL",2e3)})})}async function me(){const t=document.getElementById("settings-form"),a=await Q(),e=ee();t&&(document.getElementById("setting-site-name").value=a.siteName||"Jacobabad Insider",document.getElementById("setting-cloudinary-cloud").value=e.cloudName||"demo",document.getElementById("setting-cloudinary-preset").value=e.uploadPreset||"unsigned_preset",document.getElementById("setting-weather-city").value=a.weatherCity||"Jacobabad",t.addEventListener("submit",async d=>{d.preventDefault();const n=document.getElementById("setting-site-name").value,o=document.getElementById("setting-cloudinary-cloud").value,r=document.getElementById("setting-cloudinary-preset").value,g=document.getElementById("setting-weather-city").value;Z(o,r),await X({siteName:n,cloudinaryCloudName:o,cloudinaryPreset:r,weatherCity:g}),alert("Settings updated successfully!")}))}function D(t){return t.toString().toLowerCase().trim().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-")}function L(t){return t?new Date(t).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):""}function c(t){return t?t.replace(/[&<>'"]/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[a]||a):""}
