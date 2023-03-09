import * as PIXI from "pixi.js";
import Zombie from "./zombie.js";
import Player from "./player.js";
import Spawner from "./spawn.js";
import { zombies } from "./global.js";

//import Matter from "matter-js";

const canvasSize = 200;
const canvas = document.getElementById("mycanvas");
const app = new PIXI.Application({
  view: canvas,
  width: canvasSize,
  height: canvasSize,
  backgroundColor: 0x312a2b,
  resolution:2
});
PIXI.settings.SCALE_MODE=PIXI.SCALE_MODES.NEAREST;

iniciarJuego();



async function iniciarJuego(){
  try{

    await cargarAssets();
    let player= new Player({app});
let zSpawn=new Spawner({app,create: ()=> new Zombie({app,player})});



let Inicio = crearEscena("Click para iniciar");
let gameOver=crearEscena("Te mataron");
app.juegoInicio=false;
app.ticker.add((delta)=>{
  gameOver.visible=player.muerte;
  Inicio.visible= !app.juegoInicio;
 if(app.juegoInicio===false)return;
player.update(delta);
zSpawn.spawns.forEach((zombie)=>zombie.update(delta));
bTiro({bala:player.disparo.bala, 
  zombies:zSpawn.spawns,
  rbala:8,
  rzombie:16});
});
  }
  catch(error){
console.log(error.message);
console.log("Cargada fallida");
  }
}

 function bTiro({bala,zombies,rbala,rzombie}){
  bala.forEach(bala=>{
    zombies.forEach((zombie,index)=>{
      let dx =zombie.position.x - bala.position.x;
      let dy =zombie.position.y - bala.position.y;
      let distancia = Math.sqrt(dx*dx+dy*dy);
      if(distancia<rbala+rzombie)
      {
zombies.splice(index,1);
zombie.kill();
      }
    })
  })
 }

 function crearEscena(sceneText){
  const sceneContainer=new PIXI.Container();
  const texto= new PIXI.Text(sceneText);
  texto.x=app.screen.width/2;
  texto.y=0;
  texto.anchor.set(0.5,0);
  sceneContainer.zIndex=1;
  sceneContainer.addChild(texto);
  app.stage.addChild(sceneContainer);
  return sceneContainer;

 }

 function comenzarJuego(){
  app.juegoInicio=true;
 }

async function cargarAssets(){
  return new Promise((resolve,reject)=>{
    zombies.forEach(z=>PIXI.Loader.shared.add(`assets/${z}.json`));
PIXI.Loader.shared.add("assets/hero_male.json");
PIXI.Loader.shared.add("bullet","assets/bullet.png");
PIXI.Loader.shared.onComplete.add(resolve);
PIXI.Loader.shared.onError.add(reject);
PIXI.Loader.shared.load();
  });
}

 document.addEventListener("click",comenzarJuego);