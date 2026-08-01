import"./auth-C3x3DcjY.js";import"./main-BhGFCTzb.js";import{c as y,q as f,g as h,r as v,t as b}from"./firestore-eDyhnHo-.js";let i=null,l=!1,c=null;document.addEventListener("DOMContentLoaded",async()=>{const t=document.getElementById("article-detail-container");if(!t)return;const a=new URLSearchParams(window.location.search).get("id");if(!a){t.innerHTML='<div class="text-center" style="padding: 4rem;"><p>Article not found. <a href="/">Return to Home</a></p></div>';return}if(i=await y(a),!i){t.innerHTML='<div class="text-center" style="padding: 4rem;"><p>Article not found or has been removed. <a href="/">Return Home</a></p></div>';return}f(i.id),document.title=`${i.title} - Jacobabad Insider`,w(t,i),x(i),$(i),L(i),A(i.id)});function w(t,e){const a=Array.isArray(e.gallery)&&e.gallery.length>0?`
    <div style="margin: 2rem 0;">
      <h3 style="font-family: var(--font-heading); margin-bottom: 1rem;">Photo Gallery</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;">
        ${e.gallery.map(n=>`
          <img src="${n}" alt="Gallery Image" style="width: 100%; height: 160px; object-fit: cover; border-radius: 8px; cursor: pointer;" onclick="window.open('${n}', '_blank')" />
        `).join("")}
      </div>
    </div>
  `:"",o=Array.isArray(e.tags)&&e.tags.length>0?`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1.5rem;">
      ${e.tags.map(n=>`<span class="badge badge-outline">#${r(n)}</span>`).join("")}
    </div>
  `:"";t.innerHTML=`
    <!-- Category & Title Header -->
    <div style="margin-bottom: 1.5rem;">
      <div style="display: flex; gap: 0.75rem; align-items: center; margin-bottom: 1rem;">
        <span class="badge badge-red">${r(e.category)}</span>
        ${e.breaking?'<span class="badge badge-blue">BREAKING</span>':""}
      </div>
      <h1 style="font-family: var(--font-heading); font-size: 2.25rem; font-weight: 800; line-height: 1.35; margin-bottom: 1rem; color: var(--text-main);">${r(e.title)}</h1>
      
      <p style="font-size: 1.15rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem; font-weight: 500;">${r(e.summary)}</p>

      <div class="article-meta" style="padding-bottom: 1rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.8rem;">
          <div style="width: 42px; height: 42px; border-radius: 50%; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem;">
            ${(e.author||"J")[0].toUpperCase()}
          </div>
          <div>
            <div style="font-weight: 700; color: var(--text-main);">${r(e.author||"Jacobabad Insider Bureau")}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Published on ${p(e.createdAt)}</div>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; gap: 1rem;">
          <span style="font-size: 0.9rem; color: var(--text-muted);">👁️ ${e.views||1} views</span>
          <button id="tts-audio-btn" class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">
            🔊 Listen to Article
          </button>
        </div>
      </div>
    </div>

    <!-- Cover Image -->
    <div style="margin-bottom: 2rem; border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-sm);">
      <img src="${e.coverImage}" alt="${r(e.title)}" style="width: 100%; max-height: 480px; object-fit: cover;" />
    </div>

    <!-- Article Content -->
    <div class="article-full-content">
      ${e.content}
    </div>

    ${a}
    ${o}

    <!-- Social Share Bar -->
    <div class="share-bar">
      <span style="font-weight: 700; font-size: 0.9rem; color: var(--text-main);">Share Article:</span>
      <button class="share-btn whatsapp" data-platform="whatsapp">💬 WhatsApp</button>
      <button class="share-btn facebook" data-platform="facebook">📘 Facebook</button>
      <button class="share-btn twitter" data-platform="twitter">🐦 X (Twitter)</button>
      <button class="share-btn copy" data-platform="copy">📋 Copy Link</button>
    </div>
  `}function x(t){const e=document.getElementById("tts-audio-btn");!e||!("speechSynthesis"in window)||e.addEventListener("click",()=>{if(l)window.speechSynthesis.cancel(),l=!1,e.innerHTML="🔊 Listen to Article",e.classList.remove("btn-danger"),e.classList.add("btn-secondary");else{const a=`${t.title}. ${t.summary}. ${C(t.content)}`;c=new SpeechSynthesisUtterance(a),c.rate=1,c.onend=()=>{l=!1,e.innerHTML="🔊 Listen to Article",e.classList.remove("btn-danger"),e.classList.add("btn-secondary")},window.speechSynthesis.speak(c),l=!0,e.innerHTML="⏹️ Stop Reading",e.classList.remove("btn-secondary"),e.classList.add("btn-danger")}})}function $(t){const e=document.querySelectorAll(".share-btn"),a=encodeURIComponent(window.location.href),o=encodeURIComponent(t.title);e.forEach(n=>{n.addEventListener("click",()=>{const s=n.getAttribute("data-platform");s==="whatsapp"?window.open(`https://api.whatsapp.com/send?text=${o}%20${a}`,"_blank"):s==="facebook"?window.open(`https://www.facebook.com/sharer/sharer.php?u=${a}`,"_blank"):s==="twitter"?window.open(`https://twitter.com/intent/tweet?text=${o}&url=${a}`,"_blank"):s==="copy"&&(navigator.clipboard.writeText(window.location.href),n.textContent="✓ Copied!",setTimeout(()=>n.textContent="📋 Copy Link",2e3))})})}async function L(t){const e=document.getElementById("related-articles-container");if(!e)return;const o=(await h({category:t.category,limitCount:4})).filter(n=>n.id!==t.id).slice(0,3);if(o.length===0){e.innerHTML='<p class="text-muted">No related articles in this category.</p>';return}e.innerHTML=o.map(n=>`
    <div class="news-card">
      <img src="${n.coverImage}" alt="${r(n.title)}" class="news-card-img" style="height: 150px;" />
      <div class="news-card-body" style="padding: 1rem;">
        <span class="badge badge-red" style="font-size: 0.65rem; width: fit-content;">${r(n.category)}</span>
        <a href="/article.html?id=${n.id}" class="news-card-title" style="font-size: 0.95rem;">${r(n.title)}</a>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: auto;">${p(n.createdAt)}</div>
      </div>
    </div>
  `).join("")}async function A(t){const e=document.getElementById("comments-list"),a=document.getElementById("add-comment-form");e&&(await g(t,e),a&&a.addEventListener("submit",async o=>{o.preventDefault();const n=document.getElementById("comment-name"),s=document.getElementById("comment-email"),m=document.getElementById("comment-text");if(!n.value||!m.value)return;const d=a.querySelector('button[type="submit"]');d.disabled=!0,d.textContent="Posting comment...";const u=await v(t,n.value,s.value||"",m.value);d.disabled=!1,d.textContent="Post Comment",u.success?(m.value="",await g(t,e)):alert("Failed to post comment: "+u.error)}))}async function g(t,e){const a=await b(t),o=document.getElementById("comments-count");if(o&&(o.textContent=a.length),a.length===0){e.innerHTML='<p class="text-muted" style="font-size: 0.9rem;">No comments yet. Be the first to share your thoughts!</p>';return}e.innerHTML=a.map(n=>`
    <div style="padding: 1rem; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; margin-bottom: 0.75rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <span style="font-weight: 700; color: var(--text-main);">${r(n.userName)}</span>
        <span style="font-size: 0.75rem; color: var(--text-muted);">${p(n.createdAt)}</span>
      </div>
      <p style="font-size: 0.95rem; color: var(--text-main); margin: 0; line-height: 1.5;">${r(n.comment)}</p>
    </div>
  `).join("")}function C(t){const e=document.createElement("DIV");return e.innerHTML=t,e.textContent||e.innerText||""}function p(t){return t?new Date(t).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):""}function r(t){return t?t.replace(/[&<>'"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[e]||e):""}
