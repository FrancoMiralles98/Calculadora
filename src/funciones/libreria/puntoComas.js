export function puntoComas (c,negative){
    
    let result = ''
    for (let index = c.length,contador = 0,decimal = c.indexOf('.')>-1?c.indexOf('.'):c.length+1; index > -1 ; index--) {
        if(/\d/.test(c[index]) ==  true && index > decimal){result+= c[index];continue;}
        if(c[index] == '.'){result += ',';continue}
        if(/\d/.test(c[index]) == true && index < decimal && contador < 3){
            result += c[index]
            contador++
            continue;}
        if(/\d/.test(c[index]) == true && index < decimal && contador == 3 ){
            result += `.${c[index]}`
            contador = 1
            continue;
        }
}
    return  negative == true?`-${result.split('').reverse().join('')}`: result.split('').reverse().join('')
}
