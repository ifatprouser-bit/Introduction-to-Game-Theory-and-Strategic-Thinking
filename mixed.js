// ---- Mixed-strategy stepper: Back/Next walk-through of a 2x2 indifference problem ----
// buildMixedStepper(cfg) returns a .stepper element. cfg: rows:[2 word labels], cols:[2 word labels],
//   cells: [[a,b],[c,d]] (zero-sum, player 1's payoff) or [[[a1,a2],[b1,b2]],[[c1,c2],[d1,d2]]] (two numbers),
//   ask: 'q' | 'p' | 'pq' | 'value' | {cell:[rowIdx,colIdx]},  expect: the answer as a number (0.4, 0.24, 6...); throws if the engine disagrees.
//   Optional: finalMsg (html, or function(r) using r.p, r.q, r.V, r.ans, r.u1(i,j)), notes:{pure,q,p,result,check: html or function(r)},
//   trap:true (pure games: show the parallel lines that never cross), p1/p2 (player names), tol (default 0.006).
// q = how often player 2 plays the first column; p = how often player 1 plays the first row. Every number shown is computed here.
function buildMixedStepper(cfg){
  if(!document.getElementById('mx-css')){
    var css=document.createElement('style'); css.id='mx-css';
    css.textContent='.mx-top{display:flex;gap:14px;flex-wrap:wrap;align-items:flex-start;}'+
    '.mx-top .tscroll{flex:1 1 250px;min-width:0;} .mx-top table.dtable{margin:0;font-size:15px;}'+
    '.mx-top table.dtable td{font-size:16px;font-weight:600;}'+
    '.mx-key{flex:1 1 210px;font-size:14px;line-height:1.45;background:#fbfaff;border:1px solid var(--line);border-radius:10px;padding:9px 12px;}'+
    '.mx-key .kl{margin:2px 0 3px;} .mx-key .kl b{color:var(--brand-d);} .mx-key .kv{color:var(--muted);font-weight:700;}'+
    '.mx-bar{display:flex;height:24px;border-radius:7px;overflow:hidden;margin:3px 0 2px;font-size:13px;font-weight:700;}'+
    '.mx-bar span{display:flex;align-items:center;justify-content:center;color:#fff;white-space:nowrap;overflow:hidden;transition:flex-basis .45s;}'+
    '.mx-bar .s1{background:#5238c4;} .mx-bar .s2{background:#2f6ba8;} .mx-bar.unk span{background:#ddd8ec;color:#5b5573;}'+
    '.mx-barlab{display:flex;justify-content:space-between;font-size:13px;color:var(--muted);margin-bottom:8px;}'+
    '.mx-edge{display:block;font-size:13px;font-weight:700;color:#2f6ba8;margin-top:2px;}'+
    '.stepper table.dtable .mx-hl{outline:3px solid var(--brand);outline-offset:-3px;background:var(--brand-soft);}'+
    '.stepper table.dtable .mx-keep{background:var(--good-soft)!important;color:var(--good)!important;font-weight:800;outline:3px solid #15794a;outline-offset:-3px;}'+
    '.mx-dim{opacity:.35;}'+
    '.mx-work{font-family:"SF Mono",Menlo,Consolas,monospace;background:#f6f4fc;border:1px solid var(--line);border-radius:8px;padding:8px 12px;margin-top:10px;font-size:14.5px;line-height:1.7;}'+
    '.mx-work .wt{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;font-size:13px;font-weight:700;color:var(--muted);}'+
    '.mx-work .wl{color:#7a7491;} .mx-work .wl.cur{color:var(--brand-d);font-weight:700;}';
    document.head.appendChild(css);
  }
  var R=cfg.rows, C=cfg.cols, two=Array.isArray(cfg.cells[0][0]), ask=cfg.ask;
  var P1=cfg.p1||'player 1', P2=cfg.p2||'player 2';
  function cap(s){return s.charAt(0).toUpperCase()+s.slice(1);}
  function u1(i,j){return two?cfg.cells[i][j][0]:cfg.cells[i][j];}
  function u2(i,j){return two?cfg.cells[i][j][1]:-cfg.cells[i][j];}
  function clean(x){return Math.round(x*1e9)/1e9;}
  function num(x){x=clean(x);var r=Math.round(x*1000)/1000;return (Math.abs(x-r)>1e-6?'≈ ':'')+(r<0?'−':'')+String(Math.abs(r));}
  function pct(x){x=clean(x*100);var r=Math.round(x*10)/10;return (Math.abs(x-r)>1e-6?'≈ ':'')+String(r)+'%';}
  function sg(x){return x<0?'(−'+Math.abs(x)+')':String(x);}
  function coefv(b,v){var a=Math.abs(b);return (a===1?'':String(clean(a)))+v;}
  function lin(e,v){ // e = {a, b} means a + b*v
    var a=clean(e.a), b=clean(e.b), s='';
    if(a!==0) s=(a<0?'−':'')+Math.abs(a);
    if(b!==0) s+= s===''?(b<0?'−':'')+coefv(b,v):(b<0?' − ':' + ')+coefv(b,v);
    return s===''?'0':s;
  }
  function at(e,x){return clean(e.a+e.b*x);}
  function plug(e,x){ // "6 − 6 × 0.4 = 3.6"
    var a=clean(e.a), b=clean(e.b), s;
    if(b===0) return num(a);
    var t=(Math.abs(b)===1?'':Math.abs(b)+' × ')+num(x);
    s=a===0?(b<0?'−':'')+t:num(a)+(b<0?' − ':' + ')+t;
    return s+' = '+num(at(e,x));
  }
  // payoff lines: row i against q (player 1's numbers); column j against p (player 2's numbers, or player 1's when zero-sum)
  function rowE(i){return {a:u1(i,1),b:u1(i,0)-u1(i,1)};}
  function rowRaw(i){return sg(u1(i,0))+'q + '+sg(u1(i,1))+'(1 − q)';}
  function colU(i,j){return two?u2(i,j):u1(i,j);}
  function colE(j){return {a:colU(1,j),b:colU(0,j)-colU(1,j)};}
  function colRaw(j){return sg(colU(0,j))+'p + '+sg(colU(1,j))+'(1 − p)';}
  // solve L = R for v, one algebra move per line
  function solve(L,Rr,v,lab){
    var out=[], A=L, B=Rr, flip=false;
    if(clean(A.b)===clean(B.b)) throw new Error('mixed: lines are parallel, no indifference point');
    if(A.b<B.b){A=Rr;B=L;flip=true;} // keep the unknown on the side with the bigger coefficient
    function eq(x,y){return flip?lin(y,v)+' = '+lin(x,v):lin(x,v)+' = '+lin(y,v);}
    if(clean(B.b)!==0){ var t=(B.b<0?'Add ':'Subtract ')+coefv(B.b,v)+(B.b<0?' to':' from')+' both sides. Now '+v+' is on one side only.';
      A={a:A.a,b:A.b-B.b}; B={a:B.a,b:0}; out.push({t:t,line:eq(A,B)}); }
    if(clean(A.a)!==0){ var t2=(A.a>0?'Subtract '+clean(A.a)+' from':'Add '+clean(-A.a)+' to')+' both sides. Now the plain numbers are on the other side.';
      B={a:B.a-A.a,b:0}; A={a:0,b:A.b}; out.push({t:t2,line:eq(A,B)}); }
    var k=clean(A.b), n=clean(B.a), val=clean(n/k);
    out.push({t:k===1?'That is the answer.':'Divide both sides by '+k+'.',line:v+' = '+(k===1?'':n+' ÷ '+k+' = ')+num(val),val:val});
    if(!(val>0&&val<1)) throw new Error('mixed: '+v+' = '+val+' is not a real mixture');
    return out;
  }
  // ---------- pure check ----------
  var stable=[];
  for(var i=0;i<2;i++)for(var j=0;j<2;j++){
    var ok=two?(u1(i,j)>=u1(1-i,j)&&u2(i,j)>=u2(i,1-j)):(u1(i,j)<=u1(i,1-j)&&u1(i,j)>=u1(1-i,j));
    if(ok) stable.push([i,j]);
  }
  var pure=stable.length>0;
  var needP=!pure&&(ask==='p'||ask==='pq'||(ask&&ask.cell)), needQ=!pure&&ask!=='p';
  var r={pure:pure,u1:u1,u2:u2,rows:R,cols:C,pct:pct,num:num};
  var S=[], st={hl:[],keep:[],work:[],wt:'',qOn:false,pOn:false,q:null,p:null,dim:0,phase:'Check first'};
  function push(msg,ch){ for(var k in ch) st[k]=ch[k]; var c=JSON.parse(JSON.stringify(st)); c.msg=msg; S.push(c); }
  function note(k){var n=cfg.notes&&cfg.notes[k]; if(!n) return ''; n=typeof n==='function'?n(r):n; return '<br><span style="color:var(--muted)">'+n+'</span>';}
  function cellName(i,j){return '('+R[i]+', '+C[j]+')';}
  function workAdd(line){var w=st.work.slice(); w.push(line); return w;}

  if(pure){
    var s0=stable[0], vi=s0[0], vj=s0[1];
    r.V=u1(vi,vj);
    if(!two){
      var dom=-1; for(var d=0;d<2;d++){ if(u1(d,0)>u1(1-d,0)&&u1(d,1)>u1(1-d,1)) dom=d; }
      if(dom>=0){
        push('<b>First, look for a stable cell. Before any equation.</b><br>'+cap(P1)+' compares his two rows. '+R[dom]+' beats '+R[1-dom]+' in both columns: '+
          u1(dom,0)+' &gt; '+u1(1-dom,0)+' and '+u1(dom,1)+' &gt; '+u1(1-dom,1)+'.<br><b>So '+R[dom]+' is a dominant strategy. '+cap(P1)+' always plays '+R[dom]+'.</b>'+note('pure'),
          {hl:[[dom,0],[dom,1]],phase:'Check first'});
        var lo=u1(dom,0)<=u1(dom,1)?0:1;
        push(cap(P2)+' knows this. She wants the number <b>low</b>.<br>In the '+R[dom]+' row she picks '+u1(dom,lo)+' rather than '+u1(dom,1-lo)+'. That means <b>'+C[lo]+'</b>.',
          {hl:[[dom,lo]]});
      }
      push('<b>Saddle point test</b> on '+cellName(vi,vj)+' = '+u1(vi,vj)+'.<br>Smallest in its row? The row is '+u1(vi,0)+' and '+u1(vi,1)+'. Yes.<br>Largest in its column? The column is '+u1(0,vj)+' and '+u1(1,vj)+'. Yes.<br><b>A stable cell. Nobody wants to move, so nobody mixes.</b>',
        {hl:[],keep:[[vi,vj]]});
    } else {
      push('<b>First, look for a stable cell.</b> Check '+cellName(vi,vj)+' = '+u1(vi,vj)+', '+u2(vi,vj)+'.<br>'+cap(P1)+' (first numbers): '+u1(vi,vj)+' against '+u1(1-vi,vj)+'. He stays.<br>'+cap(P2)+' (second numbers): '+u2(vi,vj)+' against '+u2(vi,1-vj)+'. She stays.<br><b>A Nash equilibrium in pure strategies. No mixing needed.</b>'+note('pure'),
        {keep:[[vi,vj]]});
    }
    if(cfg.trap){
      var e0=rowE(0), e1=rowE(1), gap=clean(e0.a-e1.a);
      push('<b>What if you try the mixing algebra anyway?</b> Call q how often '+P2+' plays '+C[0]+'.<br>'+R[0]+' gives '+lin(e0,'q')+'.',
        {qOn:true,hl:[[0,0],[0,1]],wt:'Trying the indifference equation',work:[R[0]+': '+rowRaw(0)+' = '+lin(e0,'q')],phase:'The trap'});
      push(R[1]+' gives '+lin(e1,'q')+'.',{hl:[[1,0],[1,1]],work:workAdd(R[1]+': '+rowRaw(1)+' = '+lin(e1,'q'))});
      push('Both have the same '+(e0.b<0?'−':'')+coefv(e0.b,'q')+' part, so they move together, like two train rails. They are <b>parallel</b>. '+R[gap>0?0:1]+' is ahead by '+Math.abs(gap)+' whatever q is.<br><b>They never cross. There is no indifference point to find.</b>',
        {hl:[],work:workAdd(R[0]+' − '+R[1]+' = '+num(gap)+'  for every q')});
    }
    if(ask==='value'){ r.ans=r.V; push('<b>The value of the game</b> is the number in the stable cell: <b>'+num(r.V)+'</b>.'+note('result'),{hl:[],keep:[[vi,vj]],qOn:false,work:[],phase:'Answer'}); }
    else if(ask&&ask.cell){ var hit=stable.some(function(c){return c[0]===ask.cell[0]&&c[1]===ask.cell[1];}); r.ans=hit?1:0;
      push('Players do not mix, so '+cellName(ask.cell[0],ask.cell[1])+' happens '+(hit?'every time: 100%.':'never: 0%.')+note('result'),{hl:[ask.cell],phase:'Answer'}); }
    else throw new Error('mixed: a pure game only supports ask value or cell');
  } else {
    // ---------- check: no stable cell ----------
    var lines=[], hl=[];
    if(!two){
      for(var a=0;a<2;a++){
        var mn=Math.min(u1(a,0),u1(a,1)), jj=u1(a,0)<=u1(a,1)?0:1, big=Math.max(u1(0,jj),u1(1,jj));
        hl.push([a,jj]);
        lines.push(R[a]+' row: its smallest number is '+mn+' (under '+C[jj]+'). The largest in the '+C[jj]+' column? No, '+big+' is larger.');
      }
      push('<b>First, look for a stable cell</b> (a saddle point): smallest in its row <i>and</i> largest in its column.<br>'+lines.join('<br>')+'<br><b>No cell passes. Nobody can stand still, so the players must mix.</b>',{hl:hl});
    } else {
      for(var a2=0;a2<2;a2++)for(var b2=0;b2<2;b2++){
        if(u1(a2,b2)<u1(1-a2,b2)) lines.push(cellName(a2,b2)+': '+P1+' moves to '+R[1-a2]+' ('+u1(1-a2,b2)+' beats '+u1(a2,b2)+').');
        else lines.push(cellName(a2,b2)+': '+P2+' moves to '+C[1-b2]+' ('+u2(a2,1-b2)+' beats '+u2(a2,b2)+').');
      }
      push('<b>First, look for a stable cell</b> where nobody wants to move.<br>'+lines.join('<br>')+'<br><b>Every cell has someone who moves. So the players must mix.</b>',{});
    }
    // ---------- q ----------
    function doQ(){
      var e0=rowE(0), e1=rowE(1);
      push('<b>Name the unknown.</b> <b>q = how often '+P2+' plays '+C[0]+'.</b> She plays '+C[1]+' the rest of the time: 1 − q.<br>We find q with the <b>indifference condition</b>: '+P2+'\'s mixture must leave '+P1+' with nothing to prefer between '+R[0]+' and '+R[1]+'.',
        {qOn:true,hl:[],keep:[],wt:'Finding q, using '+P1+'\'s numbers',work:[],dim:two?2:0,phase:'Finding q'});
      push(cap(P1)+'\'s average from <b>'+R[0]+'</b>. He gets '+u1(0,0)+' when she plays '+C[0]+' (a share q of the time) and '+u1(0,1)+' when she plays '+C[1]+' (1 − q).'+(two?'<br>'+cap(P1)+' only looks at the <b>first</b> numbers.':''),
        {hl:[[0,0],[0,1]],work:workAdd(R[0]+': '+rowRaw(0)+' = '+lin(e0,'q'))});
      push('Same for <b>'+R[1]+'</b>: '+u1(1,0)+' against '+C[0]+', '+u1(1,1)+' against '+C[1]+'.',
        {hl:[[1,0],[1,1]],work:workAdd(R[1]+': '+rowRaw(1)+' = '+lin(e1,'q'))});
      push('<b>The indifference condition: set the two equal.</b> At the right q, '+R[0]+' and '+R[1]+' pay '+P1+' the same.',
        {hl:[],work:workAdd(lin(e0,'q')+' = '+lin(e1,'q'))});
      var sol=solve(e0,e1,'q');
      sol.forEach(function(m){ push(m.t,{work:workAdd(m.line)}); });
      r.q=sol[sol.length-1].val;
      push('<b>Write it on the grid.</b> '+cap(P2)+' plays '+C[0]+' '+pct(r.q)+' of the time and '+C[1]+' '+pct(1-r.q)+'.'+note('q'),{q:r.q});
    }
    function doP(){
      var f0=colE(0), f1=colE(1);
      push('<b>Now the other player.</b> <b>p = how often '+P1+' plays '+R[0]+'.</b> He plays '+R[1]+' the rest of the time: 1 − p.<br>His mixture must leave <b>'+P2+'</b> with nothing to prefer between '+C[0]+' and '+C[1]+'.'+
        (two?'<br>So now read only the <b>second</b> numbers, '+P2+'\'s.':'<br>Her payoff is minus the number in the cell. So she is indifferent exactly when '+P1+'\'s number is the same in both columns.'),
        {pOn:true,hl:[],wt:'Finding p, using '+(two?P2+'\'s numbers':'the same numbers, column by column'),work:[],dim:two?1:0,phase:'Finding p'});
      push('Down the <b>'+C[0]+'</b> column: '+colU(0,0)+' when '+P1+' plays '+R[0]+' (a share p), '+colU(1,0)+' when he plays '+R[1]+' (1 − p).',
        {hl:[[0,0],[1,0]],work:workAdd(C[0]+': '+colRaw(0)+' = '+lin(f0,'p'))});
      push('Same down the <b>'+C[1]+'</b> column: '+colU(0,1)+' and '+colU(1,1)+'.',
        {hl:[[0,1],[1,1]],work:workAdd(C[1]+': '+colRaw(1)+' = '+lin(f1,'p'))});
      push('<b>The indifference condition again: set them equal.</b>',{hl:[],work:workAdd(lin(f0,'p')+' = '+lin(f1,'p'))});
      var sol=solve(f0,f1,'p');
      sol.forEach(function(m){ push(m.t,{work:workAdd(m.line)}); });
      r.p=sol[sol.length-1].val;
      var diff=(r.q!=null&&Math.abs(r.p-r.q)>1e-6)?'<br><b>Stop and look:</b> p = '+num(r.p)+' but q = '+num(r.q)+'. They are not equal. Never assume they are.':'';
      push('<b>Write it on the grid.</b> '+cap(P1)+' plays '+R[0]+' '+pct(r.p)+' of the time and '+R[1]+' '+pct(1-r.p)+'.'+diff+note('p'),{p:r.p});
    }
    if(needQ) doQ();
    if(needP) doP();
    // ---------- result ----------
    var e0=rowE(0), e1=rowE(1);
    if(r.q!=null) r.V=at(e0,r.q);
    if(ask==='q') r.ans=r.q;
    else if(ask==='p') r.ans=r.p;
    else if(ask==='pq') r.ans=r.p;
    else if(ask==='value'){
      r.ans=r.V;
      push('<b>The value of the game.</b> Put q back into either row. Both give the same number, so take the easier one.<br>'+cap(P1)+'\'s expected payoff is <b>'+num(r.V)+'</b>.'+note('result'),
        {hl:[[0,0],[0,1]],wt:'The value of the game',work:[R[0]+': '+plug(e0,r.q)],dim:two?2:0,phase:'Answer'});
    } else if(ask&&ask.cell){
      var ci=ask.cell[0], cj=ask.cell[1], pr=ci===0?r.p:1-r.p, qr=cj===0?r.q:1-r.q;
      r.ans=clean(pr*qr);
      push('<b>Multiply.</b> The two players mix separately, so the chance of one cell is (chance of its row) × (chance of its column).<br>'+cellName(ci,cj)+': '+(ci===0?'p':'(1 − p)')+' × '+(cj===0?'q':'(1 − q)')+' = '+num(pr)+' × '+num(qr)+' = '+num(r.ans)+' = <b>'+pct(r.ans)+'</b>.'+note('result'),
        {hl:[],keep:[[ci,cj]],wt:'The chance of the cell '+cellName(ci,cj),work:[(ci===0?'p':'(1 − p)')+' × '+(cj===0?'q':'(1 − q)')+' = '+num(pr)+' × '+num(qr)+' = '+num(r.ans)],dim:0,phase:'Answer'});
    } else throw new Error('mixed: unknown ask');
    // ---------- check ----------
    var chk=[], txt=[];
    if(r.q!=null){ var v0=at(e0,r.q), v1=at(e1,r.q); if(Math.abs(v0-v1)>1e-6) throw new Error('mixed: q check failed');
      chk.push(R[0]+': '+plug(e0,r.q)); chk.push(R[1]+': '+plug(e1,r.q));
      txt.push('With q = '+num(r.q)+', '+R[0]+' and '+R[1]+' both pay '+P1+' an average of '+num(v0)+'. He really is indifferent.'); }
    if(r.p!=null){ var f0=colE(0), f1=colE(1), w0=at(f0,r.p), w1=at(f1,r.p); if(Math.abs(w0-w1)>1e-6) throw new Error('mixed: p check failed');
      chk.push(C[0]+': '+plug(f0,r.p)); chk.push(C[1]+': '+plug(f1,r.p));
      txt.push('With p = '+num(r.p)+', '+C[0]+' and '+C[1]+' both give '+num(w0)+'. '+cap(P2)+' really is indifferent.'); }
    push('<b>Check: plug the answer back in.</b><br>'+txt.join('<br>')+' ✓'+note('check'),{hl:[],wt:'Check',work:chk,dim:0,phase:'Check'});
  }
  // ---------- verify against the expected answer ----------
  if(cfg.expect!==undefined){ var tol=cfg.tol||0.006;
    if(!(Math.abs(r.ans-cfg.expect)<=tol)) throw new Error('mixed: computed '+r.ans+' but expected '+cfg.expect); }

  // ---------- render ----------
  var root=document.createElement('div'); root.className='stepper mx';
  root.innerHTML='<div class="sbar"><span class="sround"></span><span class="sphase"></span></div>'+
    '<div class="mx-top"><div class="tscroll"><table class="dtable"></table></div><div class="mx-key"></div></div>'+
    '<div class="mx-work"></div><div class="msg"></div>'+
    '<div class="nav"><button class="bk" type="button">&larr; Back</button><button class="nx" type="button">Next &rarr;</button></div>';
  var tbl=root.querySelector('table'), key=root.querySelector('.mx-key'), work=root.querySelector('.mx-work'), msg=root.querySelector('.msg'),
      bk=root.querySelector('.bk'), nx=root.querySelector('.nx'), step=0, N=S.length;
  function has(list,i,j){return list.some(function(c){return c[0]===i&&c[1]===j;});}
  function bar(val,l1,l2,on){
    if(val==null) return '<div class="mx-bar unk"><span style="flex-basis:50%">'+(on?'?':'')+'</span><span style="flex-basis:50%">'+(on?'?':'')+'</span></div><div class="mx-barlab"><span>'+l1+'</span><span>'+l2+'</span></div>';
    return '<div class="mx-bar"><span class="s1" style="flex-basis:'+(val*100)+'%">'+(val>=0.12?pct(val):'')+'</span><span class="s2" style="flex-basis:'+((1-val)*100)+'%">'+(1-val>=0.12?pct(1-val):'')+'</span></div>'+
      '<div class="mx-barlab"><span>'+l1+' '+pct(val)+'</span><span>'+l2+' '+pct(1-val)+'</span></div>';
  }
  function render(){
    var atEnd=step>=N, s=S[Math.min(step,N-1)];
    var h='<tr><th></th>'+C.map(function(c,j){
      var tag=s.qOn?'<span class="mx-edge">'+(s.q==null?(j===0?'q':'1 − q'):pct(j===0?s.q:1-s.q))+'</span>':'';
      return '<th>'+c+tag+'</th>';}).join('')+'</tr>';
    for(var i=0;i<2;i++){
      var tag=s.pOn?'<span class="mx-edge">'+(s.p==null?(i===0?'p':'1 − p'):pct(i===0?s.p:1-s.p))+'</span>':'';
      h+='<tr><td class="lab">'+R[i]+tag+'</td>';
      for(var j=0;j<2;j++){
        var cl=has(s.keep,i,j)?'mx-keep':(has(s.hl,i,j)?'mx-hl':'');
        var t;
        if(two){ var a=String(u1(i,j)), b=String(u2(i,j)); if(s.dim===2)b='<span class="mx-dim">'+b+'</span>'; if(s.dim===1)a='<span class="mx-dim">'+a+'</span>'; t=a+', '+b; }
        else t=String(u1(i,j));
        t=t.replace(/-/g,'−');
        h+='<td class="'+cl+'">'+t+(cl==='mx-keep'?' ✓':'')+'</td>';
      }
      h+='</tr>';
    }
    tbl.innerHTML=h;
    var k='<div class="kl"><b>q</b> = how often '+P2+' plays <b>'+C[0]+'</b>'+(s.q!=null?'':' <span class="kv">'+(s.qOn?'?':'')+'</span>')+'</div>'+bar(s.q,C[0],C[1],s.qOn);
    if(needP) k+='<div class="kl"><b>p</b> = how often '+P1+' plays <b>'+R[0]+'</b>'+(s.p!=null?'':' <span class="kv">'+(s.pOn?'?':'')+'</span>')+'</div>'+bar(s.p,R[0],R[1],s.pOn);
    if(!needP&&!needQ&&!s.qOn) k='<div class="kl">'+cap(P1)+' picks the row and wants the number <b>high</b>.</div><div class="kl">'+cap(P2)+' picks the column and wants it <b>low</b>.</div>';
    if(!two&&(needP||needQ)) k+='<div class="kl" style="color:var(--muted);font-size:13px">One number per cell: '+P1+'\'s payoff. '+cap(P2)+' wants it low.</div>';
    key.innerHTML=k;
    if(s.work.length){ work.style.display=''; work.innerHTML='<div class="wt">'+s.wt+'</div>'+s.work.map(function(l,x){return '<div class="wl'+(x===s.work.length-1&&!atEnd?' cur':'')+'">'+l+'</div>';}).join(''); }
    else work.style.display='none';
    root.querySelector('.sround').innerHTML=atEnd?'<b>Done</b>':'<b>Step '+(step+1)+' of '+N+'</b>';
    root.querySelector('.sphase').textContent=atEnd?'':s.phase;
    msg.className='msg';
    if(atEnd){ msg.classList.add('good'); var f=cfg.finalMsg; msg.innerHTML=typeof f==='function'?f(r):(f||'<b>Answer: '+(ask&&ask.cell||ask==='value'?'':'')+num(r.ans)+'</b>'); }
    else msg.innerHTML=s.msg;
    bk.disabled=step===0; nx.disabled=atEnd; nx.textContent=step===N-1?'Finish →':'Next →';
  }
  nx.onclick=function(){if(step<N){step++;render();}};
  bk.onclick=function(){if(step>0){step--;render();}};
  render();
  root.result=r;
  return root;
}
