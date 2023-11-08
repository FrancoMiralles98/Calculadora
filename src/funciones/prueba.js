console.time()


const cerebro = (str)=>{
    let temporalValue = 0
    
 let ecc = findParentesis(str)
    
console.log(ecc);
 for (let index = 0,currentValue = 0, exc = ecc[0]; index < 1; index++) {
 let segundoOrden = /[*/]/.test(exc)
    if(segundoOrden){
        let peticion = segundoOrdenFunction(exc)

    }
    
 }

}
console.timeEnd()




    let segundoOrdenFunction = (ecc)=>{
    
        for (let index = 0; index < 1; index++) {
            let indexMultipli = ecc.indexOf('*')
            let indexDividir = ecc.indexOf('/')
                if(indexMultipli > -1){
                    
                    let result = parseInt(ecc[indexMultipli -1]) * parseInt(ecc[indexMultipli+1])
                    
                }
        }
    }

    let fixedEcc = (ecc,grado,symbol)=>{
        if(grado = 2 && symbol=='*'){
            let primerIndice = ecc.indexOf('+',ecc.indexOf('*')) > -1?ecc.indexOf('+',ecc.indexOf('*')) : ecc.indexOf('-',ecc.indexOf('*')) >-1? ecc.indexOf('-',ecc.indexOf('*')) : null
            let segundoIndice = ecc.split('').reverse().join('').indexOf('+',ecc.indexOf('*')) > -1?ecc.split('').reverse().join('').indexOf('+',ecc.indexOf('*')) : ecc.split('').reverse().join('').indexOf('-',ecc.indexOf('*')) >-1? ecc.split('').reverse().join('').indexOf('-',ecc.indexOf('*')) : null
        console.log(primerIndice,segundoIndice);
        }
    }


let findParentesis = (str)=>{
    
    let existParentesis = str.split('').indexOf('(',0)

    if(existParentesis > -1){
        console.log('hola');
        let ecc = str.split('').slice((str.split('').indexOf('(',0))+1,str.split('').indexOf(')',0))
         return [ecc.join(''),str.split('').indexOf('(',0),str.split('').indexOf(')',0)+1]
    }
}


//console.log(cerebro('(1+1*2)*(2*2)'))
console.log(fixedEcc('1+1*2',2,'*'))