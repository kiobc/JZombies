import * as PIXI from "pixi.js";
import Zombie from "./zombie.js";
import Player from "./player.js";
import Spawner from "./spawn.js";
import { textStyle,subTextStyle, zombies } from "./global.js";
import Clima from "./clima.js";
import GameState from "./juego-estado.js";
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
  app.gameState=GameState.PREINTRO;
  try{

    await cargarAssets();
    app.clima = new Clima({app});
    let player= new Player({app});
let zSpawn=new Spawner({app,create: ()=> new Zombie({app,player})});


let preIntro = crearEscena("BrayCalZombies","Click para Continuar");
let Inicio = crearEscena("BrayCalZombies","Click para iniciar");
let gameOver=crearEscena("BrayCalZombies","Te mataron");


app.ticker.add((delta)=>{
  if(player.muerte) app.gameState=GameState.GAMEOVER;
  preIntro.visible=app.gameState=== GameState.PREINTRO;
  Inicio.visible= app.gameState=== GameState.START;
  gameOver.visible=app.gameState=== GameState.GAMEOVER;
  switch(app.gameState){
    case GameState.PREINTRO:
      player.scale=4;
    break;
    case GameState.INTRO:
      player.scale-=0.01;
      if(player.scale<=1) app.gameState = GameState.START;
      break;
    case GameState.RUNNING:
      player.update(delta);
zSpawn.spawns.forEach((zombie)=>zombie.update(delta));
bTiro({bala:player.disparo.bala, 
  zombies:zSpawn.spawns,
  rbala:8,
  rzombie:16});
      break;
    default:
      break;
  }
  


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

 function crearEscena(sceneText,sceneSubText){
  const sceneContainer=new PIXI.Container();
  const texto= new PIXI.Text(sceneText, new PIXI.TextStyle(textStyle));
  texto.x=app.screen.width/2;
  texto.y=0;
  texto.anchor.set(0.5,0);

  const subtexto= new PIXI.Text(sceneSubText, new PIXI.TextStyle(subTextStyle));
  subtexto.x=app.screen.width/2;
  subtexto.y=50;
  subtexto.anchor.set(0.5,0);

  sceneContainer.zIndex=1;
  sceneContainer.addChild(texto);
  sceneContainer.addChild(subtexto);
  app.stage.addChild(sceneContainer);
  return sceneContainer;

 }

//  function comenzarJuego(){
//   app.juegoInicio=true;
//   app.clima.habSonido();
//  }

async function cargarAssets(){
  return new Promise((resolve,reject)=>{
    zombies.forEach(z=>PIXI.Loader.shared.add(`assets/${z}.json`));
PIXI.Loader.shared.add("assets/hero_male.json");
PIXI.Loader.shared.add("bullet","assets/bullet.png");
PIXI.Loader.shared.add("rain","assets/rain.png");
PIXI.Loader.shared.onComplete.add(resolve);
PIXI.Loader.shared.onError.add(reject);
PIXI.Loader.shared.load();
  });
}
 function clickHandler(){
  switch(app.gameState){
    case GameState.PREINTRO:
   app.gameState=   GameState.INTRO; 
  //  music.play();
break;

case GameState.START:
   app.gameState=   GameState.RUNNING; 
  //  zombieHorda.play();
break;

default:
  break;
  }
 }
 document.addEventListener("click",clickHandler);