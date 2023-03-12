import * as PIXI from "pixi.js";
import Disparo from "./disparo";
export default class Player{
    constructor({app}){
        this.app=app;
        const playerWidth = 32;
let sheet= PIXI.Loader.shared.resources["assets/hero_male.json"].spritesheet;

this.idle=new PIXI.AnimatedSprite(sheet.animations["idle"]);
this.shoot=new PIXI.AnimatedSprite(sheet.animations["shoot"]);
this.player=new PIXI.AnimatedSprite(sheet.animations["idle"]);
this.player.animationSpeed=0.1;
this.player.play();

        // this.player = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.player.anchor.set(0.5, 0.3);
        this.player.position.set(app.screen.width / 2, app.screen.height / 2);
        // this.player.width = this.player.height = playerWidth;
        // this.player.tint = 0xea985d;

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
this.salud.width=(this.vida/this.maxSalud)*this.salud.initialWidth;
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
    update(delta){
        if(this.muerte)return;
        const mouse=this.app.renderer.plugins.interaction.mouse;
        const cursorPosicion= mouse.global;
        let angle= Math.atan2(
          cursorPosicion.y - this.player.position.y,
           cursorPosicion.x - this.player.position.x) + 
           Math.PI/2;
           this.rotation=angle;
           this.player.scale.x=cursorPosicion.x< this.player.position.x ?-1:1;
if(mouse.buttons!==this.lastMouseButton){
    this.player.textures=mouse.buttons===0? this.idle.textures : this.shoot.textures;
    this.player.play();
this.disparo.shoot=mouse.buttons!==0;
this.lastMouseButton=mouse.buttons;
}
this.disparo.update(delta);
    }
}