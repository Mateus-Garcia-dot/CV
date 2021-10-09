import './main.scss'
import { $ } from './vendor';
import * as translation from './translation/translation';
import * as comets from './comets/comets';


$("#name").on('click', function(){
    translation.translatePage("EN-US");
})
$(".gg-mouse").on('click', function(){
    translation.translatePage("PT-BR");
})

comets.createComets(1);