import {parentesis} from './libreria/parentesis.js'
import { resolucion } from './libreria/resolucion.js'

function calculadora (c){
    let calculo = []
    c.split('').map(e=>{if(e !== ' ')calculo.push(e)})

    for (let index = 0; index < calculo.length ; index++) {
        if(calculo[index] == '(' && /[1234567890]/.test(calculo[index-1]) == true){calculo.splice(index,0,'*')}
    }

    for (let index = 0; index < 1; index++) {

        let findParentesis = parentesis(calculo)

        if(findParentesis.searchIndexInicioParentesis !== false){
            let peticion = resolucion(findParentesis.numbers) 
        }

    }



    
}

console.log(calculadora('2+(-2+22)'));