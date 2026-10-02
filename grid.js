// ---- Step-by-step explanation player for quiz questions ----
// steps: ['cut',kind,red,green] | ['cmp',kind,red,green] | ['ul',kind,idx]   kind: 'row' (player 1) or 'col' (player 2)
function buildGridStepper(cfg){
  var R=cfg.rows, C=cfg.cols, M=cfg.cells;
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
  function beats(kind,g,r,ar,ac){ // g beats r in every alive opposite line
    return kind==='row'?ac.every(function(c){return val(g,c,0)>val(r,c,0);}):ar.every(function(q){return val(q,g,1)>val(q,r,1);});
  }
  function bestSet(kind,idx,ar,ac){ // best replies inside the alive grid
    var vals=kind==='col'?ar.map(function(i){return val(i,idx,0);}):ac.map(function(j){return val(idx,j,1);});
    var lines=kind==='col'?ar:ac, m=Math.max.apply(null,vals); return lines.filter(function(z,t){return vals[t]===m;});
  }
  // replay state up to step s (cuts applied from steps before s, underlines up to and including s)
  function stateAt(s,atEnd){
    var steps=tracks[cur], ar=allIdx(R.length), ac=allIdx(C.length), cutRow={}, cutCol={}, ulC={}, ulR={}, n=0;
    for(var t=0;t<steps.length;t++){
      var st=steps[t], upto=atEnd?true:(st[0]==='ul'?t<=s:t<s);
      if(!upto) continue;
      if(st[0]==='cut'){ if(st[1]==='row'){cutRow[st[2]]=n; ar=ar.filter(function(v){return v!==st[2];});} else {cutCol[st[2]]=n; ac=ac.filter(function(v){return v!==st[2];});} n++; }
      if(st[0]==='ul'){ var b=bestSet(st[1],st[2],ar,ac); if(st[1]==='col') ulC[st[2]]=b; else ulR[st[2]]=b; }
    }
    return {ar:ar,ac:ac,cutRow:cutRow,cutCol:cutCol,ulC:ulC,ulR:ulR};
  }
  // verify every authored cut / comparison is true (throws early if the data is wrong)
  Object.keys(tracks).forEach(function(nm){ var steps=tracks[nm], ar=allIdx(R.length), ac=allIdx(C.length);
    steps.forEach(function(st){
      if(st[0]==='cut'){ if(!beats(st[1],st[3],st[2],ar,ac)) throw new Error('illegal cut '+st);
        if(st[1]==='row') ar=ar.filter(function(v){return v!==st[2];}); else ac=ac.filter(function(v){return v!==st[2];}); } });
  });
  function render(){
    var steps=tracks[cur], atEnd=step>=steps.length, S=stateAt(step,atEnd), st=atEnd?null:steps[step];
    var ar=S.ar, ac=S.ac;
    var h='<tr><th></th>'+C.map(function(c,j){var cl=S.cutCol[j]!==undefined?CLS[S.cutCol[j]]:'';
      var cmp=(st&&st[0]!=='ul'&&st[1]==='col')?(j===st[2]?' cmpA':(j===st[3]?' cmpB':'')):((st&&st[0]==='ul'&&st[1]==='col'&&j===st[2])?' cmpB':'');
      return '<th class="'+cl+cmp+'">'+c+'</th>';}).join('')+'</tr>';
    var nashCells=0, survivor=(!cfg.stall&&!cfg.nash)&&ar.length===1&&ac.length===1;
    R.forEach(function(r,i){
      var rcl=S.cutRow[i]!==undefined?CLS[S.cutRow[i]]:'';
      var rcmp=(st&&st[0]!=='ul'&&st[1]==='row')?(i===st[2]?' cmpA':(i===st[3]?' cmpB':'')):((st&&st[0]==='ul'&&st[1]==='row'&&i===st[2])?' cmpB':'');
      h+='<tr><td class="lab '+rcl+rcmp+'">'+r+'</td>';
      C.forEach(function(c,j){
        var a=S.cutRow[i], b=S.cutCol[j], cl='';
        if(a!==undefined&&b!==undefined)cl=CLS[Math.min(a,b)]; else if(a!==undefined)cl=CLS[a]; else if(b!==undefined)cl=CLS[b];
        var u1=S.ulC[j]&&S.ulC[j].indexOf(i)>-1, u2=S.ulR[i]&&S.ulR[i].indexOf(j)>-1;
        if(atEnd&&cl===''&&((survivor)||(cfg.nash&&u1&&u2)))cl='keep';
        var p1=val(i,j,0), p2=val(i,j,1), t1=String(p1), t2=String(p2);
        var cmp='', d1=false, d2=false;
        if(st&&cl===''){
          if(st[0]!=='ul'&&st[1]==='row'&&(i===st[2]||i===st[3])){cmp=i===st[2]?' cmpA':' cmpB'; d2=true;}
          if(st[0]!=='ul'&&st[1]==='col'&&(j===st[2]||j===st[3])){cmp=j===st[2]?' cmpA':' cmpB'; d1=true;}
          if(st[0]==='ul'&&st[1]==='col'&&j===st[2]){cmp=' cmpB'; d2=true;}
          if(st[0]==='ul'&&st[1]==='row'&&i===st[2]){cmp=' cmpB'; d1=true;}
        }
        if(u1)t1='<u style="text-decoration-thickness:2px;text-underline-offset:3px">'+t1+'</u>';
        if(u2)t2='<u style="text-decoration-thickness:2px;text-underline-offset:3px">'+t2+'</u>';
        if(d1)t1='<span style="opacity:.4">'+t1+'</span>'; if(d2)t2='<span style="opacity:.4">'+t2+'</span>';
        if(cl==='keep'&&cfg.nash)nashCells++;
        h+='<td class="'+cl+cmp+'">'+t1+', '+t2+'</td>';
      });
      h+='</tr>';
    });
    tbl.innerHTML=h;
    root.querySelector('.alive').textContent=R.filter(function(_,i){return ar.indexOf(i)>-1;}).concat(C.filter(function(_,j){return ac.indexOf(j)>-1;})).join(' · ');
    root.querySelector('.sround').innerHTML=atEnd?'<b>Done</b>':'<b>Step '+(step+1)+' of '+steps.length+'</b>';
    msg.className='msg';
    if(atEnd){ msg.classList.add('good'); msg.innerHTML=cfg.finalMsg; }
    else { msg.innerHTML=stepText(st,ar,ac,step); }
    bk.disabled=step===0; nx.disabled=atEnd;
    nx.textContent=(step===steps.length-1)?'Finish →':'Next →';
  }
  function stepText(st,ar,ac,s){
    var kind=st[1], row=kind==='row', L=row?R:C, num=row?'first':'second', who=row?'Player 1':'Player 2', over=row?'column':'row';
    if(st[0]==='ul'){
      var idx=st[2], vals, names, lines, best=bestSet(kind,idx,ar,ac);
      if(kind==='col'){ lines=ar; vals=ar.map(function(i){return val(i,idx,0);}); names=ar.map(function(i){return R[i];}); }
      else { lines=ac; vals=ac.map(function(j){return val(idx,j,1);}); names=ac.map(function(j){return C[j];}); }
      var tie=best.length>1;
      var bestNames=kind==='col'?best.map(function(z){return R[z];}):best.map(function(z){return C[z];});
      var asker=kind==='col'?'Player 1':'Player 2', nn=kind==='col'?'first':'second';
      return (kind==='col'?'Say player 2 plays <b>'+C[idx]+'</b>.':'Say player 1 plays <b>'+R[idx]+'</b>.')+'<br>'+asker+' looks at the <b>'+nn+'</b> numbers: '+
        vals.join(', ')+'.<br><b>'+(tie?'A tie, so underline both: '+bestNames.join(' and ')+'.':'Best is '+bestNames[0]+'. Underline it.')+'</b>'+(st[3]?'<br><span style="color:var(--muted)">'+st[3]+'</span>':'');
    }
    var x=L[st[2]], y=L[st[3]];
    var nums=(row?ac:ar).map(function(z){var vx=row?val(st[2],z,0):val(z,st[2],1), vy=row?val(st[3],z,0):val(z,st[3],1); return vy+(vy>vx?' &gt; ':' &lt; ')+vx;}).join(', ');
    if(st[0]==='cut') return '<b>'+who+'</b> only looks at the <b>'+num+'</b> numbers. Compare <b>'+x+'</b> (red) with <b>'+y+'</b> (green).<br>'+y+' is higher in every '+over+' still alive: '+nums+'.<br><b>So '+x+' is strictly dominated. Press Next to cut it.</b>'+(st[4]?'<br><span style="color:var(--muted)">'+st[4]+'</span>':'');
    var ok=beats(kind,st[3],st[2],ar,ac);
    return '<b>'+who+'</b> only looks at the <b>'+num+'</b> numbers. Is <b>'+y+'</b> (green) better than <b>'+x+'</b> (red) in every '+over+'?<br>'+nums+'.<br><b>'+(ok?'Yes. '+y+' beats '+x+' everywhere.':'No. '+y+' loses to '+x+' in at least one '+over+', so '+y+' is not dominant.')+'</b>'+(st[4]?'<br><span style="color:var(--muted)">'+st[4]+'</span>':'');
  }
  if(names.length>1){ var tabs=root.querySelector('.tabs'); names.forEach(function(nm){var b=document.createElement('button');b.textContent=nm;b.className=nm===cur?'on':'';b.onclick=function(){cur=nm;step=0;Array.prototype.forEach.call(tabs.children,function(x){x.className=x.textContent===nm?'on':'';});render();};tabs.appendChild(b);}); }
  nx.onclick=function(){ if(step<tracks[cur].length){step++;render();} };
  bk.onclick=function(){ if(step>0){step--;render();} };
  render();
  return root;
}
