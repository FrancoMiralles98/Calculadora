console.time()


const cerebro = (ecc) =>{
    let equation = ecc.split('')
for (let index = 0; index < 4; index++) {

    let peticion =  parentesis(equation)

    if( peticion.numbers && typeof peticion.numbers == 'string'){
        equation.splice(equation.indexOf('('),1)
        equation.splice(equation.indexOf(')'),1)
        continue;
    }

    if(/[+ - * /]/.test(equation) == false){
        
        return parseInt(equation.join(''))}
    


    if(peticion.parentesis1 !== -1){
        let result = operations(peticion)
        
        let sizeSplice = result.index1 + result.index2 +1
        
        let searchSecondOrden = equation.indexOf(`${result.simbolOrigin}`,peticion.parentesis1)
        
        equation.splice(searchSecondOrden - result.index1, sizeSplice , result.finalResult)
        equation = equation.flat()
        continue;
    }
    
    if(peticion.parentesis1 == -1){
        let result = operations(equation)
    }

    
    

}
  

}

function operations({numbers}){
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


function ordenOperation(numbers, origin){
    
    let simbolos = ['+','-','*','/','(',')']
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
        
           

        switch (numbers[origin]) {
            case '*':
                simbolOrigin = '*'
                parcialResult = parseInt(number1) * parseInt(number2)
                break;
            case '/':
                simbolOrigin = '/'
                parcialResult= parseInt(number1) / parseInt(number2)
                break;
            case '+':
                simbolOrigin = '+'
                parcialResult= parseInt(number1) + parseInt(number2)
                
                break;
            case '-':
                simbolOrigin = '-'
                parcialResult =  parseInt(number1) - parseInt(number2)
                break;
            default:
                break;
        }
         parcialResult.toString().split('').forEach(e=> finalResult.push(e))
        
        return {finalResult,index1,index2,simbolOrigin}
}




function parentesis(ecc){
    let parentesis1 = ecc.indexOf('(')
    let parentesis2 = ecc.indexOf(')')

    if(parentesis1>-1 && parentesis2>-1){
    let numbers = ecc.slice(parentesis1+1,parentesis2)
        if(/[+ - * /]/.test(numbers.join('')) ==  true){
          return {numbers,parentesis1,parentesis2}}
            else{
                return {numbers: numbers.join(''),parentesis1: -1}
                    }
}
    else{return {parentesis1}}
}


console.log((cerebro('(3+10*2)')))