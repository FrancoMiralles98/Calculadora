import funcionesTrigonometricas from "./funcionesTrigonometricas.js"


console.time('calculadora')

const cerebro = (ecc) =>{

    let simbolos = ['-','+','*','/']
    let equation = []

    //validaciones
    ecc.split('').map(e=>{if(e !== ' ') equation.push(e)})
    for (let index = 0; index < equation.length; index++) {
        if(equation[index] == '÷') equation.splice(index,1,'/')
        if(equation[index] == '×' || equation[index] == 'x' ) equation.splice(index,1,'*')
        if(/[1234567890]/.test(equation[index]) && equation[index+1] == '(') equation.splice(index+1,0,'*')
    
    }
    //ultimos chequeos
    //si hay numeros negativos
    equation = negative(equation)
    
//comienzo del loop para realizacion del calculo
for (let index = 0; index < 7; index++) {
    
    //chequeo de parentesis
    let peticion =  parentesis(equation)

    let TrigonometrialastParentesis = 0

    // Eliminacion de parentesis
    
    if(peticion.numbers){
        if(/[-+/*]/.test(peticion.numbers) == false || peticion.numbers.length == 1){
        equation.splice(peticion.parentesis1,1)
        equation.splice(peticion.parentesis2-1,1)
       continue;}
    }
    
    //funciones trigonometricas
    /*let trinity = equation.join('').indexOf('sin')>-1 ? 'sin': equation.join('').indexOf('cos')>-1 ? 'cos': equation.join('').indexOf('tan')>-1 ?'tan': null
   
    if(equation.join('').indexOf(trinity)>-1 && equation[equation.join('').indexOf(trinity)+3] !== '('){
         equation =  funcionesTrigonometricas(equation,equation.join('').indexOf(trinity)+3,trinity, )
    
    }*/

    //Envio del resultado de la cuenta
    
    if(equation.length == 1 || equation.some(e=> simbolos.includes(e)) == false ){
        
        if(equation.join('') == 'NaN') return 'syntax error'
        return parseFloat(equation.join(''))
    }
    
    //Realizacion de la cuenta con parentesis
    if(peticion.parentesis1 !== -1){
        
        let result = operations(peticion);
    
        let sizeSplice = result.index1 + result.index2 +1
        
        let searchSecondOrden = equation.indexOf(`${result.simbolOrigin}`,peticion.parentesis1)
        equation.splice(searchSecondOrden - result.index1, sizeSplice , result.finalResult)
        equation = equation.flat();
        
        continue;
    }
    
    //realizacion de la cuenta sin parentesis
    if(peticion.parentesis1 == -1){
        let result = operations({numbers:equation})
        
        let sizeSplice = result.index1 + result.index2 +1
        let searchSecondOrden = equation.indexOf(`${result.simbolOrigin}`)
        equation.splice(searchSecondOrden- result.index1,sizeSplice,result.finalResult)
        equation = equation.flat();
        
    }}
}

//Enviar los tipo de operaciones e indices a la funcion
 export function operations({numbers}){
   
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
export function ordenOperation(numbers, origin){
    
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
                
                if(number1.length > 0 && number1.split('').indexOf('-')> -1){
                    index1 = 1
                    break;
                }
                else{number1 = number1.length >= 0? number1.split('').reverse().join(''): number1}
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
        if(parcialResult.toFixed(2).toString().split('').indexOf('-') > -1){finalResult.push(parcialResult.toString())}
         else{parcialResult.toString().split('').forEach(e=> finalResult.push(e))}
    
        return {finalResult,index1,index2,simbolOrigin}
}



//Chequeo de parentesis 
function parentesis(ecc){
    let parentesis1 = ecc.indexOf('(')
    if(parentesis1 == -1){return {parentesis1:-1}}
    if(parentesis1 > -1){
        let chequeo1 = ecc.indexOf('(', parentesis1+1)
        let chequeo2 = ecc.indexOf(')', parentesis1 +1)
        
            if(chequeo1 < chequeo2 ){
                let result = otherParentesis(ecc)
                return result}
    }
    let parentesis2 = ecc.indexOf(')')

    if(parentesis1>-1 && parentesis2>-1){
       let numbers = ecc.slice(parentesis1+1,parentesis2)
    
        if(numbers.length > 1){
            return {numbers,parentesis1,parentesis2}
        }
            else{
            return {numbers: numbers,parentesis1,parentesis2}}
}}

//Chequeo de si hay mas parentesis dentro del parentesis
function otherParentesis (array){
    let finish = 0
    let start = 0
    for (let index = 0; index < Infinity; index++) {
        
            let valor = array[index]
            if(valor == '('){start = index}
            if(valor == ')'){finish = index
                break;
            }
        }
    let object = {numbers:array.slice(start+1,finish),parentesis1:start,parentesis2:finish}
    if(object.numbers.length == 1){
        object.cut = true
        return object
    }
    else{ return object}
}

// chequeo de negativos
function negative(eccuacion){
    let result = []
    let counter = 0
    let negativenumber = '-'
    eccuacion.map((e,i)=>{
        if(counter > 0 && /[1234567890]/.test(e) == true){
            negativenumber += e
            return
        }
        if(counter > 0 && /[1234567890]/.test(e) == false){
            result.push(negativenumber)
            counter = 0

        }
        if(e !== '-') {return result.push(e)}
            else if(/[1234567890]/.test(eccuacion[i-1]) == false){
                counter++
            }
            else{result.push(e)}
    })
    return result
}
//

//Arreglar el tema de la funcion parentesis, y otherParentesis
//Terminar las funciones trigonometricas
//Documentar lo mas posible los pasos
//Pensar las Raices y las potencias
//2*(6+3)+(40+1)
console.log((cerebro('2*(2+5)-55')))

console.timeEnd('calculadora')