let number=document.querySelectorAll('[data-number]');
let operation=document.querySelectorAll('[data-opera]');
let clear=document.querySelector('[data-clear]');
let delate=document.querySelector('[data-delete]');
let equal=document.querySelector('[data-equal]');
let prevElement=document.querySelector('[data-previous]');
let currElement=document.querySelector('[data-current]');

class calculate{
    constructor(prevElement,currElement){
        this.prevElement=prevElement;
        this.currElement=currElement;
        this.clear()
    
    }
    clear(){
        this.prevOP='';
        this.currOP=''
        this.operation=undefined
    }
    delate(){
        this.currOP=this.currOP.toString().slice(0,-1)
    }
    appendNumber(num){
        if(num==='.' && this.currOP.includes('.'))return
        this.currOP=this.currOP.toString() + num.toString();
    }
    chooseOperation(operation){
        if(this.currOP==='')return
        if(this.prevOP!==''){
            this.compute()
        }
        this.operation=operation
        this.prevOP=this.currOP
        this.currOP=''


    }
    compute(){
        let computation
        let prev=parseFloat(this.prevOP)
        let curr=parseFloat(this.currOP)
        if(isNaN(prev) || isNaN(curr) )return
        switch(this.operation){
            case '+':
                computation=prev + curr
                break
            case '-':
                computation=prev - curr
                break
            case '*':
                computation=prev * curr
                break
            case '/':
                computation=prev / curr
                break  
            default:
            return          
        }
        this.currOP=computation
        this.operation=undefined
        this.prevOP=''


    }


    updateDisplay(){
    
        this.currElement.innerHTML=this.currOP
        if(this.operation!=null){
            this.prevElement.innerHTML=
            `${this.prevOP} ${this.operation}`

        }else{
            this.prevElement.innerHTML=''
        }
    }
}

// ***************************************************

const calc=new calculate(prevElement,currElement);

number.forEach((num)=>{
    num.addEventListener('click',()=>{
        calc.appendNumber(num.innerHTML)
        calc.updateDisplay();
    })
})

operation.forEach((op)=>{
    op.addEventListener('click',()=>{
        calc.chooseOperation(op.innerHTML)
        calc.updateDisplay();
    })
})

equal.addEventListener('click',()=>{
    calc.compute()
    calc.updateDisplay()
})

clear.addEventListener('click',()=>{
    calc.clear()
    calc.updateDisplay()
})

delate.addEventListener('click',()=>{
    calc.delate()
    calc.updateDisplay()

})