import{g as v,a as u}from"./firestore-9L-DLiGS.js";let o=[],s="All";document.addEventListener("DOMContentLoaded",async()=>{const t=document.getElementById("news-grid-container");if(!t)return;h(t,6);const e=new URLSearchParams(window.location.search).get("cat");e&&(s=e),o=await v(),p(o),f(),g(),y(o)});function p(t){const r=document.getElementById("hero-featured-container");if(!r||t.length===0)return;const e=t.find(a=>a.featured)||t[0];e&&(r.innerHTML=`
    <div class="hero-featured-card">
      <div class="hero-image-wrapper">
        <img src="${e.coverImage}" alt="${n(e.title)}" loading="lazy" />
        <span class="badge badge-red" style="position: absolute; top: 1rem; left: 1rem; z-index: 10;">${n(e.category)}</span>
      </div>
      <div class="hero-card-content">
        <a href="/article.html?id=${e.id}" class="hero-title">${n(e.title)}</a>
        <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6;">${n(e.summary)}</p>
        <div class="article-meta">
          <span>✍️ <strong>${n(e.author)}</strong></span>
          <span>📅 ${l(e.createdAt)}</span>
          <span>👁️ ${e.views||0} views</span>
        </div>
        <div>
          <a href="/article.html?id=${e.id}" class="btn btn-primary" style="margin-top: 0.5rem; display: inline-flex;">Read Full Story &rarr;</a>
        </div>
      </div>
    </div>
  `)}async function f(){const t=document.getElementById("category-filter-bar");if(!t)return;const r=await u(),e=[{name:"All",slug:"all"},...r];t.innerHTML=e.map(a=>`
    <button class="filter-btn ${s.toLowerCase()===a.name.toLowerCase()?"active":""}" data-cat="${n(a.name)}">
      ${n(a.name)}
    </button>
  `).join(""),t.querySelectorAll(".filter-btn").forEach(a=>{a.addEventListener("click",i=>{const d=i.target.getAttribute("data-cat");s=d,t.querySelectorAll(".filter-btn").forEach(m=>m.classList.remove("active")),i.target.classList.add("active");const c=document.getElementById("current-category-heading");c&&(c.textContent=d==="All"?"Latest News":`${d} News`),g()})})}function g(){const t=document.getElementById("news-grid-container");if(!t)return;let r=o;if(s!=="All"&&(r=o.filter(e=>e.category&&e.category.toLowerCase()===s.toLowerCase())),r.length===0){t.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <p style="font-size: 1.2rem; font-weight: 700; color: var(--text-muted);">No news articles available in "${n(s)}"</p>
        <p style="font-size: 0.9rem; color: var(--text-light); margin-top: 0.5rem;">Check back later or browse other categories.</p>
      </div>
    `;return}t.innerHTML=r.map(e=>`
    <article class="news-card">
      <div style="position: relative; overflow: hidden;">
        <img src="${e.coverImage}" alt="${n(e.title)}" class="news-card-img" loading="lazy" />
        <span class="badge badge-red" style="position: absolute; top: 0.75rem; left: 0.75rem;">${n(e.category)}</span>
      </div>
      <div class="news-card-body">
        <a href="/article.html?id=${e.id}" class="news-card-title">${n(e.title)}</a>
        <p class="news-card-desc">${n(e.summary)}</p>
        <div class="article-meta" style="margin-top: auto; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); font-size: 0.8rem;">
          <span>👤 ${n(e.author)}</span>
          <span>🗓️ ${l(e.createdAt)}</span>
          <span>👁️ ${e.views||0}</span>
        </div>
      </div>
    </article>
  `).join("")}function y(t){const r=document.getElementById("trending-news-list");if(!r||t.length===0)return;const e=[...t].sort((a,i)=>(i.views||0)-(a.views||0)).slice(0,5);r.innerHTML=e.map((a,i)=>`
    <div class="mini-news-item">
      <span style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 900; color: var(--accent-red); width: 24px;">0${i+1}</span>
      <img src="${a.coverImage}" alt="${n(a.title)}" class="mini-news-thumb" />
      <div>
        <a href="/article.html?id=${a.id}" class="mini-news-title">${n(a.title)}</a>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">👁️ ${a.views||0} views • ${l(a.createdAt)}</div>
      </div>
    </div>
  `).join("")}function h(t,r=6){t.innerHTML=Array(r).fill(0).map(()=>`
    <div class="news-card" style="opacity: 0.6;">
      <div style="height: 180px; background: var(--bg-input); animation: pulse 1.5s infinite;"></div>
      <div class="news-card-body" style="gap: 0.8rem;">
        <div style="height: 16px; width: 30%; background: var(--bg-input);"></div>
        <div style="height: 24px; width: 90%; background: var(--bg-input);"></div>
        <div style="height: 16px; width: 100%; background: var(--bg-input);"></div>
      </div>
    </div>
  `).join("")}function l(t){return t?new Date(t).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):""}function n(t){return t?t.replace(/[&<>'"]/g,r=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[r]||r):""}
