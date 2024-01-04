export function resolucion (c,parentesis){
    let symbol = ['+','-','/','*']
    if(c.indexOf('*') || c.indexOf('/')){
        let indexSymbol = 0
        let result = cuenta(c,indexSymbol= c.indexOf('*')>-1?c.indexOf('*'):c.indexOf('/')>-1?c.indexOf('/'):null)
        
        if(parentesis){
            if([...result.join('').matchAll(/[-/*+]/g)].length > 1){
                return {result,quitParentesis:false} 
            }
            if([...result.join('').matchAll(/[-/*+]/g)][0][0] == '-' && [...result.join('').matchAll(/[-/*+]/g)].length == 1){
                    if(/[1234567890]/.test(result[result.indexOf('-')-1]) == true){
                        return {result,quitParentesis:false}}
                    }
            if([...result.join('').matchAll(/[-/*+]/g)][0][0] == '-' && [...result.join('').matchAll(/[-/*+]/g)].length == 1){
                    if(/[1234567890]/.test(result[result.indexOf('-')-1]) == false){
                        return {result,quitParentesis:true}}
                    }
            if([...result.join('').matchAll(/[-/*+]/g)].length > 0){
                return {result,quitParentesis:false} 
            }
            if([...result.join('').matchAll(/[-/*+]/g)].length == 0){
                return {result,quitParentesis:true} 
            }    
        }
        return result
    }
}

function cuenta (c,indexSymbol){
    let numero1 = ''
    let numero2 = ''
    let result = 0

    for (let index = 1; index < Infinity; index++) {
        if(/[1234567890]/.test(c[indexSymbol-index]) == true ){numero1 += c[indexSymbol-index];continue}
        if(c[indexSymbol-index] == '-' && /[1234567890]/.test(c[indexSymbol - index-1]) == false){
            numero1 = numero1.split('')
            numero1.unshift('-')
            numero1 = numero1.join('')
        continue;}
        if(/[1234567890]/.test(c[indexSymbol-index]) == false){break;}
    }

    for (let index = indexSymbol+1; index < Infinity; index++) {
      if(/[1234567890]/.test(c[index])){numero2 += c[index]; continue}
      if(c[index] == '-' && /[1234567890]/.test(c[index-1]) == false){
       numero2=  numero2.split('')
       numero2.unshift('-')
       numero2 = numero2.join('')
        ;continue}
      if(/[1234567890]/.test(c[index]) == false ){break;}
    }

switch (c[indexSymbol]) {
    case '+':
        result = parseFloat(numero1) + parseFloat(numero2)
        break;
    case '-':
        result = parseFloat(numero1) - parseFloat(numero2)
        break;
    case '*':
        result = parseFloat(numero1) * parseFloat(numero2)
        break;
    case '/':
        result = parseFloat(numero1) / parseFloat(numero2)
    default:
        result = 'Syntax error'
        break;
}
    c.splice(0,numero1.length+numero2.length+1,result.toString().split('').map(e=>{return e}))
    c = c.flat()
    return c
}
