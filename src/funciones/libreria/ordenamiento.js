export function ordenamiento(c){
    let calculo = []
    let copy = ''
for (let index = 0; index < Infinity; index++) {
    if(c[index] == '-' && /[\d)]/.test(c[index-1]) == false){copy += c[index];continue}
    if(/[\d,]/.test(c[index]) == true){c[index] === ','?copy +='.':copy += c[index];continue}
    if(c[index+1] == undefined && copy.length > 0){calculo.push(copy); copy= ''}
    if(/[-+(/*)√^%]/.test(c[index]) == true){
        if(copy.length > 0){calculo.push(copy);copy = ''}
        if(/\d/.test(c[index-1]) == true && c[index] == '('){calculo.push('*');}
        calculo.push(c[index])
        continue;}
    if(c[index] == undefined){break;}
}
    let result = ordenamientoTrigonometrico(calculo,c)
    return result 
}

function ordenamientoTrigonometrico (calculo,c){
    c = c.join('')
    let numberSplice = 0
    let coincidencias = [...c.matchAll(/(cos)|(tan)|(sin)/g)]
    if(coincidencias.length == 0){return calculo}
    coincidencias.map((e)=>{
        let letter = e[0]
        let index = e.index
        calculo.splice(index-numberSplice,0,letter)
        numberSplice += 2
    })
    return calculo}