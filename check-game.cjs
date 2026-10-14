const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('index.html','utf8');
const source=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const imageCalls=[];
const context=new Proxy({drawImage(...args){imageCalls.push(args)}},{get(target,k){return target[k]??(()=>{})}});
const elements={};
const document={hidden:false,createElement(){return {width:600,height:600,getContext:()=>context}},getElementById(id){return elements[id]??=(id==='maze'||id==='portrait'?{width:600,height:600,getContext:()=>context,addEventListener(){}}:{textContent:'',hidden:true,addEventListener(){},focus(){}})},querySelectorAll(){return []},addEventListener(){}};
const png=fs.readFileSync('assets/yunkyung-sprites.png');
class Image{constructor(){this.complete=true;this.naturalWidth=this.width=png.readUInt32BE(16);this.height=png.readUInt32BE(20)}}
for(const reduced of [false,true]){
 const timers=new Map();let timerId=0;
 const sandbox={document,Math,Set,Image,performance:{now:()=>1000},window:{matchMedia:()=>({matches:reduced}),addEventListener(){}},requestAnimationFrame(){},setTimeout(fn){timers.set(++timerId,fn);return timerId},clearTimeout(id){timers.delete(id)},assert,timers};
 vm.createContext(sandbox);vm.runInContext(source,sandbox);
 vm.runInContext(`
 function walk(target){
  const queue=[[player.x,player.y,[]]],seen=new Set();
  while(queue.length){const [x,y,path]=queue.shift();if(x===target.x&&y===target.y){path.forEach(d=>move(...d));return}
   for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,k=key(nx,ny);if(nx>=0&&ny>=0&&nx<N&&ny<N&&!grid[ny][nx]&&!seen.has(k)){seen.add(k);queue.push([nx,ny,[...path,[dx,dy]]])}}
  }throw Error('Unreachable target');
 }
 for(let run=0;run<30;run++){
  newGame();move(-1,0);assert.equal(steps,0);
  walk(goal);assert(!finished||collected===3);
  while(coffees.length)walk(coffees[0]);walk(goal);
  assert(finished);assert.equal(collected,3);assert.equal(document.getElementById('win').hidden,false);
  const count=steps;move(-1,0);assert.equal(steps,count);
  newGame();assert.equal(steps,0);assert.equal(particles.length,0);assert.equal(visual.x,1);
 }
 for(let row=0;row<4;row++)for(let t=1000;t<1300;t+=40){direction=row;lastMove=1000;draw(t);animate(t)}
 newGame();grid=Array.from({length:N},()=>Array(N).fill(0));coffees=[];
 startHold(1,0,77);assert.equal(player.x,2);assert.equal(timers.size,1);
 const [id,callback]=[...timers][0];timers.delete(id);callback();assert.equal(player.x,3);
 stopHold();assert.equal(timers.size,0);assert.equal(holdPointer,null);
 startHold(1,0,78);newGame();assert.equal(timers.size,0);assert.equal(player.x,1);
 `,sandbox);
}
for(const args of imageCalls){if(args.length===9){const [img,x,y,w,h]=args;assert(x>=0&&y>=0&&x+w<=img.width&&y+h<=img.height,'Sprite frame outside atlas')}}
assert(html.includes('data:image/png;base64,'));
assert(png.readUInt32BE(16)>1000);assert(png.readUInt32BE(20)>1000);assert.equal(png[25],6,'RGBA PNG required');
console.log('PASS: 60 mazes; walls, collection, exit, restart, reduced motion, render loop, atlas bounds, embedded RGBA asset, touch hold/release/reset.');
