import { ordenamiento } from "./libreria/ordenamiento.js";
import {parentesis} from "./libreria/parentesis.js"
import { resolucion } from "./libreria/resolucion.js";

function cerebro (c){
    let provisorio = []
    for (let index = 0; index < c.length; index++) {
        if(c[index] == ' '){continue;}
        provisorio.push(c[index])}
    
    let calculo = ordenamiento(provisorio)

    for (let index = 0; index < Infinity; index++) {
     
        let parentesisCalculo = parentesis(calculo)
    
        if(parentesisCalculo.parentesis == true){
            let result = resolucion(parentesisCalculo.numbers)
            calculo.splice(parentesisCalculo.p_inicio+1,(parentesisCalculo.p_final-parentesisCalculo.p_inicio-1),result.numbers)
            calculo = calculo.flat()

        if(result.numbers.length > 1){continue;}
        if(result.numbers.length == 1){
            let lastParentesisIndex = calculo.indexOf(')',parentesisCalculo.p_inicio)
            calculo.splice(lastParentesisIndex,1)
            calculo.splice(parentesisCalculo.p_inicio,1)
            continue;
        }}

        if(parentesisCalculo.parentesis == false){
            let result = resolucion(calculo)
        }

        if(calculo.length == 1){
         return parseFloat(calculo.join(''))
        } 
    }
}


console.log(cerebro('2+(-3*22+1)+22'));