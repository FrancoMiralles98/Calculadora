let ejemplo = '1234a1123aa'

let reges = ejemplo.match(/\d+a+/g)

               
console.log(reges);

//\!

function regexs1 (c){
    let SymbolsIndex = [...c.matchAll(/[+/*]/g)]
    let index = SymbolsIndex[0].index
    let number1 = parseFloat(ejemplo.split('').reverse().join('').substring(ejemplo.split('').reverse().join('').indexOf(SymbolsIndex[0][0])+1).split('').reverse().join('').match(/^-?\d*/)[0])
    let number2 = parseFloat(ejemplo.substring(index+1).match(/\d*/)[0])

    console.log(number1+number2);
}

//console.log(regexs1('-22+1'));

