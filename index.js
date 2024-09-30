import{a as y,i as f}from"./assets/vendor-DM1_jADJ.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const n={form:document.querySelector(".js-search-form"),container:document.querySelector(".js-cards-container"),loadMoreBtn:document.querySelector(".js-load-more"),loader:document.querySelector(".js-loader")},w="https://newsapi.org/v2/",L="d3b04eae47fa4b599491b479582b7d24",h=6;async function m(r,t=1){const o=new URLSearchParams({q:r,apiKey:L,pageSize:h,page:t,language:"en"}),a=`${w}/everything?${o}`,{data:{articles:e,totalResults:s,status:c,message:d=""}}=await y.get(a);if(c!=="ok")throw new Error("message");if(e.length===0)throw new Error("No articles found");return{articles:e,totalResults:s}}function u(r,t=90){return r&&(r.length<=t?r:`${r.slice(0,t-3)+"..."}`)}function p(r,t){const o=r.map(({title:a,description:e,url:s,urlToImage:c,publishedAt:d})=>`<article class="card">
        <img
          class="card-img-top"
          src="${c||"https://placehold.co/600x400?text=Hot news"}"
          alt="${a}"
        />
        <div class="card-body">
          <h5 class="card-title">${u(a,40)}</h5>
          <p class="card-text">${u(e)}</p>
          <p class="card-text">
            <small class="text-body-secondary">${d}</small>
          </p>
          <a href="${s}" class="btn btn-outline-primary" target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      </article>`).join("");t.insertAdjacentHTML("beforeend",o)}let i=1,l=null,g=0;n.form.addEventListener("submit",b);n.loadMoreBtn.addEventListener("click",v);async function b(r){r.preventDefault();const t=r.currentTarget;l=t.elements.newsKeyword.value,n.container.innerHTML="",i=1;try{const{articles:o,totalResults:a}=await m(l,i);g=Math.ceil(a/h),p(o,n.container),n.loadMoreBtn.classList.remove("is-hidden")}catch(o){console.log(o),n.loadMoreBtn.classList.add("is-hidden"),f.error({message:o.message})}finally{t.reset()}}async function v(r){i+=1;try{n.loader.classList.remove("is-hidden");const{articles:t}=await m(l,i);p(t,n.container),M(),i>=Math.min(g,16)&&(n.loadMoreBtn.classList.add("is-hidden"),f.success({message:"It is last page"}))}catch(t){console.log(t)}finally{n.loader.classList.add("is-hidden")}}function M(){const o=n.container.lastElementChild.getBoundingClientRect().height*2;window.scrollBy({top:o,left:0,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
