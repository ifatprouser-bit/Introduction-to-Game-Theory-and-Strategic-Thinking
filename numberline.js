// ---- Number-line stepper for 2/3-average (beauty contest) questions ----
// buildNumberLineStepper({groups:[{kind:'range',lo,hi,share,name}|{kind:'point',value,share,name}|{kind:'reply',of:i,share,name}],
//   expect:28, traps:[{opt:'42',at:'crowd'|'group:i'|'twoThirdsGroup:i'|'halfGroup:i'|'twice'|number, text}], finalMsg:'html'})
// Steps: one per group (band or spike + its average), combine into the crowd average, take two-thirds once, round, then the traps.
// Trap: short = line on the traps step, text = full note in the final summary. share = fraction of the crowd (equal shares give a plain average). 'reply' = two-thirds of group i's average, rounded.
// Every number is computed here; it throws if the rounded target is not cfg.expect, or a trap sits more than 1.5 from its option.
function buildNumberLineStepper(cfg){
  function fmt(x){var r=Math.round(x*100)/100;return String(r);}
  var G=cfg.groups.map(function(g){return Object.assign({},g);});
  G.forEach(function(g,i){
    if(g.kind==='range'){g.avg=(g.lo+g.hi)/2;}
    else if(g.kind==='point'){g.avg=g.value;}
    else if(g.kind==='reply'){g.raw=(2/3)*G[g.of].avg; g.avg=Math.round(g.raw);}
    if(g.share===undefined) g.share=1/G.length;
  });
  var tot=G.reduce(function(s,g){return s+g.share;},0);
  if(Math.abs(tot-1)>1e-9) throw new Error('numberline: shares must add to 1');
  var crowd=G.reduce(function(s,g){return s+g.share*g.avg;},0);
  var target=(2/3)*crowd, answer=Math.round(target);
  if(cfg.expect!==undefined&&answer!==cfg.expect) throw new Error('numberline: got '+answer+' expected '+cfg.expect);
  var traps=(cfg.traps||[]).map(function(t){
    var a=t.at, v;
    if(typeof a==='number') v=a;
    else if(a==='crowd') v=crowd;
    else if(a==='twice') v=(2/3)*answer;
    else { var m=a.split(':'), g=G[+m[1]];
      v=m[0]==='group'?g.avg:m[0]==='twoThirdsGroup'?(2/3)*g.avg:m[0]==='halfGroup'?g.avg/2:NaN; }
    if(!(Math.abs(v-parseFloat(t.opt))<=1.5)) throw new Error('numberline: trap '+t.opt+' computed '+v);
    return {opt:t.opt,v:v,text:t.text,short:t.short||t.text};
  });
  var equal=G.every(function(g){return Math.abs(g.share-G[0].share)<1e-9;});
  var ord=['first','second','third','fourth'];
  var VW=560; function X(v){return 30+(v-1)*((VW-60)/99);}
  // ---- build the step list ----
  var steps=[];
  G.forEach(function(g,i){
    var who=(G.length===1?'The whole crowd':'Group '+(i+1)+(g.name?' ('+g.name+')':''));
    var t;
    if(g.kind==='range') t='<b>'+who+'</b> picks evenly from <b>'+g.lo+' to '+g.hi+'</b>. The shaded band shows it.<br>The middle of an even spread is (smallest + largest) &divide; 2 = ('+g.lo+' + '+g.hi+') &divide; 2 = <b>'+fmt(g.avg)+'</b>.'+(g.lo!==1||g.hi!==100?'<br><span style="color:var(--muted)">Read the two ends they gave you, not the ends of the scale.</span>':'');
    else if(g.kind==='point') t='<b>'+who+'</b> all choose <b>'+g.value+'</b>. Everyone on one spot, so their average is just <b>'+g.value+'</b>.';
    else t='<b>'+who+'</b> best-replies to group '+(g.of+1)+'. A best reply is two-thirds of the average you face.<br>(2/3) &times; '+fmt(G[g.of].avg)+' = '+fmt(g.raw)+' &rarr; as a whole number <b>'+g.avg+'</b>. They all stand on that spot.';
    steps.push({k:'g'+i,text:t});
  });
  var ctext;
  if(G.length===1) ctext='<b>The crowd average.</b> There is only one group, so nothing to combine. The crowd sits on average at <b>'+fmt(crowd)+'</b> (red marker).<br><span style="color:var(--muted)">This is not the answer yet. Stopping here is the most common lost mark.</span>';
  else if(equal) ctext='<b>Combine first.</b> The '+(G.length===2?'two halves are':'groups are')+' the same size, so a plain average of the group averages is enough:<br>('+G.map(function(g){return fmt(g.avg);}).join(' + ')+') &divide; '+G.length+' = <b>'+fmt(crowd)+'</b>. The red marker is the whole crowd.<br><span style="color:var(--muted)">Not the answer yet. You have not taken two-thirds.</span>';
  else ctext='<b>Combine first.</b> Weight each group by its share:<br>'+G.map(function(g){return fmt(g.share)+' &times; '+fmt(g.avg);}).join(' + ')+' = <b>'+fmt(crowd)+'</b>. The red marker is the whole crowd.';
  steps.push({k:'c',text:ctext});
  steps.push({k:'t',text:'<b>Only now, take two-thirds. Once.</b> The green arrow moves left from the crowd average:<br>(2/3) &times; '+fmt(crowd)+' = <b>'+fmt(target)+'</b>.'});
  steps.push({k:'r',text:'<b>Round.</b> Players choose whole numbers, so take the nearest one: '+fmt(target)+' &rarr; <b>'+answer+'</b>. That is your <b>best reply</b>: the choice that does best against this crowd.'});
  if(traps.length) steps.push({k:'x',text:'<b>Where the wrong options sit.</b> Each amber dot is a half-finished version of the right answer:<br>'+traps.map(function(t){return '<b>'+t.opt+'</b>: '+t.short;}).join('<br>')});
  var N=steps.length;
  var root=document.createElement('div'); root.className='stepper nlstep';
  root.innerHTML='<div class="sbar"><span class="sround"></span></div><div class="svg-wrap" style="margin:6px 0;padding:6px"></div><div class="msg"></div>'+
    '<div class="nav"><button class="bk" type="button">&larr; Back</button><button class="nx" type="button">Next &rarr;</button></div>';
  var box=root.querySelector('.svg-wrap'), msg=root.querySelector('.msg'), bk=root.querySelector('.bk'), nx=root.querySelector('.nx'), step=0;
  var F='font-family="-apple-system,Segoe UI,Arial,sans-serif"';
  function idx(k){for(var i=0;i<N;i++)if(steps[i].k===k)return i;return 99;}
  function svg(s){
    var gy0=24, gh=22, gap=12, rowsH=G.length*(gh+gap), ay=gy0+rowsH+18, cy=ay+30, ty=cy+34, xy=ty+38, H=(traps.length?xy+42:ty+28);
    var narrow=(typeof window!=='undefined'&&window.innerWidth<560); VW=narrow?320:560; var FS=narrow?1.25:1;
    var h='<svg viewBox="0 0 '+VW+' '+H+'" role="img" aria-label="A number line from 1 to 100 with the crowd groups, the crowd average and the two-thirds target." style="max-width:'+VW+'px">';
    function op(k){if(s>=N)return 1;var i=idx(k);return i>s?0:(i===s?1:0.5);}
    // axis
    h+='<line x1="30" y1="'+ay+'" x2="'+(VW-30)+'" y2="'+ay+'" stroke="#c8c2dd" stroke-width="1.5"/>';
    [1,25,50,75,100].forEach(function(v){h+='<line x1="'+X(v)+'" y1="'+ay+'" x2="'+X(v)+'" y2="'+(ay+5)+'" stroke="#c8c2dd"/><text x="'+X(v)+'" y="'+(ay+17)+'" text-anchor="middle" font-size="11" fill="#6f6886" '+F+'>'+v+'</text>';});
    // groups
    G.forEach(function(g,i){
      var o=op('g'+i); if(!o) return; var y=gy0+i*(gh+gap), cur=o===1, col=i%2?'#1f9d63':'#6b4ef0', soft=i%2?'#e4f6ec':'#ece7fd';
      h+='<g opacity="'+o+'">';
      if(g.kind==='range'){
        h+='<rect x="'+X(g.lo)+'" y="'+y+'" width="'+(X(g.hi)-X(g.lo))+'" height="'+gh+'" rx="5" fill="'+soft+'" stroke="'+col+'" stroke-width="'+(cur?2:1)+'"/>';
        h+='<text x="'+(X(g.lo)+6)+'" y="'+(y+15)+'" font-size="11.5" fill="'+col+'" font-weight="700" '+F+'>'+g.lo+'</text><text x="'+(X(g.hi)-6)+'" y="'+(y+15)+'" text-anchor="end" font-size="11.5" fill="'+col+'" font-weight="700" '+F+'>'+g.hi+'</text>';
      } else {
        if(g.kind==='reply'){var fx=X(G[g.of].avg), tx=X(g.avg), ry=y+gh/2;
          var sy=gy0+g.of*(gh+gap)+gh/2;
          h+='<line x1="'+fx+'" y1="'+sy+'" x2="'+(tx+(tx<fx?8:-8))+'" y2="'+ry+'" stroke="'+col+'" stroke-width="1.5" stroke-dasharray="4 3"/>';}
        h+='<rect x="'+(X(g.avg)-6)+'" y="'+y+'" width="12" height="'+gh+'" rx="3" fill="'+col+'"/>';
      }
      h+='<circle cx="'+X(g.avg)+'" cy="'+(y+gh/2)+'" r="'+(cur?5.5:4.5)+'" fill="'+col+'" stroke="#fff" stroke-width="1.5"/>';
      h+='<line x1="'+X(g.avg)+'" y1="'+(y+gh)+'" x2="'+X(g.avg)+'" y2="'+ay+'" stroke="'+col+'" stroke-width="1" stroke-dasharray="3 3"/>';
      var gn=G.length>1?'group '+(i+1)+': ':'', lx=X(g.avg), anchor='middle', lab=gn+'avg '+fmt(g.avg);
      if(g.kind!=='range'){var rt=lx>VW/2; anchor=rt?'end':'start'; lx+=rt?-12:12; lab=gn+(g.kind==='reply'?'best reply ':'all on ')+fmt(g.avg);}
      h+='<text x="'+lx+'" y="'+(g.kind==='range'?y-4:y+15)+'" text-anchor="'+anchor+'" font-size="12" font-weight="700" fill="'+col+'" '+F+'>'+lab+'</text>';
      h+='</g>';
    });
    // crowd average
    var oc=op('c');
    if(oc){h+='<g opacity="'+oc+'"><line x1="'+X(crowd)+'" y1="'+ay+'" x2="'+X(crowd)+'" y2="'+cy+'" stroke="#d2453f" stroke-width="1.5"/><circle cx="'+X(crowd)+'" cy="'+cy+'" r="'+(oc===1?6:5)+'" fill="#d2453f"/>'+
      '<text x="'+(X(crowd)>VW*0.55?X(crowd)-10:X(crowd)+10)+'" y="'+(cy+4)+'" text-anchor="'+(X(crowd)>VW*0.55?'end':'start')+'" font-size="12.5" font-weight="700" fill="#d2453f" '+F+'>crowd average '+fmt(crowd)+'</text></g>';}
    // two-thirds arrow
    var ot=op('t');
    if(ot){var x0=X(crowd), x1=X(target);
      h+='<g opacity="'+ot+'"><line x1="'+x0+'" y1="'+cy+'" x2="'+x0+'" y2="'+ty+'" stroke="#d2453f" stroke-width="1" stroke-dasharray="3 3"/>'+
      '<line x1="'+x0+'" y1="'+ty+'" x2="'+(x1+8)+'" y2="'+ty+'" stroke="#15794a" stroke-width="2.2"/><path d="M'+x1+' '+ty+' L'+(x1+10)+' '+(ty-5)+' L'+(x1+10)+' '+(ty+5)+' Z" fill="#15794a"/>'+
      '<text x="'+((x0+x1)/2)+'" y="'+(ty-7)+'" text-anchor="middle" font-size="12" font-weight="700" fill="#15794a" '+F+'>&#215; 2/3</text>'+
      '<text x="'+(x0+10)+'" y="'+(ty+4)+'" font-size="12.5" font-weight="700" fill="#15794a" '+F+'>target '+fmt(target)+'</text></g>';}
    // rounding
    var orr=op('r');
    if(orr){var xa=X(answer);
      h+='<g opacity="'+orr+'"><line x1="'+xa+'" y1="'+ay+'" x2="'+xa+'" y2="'+ty+'" stroke="#15794a" stroke-width="2"/><circle cx="'+xa+'" cy="'+ty+'" r="'+(orr===1?8:6.5)+'" fill="#15794a"/>'+
      '<text x="'+xa+'" y="'+(ty+4)+'" text-anchor="middle" font-size="10" font-weight="800" fill="#fff" '+F+'>&#10003;</text>'+
      '<text x="'+(xa-12)+'" y="'+(ty+4)+'" text-anchor="end" font-size="13" font-weight="800" fill="#15794a" '+F+'>'+answer+'</text></g>';}
    // traps
    var ox=op('x');
    if(ox&&traps.length){
      var items=traps.map(function(t){return {v:t.v,lab:t.opt,ans:false};}).concat([{v:answer,lab:answer+' &#10003;',ans:true}]).sort(function(a,b){return a.v-b.v;});
      items=items.reduce(function(acc,t){var pv=acc[acc.length-1]; if(pv&&!pv.ans&&!t.ans&&X(t.v)-X(pv.v)<9*FS){pv.lab+=' &middot; '+t.lab;} else acc.push(t); return acc;},[]);
      var lastAt=[-999,-999,-999], LY=[xy-9,xy+20,xy+35];
      h+='<g opacity="'+ox+'"><text x="2" y="'+(xy+4)+'" font-size="11" fill="#8f5c12" font-weight="700" '+F+'>traps</text>';
      items.forEach(function(t){var x=X(t.v), w=(String(t.lab).replace(/&#10003;|&middot;/g,'v').length*7+8)*FS, lv=0;
        while(lv<2&&x-lastAt[lv]<w) lv++; lastAt[lv]=x;
        var col=t.ans?'#15794a':'#8f5c12';
        h+='<circle cx="'+x+'" cy="'+xy+'" r="'+(t.ans?5.5:5)+'" fill="'+(t.ans?'#15794a':'#b6791f')+'"/><text x="'+x+'" y="'+LY[lv]+'" text-anchor="middle" font-size="12" font-weight="'+(t.ans?800:700)+'" fill="'+col+'" '+F+'>'+t.lab+'</text>';});
      h+='</g>';}
    h=h.replace(/font-size="([\d.]+)"/g,function(m,n){return 'font-size="'+(n*FS)+'"';});
    return h+'</svg>';
  }
  function render(){
    var atEnd=step>=N, s=atEnd?N-1:step;
    box.innerHTML=svg(atEnd?N:s);
    root.querySelector('.sround').innerHTML=atEnd?'<b>Done</b>':'<b>Step '+(step+1)+' of '+N+'</b>';
    msg.className='msg'+(atEnd?' good':'');
    msg.innerHTML=atEnd?(cfg.finalMsg||('<b>Best reply: '+answer+'.</b>'))+(traps.length?'<br><br><b>Where each wrong option comes from.</b><br>'+traps.map(function(t){return '<b>'+t.opt+'</b>: '+t.text;}).join('<br>'):''):steps[step].text;
    bk.disabled=step===0; nx.disabled=atEnd; nx.innerHTML=(step===N-1)?'Finish &rarr;':'Next &rarr;';
  }
  nx.onclick=function(){if(step<N){step++;render();}};
  bk.onclick=function(){if(step>0){step--;render();}};
  render();
  root._nl={crowd:crowd,target:target,answer:answer,groups:G,traps:traps};
  return root;
}
if(typeof module!=='undefined') module.exports={buildNumberLineStepper:buildNumberLineStepper};
