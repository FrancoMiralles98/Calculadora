 export function parentesis (c){
    let searchIndexInicioParentesis = c.indexOf('(')
    if(searchIndexInicioParentesis == -1){
        return {c,searchIndexInicioParentesis: false}
    }
    else{
        if(searchIndexInicioParentesis > -1){
           let searchIndexInicioParentesis2 = c.indexOf('(',searchIndexInicioParentesis +1)
            if(searchIndexInicioParentesis2 > -1){
                let result = otherParentesis(c,searchIndexInicioParentesis2)
                return result
            }
            else{
                return {numbers:c.slice(searchIndexInicioParentesis+1,c.indexOf(')')),searchIndexInicioParentesis,searchIndexFinalParentesis:c.indexOf(')')}
            }
        }
    }
}


 function otherParentesis(c){
    let parentesis1 = 0
    let parentesis2 = 0

    for (let index = 0; index < array.length; index++) {
        if(c[index] == '('){parentesis1 = index}
        if(c[index] == ')'){parentesis2 = index; break;}
    }
return {numbers:c.slice(parentesis1+1,parentesis2),parentesis1,parentesis2}
}