const previousValue=document.getElementById('previousValue')
const currentValue = document.getElementById('currentValue')
const historyValues=document.getElementById('historyValues')
const allClear=document.getElementById('allClear');
const deleteValue=document.getElementById('deleteValue');
const historyClear=document.getElementById('historyClear');
const equalTo=document.getElementById('equalTo');
const numberValue=document.querySelectorAll('[number-value]');
const operatorValue=document.querySelectorAll('[operator-value]');



class Calculator{
    constructor(previousValue,currentValue){
        this.previousValue=previousValue;
        this.currentValue=currentValue;
        this.clear();
    }

    clear(){
        this.currentOperation='';
        this.previousOperation='';
        this.operation=undefined;
    }

    delete(){
        this.currentOperation=this.currentOperation.toString().slice(0,-1);
    }

    appendNumber(number){
        if (number=='.'&& this.currentOperation.includes('.')) return
        this.currentOperation=this.currentOperation.toString()+number.toString();
        console.log(this.currentOperation)
    }

    selectOperation(operation){
        if(this.currentOperation==='') return
        if(this.previousOperation!==''){
            this.compute()
        }
        this.operation=operation;
        this.previousOperation=this.currentOperation;
        this.currentOperation='';

    }

    compute(){
        let calculation;
        const previous=parseFloat(this.previousOperation);
        const current = parseFloat(this.currentOperation);
        
        if(isNaN(previous) || isNaN(current)) return

        switch(this.operation){
            case '+':
                calculation = previous + current;
                break
            case '-':
                calculation = previous - current ;
                break
            case 'X':
                calculation = previous * current;
                break
            case '/':
                calculation = previous / current;
                break
            case '^':
                calculation = previous ** current; 
                break
            default:
                return
            
        }
        this.currentOperation=calculation;
        console.log(calculation)
        this.operation=undefined;
        this.previousOperation='';
    }

    getDisplayNumber(number){
        const numberString=number.toString();
        const integerDigits=parseFloat(numberString.split('.')[0]);
        const decimalDigits=numberString.split('.')[1];

        let displayInteger;
        if(isNaN(integerDigits)){
            displayInteger=''
        }
        else{
            displayInteger=integerDigits.toLocaleString('en',{
                maximumFractionDigits:0
            })
        }

        if(decimalDigits!=null){
            return `${displayInteger}.${decimalDigits}`
        }
        else{
            return displayInteger
        }
    }

    updateDisplay(){
        this.currentValue.innerText=this.getDisplayNumber(this.currentOperation);
        if (this.operation!=null){
            this.previousValue.innerText=`${this.getDisplayNumber(this.previousOperation)} ${this.operation}`;
            this.historyElement=`${this.previousValue.innerText} ${this.currentValue.innerText}`
        }
        else{
            this.previousValue.innerText=''
        }

        this.result=this.currentValue.innerText;
    }

    shoWHistory(){
        let finalResult=`${this.historyElement} = ${this.result}`;
        let listElement=document.createElement('li');
        listElement.textContent=finalResult;
        historyValues.appendChild(listElement)

    }
    clearHistory(){
        historyValues.innerHTML=''
    }


}







const calculatorObj=new Calculator(previousValue,currentValue);




numberValue.forEach(ele=>{
    ele.addEventListener('click', function(){
        calculatorObj.appendNumber(ele.innerText);
        calculatorObj.updateDisplay();

    })
})

operatorValue.forEach(ele=>{
    ele.addEventListener('click', function(){
        console.log(ele.innerText)
        calculatorObj.selectOperation(ele.innerText);
        calculatorObj.updateDisplay();

    })
})

equalTo.addEventListener('click',function(){
    calculatorObj.compute();
    calculatorObj.updateDisplay();
    calculatorObj.shoWHistory();

})

allClear.addEventListener('click',function(){
    calculatorObj.clear();
    calculatorObj.updateDisplay();

})

deleteValue.addEventListener('click',function(){
    calculatorObj.delete();
    calculatorObj.updateDisplay();
})

historyClear.addEventListener('click',function(){
    calculatorObj.clearHistory()
})
