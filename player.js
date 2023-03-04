import * as PIXI from "pixi.js";
import Disparo from "./disparo";
export default class Player{
    constructor({app}){
        this.app=app;
        const playerWidth = 32;
        this.player = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.player.anchor.set(0.5);
        this.player.position.set(app.screen.width / 2, app.screen.height / 2);
        this.player.width = this.player.height = playerWidth;
        this.player.tint = 0xea985d;

app.stage.addChild(this.player);
this.lastMouseButton=0;
this.disparo= new Disparo({app,player:this});
this.maxSalud=100;
this.vida=this.maxSalud;
const margin=16;
const barheight =8;
   this.salud= new PIXI.Graphics();
    this.salud.beginFill(0xff0000);
    this.salud.initialWidth=app.screen.width - 2*margin;
    this.salud.drawRect(margin, app.screen.height - barheight - margin/2, this.salud.initialWidth,barheight);
this.salud.endFill();
this.salud.zIndex=1;
this.app.stage.sortableChildren= true;
this.app.stage.addChild(this.salud);
}
ataque(){
this.vida -=1;
this.salud.Width=(this.vida/this.maxSalud)*this.salud.initialWidth;
if(this.vida<=0){
   this.muerte=true; 
}
}
 get position(){
    return this.player.position;
 }   

get width(){
    return this.player.width;
}
    update(){
        if(this.muerte)return;
        const mouse=this.app.renderer.plugins.interaction.mouse;
        const cursorPosicion= mouse.global;
        let angle= Math.atan2(
          cursorPosicion.y - this.player.position.y,
           cursorPosicion.x - this.player.position.x) + 
           Math.PI/2;
           this.player.rotation=angle;
if(mouse.buttons!==this.lastMouseButton){
this.disparo.shoot=mouse.buttons!==0;
this.lastMouseButton=mouse.buttons;
}
this.disparo.update();
    }
}