export function resolucion (c){
let arraySymbols = ['-','+','*','/']
let number1 = ''
let number2 = ''
let symbol = 0
let result = 0
    for (let index = 0; index <Infinity; index++) {
        if(index == 0 && c[index] == '-'){number1 += '-';continue;}
        if(/[1234567890]/.test(c[index]) == true){number1 += c[index];continue;}
        if(arraySymbols.includes(c[index]) && /[1234567890]/.test(c[index-1]) == true){symbol = index+1 ;break;}
        if(c[index] == undefined){break;}
    }
    for (let index = symbol; index < Infinity; index++) {
        console.log(/[1234567890]/.test(c[index]))
        if(/[1234567890]/.test(c[index])){number2 += c[index];continue;}
        if(arraySymbols.includes(c[index]) && /[1234567890]/.test(c[index-1]) == true){break;}
        if(c[index] == undefined){break;}
    }
    console.log('number2',number2);
switch (c[symbol]) {
    case '+':
        result = parseFloat(number1) + parseFloat(number2)
        break;
    case '-':
        result = parseFloat(number1) - parseFloat(number2)
        break;
    case '*':
        result = parseFloat(number1) * parseFloat(number2)
        break;
    case '/':
        result = parseFloat(number1) / parseFloat(number2)
    default:
        result = 'Syntax error'
        break;
}
    console.log(result);
    c.splice(0,number1.length+number2.length+1,result)

    console.log(c);

}