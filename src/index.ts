import './main.scss'
import { $ } from './vendor';
import * as translation from './translation/translation';
import * as comets from './comets/comets';


var isPT = true;
$("#lenguageBT").on("click", function() {
    if (isPT) {
        translation.translatePage('EN-US')
    } else{ 
       translation.translatePage('PT-BR')
    }
    isPT = !isPT;
})

comets.init();

$(document).on('keypress',function(e) {
    if(e.which == 43) {
        comets.createComet();
        console.log('Quantidade de cometas:' + comets.cometQuantity())
    }
});

$(document).on('keypress',function(e) {
    if(e.which == 45) {
        comets.removeComet();
        console.log('Quantidade de cometas:' + comets.cometQuantity())
    }
});