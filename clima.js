import* as PIXI from "pixi.js";
// import Victor from "victor";
import * as PARTICLES from "pixi-particles";
import {rain} from "./emitter-configs.js";
export default class Clima {
    constructor ({app}){
        this.lightningGap={min:9000,max:29000};
        this.app=app;
        this.crearAudio();
        this.lightning=new PIXI.Sprite(PIXI.Texture.WHITE);
        this.lightning.width= this.lightning.height=app.screen.width;
        this.lightning.tint=0xffffff;
        this.lightning.alpha=0.8;
        this.flash();

        //lluvia
        const container = new PIXI.ParticleContainer();
        container.zIndex=2;
        app.stage.addChild(container);
        const emitter = new PARTICLES.Emitter(container,[PIXI.Loader.shared.resources["rain"].texture],rain);
        let elapsed= Date.now();
        const update= function(){
            requestAnimationFrame(update);
            let now= Date.now();
            emitter.update((now-elapsed)*0.001);
            elapsed=now;

        }
emitter.emit=true;
update();

    }
    crearAudio(){
        this.tormenta=new Audio ("./assets/thunder.mp3");
        this.lluvia=new Audio("./assets/rain.mp3");
        this.lluvia.addEventListener("timeupdate",function(){
            if(this.currentTime>this.duration-0.2){
                this.currentTime=0;
            }
        });
    }
    async flash(){
        await new Promise((res=> setTimeout
            (res, this.lightningGap.min+
                (this.lightningGap.max-this.lightningGap.min)*Math.random())));

    this.app.stage.addChild(this.lightning);
    if(this.sound) this.tormenta.play();
    await new Promise(res=> setTimeout(res,2000));
    this.app.stage.removeChild(this.lightning);
    this.flash();
        }
        habSonido(){
            this.sound=true;
            this.lluvia.play();
        }
    }