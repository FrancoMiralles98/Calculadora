import funcionesTrigonometricas from "./funcionesTrigonometricas.js"


console.time('calculadora')

const cerebro = (ecc) =>{

    let simbolos = ['-','+','*','/']
    let equation = []

    //validaciones
    ecc.split('').map(e=>{if(e !== ' ') equation.push(e)})
    for (let index = 0; index < equation.length; index++) {
        //Cambiar los simbolos por los signos que se usa en js
        if(equation[index] == '÷') equation.splice(index,1,'/')
        if(equation[index] == '×' || equation[index] == 'x' ) equation.splice(index,1,'*')
        if(/[1234567890]/.test(equation[index]) && equation[index+1] == '(') equation.splice(index+1,0,'*')
    }
    //ultimos chequeos
    //si hay numeros negativos
    equation = negative(equation)

//comienzo del loop para realizacion del calculo
for (let index = 0; index < Infinity; index++) {
    
    //chequeo de parentesis
    let peticion =  parentesis(equation)

    let TrigonometrialastParentesis = 0

    // Eliminacion de parentesis
    if(peticion.numbers){
        //si no se encuentra ningun simbolo , si es un numero positivo, o si el largo del array es de 1 , en caso de ser un numero negativo
        if(/[-+/*]/.test(peticion.numbers) == false || peticion.numbers.length == 1){
        equation.splice(peticion.parentesis1,1)
        equation.splice(peticion.parentesis2-1,1)
       continue;}
    }
    
    //funciones trigonometricas
    let trinity = equation.join('').indexOf('sin')>-1 ? 'sin': equation.join('').indexOf('cos')>-1 ? 'cos': equation.join('').indexOf('tan')>-1 ?'tan': null
   
    if(equation.join('').indexOf(trinity)>-1 && equation[equation.join('').indexOf(trinity)+3] !== '('){
         equation =  funcionesTrigonometricas(equation,equation.join('').indexOf(trinity)+3,trinity, )
    
    }

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
   //se busca de izquierda a derecha si se encuentra un simbolo para  luego mandarlo a "ordenOperation" y realizar la operacion
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
    let searchTercerOrden = numbers.includes('-') ==true?numbers.indexOf('-') : numbers.includes('+') == true? numbers.indexOf('+') : false
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
    //los index son el largo que tiene los numeros usados, para luego utilizarlos en el ".splice"
    let index1 = ''
    let index2= ''
    let parcialResult = 0
    let finalResult = []
    let simbolOrigin = ''
    
        // ciclo para escribir el number1 
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
            }}

        // ciclo para escribir el number2
        for (let index = 1; index < Infinity; index++) {
            if(numbers[origin+index] !== undefined && simbolos.includes(numbers[origin+index]) == false){
                number2 += numbers[origin+index]}
                
                if(numbers[origin+index] == undefined || simbolos.includes(numbers[origin+index]) == true){
                    index2 =number2.length
                    break;
                }
            }
        
        //Realizacion de los operaciones segun el "origin", el tipo de simbolo que tiene
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
        // si el resultado es negativo se se manda el numero como un solo indice, si el numero es positivo , se manda cada digito por separado
        if(parcialResult.toFixed(2).toString().split('').indexOf('-') > -1){finalResult.push(parcialResult.toString())}
         else{parcialResult.toString().split('').forEach(e=> finalResult.push(e))}
        
        return {finalResult,index1,index2,simbolOrigin}
}



//Chequeo de parentesis 
function parentesis(ecc){
    let parentesis1 = ecc.indexOf('(')
    //si no se encuentra parentesis retorna -1
    if(parentesis1 == -1){return {parentesis1:-1}}
    if(parentesis1 > -1){
        //si hay parentesis , chequeo si tiene mas de un parentesis dentro del mismo
        let chequeo1 = ecc.indexOf('(', parentesis1+1)
        let chequeo2 = ecc.indexOf(')', parentesis1 +1)
            // si existe posterior a parentesis1 va a "otherParentesis" para identificar si existe parentesis dentro de otros
            if(chequeo1 < chequeo2 ){
                let result = otherParentesis(ecc)
                return result}
    }
    let parentesis2 = ecc.indexOf(')')
    //si existe parentesis individuales se corta de al array 
    if(parentesis1>-1 && parentesis2>-1){
       let numbers = ecc.slice(parentesis1+1,parentesis2)
        //si el parentesis ya esta resuleto y solo tiene el resultado de la operacion , se manda a la funcion para sacar los parentesis
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
    //bucle donde va tomando los indices de los parentesis, hasta que encuentre el primer cierre del parentesis
    for (let index = 0; index < Infinity; index++) {
            let valor = array[index]
            if(valor == '('){start = index}
            if(valor == ')'){finish = index
                break;}
        }

    let object = {numbers:array.slice(start+1,finish),parentesis1:start,parentesis2:finish}
    if(object.numbers.length == 1){
        object.cut = true
        return object}

    else{ return object}
}

// chequeo de negativos
function negative(eccuacion){
    let result = [] //donde ira todo el array de ecuacion con sus cambios
    let count = 0 //contador, si hay un numero negativo su valor cambia a 1, cuando terminde el numero, vuelve a 0
    let negativenumber = '-'//donde se ira acoplando el numero para posteriormente empujarlo al array "result"
    //recorre todo la array de la ecuacion
    eccuacion.map((e,i)=>{
        //si el contador es mayor a 0 , es decir se estaba escribiendo el numero negativo y el "e" es diferente a un numero
        //se empuja el numero negativo al array de "result" luego la del "e" en cuestion, count pasa a 0 y negativenumber  '-'
        if(count > 0 && /[1234567890]/.test(e)== false){
            result.push(negativenumber)
            result.push(e)
            count = 0
            negativenumber ='-'
            return
        }
        //si el e es "-" y su valor anterior no es un numero o el cierre de un parentesis count pasa a 1 para empezar el acoplado del numero negativo
        if(e == '-' && /[1234567890)]/.test(eccuacion[i-1]) == false){
          return  count++
        }
        // si count es 1 y "e" es un numero se sumara al negativenumber
        if(count > 0 && /[1234567890]/.test(e)== true){
            return  negativenumber += e
        }
        //si count es 0 , se sumara directamente al array "result"
        if(count == 0){result.push(e)}
      })
    return result
}


//Terminar las funciones trigonometricas
//Pensar las Raices y las potencias
//-2+3*32+(4/3-22+55)/(12+21)-1
console.log((cerebro('sin(3+1)')))

console.timeEnd('calculadora')

