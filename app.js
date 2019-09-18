//BUDGET CONTROLLER
var budgetController =(function(){
    
})();




//UI CONTROLLER
var UIController = (function(){

    var DOMtrings = {
        inputType:'.add__type',
        inputDesription:'.add__description',
        inputValue:'.add__value'
    };
    
    return{
        getinput: function(){

            return{

                type : document.querySelector(DOMtrings.inputType).value,
                description : document.querySelector(DOMtrings.inputDesription).value,
                value : document.querySelector(DOMtrings.inputValue).value

            };
        },
        getDOMstrings: function(){
            return DOMtrings;
        }
    };
})();



// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){

    var DOM =  UICtrl.getDOMstrings;
    var ctrlAddItem = function(){

        var input = UIController.getinput();
        console.log(input);
    }
    
    document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);
    
    document.addEventListener('keypress',function(event){
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    });
})(budgetController,UIController);
 
