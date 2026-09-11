/* ---------- DATOS DE LA CARTA ----------
   Categorías y productos reales, fotografiados por Matías directo del
   menú físico pegado en el local (11-09-2026) — reemplaza la versión
   anterior armada solo con fotos de Instagram y reseñas. Sigue sin haber
   ningún precio publicado en ningún canal, así que todo queda
   "Consultar" hasta tener una fuente confirmada. */
const MENU = {
  almuerzo: {
    label: 'Menú del Día',
    groups: [{ title:'Cambia día a día — almuerzo casero real', items: [
      { n: 'Costillar con puré de papas', d: 'Con ensalada de cebolla morada — plato real fotografiado en el local', img: 'fotos/almuerzo-costillar.jpg' },
      { n: 'Menú del día', d: 'Cambia diariamente, consultar disponibilidad' },
    ]}]
  },
  cafeteria: {
    label: 'Cafetería',
    groups: [{ items: [
      { n: 'Café', d: 'El más mencionado en las reseñas reales del local', img: 'fotos/cafe-taza.jpg' },
    ]}]
  },
  desayunos: {
    label: 'Desayunos',
    groups: [{ items: [
      { n: 'Ave palta', d: 'Del menú físico del local' },
      { n: 'Ave pimentón', d: 'Del menú físico del local' },
      { n: 'Barros luco', d: 'Del menú físico del local' },
      { n: 'Paila de huevo', d: 'Del menú físico del local' },
      { n: 'Tostadas', d: 'Del menú físico del local' },
    ]}]
  },
  bolleria: {
    label: 'Pastelería y Bollería',
    groups: [{ items: [
      { n: 'Bollería y pastelería', d: 'Croissants y dulces horneados del día, del menú físico del local' },
      { n: 'Tortas caseras', d: 'Repostería hecha en casa, mencionada en varias reseñas reales' },
    ]}]
  },
  bebidas: {
    label: 'Jugos y Bebidas',
    groups: [{ items: [
      { n: 'Jugos naturales', d: 'Del menú físico del local' },
      { n: 'Bebidas', d: 'Del menú físico del local' },
    ]}]
  },
  quiches: {
    label: 'Quiches',
    groups: [{ items: [
      { n: 'Quiche del día', d: 'Del menú físico del local — variedad a consultar' },
    ]}]
  },
  empanadas: {
    label: 'Empanadas',
    groups: [{ items: [
      { n: 'Empanada frita, de queso o pino', d: 'Con mostaza y pebre — fotografiadas reales en el local y confirmadas en su menú físico', img: 'fotos/empanadas-fritas.jpg' },
    ]}]
  },
  sandwich: {
    label: 'Sándwich',
    groups: [{ items: [
      { n: 'Churrasco italiano', d: 'Del menú físico del local' },
      { n: 'Churrasco luco', d: 'Del menú físico del local' },
      { n: 'Churrasco chacarero', d: 'Del menú físico del local' },
    ]}]
  },
  ensaladas: {
    label: 'Ensaladas',
    groups: [{ items: [
      { n: 'César', d: 'Del menú físico del local' },
      { n: 'Vegetariana', d: 'Del menú físico del local' },
      { n: 'Atún', d: 'Del menú físico del local' },
    ]}]
  }
};

const money = n => n ? '$' + n.toLocaleString('es-CL') : 'Consultar';

const tabsEl = document.getElementById('menuTabs');
const panelsEl = document.getElementById('menuPanels');
const catKeys = Object.keys(MENU);

catKeys.forEach((key, i) => {
  const tab = document.createElement('button');
  tab.className = 'menu-tab' + (i===0 ? ' active':'');
  tab.textContent = MENU[key].label;
  tab.addEventListener('click', () => showTab(key));
  tab.dataset.key = key;
  tabsEl.appendChild(tab);

  const panel = document.createElement('div');
  panel.className = 'menu-panel' + (i===0 ? ' active':'');
  panel.id = 'panel-' + key;

  MENU[key].groups.forEach(group => {
    if(group.title){
      const h = document.createElement('div');
      h.className = 'menu-group-title';
      h.textContent = group.title;
      panel.appendChild(h);
    }
    const grid = document.createElement('div');
    grid.className = 'menu-grid';
    group.items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'menu-item';
      row.addEventListener('click', () => openModal(item));

      if(item.img){
        const photo = document.createElement('div');
        photo.className = 'menu-item-photo';
        const photoImg = document.createElement('img');
        photoImg.src = item.img;
        photoImg.alt = item.n;
        photo.appendChild(photoImg);
        row.appendChild(photo);
      }

      const textWrap = document.createElement('div');
      textWrap.className = 'menu-item-text';

      const nameSpan = document.createElement('span');
      nameSpan.className = 'name';
      nameSpan.textContent = item.n;
      textWrap.appendChild(nameSpan);

      if(item.v){
        const vegTag = document.createElement('span');
        vegTag.className = 'veg-tag';
        vegTag.textContent = 'VEG';
        textWrap.appendChild(vegTag);
      }

      if(item.d){
        const descDiv = document.createElement('div');
        descDiv.className = 'desc';
        descDiv.textContent = item.d;
        textWrap.appendChild(descDiv);
      }

      const priceDiv = document.createElement('div');
      priceDiv.className = 'price mono';
      priceDiv.textContent = money(item.p);

      row.appendChild(textWrap);
      row.appendChild(priceDiv);
      grid.appendChild(row);
    });
    panel.appendChild(grid);
  });
  panelsEl.appendChild(panel);
});

function showTab(key){
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.toggle('active', t.dataset.key === key));
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + key));
}

/* ---------- MODAL PRODUCTO ---------- */
let currentItem = null;
function openModal(item){
  currentItem = item;
  document.getElementById('modalName').textContent = item.n;
  document.getElementById('modalPrice').textContent = money(item.p);
  document.getElementById('modalDesc').textContent = item.d || 'Preparado real de la carta de Cafe Taurunum.';
  const photoWrap = document.getElementById('modalPhoto');
  if(item.img){
    photoWrap.innerHTML = '';
    const photoImg = document.createElement('img');
    photoImg.src = item.img;
    photoImg.alt = item.n;
    photoWrap.appendChild(photoImg);
    photoWrap.style.display = 'block';
  } else {
    photoWrap.style.display = 'none';
  }
  toggleModal(true);
}
document.getElementById('modalAddBtn').addEventListener('click', () => {
  addToCart(currentItem);
  toggleModal(false);
  toggleCart(true);
});
function toggleModal(open){ document.getElementById('modalOverlay').classList.toggle('open', open); }

/* ---------- CARRITO ---------- */
let cart = [];
function addToCart(item){
  const existing = cart.find(c => c.n === item.n);
  if(existing){ existing.qty++; } else { cart.push({...item, qty:1}); }
  renderCart();
}
function changeQty(name, delta){
  const line = cart.find(c => c.n === name);
  if(!line) return;
  line.qty += delta;
  if(line.qty <= 0) cart = cart.filter(c => c.n !== name);
  renderCart();
}
function renderCart(){
  const linesEl = document.getElementById('cartLines');
  const totalEl = document.getElementById('cartTotal');
  const countEl = document.getElementById('cartCount');
  const totalQty = cart.reduce((s,c) => s + c.qty, 0);
  countEl.textContent = totalQty;
  if(cart.length === 0){
    linesEl.innerHTML = '<p class="cart-empty">Todavía no agregaste nada.</p>';
    totalEl.textContent = 'A consultar';
    return;
  }
  linesEl.innerHTML = '';
  cart.forEach(line => {
    const div = document.createElement('div');
    div.className = 'cart-line';
    div.innerHTML = `
      <div>
        <div class="name">${line.n}</div>
        <div class="qty-ctrl">
          <button class="qty-btn" data-name="${line.n}" data-delta="-1">−</button>
          <span class="mono">${line.qty}</span>
          <button class="qty-btn" data-name="${line.n}" data-delta="1">+</button>
        </div>
      </div>
      <div class="price mono">${money(line.p)}</div>
    `;
    linesEl.appendChild(div);
  });
  totalEl.textContent = 'A consultar';
  linesEl.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => changeQty(btn.dataset.name, parseInt(btn.dataset.delta)));
  });
}
document.getElementById('cartBtn').addEventListener('click', () => toggleCart(true));
document.getElementById('cartCloseBtn').addEventListener('click', () => toggleCart(false));
function toggleCart(open){ document.getElementById('cartOverlay').classList.toggle('open', open); }

document.getElementById('modalCloseBtn').addEventListener('click', () => toggleModal(false));
[document.getElementById('cartOverlay'), document.getElementById('modalOverlay')].forEach(ov => {
  ov.addEventListener('click', (e) => { if(e.target === ov) ov.classList.remove('open'); });
});

/* ---------- NAV MÓVIL Y NAVEGACIÓN POR PESTAÑAS ---------- */
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

const panels = document.querySelectorAll('.tab-panel');
function goToTab(tabId){
  panels.forEach(p => p.classList.toggle('active', p.dataset.tabPanel === tabId));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.tab === tabId));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('navLinks').classList.remove('open');
  initScrollReveal();
}

document.querySelectorAll('[data-tab]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    goToTab(el.dataset.tab);
  });
});

/* ---------- INDICADOR ABIERTO/CERRADO EN VIVO
   Horario actualizado (11-09-2026) desde el menú físico pegado en el
   local, fuente más reciente y confiable que la bio de Instagram usada
   antes: Lunes a viernes 9:00-20:00 · Sábado 10:00-17:00 · Domingo
   cerrado. */
function getTodayHours(){
  const day = new Date().getDay(); // 0=domingo ... 6=sábado
  if(day === 0) return null; // domingo cerrado
  if(day >= 1 && day <= 5) return [9*60, 20*60];
  return [10*60, 17*60]; // sábado
}
function updateOpenStatus(dotId, textId){
  const dot = document.getElementById(dotId);
  const text = document.getElementById(textId);
  if(!dot || !text) return;
  const now = new Date();
  const minutes = now.getHours()*60 + now.getMinutes();
  const hours = getTodayHours();
  const isOpen = hours && minutes >= hours[0] && minutes < hours[1];
  text.textContent = isOpen ? 'Abierto ahora' : 'Cerrado ahora';
  dot.classList.toggle('closed', !isOpen);
}
updateOpenStatus('statusDot', 'statusText');
updateOpenStatus('statusDot2', 'statusText2');

/* ---------- SCROLL REVEAL (entrada ordenada al hacer scroll) ----------
   Solo agrega/observa animación de entrada — la navegación sigue siendo
   100% por pestañas (SPA), esto NO es sticky-scroll. Incluye red de
   seguridad por si IntersectionObserver no dispara a tiempo. */
function initScrollReveal(){
  const els = document.querySelectorAll('.reveal:not(.revealed)');
  if(!('IntersectionObserver' in window)){
    els.forEach(el => el.classList.add('revealed'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  els.forEach((el, i) => {
    el.style.transitionDelay = (Math.min(i % 6, 6) * 60) + 'ms';
    io.observe(el);
  });
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.revealed)').forEach(el => el.classList.add('revealed'));
  }, 1200);
}
initScrollReveal();

/* ---------- PANTALLA DE CARGA (rápida, <1s) ---------- */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
  }, 350);
});
