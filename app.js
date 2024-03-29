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

    var calculateTotal = function(type){

        var sum = 0;

        data.allItems[type].forEach(function(val){
            sum = sum+val.value;
        });

        data.totals[type] = sum;

    };

    var data = {
        allItems: {
            exp : [],
            inc :[]
        },
        totals: {
            exp:0,
            inc:0
        },
        budget:0,
        percentage:-1
    };

    return{
        addItem:function(type,des,val){
            var newItem, ID;

            // Create new ID 
            if(data.allItems[type].length > 0 ){

                ID = data.allItems[type][data.allItems[type].length - 1 ].id +1;

            } else {

                ID = 0;
            }

            // Create new item based on inc or exp type
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc'){
                newItem = new Income(ID, des, val);                
            }

            // Push it into our data structure 
            data.allItems[type].push(newItem);

            // return our data
            return newItem;
        },

        calculateBudget:function(){

            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;


            // Calculate the precetage of income that we spent
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp/data.totals.inc) * 100);
            } else {
                data.precentege = -1;
            }



        },

        getBudget: function(){

            return {

                budget: data.budget,
                totalIncome: data.totals.inc,
                totalExp: data.totals.exp,
                precentege:data.percentage

            }


        },

        testing: function(){
            console.log(data);
        }
    }
})();




//UI CONTROLLER
var UIController = (function(){

    var DOMtrings = {
        inputType:'.add__type',
        inputDesription:'.add__description',
        inputValue:'.add__value',
        inputBtn:'.add__btn',
        expensesContainer:'.expenses__list',
        incomeContainer:'.income__list',
        budgetLabel:'.budget__value',
        incomeLabel:'.budget__income--value',
        expensesLabel:'.budget__expenses--value',
        precentageLabel:'.budget__expenses--percentage'
    };
    
    return{
        getinput: function(){

            return{

                type : document.querySelector(DOMtrings.inputType).value,
                description : document.querySelector(DOMtrings.inputDesription).value,
                value : parseFloat(document.querySelector(DOMtrings.inputValue).value)

            };
        },

        addListItem:function(obj, type){
            var html,newHtml,element;
            // Create HTML string with placeholder text
            if(type ==='inc'){
                element = DOMtrings.incomeContainer;
                html = `<div class="item clearfix" id="income-%id%">
                <div class="item__description">%discription%</div>
                <div class="right clearfix">
                    <div class="item__value">%value%</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`
            } else if(type === 'exp'){
                element = DOMtrings.expensesContainer;
                html = `<div class="item clearfix" id="expense-%id%">
                <div class="item__description">%discription%</div>
                <div class="right clearfix">
                    <div class="item__value">%value% </div>
                    <div class="item__percentage">21%</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`
            }
            // Replace the placeholder text with real data
            newHtml = html.replace('%id%', obj.id );
            newHtml = newHtml.replace('%discription%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML to the DOM

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);


        },

        clearFields:function(){
            var fields,fieldsArray;
            fields = document.querySelectorAll(DOMtrings.inputDesription + ', ' + DOMtrings.inputValue);
            // List to the array with scope chaine from array prototype.
           fieldsArray = Array.prototype.slice.call(fields);

           fieldsArray.forEach( function(current, index, array){
                current.value = "";
                fieldsArray[0].focus();
           });
        },
        displayBudget: function(obj){

            document.querySelector(DOMtrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMtrings.incomeLabel).textContent = obj.totalIncome;
            document.querySelector(DOMtrings.expensesLabel).textContent = obj.totalExp;

            if(obj.precentege > 0){
                document.querySelector(DOMtrings.precentageLabel).textContent = obj.precentege + '%';  
            }else{
                document.querySelector(DOMtrings.precentageLabel).textContent = ' - ';  

            }

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

    var updateBudget = function(){

    // 1. Calculate the budget
    budgetController.calculateBudget();

    // 2. return the budget
        var budget = budgetCtrl.getBudget();

    // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    }

    var ctrlAddItem = function(){
        var input,newItem;

    // 1. Get the field input data
        input = UIController.getinput();
        
        if(input.description !=="" && !isNaN(input.value) && input.value > 0){
            // 2. Add the item to the budget
            newItem = budgetController.addItem(input.type, input.description,input.value);


            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);


            // 4. CLear Fields
            UICtrl.clearFields();

            // 5. Calculate and update the budget
            updateBudget();
        }else{
            alert('Pls enter a number');
        }
  

};

    return{
        init:function(){
            console.log('App started');
            UICtrl.displayBudget({

                budget: 0,
                totalIncome: 0,
                totalExp: 0,
                precentege:-1

            });
            setupEventListners();
        }
    }

})(budgetController,UIController);
 
controller.init(); 