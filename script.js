const c=document.getElementById('sky');
const x=c.getContext('2d');
const letter=document.getElementById('letter');
const txt=document.getElementById('letterText');
document.getElementById('close').onclick=()=>letter.classList.remove('show');

function resize(){c.width=innerWidth;c.height=innerHeight}
addEventListener('resize',resize);resize();

const msgs=[
"You make ordinary days feel extraordinary.",
"Thank you for existing.",
"You deserve more kindness than you give yourself.",
"Out of billions of stars... I'm glad I found yours.",
"I hope you always remember how appreciated you are."
];

const stars=[];
for(let i=0;i<900;i++){
 stars.push({
  x:Math.random()*c.width,
  y:Math.random()*c.height,
  r:Math.random()*1.8+.3,
  a:Math.random(),
  t:Math.random()*6.28,
  dx:(Math.random()-.5)*.04,
  dy:(Math.random()-.5)*.04,
  special:Math.random()<0.02,
  msg:msgs[Math.floor(Math.random()*msgs.length)]
 });
}
let pointer={x:-9999,y:-9999};
function setP(px,py){pointer.x=px;pointer.y=py}
addEventListener('mousemove',e=>setP(e.clientX,e.clientY));
addEventListener('touchmove',e=>{const t=e.touches[0];setP(t.clientX,t.clientY)},{passive:true});
addEventListener('click',e=>{
 for(const s of stars){
  if(!s.special)continue;
  const d=Math.hypot(e.clientX-s.x,e.clientY-s.y);
  if(d<18){
   txt.textContent=s.msg+"\n\n— Sabi";
   letter.classList.add('show');
   break;
  }
 }
});

let shoot={x:-100,y:0,v:0};
function spawn(){shoot={x:-50,y:Math.random()*c.height*.5,v:14}}
setInterval(spawn,9000);

function loop(){
 x.fillStyle="#01030a";x.fillRect(0,0,c.width,c.height);
 for(const s of stars){
  s.x+=s.dx;s.y+=s.dy;
  if(s.x<0)s.x=c.width;if(s.x>c.width)s.x=0;
  if(s.y<0)s.y=c.height;if(s.y>c.height)s.y=0;
  s.t+=.02;
  let r=s.r+Math.sin(s.t)*.1;
  let a=.4+.4*Math.sin(s.t);
  const d=Math.hypot(pointer.x-s.x,pointer.y-s.y);
  if(d<120){const f=1-d/120;r+=f*2;a=1}
  x.beginPath();
  x.shadowBlur=s.special?18:0;
  x.shadowColor="white";
  x.arc(s.x,s.y,r,0,6.28);
  x.fillStyle=`rgba(255,255,255,${a})`;
  x.fill();
 }
 if(shoot.x>-60){
  x.strokeStyle="white";
  x.lineWidth=2;
  x.beginPath();
  x.moveTo(shoot.x,shoot.y);
  x.lineTo(shoot.x-40,shoot.y-20);
  x.stroke();
  shoot.x+=shoot.v;shoot.y+=shoot.v*.45;
  if(shoot.x>c.width+100)shoot.x=-100;
 }
 requestAnimationFrame(loop);
}
loop();
