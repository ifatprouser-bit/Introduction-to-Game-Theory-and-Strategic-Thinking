// ---- Bid-line stepper: best reply in the 2/3-average contest against GIVEN opponent numbers ----
// buildBidStepper(cfg) returns a .stepper element (needs stepper.css). cfg: others:[the opponents' numbers], bids:[bids to try, in order],
//   frac:[2,3] (default), max:100, zoom:[lo,hi] close-up range (default [0,40]), expectWin:[bids that must win] (throws if the engine disagrees),
//   intro?:html, notes?:{bid:html} (extra line on that bid's result step), finalMsg:html.
// Your own bid counts in the average. Per bid: one step places it and finds the target, one step measures who is closest. A table keeps every result.
function buildBidStepper(cfg){
  var NS='http://www.w3.org/2000/svg';
  if(!document.getElementById('bid-css')){var cs=document.createElement('style');cs.id='bid-css';cs.textContent=
    '.bidst .bsv{background:#fff;border:1px solid var(--line);border-radius:12px;padding:6px;overflow-x:auto;-webkit-overflow-scrolling:touch;}'+
    '.bidst svg{width:100%;min-width:430px;height:auto;display:block;}'+
    '.bidst table.dtable{margin:10px 0 0;font-size:14px;} .bidst table.dtable td.cur{outline:3px solid var(--brand);outline-offset:-3px;}'+
    '.bidst td.win{background:var(--good-soft);color:var(--good);font-weight:800;} .bidst td.lose{background:var(--bad-soft);color:#b03a35;font-weight:700;}';
    document.head.appendChild(cs);}
  var O=cfg.others.slice(), fr=cfg.frac||[2,3], MX=cfg.max||100, Z=cfg.zoom||[0,40], n=O.length+1;
  var sumO=O.reduce(function(s,x){return s+x;},0);
  function r2(x){return String(Math.round(x*100)/100);} function r1(x){return String(Math.round(x*10)/10);}
  var fracTxt=fr[0]===2&&fr[1]===3?'two-thirds':fr[0]+'/'+fr[1];
  var R=cfg.bids.map(function(b){
    var S=sumO+b, avg=S/n, t=avg*fr[0]/fr[1], me=Math.abs(b-t), near=O.reduce(function(a,o){return Math.abs(o-t)<Math.abs(a-t)?o:a;},O[0]), dn=Math.abs(near-t);
    return {b:b,S:S,avg:avg,t:t,me:me,near:near,dn:dn,win:me<dn};
  });
  if(cfg.expectWin){ R.forEach(function(x){ var should=cfg.expectWin.indexOf(x.b)>-1; if(should!==x.win) throw new Error('bidline: bid '+x.b+(x.win?' wins':' loses')+' but expectWin says otherwise'); }); }
  var steps=[{k:'intro'}]; R.forEach(function(x,i){steps.push({k:'place',i:i});steps.push({k:'measure',i:i});});
  var root=document.createElement('div'); root.className='stepper bidst';
  root.innerHTML='<div class="sbar"><span class="sround"></span><span class="swho"></span></div><div class="bsv"></div>'+
    '<div class="tscroll"><table class="dtable"></table></div><div class="msg"></div>'+
    '<div class="nav"><button class="bk" type="button">&larr; Back</button><button class="nx" type="button">Next &rarr;</button></div>';
  var box=root.querySelector('.bsv'), tbl=root.querySelector('table'), msg=root.querySelector('.msg'), bk=root.querySelector('.bk'), nx=root.querySelector('.nx'), step=0;
  var YOU='#6b4ef0', OPP='#2f7fd0', TGT='#b6791f', INK='#211c33', MUT='#6f6886', GOOD='#15794a', BAD='#d2453f';
  function el(tag,a,p,txt){var e=document.createElementNS(NS,tag);for(var k in a)e.setAttribute(k,a[k]);if(txt!==undefined)e.textContent=txt;if(p)p.appendChild(e);return e;}
  function T(x,s){return el('text',Object.assign({'font-family':'-apple-system,Segoe UI,Arial','font-size':13,fill:INK},x),s);}
  function draw(cur,phase){
    var W=600,H=250, x0=30,x1=570, sv=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':'Number line with the opponents\' numbers, your bid and the target.'});
    // top: whole line
    var yA=52, sA=function(v){return x0+(x1-x0)*v/MX;};
    T({x:x0,y:16,'font-weight':700,fill:MUT},sv).textContent='All ten numbers, 0 to '+MX;
    el('rect',{x:sA(Z[0]),y:yA-20,width:sA(Z[1])-sA(Z[0]),height:40,rx:6,fill:'#fcf3e3',stroke:'#e2b65c','stroke-dasharray':'4 3'},sv);
    el('line',{x1:x0,y1:yA,x2:x1,y2:yA,stroke:'#b9b2d0','stroke-width':2},sv);
    for(var v=0;v<=MX;v+=20){el('line',{x1:sA(v),y1:yA-4,x2:sA(v),y2:yA+4,stroke:'#b9b2d0'},sv);T({x:sA(v),y:yA+20,'text-anchor':'middle','font-size':12,fill:MUT},sv).textContent=v;}
    var seen={}; O.forEach(function(o){var k=seen[o]||0; seen[o]=k+1; el('circle',{cx:sA(o),cy:yA-7-k*9,r:4.5,fill:OPP},sv);});
    // bottom: close-up
    var yB=172, sB=function(v){return x0+(x1-x0)*(v-Z[0])/(Z[1]-Z[0]);};
    T({x:x0,y:yB-62,'font-weight':700,fill:MUT},sv).textContent='Close-up: '+Z[0]+' to '+Z[1];
    el('line',{x1:x0,y1:yB,x2:x1,y2:yB,stroke:'#b9b2d0','stroke-width':2},sv);
    for(var w=Z[0];w<=Z[1];w+=5){el('line',{x1:sB(w),y1:yB-4,x2:sB(w),y2:yB+4,stroke:'#b9b2d0'},sv);T({x:sB(w),y:yB+20,'text-anchor':'middle','font-size':12,fill:MUT},sv).textContent=w;}
    var x=cur!=null?R[cur]:null;
    O.forEach(function(o){ if(o<Z[0]||o>Z[1])return; var isN=x&&phase==='measure'&&o===x.near;
      el('circle',{cx:sB(o),cy:yB,r:isN?8:6,fill:OPP,stroke:isN?INK:'none','stroke-width':2},sv);
      if(isN)T({x:sB(o),y:yB+30,'text-anchor':'middle','font-size':12.5,'font-weight':700,fill:OPP},sv).textContent='nearest: '+o; });
    if(x){
      // your bid on both lines
      el('rect',{x:sA(x.b)-5,y:yA-5,width:10,height:10,rx:2,fill:YOU},sv);
      el('rect',{x:sB(x.b)-7,y:yB-7,width:14,height:14,rx:3,fill:YOU},sv);
      T({x:sB(x.b),y:yB-16,'text-anchor':'middle','font-weight':800,fill:YOU},sv).textContent='you: '+x.b;
      // target
      el('line',{x1:sA(x.t),y1:yA-22,x2:sA(x.t),y2:yA+8,stroke:TGT,'stroke-width':2.5},sv);
      el('line',{x1:sB(x.t),y1:yB-46,x2:sB(x.t),y2:yB+10,stroke:TGT,'stroke-width':3},sv);
      T({x:sB(x.t),y:yB-50,'text-anchor':'middle','font-weight':800,fill:TGT},sv).textContent='target '+r2(x.t);
      if(phase==='measure'){
        var yd=yB+52, yo=yB+68;
        el('line',{x1:sB(x.t),y1:yd,x2:sB(x.b),y2:yd,stroke:YOU,'stroke-width':5,'stroke-linecap':'round'},sv);
        T({x:Math.min(x1-90,Math.max(x0,(sB(x.t)+sB(x.b))/2-40)),y:yd-6,'font-weight':800,fill:YOU,'font-size':12.5},sv).textContent='you: '+r1(x.me)+' away';
        el('line',{x1:sB(x.t),y1:yo,x2:sB(x.near),y2:yo,stroke:OPP,'stroke-width':5,'stroke-linecap':'round'},sv);
        T({x:Math.min(x1-90,Math.max(x0,(sB(x.t)+sB(x.near))/2-40)),y:yo+16,'font-weight':800,fill:OPP,'font-size':12.5},sv).textContent=x.near+': '+r1(x.dn)+' away';
      }
    }
    box.innerHTML=''; box.appendChild(sv);
    if(x&&box.scrollWidth>box.clientWidth){var w0=sv.getBoundingClientRect().width; box.scrollLeft=Math.max(0,sB(Math.min(x.t,x.b))/W*w0-box.clientWidth/3);}
  }
  function table(upto,cur){
    var h='<tr><th>Bid</th><th>Sum</th><th>Target</th><th>You: away</th><th>Nearest: away</th><th>Result</th></tr>';
    R.forEach(function(x,i){ if(i>upto.i||(i===upto.i&&upto.k==='intro'))return; var done=i<upto.i||upto.k==='measure';
      h+='<tr><td class="'+(i===cur?'cur':'')+'"><b>'+x.b+'</b></td><td>'+x.S+'</td><td>'+r2(x.t)+'</td><td>'+(done?r1(x.me):'?')+'</td><td>'+(done?x.near+': '+r1(x.dn):'?')+'</td>'+
        (done?'<td class="'+(x.win?'win':'lose')+'">'+(x.win?'✓ win':'✗ lose')+'</td>':'<td>?</td>')+'</tr>'; });
    tbl.innerHTML=h; tbl.parentNode.style.display=(upto.k==='intro')?'none':'';
  }
  function render(){
    var N=steps.length, atEnd=step>=N, st=atEnd?{k:'measure',i:R.length-1}:steps[step];
    if(atEnd){ draw(null,null); box.style.display='none'; table({k:'measure',i:R.length-1},-1); }
    else { box.style.display=''; draw(st.k==='intro'?null:st.i,st.k); table(st.k==='intro'?{k:'intro',i:-1}:st,st.k==='intro'?-1:st.i); }
    root.querySelector('.sround').innerHTML=atEnd?'<b>Done</b>':'<b>Step '+(step+1)+' of '+N+'</b>';
    root.querySelector('.swho').innerHTML=atEnd?'':(st.k==='intro'?'The nine opponents':'Trying the bid <b>'+R[st.i].b+'</b>');
    msg.className='msg';
    if(atEnd){msg.classList.add('good');msg.innerHTML=cfg.finalMsg;}
    else if(st.k==='intro'){msg.innerHTML=cfg.intro||('The nine opponents\' numbers are the blue dots. They add up to <b>'+sumO+'</b>.<br>Your own bid counts in the average too. So each try below adds your bid, divides by '+n+', and takes '+fracTxt+'.');}
    else { var x=R[st.i];
      if(st.k==='place') msg.innerHTML='Try <b>'+x.b+'</b> (the purple square).<br>Sum of all ten: '+sumO+' + '+x.b+' = <b>'+x.S+'</b>. Average: '+x.S+' ÷ '+n+' = <b>'+r2(x.avg)+'</b>.<br>Take '+fracTxt+': the <b>target is '+r2(x.t)+'</b> (the orange line).';
      else msg.innerHTML='Who is closest to '+r2(x.t)+'?<br>You ('+x.b+') are <b>'+r1(x.me)+'</b> away. The nearest opponent ('+x.near+') is <b>'+r1(x.dn)+'</b> away.<br><b>'+(x.win?'You are closer. You win. ✓':'The opponent is closer. You lose. ✗')+'</b>'+(cfg.notes&&cfg.notes[x.b]?'<br><span style="color:var(--muted)">'+cfg.notes[x.b]+'</span>':''); }
    bk.disabled=step===0; nx.disabled=atEnd; nx.innerHTML=step===N-1?'Finish &rarr;':'Next &rarr;';
  }
  nx.onclick=function(){if(step<steps.length){step++;render();}};
  bk.onclick=function(){if(step>0){step--;render();}};
  render(); root.result=R; return root;
}
