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

let zSpawn=new Spawner({create: ()=> new Zombie({app,player})});




app.ticker.add((delta)=>{
 
player.update();
zSpawn.spawns.forEach(zombie=>zombie.update());
});
