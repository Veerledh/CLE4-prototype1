import * as PIXI from 'pixi.js'
import { Game } from './game';
import fishImage from "./images/fish.png"

export class Fish extends PIXI.Sprite{
    private game: Game;
    pixi:PIXI.Application
    bones:PIXI.Texture
    constructor(texture: PIXI.Texture, game: Game){
        super(texture); // new PIXI.Sprite()
        this.game = game;
        this.anchor.set(0.5);
        this.y = 100;
        this.tint = Math.random() * 0xFF0000;
        this.x = Math.random() * 800;
        this.y = Math.random() * 450;
    }
    public update(delta: number){
        this.x -= delta * 1;
        if(this.x < (0 - this.width)){
            // finish
            // this.game.finish();
            this.x = 800;
            this.y = Math.random() * 450;
        }
    }

    onKeyDown(e:KeyboardEvent){
        switch (e.key.toUpperCase()) {
            case "P":
                console.log("pause")
                
                let burn = new PIXI.Sprite(this.bones)
                burn.scale.set(0.42)
                this.pixi.stage.addChild(burn)
        }
    }
}