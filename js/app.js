const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const money = n => `$${n.toFixed(2)}`;
function getCart(){ return JSON.parse(localStorage.getItem("cart")||"[]") }
function setCart(c){ localStorage.setItem("cart", JSON.stringify(c)); updateCartCount() }
function updateCartCount(){ const n=getCart().length; $$("#cartCount").forEach(e=>e.textContent=n) }
function toast(m){ let t=$("#toast"); if(!t){ t=document.createElement("div"); t.id="toast"; document.body.appendChild(t) } t.textContent=m; t.className="show"; clearTimeout(t._t); t._t=setTimeout(()=>t.className="",2000) }
function tgAdd(id){ const p=PACKS.find(x=>x.id===id); if(!p?.telegram){ toast("Telegram pack coming soon"); return } toast("Opening Telegram…"); window.open(p.telegram,"_blank") }

// Returns the cover art markup for a pack: a real image if one exists, else the emoji placeholder.
function coverArt(p){
  return p.cover
    ? `<img src="images/packs/${p.id}/cover.png" alt="${p.name}" loading="lazy" onerror="this.parentElement.innerHTML='<span class=&quot;art-emoji&quot;>${p.emoji}</span>'">`
    : `<span class="art-emoji">${p.emoji}</span>`;
}
function stickerArt(p,i){
  return p.stickerFiles && i < p.stickerFiles
    ? `<img src="images/packs/${p.id}/${String(i+1).padStart(2,"0")}.png" alt="" loading="lazy" onerror="this.parentElement.textContent='${[p.emoji,"✨","💬","⭐","🌈"][i%5]}'">`
    : [p.emoji,"✨","💬","⭐","🌈"][i%5];
}

function card(p){
  return `<article class="pack-card"><a href="pack.html?id=${p.id}">
    <div class="pack-art">${coverArt(p)}<span class="tag ${p.price?"":"tag-free"}">${p.price?money(p.price):"Free"}</span></div>
    <div class="pack-info"><h3>${p.name}</h3><span class="count">${p.stickers} stickers</span></div>
  </a></article>`;
}
function renderPacks(el, items){ if(el) el.innerHTML = items.map(card).join("") }

function initHome(){ renderPacks($("#featuredPacks"), PACKS.slice(0,4)) }
function initShop(){ renderPacks($("#allPacks"), PACKS); $("#packCount").textContent = `${PACKS.length} pack${PACKS.length===1?"":"s"}` }

function initPack(){
  const id = new URLSearchParams(location.search).get("id") || PACKS[0].id;
  const p = PACKS.find(x=>x.id===id) || PACKS[0];
  document.title = `${p.name} — ${CREATOR.name}`;
  const grid = Array.from({length:p.stickers},(_,i)=>{
    const locked = p.price>0 && i>=p.preview;
    return `<div class="sticker-tile ${locked?"locked":""}">${stickerArt(p,i)}${locked?'<span class="lock">🔒</span>':""}</div>`;
  }).join("");
  const buy = p.price
    ? `<button class="btn btn-primary full" onclick="addToCart('${p.id}')">Unlock pack — ${money(p.price)}</button>`
    : `<button class="btn btn-primary full" onclick="tgAdd('${p.id}')">Add to Telegram</button>`;
  const related = PACKS.filter(x=>x.id!==p.id).slice(0,3);
  $("#packDetail").innerHTML = `
    <nav class="crumbs"><a href="index.html">Home</a> / <a href="shop.html">All packs</a> / ${p.name}</nav>
    <div class="pack-detail-grid">
      <div class="detail-art">${coverArt(p)}</div>
      <div class="detail-copy">
        <h1>${p.name}</h1><p class="lead">${p.desc}</p>
        <div class="detail-price">${p.price?money(p.price):"Free"}</div>
        <ul class="included"><li>${p.stickers} stickers</li><li>Works with Telegram</li><li>Instant access</li></ul>
        ${buy}
        <p class="hint">${p.price?`${p.preview} of ${p.stickers} shown below`:`All ${p.stickers} stickers are free`}</p>
      </div>
    </div>
    <section class="section"><h2>What's inside</h2><div class="sticker-grid">${grid}</div></section>
    ${related.length?`<section class="section"><h2>More packs</h2><div class="pack-grid" id="relatedPacks"></div></section>`:""}
  `;
  renderPacks($("#relatedPacks"), related);
}

function addToCart(id){ const p=PACKS.find(x=>x.id===id); if(!p||!p.price) return; const c=getCart(); if(!c.includes(id)) c.push(id); setCart(c); location.href="cart.html" }
function removeCart(id){ setCart(getCart().filter(x=>x!==id)); initCart() }

function initCart(){
  const items = getCart().map(id=>PACKS.find(p=>p.id===id)).filter(Boolean);
  const wrap = $("#cartItems"), sum = $("#cartSummary");
  if(!items.length){ wrap.innerHTML = `<div class="empty-box"><h3>Your cart is empty</h3><p>Find a pack you like and come back here.</p><a class="btn btn-primary" href="shop.html">Browse packs</a></div>`; sum.innerHTML=""; return }
  wrap.innerHTML = items.map(p=>`<div class="cart-row"><div class="cart-art">${coverArt(p)}</div><div class="grow"><b>${p.name}</b><div class="meta-line">${p.stickers} stickers</div></div><strong>${money(p.price)}</strong><button class="remove" onclick="removeCart('${p.id}')">Remove</button></div>`).join("");
  const total = items.reduce((a,p)=>a+p.price,0);
  //sum.innerHTML = `<div class="summary-line"><span>Subtotal</span><b>${money(total)}</b></div><div class="total-row"><span>Total</span><strong>${money(total)}</strong></div><a class="btn btn-primary full" href="checkout.html">Checkout</a>`;
  sum.innerHTML = `<div class="summary-line"><span>Subtotal</span><b>${money(total)}</b></div><div class="total-row"><span>Total</span><strong>${money(total)}</strong></div><button class="btn btn-primary full" disabled>Checkout — temporarily unavailable</button>`;
}

function initCheckout(){
  const items = getCart().map(id=>PACKS.find(p=>p.id===id)).filter(Boolean);
  const total = items.reduce((a,p)=>a+p.price,0);
  $("#checkoutItems").innerHTML = items.map(p=>`<div class="summary-line"><span>${p.name}</span><b>${money(p.price)}</b></div>`).join("");
  $("#checkoutTotal").textContent = money(total);
  $("#payButton").textContent = `Pay ${money(total)}`;
  $("#checkoutForm")?.addEventListener("submit", e=>{
    e.preventDefault();
    localStorage.setItem("purchased", JSON.stringify([...new Set([...(JSON.parse(localStorage.getItem("purchased")||"[]")), ...getCart()])]));
    localStorage.removeItem("cart");
    location.href = "success.html";
  });
}

function initSuccess(){
  const items = (JSON.parse(localStorage.getItem("purchased")||"[]")).map(id=>PACKS.find(p=>p.id===id)).filter(Boolean);
  $("#downloads").innerHTML = items.length ? items.map(p=>`<div class="download-item"><span><b>${p.name}</b></span><div class="dl-actions"><button class="btn btn-secondary" onclick="toast('Placeholder download: connect file storage here.')">Download</button><button class="btn btn-primary" onclick="tgAdd('${p.id}')">Add to Telegram</button></div></div>`).join("") : `<p>No recent purchases found.</p>`;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  $(".menu-btn")?.addEventListener("click", ()=>document.body.classList.toggle("nav-open"));
  const page = document.body.dataset.page;
  if(page==="home") initHome();
  if(page==="shop") initShop();
  if(page==="pack") initPack();
  if(page==="cart") initCart();
  if(page==="checkout") initCheckout();
  if(page==="success") initSuccess();
});
