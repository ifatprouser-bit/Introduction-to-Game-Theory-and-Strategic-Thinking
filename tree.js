// ---- Game-tree stepper: backward induction, one node at a time ----
// API: buildTreeStepper(cfg) returns a .stepper element (needs stepper.css). cfg = {players:[{name:'Player 1', short:'1', color?, shape?:'circle'|'square'}],
//   root: node, intro?:html, finalMsg:html, ask?:payoffIndex, notes?:{nodeId:{cmp,pick}}, tracks?:{'Tab name':{root,intro,finalMsg,notes}}, split?:false}.
// node = {id, p:playerIndex, moves:[{label:'Left', to:node}], x?, y?}; leaf = {pay:[p1,p2,...], x?, y?, below?:true, mark?:true}.
// Payoff tuples follow the players array order. Without x/y the tree is laid out automatically (time left to right, leaves in a right-hand column).
// Steps run post-order (last decision first); each node gets a compare step and a pick step. Ties throw unless node.pick names the chosen move index.
function buildTreeStepper(cfg){
  var NS='http://www.w3.org/2000/svg';
  if(!document.getElementById('tree-stepper-css')){var cs=document.createElement('style');cs.id='tree-stepper-css';
    cs.textContent='.tstree svg{width:100%;height:auto;display:block;margin:0 auto;}.tstree .tsv{background:#fff;border:1px solid var(--line);border-radius:12px;padding:8px;overflow-x:auto;-webkit-overflow-scrolling:touch;}'+
    '@keyframes tsCarry{from{transform:translate(var(--dx),var(--dy));opacity:.35}to{transform:translate(0,0);opacity:1}}.tstree .carry{animation:tsCarry .7s ease-out both;}';
    document.head.appendChild(cs);}
  var PAL=['#6b4ef0','#2f7fd0','#c04a7e','#1d8a6a','#c2820b'], ORD=['first','second','third','fourth','fifth','sixth'];
  var GREEN='#1f9d63', RED='#d2453f', CHOSEN='#6b4ef0', FAINT='#c8c2dd', DASH='#9a93b4', INK='#211c33', MUTED='#a39dbb', AMBER='#b6791f';
  var P=cfg.players.map(function(p,i){return {name:p.name, short:p.short, color:p.color||PAL[i%PAL.length], shape:p.shape||(i===0?'circle':'square')};});
  var tracks=cfg.tracks||{'':{}}, names=Object.keys(tracks), cur=names[0], step=0;
  function T(){var t=tracks[cur], o={}; for(var k in cfg)o[k]=cfg[k]; for(var k2 in t)o[k2]=t[k2]; return o;}
  function isLeaf(n){return !!n.pay;}
  function fmt(v){return '('+v.join(', ')+')';}
  // ---------- prepare one track: ids, layout, solution, steps ----------
  var prepared={};
  function prepare(name){
    if(prepared[name])return prepared[name];
    var t=tracks[name], C={}; for(var k in cfg)C[k]=cfg[k]; for(var k2 in t)C[k2]=t[k2];
    var root=C.root, all=[], internals=[], leaves=[], idc=0, maxD=0;
    (function walk(n,d,par){n._d=d;n._par=par;if(n.id===undefined)n.id='n'+(idc++);all.push(n);if(d>maxD)maxD=d;
      if(isLeaf(n)){leaves.push(n);return;} n.moves.forEach(function(m){walk(m.to,d+1,n);}); internals.push(n);})(root,0,null);
    // layout
    var manual=all.every(function(n){return n.x!==undefined&&n.y!==undefined;});
    var pad=50, dx=C.dx||130, gap=C.gap||48, top=40;
    if(!manual){
      var slot=0;
      (function lay(n){ if(isLeaf(n)){n.x=pad+maxD*dx; n.y=top+gap*(slot++); return n.y;}
        var ys=n.moves.map(function(m){return lay(m.to);}); n.x=pad+n._d*dx; n.y=(ys[0]+ys[ys.length-1])/2; return n.y;})(root);
    }
    // solve (post-order, verify, record choices)
    var order=[];
    (function solve(n){ if(isLeaf(n)){n._v=n.pay;return n.pay;}
      var vals=n.moves.map(function(m){return solve(m.to);}), mine=vals.map(function(v){return v[n.p];});
      var best=Math.max.apply(null,mine), winners=mine.map(function(v,i){return v===best?i:-1;}).filter(function(i){return i>-1;});
      var pick=winners[0];
      if(winners.length>1){ if(n.pick===undefined||winners.indexOf(n.pick)<0) throw new Error('tie at node '+n.id+': set node.pick'); pick=n.pick; }
      if(n.pick!==undefined&&n.pick!==pick) throw new Error('node '+n.id+': pick is not a best move');
      n._pick=pick; n._v=vals[pick]; order.push(n); return n._v;})(root);
    var steps=[]; if(C.intro)steps.push({k:'intro'});
    order.forEach(function(n){ if(C.split===false)steps.push({k:'pick',n:n,both:true}); else {steps.push({k:'cmp',n:n});steps.push({k:'pick',n:n});} });
    // equilibrium path
    var path={}, n=root; path[n.id]=1; while(!isLeaf(n)){n=n.moves[n._pick].to; path[n.id]=1;}
    var eqLeaf=n;
    var xs=all.map(function(q){return q.x;}), ys=all.map(function(q){return q.y;});
    var tw=Math.max.apply(null,leaves.map(function(l){return l.below?0:fmt(l.pay).length*8+52;}));
    var vb=[Math.min.apply(null,xs)-pad+4, Math.min.apply(null,ys)-top+2, Math.max.apply(null,xs)-Math.min.apply(null,xs)+pad+tw+6, Math.max.apply(null,ys)-Math.min.apply(null,ys)+top+(leaves.some(function(l){return l.below;})?44:30)];
    return prepared[name]={C:C,root:root,all:all,internals:internals,leaves:leaves,order:order,steps:steps,path:path,eqLeaf:eqLeaf,vb:vb};
  }
  names.forEach(prepare); // verify every track up front
  // ---------- DOM ----------
  var root=document.createElement('div'); root.className='stepper tstree';
  root.innerHTML=(names.length>1?'<div class="tabs"></div>':'')+'<div class="sbar"><span class="sround"></span><span class="swho"></span></div>'+
    '<div class="tsv"></div><div class="msg"></div><div class="nav"><button class="bk" type="button">&larr; Back</button><button class="nx" type="button">Next &rarr;</button></div>';
  var box=root.querySelector('.tsv'), msg=root.querySelector('.msg'), bk=root.querySelector('.bk'), nx=root.querySelector('.nx');
  function el(tag,attrs,parent,text){var e=document.createElementNS(NS,tag);for(var a in attrs)if(attrs[a]!==undefined)e.setAttribute(a,attrs[a]);if(text!==undefined)e.textContent=text;if(parent)parent.appendChild(e);return e;}
  // payoff label: tuple with optional emphasis of one index, optional box (cmp | win | lose)
  function payoff(g,v,x,y,o){
    o=o||{}; var anchor=o.anchor||'start', s=fmt(v), w=s.length*7.6+(o.tick?16:0)+(o.emph!==undefined?6:0);
    var x0=anchor==='middle'?x-w/2:x;
    if(o.box){var col=o.box==='win'?GREEN:o.box==='lose'?RED:CHOSEN;
      el('rect',{x:x0-6,y:y-15,width:w+12,height:22,rx:6,fill:o.box==='win'?'#e4f6ec':o.box==='lose'?'#fae5e4':'#ece7fd',stroke:col,'stroke-width':o.box==='cmp'?1.6:2.2},g);}
    if(o.ring)el('rect',{x:x0-6,y:y-15,width:w+12,height:22,rx:6,fill:'none',stroke:AMBER,'stroke-width':1.8,'stroke-dasharray':'3 2'},g);
    var t=el('text',{x:x0,y:y,'font-size':13,'font-weight':700,'font-family':'-apple-system,Segoe UI,Arial',fill:o.fill||INK},g);
    if(o.dim)t.setAttribute('opacity','.55');
    el('tspan',{},t,'(');
    v.forEach(function(n,i){ var a={};
      if(o.emph!==undefined){ if(i===o.emph){a['font-size']=15.5;a['font-weight']=800;a.fill=o.box==='lose'?RED:o.box==='win'?GREEN:P[i]?P[i].color:INK;a['text-decoration']='underline';} else a.fill=MUTED; }
      el('tspan',a,t,String(n)); if(i<v.length-1)el('tspan',{fill:o.emph!==undefined?MUTED:undefined},t,', ');});
    el('tspan',{},t,')'+(o.tick?' ✓':o.cross?' ✗':''));
    return t;
  }
  function render(){
    var S=prepare(cur), C=S.C, steps=S.steps, atEnd=step>=steps.length, st=atEnd?null:steps[step];
    var curNode=st&&st.n, phase=st?st.k:'end';
    // which nodes are solved (pick shown) at this step
    var solved={}; for(var i=0;i<(atEnd?steps.length:step+1);i++){var q=steps[i]; if(q.k==='pick')solved[q.n.id]=1;}
    var svg=el('svg',{viewBox:S.vb.join(' '),role:'img','aria-label':'Game tree, solved step by step from the last decision backwards.'});
    svg.style.maxWidth=Math.round(S.vb[2]*1.45)+'px'; svg.style.minWidth=Math.round(S.vb[2]*0.8)+'px'; // stays readable on a phone; the box scrolls sideways
    var gE=el('g',{},svg), gL=el('g',{},svg), gN=el('g',{},svg), gP=el('g',{},svg);
    // edges + move labels
    S.internals.forEach(function(n){
      n.moves.forEach(function(m,mi){
        var c=m.to, isChosen=solved[n.id]&&n._pick===mi, stroke=FAINT, w=1.8, dash=null, lab='#6f6886', bold=600, op=1;
        if(atEnd){ if(S.path[n.id]&&isChosen){stroke=GREEN;w=3.6;lab=GREEN;bold=800;} else if(isChosen){stroke=DASH;dash='5 4';lab=DASH;} }
        else if(curNode===n){ if(phase==='pick'){ if(isChosen){stroke=CHOSEN;w=3.6;lab=CHOSEN;bold=800;} else {op=.35;} } else {stroke='#8f88a8';w=2.4;lab=INK;bold=700;} }
        else if(solved[n.id]){ if(isChosen){stroke=CHOSEN;w=3;lab=CHOSEN;bold=700;} else op=.35; }
        var a={x1:n.x,y1:n.y,x2:c.x,y2:c.y,stroke:stroke,'stroke-width':w,opacity:op}; if(dash)a['stroke-dasharray']=dash; el('line',a,gE);
        // label at midpoint, pushed off the line
        var lt_=c.pay?0.5:0.38, mx=n.x+(c.x-n.x)*lt_, my=n.y+(c.y-n.y)*lt_, ddx=c.x-n.x, ddy=c.y-n.y, len=Math.sqrt(ddx*ddx+ddy*ddy)||1, nx_=-ddy/len, ny_=ddx/len;
        if(ny_>0){nx_=-nx_;ny_=-ny_;} // always put the label on the upper side
        var off=Math.abs(ddy)>Math.abs(ddx)*3?12:9, anc='middle';
        var lx=mx+nx_*off, ly=my+ny_*off+4;
        if(Math.abs(ddx)<2){lx=n.x+8;ly=(n.y+c.y)/2+4;anc='start';}
        if(m.lx!==undefined){lx=m.lx;ly=m.ly;}
        var lt=el('text',{x:lx,y:ly,'text-anchor':anc,'font-size':12,'font-weight':bold,'font-family':'-apple-system,Segoe UI,Arial',fill:lab,opacity:op},gL,m.label);
      });
    });
    // leaves
    S.leaves.forEach(function(l){
      var par=l._par, mi=par.moves.map(function(m){return m.to;}).indexOf(l), o={};
      var onPath=atEnd&&S.path[l.id];
      el('circle',{cx:l.x,cy:l.y,r:onPath?6:4,fill:onPath?GREEN:'#8f88a8'},gN);
      if(curNode===par){ o.emph=par.p; if(phase==='cmp') o.box='cmp'; if(phase==='pick'){o.box=par._pick===mi?'win':'lose';o.tick=par._pick===mi;o.cross=par._pick!==mi;} }
      if(onPath){o.fill=GREEN;o.tick=true;o.box='win';if(C.ask!==undefined)o.emph=C.ask;}
      if(l.mark&&!onPath&&curNode!==par)o.ring=true;
      if(!atEnd&&!onPath&&curNode!==par&&solvedAbove(l,solved))o.dim=true;
      var tx=l.below?l.x:l.x+12, ty=l.below?l.y+22:l.y+5;
      payoff(gP,l.pay,tx,ty,Object.assign(o,{anchor:l.below?'middle':'start'}));
    });
    // internal nodes
    S.internals.forEach(function(n){
      var pl=P[n.p], isCur=curNode===n, r=14;
      if(isCur)el('circle',{cx:n.x,cy:n.y,r:23,fill:'none',stroke:'#f2b33d','stroke-width':3.5},gN);
      if(pl.shape==='circle')el('circle',{cx:n.x,cy:n.y,r:r,fill:pl.color},gN);
      else el('rect',{x:n.x-r,y:n.y-r,width:2*r,height:2*r,rx:6,fill:pl.color},gN);
      if(pl.short&&pl.short.length<=3)el('text',{x:n.x,y:n.y+4.5,'text-anchor':'middle','font-size':12.5,'font-weight':700,'font-family':'-apple-system,Segoe UI,Arial',fill:'#fff'},gN,pl.short);
      else el('text',{x:n.x,y:n.y+r+15,'text-anchor':'middle','font-size':11.5,'font-weight':700,'font-family':'-apple-system,Segoe UI,Arial',fill:pl.color},gN,pl.name);
    });
    // carried values: a pill above every solved internal node; children of the current node take a compare box
    S.internals.forEach(function(n){
      if(!solved[n.id]||n===S.root&&atEnd)return;
      var o={anchor:'middle'}, par=n._par;
      if(curNode&&par===curNode){ o.emph=par.p; var mi=par.moves.map(function(m){return m.to;}).indexOf(n);
        o.box=phase==='cmp'?'cmp':(par._pick===mi?'win':'lose'); if(phase==='pick'){o.tick=par._pick===mi;o.cross=par._pick!==mi;} }
      else if(curNode===n&&phase==='pick'){o.box='cmp';o.emph=n.p;}
      else if(atEnd&&!S.path[n.id])o.dim=true;
      else if(!atEnd&&solvedAbove(n,solved))o.dim=true;
      var g=el('g',{},gP);
      if(curNode===n&&phase==='pick'){ // animate the winning payoff travelling back to the node
        var w=n.moves[n._pick].to, wx=w.pay?(w.below?w.x:w.x+12+fmt(w.pay).length*3.8):w.x, wy=w.pay?(w.below?w.y+22:w.y+5):w.y-24;
        g.setAttribute('class','carry'); g.setAttribute('style','--dx:'+(wx-n.x)+'px;--dy:'+(wy-(n.y-24))+'px');
      }
      payoff(g,n._v,n.x,n.y-24,o);
    });
    box.innerHTML=''; box.appendChild(svg);
    if(box.scrollWidth>box.clientWidth){var fx=curNode?curNode.x:(atEnd?S.root.x:S.vb[0]); box.scrollLeft=Math.max(0,(fx-S.vb[0])/S.vb[2]*svg.getBoundingClientRect().width-box.clientWidth/2);} // keep the node in view on narrow screens
    // text
    root.querySelector('.sround').innerHTML=atEnd?'<b>Done</b>':'<b>Step '+(step+1)+' of '+steps.length+'</b>';
    root.querySelector('.swho').innerHTML=curNode?'<span style="color:'+P[curNode.p].color+';font-weight:700">'+P[curNode.p].name+'</span> decides':(atEnd?'<span style="color:'+GREEN+';font-weight:700">Equilibrium path in green</span>':'');
    msg.className='msg';
    if(atEnd){msg.classList.add('good');msg.innerHTML=C.finalMsg;}
    else msg.innerHTML=text(st,C);
    bk.disabled=step===0; nx.disabled=atEnd; nx.innerHTML=step===steps.length-1?'Finish &rarr;':'Next &rarr;';
  }
  // a node or leaf sits under a node already solved but not on its chosen branch: grey it out
  function solvedAbove(n,solved){ var c=n, p=n._par; while(p){ if(solved[p.id]&&p.moves[p._pick].to!==c)return true; c=p; p=p._par;} return false; }
  function text(st,C){
    if(st.k==='intro')return C.intro;
    var n=st.n, pl=P[n.p], who='<b style="color:'+pl.color+'">'+pl.name+'</b>', note=(C.notes&&C.notes[n.id])||{};
    var lines=n.moves.map(function(m){var c=m.to; return '<b>'+m.label+'</b> '+(c.pay?'ends at ':'now leads to ')+fmt(c._v)+', so '+pl.name+' gets <b>'+c._v[n.p]+'</b>.';});
    var mine=n.moves.map(function(m){return m.to._v[n.p];}), best=mine[n._pick], others=mine.filter(function(v,i){return i!==n._pick;});
    var cmpTxt=who+' moves here. '+pl.name+' only reads the <b>'+ORD[n.p]+'</b> number in each payoff.<br>'+lines.join('<br>')+(note.cmp?'<br><span style="color:var(--muted)">'+note.cmp+'</span>':'');
    var tie=others.indexOf(best)>-1;
    var pickTxt='<b>'+(tie?best+' ties with '+best+'. '+pl.name+' picks ':others.map(function(v){return best+' &gt; '+v;}).join(' and ')+', so '+pl.name+' plays ')+n.moves[n._pick].label+'.</b><br>'+
      'Carry '+fmt(n._v)+' back to this node. From now on the whole branch is worth '+fmt(n._v)+'.'+(note.pick?'<br><span style="color:var(--muted)">'+note.pick+'</span>':'');
    if(st.both)return cmpTxt+'<br>'+pickTxt;
    return st.k==='cmp'?cmpTxt:pickTxt;
  }
  if(names.length>1){ var tabs=root.querySelector('.tabs'); names.forEach(function(nm){var b=document.createElement('button');b.type='button';b.textContent=nm;b.className=nm===cur?'on':'';
    b.onclick=function(){cur=nm;step=0;Array.prototype.forEach.call(tabs.children,function(x){x.className=x.textContent===nm?'on':'';});render();};tabs.appendChild(b);}); }
  nx.onclick=function(){ if(step<prepare(cur).steps.length){step++;render();} };
  bk.onclick=function(){ if(step>0){step--;render();} };
  render();
  return root;
}
