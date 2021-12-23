import { Spritesheet } from "pixi.js";

export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

export function randomFloatFromInterval(min,max){
    return Math.random() * (max - min) + min
}
  
export function getAngle(x1, y1, x2, y2) {
    let x = x2 - x1;
    let y = y2 - y1;
    let radAngle = Math.atan(y / x);
    if (x < 0) return radAngle;
    return radAngle + Math.PI;
}
 
export function importSpritesFromFile(){
    let spritesArr:any = [];
    spritesArr.push(require('/src/assets/cometsSprites/size1.svg'));
    spritesArr.push(require('/src/assets/cometsSprites/size2.svg'));
    spritesArr.push(require('/src/assets/cometsSprites/size3.svg'));
    return spritesArr
}