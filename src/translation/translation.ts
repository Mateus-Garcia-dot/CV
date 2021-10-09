import { $ } from '../vendor'
import translation from './content.json';

const availableLanguages = function(language: string): any{
    let availableLanguages = Object.keys(translation);
    if (availableLanguages.includes(language)) {
        return language; 
    }
    return "PT-BR";
}


export const translatePage = function(language :string){
    let languageToTranslate: ("PT-BR"|"EN-US") = availableLanguages(language);
    $("#firstPage #lenguageBT").html(translation[languageToTranslate].firstPage.button);
    $("#firstPage #greetings").html(translation[languageToTranslate].firstPage.greetings);
    $("#firstPage #whoAmI").html(translation[languageToTranslate].firstPage.whoAmI);
    
    $("#secondPage .writing .title").html(translation[languageToTranslate].secondPage.title);
    $("#secondPage .writing .body").html(translation[languageToTranslate].secondPage.body);
    
    $("#thirdPage #universityContainer .writing .title").html(translation[languageToTranslate].thirdPage.university.title);
    let university = $("#thirdPage #universityContainer .writing .infoBlock");
    university.map(function(e:any,obj:any){
        $(obj).children().closest('.leftPart').children().html(translation[languageToTranslate].thirdPage.university.content[e].title);
        $(obj).children().closest('.rightPart').children().html(translation[languageToTranslate].thirdPage.university.content[e].body); 

    });
    $("#thirdPage #learningContainer .writing .title").html(translation[languageToTranslate].thirdPage.learning.title)
    $("#thirdPage #learningContainer .writing #lenguage").html(translation[languageToTranslate].thirdPage.learning.lenguageTitle);
    $("#thirdPage #learningContainer .writing #english").html(translation[languageToTranslate].thirdPage.learning.lenguage);
    

    $("#fourthPage .title").html(translation[languageToTranslate].forthpage.contact.title);
    $("#fourthPage #downloadBody").html(translation[languageToTranslate].forthpage.contact.download);

}
