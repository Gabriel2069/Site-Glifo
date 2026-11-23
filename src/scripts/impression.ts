import gsap from 'gsap';

export function initImpression() {
 const field=document.querySelector<HTMLElement>('.impressao-campo');
 if(!field)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const precise=matchMedia('(hover: hover) and (pointer: fine)');
 const views=field.querySelectorAll<HTMLButtonElement>('[data-vista]');
 const layers:Record<string,string>={matriz:'.matriz-cena',mesa:'.mesa-cena',gravura:'.impressao-garra'};
 const toggle=field.querySelector<HTMLButtonElement>('[data-impressao-play]')!;
 const stage=field;
 const frames=Array.from(views);
 const duration=5.2;
 let manualPause=false;
 let visible=false;
 let scene:gsap.core.Timeline;
 let transition:gsap.core.Tween|undefined;
 let index=0;

 function syncSequence(){
  const quiet=reduced.matches||document.documentElement.classList.contains('motion-paused');
  const examining=Boolean(stage.querySelector('.matriz-examinar:focus-visible')||document.querySelector('dialog[open]'));
  toggle.hidden=quiet;
  toggle.dataset.paused=String(manualPause);
  toggle.setAttribute('aria-label',manualPause?'Retomar sequência':'Pausar sequência');
  if(quiet) transition?.progress(1);
  const running=visible&&!document.hidden&&!quiet&&!examining&&!manualPause;
  scene.paused(!running);
  if(transition&&!quiet)transition.paused(!visible||document.hidden||examining);
 }
 function compose(next:number,animate:boolean){
  scene?.kill();
  transition?.progress(1).kill();
  stage.classList.remove('com-lupa');
  index=next;
  const key=frames[index].dataset.vista!;
  stage.dataset.prova=key;
  frames.forEach((button,i)=>button.setAttribute('aria-pressed',String(index===i)));
  stage.style.setProperty('--andamento','0');
  scene=gsap.timeline({paused:true,onComplete:()=>compose((index+1)%frames.length,true)});
  scene.to(stage,{'--andamento':1,duration,ease:'none'});
  if(animate&&!reduced.matches&&!document.documentElement.classList.contains('motion-paused')){
   transition=gsap.fromTo(stage.querySelector(layers[key]),
    {clipPath:'polygon(30% 0,100% 0,100% 100%,16% 100%)',opacity:.15},
    {clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)',opacity:1,duration:1.05,ease:'power3.out',clearProps:'clipPath,opacity'});
  }
  syncSequence();
 }
 frames.forEach((button,i)=>button.addEventListener('click',()=>{
  manualPause=true;
  if(i!==index)compose(i,true);else syncSequence();
 }));
 toggle.addEventListener('click',()=>{manualPause=!manualPause;syncSequence()});
 compose(0,false);
 new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;syncSequence()},{threshold:.15}).observe(stage);
 new MutationObserver(syncSequence).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
 document.querySelectorAll('dialog').forEach(dialog=>new MutationObserver(syncSequence).observe(dialog,{attributes:true,attributeFilter:['open']}));
 document.addEventListener('visibilitychange',syncSequence);
 stage.addEventListener('focusin',syncSequence);
 stage.addEventListener('focusout',()=>queueMicrotask(syncSequence));
 reduced.addEventListener('change',syncSequence);
 const glass=field.querySelector<HTMLCanvasElement>('.lupa-de-mesa');
 const photo=field.querySelector<HTMLImageElement>('.matriz-cena img');
 if(glass&&photo){
  const ctx=glass.getContext('2d');
  let point:PointerEvent|undefined,frame=0;
  function clear(){field!.classList.remove('com-lupa');cancelAnimationFrame(frame);frame=0}
  function draw(){
   frame=0;
   if(!point||!ctx||!glass||!photo||!photo.naturalWidth)return;
   const r=photo.getBoundingClientRect(),x=point.clientX-r.left,y=point.clientY-r.top;
   const scale=Math.max(r.width/photo.naturalWidth,r.height/photo.naturalHeight);
   const srcX=(x+(photo.naturalWidth*scale-r.width)*.5)/scale;
   const srcY=(y+(photo.naturalHeight*scale-r.height)*.55)/scale;
   const sample=glass.offsetWidth/scale/1.85;
   ctx.drawImage(photo,srcX-sample/2,srcY-sample/2,sample,sample,0,0,glass.width,glass.height);
   const bounds=field!.getBoundingClientRect();
   glass.style.left=(point.clientX-bounds.left)+'px';glass.style.top=(point.clientY-bounds.top)+'px';
   field!.classList.add('com-lupa');
  }
  field.addEventListener('pointermove',e=>{
   const r=field.getBoundingClientRect();
   if(reduced.matches||!precise.matches||field.dataset.prova!=='matriz'||e.pointerType!=='mouse'||
    e.clientX-r.left<r.width*.55||e.clientX-r.left>r.width*.96||e.clientY-r.top<r.height*.13||e.clientY-r.top>r.height*.79||
    (e.target as Element).closest('button,dialog,a')){clear();return}
   point=e;if(!frame)frame=requestAnimationFrame(draw);
  });
  field.addEventListener('pointerleave',clear);
  field.addEventListener('focusin',clear);
  reduced.addEventListener('change',clear);
 }
 const contact=document.getElementById('contato');
 const film=contact?.querySelector<HTMLVideoElement>('.lenco-filme');
 if(contact&&film){
  let onStage=false;
  function syncFilm(){
   if(!film)return;
   if(!onStage||document.hidden||reduced.matches||document.querySelector('dialog[open]')){
    film.pause();film.classList.remove('is-playing');return;
   }
   if(!film.ended)film.play().catch(()=>film.classList.remove('is-playing'));
  }
  film.addEventListener('playing',()=>film.classList.add('is-playing'));
  film.addEventListener('ended',()=>film.classList.remove('is-playing'));
  new IntersectionObserver(([entry])=>{onStage=entry.isIntersecting;syncFilm()},{threshold:.25}).observe(contact);
  document.addEventListener('visibilitychange',syncFilm);
  reduced.addEventListener('change',syncFilm);
  document.querySelectorAll('dialog').forEach(dialog=>new MutationObserver(syncFilm).observe(dialog,{attributes:true,attributeFilter:['open']}));
 }
 document.querySelectorAll<HTMLAnchorElement>('[data-gesto-etapa]').forEach(link=>link.addEventListener('click',()=>{
  document.getElementById('step-tab-'+link.dataset.gestoEtapa)?.click();
 }));
}
