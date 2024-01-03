 

 let funcionesTrigonometricas = (equation,numberIndex,trinity)=>{
    console.log(equation,numberIndex,trinity);
    let number = ''
    let ifnegative = '-'
    let result = 0
    for (let index = numberIndex; index < equation.length; index++) {
        if(/[0123456789]/.test(equation[index]) == true){
            number += equation[index]}
        else{ break;}}
           
        switch (trinity) {
            case 'sin':
                result = Math.sin(parseFloat(number)).toFixed(2)
                break;
            case 'tan':
            result = Math.tan(parseFloat(number)).toFixed(2)
                break;
            case 'cos':
            result = Math.cos(parseFloat(number)).toFixed(2)
                break;
            default:
                break;}
        equation.splice(numberIndex-3,number.length+3,`${result}`)

        return equation
    }
    
 
 
export default funcionesTrigonometricas