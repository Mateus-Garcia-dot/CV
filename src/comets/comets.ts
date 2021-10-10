import { $ } from '../vendor';
import { fabric } from '../vendor';

function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function clock(interval: number,canvas){
  while(true){
    await sleep(interval);
    canvas.renderAll();
  }
}


function getAngle(x1: number,y1: number,x2: number,y2: number) {
  let x = x2 - x1;
  let y = y2 - y1;
  let radAngle = Math.atan(y/x);
  let pi = Math.PI;
  let angle = radAngle * (180/pi);
  
  if (x < 0) return angle;
  return angle + 180;
}


const createComet = function(pageHeight:number,pageWidth:number,canvas){
  let trailSize = 130; 
  let cometSize = 10;

  let initialPosLeft = randomIntFromInterval(0,pageWidth);
  let initialPosTop = randomIntFromInterval(0,pageHeight);
  let finalPosLeft = randomIntFromInterval(initialPosLeft-1000,initialPosLeft+1000);
  let finalPosTop = randomIntFromInterval(initialPosTop-1000,initialPosTop+1000);
  let cometAngle = getAngle(initialPosLeft,initialPosTop,finalPosLeft,finalPosTop);

  let circle = new fabric.Circle({
    radius: cometSize, fill: 'white',
  });
  
  let trail = new fabric.Polygon([
    { x: cometSize, y: 0 },
    { x: cometSize, y: cometSize*2 },
    { x: trailSize, y: cometSize},
    ]);
  let trailGradient = new fabric.Gradient({
    type: 'linear',
    gradientUnits: 'pixels', // or 'percentage'
    coords: { x1: 0, y1: 0, x2: trail.width, y2: 0 },
    colorStops:[
      { offset: 0, color: 'white' },
      { offset: 0.3, color: '#E6E6E6  ' },
      { offset: 1, color: 'black'}
    ],
  });
  trail.set('fill',trailGradient);

  let comet = new fabric.Group([trail,circle]);
  comet.angle = cometAngle;
  comet.left = initialPosLeft;
  comet.top= initialPosTop;

  let duration = 1000;
  comet.animate('left', finalPosLeft, {
    duration: duration,
    onComplete: () => canvas.remove(comet),
  });
  comet.animate('top', finalPosTop, {
    duration: duration,
    onComplete: () => canvas.remove(comet),
  });

  comet.set({
    opacity: 0
  });
  comet.animate('opacity', 1, {
    duration: duration/2,
    onComplete: () => comet.animate('opacity', 0, {
      duration: duration/2,
    })
  });
  return comet;  
};


async function cometSpawner(interval: number,pageHeight, pageWidth,canvas){
  while(true){
    await sleep(interval);
    canvas.add(createComet(pageHeight,pageWidth,canvas));
  }
}

export const comets = function(frequency: number) {
    let pageHeight = $(document).height();
    let pageWidth = $(document).width();
    let canvas = new fabric.StaticCanvas('canvas');

    canvas.setHeight(pageHeight);
    canvas.setWidth(pageWidth);
    $("canvas").css('height', '100%');
    $("canvas").css('width', '100%');

    clock(40,canvas)
    cometSpawner(frequency,pageHeight,pageWidth,canvas);
} 
