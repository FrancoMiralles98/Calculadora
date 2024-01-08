export function resolucion (c){
    if(c.length == 1){
        let numbers = c;let index= 0;return{numbers,index}}
    let segundoGrado = c.indexOf('*') > -1?c.indexOf('*'): c.indexOf('/') > -1?c.indexOf('/'): -1
    if(segundoGrado > -1){let result = aritmetica(c,segundoGrado);return result }
    
    let tercerGrado = c.indexOf('-') > -1?c.indexOf('-'): c.indexOf('+') > -1?c.indexOf('+'): -1
    if(tercerGrado > -1){let result = aritmetica(c,tercerGrado);return result }
}

function aritmetica (c,index){
    
    let result= 0
    let number1 = parseFloat(c[index-1])
    let number2 = parseFloat(c[index+1])
    switch (c[index]) {
        case '+':
                result = number1 + number2
            break;
        case '-':
                result = number1 - number2
                break;
        case '*':
                result = number1 * number2
                break;
        case '/':
                result = number1 / number2
                break;
        default:
            break;
    } 
    c.splice(index-1,3,result)
    return {numbers: c,index}
}
