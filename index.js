import{a as m,S as c,i as n}from"./assets/vendor-BfjKTZs6.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const y="49577891-dd8edba8495efad2486051016",g="https://pixabay.com/api/";async function h(o){return(await m.get(g,{params:{key:y,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data.hits}const p=document.querySelector(".gallery");let b=new c(".gallery a",{captionsData:"alt",captionDelay:250});function u(){p.innerHTML=""}function L(o){u();const r=o.map(({webformatURL:a,largeImageURL:i,tags:e,likes:t,views:s,comments:f,downloads:d})=>`
        <a href="${i}" class="gallery-item">
            <img src="${a}" alt="${e}" />
            <div class="info">
                <p><b>Likes:</b> ${t}</p>
                <p><b>Views:</b> ${s}</p>
                <p><b>Comments:</b> ${f}</p>
                <p><b>Downloads:</b> ${d}</p>
            </div>
        </a>
    `).join("");p.innerHTML=r,b.refresh()}const w=document.querySelector(".form"),l=document.querySelector(".loader"),S=new c(".gallery a",{captionsData:"alt",captionDelay:250});w.addEventListener("submit",async o=>{o.preventDefault();const r=o.target.elements["search-text"].value.trim();if(!r){n.warning({message:"Please enter a search query.",position:"topRight"});return}u(),l.style.display="block";try{const a=await h(r);a.length===0?n.error({message:"Sorry, no images found. Try another search!",position:"topRight"}):(L(a),S.refresh())}catch{n.error({title:"Error",message:"Failed to fetch images. Try again later.",position:"topRight"})}finally{l.style.display="none"}});
//# sourceMappingURL=index.js.map
