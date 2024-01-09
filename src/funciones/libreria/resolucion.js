export function resolucion (c){
    if(c.length == 1){
        let numbers = c;let index= 0;return{numbers,index}}
    
    let Trigonometricas = c.join('').indexOf('sin') > -1?c.join('').indexOf('sin'): c.join('').indexOf('cos') > -1?c.join('').indexOf('cos'):c.join('').indexOf('tan') > -1?c.join('').indexOf('tan'): -1
    if(Trigonometricas > -1){let result = operacionTrigonometrica(c,Trigonometricas);return result }    

    let PrimerGrado = c.indexOf('√') > -1?c.indexOf('√'): c.indexOf('^') > -1?c.indexOf('^'): -1
    if(PrimerGrado > -1){let result = aritmetica(c,PrimerGrado);return result }
        
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
        case '√':
                result = Math.sqrt(number2)
            break;
        case '^':
                result = Math.pow(number1,number2)
            break;
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
    case 'cos':
            result = Math.cos(number)
        break;
    case 'tan':
            result = Math.tan(number)
        break;
    case 'sin':
            result = Math.sin(number)
        break;
    default:
        break;
}
    c.splice(index,1,result)
    
    return {numbers:c}
}