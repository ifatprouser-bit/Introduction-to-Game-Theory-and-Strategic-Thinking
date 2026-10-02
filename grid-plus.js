// grid-plus.js: grid.js plus 'swap' (try one cell change, shown old -> new), 'eq' (mark stable cells, verified), 'both' (is cell A better for BOTH players than cell B), 'hl' (point at cells with a note), tie-aware 'cmp' text, player names, corner label, per-track finalMsg.
// ---- Step-by-step explanation player for payoff-matrix questions (extended copy of grid.js) ----
// cfg: rows, cols, cells[i][j]=[p1,p2], steps | tracks:{name:[steps]}, finalMsg (string, or {trackName:html}),
//      players:['Garage 1','Garage 2'] (optional), corner:'html' (optional top-left cell), nash, stall, noalive (as grid.js)
// steps (kind 'row' = player 1 compares rows, 'col' = player 2 compares columns):
//   ['cut',kind,red,green,note?]   cut a strictly dominated line (throws if not strict)
//   ['cmp',kind,red,green,note?]   only compare; ties are printed as "=" and count as "not better"
//   ['ul','col'|'row',idx,note?]   underline best replies
//   ['swap',i,j,[p1,p2],note?]     try ONE change on the printed matrix: cell (i,j) becomes [p1,p2].
//                                  A later swap replaces an earlier one. Every mark is cleared: the game is new.
//   ['eq',[[i,j],...],note?]       mark stable cells (pure Nash equilibria). Throws if a listed cell is not stable.
//   ['both',i,j,ei,ej,note?]       tick 2: is cell (i,j) better for BOTH players than cell (ei,ej)? Text is computed.
//   ['hl',[[i,j],...],note]        outline cells; the note is the step text.
function buildGridStepper(cfg){
  if(!document.getElementById('gp-css')){var cs=document.createElement('style');cs.id='gp-css';cs.textContent=
    '.stepper .dtable td.gp-keep{background:var(--good-soft)!important;color:var(--good)!important;font-weight:800!important;}'+
    '.stepper .dtable td.gp-better{background:var(--brand-soft)!important;color:var(--brand-d)!important;font-weight:800!important;}'+
    '.stepper .dtable td.gp-swap{background:var(--amber-soft,#fcf3e3)!important;color:var(--amber,#8f5c12)!important;font-weight:800!important;}'+
    '.stepper .dtable td.gp-changed{box-shadow:inset 0 0 0 2px #e2b65c;}'+
    '.stepper .cmpP{outline:3px solid var(--brand,#6b4ef0);outline-offset:-3px;}'+
    '.stepper .gp-tag{display:block;font-size:13px;font-weight:700;margin-top:2px;}'+
    '.stepper .gp-old{text-decoration:line-through;opacity:.6;font-weight:400;}'+
    '.stepper .gp-note{display:block;margin-top:6px;}';
    document.head.appendChild(cs);}
  var R=cfg.rows, C=cfg.cols, M0=cfg.cells, M=M0, P=cfg.players||['Player 1','Player 2'];
  var tracks=cfg.tracks||{'':cfg.steps}, names=Object.keys(tracks), cur=names[0];
  var root=document.createElement('div'); root.className='stepper';
  root.innerHTML=(names.length>1?'<div class="tabs"></div>':'')+'<div class="sbar"><span class="sround"></span><span>Still alive: <span class="alive"></span></span></div>'+
    '<div class="tscroll"><table class="dtable"></table></div><div class="msg"></div>'+
    '<div class="nav"><button class="bk">&larr; Back</button><button class="nx">Next &rarr;</button></div>';
  if(cfg.noalive){root.querySelector('.sbar').lastChild.style.display='none';}
  var tbl=root.querySelector('table'), msg=root.querySelector('.msg'), bk=root.querySelector('.bk'), nx=root.querySelector('.nx');
  var step=0, CLS=['k1','k2','k3','k4','k1','k2','k3','k4'];
  function allIdx(n){var a=[];for(var i=0;i<n;i++)a.push(i);return a;}
  function val(i,j,k){return M[i][j][k];}
  function withSwap(st){return M0.map(function(r,i){return r.map(function(c,j){return (i===st[1]&&j===st[2])?st[3].slice():c.slice();});});}
  function cellName(i,j){return '('+R[i]+', '+C[j]+')';}
  function pay(i,j){return fmt(val(i,j,0))+', '+fmt(val(i,j,1));}
  function fmt(x){return x<0?'&minus;'+(-x):String(x);}
  function sym(a,b){return a>b?' &gt; ':(a<b?' &lt; ':' = ');}
  function beats(kind,g,r,ar,ac){
    return kind==='row'?ac.every(function(c){return val(g,c,0)>val(r,c,0);}):ar.every(function(q){return val(q,g,1)>val(q,r,1);});
  }
  function bestSet(kind,idx,ar,ac){
    var vals=kind==='col'?ar.map(function(i){return val(i,idx,0);}):ac.map(function(j){return val(idx,j,1);});
    var lines=kind==='col'?ar:ac, m=Math.max.apply(null,vals); return lines.filter(function(z,t){return vals[t]===m;});
  }
  function isNE(i,j,ar,ac){
    return ar.every(function(r){return val(i,j,0)>=val(r,j,0);})&&ac.every(function(c){return val(i,j,1)>=val(i,c,1);});
  }
  // replay state up to step s. Persistent marks (ul, swap, eq, both) count up to and including s; cuts apply after their step.
  function stateAt(s,atEnd){
    var steps=tracks[cur]; M=M0;
    var S={ar:allIdx(R.length),ac:allIdx(C.length),cutRow:{},cutCol:{},ulC:{},ulR:{},eq:{},better:{},swap:null,n:0};
    function reset(){S.ar=allIdx(R.length);S.ac=allIdx(C.length);S.cutRow={};S.cutCol={};S.ulC={};S.ulR={};S.eq={};S.better={};S.n=0;}
    for(var t=0;t<steps.length;t++){
      var st=steps[t], k=st[0], upto=atEnd?true:((k==='cut'||k==='cmp'||k==='hl')?t<s:t<=s);
      if(!upto) continue;
      if(k==='swap'){ M=withSwap(st); reset(); S.swap={i:st[1],j:st[2],old:M0[st[1]][st[2]],at:t}; }
      if(k==='cut'){ if(st[1]==='row'){S.cutRow[st[2]]=S.n; S.ar=S.ar.filter(function(v){return v!==st[2];});} else {S.cutCol[st[2]]=S.n; S.ac=S.ac.filter(function(v){return v!==st[2];});} S.n++; }
      if(k==='ul'){ var b=bestSet(st[1],st[2],S.ar,S.ac); if(st[1]==='col') S.ulC[st[2]]=b; else S.ulR[st[2]]=b; }
      if(k==='eq'){ st[1].forEach(function(c){S.eq[c[0]+','+c[1]]=1;}); }
      if(k==='both'){ if(val(st[1],st[2],0)>val(st[3],st[4],0)&&val(st[1],st[2],1)>val(st[3],st[4],1)) S.better[st[1]+','+st[2]]=1; }
    }
    return S;
  }
  // verify every authored cut and every claimed stable cell (throws early if the data is wrong)
  Object.keys(tracks).forEach(function(nm){ var steps=tracks[nm], ar=allIdx(R.length), ac=allIdx(C.length); M=M0;
    steps.forEach(function(st){
      if(st[0]==='swap'){ M=withSwap(st); ar=allIdx(R.length); ac=allIdx(C.length); }
      if(st[0]==='cut'){ if(!beats(st[1],st[3],st[2],ar,ac)) throw new Error('illegal cut '+st);
        if(st[1]==='row') ar=ar.filter(function(v){return v!==st[2];}); else ac=ac.filter(function(v){return v!==st[2];}); }
      if(st[0]==='eq'){ st[1].forEach(function(c){ if(!isNE(c[0],c[1],ar,ac)) throw new Error('not a stable cell '+c); }); }
    });
    M=M0;
  });
  function render(){
    var steps=tracks[cur], atEnd=step>=steps.length, S=stateAt(step,atEnd), st=atEnd?null:steps[step];
    var ar=S.ar, ac=S.ac, k=st?st[0]:null;
    var isCmp=st&&(k==='cut'||k==='cmp');
    var h='<tr><th>'+(cfg.corner||'')+'</th>'+C.map(function(c,j){var cl=S.cutCol[j]!==undefined?CLS[S.cutCol[j]]:'';
      var cmp=(isCmp&&st[1]==='col')?(j===st[2]?' cmpA':(j===st[3]?' cmpB':'')):((k==='ul'&&st[1]==='col'&&j===st[2])?' cmpB':'');
      return '<th class="'+cl+cmp+'">'+c+'</th>';}).join('')+'</tr>';
    var survivor=(!cfg.stall&&!cfg.nash)&&ar.length===1&&ac.length===1&&(S.n>0);
    R.forEach(function(r,i){
      var rcl=S.cutRow[i]!==undefined?CLS[S.cutRow[i]]:'';
      var rcmp=(isCmp&&st[1]==='row')?(i===st[2]?' cmpA':(i===st[3]?' cmpB':'')):((k==='ul'&&st[1]==='row'&&i===st[2])?' cmpB':'');
      h+='<tr><td class="lab '+rcl+rcmp+'">'+r+'</td>';
      C.forEach(function(c,j){
        var a=S.cutRow[i], b=S.cutCol[j], cl='', key=i+','+j, tag='';
        if(a!==undefined&&b!==undefined)cl=CLS[Math.min(a,b)]; else if(a!==undefined)cl=CLS[a]; else if(b!==undefined)cl=CLS[b];
        var u1=S.ulC[j]&&S.ulC[j].indexOf(i)>-1, u2=S.ulR[i]&&S.ulR[i].indexOf(j)>-1;
        if(cl===''){
          if(S.eq[key]){cl='gp-keep';tag='stable';}
          else if(S.better[key]){cl='gp-better';tag='better for both';}
          else if(atEnd&&(survivor||(cfg.nash&&u1&&u2))){cl='gp-keep';tag='stable';}
        }
        var isSw=S.swap&&S.swap.i===i&&S.swap.j===j;
        if(isSw&&cl===''&&st&&k==='swap'){cl='gp-swap';}
        var t1=fmt(val(i,j,0)), t2=fmt(val(i,j,1)), cmp='', d1=false, d2=false;
        if(st&&(cl===''||cl.indexOf('gp-')===0)){
          if(isCmp&&st[1]==='row'&&(i===st[2]||i===st[3])){cmp=i===st[2]?' cmpA':' cmpB'; d2=true;}
          if(isCmp&&st[1]==='col'&&(j===st[2]||j===st[3])){cmp=j===st[2]?' cmpA':' cmpB'; d1=true;}
          if(k==='ul'&&st[1]==='col'&&j===st[2]){cmp=' cmpB'; d2=true;}
          if(k==='ul'&&st[1]==='row'&&i===st[2]){cmp=' cmpB'; d1=true;}
          if(k==='both'&&((i===st[1]&&j===st[2])||(i===st[3]&&j===st[4])))cmp=' cmpP';
          if(k==='hl'&&st[1].some(function(q){return q[0]===i&&q[1]===j;}))cmp=' cmpP';
        }
        if(u1)t1='<u style="text-decoration-thickness:2px;text-underline-offset:3px">'+t1+'</u>';
        if(u2)t2='<u style="text-decoration-thickness:2px;text-underline-offset:3px">'+t2+'</u>';
        if(d1)t1='<span style="opacity:.4">'+t1+'</span>'; if(d2)t2='<span style="opacity:.4">'+t2+'</span>';
        var body=t1+', '+t2;
        if(isSw){ if(st&&k==='swap'){ body='<span class="gp-old">'+fmt(S.swap.old[0])+', '+fmt(S.swap.old[1])+'</span> &rarr; '+body; tag='the change'; } else { cl+=' gp-changed'; if(!tag)tag='changed'; } }
        h+='<td class="'+cl+cmp+'">'+body+(tag?'<span class="gp-tag">'+tag+'</span>':'')+'</td>';
      });
      h+='</tr>';
    });
    tbl.innerHTML=h;
    root.querySelector('.alive').textContent=R.filter(function(_,i){return ar.indexOf(i)>-1;}).concat(C.filter(function(_,j){return ac.indexOf(j)>-1;})).join(' · ');
    root.querySelector('.sround').innerHTML=atEnd?'<b>Done</b>':'<b>Step '+(step+1)+' of '+steps.length+'</b>';
    msg.className='msg';
    if(atEnd){ msg.classList.add('good'); var fm=cfg.finalMsg; msg.innerHTML=(typeof fm==='object')?fm[cur]:fm; }
    else { msg.innerHTML=stepText(st,ar,ac,S); }
    bk.disabled=step===0; nx.disabled=atEnd;
    nx.textContent=(step===steps.length-1)?'Finish →':'Next →';
  }
  function note(x){return x?'<span class="gp-note">'+x+'</span>':'';}
  function stepText(st,ar,ac,S){
    var k=st[0];
    if(k==='hl') return st[2]||'';
    if(k==='swap'){
      var o=S.swap.old;
      return 'Try the change: <b>'+cellName(st[1],st[2])+'</b> goes from <b>'+fmt(o[0])+', '+fmt(o[1])+'</b> to <b>'+fmt(st[3][0])+', '+fmt(st[3][1])+'</b>. Every other cell stays as printed.<br>The game is new, so both ticks start again.'+note(st[4]);
    }
    if(k==='eq'){
      var cs=st[1], list=cs.map(function(c){return '<b>'+cellName(c[0],c[1])+'</b>, paying '+pay(c[0],c[1]);}).join(' and ');
      return (cs.length===1?'One stable cell: ':(cs.length===2?'Two stable cells: ':cs.length+' stable cells: '))+list+'.<br>'+(cs.length===1?'Here nobody gains by moving alone. That is a <b>pure Nash equilibrium</b>.':'In each, nobody gains by moving alone. Each is a <b>pure Nash equilibrium</b>.')+note(st[2]);
    }
    if(k==='both'){
      var i=st[1],j=st[2],ei=st[3],ej=st[4], a0=val(i,j,0),b0=val(ei,ej,0),a1=val(i,j,1),b1=val(ei,ej,1);
      var up0=a0>b0, up1=a1>b1, verdict;
      if(up0&&up1) verdict='Yes. Higher for both. This cell is <b>better for both</b>.';
      else if(up0) verdict='No. Better for '+P[0]+' only.';
      else if(up1) verdict='No. Better for '+P[1]+' only.';
      else verdict='No. It is not better for either of them.';
      return 'Is <b>'+cellName(i,j)+'</b> better for <b>both</b> players than <b>'+cellName(ei,ej)+'</b>?<br>'+
        P[0]+' (first numbers): '+fmt(a0)+sym(a0,b0)+fmt(b0)+'. '+P[1]+' (second numbers): '+fmt(a1)+sym(a1,b1)+fmt(b1)+'.<br><b>'+verdict+'</b>'+note(st[5]);
    }
    var kind=st[1], row=kind==='row', L=row?R:C, num=row?'first':'second', who=row?P[0]:P[1], over=row?'column':'row';
    if(k==='ul'){
      var idx=st[2], vals, best=bestSet(kind,idx,ar,ac);
      if(kind==='col'){ vals=ar.map(function(i){return fmt(val(i,idx,0));}); }
      else { vals=ac.map(function(j){return fmt(val(idx,j,1));}); }
      var tie=best.length>1;
      var bestNames=kind==='col'?best.map(function(z){return R[z];}):best.map(function(z){return C[z];});
      var asker=kind==='col'?P[0]:P[1], nn=kind==='col'?'first':'second';
      return (kind==='col'?'Say '+P[1]+' plays <b>'+C[idx]+'</b>.':'Say '+P[0]+' plays <b>'+R[idx]+'</b>.')+'<br>'+asker+' looks at the <b>'+nn+'</b> numbers: '+
        vals.join(', ')+'.<br><b>'+(tie?'A tie, so underline both: '+bestNames.join(' and ')+'.':'Best is '+bestNames[0]+'. Underline it.')+'</b>'+note(st[3]);
    }
    var x=L[st[2]], y=L[st[3]];
    var nums=(row?ac:ar).map(function(z){var vx=row?val(st[2],z,0):val(z,st[2],1), vy=row?val(st[3],z,0):val(z,st[3],1); return fmt(vy)+sym(vy,vx)+fmt(vx);}).join(', ');
    if(k==='cut') return '<b>'+who+'</b> only looks at the <b>'+num+'</b> numbers. Compare <b>'+x+'</b> (red) with <b>'+y+'</b> (green).<br>'+y+' is higher in every '+over+' still alive: '+nums+'.<br><b>So '+x+' is strictly dominated. Press Next to cut it.</b>'+note(st[4]);
    var ok=beats(kind,st[3],st[2],ar,ac);
    var tieOnly=!ok&&(row?ac:ar).every(function(z){var vx=row?val(st[2],z,0):val(z,st[2],1), vy=row?val(st[3],z,0):val(z,st[3],1); return vy>=vx;});
    return '<b>'+who+'</b> only looks at the <b>'+num+'</b> numbers. Is <b>'+y+'</b> (green) better than <b>'+x+'</b> (red) in every '+over+'?<br>'+y+' vs '+x+': '+nums+'.<br><b>'+
      (ok?'Yes. '+y+' beats '+x+' everywhere.'+(L.length===2?' So '+y+' is a strictly <i>dominant strategy</i> for '+who+'.':''):
       (tieOnly?'No. In one '+over+' they tie. '+y+' is never worse, but not always better. That is only <i>weak</i> dominance.':
        'No. '+y+' loses to '+x+' in at least one '+over+', so '+y+' is not dominant.'))+'</b>'+note(st[4]);
  }
  if(names.length>1){ var tabs=root.querySelector('.tabs'); names.forEach(function(nm){var b=document.createElement('button');b.textContent=nm;b.className=nm===cur?'on':'';b.onclick=function(){cur=nm;step=0;Array.prototype.forEach.call(tabs.children,function(x){x.className=x.textContent===nm?'on':'';});render();};tabs.appendChild(b);}); }
  nx.onclick=function(){ if(step<tracks[cur].length){step++;render();} };
  bk.onclick=function(){ if(step>0){step--;render();} };
  render();
  return root;
}
