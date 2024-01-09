
export function ordenamiento(c){
    let calculo = []
    let copy = ''
for (let index = 0; index < Infinity; index++) {
    if(c[index] == '-' && /[1234567890)]/.test(c[index-1]) == false){copy += c[index];continue}
    if(/[1234567890.]/.test(c[index]) == true){copy += c[index];continue}
    if(c[index+1] == undefined && copy.length > 0){calculo.push(copy); copy= ''}
    if(/[-+(/*)√^]/.test(c[index]) == true){
        if(copy.length > 0){calculo.push(copy);copy = ''}
        if(/[1234567890]/.test(c[index-1]) == true && c[index] == '('){calculo.push('*');}
        calculo.push(c[index])
        continue;}
    if(c[index] == undefined){break;}
    }
    let result = ordenamientoTrigonometrico(calculo,c)
    
    return result 
}


function ordenamientoTrigonometrico (calculo,c){
    c = c.join('')
    let trinity = c.indexOf('sin')>-1?c.indexOf('sin'):c.indexOf('cos')>-1?c.indexOf('cos'):c.indexOf('tan')>-1?c.indexOf('tan'):-1
    if(trinity == -1){return calculo}
    else{
        for (let index = 0,indexTrinity=0; index < 10; index++) {
            indexTrinity = c.indexOf('sin',index)>-1?c.indexOf('sin',index):c.indexOf('cos',index)>-1?c.indexOf('cos',index):c.indexOf('tan',index)>-1?c.indexOf('tan',index):-1
            if(indexTrinity == -1){break;}
            else{
                let letters = c.slice(indexTrinity,3)
                calculo.splice(indexTrinity,0,letters)}
}}
    return calculo
}