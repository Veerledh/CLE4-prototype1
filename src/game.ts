import * as PIXI from 'pixi.js'
import fishImage from "./images/fish.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"
import { Fish } from './fish';
import { KeyboardFish } from './keyboardFish';
export class Game{
    // settings
    private pixiWidth = 800;
    private pixiHeight = 450;
    // globals
    private pixi : PIXI.Application;
    private loader : PIXI.Loader;
    private keyboardFish : Fish;
    private fishes : Fish[];
    /**
     * Constructor
     * 
     * Initialize Pixi
     * Load assets
     */
    constructor(){
        this.fishes = [];
        this.pixi = new PIXI.Application({ width: this.pixiWidth, height: this.pixiHeight }); //vullen van pixi application 
        this.pixi.stage.interactive = true;
        this.pixi.stage.hitArea = this.pixi.renderer.screen;
        document.body.appendChild(this.pixi.view);
        this.loader = new PIXI.Loader();
        this.loader.add('fishTexture', fishImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', waterImage);
        this.loader.load(()=>this.loadCompleted());
    }

    private gameOverButton : PIXI.Sprite

    private gameOver(){
        console.log("game over")
        this.pixi.stop()
        this.gameOverButton = new PIXI.Sprite(PIXI.Texture.WHITE) // jouw eigen sprite hier
        this.gameOverButton.width = 100
        this.gameOverButton.height = 50
        this.gameOverButton.x = 400
        this.gameOverButton.y = 200
        this.gameOverButton.interactive = true
        this.gameOverButton.buttonMode = true
        this.gameOverButton.on('pointerdown', () => this.resetGame())

        this.pixi.stage.addChild(this.gameOverButton)
    }

    private resetGame(){
        console.log("gelukt")
    }
    /**
     * Load Completed
     * 
     * Runs after assets loaded
     * Creates background
     * Creates bubbles
     * Creates fishes
     */
    private loadCompleted() {
        let water = new PIXI.Sprite(this.loader.resources["waterTexture"].texture!);
        water.height = this.pixiHeight;
        water.width = this.pixiWidth;
        this.pixi.stage.addChild(water);
        for(let i = 0; i < 5; i++){
            let temp = new Fish(this.loader.resources["fishTexture"].texture!, this);
            this.pixi.stage.addChild(temp);
            this.fishes.push(temp);
        }
        this.keyboardFish = new KeyboardFish(this.loader.resources["fishTexture"].texture!, this);
        this.pixi.stage.addChild(this.keyboardFish)
        
        this.pixi.ticker.add((delta)=>this.update(delta));
    }
    /**
     * Update
     * @param delta 
     * 
     * Updates fishes & bubbles
     */
    private update(delta: number){
        this.keyboardFish.update(delta);
        for(let f = 0; f < this.fishes.length; f++){
            this.fishes[f].update(delta);
            if(this.collision(this.keyboardFish, this.fishes[f])){
                console.log("keyboard fish touches normal fish 💀")
            }
        }

    }
    private collision(sprite1:PIXI.Sprite, sprite2:PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()
        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }
    // public finish(){
    //     console.log('FINISH');
    // }

}
