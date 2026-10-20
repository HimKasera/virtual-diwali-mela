const $=id=>document.getElementById(id),T=THREE,rnd=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.floor(Math.random()*a.length)];
$('yr').textContent=new Date().getFullYear();
const cv=document.createElement('canvas');document.body.prepend(cv);
const R=new T.WebGLRenderer({canvas:cv,antialias:true,preserveDrawingBuffer:true});let pr=Math.min(devicePixelRatio,1.75);R.setPixelRatio(pr);R.setSize(innerWidth,innerHeight);
const S=new T.Scene();S.background=new T.Color(0x0a1230);S.fog=new T.FogExp2(0x0a1230,.009);
const C=new T.PerspectiveCamera(60,innerWidth/innerHeight,.1,500);
addEventListener('resize',()=>{C.aspect=innerWidth/innerHeight;C.updateProjectionMatrix();R.setSize(innerWidth,innerHeight)});
S.add(new T.HemisphereLight(0x6677bb,0x3a2a1a,1));const moon=new T.DirectionalLight(0x99aadd,.6);moon.position.set(-30,50,20);S.add(moon);
[[0,40],[0,20],[0,0],[0,-30],[32,24],[0,-62],[-30,-92],[30,-92]].forEach(([x,z])=>{const l=new T.PointLight(0xffb060,1.1,45);l.position.set(x,7,z);S.add(l)});
const mc={},mat=(c,e)=>mc[c+'|'+(e||0)]||(mc[c+'|'+(e||0)]=new T.MeshStandardMaterial({color:c,emissive:e?c:0,emissiveIntensity:e||0,roughness:.8}));
const add=(p,g,m,x=0,y=0,z=0)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);p.add(o);return o};
const bx=(p,w,h,d,c,x,y,z,e)=>add(p,new T.BoxGeometry(w,h,d),mat(c,e),x,y,z),cy=(p,a,b,h,c,x,y,z,e,s=14)=>add(p,new T.CylinderGeometry(a,b,h,s),mat(c,e),x,y,z),sp=(p,r,c,x,y,z,e)=>add(p,new T.SphereGeometry(r,10,8),mat(c,e),x,y,z);
function sign(txt,w,h,col='#7a1020',fs=60){const c=document.createElement('canvas');c.width=512;c.height=Math.round(512*h/w);const x=c.getContext('2d');x.fillStyle=col;x.fillRect(0,0,512,c.height);x.strokeStyle='#e8b84a';x.lineWidth=8;x.strokeRect(5,5,502,c.height-10);x.fillStyle='#ffe9b0';x.textAlign='center';x.textBaseline='middle';const L=txt.split('\n');x.font='bold '+Math.min(fs,c.height/(L.length+.6))+'px sans-serif';L.forEach((l,i)=>x.fillText(l,256,c.height/2+(i-(L.length-1)/2)*Math.min(fs,c.height/(L.length+.6))*1.1,490));return new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:new T.CanvasTexture(c)}))}
const flat=(x,z,w,d,c,r)=>{const m=new T.Mesh(r?new T.CircleGeometry(r,32):new T.PlaneGeometry(w,d),mat(c));m.rotation.x=-Math.PI/2;m.position.set(x,.02,z);S.add(m)};
const gr=new T.Mesh(new T.PlaneGeometry(300,320),mat(0x2b2018));gr.rotation.x=-Math.PI/2;gr.position.z=-40;S.add(gr);
flat(0,5,14,100,0x5a4030);flat(0,-80,120,70,0x3d2b1e);flat(32,24,0,0,0x6a5038,12);flat(0,-28,20,10,0x6a2030);flat(-24,10,0,0,0x7a3a50,5);flat(30,-12,0,0,0x2c4a2c,10);
{const p=[];for(let i=0;i<500;i++)p.push(rnd(-150,150),rnd(30,140),rnd(-160,40));const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));S.add(new T.Points(g,new T.PointsMaterial({color:0xffffff,size:.8,fog:false})))}
const col=[],solid=(x,z,r)=>col.push({x,z,r}),pois=[],bulbs=[],PAL=[0xffc060,0xff6040,0xffe080,0x60d0ff,0xff80c0,0x90ff90];
const bulb=(x,y,z,c)=>bulbs.push([x,y,z,c||pick(PAL)]);
function npcBody(g,c){
  const torso=new T.Group();
  torso.position.y=.5;
  g.add(torso);
  g.userData.torso=torso;
  cy(torso,.28,.34,1,c,0,0,0);
  [-1,1].forEach(side=>{
    const sleeve=cy(torso,.075,.095,.66,c,side*.36,0,.02);
    sleeve.rotation.z=side*.14;
    sp(torso,.105,0xe0b08a,side*.42,-.34,.06);
  });
  const legs=[];
  [-1,1].forEach(side=>{
    const leg=new T.Group();
    leg.position.set(side*.14,.5,0);
    cy(leg,.085,.075,.48,0x28334a,0,-.24,0);
    bx(leg,.16,.07,.25,0x452718,0,-.465,.055);
    g.add(leg);
    legs.push(leg);
  });
  g.userData.legGroups=legs;
  sp(g,.22,0xe0b08a,0,1.25,0);
  cy(g,.23,.23,.1,pick([0xffffff,0xaa2020,0xf0b020]),0,1.42,0);

  const eyes=[];
  [-1,1].forEach(side=>{
    const eye=new T.Group();
    eye.position.set(side*.072,1.285,.198);

    const white=sp(eye,.035,0xfff8ed,0,0,0);
    white.scale.set(1.05,.76,.45);
    const iris=sp(eye,.017,0x5d3525,0,0,.011);
    iris.scale.set(1,.95,.5);
    const pupil=sp(eye,.009,0x101015,0,0,.019);
    pupil.scale.set(1,1,.6);
    sp(eye,.004,0xffffff,-.004,.006,.024);
    eye.userData.gazeParts=[
      {mesh:iris,x:0},
      {mesh:pupil,x:0},
      {mesh:eye.children[3],x:-.004}
    ];
    g.add(eye);
    eyes.push(eye);

    const brow=bx(g,.07,.012,.012,0x4b2b1d,side*.072,1.335,.19);
    brow.rotation.z=side*.1;
  });
  const mouth=sp(g,.042,0x401411,0,1.17,.207);
  mouth.scale.set(1,.55,.28);
  g.userData.mouth=mouth;
  g.userData.eyeGroups=eyes;
}
const walkers=[],npcs=[],NAMES=['Sharma ji','Guddu','Pinky aunty','Himanshu Kasera','Munna','Bunty','Neha','Chintu','Dadi ji','Rahul bhaiya','Simran','Tau ji'];
const GEN=["भाई साहब, पूरा मेला घूमोगे या सिर्फ रील बनाकर जाओगे? 😂","मैडम, झूला देख लो! डर लगे तो चिल्लाना फ्री है!","बच्चे खिलौने माँग रहे हैं और पापा बजट देख रहे हैं! 😂","दीवाली है भाई, थोड़ी मिठाई और थोड़ी मस्ती तो बनती है!","QR से शगुन भी चलता है, लेकिन मुस्कान बिल्कुल फ्री है! ❤️","भैया, गोलगप्पे खाओगे या सिर्फ फोटो खींचोगे?","Happy Diwali! Pataakhe dhyaan se, hasi dil khol ke! 🪔"];
function mkNPC(x,z,rot,name,lines,c,walk){const g=new T.Group();g.position.set(x,0,z);g.rotation.y=rot;npcBody(g,c||pick([0xd04030,0x3080c0,0x30a060,0xe0a020,0x9050c0,0xe06090]));S.add(g);const n={g,name,lines:lines||GEN,ph:Math.random()*6,walk,talkTimer:rnd(.8,5),talking:false};npcs.push(n);if(walk){n.tx=x;n.tz=z;n.wait=rnd(0,3);walkers.push(n)}return n}
function mkPolice(route,number){
  const officer=mkNPC(route[0][0],route[0][1],0,'Police Officer '+String(number).padStart(2,'0'),['Namaste! Mela mein aapka swagat hai.','Kripya rides ke paas line banayein.'],0xb5a16b,true);
  const torso=officer.g.userData.torso;
  officer.isPolice=true;
  officer.patrolPoints=route.map(([x,z])=>({x,z}));
  officer.patrolIndex=1%officer.patrolPoints.length;
  officer.wait=rnd(.2,1);
  cy(torso,.31,.31,.085,0x342d25,0,.07,0,0,16);
  bx(torso,.105,.075,.035,0xe0b856,0,.07,.3);
  [-1,1].forEach(side=>{
    bx(torso,.11,.14,.025,0x92865d,side*.14,.3,.28);
    bx(torso,.13,.055,.15,0x66583a,side*.21,.48,0);
  });
  cy(officer.g,.18,.18,.09,0x5e5035,0,1.46,0,0,16);
  bx(officer.g,.34,.025,.25,0x5e5035,0,1.435,.055);
  sp(officer.g,.035,0xe0b856,0,1.46,.17);
  return officer;
}
function aframe(g,H,z,c=0x884422){[-1,1].forEach(s=>{const m=bx(g,.4,H+.5,.4,c,s*1.6,H/2,z);m.rotation.z=s*.27})}
// ===== entrance
{const g=new T.Group();g.position.z=50;S.add(g);bx(g,2,7.6,2,0x8a1020,-9,3.8,0);bx(g,2,7.6,2,0x8a1020,9,3.8,0);bx(g,22,1.8,2.4,0x8a1020,0,7.4,0);bx(g,22.4,.4,2.6,0xe8b84a,0,8.3,0,.5);
const s=sign('दिव्य दीपोत्सव मेला',14,2.6,'#6a0c1c',96);s.position.set(0,6.9,1.3);g.add(s);const s2=sign('स्वागत है जी! मेला घूमो, मिठाई खाओ, खुशियाँ बाँटो!',11,2.2,'#12304a',52);s2.position.set(-14,3,1.3);s2.rotation.y=.3;g.add(s2);const s3=sign('जेब संभालकर चलें — मेले में दिल और पैसे दोनों खर्च होते हैं! 😂',11,2.2,'#12304a',48);s3.position.set(14,3,1.3);s3.rotation.y=-.3;g.add(s3);
for(let i=0;i<20;i++){const x=-10+i;sp(g,.4,i%2?0xff8a00:0xffc020,x,7.8,1.4,.4);bulb(x+0,8.9,50)}
for(let i=0;i<14;i++)bulb(-9+i*1.4,6.1+Math.sin(i/13*Math.PI)*.8,51.5)}
mkNPC(-4,0,0,'Swagat Uncle',["स्वागत है जी! मेला घूमो, मिठाई खाओ, खुशियाँ बाँटो!","जेब संभालकर चलें — दिल और पैसे दोनों खर्च होते हैं! 😂"]).g.position.set(-4,0,46);
mkNPC(4,46,0,'Swagat Aunty',["Aao aao! Pehle jhoola, phir jalebi, phir selfie! 🪔",GEN[3]]);
// ===== poles, bulbs, diyas
for(let z=44;z>=-30;z-=9){[-7.5,7.5].forEach(x=>{cy(S,.12,.15,6.5,0x6a4a2a,x,3.25,z);solid(x,z,.4)});for(let i=0;i<=16;i++){const t=i/16;bulb(-7.5+15*t,6.4-Math.sin(t*Math.PI)*1.2,z)}if(z>-30)[-7.5,7.5].forEach(x=>{for(let i=1;i<6;i++)bulb(x,6.4-Math.sin(i/6*Math.PI)*.8,z-9*i/6)})}
for(let z=46;z>-34;z-=3){bulb(-6.4,.25,z,0xffa020);bulb(6.4,.25,z,0xffa020)}
// ===== stalls
function counterStall(x,z,color,title,sub){const g=new T.Group();g.position.set(x,0,z);g.rotation.y=x<0?Math.PI/2:-Math.PI/2;S.add(g);bx(g,4,1,1.6,0x5a3a20,0,.5,.4);[-1.9,1.9].forEach(px=>[-.7,1.3].forEach(pz=>bx(g,.15,3.2,.15,0x5a3a20,px,1.6,pz)));
for(let i=0;i<6;i++){const m=bx(g,.67,.08,2.8,i%2?0xfff0d0:color,-1.67+i*.67,3.2,.3);m.rotation.x=.18}bx(g,4,2,.1,0x3a2214,0,1.5,-.8);
const s=sign(title,3.6,sub?1.1:.8,'#5a1020',48);s.position.set(0,3.9,1.4);g.add(s);g.updateMatrixWorld();for(let i=0;i<7;i++){const v=new T.Vector3(-1.9+i*.63,3,1.6);g.localToWorld(v);bulb(v.x,v.y,v.z)}
solid(x,z,2.1);const o=new T.Object3D();o.position.set(x,0,z);S.add(o);const sl=new T.Vector3(0,0,-.2);g.localToWorld(sl);const n=mkNPC(sl.x,sl.z,g.rotation.y,title.split('\n')[0]+' wale',GEN,color);return{g:o,n}}
const FOODS=[['Golgappe','गोलगप्पे','🥟',0xe8a020],['Chaat','चाट','🥗',0xd05030],['Aloo Tikki','आलू टिक्की','🥔',0xc08030],['Chole Bhature','छोले भटूरे','🍛',0xb04020],['Samosa','समोसा','🔺',0xd09030],['Jalebi','जलेबी','🍥',0xff8a00],['Gulab Jamun','गुलाब जामुन','🟤',0x7a2030],['Ladoo','लड्डू','🟠',0xf0a020],['Kaju Katli','काजू कतली','💎',0x40a080],['Rabri','रबड़ी','🥛',0xe0c090],['Kulfi','कुल्फी','🍦',0x30a0c0],['Chai','चाय','🍵',0x805030],['Pakode','पकोड़े','🧆',0xc08020],['Momos','मोमोज','🥟',0xc03060],['Chole Kulche','छोले कुल्चे','🫓',0x906030]];
const FL=["भैया, गोलगप्पे खाने आए हो या सिर्फ फूड ब्लॉग बनाने?","जलेबी गरम है, दिल नरम है, और डाइट कल से शुरू है! 😂","दीवाली है भाई, थोड़ी मिठाई और थोड़ी मस्ती तो बनती है!","एक प्लेट और लो, कैलोरी मेले में गिनी नहीं जातीं! 😋"];
FOODS.forEach((f,i)=>{const s=counterStall(-9.5,38-4.5*i,f[3],f[1]+'\n'+f[0]);pois.push({g:s.g,r:4.5,label:'ORDER '+f[0].toUpperCase(),act:()=>foodP(f)})});
const FIRE=[['phuljhari','🎇','Phuljhari','Handheld sparkler'],['anaar','⛲','Anaar','Colour fountain'],['chakri','🌀','Chakri','Ground spinner'],['rocket','🚀','Rocket','Launch + aerial burst'],['sutli','💥','Sutli Bomb','Harmless flash & pop'],['skyshots','🎆','Sky Shots','Multiple aerial bursts'],['combo','🪔','Diwali Combo','Full virtual display']];
const TOYS=[['🚗','Toy Car'],['🧸','Teddy Bear'],['🚂','Toy Train'],['🪀','Spinning Top'],['🎈','Balloons'],['🪈','Toy Flute'],['⚔️','Foam Sword'],['🤖','Wind-up Toy'],['🥁','Toy Drum'],['💡','LED Toy'],['🪆','Wooden Toy'],['🎡','Mini Ferris Wheel'],['🫧','Bubble Toy'],['🎁','Diwali Gift Pack']];
const DECO=['🪔|Decorative Diya','🏮|LED Lantern','🌸|Rangoli Design','🌼|Marigold Garland','🎏|Toran','🏮|Paper Lantern','🕯️|Decorative Candle','🎁|Diwali Gift Box','👗|Festive Outfit','💡|Decor Lights','🛕|Pooja Accessories','🏺|Colorful Handicraft'].map(s=>s.split('|'));
function addBalloonBunch(n){
  const bunch=new T.Group();
  bunch.position.set(.42,.14,.08);
  n.g.add(bunch);
  [0xff4050,0xffd040,0x40c0ff].forEach((color,i)=>{
    const offset=(i-1)*.24,y=i==1?1.12:.94;
    const string=new T.BufferGeometry().setFromPoints([
      new T.Vector3(0,0,0),
      new T.Vector3(offset*.35,.35,0),
      new T.Vector3(offset,y-.22,0)
    ]);
    bunch.add(new T.Line(string,new T.LineBasicMaterial({color:0xffe8bf})));
    const balloon=sp(bunch,.19,color,offset,y,0,.12);
    balloon.scale.set(.8,1.05,.8);
    sp(bunch,.035,0xffffff,offset-.045,y+.055,.14);
  });
}
{let s=counterStall(9.5,36,0x30b0e0,'खिलौनों की दुकान\nTOYS SHOP',1);for(let i=0;i<4;i++){const b=sp(S,.45,[0xff4060,0xffd040,0x40c0ff,0x60e060][i],9+(i%2)*1.2,4.2+i*.3,38.5-i*1.1,.3);cy(S,.01,.01,3,0xffffff,b.position.x,2.7,b.position.z)}pois.push({g:s.g,r:5,label:'BROWSE TOYS SHOP',act:()=>toyP()});
addBalloonBunch(s.n);
pois.push({g:s.n.g,r:2.5,label:'TAKE A BALLOON',act:()=>{addInv('toy:Balloons','Balloons','🎈');hold('🎈');toast('You got a balloon from the mela!')}});
s=counterStall(9.5,30,0xe03020,'पटाखों की दुकान\nFIRECRACKER SHOP',1);pois.push({g:s.g,r:5,label:'FIRECRACKER SHOP',act:()=>fireP()});
[['दीया बाज़ार',[0,6],0xff9a20],['लालटेन & लाइट्स',[1,5,9],0x30b0c0],['रंगोली & तोरण',[2,3,4],0xe04080],['पूजा & गिफ्ट',[7,10],0x9050d0],['हस्तशिल्प & कपड़े',[8,11],0x40a050]].forEach((d,i)=>{const s=counterStall(9.5,24-4.5*i,d[2],d[0]);pois.push({g:s.g,r:5,label:'BROWSE '+d[0],act:()=>decoP(d)})})}
// ===== celebration, selfie, garden, stage
const celeb=new T.Object3D();celeb.position.set(32,0,24);S.add(celeb);{const s=sign('आतिशबाज़ी बाग़\nFIREWORKS GARDEN',7,1.6,'#12304a',50);s.position.set(32,3.5,13);S.add(s);cy(S,.1,.1,3.5,0x886644,32,1.75,13);for(let i=0;i<16;i++){const a=i/16*6.283;bulb(32+Math.cos(a)*11.5,.4,24+Math.sin(a)*11.5,0xffa030)}}
pois.push({g:celeb,r:11,label:()=>sel&&inv['f:'+sel]?.n?'LIGHT '+FIRE.find(f=>f[0]==sel)[2].toUpperCase()+' (×'+inv['f:'+sel].n+')':'LAUNCH FIREWORKS (take firecrackers from the shop!)',act:()=>sel&&inv['f:'+sel]?.n?useItem(sel):skyShow(4)});
{const s=sign('📸 SELFIE SPOT',5,1,'#6a0c1c',50);s.position.set(-24,4.5,10);S.add(s);bx(S,.4,4,.4,0xe8b84a,-26.5,2,10,.4);bx(S,.4,4,.4,0xe8b84a,-21.5,2,10,.4);bx(S,5.4,.5,.4,0xe8b84a,-24,4,10,.4);solid(-26.5,10,.6);solid(-21.5,10,.6);
const n=mkNPC(-24,13,Math.PI,'Photographer',["Smile! Teen, do, ek... aur selfie ready! 📸","Ek pose hero wala, ek pose family wala! 😂"]);pois.push({g:n.g,r:3.5,label:'TALK TO PHOTOGRAPHER (P = PHOTO MODE)',act:()=>talk(n)})}
{const s=sign('QUIET GARDEN शांत बाग़',6,1,'#1c4a2c',44);s.position.set(30,3,-4);S.add(s);for(let i=0;i<3;i++){bx(S,3,.5,.8,0x6a4a2a,26+i*4,.5,-12);bulb(26+i*4,2,-14,0xffa040)}}
{const g=new T.Group();g.position.set(0,0,-36);S.add(g);bx(g,20,1.2,9,0x6a1020,0,.6,0);bx(g,20,.2,9,0xe8b84a,0,1.25,0,.3);bx(g,.8,9,.8,0xe8b84a,-10,4.5,-3.5,.2);bx(g,.8,9,.8,0xe8b84a,10,4.5,-3.5,.2);bx(g,21,1,1,0xe8b84a,0,9,-3.5,.3);bx(g,20,8,.4,0x4a0c18,0,5,-4.2);[-7,7].forEach(x=>bx(g,2.4,7,.5,0x8a1020,x,4.6,-3.6));
const s=sign('दीवाली मेला मंच\nDIWALI STAGE',12,2.4,'#5a0c1c',70);s.position.set(0,7.2,-3.4);g.add(s);for(let i=0;i<9;i++)bulb(-8+i*2,8.3,-2.5);
for(let i=0;i<4;i++){const d=mkNPC(-4.5+i*3,-36,0,'Dancer',["Naach le! Mela hai, sharam kaisi? 💃","Diwali hai, tu bhi thoda thirak le! 😂"],[0xff3080,0xffb020,0x30c0ff,0x80e040][i]);d.g.position.y=1.2;d.dance=1}
for(let r=0;r<3;r++)for(let i=0;i<4;i++)bx(S,2.5,.5,.8,0x6a4a2a,-5+i*3.4,.3,-28+r*1.8);solid(0,-36,10)}
const stageP=new T.Object3D();stageP.position.set(0,0,-28);S.add(stageP);
pois.push({g:stageP,r:9,label:'WATCH THE PERFORMANCE',act:()=>panel('🎭 Diwali Stage',`<p>"Aur ab, aapke saamne… poora mela!" 🪔</p><small>Festive welcome show: dancers on stage, fireworks above.</small><div class="acts"><button data-a="show">🎆 Start fireworks show</button><button data-a="close">Enjoy</button></div>`,a=>{if(a=='show')skyShow(6)})});
// ===== trees & crowd
{const N=70,tr=new T.InstancedMesh(new T.CylinderGeometry(.3,.4,3,6),mat(0x4a3020),N),cn=new T.InstancedMesh(new T.ConeGeometry(2.2,5,7),mat(0x1c4a30),N),m=new T.Matrix4();for(let i=0;i<N;i++){let x,z;if(i<24){x=i%2?-62:62;z=45-i*7}else if(i<48){x=-58+(i-24)*4.9;z=-112}else{x=pick([-1,1])*rnd(22,60);z=rnd(-20,40);if(Math.abs(x)<20||(x>14&&z>3&&z<40)){x=-x*1.6}}if(Math.abs(x)<12&&z>-35)x+=x<0?-14:14;m.setPosition(x,1.5,z);tr.setMatrixAt(i,m);m.setPosition(x,5,z);cn.setMatrixAt(i,m);if(x>-30&&x<30&&x>14)solid(x,z,.5)}S.add(tr,cn)}
for(let i=0;i<34;i++)mkNPC(rnd(-6,6),rnd(-20,44),0,pick(NAMES),null,null,true);
for(let i=0;i<8;i++)mkNPC(rnd(-45,45),rnd(-58,-50),0,pick(NAMES),null,null,true);
[[[-3,44],[-3,37]],[[3,44],[3,37]],[[-5.5,35],[-5.5,22]],[[-5.5,18],[-5.5,5]],[[-5.5,1],[-5.5,-15]],[[5.5,32],[5.5,20]],[[5.5,17],[5.5,5]],[[5.5,1],[5.5,-12]],[[-53,-47],[-53,-57]],[[53,-47],[53,-57]]].forEach((route,index)=>mkPolice(route,index+1));
// ===== rides
const RIDES=[];
function swing(H,amp,body,dragon){return g=>{aframe(g,H,-3);aframe(g,H,3);const p=new T.Group();p.position.y=H;g.add(p);bx(p,.4,.4,7,0xcccccc,0,0,0);bx(p,.2,H*.7,.2,0xbbbbbb,0,-H*.35,-1.3);bx(p,.2,H*.7,.2,0xbbbbbb,0,-H*.35,1.3);const y=-H*.75;bx(p,9,1.2,3.2,body,0,y,0);bx(p,1.2,1.4,3.2,0xffc040,4.6,y+.6,0,.4);bx(p,1.2,1.4,3.2,0xffc040,-4.6,y+.6,0,.4);bx(p,.15,3.5,.15,0x553322,0,y+2,0);cy(p,0,1.4,3,0xfff0d0,0,y+2.4,0);if(dragon){sp(p,1.1,0x30c060,5.2,y+1.5,0,.3);bx(p,.3,1,.3,0xffd040,5.4,y+2.6,.5,.5);bx(p,.3,1,.3,0xffd040,5.4,y+2.6,-.5,.5)}const seat=new T.Object3D();seat.position.set(0,y+1.4,0);seat.rotation.y=-Math.PI/2;p.add(seat);return{seat,u:t=>{p.rotation.z=Math.sin(t*1.1)*amp}}}}
const seatMesh=(p,c,x,y,z)=>{bx(p,1,.5,.9,c,x,y,z);bx(p,1,.8,.15,c,x,y+.5,z-.4)};
RIDES.push(['Giant Wheel','Bada Jhoola',"Upar se poora mela dikhega — selfie mat girana! 😂",g=>{const H=11,Rr=9,w=new T.Group();w.position.y=H;g.add(w);add(w,new T.TorusGeometry(Rr,.2,6,40),mat(0xffc040,1.2));add(w,new T.TorusGeometry(Rr*.5,.15,6,32),mat(0xff5030,1));for(let i=0;i<8;i++)bx(w,Rr*2,.15,.15,0xcccccc,0,0,0).rotation.z=i*Math.PI/8;aframe(g,H,-1.6);aframe(g,H,1.6);const gs=[];for(let i=0;i<12;i++){const c=new T.Group();g.add(c);bx(c,1.8,1.2,1.6,[0xe03030,0x30a0d0,0xf0b030,0x40b050][i%4],0,-.6,0);bx(c,2,.15,1.8,0xffffff,0,.1,0);gs.push(c)}const seat=new T.Object3D();seat.position.y=-.2;seat.rotation.y=Math.PI;gs[0].add(seat);return{seat,u:t=>{w.rotation.z=t*.22;gs.forEach((c,i)=>{const a=t*.22+i*Math.PI/6;c.position.set(Math.cos(a)*Rr,H+Math.sin(a)*Rr-1.2,0)})}}}]);
RIDES.push(['Columbus Pirate Ship','Samundari Jhoola',"Kashti taiyaar hai! Ek mazedaar aage-peeche ka jhoola? 😂",swing(11,.9,0x8a3a20)]);
RIDES.push(['Tora Tora','Chakkar Pe Chakkar',"Sar ghoome, dil jhoome — Tora Tora! 🌀",g=>{cy(g,.8,1.2,2,0x884422,0,1,0);const tl=new T.Group();tl.position.y=2.2;tl.rotation.x=.35;g.add(tl);const d=new T.Group();tl.add(d);cy(d,6,6,.4,0xe03070,0,0,0,.4,32);cy(d,2,2,.5,0xffc040,0,.2,0,1);let seat;for(let i=0;i<10;i++){const a=i/10*6.283,s=new T.Group();s.position.set(Math.cos(a)*4.6,.5,Math.sin(a)*4.6);s.rotation.y=-a;d.add(s);seatMesh(s,0x30c0d0,0,.3,0);if(!i){seat=new T.Object3D();seat.position.y=.9;seat.rotation.y=Math.PI/2;s.add(seat)}}return{seat,u:t=>{d.rotation.y=t*1.2;tl.rotation.x=.35+.08*Math.sin(t*.7)}}}]);
RIDES.push(['Break Dance','Naach Meri Jaan',"Disco jhoola — thoda hilna padega! 💃",g=>{cy(g,6,6,.6,0x333366,0,.3,0,.2,32);const pl=new T.Group();pl.position.y=.6;g.add(pl);cy(pl,5.4,5.4,.3,0x7030c0,0,0,0,.5,32);const sb=[];let seat;for(let i=0;i<4;i++){const a=i*1.5708,s=new T.Group();s.position.set(Math.cos(a)*3.2,.3,Math.sin(a)*3.2);pl.add(s);cy(s,1.7,1.7,.2,[0xff4040,0x40d0ff,0xffd040,0x50e050][i],0,0,0,.6);for(let j=0;j<3;j++){const b=j*2.094,c=new T.Group();c.position.set(Math.cos(b),.2,Math.sin(b));c.rotation.y=-b;s.add(c);seatMesh(c,0xffffff,0,.3,0);if(!i&&!j){seat=new T.Object3D();seat.position.y=.9;seat.rotation.y=Math.PI/2;c.add(seat)}}sb.push(s)}return{seat,u:t=>{pl.rotation.y=t*.5;sb.forEach(s=>s.rotation.y=-t*1.7)}}}]);
RIDES.push(['Frisbee','Udta Thaali',"Thaali jaisa ghoomna — chai wala bhi hil jaayega! 🥏",g=>{const H=12;aframe(g,H,-3);aframe(g,H,3);const p=new T.Group();p.position.y=H;g.add(p);bx(p,.4,9,.4,0xdddddd,0,-4.5,0);const d=new T.Group();d.position.y=-9.5;p.add(d);cy(d,3.8,3.8,.4,0x40c0f0,0,0,0,.6,24);let seat;for(let i=0;i<6;i++){const a=i/6*6.283,s=new T.Group();s.position.set(Math.cos(a)*2.9,.3,Math.sin(a)*2.9);s.rotation.y=-a;d.add(s);seatMesh(s,0xffd040,0,.2,0);if(!i){seat=new T.Object3D();seat.position.y=.8;seat.rotation.y=Math.PI/2;s.add(seat)}}return{seat,u:t=>{p.rotation.z=Math.sin(t*.9)*1;d.rotation.y=t*1.5}}}]);
RIDES.push(['Mini Roller Coaster','Rail Gaadi Express',"Seat belt kaso, dil thaam lo! 🎢",g=>{const pts=[];for(let i=0;i<12;i++){const a=i/12*6.283,r=8+3*Math.sin(a*3);pts.push(new T.Vector3(Math.cos(a)*r,2+2.8*(1+Math.sin(a*2.5)),Math.sin(a)*r*.8))}const cv=new T.CatmullRomCurve3(pts,true);add(g,new T.TubeGeometry(cv,120,.15,5,true),mat(0xffd040,.8));for(let i=0;i<24;i++){const p=cv.getPoint(i/24);bx(g,.2,p.y,.2,0x886644,p.x,p.y/2,p.z)}const cars=[0,1,2].map(i=>{const c=new T.Group();g.add(c);bx(c,1.2,.7,1.8,[0xe03030,0x30a0d0,0xf0b030][i],0,.4,0);return c});const seat=new T.Object3D();g.add(seat);return{seat,u:t=>{cars.forEach((c,i)=>{const k=((t*.12-i*.02)%1+1)%1,p=cv.getPoint(k);c.position.copy(p);c.lookAt(cv.getPoint((k+.01)%1))});const k=(t*.12%1+1)%1,p=cv.getPoint(k);seat.position.set(p.x,p.y+1,p.z);seat.lookAt(cv.getPoint((k+.012)%1).add(new T.Vector3(0,1,0)));seat.rotateY(Math.PI)}}}]);
RIDES.push(['Flying Chairs','Udan Khatola',"Hawa mein lehrao, dupatta sambhalo! 🪁",g=>{cy(g,.6,.9,11,0xcc3333,0,5.5,0);const top=new T.Group();top.position.y=11;g.add(top);cy(top,4,4,.4,0xffc040,0,0,0,.8,24);add(top,new T.ConeGeometry(4,2,24),mat(0xe03070),0,1.2,0);const ps=[];let seat;for(let i=0;i<8;i++){const a=i/8*6.283,pv=new T.Group();pv.position.set(Math.cos(a)*3.8,-.2,Math.sin(a)*3.8);pv.rotation.y=-a;top.add(pv);cy(pv,.04,.04,5,0xcccccc,0,-2.5,0);const ch=new T.Group();ch.position.y=-5;pv.add(ch);seatMesh(ch,0x30c0d0,0,0,0);if(!i){seat=new T.Object3D();seat.position.y=.9;seat.rotation.y=-Math.PI/2;ch.add(seat)}ps.push(pv)}return{seat,u:t=>{top.rotation.y=t*.9;const k=.15+.4*(.5+.5*Math.sin(t*.4));ps.forEach(p=>p.rotation.z=k)}}}]);
RIDES.push(['Octopus','Aath Haath Wala Jhoola',"Octopus ke haath, aapke saath! 🐙",g=>{cy(g,1.2,1.6,2,0x884422,0,1,0);const hub=new T.Group();hub.position.y=2.2;g.add(hub);sp(hub,1.6,0xffc040,0,0,0,.6);const ar=[];let seat;for(let i=0;i<6;i++){const a=i/6*6.283,pv=new T.Group();pv.rotation.y=-a;hub.add(pv);bx(pv,6,.3,.3,0xe03070,3,0,0,.3);const pod=new T.Group();pod.position.set(6,-.3,0);pv.add(pod);seatMesh(pod,[0xffd040,0x40d0ff,0x70e070][i%3],0,0,0);if(!i){seat=new T.Object3D();seat.position.y=.9;seat.rotation.y=-Math.PI/2;pod.add(seat)}ar.push(pv)}return{seat,u:t=>{hub.rotation.y=t*.8;ar.forEach((p,i)=>p.rotation.z=.2+.35*Math.sin(t*2+i*1.05))}}}]);
RIDES.push(['Merry-Go-Round','Ghoda Gaadi',"Ghode pe baitho, thoda bachpan jee lo! 🎠",g=>{cy(g,5.6,5.6,.5,0x7a1020,0,.25,0,0,32);const rot=new T.Group();rot.position.y=.5;g.add(rot);cy(rot,.6,.6,5,0xffc040,0,2.5,0,.6);add(rot,new T.ConeGeometry(6,2.5,24),mat(0xff7a20,.2),0,6.2,0);cy(rot,6,6,.3,0xffc040,0,5,0,.8,24);const hs=[];let seat;for(let i=0;i<8;i++){const a=i/8*6.283,h=new T.Group();h.position.set(Math.cos(a)*3.8,1,Math.sin(a)*3.8);h.rotation.y=-a;rot.add(h);cy(h,.04,.04,4,0xffd060,0,2,0,.5);bx(h,.5,.6,1.2,[0xffffff,0xff9050,0x70d0ff,0xff7090][i%4],0,0,0);bx(h,.3,.6,.3,0xffd060,0,.55,.6);hs.push(h);if(!i){seat=new T.Object3D();seat.position.y=1;h.add(seat)}}return{seat,u:t=>{rot.rotation.y=t*.6;hs.forEach((h,i)=>h.position.y=1+.45*Math.sin(t*2.5+i))}}}]);
RIDES.push(['Dragon Swing','Dragon Jhoola',"Dragon ki sawaari — ghabrana nahi, bas chillana! 🐉",swing(12,1.15,0x1c7a3a,1)]);
const rides=RIDES.map((d,i)=>{const x=-44+(i%5)*22,z=i<5?-62:-92,g=new T.Group();g.position.set(x,0,z);S.add(g);const o=d[3](g),s=sign(d[0].toUpperCase(),7,1.2,'#12304a',46);s.position.set(0,3.4,7);g.add(s);bx(g,.2,3.4,.2,0xe8b84a,-3.4,1.7,7);bx(g,.2,3.4,.2,0xe8b84a,3.4,1.7,7);for(let k=0;k<14;k++){const a=k/14*6.283;bulb(x+Math.cos(a)*6.5,.4,z+Math.sin(a)*6.5)}
const pad=new T.Object3D();pad.position.set(x,0,z+9.5);S.add(pad);solid(x,z,5.6);const opn=mkNPC(x+4,z+9,Math.PI,'Ride Operator',["Seat belt? Woh toh dil mein hai! Chalo baitho! 😂","Pehle aap, phir aapka dar! 🎢"]);const r={name:d[0],tag:d[1],line:d[2],g,pad,o,t:rnd(0,20),dur:28};pois.push({g:pad,r:4,label:'RIDE THE '+d[0].toUpperCase(),act:()=>rideInfo(r)});pois.push({g:opn.g,r:2.5,label:'TALK TO OPERATOR',act:()=>talk(opn)});return r});
// ===== bulbs instanced
{const N=bulbs.length,im=new T.InstancedMesh(new T.SphereGeometry(.14,6,5),new T.MeshBasicMaterial({color:0xffffff}),N),m=new T.Matrix4(),c=new T.Color();bulbs.forEach((b,i)=>{m.setPosition(b[0],b[1],b[2]);im.setMatrixAt(i,m);im.setColorAt(i,c.set(b[3]))});S.add(im)}
// ===== fireworks particles
const NP=3000,pp=new Float32Array(NP*3),pcol=new Float32Array(NP*3),pb=new Float32Array(NP*3),pv=new Float32Array(NP*3),pl=new Float32Array(NP);let pi=0;pp.fill(-999);
const pg=new T.BufferGeometry();pg.setAttribute('position',new T.BufferAttribute(pp,3));pg.setAttribute('color',new T.BufferAttribute(pcol,3));
const pts=new T.Points(pg,new T.PointsMaterial({size:.7,vertexColors:true,transparent:true,blending:T.AdditiveBlending,depthWrite:false}));pts.frustumCulled=false;S.add(pts);
const flash=new T.PointLight(0xffd080,0,40);S.add(flash);
let redFw=false,redMo=false;const tc=new T.Color();
function emit(x,y,z,vx,vy,vz,hex,life){const i=pi=(pi+1)%NP;tc.set(hex);pp[i*3]=x;pp[i*3+1]=y;pp[i*3+2]=z;pv[i*3]=vx;pv[i*3+1]=vy;pv[i*3+2]=vz;pb[i*3]=tc.r;pb[i*3+1]=tc.g;pb[i*3+2]=tc.b;pl[i]=life}
function burst(x,y,z,hex,kind='s',n=220){n=Math.round(n*(redFw?.4:1));const h2=pick([0xffd060,0xffffff,0xff6040]);for(let i=0;i<n;i++){let a=rnd(0,6.283),b=Math.acos(rnd(-1,1)),s=rnd(7,11);if(kind=='r'){b=1.5708;s=10}if(kind=='x'){a=Math.floor(i%8)*.785+rnd(-.05,.05);s=rnd(4,12)}emit(x,y,z,Math.cos(a)*Math.sin(b)*s,Math.cos(b)*s,Math.sin(a)*Math.sin(b)*s,i%5?hex:h2,kind=='w'?2.8:rnd(1.4,2.2))}if(!redMo){flash.position.set(x,y,z);flash.intensity=2}}
const rockets=[];function rocket(x,z,ty,hex,kind){rockets.push({x,y:1,z,ty,hex,kind,vy:rnd(24,30)})}
const FX=[],pastel=[0xffc040,0xff4040,0xff8a20,0x40a0ff,0xb050ff,0x50e070,0xff60b0];
function skyShow(n){for(let i=0;i<n;i++)setTimeout(()=>rocket(rnd(-30,50),rnd(-100,10),rnd(38,55),pick(pastel),pick(['s','r','x','w','s'])),i*420)}
function useItem(id){const k='f:'+id;if(!inv[k]?.n)return toast('Bag is empty — pick more at the firecracker shop');inv[k].n--;chipUpd();const fx=Math.sin(P.yaw),fz=Math.cos(P.yaw),ox=P.x+fx*2.6,oz=P.z+fz*2.6;const add=(dur,f)=>FX.push({t:0,dur,f,ox,oz});
if(id=='phuljhari'||id=='combo')add(5,(dt)=>{for(let i=0;i<Math.ceil(dt*140);i++)emit(P.x+Math.sin(P.yaw)*.7,1.2,P.z+Math.cos(P.yaw)*.7,rnd(-2,2),rnd(1,3),rnd(-2,2),pick([0xffe080,0xffffff,0xffa030]),.5)});
if(id=='anaar'||id=='combo')add(4,(dt,t,f)=>{for(let i=0;i<Math.ceil(dt*220);i++)emit(f.ox,.3,f.oz,rnd(-1.6,1.6),rnd(8,12),rnd(-1.6,1.6),pick([0xffa030,0x60ff90,0xff60b0,0xffe060]),1.5)});
if(id=='chakri'||id=='combo')add(4,(dt,t,f)=>{const a=t*14;for(let i=0;i<Math.ceil(dt*160);i++)emit(f.ox+Math.cos(a)*.6,.3,f.oz+Math.sin(a)*.6,-Math.sin(a)*4+rnd(-1,1),rnd(.5,2),Math.cos(a)*4+rnd(-1,1),pick([0xffd060,0xff8040]),.6)});
if(id=='rocket'||id=='combo')rocket(ox,oz,rnd(35,45),pick(pastel),'s');
if(id=='sutli'||id=='combo'){for(let i=0;i<80;i++)emit(ox,.6,oz,rnd(-8,8),rnd(1,8),rnd(-8,8),pick([0xffffff,0xffe080]),.4);if(!redMo)flash.intensity=3,flash.position.set(ox,2,oz)}
if(id=='skyshots'||id=='combo')for(let i=0;i<6;i++)setTimeout(()=>rocket(ox+rnd(-5,5),oz+rnd(-5,5),rnd(30,45),pick(pastel),pick(['s','x','w'])),i*500+(id=='combo'?1500:0))}
// ===== inventory & UI
const inv={};let sel=null,modal=null,lastFocus=null,started=false,holding='';
const toast=m=>{const t=$('toast');t.textContent=m;t.style.display='block';clearTimeout(toast.h);toast.h=setTimeout(()=>t.style.display='none',2200)};
function addInv(k,label,e){(inv[k]=inv[k]||{label,e,n:0}).n++;chipUpd()}
function chipUpd(){const c=$('chip'),f=sel&&inv['f:'+sel],bits=[];if(f)bits.push('🧨 '+f.label+' ×'+f.n);if(holding)bits.push('Holding '+holding);c.style.display=bits.length?'block':'none';c.textContent=bits.join(' • ')}
const spr=new T.Sprite(new T.SpriteMaterial({transparent:true,depthTest:false}));spr.scale.set(1,1,1);spr.position.y=2.5;spr.visible=false;const sc={};
function hold(e){if(!sc[e]){const c=document.createElement('canvas');c.width=c.height=96;const x=c.getContext('2d');x.font='70px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(e,48,52);sc[e]=new T.CanvasTexture(c)}spr.material.map=sc[e];spr.material.needsUpdate=true;spr.visible=true;holding=e;chipUpd()}
const pan=$('panel');let ph=null;
function panel(title,body,h){lastFocus=document.activeElement;modal='panel';ph=h;pan.innerHTML=`<div class="hd"><b>${title}</b><button data-a="close" aria-label="Close">✕</button></div>`+body;pan.style.display='block';pan.querySelector('button')?.focus()}
function closeModal(){if(modal=='gift'){$('gm').style.display='none'}pan.style.display='none';modal=null;ph=null;(lastFocus&&lastFocus.focus)&&lastFocus.focus()}
const hnd=e=>{const a=e.target.closest('[data-a]');if(!a)return;const v=a.dataset.a;if(v=='close')return closeModal();ph&&ph(v,a,e)};pan.addEventListener('click',hnd);pan.addEventListener('input',e=>{const a=e.target.closest('[data-a]');a&&ph&&ph(a.dataset.a,e.target,e)});
const talk=n=>panel('💬 '+n.name,`<p class="big" style="font-size:18px" id="tl">${pick(n.lines)}</p><div class="acts"><button data-a="n">Aur sunao 😂</button><button data-a="close">Bye!</button></div>`,a=>{if(a=='n')$('tl').textContent=pick(n.lines)});
npcs.forEach(n=>{if(n.walk)pois.push({g:n.g,r:2.5,label:'TALK TO '+n.name.toUpperCase(),act:()=>talk(n)})});
const foodP=f=>panel(f[2]+' '+f[1]+' / '+f[0],`<p>${pick(FL)}</p><div class="acts"><button data-a="o">Order ${f[0]} (virtual) 😋</button><button data-a="close">Aage badho</button></div><small>Virtual only — no real orders or delivery.</small>`,a=>{if(a=='o'){addInv('food:'+f[0],f[0],f[2]);toast('Added '+f[2]+' '+f[0]+' to bag')}});
const fireP=()=>panel('🧨 पटाखों की दुकान',`<small>Virtual effects only. Take one, carry it to the Fireworks Garden and press E.</small>`+FIRE.map(f=>`<div class="row"><span class="big">${f[1]}</span><span><b>${f[2]}</b><br><small>${f[3]}</small></span><button data-a="${f[0]}">Take</button></div>`).join('')+`<div class="acts"><button data-a="close">Done</button></div>`,a=>{const f=FIRE.find(x=>x[0]==a);if(f){addInv('f:'+a,f[2],f[1]);sel=a;chipUpd();toast(f[2]+' equipped — go to the Fireworks Garden!')}});
const toyP=()=>panel('🧸 खिलौनों की दुकान',`<small>"बजट छोटा हो सकता है, खुशियाँ नहीं! ❤️"</small>`+TOYS.map((t,i)=>`<div class="row"><span class="big">${t[0]}</span><span>${t[1]}</span><button data-a="${i}">Add & hold</button></div>`).join('')+`<div class="acts"><button data-a="close">Done</button></div>`,a=>{const t=TOYS[a];if(t){addInv('toy:'+t[1],t[1],t[0]);hold(t[0]);toast(t[1]+' added')}});
const decoP=d=>panel(d[0],`<small>Virtual festive items for your bag.</small>`+d[1].map(i=>`<div class="row"><span class="big">${DECO[i][0]}</span><span>${DECO[i][1]}</span><button data-a="${i}">Add</button></div>`).join('')+`<div class="acts"><button data-a="close">Done</button></div>`,a=>{const t=DECO[a];if(t){addInv('d:'+t[1],t[1],t[0]);toast(t[1]+' added')}});
function bagP(){const k=Object.keys(inv).filter(k=>inv[k].n>0);panel('🛍 Your Bag',(k.length?k.map(x=>`<div class="row"><span class="big">${inv[x].e}</span><span>${inv[x].label}</span><b>×${inv[x].n}</b>${x[0]=='f'?`<button data-a="s:${x.slice(2)}">Equip</button>`:''}</div>`).join(''):'<p>Empty — visit the shops!</p>')+`<div class="acts"><button data-a="reset">Reset bag</button><button data-a="close">Close</button></div>`,a=>{if(a=='reset'){for(const k in inv)delete inv[k];sel=null;holding='';spr.visible=false;chipUpd();bagP()}else if(a.startsWith('s:')){sel=a.slice(2);chipUpd();toast('Equipped')}})}
const helpP=()=>panel('❔ Help',`<p>WASD / arrows walk • Shift (or RUN) run • drag to look • Space jump • <b>E</b> interact • M map • P photo • Esc close/menu.<br>Walk to a ride's gate and press E to ride. Take firecrackers at the shop, then light them in the Fireworks Garden (right side). Music: use the radio, bottom-right.</p><div class="acts"><button data-a="close">Got it</button></div>`);
const setP=()=>panel('⚙ Settings',`<label><input type="checkbox" data-a="fw" ${redFw?'checked':''}> Reduced fireworks</label><br><label><input type="checkbox" data-a="mo" ${redMo?'checked':''}> Reduced motion / no flashes</label><br><label><input type="checkbox" data-a="gq" ${pr<1.2?'checked':''}> Low graphics quality</label><br><label>Look sensitivity <input type="range" min="40" max="200" value="${sens*100}" data-a="sn"></label><div class="acts"><button data-a="ret">Return to entrance</button><button data-a="close">Close</button></div><small>Music volume is on the radio player.</small>`,(a,el)=>{if(a=='fw')redFw=el.checked;if(a=='mo')redMo=el.checked;if(a=='gq'){pr=el.checked?1:Math.min(devicePixelRatio,1.75);R.setPixelRatio(pr)}if(a=='sn')sens=el.value/100;if(a=='ret'){P.x=0;P.z=59;P.yaw=Math.PI;closeModal()}});
let sens=1;
// ride flow
let ride=null,rideT=0;const rq=new T.Quaternion(),rv=new T.Vector3();
const rideInfo=r=>panel('🎡 '+r.name,`<p><b>${r.tag}</b></p><p>${r.line}</p><div class="acts"><button data-a="go">Ride Now</button><button data-a="close">Not now</button></div>`,a=>{if(a=='go'){closeModal();ride=r;rideT=0;sprVis(false);$('rideov').style.display='block';$('rn').textContent=r.name.toUpperCase();$('rt').textContent=r.line;$('hint').style.display='none'}});
const sprVis=v=>{av.visible=v};
function endRide(){if(!ride)return;P.x=ride.pad.position.x;P.z=ride.pad.position.z;P.yaw=Math.PI;ride=null;sprVis(true);$('rideov').style.display='none';$('hint').style.display='';toast('Safely back on the ground. Maza aaya? 😄')}
$('endR').onclick=endRide;
// player
const P={x:0,z:59,yaw:Math.PI,pitch:-.08,vy:0,y:0},av=new T.Group();npcBody(av,0xff7a20);S.add(av);av.add(spr);let run=false;const keys={},joy={x:0,y:0};
addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(e.target.tagName=='INPUT'&&k!='escape')return;if(k=='escape'){if(modal)closeModal();else if(document.body.classList.contains('photo'))document.body.classList.remove('photo');else if(ride)endRide();else if(started)setP();return}if(!started||modal)return;if([' ','arrowup','arrowdown','arrowleft','arrowright'].includes(k))e.preventDefault();keys[k]=1;if(k=='e')interact();if(k=='m')mapT();if(k=='p')photo();if(k==' '&&!ride&&P.y==0)P.vy=6});
addEventListener('keyup',e=>{delete keys[e.key.toLowerCase()]});addEventListener('blur',()=>{for(const k in keys)delete keys[k]});
let dr=null;cv.addEventListener('pointerdown',e=>{if(!started||modal)return;dr={id:e.pointerId,x:e.clientX,y:e.clientY};cv.setPointerCapture(e.pointerId)});
cv.addEventListener('pointermove',e=>{if(dr&&e.pointerId==dr.id){P.yaw-=(e.clientX-dr.x)*.005*sens;P.pitch=Math.max(-.65,Math.min(1.1,P.pitch+(e.clientY-dr.y)*.004*sens));dr.x=e.clientX;dr.y=e.clientY}});
['pointerup','pointercancel'].forEach(n=>cv.addEventListener(n,e=>{if(dr&&e.pointerId==dr.id)dr=null}));
const jz=$('joy'),jk=$('knob');let jid=null;function jm(e){const b=jz.getBoundingClientRect();let dx=(e.clientX-b.left-b.width/2)/(b.width/2),dy=(e.clientY-b.top-b.height/2)/(b.height/2);const l=Math.hypot(dx,dy);if(l>1){dx/=l;dy/=l}joy.x=dx;joy.y=-dy;jk.style.transform=`translate(${dx*30}px,${dy*30}px)`}
jz.addEventListener('pointerdown',e=>{jid=e.pointerId;jz.setPointerCapture(e.pointerId);jm(e)});jz.addEventListener('pointermove',e=>{if(e.pointerId==jid)jm(e)});const je=e=>{if(e.pointerId==jid){jid=null;joy.x=joy.y=0;jk.style.transform=''}};jz.addEventListener('pointerup',je);jz.addEventListener('pointercancel',je);
$('runb').onclick=()=>{run=!run;$('runb').style.background=run?'#d9a93f':'';$('runb').style.color=run?'#2a1200':''};$('actb').onclick=()=>interact();$('jumpb').onclick=()=>{if(!ride&&!modal&&P.y==0)P.vy=6};
// zones & interact
let near=null,lastPrompt='';
function interact(){if(!started||modal||ride)return;near&&near.act()}
function zoneName(){const{x,z}=P;if(Math.hypot(x-32,z-24)<13)return'Fireworks Garden';if(z>40)return'Grand Entrance';if(z<-45)return'Amusement Rides Zone';if(z<-24&&Math.abs(x)<14)return'Central Stage & Dance Courtyard';if(Math.hypot(x+24,z-10)<9)return'Selfie Spot';if(x>20&&z<4&&z>-26)return'Quiet Garden';if(x<-8&&z>-30)return'Food & Mithai Bazaar';if(x>8&&z>2)return'Toys, Diya & Shopping Lane';return'Main Mela Street'}
// map
const mp=$('map'),mx=mp.getContext('2d'),mb=document.createElement('canvas');mb.width=mb.height=300;const MX=x=>(x+70)/140*300,MZ=z=>(z+115)/185*300*(1);
{const c=mb.getContext('2d');c.fillStyle='#10202c';c.fillRect(0,0,300,300);c.fillStyle='#5a4030';c.fillRect(MX(-7),MZ(-40),MX(7)-MX(-7),MZ(52)-MZ(-40));c.fillStyle='#3d2b1e';c.fillRect(0,MZ(-110),300,MZ(-48)-MZ(-110));c.font='bold 18px sans-serif';c.fillStyle='#ffd878';c.textAlign='center';[['Entrance',0,52],['Food',-20,18],['Toys/Shops',24,12],['Stage',0,-36],['Rides',0,-76],['🎆 Garden',45,24],['Quiet',45,-10],['Selfie',-30,10]].forEach(([t,x,z])=>c.fillText(t,MX(x),MZ(z)))}
let mapN=0;const mapT=()=>{$('mini').classList.toggle('min');$('mapT').textContent=$('mini').classList.contains('min')?'Map ▸':'Map ▾'};$('mapT').onclick=mapT;
function drawMap(){mx.drawImage(mb,0,0);mx.fillStyle='#ff5030';mx.beginPath();mx.arc(MX(P.x),MZ(P.z),7,0,6.3);mx.fill();mx.strokeStyle='#fff';mx.lineWidth=2;mx.stroke()}
// photo
const photo=()=>{if(modal)return;document.body.classList.toggle('photo')};$('bPh').onclick=photo;$('pex').onclick=()=>document.body.classList.remove('photo');
$('shot').onclick=()=>{try{R.render(S,C);const u=R.domElement.toDataURL('image/png');document.body.classList.remove('photo');panel('📷 Your photo',`<img src="${u}" style="width:100%;border-radius:8px" alt="Captured scene"><small>Right-click or long-press the image to save it.</small><div class="acts"><button data-a="close">Close</button></div>`)}catch(e){toast('Screenshot capture is not supported here')}};
// buttons
$('bBag').onclick=bagP;$('bHelp').onclick=helpP;$('bSet').onclick=setP;$('bFw').onclick=()=>{skyShow(redFw?3:6)};
const gm=$('gm'),gb=$('gift');const openG=()=>{if(modal)return;lastFocus=gb;modal='gift';gm.style.display='flex';$('gx').focus()};gb.onclick=openG;const clG=()=>{gm.style.display='none';modal=null;gb.focus()};$('gx').onclick=clG;$('gc').onclick=clG;gm.addEventListener('click',e=>{if(e.target==gm)clG()});
$('enter').onclick=()=>{started=true;$('welcome').style.display='none';skyShow(3)};
// music
// music
const PL=['6U9XCDHcRJA'],VID=PL[0];
let yt=null,ytv=60,ytMuted=false,ytFail=false;
const ms=$('ms');



/* ===== LOCAL MP3 MUSIC PLAYER ===== a*/

const PLAYLIST = [
  {
    title: "Ram Aayenge",
    src: "./music/RamAayenge.mp3"
  }
];

let currentTrack = 0;
let musicVolume = 60;
let musicMuted = false;

// Reuse the audio element if it already exists; otherwise create it.
let localAudio = document.getElementById("localAudio");

if (!localAudio) {
  localAudio = document.createElement("audio");
  localAudio.id = "localAudio";
  localAudio.preload = "metadata";
  document.body.appendChild(localAudio);
}

localAudio.volume = musicVolume / 100;

const musicStatus = $("ms");
const musicPlayButton = $("mPlay");
const musicProgress = $("prog");

function updateMusicStatus(message) {
  musicStatus.textContent = message;
}

function loadLocalTrack(index) {
  currentTrack = (index + PLAYLIST.length) % PLAYLIST.length;

  const track = PLAYLIST[currentTrack];

  localAudio.src = track.src;
  localAudio.load();

  updateMusicStatus("Ready: " + track.title);
  musicPlayButton.textContent = "▶";
}

async function playLocalMusic() {
  try {
    await localAudio.play();
    musicPlayButton.textContent = "⏸";
    updateMusicStatus("Playing: " + PLAYLIST[currentTrack].title);
  } catch (error) {
    musicPlayButton.textContent = "▶";
    updateMusicStatus(
      "Unable to play audio. Check music/RamAayenge.mp3"
    );
    console.error("Local MP3 playback error:", error);
  }
}

function pauseLocalMusic() {
  localAudio.pause();
  musicPlayButton.textContent = "▶";
  updateMusicStatus("Paused: " + PLAYLIST[currentTrack].title);
}

// Play / Pause
musicPlayButton.onclick = () => {
  if (localAudio.paused) {
    playLocalMusic();
  } else {
    pauseLocalMusic();
  }
};

// Previous track
$("mPrev").onclick = () => {
  loadLocalTrack(currentTrack - 1);
  playLocalMusic();
};

// Next track
$("mNext").onclick = () => {
  loadLocalTrack(currentTrack + 1);
  playLocalMusic();
};

// Volume control
$("mVol").oninput = event => {
  musicVolume = Number(event.target.value);
  localAudio.volume = musicVolume / 100;
};

// Mute / Unmute
function toggleLocalMute() {
  musicMuted = !musicMuted;
  localAudio.muted = musicMuted;

  $("mMute").textContent = musicMuted ? "🔇" : "🔊";
  $("bSnd").textContent = musicMuted ? "🔇" : "🔊";
}

$("mMute").onclick = toggleLocalMute;
$("bSnd").onclick = toggleLocalMute;

// Minimize / Restore music player
$("mMin").onclick = () => {
  $("music").classList.toggle("min");
};

$("bMus").onclick = () => {
  $("music").classList.toggle("min");
};

// Update progress bar
localAudio.addEventListener("timeupdate", () => {
  if (!localAudio.duration || !musicProgress.firstElementChild) {
    return;
  }

  const percent =
    (localAudio.currentTime / localAudio.duration) * 100;

  musicProgress.firstElementChild.style.width = percent + "%";
});

// Track finished
localAudio.addEventListener("ended", () => {
  loadLocalTrack(currentTrack + 1);
  playLocalMusic();
});

// Audio loading errors
localAudio.addEventListener("error", () => {
  musicPlayButton.textContent = "▶";
  updateMusicStatus(
    "Audio unavailable — check ./music/RamAayenge.mp3"
  );
});

// Keep the Play/Pause icon synchronized
localAudio.addEventListener("play", () => {
  musicPlayButton.textContent = "⏸";
});

localAudio.addEventListener("pause", () => {
  musicPlayButton.textContent = "▶";
});

// Load the first track without autoplay
loadLocalTrack(0);


// ===== main loop
const clk=new T.Clock();let tt=0,amb=2,celebSeen=false;
function loop(){requestAnimationFrame(loop);const dt=Math.min(clk.getDelta(),.05);tt+=dt;
walkers.forEach(w=>{
  if(w.patrolPoints){
    if(w.wait>0){w.wait-=dt;return}
    const target=w.patrolPoints[w.patrolIndex],dx=target.x-w.g.position.x,dz=target.z-w.g.position.z,d=Math.hypot(dx,dz);
    if(d<.4){w.patrolIndex=(w.patrolIndex+1)%w.patrolPoints.length;w.wait=rnd(.3,1.2);return}
    w.g.position.x+=dx/d*Math.min(1.1*dt,d);w.g.position.z+=dz/d*Math.min(1.1*dt,d);w.g.rotation.y=Math.atan2(dx,dz);
    return;
  }
  if(w.wait>0){w.wait-=dt;return}const dx=w.tx-w.g.position.x,dz=w.tz-w.g.position.z,d=Math.hypot(dx,dz);if(d<.5){w.wait=rnd(1,5);if(Math.random()<.2){w.tx=rnd(-45,45);w.tz=rnd(-58,-50)}else{w.tx=rnd(-6,6);w.tz=rnd(-24,44)}return}w.g.position.x+=dx/d*1.3*dt;w.g.position.z+=dz/d*1.3*dt;w.g.rotation.y=Math.atan2(dx,dz)
});
npcs.forEach(n=>{
  n.g.children[0].position.y=.5+(n.walk&&n.wait<=0?Math.abs(Math.sin(tt*7+n.ph))*.06:Math.sin(tt*2+n.ph)*.015);
  if(n.dance){n.g.rotation.y=Math.sin(tt*3+n.ph)*.8;n.g.position.y=1.2+Math.abs(Math.sin(tt*5+n.ph))*.15}
  const stride=n.walk&&n.wait<=0?Math.sin(tt*7+n.ph):n.dance?Math.sin(tt*8+n.ph):0;
  (n.g.userData.legGroups||[]).forEach((leg,i)=>{leg.rotation.x=stride*(i===0?.36:-.36)});
  const mouth=n.g.userData.mouth;
  if(mouth){
    if(n.talking){
      n.talkElapsed+=dt;
      mouth.scale.y=.55+Math.abs(Math.sin(n.talkElapsed*17+n.ph))*.75;
      if(n.talkElapsed>=n.talkDuration){n.talking=false;mouth.scale.y=.55;n.talkTimer=rnd(2.5,8)}
    }else{
      n.talkTimer-=dt;
      if(n.talkTimer<=0){n.talking=true;n.talkElapsed=0;n.talkDuration=rnd(.35,.9)}
    }
  }

  // Blink every few seconds and gently shift pupils for a more lively crowd.
  if(n.blinkProgress===undefined){n.blinkProgress=-1;n.blinkTimer=rnd(1.5,4.5)}
  let blink=0;
  if(n.blinkProgress<0){
    n.blinkTimer-=dt;
    if(n.blinkTimer<=0)n.blinkProgress=0;
  }else{
    n.blinkProgress+=dt;
    if(n.blinkProgress>=.18){n.blinkProgress=-1;n.blinkTimer=rnd(2.4,5.5)}
    else blink=Math.sin(Math.PI*n.blinkProgress/.18);
  }
  (n.g.userData.eyeGroups||[]).forEach(eye=>{
    eye.scale.y=1-.88*blink;
    const gaze=Math.sin(tt*.65+n.ph)*.003;
    (eye.userData.gazeParts||[]).forEach(part=>{part.mesh.position.x=part.x+gaze});
  });
});
rides.forEach(r=>{r.t+=dt*(ride==r?1:.3)*(redMo?.6:1);r.o.u(r.t)});
if(ride){rideT+=dt;$('rp').style.width=Math.min(100,rideT/ride.dur*100)+'%';$('rs').textContent=rideT<ride.dur?'Ride running…':'Ride finished';if(rideT>=ride.dur)endRide()}
// particles
for(let i=0;i<NP;i++){if(pl[i]>0){pl[i]-=dt;const j=i*3;pv[j+1]-=5*dt;pv[j]*=.985;pv[j+2]*=.985;pv[j+1]*=.99;pp[j]+=pv[j]*dt;pp[j+1]+=pv[j+1]*dt;pp[j+2]+=pv[j+2]*dt;const f=Math.min(1,pl[i]/.6);pcol[j]=pb[j]*f;pcol[j+1]=pb[j+1]*f;pcol[j+2]=pb[j+2]*f;if(pl[i]<=0)pp[j+1]=-999}}
pg.attributes.position.needsUpdate=true;pg.attributes.color.needsUpdate=true;flash.intensity=Math.max(0,flash.intensity-dt*6);
for(let i=rockets.length-1;i>=0;i--){const r=rockets[i];r.y+=r.vy*dt;for(let k=0;k<3;k++)emit(r.x,r.y,r.z,rnd(-.4,.4),rnd(-2,0),rnd(-.4,.4),0xffc060,.6);if(r.y>=r.ty){burst(r.x,r.y,r.z,r.hex,r.kind,r.kind=='x'?160:240);rockets.splice(i,1)}}
for(let i=FX.length-1;i>=0;i--){const f=FX[i];f.t+=dt;f.f(dt,f.t,f);if(f.t>f.dur)FX.splice(i,1)}
if(started&&!redMo||started&&redMo){amb-=dt;if(amb<0){amb=redFw||redMo?rnd(8,14):rnd(3,6);rocket(rnd(-60,60),rnd(-105,-45),rnd(40,60),pick(pastel),pick(['s','r','x','w']))}}
if(!started){C.position.set(Math.sin(tt*.12)*26,10,66);C.lookAt(0,7,48);R.render(S,C);return}
// player
const inside=ride||modal;let moving=false;
if(!ride){let ix=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0)+joy.x,iy=(keys.w||keys.arrowup?1:0)-(keys.s||keys.arrowdown?1:0)+joy.y;const gp=navigator.getGamepads&&navigator.getGamepads()[0];if(gp){if(Math.abs(gp.axes[0])>.2)ix+=gp.axes[0];if(Math.abs(gp.axes[1])>.2)iy-=gp.axes[1];if(Math.abs(gp.axes[2]||0)>.2)P.yaw-=gp.axes[2]*dt*2.5;if(gp.buttons[2]&&gp.buttons[2].pressed&&!loop.g){loop.g=1;interact()}if(!(gp.buttons[2]&&gp.buttons[2].pressed))loop.g=0;if(gp.buttons[0]&&gp.buttons[0].pressed&&P.y==0&&!modal)P.vy=6}
if(modal){ix=0;iy=0}const l=Math.hypot(ix,iy);if(l>1){ix/=l;iy/=l}
if(l>.05){moving=true;const s=(run||keys.shift?9.5:5)*dt,fx=Math.sin(P.yaw),fz=Math.cos(P.yaw),mxv=fx*iy-Math.cos(P.yaw)*ix,mzv=fz*iy+Math.sin(P.yaw)*ix;P.x+=mxv*s;P.z+=mzv*s;av.rotation.y=Math.atan2(mxv,mzv)}
col.forEach(c=>{const dx=P.x-c.x,dz=P.z-c.z,d=Math.hypot(dx,dz),m=c.r+.45;if(d<m&&d>0){P.x=c.x+dx/d*m;P.z=c.z+dz/d*m}});P.x=Math.max(-75,Math.min(75,P.x));P.z=Math.max(-108,Math.min(60,P.z));
P.vy-=18*dt;P.y=Math.max(0,P.y+P.vy*dt);if(P.y==0)P.vy=0;
av.position.set(P.x,P.y,P.z);av.children[0].position.y=.5+(moving?Math.abs(Math.sin(tt*10))*.07:0);
const cp=Math.cos(P.pitch),d=6.5;C.position.set(P.x-Math.sin(P.yaw)*cp*d,1.6+P.y+Math.sin(P.pitch)*d,P.z-Math.cos(P.yaw)*cp*d);C.lookAt(P.x,1.5+P.y,P.z)}
else{ride.o.seat.getWorldPosition(rv);ride.o.seat.getWorldQuaternion(rq);C.position.copy(rv).y+=.7;C.quaternion.copy(rq)}
// interaction
near=null;if(!inside){let best=9;pois.forEach(p=>{const d=Math.hypot(p.g.position.x-P.x,p.g.position.z-P.z)/p.r;if(d<1&&d<best){best=d;near=p}})}
const pt=near?'E — '+(typeof near.label=='function'?near.label():near.label):'';if(pt!=lastPrompt){lastPrompt=pt;const e=$('prompt');e.textContent=pt;e.style.display=pt?'block':'none'}
if(!celebSeen&&Math.hypot(P.x-32,P.z-24)<12){celebSeen=true;skyShow(redFw?2:4)}
if(++mapN%4==0){drawMap();const z=zoneName();if($('zone').textContent!=z)$('zone').textContent=z}
R.render(S,C)}
loop();
