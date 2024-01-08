
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
    if(c[index] == undefined){break;}}

    return calculo 
}
