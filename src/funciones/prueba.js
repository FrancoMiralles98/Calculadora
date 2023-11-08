console.time()


const cerebro = (str)=>{
    let temporalValue = 0
    
 let ecc = findParentesis(str)
    

 for (let index = 0,currentValue = 0; index < Infinity; index++) {
    
    
    
 }

}
console.timeEnd()








let findParentesis = (str)=>{
    
    let existParentesis = str.split('').indexOf('(',0)

    if(existParentesis > -1){
        console.log('hola');
        let ecc = str.split('').slice((str.split('').indexOf('(',0))+1,str.split('').indexOf(')',0))
         return [ecc.join(''),str.split('').indexOf('(',0),str.split('').indexOf(')',0)+1]
    }
}


console.log(cerebro('(1+1)*(2*2)'))