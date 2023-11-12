console.time()


const cerebro = (ecc) =>{
for (let index = 0; index < 1; index++) {
    let peticion =  parentesis(ecc)
    if(peticion !== -1){
        let result = operations(peticion)

    }
    
    
}
  

}

function operations({numbers}){
    let searchSegundoOrden = numbers.split('').includes('*') == true? numbers.split('').indexOf('*') : numbers.split('').includes('/') == true? numbers.split('').indexOf('/'): false
    if(searchSegundoOrden !== false){
        segundoOrden(numbers,searchSegundoOrden)
    }
}


function segundoOrden(numbers, origin){
    let simbolos = ['+','-','*','/','(',')']
    let reverse = numbers.split('').reverse().join('')
    let number1 = ''
    let number2 = ''
    let index1 = ''
    let index2= ''
    let result = ''
        for (let index = 1; index < 3; index++) {
            if(numbers[origin+index] !== undefined && simbolos.includes(numbers[origin+index]) == false){
            number2 += numbers[origin+index]}
            
            if(reverse[origin+index] !== undefined && simbolos.includes(reverse[origin+index]) == false){
                number1 += reverse[origin+index]}
            
                if((numbers[origin+index] == undefined || simbolos.includes(numbers[origin+index]) == true) && (reverse[origin+index] == undefined || simbolos.includes(reverse[origin+index]) == true)){
                    index1=number1.length
                    index2= number2.length
                    break;
                }
        }
        if(numbers[origin] == '*'){
            result = parseInt(number1) * parseInt(number2)
        }
        if(numbers[origin] == '/'){
            result= parseInt(number1) / parseInt(number2)
        }
        console.log(result);
}




function parentesis(ecc){
    let parentesis1 = ecc.split('').indexOf('(')
    let parentesis2 = ecc.split('').indexOf(')')
    if(parentesis1>-1 && parentesis2>-1){
    let numbers = ecc.slice(parentesis1+1,parentesis2)
        return {numbers,parentesis1,parentesis2}
}
    else{return -1}
}


console.log(cerebro('(1+1*22)'));