import{a as d,S as m,i as n}from"./assets/vendor-BfjKTZs6.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const y="49577891-dd8edba8495efad2486051016",g="https://pixabay.com/api/";async function h(a,r=1){const o=await d.get(g,{params:{key:y,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}});return{images:o.data.hits,total:o.data.totalHits}}const c=document.querySelector(".gallery");let b=new m(".gallery a",{captionsData:"alt",captionDelay:250});function L(){c.innerHTML=""}function S(a){const r=a.map(({webformatURL:o,largeImageURL:i,tags:e,likes:t,views:s,comments:u,downloads:f})=>`
        <a href="${i}" class="gallery-item">
            <img src="${o}" alt="${e}" />
            <div class="info">
                <p><b>Likes:</b> ${t}</p>
                <p><b>Views:</b> ${s}</p>
                <p><b>Comments:</b> ${u}</p>
                <p><b>Downloads:</b> ${f}</p>
            </div>
        </a>
    `).join("");c.innerHTML+=r,p()}function p(){b.refresh()}const w=document.querySelector(".form"),l=document.querySelector(".loader");w.addEventListener("submit",async a=>{a.preventDefault();const r=a.target.elements["search-text"].value.trim();if(!r){n.warning({message:"Please enter a search query.",position:"topRight"});return}L(),l.style.display="block";try{const{images:o}=await h(r);o.length===0?n.error({message:"Sorry, no images found. Try another search!",position:"topRight"}):(S(o),p())}catch{n.error({title:"Error",message:"Failed to fetch images. Try again later.",position:"topRight"})}finally{l.style.display="none"}});
//# sourceMappingURL=index.js.map
