const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');if(menu&&nav)menu.addEventListener('click',()=>nav.classList.toggle('open'));

/* Clean article navigation and present related reading as a quiet end-of-article panel. */
(function(){
  const article=document.querySelector('.article-body');
  if(!article) return;

  const related={
    'article-50-30-20.html':[
      ['Pay Yourself First','article-pay-yourself-first.html'],
      ['The Lifestyle Creep Trap','article-lifestyle-creep.html'],
      ['Your Emergency Fund','article-emergency-fund.html']
    ],
    'article-assets-vs-income.html':[
      ['What Is an Asset?','article-what-is-an-asset.html'],
      ['How to Build Wealth','article-building-wealth.html'],
      ['Pay Yourself First','article-pay-yourself-first.html']
    ],
    'article-building-wealth.html':[
      ['Assets vs Income','article-assets-vs-income.html'],
      ['What Is an Asset?','article-what-is-an-asset.html'],
      ['Increase Your Earning Power','article-increase-earning-power.html']
    ],
    'article-earning-power-vs-salary.html':[
      ['How to Increase Earning Power','article-increase-earning-power.html'],
      ['Assets vs Income','article-assets-vs-income.html'],
      ['How to Build Wealth','article-building-wealth.html']
    ],
    'article-emergency-fund.html':[
      ['Pay Yourself First','article-pay-yourself-first.html'],
      ['The 50/30/20 Rule','article-50-30-20.html'],
      ['What Is an Asset?','article-what-is-an-asset.html']
    ],
    'article-increase-earning-power.html':[
      ['Earning Power vs Salary','article-earning-power-vs-salary.html'],
      ['Assets vs Income','article-assets-vs-income.html'],
      ['How to Build Wealth','article-building-wealth.html']
    ],
    'article-lifestyle-creep.html':[
      ['The 50/30/20 Rule','article-50-30-20.html'],
      ['Pay Yourself First','article-pay-yourself-first.html'],
      ['Assets vs Income','article-assets-vs-income.html']
    ],
    'article-pay-yourself-first.html':[
      ['What Does Pay Yourself First Mean?','article-what-does-pay-yourself-first-mean.html'],
      ['The 50/30/20 Rule','article-50-30-20.html'],
      ['Your Emergency Fund','article-emergency-fund.html']
    ],
    'article-what-does-pay-yourself-first-mean.html':[
      ['Pay Yourself First','article-pay-yourself-first.html'],
      ['The 50/30/20 Rule','article-50-30-20.html'],
      ['How to Build Wealth','article-building-wealth.html']
    ],
    'article-what-is-an-asset.html':[
      ['Assets vs Income','article-assets-vs-income.html'],
      ['How to Build Wealth','article-building-wealth.html'],
      ['Increase Your Earning Power','article-increase-earning-power.html']
    ]
  };

  /* Remove cross-article links from the body while keeping their visible wording. */
  article.querySelectorAll('a[href]').forEach(link=>{
    const href=link.getAttribute('href')||'';
    if(/^article-[^/]+\.html(?:#.*)?$/.test(href)) link.replaceWith(document.createTextNode(link.textContent));
  });

  /* Remove legacy related-text sections so the new component is the only related-article UI. */
  article.querySelectorAll('h2').forEach(h=>{
    if(/^(related systems|related articles|continue reading)$/i.test(h.textContent.trim())){
      let node=h;
      while(node && node.nextElementSibling) node=node.nextElementSibling;
      h.remove();
      const lastParagraph=article.querySelector('h2:last-of-type');
      if(lastParagraph && /^(related systems|related articles|continue reading)$/i.test(lastParagraph.textContent.trim())) lastParagraph.remove();
    }
  });

  const current=(location.pathname.split('/').pop()||'').toLowerCase();
  const items=related[current]||[];
  if(!items.length) return;

  const style=document.createElement('style');
  style.textContent=`
    .related-reading{margin-top:64px;padding:28px 30px 30px;background:#111619;border:1px solid rgba(199,166,106,.35);box-shadow:0 18px 50px rgba(0,0,0,.18)}
    .related-reading h2{font-family:"Playfair Display",serif;font-size:34px;line-height:1.15;margin:0 0 8px;color:#f4f1e9}
    .related-reading p{margin:0 0 18px;color:#a8aaa5;font-size:14px}
    .related-reading-list{display:grid;gap:10px}
    .related-reading-link{display:block;color:#d5d3cc;font-size:15px;line-height:1.45;transition:color .18s,transform .18s}
    .related-reading-link::after{content:" →";color:#c7a66a;font-weight:700}
    .related-reading-link:hover{color:#c7a66a;transform:translateX(3px)}
    .related-reading-link:focus-visible{outline:2px solid #c7a66a;outline-offset:4px}
    @media(max-width:520px){.related-reading{margin-top:48px;padding:24px 20px}.related-reading h2{font-size:29px}.related-reading-link{font-size:14px}}
  `;
  document.head.appendChild(style);

  const box=document.createElement('section');
  box.className='related-reading';
  box.setAttribute('aria-labelledby','related-reading-title');
  box.innerHTML='<h2 id="related-reading-title">Continue reading</h2><p>Explore the related ideas below and build the bigger picture.</p><div class="related-reading-list"></div>';
  const list=box.querySelector('.related-reading-list');
  items.forEach(([title,href])=>{
    const a=document.createElement('a');
    a.className='related-reading-link';
    a.href=href;
    a.textContent=title;
    list.appendChild(a);
  });
  article.appendChild(box);
})();