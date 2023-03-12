import * as PIXI from "pixi.js";
import Victor from "victor";
import{zombies} from"./global.js";
export default class Zombie{
    constructor({app,player}){
this.app=app;
this.player=player;

this.velocidad=2;
let r = this.pAparicionAl();
let zombineName = zombies[Math.floor(Math.random()*zombies.length)];
this.velocidad=zombineName==="quickzee"?1:0.25;
let sheet= PIXI.Loader.shared.resources[`assets/${zombineName}.json`].spritesheet;
this.muerte=new PIXI.AnimatedSprite(sheet.animations["die"]);
this.ataque=new PIXI.AnimatedSprite(sheet.animations["attack"]);
this.zombie=new PIXI.AnimatedSprite(sheet.animations["walk"]);
this.zombie.animationSpeed = zombineName==="quickzee"?0.2:0.1;
this.zombie.play();
this.zombie.anchor.set(0.5);

this.zombie.position.set(r.x, r.y);
app.stage.addChild(this.zombie);
    }

ataquePlayer(){
if(this.atacando)return;
this.atacando=true;
this.intervalo=setInterval(()=>this.player.ataque(),500)
}

update(delta){
    
     let e = new Victor(this.zombie.position.x, this.zombie.position.y);
     let s = new Victor(this.player.position.x,this.player.position.y);
     if(e.distance(s)<this.player.width/2)
{
this.ataquePlayer();
return;
}
     let d= s.subtract(e);
     let v = d.normalize().multiplyScalar(this.velocidad*delta);
     this.zombie.position.set(this.zombie.position.x + v.x, this.zombie.position.y+ v.y);
}

kill(){
  this.app.stage.removeChild(this.zombie);
 clearInterval( this.intervalo);
}

get position(){
  return this.zombie.position;
}
     pAparicionAl() {
        const canvasSize = this.app.renderer.view.width; // definir canvasSize
        let borde = Math.floor(Math.random()*4); // generar valor aleatorio para borde
        let puntoAp = new Victor(0, 0);
        switch(borde) {
          case 0:
            puntoAp.x = canvasSize * Math.random();
            puntoAp.y = 0;
            break;
          case 1:
            puntoAp.x = canvasSize;
            puntoAp.y = canvasSize * Math.random();
            break;
          case 2:
            puntoAp.x = canvasSize * Math.random();
            puntoAp.y = canvasSize;
            break;
          case 3:
            puntoAp.x = 0;
            puntoAp.y = canvasSize * Math.random();
            break;
          default:
            break;
        }
        return puntoAp;
      }
}