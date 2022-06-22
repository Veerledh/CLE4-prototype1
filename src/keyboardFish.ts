import * as PIXI from 'pixi.js'
import { Fish } from './fish';
import { Game } from './game';

export class KeyboardFish extends Fish{
    private speed = 6;
    constructor(texture: PIXI.Texture, game: Game){
        super(texture, game);
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }
    onKeyUp(e: KeyboardEvent): any {
        // console.log('keyup');
    }
    onKeyDown(e: KeyboardEvent): any {
        // console.log(e.key.toUpperCase());
        switch (e.key.toUpperCase()) {
            case "W":
            case "ARROWUP":
                this.y -= this.speed;
                break;
            case "S":
            case "ARROWDOWN":
                this.y += this.speed;
                break;
            case "A":
            case "ARROWLEFT":
                this.x -= this.speed;
                break;
            case "D":
            case "ARROWRIGHT":
                this.x += this.speed;
                break;
        }
    }
    public update(delta: number){
        
    }
}