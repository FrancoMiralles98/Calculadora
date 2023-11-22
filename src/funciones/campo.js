let ecc = '(2+1(3*1))'


function buscar(array){

    let result = hola(array.split(''))

   let equation =  {numbers:array.slice(result.parentesis1+1,result.parentesis2),parentesis1:result.parentesis1,parentesis2:result.parentesis2}
    console.log(equation);
}



function hola (array){
    for (let index = 0,start= 0; index < Infinity; index++) {
            if(index == 0){
            let find = array.indexOf('(')
                start = find
                continue;
        }
            let find = array.indexOf('(',start+1)
            if(find !== -1) start = find
        if(find == -1){
             let findBrother = array.indexOf(')',start)
    
             let findSister = array.lastIndexOf('(',findBrother)
    
            return {parentesis1: findSister,parentesis2:findBrother}
        }
    }


    
    
    }
console.log(buscar('(2+1(3*1+(2+2)))'));