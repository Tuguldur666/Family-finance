// screen 
var uiController = (function() {
    var DOMstring = {
        inputType:'.add__type',
        inputDesc:'.add__description',
        inputValue:'.add__value',
        addBtn:".add__btn"
    };

    return{
        getInput: function(){
            return {
                type:document.querySelector(DOMstring.inputType).value,
                description:document.querySelector(DOMstring.inputType).value,
                value:document.querySelector(DOMstring.inputValue).value
            }
        },
        getDOMstring: function(){
            return DOMstring;
        }
    }
})();

// finance
var financeController = (function() 
{
    var Income = function(id , description ,value)
{
    this.id = id ;
    this.description = description;
    this.value = value;
}
var Expense = function(id , description ,value)
{
    this.id = id ;
    this.description = description;
    this.value = value;
}
    var data = 
    {
        items:
        {
            inc: [],
            exp: []
        },
        total:
        {
            inc: 0,
            exp: 0 
        }
    };
    return{
        addItem: function(type , desc , value)
        {   
            var item , id ;
            if(data.items[type].length === 0)
            {
                id = 1 ;
            }else
            {
               id = data.items[type][ data.items[type].length - 1].id + 1 ;
            }

            if(type === "inc")
            {
                item = new Income(id , desc ,value);
            }else
            {
                item = new Expense(id , desc ,value);
            }
            data.items[type].push(item);     
        }
    }

})();

// app
var appController = (function(uiController, financeController) {
    var DOM = uiController.getDOMstring();
    var ctrlAddItem = function() {
    // 1 
    var input = uiController.getInput();
        financeController.addItem(input.description , input.type , input.value);
    

    };
    var setupListener = function()
    {   DOM = uiController.getDOMstring();
        document.querySelector(DOM.addBtn).addEventListener("click", function() {
            ctrlAddItem();
        });
        
        document.addEventListener("keypress", function(event) {
            if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
            }
            });
    }
    return {
        Init:function()
        {
            setupListener();
        }
    }
})(uiController, financeController);
appController.Init();

