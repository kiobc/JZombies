import * as PIXI from "pixi.js";
import Victor from "victor";
export default class Zombie{
    constructor({app,player}){
this.app=app;
this.player=player;

const radio = 16;
this.velocidad=2;
this.zombie = new PIXI.Graphics();
let r = this.pAparicionAl();
this.zombie.position.set(r.x, r.y);
this.zombie.beginFill(0xFF0000,1);
this.zombie.drawCircle(0,0,radio);
this.zombie.endFill();
app.stage.addChild(this.zombie);
    }

ataquePlayer(){
if(this.atacando)return;
this.atacando=true;
this.intervalo=setInterval(()=>this.player.ataque(),500)
}

update(){
    
     let e = new Victor(this.zombie.position.x, this.zombie.position.y);
     let s = new Victor(this.player.position.x,this.player.position.y);
     if(e.distance(s)<this.player.width/2)
{
this.ataquePlayer();
return;
}
     let d= s.subtract(e);
     let v = d.normalize().multiplyScalar(this.velocidad);
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