//BUDGET CONTROLLER
var budgetController =(function(){
    
    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };


    var data = {
        allItems: {
            exp : [],
            inc :[]
        },
        totals: {
            exp:0,
            inc:0
        }
       
    };
})();




//UI CONTROLLER
var UIController = (function(){

    var DOMtrings = {
        inputType:'.add__type',
        inputDesription:'.add__description',
        inputValue:'.add__value',
        inputBtn:'.add__btn'
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

    var setupEventListners = function(){
        var DOM =  UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
        document.addEventListener('keypress',function(event){
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
    };


    var ctrlAddItem = function(){
        // 1. Get the field input data
        var input = UIController.getinput();
    };
    
    // 2. Add the item to the budget

    // 3. Add the item to the UI

    // 4. Calculate the budget

    // 5. Display the budget on the UI

    return{
        init:function(){
            console.log('App started');
            setupEventListners();
        }
    }

})(budgetController,UIController);
 
controller.init(); 