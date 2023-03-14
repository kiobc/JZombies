import* as PIXI from "pixi.js";
import Victor from "victor";
export default class Disparo{
    constructor({app,player}){
        this.app=app;
        this.player=player;
        this.vBala=4;
        this.bala=[];
        this.rBala=8;
        this.maxBala=3;
        this.audio= new Audio("./assets/shoot.mp3");
    }
        fuego(){
            this.audio.currentTime=0;
            this.audio.play();
            if(this.bala.length>=this.maxBala)
            {

                let b = this.bala.shift();
                this.app.stage.removeChild(b);
            }
this.bala.forEach((b)=>this.app.stage.removeChild(b));
            this.bala=this.bala.filter((b)=>
                Math.abs(b.position.x)< this.app.screen.width && 
                Math.abs(b.position.y)< this.app.screen.height);
                this.bala.forEach((b)=>this.app.stage.addChild(b));
                const bala = new PIXI.Sprite(PIXI.Loader.shared.resources["bullet"].texture);
bala.anchor.set(0.5);
bala.scale.set(0.2);
 bala.position.set(this.player.position.x, this.player.position.y); 
 bala.rotation= this.player.rotation;      
            let angle = this.player.rotation - Math.PI/2;
            bala.velocidad= new Victor(Math.cos(angle),Math.sin(angle)).multiplyScalar(this.vBala);
            this.bala.push(bala);
            this.app.stage.addChild(bala);
            console.log(this.bala, this.app.stage.children.length);
        }
        set shoot(disparo){
            if(disparo){
                this.fuego();
                this.intervalo= setInterval(()=>this.fuego(),500);
            }else{
                clearInterval(this.intervalo);
            }
        }
        update(delta){
            this.bala.forEach(b=>b.position.set(b.position.x+b.velocidad.x * delta,b.position.y+b.velocidad.y* delta));
        }
}