import{p as U,l as j}from"./auth-C3x3DcjY.js";import{g as B,a as h,b as A,s as _,c as q,u as I,d as R,e as z,f as F,h as J,i as O,j as G,k as K,l as Y,m as V,n as W,o as Q,p as X}from"./firestore-eDyhnHo-.js";const N="ji_cloudinary_cloud_name",P="ji_cloudinary_preset";let p=localStorage.getItem(N)||"demo",b=localStorage.getItem(P)||"unsigned_preset";function Z(t,n){t&&(p=t.trim(),localStorage.setItem(N,p)),n&&(b=n.trim(),localStorage.setItem(P,b))}function ee(){return{cloudName:p,uploadPreset:b}}async function M(t,n="jacobabad_insider"){if(!t)throw new Error("No file provided for upload");if(p&&p!=="demo"&&b)try{const e=new FormData;e.append("file",t),e.append("upload_preset",b),e.append("folder",n);const d=await fetch(`https://api.cloudinary.com/v1_1/${p}/image/upload`,{method:"POST",body:e});if(d.ok)return(await d.json()).secure_url;console.warn("Cloudinary upload API returned error status:",d.status)}catch(e){console.warn("Cloudinary upload network error, falling back to data URL conversion:",e)}return new Promise((e,d)=>{const o=new FileReader;o.onload=()=>e(o.result),o.onerror=a=>d(a),o.readAsDataURL(t)})}document.addEventListener("DOMContentLoaded",async()=>{switch(await U(),document.querySelectorAll(".admin-logout-btn").forEach(e=>e.addEventListener("click",()=>j())),document.body.getAttribute("data-admin-page")){case"dashboard":te();break;case"add-news":ae();break;case"manage-news":oe();break;case"manage-headlines":de();break;case"manage-personalities":re();break;case"manage-categories":le();break;case"media-library":ue();break;case"settings":me();break}});async function te(){const t=await B({includeDrafts:!0}),n=await h(),e=await A(),d=t.length,o=n.length,a=e.length,r=t.filter(l=>l.featured).length,g=t.reduce((l,m)=>l+(m.views||0),0),y=new Date().toISOString().split("T")[0],i=t.filter(l=>l.createdAt&&l.createdAt.startsWith(y)).length,u=(l,m)=>{const v=document.getElementById(l);v&&(v.textContent=m)};u("stat-total-news",d),u("stat-total-categories",o),u("stat-total-personalities",a),u("stat-today-posts",i),u("stat-featured-posts",r),u("stat-total-views",g);const s=document.getElementById("seed-data-btn");s&&s.addEventListener("click",async()=>{if(confirm("Populate Firestore with sample Jacobabad news articles, headlines, categories, and personalities?")){s.disabled=!0,s.textContent="Seeding data...";const l=await _();l.success?(alert("Initial Jacobabad sample data seeded successfully! Reloading..."),window.location.reload()):(alert("Failed to seed data: "+l.error),s.disabled=!1,s.textContent="Seed Initial Data")}});const f=document.getElementById("recent-activity-table");if(f){const l=t.slice(0,5);f.innerHTML=l.map(m=>`
      <tr>
        <td>
          <div style="font-weight: 700; color: var(--text-main);">${c(m.title)}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${L(m.createdAt)}</div>
        </td>
        <td><span class="badge badge-red">${c(m.category)}</span></td>
        <td><span class="badge ${m.status==="publish"?"badge-blue":"badge-outline"}">${m.status}</span></td>
        <td>👁️ ${m.views||0}</td>
      </tr>
    `).join("")}}async function ae(){const t=document.getElementById("news-article-form"),n=document.getElementById("news-category-select"),e=document.getElementById("cover-image-file"),d=document.getElementById("cover-image-url"),o=document.getElementById("cover-preview-img"),a=await h();n&&(n.innerHTML=a.map(i=>`<option value="${c(i.name)}">${c(i.name)}</option>`).join("")),ne(),e&&e.addEventListener("change",async i=>{const u=i.target.files[0];if(u){const s=document.getElementById("upload-status");s&&(s.textContent="Uploading image to Cloudinary...");try{const f=await M(u);d&&(d.value=f),o&&(o.src=f,o.classList.remove("hidden")),s&&(s.textContent="✓ Image uploaded successfully!")}catch(f){s&&(s.textContent="Upload failed: "+f.message)}}});const g=new URLSearchParams(window.location.search).get("edit");if(g){const i=await q(g);i&&(document.getElementById("form-page-title").textContent="Edit News Article",document.getElementById("news-title").value=i.title||"",document.getElementById("news-slug").value=i.slug||"",document.getElementById("news-summary").value=i.summary||"",document.getElementById("news-content-editor").innerHTML=i.content||"",n&&(n.value=i.category||""),document.getElementById("news-tags").value=Array.isArray(i.tags)?i.tags.join(", "):i.tags||"",document.getElementById("news-author").value=i.author||"",d&&(d.value=i.coverImage||""),o&&i.coverImage&&(o.src=i.coverImage,o.classList.remove("hidden")),document.getElementById("news-featured").checked=!!i.featured,document.getElementById("news-breaking").checked=!!i.breaking,document.getElementById("news-status").value=i.status||"publish")}const y=document.getElementById("news-title");y&&y.addEventListener("input",()=>{const i=document.getElementById("news-slug");i&&!g&&(i.value=T(y.value))}),t&&t.addEventListener("submit",async i=>{i.preventDefault();const u=document.getElementById("news-title").value,s=document.getElementById("news-slug").value||T(u),f=n.value,l=document.getElementById("news-summary").value,m=document.getElementById("news-content-editor").innerHTML,v=document.getElementById("news-tags").value,C=document.getElementById("news-author").value||"Jacobabad Insider Bureau",x=d.value||"https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",$=document.getElementById("news-featured").checked,k=document.getElementById("news-breaking").checked,S=document.getElementById("news-status").value,w=t.querySelector('button[type="submit"]');w.disabled=!0,w.textContent="Saving Article...";let E;g?E=await I(g,{title:u,slug:s,category:f,summary:l,content:m,tags:v,author:C,coverImage:x,featured:$,breaking:k,status:S}):E=await R({title:u,slug:s,category:f,summary:l,content:m,tags:v,author:C,coverImage:x,featured:$,breaking:k,status:S}),w.disabled=!1,w.textContent="Save Article",E.success?(alert(g?"Article updated successfully!":"Article published successfully!"),window.location.href="/admin/manage-news.html"):alert("Error saving article: "+E.error)})}function ne(){const t=document.getElementById("editor-toolbar"),n=document.getElementById("news-content-editor");!t||!n||t.querySelectorAll(".tool-btn").forEach(e=>{e.addEventListener("click",d=>{d.preventDefault();const o=e.getAttribute("data-cmd"),a=e.getAttribute("data-param")||null;if(o==="createLink"){const r=prompt("Enter URL link:");r&&document.execCommand(o,!1,r)}else if(o==="insertImage"){const r=prompt("Enter image URL:");r&&document.execCommand(o,!1,r)}else document.execCommand(o,!1,a)})})}async function oe(){const t=document.getElementById("manage-news-table-body"),n=document.getElementById("manage-news-search"),e=document.getElementById("manage-news-filter-cat");if(!t)return;const d=await h();e&&(e.innerHTML='<option value="All">All Categories</option>'+d.map(a=>`<option value="${c(a.name)}">${c(a.name)}</option>`).join(""));const o=await B({includeDrafts:!0});H(o),n&&n.addEventListener("input",()=>D(o)),e&&e.addEventListener("change",()=>D(o))}function D(t){const n=document.getElementById("manage-news-search"),e=document.getElementById("manage-news-filter-cat"),d=n?n.value.trim().toLowerCase():"",o=e?e.value:"All";let a=t;o!=="All"&&(a=a.filter(r=>r.category===o)),d&&(a=a.filter(r=>r.title&&r.title.toLowerCase().includes(d))),H(a)}function H(t){const n=document.getElementById("manage-news-table-body");if(n){if(t.length===0){n.innerHTML='<tr><td colspan="6" class="text-center" style="padding: 2rem;">No news articles found.</td></tr>';return}n.innerHTML=t.map(e=>`
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
  `).join(""),n.querySelectorAll(".toggle-featured-btn").forEach(e=>{e.addEventListener("click",async d=>{const o=e.getAttribute("data-id"),a=e.getAttribute("data-val")==="true";await I(o,{featured:!a}),window.location.reload()})}),n.querySelectorAll(".toggle-breaking-btn").forEach(e=>{e.addEventListener("click",async d=>{const o=e.getAttribute("data-id"),a=e.getAttribute("data-val")==="true";await I(o,{breaking:!a}),window.location.reload()})}),n.querySelectorAll(".delete-article-btn").forEach(e=>{e.addEventListener("click",async d=>{const o=e.getAttribute("data-id");confirm("Are you sure you want to delete this news article?")&&(await z(o),window.location.reload())})})}}async function de(){const t=document.getElementById("headlines-table-body"),n=document.getElementById("add-headline-form");if(!t)return;const e=await F();ie(t,e),n&&n.addEventListener("submit",async d=>{d.preventDefault();const o=document.getElementById("headline-text-input"),a=document.getElementById("headline-link-input");o.value&&(await J(o.value.trim(),a?a.value.trim():""),o.value="",window.location.reload())})}function ie(t,n){if(n.length===0){t.innerHTML='<tr><td colspan="4" class="text-center" style="padding: 2rem;">No ticker headlines added.</td></tr>';return}t.innerHTML=n.map(e=>`
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
  `).join(""),t.querySelectorAll(".toggle-headline-btn").forEach(e=>{e.addEventListener("click",async d=>{d.preventDefault();const o=e.getAttribute("data-id"),a=e.getAttribute("data-val")==="true";e.disabled=!0,e.textContent="Updating...";const r=await O(o,{active:!a});r&&r.success===!1?(alert("Failed to update headline: "+(r.error||"Unknown error")),e.disabled=!1,e.textContent=a?"Pause":"Activate"):window.location.reload()})}),t.querySelectorAll(".delete-headline-btn").forEach(e=>{e.addEventListener("click",async d=>{d.preventDefault();const o=e.getAttribute("data-id");if(confirm("Are you sure you want to delete this headline text?")){e.disabled=!0,e.textContent="Deleting...";const a=await G(o);a&&a.success===!1?(alert("Failed to delete headline: "+(a.error||"Unknown error")),e.disabled=!1,e.textContent="Delete"):window.location.reload()}})})}async function re(){const t=document.getElementById("manage-personalities-table-body"),n=document.getElementById("personality-form"),e=document.getElementById("person-photo-file"),d=document.getElementById("person-photo-url");if(!t)return;const o=await A();se(t,o),e&&e.addEventListener("change",async a=>{const r=a.target.files[0];if(r){const g=await M(r);d&&(d.value=g)}}),n&&n.addEventListener("submit",async a=>{a.preventDefault();const r=document.getElementById("person-fullname").value,g=document.getElementById("person-category").value,y=document.getElementById("person-designation").value,i=document.getElementById("person-bio").value,u=document.getElementById("person-education").value,s=document.getElementById("person-achievements").value,f=document.getElementById("person-office").value,l=document.getElementById("person-contact").value,m=d.value||"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";await K({fullName:r,category:g,designation:y,biography:i,education:u,achievements:s,office:f,contact:l,photo:m}),alert("Personality profile added!"),window.location.reload()})}function se(t,n){if(n.length===0){t.innerHTML='<tr><td colspan="4" class="text-center" style="padding: 2rem;">No personalities in directory yet.</td></tr>';return}t.innerHTML=n.map(e=>`
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
  `).join(""),t.querySelectorAll(".delete-personality-btn").forEach(e=>{e.addEventListener("click",async()=>{const d=e.getAttribute("data-id");confirm("Delete this personality from Jacobabad Directory?")&&(await Y(d),window.location.reload())})})}async function le(){const t=document.getElementById("categories-table-body"),n=document.getElementById("add-category-form");if(!t)return;const e=await h();ce(t,e),n&&n.addEventListener("submit",async d=>{d.preventDefault();const o=document.getElementById("category-name-input"),a=document.getElementById("category-desc-input");o.value&&(await V(o.value.trim(),a?a.value.trim():""),window.location.reload())})}function ce(t,n){t.innerHTML=n.map(e=>`
    <tr>
      <td style="font-weight: 700;">${c(e.name)}</td>
      <td><code>${c(e.slug)}</code></td>
      <td>${c(e.description||"-")}</td>
      <td>
        <button class="btn btn-danger delete-cat-btn" data-id="${e.id}" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;">Delete</button>
      </td>
    </tr>
  `).join(""),t.querySelectorAll(".delete-cat-btn").forEach(e=>{e.addEventListener("click",async()=>{const d=e.getAttribute("data-id");confirm("Delete this category?")&&(await W(d),window.location.reload())})})}async function ue(){const t=document.getElementById("media-grid");if(document.getElementById("media-library-upload"),!t)return;const n=await B({includeDrafts:!0}),e=await A(),d=new Set;n.forEach(a=>{a.coverImage&&d.add(a.coverImage),Array.isArray(a.gallery)&&a.gallery.forEach(r=>d.add(r))}),e.forEach(a=>{a.photo&&d.add(a.photo)});const o=Array.from(d);if(o.length===0){t.innerHTML='<p class="text-muted text-center" style="grid-column: 1 / -1; padding: 3rem;">No uploaded media found in database.</p>';return}t.innerHTML=o.map(a=>`
    <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden;">
      <img src="${a}" style="width: 100%; height: 140px; object-fit: cover;" />
      <div style="padding: 0.5rem; text-align: center;">
        <button class="btn btn-secondary copy-url-btn" data-url="${a}" style="width: 100%; font-size: 0.75rem; padding: 0.3rem;">Copy Image URL</button>
      </div>
    </div>
  `).join(""),t.querySelectorAll(".copy-url-btn").forEach(a=>{a.addEventListener("click",()=>{const r=a.getAttribute("data-url");navigator.clipboard.writeText(r),a.textContent="✓ Copied!",setTimeout(()=>a.textContent="Copy Image URL",2e3)})})}async function me(){const t=document.getElementById("settings-form"),n=await Q(),e=ee();t&&(document.getElementById("setting-site-name").value=n.siteName||"Jacobabad Insider",document.getElementById("setting-cloudinary-cloud").value=e.cloudName||"demo",document.getElementById("setting-cloudinary-preset").value=e.uploadPreset||"unsigned_preset",document.getElementById("setting-weather-city").value=n.weatherCity||"Jacobabad",t.addEventListener("submit",async d=>{d.preventDefault();const o=document.getElementById("setting-site-name").value,a=document.getElementById("setting-cloudinary-cloud").value,r=document.getElementById("setting-cloudinary-preset").value,g=document.getElementById("setting-weather-city").value;Z(a,r),await X({siteName:o,cloudinaryCloudName:a,cloudinaryPreset:r,weatherCity:g}),alert("Settings updated successfully!")}))}function T(t){return t.toString().toLowerCase().trim().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-")}function L(t){return t?new Date(t).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):""}function c(t){return t?t.replace(/[&<>'"]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[n]||n):""}
