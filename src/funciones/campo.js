export function resolucion (c){
    if(c.length == 1){return{numbers:c,index:0}}

    let index
    let indexSymbols = [...c.matchAll(/\d-\d|[+/√^*]|(sin)|(cos)|(tan)/g)]
    if(indexSymbols.findIndex(e=>e[0] =='cos'| e[0] =='sin'| e[0] =='tan')>-1){let result = operacionTrigonometrica(c,index = c.index)}
    if(indexSymbols.findIndex(e=>e[0] =='√'| e[0] =='^') > -1){console.log('hola primero');}
    if(indexSymbols.findIndex(e=>e[0] =='/'| e[0] =='*') > -1){console.log('hola segundo');}
    if(indexSymbols.findIndex(e=>e[0].indexOf('-') > -1| e[0] =='+') > -1){console.log('hola tercero');}
}

function aritmetica (c,index){

    let result= 0
    let number1 = parseFloat(c[index-1])
    let number2 = parseFloat(c[index+1])

    switch (c[index]) {
        case '√': result = Math.sqrt(number2)
            break;
        case '^': result = Math.pow(number1,number2)
            break;
        case '+': result = number1 + number2
            break;
        case '-': result = number1 - number2
                break;
        case '*': result = number1 * number2
                break;
        case '/': result = number1 / number2
                break;
        default:
            break;
        }
    if(c[index] == '√'){
        c.splice(index,2,result)
        return {numbers:c,index}
    }
    c.splice(index-1,3,result)
    return {numbers: c,index}
}

function operacionTrigonometrica (c,index){
    
    let result = 0
    let number = c[index+1]
    let trinity = c.splice(index,1).join('')
    
    switch (trinity) {
        case 'cos': result = Math.cos(number)
            break;
        case 'tan': result = Math.tan(number)
            break;
        case 'sin': result = Math.sin(number)
            break;
        default:
            break;
    }
        c.splice(index,1,result)
        return {numbers:c}
    }


console.log(resolucion('cos40'));

//\