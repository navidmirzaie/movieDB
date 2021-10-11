const w=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function o(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerpolicy&&(s.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?s.credentials="include":i.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=o(i);fetch(i.href,s)}};w();const u="4ffb1f9c",f="https://www.omdbapi.com/";function h(t,e){return e==="detail"?e="i":e==="search"&&(e="s"),console.log(`${f}?${e}=${t}&apikey=${u}`),fetch(`${f}?${e}=${t}&apikey=${u}`).then(n=>n.json())}function L(t,e){return t.filter(o=>o.Type===e)}function l(t="",e="",o="",n="",i="",s="",r="",a="",y="",b=""){this.imdbID=t,this.Title=e,this.Year=o,this.Poster=n,this.Plot=i,this.Released=s,this.Genre=r,this.Director=a,this.Actors=y,this.imdbRating=b}l.prototype.showGenre=function(){return this.Genre.split(",").map(e=>`<li class='genre'>${e}</li>`).join("")};l.prototype.showRating=function(){let t="rating--good";return this.imdbRating<="5.5"&&(t="rating--bad"),`<div class='rating ${t}'>${this.imdbRating}</div>`};l.prototype.renderDetails=function(){return`
        <header class="modal-header">
            <div class='cover'>
                <img src='${this.Poster}' class='box-art box-art--large' alt='Cover of the movie ${this.Title}'>
            </div>
            <div class='title title--large'>
                <h3>${this.Title}</h3>
                <p class='plot'>${this.Plot}</p>
                ${this.showRating()}
            </div>
        </header>
        <main class="modal-main">
            <ul class='genre'>
               ${this.showGenre()}
            </ul>
            <ul class='additional-info'>
                <li>
                    <span class='key'>Director</span>
                    <span class='value'>${this.Director}</span>
                </li>
            </ul>
            <ul class='additional-info'>
                <li>
                    <span class='key'>Actors</span>
                    <span class='value'>${this.Actors}</span>
                </li>
            </dl>
        </main>
    `};l.prototype.render=function(){return this.Poster==="N/A"&&(this.Poster="https://icon2.cleanpng.com/20180202/wiw/kisspng-popcorn-maker-clip-art-popcorn-transparent-png-5a74c09246fb20.2194118515176009142908.jpg"),`
        <div class='movie' data-imdb='${this.imdbID}' tabindex='0'>
            <div class='cover'>
                <img src='${this.Poster}' class='box-art' alt='Cover of the movie ${this.Title}'>
            </div>
            <div class='title'>
                <h3>${this.Title}</h3>
                <span class='year'>${this.Year}</span>
            </div>
            <div class='detail-call-to-action'>
                <button id='movie-detail' class='show-detail'>Show detail</button>
            </div>
        </div>
    `};const m=document.querySelector(".movies-wrapper"),p=document.querySelector("#searchbar"),$=document.querySelector("#search"),c=document.querySelector(".modal-window"),d=document.querySelector(".modal-window .modal-content"),D=document.querySelector(".modal-window .close");function E(){$.addEventListener("click",g),p.addEventListener("keyup",function(t){t.keyCode===13&&(t.preventDefault(),g(t))}),d.addEventListener("keyup",function(t){t.keyCode===27&&(t.preventDefault(),v())}),D.addEventListener("click",t=>{v()})}function T(){c.classList.remove("close-modal"),c.classList.add("open-modal"),d.focus()}function v(){c.classList.add("close-modal"),c.classList.remove("open-modal")}async function g(t){t.preventDefault();let e=p.value;const o=await h(e,"search");try{O(o.Search)}catch(n){m.innerHTML=`<strong>${o.Error} try typing the correct title</strong>`}}function O(t){let e="",o=null;const n=L(t,"movie");for(let{imdbID:i,Title:s,Year:r,Poster:a}of n)o=new l(i,s,r,a),e+=o.render();e+="</div>",m.innerHTML=e,M()}async function M(){document.querySelectorAll(".movie").forEach(e=>{e.addEventListener("click",function(o){o.preventDefault();const i=o.currentTarget.getAttribute("data-imdb");A(i)})})}async function A(t){const e=await h(t,"detail"),o=new l(e.imdbID,e.Title,e.Year,e.Poster,e.Plot,e.Released,e.Genre,e.Director,e.Actors,e.imdbRating);console.log(e),d.innerHTML=o.renderDetails(),T()}window.addEventListener("DOMContentLoaded",E);
