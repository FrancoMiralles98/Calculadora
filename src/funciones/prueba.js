import funcionesTrigonometricas from "./funcionesTrigonometricas.js"

console.time('calculadora')

const cerebro = (ecc) =>{

    let simbolos = ['-','+','*','/']
    let equation = []

    ecc.split('').map(e=>{if(e !== ' ') equation.push(e)})
    for (let index = 0; index < equation.length; index++) {
        if(equation[index] == '÷') equation.splice(index,1,'/')
        if(equation[index] == '×' || equation[index] == 'x' ) equation.splice(index,1,'*')
        if(/[1234567890]/.test(equation[index]) && equation[index+1] == '(') equation.splice(index+1,0,'*')
    }
    equation = negative(equation)

for (let index = 0; index < 5; index++) {
    
    let peticion =  parentesis(equation)
    let TrigonometrialastParentesis = 0

    if(peticion.numbers){
        if(/[-+/*]/.test(peticion.numbers) == false || peticion.numbers.length == 1){
        equation.splice(peticion.parentesis1,1)
        equation.splice(peticion.parentesis2-1,1)
        continue;
       }
    }
    
    let trinity = equation.join('').indexOf('sin')>-1 ? 'sin': equation.join('').indexOf('cos')>-1 ? 'cos': equation.join('').indexOf('tan')>-1 ?'tan': -1
   if(trinity !== -1){
    
    if(equation[equation.join('').indexOf(trinity)+3] !== '('){
        console.log(equation);
        console.log(trinity,equation.join('').indexOf(trinity));
         equation =  funcionesTrigonometricas(equation,equation.join('').indexOf(trinity)+3,trinity)}
        }

    if(equation.length == 1 || equation.some(e=> simbolos.includes(e)) == false ){
        
        if(equation.join('') == 'NaN') return 'syntax error'
        return parseFloat(equation.join(''))
    }
    
    if(peticion.parentesis1 !== -1){
        let result = operations(peticion);
        let sizeSplice = result.index1 + result.index2 +1
        let searchSecondOrden = equation.indexOf(`${result.simbolOrigin}`,peticion.parentesis1)
        equation.splice(searchSecondOrden - result.index1, sizeSplice , result.finalResult)
        equation = equation.flat();
        continue;
    }
    
    if( trinity !== -1){
        continue;}
    else{
    if(peticion.parentesis1 == -1){
        let result = operations({numbers:equation})
        let sizeSplice = result.index1 + result.index2 +1
        let searchSecondOrden = equation.indexOf(`${result.simbolOrigin}`)
        equation.splice(searchSecondOrden- result.index1,sizeSplice,result.finalResult)
        equation = equation.flat();
        
    }}} 
}

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
    let searchTercerOrden = numbers.includes('-') ==true?numbers.indexOf('-') : numbers.includes('+') == true? numbers.indexOf('+') : false
    if(searchTercerOrden !== false){
        let peticion = ordenOperation(numbers,searchTercerOrden)
        return peticion
    }}

export function ordenOperation(numbers, origin){

    let simbolos = ['+','-','*','/','(',')','^']
    let number1 = ''
    let number2 = ''
    let index1 = ''
    let index2= ''
    let parcialResult = 0
    let finalResult = []
    let simbolOrigin = ''
    
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

        for (let index = 1; index < Infinity; index++) {
            if(numbers[origin+index] !== undefined && simbolos.includes(numbers[origin+index]) == false){
                number2 += numbers[origin+index]}
                
                if(numbers[origin+index] == undefined || simbolos.includes(numbers[origin+index]) == true){
                    index2 =number2.length
                    break;
                }}
    
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

function otherParentesis (array){
    let finish = 0
    let start = 0

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

function negative(eccuacion){
    let result = [] 
    let count = 0 //contador, si hay un numero negativo su valor cambia a 1, cuando terminde el numero, vuelve a 0
    let negativenumber = '-'
    eccuacion.map((e,i)=>{
       if(count > 0 && /[1234567890]/.test(e)== false){
            result.push(negativenumber)
            result.push(e)
            count = 0
            negativenumber ='-'
            return
        }
       if(e == '-' && /[1234567890)]/.test(eccuacion[i-1]) == false){
          return  count++
        }
        if(count > 0 && /[1234567890]/.test(e)== true){
            return  negativenumber += e
        }
        if(count == 0){result.push(e)}
      })
    return result
}


//Terminar las funciones trigonometricas
//Pensar las Raices y las potencias
//-2+3*32+(4/3-22+55)/(12+21)-1
console.log((cerebro('sin(3+1)+cos(3)')))

console.timeEnd('calculadora')

