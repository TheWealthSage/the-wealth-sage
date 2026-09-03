const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');if(menu&&nav)menu.addEventListener('click',()=>nav.classList.toggle('open'));

/* Make in-article navigation links unmistakably clickable. */
(function(){
  const style=document.createElement('style');
  style.textContent='.article-body a:not(.btn){color:var(--gold);font-weight:600;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;transition:color .18s,background .18s,padding .18s,box-shadow .18s;border-radius:2px}.article-body a:not(.btn):hover{color:#111;background:var(--gold);padding:2px 5px;box-shadow:0 0 0 2px rgba(199,166,106,.12)}.article-body a:not(.btn):focus-visible{outline:2px solid var(--gold);outline-offset:3px}';
  document.head.appendChild(style);
})();