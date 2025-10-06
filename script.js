/* viewport vh fix */
const setVH = () =>
  document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
setVH(); 
addEventListener('resize', setVH, { passive: true });

/* helpers */
const $ = (s, r = document) => r.querySelector(s);
const fmt = s => `${String((s / 60) | 0).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

/* prevent closing overlays with ESC while open */
window.addEventListener('keydown', e => {
  if (document.body.classList.contains('modal-open') && e.key === 'Escape') { e.preventDefault(); }
});

/* codename generator */
const LEFT  = ["Atomic","Rusty","Frisky","Busted","Rad","Plutonium","Gamma","Hot","Greasy","Wobbly","Wild","Sneaky","Stubborn","Leaky","Dirty","Neutron"];
const RIGHT = ["Viper","Skunk","Crane","Compass","Rod","Bear","Raccoon","Otter","Badger","Goose","Elephant","Walker","Gator","Coyote","Pigeon","Bulldog"];
const randName = ()=> `${LEFT[(Math.random()*LEFT.length)|0]} ${RIGHT[(Math.random()*RIGHT.length)|0]}`;

/* elements */
const EL = {
  menu:$('#menu'), hud:$('#hud'),
  start:$('#btn-start'), help:$('#btn-help'),
  csPreview:$('#cs-preview'), csRand:$('#cs-rand'),
  greetName:$('#greet-name'), btnMenu:$('#btn-menu'), btnMute:$('#btn-mute'),

  log:$('#log'),
  map:$('#map'), mapWrap:$('#map-wrap'), mapPanel:$('#map-panel'),
  mapHead:$('#map-head'), mapFoot:$('#map-foot'),
  mapLevel:$('#map-level'), mapTitle:$('#map-title'), mapClock:$('#map-clock'),
  scanCount:$('#scan-count'),

  stats:{ energy:$('#st-energy'), source:$('#st-source'), geiger:$('#st-geiger') },
  suit:$('#suit'),

  mus:{ menu:$('#mus-menu'), game:$('#mus-game') },
  sfx:{ signal:$('#sfx-signal'), rad:$('#sfx-rad'), radio:$('#sfx-radio'), win:$('#sfx-win'), hit:$('#sfx-hit'), lose:$('#sfx-lose') },

  modHelp:$('#modal-help'), helpClose:$('#help-close'),
  modIntel:$('#modal-intel'), intelImg:$('#intel-img'), intelText:$('#intel-text'), intelClose:$('#intel-close'),
  modBrief:$('#modal-brief'), briefTitle:$('#brief-title'), briefBody:$('#brief-body'), briefGo:$('#brief-go'),
  modEnd:$('#modal-end'), endTitle:$('#end-title'), endText:$('#end-text'),
  endNext:$('#end-next'), endRetry:$('#end-retry'), endClose:$('#end-close'), endArt:$('#end-art'), endBest:$('#end-best'),

  modFinale:$('#modal-finale'), finaleTitle:$('#finale-title'), finaleText:$('#finale-text'),
  finaleBest:$('#finale-best'), finaleClose:$('#finale-close')
};

/* ====== Story text ====== */
const LORE = {
  kramatorsk:[`You were called to a drab apartment block in <b>Kramatorsk</b>...<br><br><span class="rat-line">Special Agent Rat:</span> "Mmm-hmm... smells like trouble, darlin'. Let's rip 'em walls apart!"`,
    `A mailbox row hums softly and the elevator wheezes...<br><br><span class="rat-line">Special Agent Rat:</span> "Symptoms point down. Trust 'em. Work the core, not the corners."`,
    `Cracked plaster along column four...<br><br><span class="rat-line">Special Agent Rat:</span> "Secrets itch. We scratch."`,
    `A repair log and a rust-bloomed stairwell...<br><br><span class="rat-line">Special Agent Rat:</span> "Find the trinket. Make it quiet."`],
  tmi:[`Anxious whispers ride the river by <b>Three Mile Island</b>...<br><br><span class="rat-line">Special Agent Rat:</span> "Y'all ready? I brought extra claws."`,
    `A valve chart with coffee stains...<br><br><span class="rat-line">Special Agent Rat:</span> "Bypass on row three. Noise ain't signal - cut through it."`,
    `Crane lines groan and badge logs disagree...<br><br><span class="rat-line">Special Agent Rat:</span> "Chase the slope, not the squeal."`,
    `Condensation maps a story nobody published...<br><br><span class="rat-line">Special Agent Rat:</span> "Metal mourns different than water. Find the metal's grief."`],
  windscale:[`Ash ghosts linger around <b>Windscale</b>...<br><br><span class="rat-line">Special Agent Rat:</span> "Walls or smokestacks, sugar - everything comes apart the same."`,
    `The vents still breathe north...<br><br><span class="rat-line">Special Agent Rat:</span> "North breath, hot teeth."`,
    `A brittle fire sketch shows a tight cluster...<br><br><span class="rat-line">Special Agent Rat:</span> "Smoke lies. Ash tells the truth."`,
    `A bent thermometer rattles a confession...<br><br><span class="rat-line">Special Agent Rat:</span> "Heat leaves footprints. Count 'em."`],
  goiania:[`In <b>Goiania</b>...<br><br><span class="rat-line">Special Agent Rat:</span> "Shiny's fine - 'til it ain't. Let's pry it loose."`,
    `Blue specks wink from concrete...<br><br><span class="rat-line">Special Agent Rat:</span> "Shiny strolls west. Keep your paws steady."`,
    `Decon chalk marks row six clean...<br><br><span class="rat-line">Special Agent Rat:</span> "Spend sweat where it pays."`,
    `Fragments plant false peaks...<br><br><span class="rat-line">Special Agent Rat:</span> "Read the crown, not the jewel."`],
  kyshtym:[`Maps get fuzzy around <b>Kyshtym (Mayak)</b>...<br><br><span class="rat-line">Special Agent Rat:</span> "I'll sniff - y'all smash. Teamwork."`,
    `Reeds whisper southeast...<br><br><span class="rat-line">Special Agent Rat:</span> "Drift says SE. Bias your paws."`,
    `Third ring bites the hardest...<br><br><span class="rat-line">Special Agent Rat:</span> "Stand in the hurt; find its heart."`,
    `Compass cards are just polite suggestions...<br><br><span class="rat-line">Special Agent Rat:</span> "Bias the nose, not the pride."`],
  fukushima:[`Seawalls mutter and turbines hum at <b>Fukushima Daiichi</b>...<br><br><span class="rat-line">Special Agent Rat:</span> "If it sloshes, we squish it."`,
    `The tide plays courier...<br><br><span class="rat-line">Special Agent Rat:</span> "Quiet pipes worry me more."`,
    `A drone saw a hot ring...<br><br><span class="rat-line">Special Agent Rat:</span> "Circle the crown, don't dive the core."`,
    `Blueprint fragments whisper ductwork secrets...<br><br><span class="rat-line">Special Agent Rat:</span> "Blueprints breathe if you listen."`],
  chernobyl:[`Ferris wheels don't laugh in <b>Pripyat</b>...<br><br><span class="rat-line">Special Agent Rat:</span> "Hush now. Tear slow. Hit hard."`,
    `Evac maps cleared row seven...<br><br><span class="rat-line">Special Agent Rat:</span> "Spend minutes where time refused to go."`,
    `Spikes NE of the wheel...<br><br><span class="rat-line">Special Agent Rat:</span> "Read the earth."`,
    `Calibrate your ears and your meter...<br><br><span class="rat-line">Special Agent Rat:</span> "Harmony finds the source."`]
};

const RAT_VICTORY_QUOTES=["Source bagged. Quiet as a church fuse.","That glow had an ego. You had bigger.","Seal it, tag it, onto the next mess.","We leave places boring. That's the job.","Hot spot humbled. March on.","Sunset's safer now. Go brag to the moon.","From sizzle to silence - chef's kiss.","Containment sings sweetest when it's silent.","No applause, just fewer sirens. Perfect.","Radiance retired. Pensions denied.","You cut the heat like a rumor.","Bagged, tagged, and scientifically unfriendly.","Local wildlife says thanks in tiny squeaks."];
const RAT_FAILURE_QUOTES=["On the bright side, we found a great place not to picnic.","At least the counters got their steps in.","Containment failed - style points, though.","Well, the source is shy. We'll be louder.","If clues were sandwiches, we just skipped lunch.","Plot twist: the hotspot dodged us. Rude.","Bad reading? Good clue. Flip the next tile.","Pressure makes diamonds - and better hunters.","Setbacks aren't failures - just noisy tutorials.","We didn't lose - we learned where not to stand.","The glow flexed. Next time we flex back harder.","Note to self: fewer dramatics, more scanning.","Hotspot: 1. Ego: 0. We'll fix both.","Great rehearsal. Now for the show.","Containment took a coffee break. We're firing it.","We tripped the wire; now we cut it."];

/* ====== Levels (Level 1 = 180s = 3:00) ====== */
const LEVELS = [
  { id:'kramatorsk', name:'Kramatorsk', timer:180, grid:10, sources:1, rads:10, intel:6, baseG:0.20, noise:.12, bg:1,
    drops:[{img:'assets/intel/kram-01.png', text:'Tenants report sickness near stairwell.'},{img:'assets/intel/kram-02.png', text:'Badge readings stronger on lower floors.'},{img:'assets/intel/kram-03.png', text:'Wall repairs noted along column 4.'}]
  },
  { id:'tmi', name:'Three Mile Island', timer:300, grid:10, sources:1, rads:12, intel:6, baseG:0.22, noise:.10, bg:2,
    drops:[{img:'assets/intel/tmi-01.png', text:'Activity trending along east loop.'},{img:'assets/intel/tmi-02.png', text:'Coolant routes bypass row 3.'}]
  },
  { id:'windscale', name:'Windscale', timer:280, grid:10, sources:1, rads:14, intel:6, baseG:0.35, noise:.20, bg:3,
    drops:[{img:'assets/intel/wind-01.png', text:'Venting paths trend north.'},{img:'assets/intel/wind-02.png', text:'Fire map marks a tight cluster.'}]
  },
  { id:'goiania', name:'Goiania', timer:260, grid:10, sources:1, rads:14, intel:7, baseG:0.30, noise:.18, bg:4,
    drops:[{img:'assets/intel/goi-01.png', text:'Scrap yard trail favors the west blocks.'},{img:'assets/intel/goi-02.png', text:'Decon teams cleared row 6.'},{img:'assets/intel/goi-03.png', text:'Hot fragments cause false peaks nearby.'}]
  },
  { id:'kyshtym', name:'Kyshtym (Mayak)', timer:240, grid:10, sources:1, rads:16, intel:6, baseG:0.32, noise:.22, bg:5,
    drops:[{img:'assets/intel/kys-01.png', text:'EURT plume suggests southeast drift.'},{img:'assets/intel/kys-02.png', text:'Ring three shows strongest activity.'}]
  },
  { id:'fukushima', name:'Fukushima Daiichi', timer:240, grid:10, sources:1, rads:18, intel:8, baseG:0.35, noise:.22, bg:6,
    drops:[{img:'assets/intel/fuku-01.png', text:'Tidal model pushes contamination west.'},{img:'assets/intel/fuku-02.png', text:'North pump gallery isolated.'},{img:'assets/intel/fuku-03.png', text:'Drone sweep marks a hot ring.'},{img:'assets/intel/fuku-04.png', text:'Blueprint fragment reveals nearby ducts.'}]
  },
  { id:'chernobyl', name:'Chernobyl', timer:220, grid:10, sources:1, rads:20, intel:8, baseG:0.38, noise:.25, bg:7,
    drops:[{img:'assets/intel/chernobyl-01.png', text:'Spikes NE of the Ferris wheel.'},{img:'assets/intel/chernobyl-02.png', text:'Evac map shows row 7 cleared.'},{img:'assets/intel/chernobyl-03.png', text:'Maintenance note: nearby loop leak.'},{img:'assets/intel/chernobyl-04.png', text:'Calibration card recovered.'}]
  }
];

const runProgress = { idx: 0 };

const STATE = {
  levelIdx:0, running:false, paused:false,
  size:10, grid:[], found:0,
  energyMax:100, energy:100,
  baseG:0.2, noise:0.15, geiger:0,
  timer:0, handle:null,
  callsign:'Ranger',
  scans:0,
  muted:false
};

const getBest = ()=> parseInt(localStorage.getItem('vh_best_scans')||'0',10) || null;
const setBest = v => localStorage.setItem('vh_best_scans', String(v));

/* MAP SIZE — subtract panel borders and map border so nothing gets cropped */
function setMapSize(){
  const panelRect = EL.mapPanel.getBoundingClientRect();
  const ps = getComputedStyle(EL.mapPanel);
  const borderX = parseFloat(ps.borderLeftWidth) + parseFloat(ps.borderRightWidth);
  const borderY = parseFloat(ps.borderTopWidth) + parseFloat(ps.borderBottomWidth);
  const padX = parseFloat(ps.paddingLeft) + parseFloat(ps.paddingRight);
  const padY = parseFloat(ps.paddingTop) + parseFloat(ps.paddingBottom);
  const rowGap = parseFloat(ps.rowGap) || 0;

  const headH = EL.mapHead.getBoundingClientRect().height;
  const footH = EL.mapFoot.getBoundingClientRect().height;

  // available space inside panel content box
  const innerW = panelRect.width  - borderX - padX;
  const innerH = panelRect.height - borderY - padY - headH - footH - (rowGap*2);

  // subtract the map's own border so the *outer* size still fits
  const ms = getComputedStyle(EL.map);
  const mapBorderX = (parseFloat(ms.borderLeftWidth) + parseFloat(ms.borderRightWidth)) || 0;
  const mapBorderY = (parseFloat(ms.borderTopWidth) + parseFloat(ms.borderBottomWidth)) || 0;
  const borderMax = Math.max(mapBorderX, mapBorderY);

  const allowedOuter = Math.max(160, Math.min(innerW, innerH));
  const contentSide = Math.floor(Math.max(160, allowedOuter - borderMax));

  EL.map.style.width  = contentSide + 'px';
  EL.map.style.height = contentSide + 'px';
}
addEventListener('resize', setMapSize, {passive:true});
addEventListener('orientationchange', ()=>{ setVH(); requestAnimationFrame(setMapSize); }, {passive:true});

/* LOG */
function log(line){
  const p=document.createElement('p'); p.className='entry'; p.textContent=line;
  EL.log.appendChild(p); EL.log.scrollTop = EL.log.scrollHeight;
}

/* NAME (random-only) */
function setCallsign(name){
  STATE.callsign = (name||'').trim() || randName();
  EL.csPreview.textContent = STATE.callsign;
  localStorage.setItem('vh_callsign', STATE.callsign);
}

/* STATS */
function paintStats(){
  EL.stats.energy.textContent = `${Math.max(0,Math.round(STATE.energy))}%`;
  EL.stats.source.textContent = `${STATE.found}/1`;
  EL.stats.geiger.textContent = `${STATE.geiger.toFixed(1)} uSv/h`;
  const p = Math.max(0, Math.min(1, STATE.energy/STATE.energyMax));
  EL.suit.style.filter = `brightness(${0.6+0.4*p}) grayscale(${1-p})`;
}
function paintScans(){ EL.scanCount.textContent = STATE.scans; }

/* TIMER */
function clearClock(){ clearInterval(STATE.handle); STATE.handle = null; }
function startClock(sec){
  clearClock();
  STATE.timer = sec;
  EL.mapClock.textContent = fmt(STATE.timer);
  STATE.handle = setInterval(()=>{
    if(!STATE.running || STATE.paused) return;
    STATE.timer = Math.max(0, STATE.timer-1);
    EL.mapClock.textContent = fmt(STATE.timer);
    if(STATE.timer===0){ clearClock(); finish(false); }
  },1000);
}
const pauseTimer = (p=true)=>{ STATE.paused = p; };
const resumeTimer = ()=>{ STATE.paused = false; };

/* GRID */
function buildGrid(L){
  STATE.size = L.grid;
  const N = STATE.size*STATE.size;
  const cells = Array.from({length:N}, (_,i)=>({i,type:'empty',hint:0,scanned:false}));
  const bag = [...cells.keys()];
  const pull=()=>bag.splice((Math.random()*bag.length)|0,1)[0];

  const src = pull(); cells[src].type='source';
  for(let n=0;n<L.rads;n++){ const k=pull(); if(cells[k].type==='empty') cells[k].type='radiation'; }
  for(let n=0;n<L.intel;n++){ const k=pull(); if(cells[k].type==='empty') cells[k].type='intel'; }

  cells.forEach(c=>{
    const ax=c.i%STATE.size, ay=(c.i/STATE.size)|0;
    const bx=src%STATE.size,  by=(src/STATE.size)|0;
    const d=Math.abs(ax-bx)+Math.abs(ay-by);
    c.hint = Math.max(0,6-Math.min(6,d));
  });
  STATE.grid=cells;
}

function renderGrid(){
  EL.map.innerHTML='';
  const frag = document.createDocumentFragment();
  for(const c of STATE.grid){
    const d=document.createElement('div'); d.className='tile'; d.tabIndex=0; d.dataset.i=c.i;
    d.addEventListener('click',onScan);
    d.addEventListener('keydown',e=>{
      if(e.key===' '||e.key==='Spacebar'||e.key==='Enter'){ e.preventDefault(); onScan.call(d,e); }
    });
    frag.appendChild(d);
  }
  EL.map.appendChild(frag);
}

function revealTile(c, el){
  el.classList.add('scanned'); el.textContent='';
  if(c.type==='source'){ el.classList.add('source'); el.textContent='!'; }
  else if(c.type==='radiation'){ el.classList.add('radiation'); el.textContent='~'; }
  else if(c.type==='intel'){ el.classList.add('intel'); el.textContent='*'; }
  else{ el.classList.add('number'); el.textContent=String(c.hint); }
}

/* MODALS */
function closeAll(){ [EL.modHelp, EL.modIntel, EL.modBrief, EL.modEnd, EL.modFinale].forEach(m=>m.classList.add('hidden')); document.body.classList.remove('modal-open'); }
function open(el){ closeAll(); document.body.classList.add('modal-open'); el.classList.remove('hidden'); }

/* AUDIO CONTROL */
const AUDIO_ALL = [];
function collectAudio(){ AUDIO_ALL.splice(0, AUDIO_ALL.length, ...document.querySelectorAll('audio')); }
function setMuted(flag){
  STATE.muted = !!flag;
  AUDIO_ALL.forEach(a=> a.muted = STATE.muted);
  localStorage.setItem('vh_muted', STATE.muted ? '1':'0');
  EL.btnMute.setAttribute('aria-pressed', STATE.muted ? 'true':'false');
  EL.btnMute.textContent = STATE.muted ? 'UNMUTE' : 'MUTE';
}
function playMenuMusic(){
  try{ EL.mus.game.pause(); EL.mus.game.currentTime=0; EL.mus.menu.volume=.75; EL.mus.menu.play().catch(()=>{}); }catch{}
}
function stopMenuMusic(){ try{ EL.mus.menu.pause(); EL.mus.menu.currentTime=0; }catch{} }
function playGameMusic(){ try{ stopMenuMusic(); EL.mus.game.volume=.8; EL.mus.game.play().catch(()=>{}); }catch{} }
function stopGameMusic(){ try{ EL.mus.game.pause(); EL.mus.game.currentTime=0; }catch{} }
function stopEndSFX(){ try{ EL.sfx.win.pause(); EL.sfx.win.currentTime=0; EL.sfx.lose.pause(); EL.sfx.lose.currentTime=0; }catch{} }

/* SCAN */
function onScan(){
  if(document.body.classList.contains('modal-open')) return;
  if(!STATE.running) return;

  const idx = +this.dataset.i, c = STATE.grid[idx];
  if(!c || c.scanned) return;

  const L = LEVELS[STATE.levelIdx];

  STATE.scans += 1; paintScans();

  STATE.energy -= 3;
  STATE.geiger = STATE.baseG + c.hint*.7 + Math.random()*STATE.noise;

  c.scanned=true; revealTile(c, this);

  if(c.type==='source'){
    STATE.found=1; log(`Contamination source traced at sector ${idx}.`);
    try{ EL.sfx.hit.currentTime=0; EL.sfx.hit.play(); }catch{}
    finish(true); return;
  }else if(c.type==='radiation'){
    STATE.energy -= 7; log('Radiation pocket! Energy dropping fast.');
    try{ EL.sfx.rad.currentTime=0; EL.sfx.rad.play(); }catch{}
  }else if(c.type==='intel'){
    const drop = L.drops[(Math.random()*L.drops.length)|0] || {img:'assets/intel/fallback-1.png',text:'Sector map fragment recovered.'};
    log(`Intel recovered: ${drop.text}`);
    try{ EL.sfx.radio.currentTime=0; EL.sfx.radio.play(); }catch{}
    pauseTimer(true);
    EL.intelText.textContent = drop.text;
    EL.intelImg.src = drop.img;
    open(EL.modIntel);
  }else{
    if(c.hint>=4) log('Hot zone detected. Signals intensifying.');
    else if(c.hint>=2) log('Moderate activity nearby.');
    else log('Cold sector. Minimal readings.');
    try{ EL.sfx.signal.currentTime=0; EL.sfx.signal.play(); }catch{}
  }

  paintStats();
  if(STATE.energy<=0) finish(false);
}

/* FLOW */
function startLevel(idx){
  const L = LEVELS[idx] || LEVELS[0];
  STATE.levelIdx = idx;
  STATE.running = false; STATE.paused=false;
  STATE.found = 0;
  STATE.energy = STATE.energyMax;
  STATE.baseG = L.baseG;
  STATE.noise = L.noise;
  STATE.geiger = L.baseG;
  STATE.scans = 0;
  clearClock();

  EL.map.style.backgroundImage = `url("assets/locations/location_${L.bg}.png")`;
  EL.mapLevel.textContent = `LEVEL ${idx+1}`;
  EL.mapTitle.textContent = L.name;
  EL.mapClock.textContent = fmt(L.timer);
  paintScans();

  EL.log.innerHTML = '';
  log(`LEVEL ${idx+1}: ${L.name} - Trace the contamination source before time expires.`);

  buildGrid(L); renderGrid();

  setMapSize();
  requestAnimationFrame(setMapSize);

  paintStats();

  stopEndSFX();
  playGameMusic();

  const lines = LORE[L.id] || [`Special Agent Rat tips his cap. "Let's pry it loose."`];
  const blurb = lines[(Math.random()*lines.length)|0];
  EL.briefTitle.textContent = `${L.name} - Briefing`;
  EL.briefBody.innerHTML = blurb;
  open(EL.modBrief);

  EL.briefGo.onclick = ()=>{
    closeAll();
    STATE.running = true;
    EL.greetName.textContent = STATE.callsign; // update HUD greeting at mission start
    startClock(L.timer);
  };
}

function showFinale(){
  const best = getBest();
  const showBest = (b)=> b==null ? '-' : `${b} scans`;
  const vq = RAT_VICTORY_QUOTES[(Math.random()*RAT_VICTORY_QUOTES.length)|0];

  EL.finaleText.innerHTML = `Every site went quiet. Counters sleep. The world exhales.<br><br><em>Special Agent Rat:</em> ${vq}`;
  EL.finaleBest.textContent = `Best score (fewest scans across missions): ${showBest(best)} | Last level scans: ${STATE.scans}`;
  open(EL.modFinale);

  stopGameMusic();
  try{ EL.sfx.win.currentTime=0; EL.sfx.win.play().catch(()=>{});}catch{}

  EL.finaleClose.onclick = ()=>{ stopEndSFX(); goToMenu(true, true); };
}

function finish(win){
  STATE.running=false; pauseTimer(true); clearClock();

  if(win && STATE.levelIdx === LEVELS.length-1){
    const best = getBest();
    if(best==null || STATE.scans < best){ setBest(STATE.scans); }
    showFinale(); return;
  }

  open(EL.modEnd);
  stopGameMusic();

  const best = getBest();
  const showBest = (b)=> b==null ? '-' : `${b} scans`;

  if(win){
    EL.endTitle.textContent = 'SOURCE ISOLATED';
    EL.endArt.src = 'victory.png';
    const vq = RAT_VICTORY_QUOTES[(Math.random()*RAT_VICTORY_QUOTES.length)|0];
    EL.endText.innerHTML = `Nice work, <b>${STATE.callsign}</b>. Source isolated at <b>${LEVELS[STATE.levelIdx].name}</b>.<br><br><em>Special Agent Rat:</em> ${vq}`;
    try{ EL.sfx.win.currentTime=0; EL.sfx.win.play().catch(()=>{});}catch{}
    if(best==null || STATE.scans < best){ setBest(STATE.scans); }
    EL.endBest.textContent = `Best score (fewest scans): ${showBest(getBest())} | This level: ${STATE.scans} scans`;

    const hasNext = STATE.levelIdx < LEVELS.length-1;
    EL.endNext.style.display = hasNext ? '' : 'none';
    EL.endRetry.style.display = '';
    EL.endClose.style.display = '';

    EL.endNext.textContent = 'NEXT SITE';
    EL.endNext.onclick = ()=>{ stopEndSFX(); closeAll(); startLevel(STATE.levelIdx+1); };
    EL.endRetry.onclick = ()=>{ stopEndSFX(); closeAll(); startLevel(STATE.levelIdx); };
    EL.endClose.onclick = ()=>{ stopEndSFX(); goToMenu(true, true); };
  } else {
    EL.endTitle.textContent = 'CONTAINMENT FAILURE';
    EL.endArt.src = 'rat2.png';
    const q = RAT_FAILURE_QUOTES[(Math.random()*RAT_FAILURE_QUOTES.length)|0];
    EL.endText.innerHTML = `Time expired at <b>${LEVELS[STATE.levelIdx].name}</b>.<br><br><em>Special Agent Rat:</em> ${q}`;
    try{ EL.sfx.lose.currentTime=0; EL.sfx.lose.play().catch(()=>{});}catch{}
    EL.endBest.textContent = `Best score (fewest scans): ${showBest(best)} | This level: ${STATE.scans} scans`;

    EL.endNext.style.display = 'none';
    EL.endRetry.style.display = 'none';
    EL.endClose.style.display = '';
    EL.endClose.onclick = ()=>{ stopEndSFX(); goToMenu(true, true); };
  }
}

/* MENU / GLOBAL */
addEventListener('pointerdown', ()=>{ playMenuMusic(); }, { once:true, passive:true });

function goToMenu(resetAudio=false, resetToFirst=false){
  STATE.running=false; pauseTimer(true); clearClock(); closeAll();
  if(resetToFirst){ runProgress.idx = 0; }
  EL.hud.classList.add('hidden'); EL.menu.classList.remove('hidden');
  if(resetAudio){ playMenuMusic(); }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // init name (random-only)
  const savedName = localStorage.getItem('vh_callsign');
  setCallsign(savedName || randName());
  if (EL.csRand) EL.csRand.addEventListener('click', ()=> setCallsign(randName()));

  if (EL.help) EL.help.addEventListener('click', ()=>{ pauseTimer(true); open(EL.modHelp); });
  if (EL.helpClose) EL.helpClose.addEventListener('click', ()=>{ closeAll(); resumeTimer(); });
  if (EL.intelClose) EL.intelClose.addEventListener('click', ()=>{ closeAll(); resumeTimer(); });

  if (EL.start) EL.start.addEventListener('click', ()=>{
    stopMenuMusic();
    EL.menu.classList.add('hidden');
    EL.hud.classList.remove('hidden');
    runProgress.idx = 0;                 // always start at level 1
    document.getElementById('greet-name').textContent = STATE.callsign;
    startLevel(runProgress.idx);
  });

  if (EL.btnMenu) EL.btnMenu.addEventListener('click', ()=> goToMenu(true, true));

  // MUTE toggle
  function collectAndApplyMute(){
    collectAudio();
    const savedMute = localStorage.getItem('vh_muted')==='1';
    setMuted(savedMute);
  }
  collectAndApplyMute();
  if (EL.btnMute) EL.btnMute.addEventListener('click', ()=> setMuted(!STATE.muted));

  // initial map sizing safeguard
  setMapSize();
});

// Performance optimizations for Vault Hunter

// 1. Cache DOM queries for better performance
const DOM_CACHE = new Map();
const cachedQuery = (selector, root = document) => {
  if (!DOM_CACHE.has(selector)) {
    DOM_CACHE.set(selector, root.querySelector(selector));
  }
  return DOM_CACHE.get(selector);
};

// 2. Debounced resize handler for better performance
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Replace the original resize handler with debounced version
const debouncedSetMapSize = debounce(setMapSize, 100);
addEventListener('resize', debouncedSetMapSize, {passive:true});

// 3. Audio pooling for better sound performance
class AudioPool {
  constructor(src, poolSize = 3) {
    this.pool = [];
    this.index = 0;
    for (let i = 0; i < poolSize; i++) {
      const audio = new Audio(src);
      audio.preload = 'auto';
      this.pool.push(audio);
    }
  }

  play() {
    const audio = this.pool[this.index];
    this.index = (this.index + 1) % this.pool.length;
    audio.currentTime = 0;
    return audio.play().catch(() => {});
  }
}

// Create audio pools for frequently used sounds
const audioPools = {
  signal: new AudioPool('music/signal.wav', 2),
  radiation: new AudioPool('music/radiation.wav', 2),
  radio: new AudioPool('music/radio.wav', 2)
};

// 4. Optimized grid rendering with document fragment
function optimizedRenderGrid() {
  const fragment = document.createDocumentFragment();
  const mapElement = EL.map;
  
  // Clear existing tiles efficiently
  while (mapElement.firstChild) {
    mapElement.removeChild(mapElement.firstChild);
  }
  
  // Use event delegation instead of individual listeners
  mapElement.onclick = (e) => {
    if (e.target.classList.contains('tile')) {
      onScan.call(e.target);
    }
  };
  
  STATE.grid.forEach((c, i) => {
    const div = document.createElement('div');
    div.className = 'tile';
    div.dataset.i = i;
    div.tabIndex = 0;
    fragment.appendChild(div);
  });
  
  mapElement.appendChild(fragment);
}

// 5. Optimized animation frame scheduling
const RAF_QUEUE = [];
let rafId = null;

const scheduleRAF = (callback) => {
  RAF_QUEUE.push(callback);
  if (!rafId) {
    rafId = requestAnimationFrame(() => {
      const callbacks = RAF_QUEUE.splice(0);
      callbacks.forEach(cb => cb());
      rafId = null;
    });
  }
};

// 6. Memory-efficient logging with circular buffer
const LOG_BUFFER_SIZE = 50;
let logBuffer = [];

function optimizedLog(line) {
  if (logBuffer.length >= LOG_BUFFER_SIZE) {
    const oldEntry = logBuffer.shift();
    if (oldEntry.element && oldEntry.element.parentNode) {
      oldEntry.element.parentNode.removeChild(oldEntry.element);
    }
  }
  
  const p = document.createElement('p');
  p.className = 'entry';
  p.textContent = line;
  EL.log.appendChild(p);
  EL.log.scrollTop = EL.log.scrollHeight;
  
  logBuffer.push({ element: p, text: line });
}

// Replace original functions with optimized versions
window.optimizedRenderGrid = optimizedRenderGrid;
window.optimizedLog = optimizedLog;
window.audioPools = audioPools;
window.scheduleRAF = scheduleRAF;

