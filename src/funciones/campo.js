function ordenOperation(numbers, origin){
    
    let simbolos = ['+','-','*','/','(',')']
    let number1 = ''
    let number2 = ''
    let index1 = ''
    let index2= ''
    let parcialResult = 0
    let finalResult = []
    let simbolOrigin = ''
    
        for (let index = 1; index < Infinity; index++) {
            if(numbers[origin-index] !== undefined && simbolos.includes(numbers[origin-index]) == false){
                number1 += numbers[origin-index]}


            if(numbers[origin-index] == undefined || simbolos.includes(numbers[origin-index]) == true){
                index1= number1.length
                number1 = number1.length >= 0? number1.split('').reverse().join(''): number1
                break;
            }
        }


        for (let index = 1; index < Infinity; index++) {
            if(numbers[origin+index] !== undefined && simbolos.includes(numbers[origin+index]) == false){
                number2 += numbers[origin+index]}
                
                if(numbers[origin+index] == undefined || simbolos.includes(numbers[origin+index]) == true){
                    index2 =number2.length
                    break;
                }
            }
        
       
        switch (numbers[origin]) {
            case '*':
                simbolOrigin = '*'
                parcialResult = parseInt(number1) * parseInt(number2)
                break;
            case '/':
                simbolOrigin = '/'
                parcialResult= parseInt(number1) / parseInt(number2)
                break;
            case '+':
                simbolOrigin = '+'
                parcialResult= parseInt(number1) + parseInt(number2)
                
                break;
            case '-':
                simbolOrigin = '-'
                parcialResult =  parseInt(number1) - parseInt(number2)
                break;
            default:
                break;
        }
         parcialResult.toString().split('').forEach(e=> finalResult.push(e))
        
        return {finalResult,index1,index2,simbolOrigin}
}

console.log(ordenOperation('3+10*2+1',4))