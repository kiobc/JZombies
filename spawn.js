import GameState from "./juego-estado";
export default class Spawner{
    constructor({app,create}){
        this.app=app;
        const spawnIntervalo=1000; // en milisegundos
        this.maxSpawn=5;
        this.create=create;
        this.spawns =[];
        setInterval(() => this.spawn(), this.spawnIntervalo)
    }
    spawn(){
        if(this.app.gameState!==GameState.RUNNING) return;
        if(this.spawns.length>=this.maxSpawn) return;
    let s=this.create();
    this.spawns.push(s);
    }
}