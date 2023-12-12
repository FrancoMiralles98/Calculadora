console.time('calculadora')

const cerebro = (ecc) =>{


    let equation = []

    //validaciones
    ecc.split('').map(e=>{if(e !== ' ') equation.push(e)})
    for (let index = 0; index < equation.length; index++) {
        if(equation[index] == '÷') equation.splice(index,1,'/')
        if(equation[index] == '×' || equation[index] == 'x' ) equation.splice(index,1,'*')
        if(/[1234567890]/.test(equation[index]) && equation[index+1] == '(') equation.splice(index+1,0,'*')
    
    }

    negative(equation)
    

for (let index = 0; index < Infinity; index++) {
    
    let peticion =  parentesis(equation)

    // Eliminacion de parentesis 
    if( peticion.numbers && typeof peticion.numbers == 'string'){
        equation.splice(equation.indexOf('('),1)
        equation.splice(equation.indexOf(')'),1)
        continue;
    }

    //Envio del resultado de la cuenta
    if(/[-+*/]/.test(equation) == false){
        
            if(equation.join('') == 'NaN') return 'syntax error'
        return parseFloat(equation.join(''))
    }
    

    //Realizacion de la cuenta con parentesis
    if(peticion.parentesis1 !== -1){
        
        let result = operations(peticion)
        
        let sizeSplice = result.index1 + result.index2 +1
        
        let searchSecondOrden = equation.indexOf(`${result.simbolOrigin}`,peticion.parentesis1)
        
        equation.splice(searchSecondOrden - result.index1, sizeSplice , result.finalResult)
        equation = equation.flat()
        
        continue;
    }
    
    //realizacion de la cuenta sin parentesis
    if(peticion.parentesis1 == -1){
        let result = operations({numbers:equation})
        let sizeSplice = result.index1 + result.index2 +1
        let searchSecondOrden = equation.indexOf(`${result.simbolOrigin}`)
        equation.splice(searchSecondOrden- result.index1,sizeSplice,result.finalResult)
        equation = equation.flat()
        
    }}
}

//Enviar los tipo de operaciones e indices a la funcion
function operations({numbers}){
    let searchPrimerOrden = numbers.includes('^') == true? numbers.indexOf('^') : numbers.includes('') == true? numbers.indexOf(''): false
    if(searchPrimerOrden !== false){
        
        let peticion = ordenOperation(numbers,searchPrimerOrden)
        return peticion
    }
    let searchSegundoOrden = numbers.includes('*') == true? numbers.indexOf('*') : numbers.includes('/') == true? numbers.indexOf('/'): false
    if(searchSegundoOrden !== false){
    
       let peticion = ordenOperation(numbers,searchSegundoOrden)
       return peticion
    }
    let searchTercerOrden = numbers.includes('+') ==true?numbers.indexOf('+') : numbers.includes('-') == true? numbers.indexOf('-') : false
    if(searchTercerOrden !== false){
    
        let peticion = ordenOperation(numbers,searchTercerOrden)
        return peticion
    }
}

//Realizacion de la operacion
function ordenOperation(numbers, origin){
    
    let simbolos = ['+','-','*','/','(',')','^']
    let number1 = ''
    let number2 = ''
    let index1 = ''
    let index2= ''
    let parcialResult = 0
    let finalResult = []
    let simbolOrigin = ''
    
        // ciclo number1
        for (let index = 1; index < Infinity; index++) {
            if(numbers[origin-index] !== undefined && simbolos.includes(numbers[origin-index]) == false){
                number1 += numbers[origin-index]}


            if(numbers[origin-index] == undefined || simbolos.includes(numbers[origin-index]) == true){
                index1= number1.length
                number1 = number1.length >= 0? number1.split('').reverse().join(''): number1
                break;
            }
        }

        // ciclo number2
        for (let index = 1; index < Infinity; index++) {
            if(numbers[origin+index] !== undefined && simbolos.includes(numbers[origin+index]) == false){
                number2 += numbers[origin+index]}
                
                if(numbers[origin+index] == undefined || simbolos.includes(numbers[origin+index]) == true){
                    index2 =number2.length
                    break;
                }
            }
        
        //Realizacion de los operaciones 
        switch (numbers[origin]) {
            case '^':
                simbolOrigin = '^'
                
            break;
            case '*':
                simbolOrigin = '*'
                parcialResult = parseFloat(number1) * parseFloat(number2)
                break;
            case '/':
                simbolOrigin = '/'
                parcialResult= parseFloat(number1) / parseFloat(number2)
                break;
            case '+':
                simbolOrigin = '+'
                parcialResult= parseFloat(number1) + parseFloat(number2)
                
                break;
            case '-':
                simbolOrigin = '-'
                parcialResult =  parseFloat(number1) - parseFloat(number2)
                break;
            default:
                finalResult = 'syntax error'
                break;
        }
         parcialResult.toString().split('').forEach(e=> finalResult.push(e))
        
        return {finalResult,index1,index2,simbolOrigin}
}



//Chequeo de parentesis 
function parentesis(ecc){
    let parentesis1 = ecc.indexOf('(')
    let parentesis2 = ecc.indexOf(')')
    let numbers = ''
    if(parentesis1>-1 && parentesis2>-1){
            if(ecc.indexOf('(', parentesis1+1)> -1){
                let parameters = otherParentesis(ecc)
                numbers = ecc.slice(parameters.parentesis1+1,parameters.parentesis2)
                parentesis1 = parameters.parentesis1
                parentesis2 = parameters.parentesis2

            }
    else{numbers = ecc.slice(parentesis1+1,parentesis2)}
    
        if(/[-+*/]/.test(numbers.join('')) ==  true){
           
          return {numbers,parentesis1,parentesis2}}
            else{
               
                return {numbers: numbers.join(''),parentesis1: -1}
                    }
}
    else{
        
        return {parentesis1}}


}

//Chequeo de si hay mas parentesis dentro del parentesis
function otherParentesis (array){
    for (let index = 0,start= 0; index < Infinity; index++) {
        if(index == 0){
        let find = array.indexOf('(')
            start = find
            continue;
    }
        let find = array.indexOf('(',start+1)
        if(find !== -1) start = find
    if(find == -1){
         let findBrother = array.indexOf(')',start)

         let findSister = array.lastIndexOf('(',findBrother)

        return {parentesis1: findSister,parentesis2:findBrother}
    }
}
}

function negative(eccuacion){
    


}



//

//No completado las potencias y raices
console.log((cerebro('')))

console.timeEnd('calculadora')