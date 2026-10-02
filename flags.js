// ---- Flags (take-away / 21-flags) stepper: Back/Next walk-through of "leave a multiple of max+1" ----
// buildFlagsStepper(cfg) returns a .stepper element (needs stepper.css). cfg: start (flags at the start, e.g. 21), taken (flags the first mover already took),
//   max (most flags per turn, e.g. 3), expect (the winning number to take now; throws if the engine disagrees), you / them (names), finalMsg (html).
// Steps: the pile, why multiples of (max+1) win, one trial per possible take (1..max), then the rest of the game in rounds of (max+1). Every number is computed here.
function buildFlagsStepper(cfg){
  var N=cfg.start, T=cfg.taken||0, MX=cfg.max||3, K=MX+1, pile=N-T, win=pile%K, YOU=cfg.you||'You', THEM=cfg.them||'Your opponent';
  if(win===0) throw new Error('flags: no winning move from '+pile);
  if(cfg.expect!==undefined&&cfg.expect!==win) throw new Error('flags: winning take is '+win+', expected '+cfg.expect);
  var lines=[]; for(var m=K;m<pile;m+=K)lines.push(m);
  var steps=[];
  steps.push({k:'pile',text:'<b>The pile.</b> The game started with <b>'+N+'</b> flags. '+THEM+' took <b>'+T+'</b> (grey). So <b>'+pile+'</b> are left, and it is your turn.<br>Whoever takes the last flag wins. Each turn you take 1 to '+MX+'.'});
  steps.push({k:'lines',text:'<b>The key spots are the multiples of '+K+'</b>: '+lines.join(', ')+'. The dashed lines mark them.<br>Why '+K+'? If the pile sits on a line and it is <i>his</i> turn, whatever he takes (1 to '+MX+'), you take the rest of '+K+'. The pile drops back onto the next line. In the end he faces 0 flags, and you took the last one.'});
  for(var k=1;k<=MX;k++){
    var left=pile-k;
    if(k===win) steps.push({k:'try',take:k,good:true,text:'<b>Try taking '+k+'.</b> That leaves '+pile+' &minus; '+k+' = <b>'+left+'</b>. '+left+' is a multiple of '+K+', so the pile sits exactly on a line. <b>Now he is the one who is stuck.</b>'});
    else { var r=left%K;
      steps.push({k:'try',take:k,reply:r,text:'<b>Try taking '+k+'.</b> That leaves '+pile+' &minus; '+k+' = <b>'+left+'</b>. Not on a line.<br>Now <b>he</b> takes '+r+' (blue) and lands on '+(left-r)+' himself. The trap is now yours.'}); }
  }
  steps.push({k:'rounds',text:'<b>The rest of the game.</b> After you take '+win+', each pair of turns removes exactly '+K+': he takes some, you take the rest of '+K+'.<br>'+(pile-win)+(function(){var s='';for(var q=pile-win-K;q>=0;q-=K)s+=' &rarr; '+q;return s;})()+'. You take the last flag.'});
  var S=steps.length;
  var root=document.createElement('div'); root.className='stepper flstep';
  root.innerHTML='<div class="sbar"><span class="sround"></span><span class="sleft"></span></div><div class="svg-wrap" style="margin:6px 0;padding:6px;overflow-x:auto"></div><div class="msg"></div>'+
    '<div class="nav"><button class="bk" type="button">&larr; Back</button><button class="nx" type="button">Next &rarr;</button></div>';
  var box=root.querySelector('.svg-wrap'), msg=root.querySelector('.msg'), bk=root.querySelector('.bk'), nx=root.querySelector('.nx'), step=0;
  var W=26, X0=18, VW=X0*2+N*W, H=118, GREY='#c8c2dd', INK='#6b4ef0', RED='#d2453f', GREEN='#15794a', BLUE='#2f7fd0', PAIR=['#ece7fd','#e4f6ec'];
  function svg(st,atEnd){
    var col={}, band='';
    for(var i=pile+1;i<=N;i++)col[i]=GREY;
    if(st&&st.k==='try'){ for(var a=pile-st.take+1;a<=pile;a++)col[a]=st.good?GREEN:RED;
      if(st.reply)for(var b=pile-st.take-st.reply+1;b<=pile-st.take;b++)col[b]=BLUE; }
    var showRounds=atEnd||(st&&st.k==='rounds');
    if(showRounds){ for(var w=pile-win+1;w<=pile;w++)col[w]=GREEN;
      for(var g=0;g*K<pile-win;g++){var lo=g*K+1, x=X0+(lo-1)*W; band+='<rect x="'+(x+1)+'" y="16" width="'+(K*W-2)+'" height="66" rx="7" fill="'+PAIR[g%2]+'"/>'+
        '<text x="'+(x+K*W/2)+'" y="100" text-anchor="middle" font-size="12" font-weight="700" fill="#6f6886">pair of turns</text>';} }
    var showLines=step>=1||atEnd, s='<svg viewBox="0 0 '+VW+' '+H+'" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Segoe UI,Arial,sans-serif" style="min-width:'+Math.round(VW*0.8)+'px">'+band;
    for(var f=1;f<=N;f++){ var x=X0+(f-1)*W+W/2, c=col[f]||INK, gone=f>pile;
      s+='<line x1="'+(x-6)+'" y1="28" x2="'+(x-6)+'" y2="72" stroke="'+c+'" stroke-width="2.4" opacity="'+(gone?.5:1)+'"/>'+
         '<path d="M'+(x-6)+' 28 L'+(x+8)+' 35 L'+(x-6)+' 42 Z" fill="'+c+'" opacity="'+(gone?.5:1)+'"/>'+
         '<text x="'+x+'" y="'+(f%K===0?14:86)+'" text-anchor="middle" font-size="11" fill="#6f6886" font-weight="'+(f%K===0?800:400)+'">'+(f%K===0||f===pile||f===N?f:'')+'</text>'; }
    if(showLines)lines.forEach(function(m){var x=X0+m*W; s+='<line x1="'+x+'" y1="18" x2="'+x+'" y2="80" stroke="#b6791f" stroke-width="2" stroke-dasharray="4 3"/>';});
    return s+'</svg>';
  }
  function render(){
    var atEnd=step>=S, st=atEnd?null:steps[step];
    box.innerHTML=svg(st,atEnd);
    root.querySelector('.sround').innerHTML=atEnd?'<b>Done</b>':'<b>Step '+(step+1)+' of '+S+'</b>';
    root.querySelector('.sleft').innerHTML='Flags left for you: <b>'+pile+'</b>';
    msg.className='msg'+(atEnd?' good':(st.k==='try'?(st.good?' good':' bad'):''));
    msg.innerHTML=atEnd?cfg.finalMsg:st.text;
    bk.disabled=step===0; nx.disabled=atEnd; nx.innerHTML=step===S-1?'Finish &rarr;':'Next &rarr;';
  }
  nx.onclick=function(){if(step<S){step++;render();}};
  bk.onclick=function(){if(step>0){step--;render();}};
  render();
  root.result={win:win,pile:pile};
  return root;
}
