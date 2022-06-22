import * as PIXI from 'pixi.js'
import waterImage from "./images/background.png"

export class Game{
    
    pixiWidth = 800;
    pixiHeight = 450;
   
    pixi : PIXI.Application;
    loader : PIXI.Loader;
    
    constructor(){
    
        this.pixi = new PIXI.Application({ width: this.pixiWidth, height: this.pixiHeight });
        this.pixi.stage.interactive = true;
        this.pixi.stage.hitArea = this.pixi.renderer.screen;
        document.body.appendChild(this.pixi.view);
        this.loader = new PIXI.Loader();
        this.loader.add('waterTexture', waterImage);
        this.loader.load(()=>this.loadCompleted());
    }
    
    loadCompleted() {
        let water = new PIXI.Sprite(this.loader.resources["waterTexture"].texture!);
        water.height = this.pixiHeight;
        water.width = this.pixiWidth;
        this.pixi.stage.addChild(water);
     
    }
    
}
