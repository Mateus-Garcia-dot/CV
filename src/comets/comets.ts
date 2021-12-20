import { PIXI, gsap, Power0 } from '../vendor';
import { randomIntFromInterval, getAngle, randomFloatFromInterval, importSpritesFromFile } from './utilities';
import { $ } from '../vendor';

var cometConfig:any = {
  quantity: 5,
  duration: 1,
  sprites: importSpritesFromFile(),
  getRandomsprite: () => {
    return cometConfig.sprites[randomIntFromInterval(0,cometConfig.sprites.length-1)]
  }
}

function cometAnimation(comet) {
  comet.x = Math.random() * app.screen.width;
  comet.y = Math.random() * app.screen.height;
  let finalX = Math.random() * app.screen.width;
  let finalY = Math.random() * app.screen.height;
  comet.rotation = getAngle(comet.x, comet.y, finalX, finalY);
  let duration = randomIntFromInterval(1, 5);
  let scale = randomFloatFromInterval(0.1,0.9);
  comet.scale.set(scale,scale)
  gsap.set(comet, { alpha: 0 });
  gsap.to(comet, {
      alpha: 1,
      duration: duration / 2,
      ease: "power1.inOut",
      onComplete: function () {
        gsap.to(comet, {
              alpha: 0,
              duration: duration / 2,
              ease: "power1.inOut"
          })
        }
  });
  gsap.to(comet, {
    x: finalX,
      y: finalY,
      ease: Power0.easeIn,
      duration: duration,
      onComplete: function () {
          cometAnimation(comet);
        }
      }
  );
}

export function createComet() {
  let spriteSvg = cometConfig.getRandomsprite();
  let cometSprite = PIXI.Sprite.from(spriteSvg);
  cometAnimation(cometSprite);
  app.stage.addChild(cometSprite);
}

export function removeComet(){
  if (app.stage.children.length != 0){
    app.stage.removeChild(app.stage.children[0])
  }
}
export function cometQuantity() {
  return app.stage.children.length
}

const canvasWrapper:any = $("body")[0]
var app = new PIXI.Application({ resizeTo: canvasWrapper });
app.view.style.position = 'absolute';


export function init() {
  for (let i = 0; i < cometConfig.quantity; i++) {
    createComet();
  }
  $('body').prepend($(app.view));
}


