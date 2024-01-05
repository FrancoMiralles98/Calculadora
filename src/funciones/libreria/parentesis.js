export function parentesis (c){

    let find1Index = c.indexOf('(')
    if(find1Index == -1){return {parentesis:false}}
    else{
        if(c.indexOf('(',find1Index+1) > -1){
            let result = otherParentesis(c)
            return result}}
        return {numbers:c.slice(find1Index+1,c.indexOf(')')),p_inicio: find1Index,p_final: c.indexOf(')'),parentesis:true}
}

function otherParentesis (c){
    let p_inicio = 0
    let p_final = 0
    for (let index = 0; index < c.length; index++) {
        if(c[index] == '('){p_inicio = index}
        if(c[index] == ')'){p_final = index; break;}
    }
    return {numbers:c.slice(p_inicio+1,p_final),p_inicio,p_final,parentesis:true}
}