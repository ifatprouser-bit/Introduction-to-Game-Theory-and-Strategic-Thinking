// ---- Rounds timeline stepper for repeated games (Back / Next) ----
// buildRoundsStepper(cfg) returns a .stepper element. cfg: rounds (N), unit ('Week'|'Round'), show (columns: r or [a,b]; default first 3, a gap, last 3),
//   words {C,D}, names [you,them], pay {CC,CD,DC,DD} (YOUR payoff, your move first; omit for moves only), finalMsg, and
//   lines:[{label, me, her, expect, tags:{r:'note'}}] where me / her are 'CCD...' strings, arrays, or fn(r, otherPast) (the rule sees only past rounds).
//   dir:'back' labels a backward walk (also per track). steps:[{reveal:[r|[a,b]], focus:[...], text}] reveal rounds cumulatively, forwards or backwards. tracks:{tab:{lines,steps,finalMsg}} adds tabs.
// Totals are summed by the engine from per-round payoffs and must equal each line's expect (throws if not). Two lines: the gap is shown at the end.
function buildRoundsStepper(cfg){
  var N=cfg.rounds, unit=cfg.unit||'Round', W=cfg.words||{C:'Cooperate',D:'Defect'}, NM=cfg.names||['You','Them'], P=cfg.pay||null;
  var tracks=cfg.tracks||{'':{lines:cfg.lines,steps:cfg.steps,finalMsg:cfg.finalMsg}}, names=Object.keys(tracks), cur=names[0], step=0;
  function rng(x){return Array.isArray(x)?x:[x,x];}
  function expand(list){var o=[];(list||[]).forEach(function(x){var a=rng(x);for(var r=a[0];r<=a[1];r++)o.push(r);});return o;}
  var cols=cfg.show?cfg.show.map(rng):(N>12?[[1,1],[2,2],[3,3],[4,N-3],[N-2,N-2],[N-1,N-1],[N,N]]:expand([[1,N]]).map(rng));
  function play(L){ // run both players round by round
    var me=[],her=[],pay=[];
    function mv(src,r,other){var v=typeof src==='function'?src(r,other.slice(0,r-1)):src[r-1]; if(v!=='C'&&v!=='D')throw new Error('bad move '+v+' in round '+r+' of '+L.label); return v;}
    for(var r=1;r<=N;r++){var a=mv(L.me,r,her), b=mv(L.her,r,me); me.push(a); her.push(b); pay.push(P?P[a+b]:0);}
    var tot=pay.reduce(function(s,x){return s+x;},0);
    if(P&&L.expect!==undefined&&tot!==L.expect)throw new Error('total for "'+L.label+'" is '+tot+', expected '+L.expect);
    return {me:me,her:her,pay:pay,tot:tot};
  }
  var runs={}; names.forEach(function(nm){runs[nm]=tracks[nm].lines.map(play);});
  var root=document.createElement('div'); root.className='stepper rstep';
  root.innerHTML=(names.length>1?'<div class="tabs"></div>':'')+'<div class="sbar"><span class="sround"></span><span class="sdir"></span></div>'+
    '<div class="tscroll"><table class="rtable"></table></div><div class="rgap"></div><div class="msg"></div>'+
    '<div class="nav"><button class="bk" type="button">&larr; Back</button><button class="nx" type="button">Next &rarr;</button></div>';
  var tbl=root.querySelector('.rtable'), msg=root.querySelector('.msg'), gap=root.querySelector('.rgap'), bk=root.querySelector('.bk'), nx=root.querySelector('.nx');
  function chip(m){return '<span class="mv '+m+'">'+W[m]+'</span>';}
  function render(){
    var T=tracks[cur], R=runs[cur], S=T.steps, atEnd=step>=S.length, st=atEnd?null:S[step], seen={}, fresh={}, foc={};
    for(var t=0;t<(atEnd?S.length:step+1);t++)expand(S[t].reveal).forEach(function(r){seen[r]=1;});
    if(atEnd)expand([[1,N]]).forEach(function(r){seen[r]=1;});
    if(st){expand(st.reveal).forEach(function(r){fresh[r]=1;}); expand(st.focus).forEach(function(r){foc[r]=1;});}
    var h='<tr><th></th>'+cols.map(function(c){var f=false;for(var r=c[0];r<=c[1];r++)if(foc[r])f=true;
      return '<th class="'+(f?'foc':'')+'">'+(c[0]===c[1]?unit+' '+c[0]:unit+'s '+c[0]+'&ndash;'+c[1])+'</th>';}).join('')+(P?'<th>Total</th>':'')+'</tr>';
    T.lines.forEach(function(L,li){
      var run=R[li], so=0; for(var r=1;r<=N;r++)if(seen[r])so+=run.pay[r-1];
      if(T.lines.length>1||L.label)h+='<tr class="lhead"><td colspan="'+(cols.length+2)+'"><span>'+L.label+'</span></td></tr>';
      function cells(kind){return cols.map(function(c){
        var all=true,any=false,nw=false,f=false,ms={},sum=0,ps={};
        for(var r=c[0];r<=c[1];r++){if(seen[r])any=true;else all=false; if(fresh[r])nw=true; if(foc[r])f=true;
          ms[kind==='me'?run.me[r-1]:run.her[r-1]]=1; sum+=run.pay[r-1]; ps[run.pay[r-1]]=1;}
        var cl=(f?'foc ':'')+(nw?'nw ':''), n=c[1]-c[0]+1, k=Object.keys(ms), pk=Object.keys(ps);
        if(!all)return '<td class="'+cl+'unk">?</td>';
        if(kind==='pay')return '<td class="'+cl+'pay">'+(n===1?sum:(pk.length===1?n+' &times; '+pk[0]+' = '+sum:sum))+'</td>';
        if(kind==='tag'){var tg=[];for(var q=c[0];q<=c[1];q++)if(L.tags&&L.tags[q])tg.push(L.tags[q]);return '<td class="'+cl+'tag">'+tg.join('<br>')+'</td>';}
        return '<td class="'+cl+'">'+(k.length===1?chip(k[0]):'mixed')+'</td>';}).join('');}
      h+='<tr><td class="lab">'+NM[0]+'</td>'+cells('me')+(P?'<td></td>':'')+'</tr>';
      h+='<tr><td class="lab">'+NM[1]+'</td>'+cells('her')+(P?'<td></td>':'')+'</tr>';
      if(P)h+='<tr class="earn"><td class="lab">'+NM[0]+' earn</td>'+cells('pay')+'<td class="tot">'+(atEnd?'<b>'+run.tot+'</b>':'so far<br><b>'+so+'</b>')+'</td></tr>';
      if(L.tags)h+='<tr class="tagrow"><td class="lab"></td>'+cells('tag')+(P?'<td></td>':'')+'</tr>';
    });
    tbl.innerHTML=h;
    if(atEnd&&P&&T.lines.length===2){var a=R[0].tot,b=R[1].tot,hi=a>=b?0:1;
      gap.innerHTML='<b>'+T.lines[hi].label+'</b> '+R[hi].tot+' &minus; <b>'+T.lines[1-hi].label+'</b> '+R[1-hi].tot+' = a gap of <b>'+Math.abs(a-b)+'</b>';gap.style.display='';}
    else{gap.innerHTML='';gap.style.display='none';}
    var dr=T.dir||cfg.dir; root.querySelector('.sdir').innerHTML=(dr==='back'&&!atEnd)?'&larr; Working backwards from the last '+unit.toLowerCase():'';
    root.querySelector('.sround').innerHTML=atEnd?'<b>Done</b>':'<b>Step '+(step+1)+' of '+S.length+'</b>';
    msg.className='msg'+(atEnd?' good':''); msg.innerHTML=atEnd?T.finalMsg:st.text;
    toFocus();
    bk.disabled=step===0; nx.disabled=atEnd; nx.innerHTML=(step===S.length-1)?'Finish &rarr;':'Next &rarr;';
  }
  function toFocus(){ // keep the round being discussed in view when the table scrolls (phones)
    var sc=root.querySelector('.tscroll'), f=tbl.querySelector('th.foc'); if(!sc||!sc.clientWidth)return;
    sc.scrollLeft=f?Math.max(0,f.offsetLeft-(sc.clientWidth-f.offsetWidth)/2):0; }
  if(window.ResizeObserver)new ResizeObserver(function(){toFocus();}).observe(root);
  if(names.length>1){var tabs=root.querySelector('.tabs');names.forEach(function(nm){var b=document.createElement('button');b.type='button';b.textContent=nm;b.className=nm===cur?'on':'';
    b.onclick=function(){cur=nm;step=0;Array.prototype.forEach.call(tabs.children,function(x){x.className=x.textContent===nm?'on':'';});render();};tabs.appendChild(b);});}
  nx.onclick=function(){if(step<tracks[cur].steps.length){step++;render();}};
  bk.onclick=function(){if(step>0){step--;render();}};
  render(); return root;
}
