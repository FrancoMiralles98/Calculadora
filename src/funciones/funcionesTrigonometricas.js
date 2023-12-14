 let result = '32+(sin(3+1))+1'

 function funcionesTrigonometricas(ecuacion){



    if(/(sin)/.test(ecuacion.join('')) == true){
    let sinIndex = ecuacion.join('').indexOf('sin')+3
    let indexSymbols = ecuacion.length
    ecuacion.slice(sinIndex,ecuacion.length).find((e,i)=>{if (/[)(]/.test(e)== true) { return indexSymbols = i}})
    let sinNumber = ecuacion.slice(sinIndex+1,sinIndex+indexSymbols)
    console.log(sinNumber);
    let result = Math.sin(parseInt(sinNumber.join(''))).toFixed(2)
    
       
}
    
}

funcionesTrigonometricas(result.split(''))

export default funcionesTrigonometricas