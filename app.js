/*
To DO: (Modules)
    - Add Event Handler (Controller)
    - Get input values   (UI)
    - Add the new item to datastructure (Data)
    - Add the new item to the UI (UI)
    - Calculate Budget  (Data)
    - Update the UI (UI)
*/

/*
    Structure of code:
        -Use Modules design pattern
            1) UI Module (View)
            2) Budget Data Module (Model)
            3) Controller Module (Controller)

*/

// Module Design Pattern (For data encapsulation, keeping code that belongs together in one place)
// Only expose the needed code (API)


// Budget Controller //
/////////////////////////////////////////////////////////////////////////////////////////////////////

let budgetController = (function(){
    //Create objects to store each expense and income items

    //Function constructor used to create objects
    let Expense = function(id, desciption, value){
        this.id = id;
        this.desciption = desciption;
        this.value = value;
    };

    let Income = function (id, desciption, value) {
        this.id = id;
        this.desciption = desciption;
        this.value = value;
    };

    // When creating methods, we want to add them to the prototype instead of to the constructor
    // because that way, each object will inherit them instead of each object storing the function

    
    // Data structure to recieve data
    let budgetData = {
        allItems :{
            exp : [],
            inc : [],
        },
        totals : {
            exp : 0,
            inc : 0,
        },
    };

    // Public functions
    return {
        addItem :  function(type, descript, val){
            let id;
            let newItem;
            
            // Create new ID
            if (budgetData.allItems["inc"].length === 0 || budgetData.allItems["exp"].length === 0){
                id = 0;
            }else{
                id = budgetData.allItems[type][budgetData.allItems[type].length - 1].id + 1;
            }

            // Create new item based on the type
            if(type === "inc"){
                newItem =  new Income(id, descript, val);

            }else if( type === "exp"){
                newItem = new Expense(id, descript, val);

            }

            // Inserts item into that types array
            budgetData.allItems[type].push(newItem);
            return newItem;
        },
        testFunction : function(){
            console.log(budgetData);
        }
    }



})();


// UI Controller //
/////////////////////////////////////////////////////////////////////////////////////////////////////


let UIController = (function(){
    const DOMstrings = {
        inputType: ".add__type",
        inputValue: ".add__value",
        inputDescription: ".add__description",
        addButton: ".add__btn",
    }

    // Public functions
    return{
        getUIDescription: () => document.querySelector(".add__description").value,

        getUIAmount: () => document.querySelector(".add__value").value,

        //inc = income , exp = expense
        getUIType: () => document.querySelector(".add__type").value,

        clearValues : function(){
            document.querySelector(DOMstrings.inputDescription).value = "";
            document.querySelector(DOMstrings.inputValue).value = "";
        },

        addListItem : function(item){
            // Create HTML string with placeHolder text

            

            // Replace the placeholder text with actual item data



            // Insert the HTML into the DOM
        },

        getDOMStrings : () => DOMstrings,


    }

})();



// Global Controller //
/////////////////////////////////////////////////////////////////////////////////////////////////////


// Global App controller
let controller = (function(budgetContrl, UIContrl){

    const setEventListeners = function(){
        const DOM_strs = UIContrl.getDOMStrings();

        document.querySelector(DOM_strs.addButton).addEventListener("click", controller_Add_Item);

        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                controller_Add_Item();
            }
        });
    };

    let ui_obj = {
        inputType: "",
        inputDescription: "",
        inputAmount: 0,
    }

    function controller_Add_Item(){
         // 1) Get the feild input data
        ui_obj.inputDescription = UIContrl.getUIDescription();
        ui_obj.inputAmount = UIContrl.getUIAmount();
        ui_obj.inputType = UIContrl.getUIType();

        ui_obj.inputAmount = parseFloat(ui_obj.inputAmount);
        if(isNaN(ui_obj.inputAmount)){
            ui_obj.inputAmount = 0;
        }


        // 2) Add the item to the budget controller
        let newItem = budgetContrl.addItem(ui_obj.inputType, ui_obj.inputDescription, ui_obj.inputAmount);


        // 3) Add the item to the UI



        // 4) Calculate the budget




        // 5) Display the budget on the UI


        // Remove the data from feilds
        UIContrl.clearValues();

    };

    // Public functions
    return{
        init : function(){
            setEventListeners();
        }
    }

})(budgetController,UIController);


controller.init();