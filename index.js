import * as PIXI from "pixi.js";
import Zombie from "./zombie.js";
import Player from "./player.js";
import Spawner from "./spawn.js";

//import Matter from "matter-js";

const canvasSize = 512;
const canvas = document.getElementById("mycanvas");
const app = new PIXI.Application({
  view: canvas,
  width: canvasSize,
  height: canvasSize,
  backgroundColor: 0x5c812f,
});

let player= new Player({app});

let zSpawn=new Spawner({app,create: ()=> new Zombie({app,player})});



let Inicio = crearEscena("Click para iniciar");
let gameOver=crearEscena("Te mataron");
app.juegoInicio=false;
app.ticker.add((delta)=>{
  gameOver.visible=player.muerte;
  Inicio.visible= !app.juegoInicio;
 if(app.juegoInicio===false)return;
player.update();
zSpawn.spawns.forEach((zombie)=>zombie.update());
bTiro({bala:player.disparo.bala, 
  zombies:zSpawn.spawns,
  rbala:8,
  rzombie:16});
});

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
 document.addEventListener("click",comenzarJuego);