import { PIXI } from '../vendor';
import { gsap } from '../vendor';
import { Power0 } from '../vendor';
import { $ } from '../vendor';

var cometConfig:any = {
  currNumber: 0,
  quantity: 5,
  comets: [],
  duration: 1,
  size: 0.1,
  trailSize: 200, 
}

function resize(){
  app.renderer.resize(window.innerWidth, window.innerHeight);
}


const canvasWrapper:any = document.getElementById('wholePage');

var app = new PIXI.Application({ resizeTo: canvasWrapper });
app.view.style.position = 'absolute';

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getAngle(x1, y1, x2, y2) {
  let x = x2 - x1;
  let y = y2 - y1;
  let radAngle = Math.atan(y / x);

  if (x < 0) return radAngle;
  return radAngle + Math.PI;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function cometAnimation(comet) {
  comet.x = Math.random() * app.screen.width;
  comet.y = Math.random() * app.screen.height;
  let finalX = Math.random() * app.screen.width;
  let finalY = Math.random() * app.screen.height;
  comet.rotation = getAngle(comet.x, comet.y, finalX, finalY);
  let duration = randomIntFromInterval(1, 5);
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

function createComet() {
  let sizeComet = cometConfig.size;
  let trailSize = cometConfig.trailSize;
  let comet = new PIXI.Graphics()
      .beginFill(0xFFFFFF)
      .lineStyle(0, 0xffffff)
      .arc(0, 0, 100 * sizeComet, Math.PI / 2, 3 * Math.PI / 2)
      .moveTo(0, -100 * sizeComet)
      .lineTo(0, 100 * sizeComet)
      .lineTo(trailSize, 0)
      .closePath()
      .endFill();

  cometAnimation(comet);
  return comet
}


async function commetQuantity() {
  while (true) {
      await sleep(1000);
      if (cometConfig.currNumber < cometConfig.quantity) {
          cometConfig.currNumber++;
          addCometToStage();
      } 
      if (cometConfig.currNumber > cometConfig.quantity) {
          cometConfig.currNumber--;
          app.stage.removeChild(cometConfig.comets[0]);
      }
  }
}

function addCometToStage() {
  let comet = createComet();
  cometConfig.comets.push(comet);  
  app.stage.addChild(comet);
}

export function init() {
  commetQuantity();
  addCometToStage();
  // append app.view on canvasWrapper class jquery
  $('body').prepend($(app.view));

}
