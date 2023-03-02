export default class Spawner{
    constructor({create}){
        const spawnIntervalo=1000; // en milisegundos
        this.maxSpawn=3;
        this.create=create;
        this.spawns =[];
        setInterval(()=> this.spawn().spawnIntervalo);
    }
    spawn(){
        if(this.spawns.length>=this.maxSpawn) return;
    let s=this.create();
    this.spawns.push(s);
    }
}