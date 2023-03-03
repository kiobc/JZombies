import* as PIXI from "pixi.js";
import Victor from "victor";
export default class Disparo{
    constructor({app,player}){
        this.app=app;
        this.player=player;
        this.vBala=8;
        this.bala=[];
        this.rBala=8;
        this.maxBala=3;
    }
        fuego(){
            const bala= new PIXI.Graphics();
            bala.position.set(this.player.position.x, this.player.position.y);
            bala.beginFill(0x0000ff,1);
            bala.drawCircle(0,0,this.rBala);
            bala.endFill();
            let angle = this.player.player.rotation - Math.PI/2;
            bala.velocidad= new Victor(Math.cos(angle),Math.sin(angle)).multiplyScalar(this.vBala);
            this.bala.push(bala);
            this.app.stage.addChild(bala);
        }
        set shoot(disparo){
            if(disparo){
                this.fuego();
                this.intervalo= setInterval(()=>this.fuego(),500);
            }else{
                clearInterval(this.intervalo);
            }
        }
        update(){
            this.bala.forEach(b=>b.position.set(b.position.x+b.velocidad.x,b.position.y+b.velocidad.y));
        }
}