var uiController = (function() {
    var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: '.income__list',
    expenseList: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expLabel: '.budget__expenses--value ',
    percLabel: '.budget__expenses--percentage'
    };

    return {
    getInput: function() {
        return {
          type: document.querySelector(DOMstrings.inputType).value, // exp, inc
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
        };
        },
        
        getDOMstrings: function() 
        {
        return DOMstrings;
        },
        clearFIeld: function()
        {
            var fields = document.querySelectorAll(DOMstrings.inputDescription + " , " + DOMstrings.inputValue );
            var fieldsArr = Array.prototype.slice.call(fields);
            for(var i = 0 ; i < fieldsArr.length ; i++)
            {
                fieldsArr[i].value = ''
                fieldsArr[0].focus();
            }
        },
            showBudget: function(budget)
            {
            document.querySelector( DOMstrings.budgetLabel).textContent = budget.budget ;
            document.querySelector( DOMstrings.incomeLabel).textContent = budget.totalInc;
            document.querySelector( DOMstrings.expLabel).textContent = budget.totalExp;
            document.querySelector( DOMstrings.percLabel).textContent = budget.perc;

            },

        addListItem: function(item, type) {
            
        var html, list;
        if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
            '<div class="item clearfix" id="income-%id%"><div class="item__description">$desc$</div><div class="right clearfix"><div class="item__value"> + $value$</div><div class="item__delete">            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>        </div></div>';
        } else {
        list = DOMstrings.expenseList;
        html =
            '<div class="item clearfix" id="expense-%id%"><div class="item__description">$desc$</div>          <div class="right clearfix"><div class="item__value"> - $value$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">                <i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
        
        html = html.replace("%id%", item.id);
        html = html.replace("$desc$", item.description);
        html = html.replace("$value$", item.value);

            
        document.querySelector(list).insertAdjacentHTML("beforeend", html);
        }
    };
    })();
    
    
    var financeController = (function() {
    // private data
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // private data
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var calculateTotal = function(type)
    {   var sum = 0;
        data.items[type].forEach(function(el)
        {
            sum = sum + el.value ;
        });
        data.totals[type] = sum ;
    };

    // private data
    var data = {
        items: {
        inc: [],
        exp: []
        },
        
        totals: {
        inc: 0,
        exp: 0
        },
        budget: 0,
        perc: 0
    };
    
    return {
        calculateBudget: function()
        {
            calculateTotal('inc');
            calculateTotal('exp');
            data.budget = data.totals.inc - data.totals.exp ;
            data.perc = Math.round((data.totals.exp / data.totals.inc)* 100) ;
        },
        getBudget: function()
        {
            return{
                budget: data.budget,
                perc: data.perc,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },
        addItem: function(type, desc, val) {
        var item, id;
            
        if (data.items[type].length === 0) id = 1;
        else {
            id = data.items[type][data.items[type].length - 1].id + 1;
        }
        
        if (type === "inc") {
            item = new Income(id, desc, val);
        } else {
            item = new Expense(id, desc, val);
        }
        
        data.items[type].push(item);
        
        return item;
        },
        
        seeData: function() {
        return data;
        }
    };
    })();


    var appController = (function(uiController, financeController) {
    var ctrlAddItem = function() {

        var input = uiController.getInput();
        
        if(input.description !== "" && input.value !== "")
        {
            var item = financeController.addItem(
                input.type,
                input.description,
                input.value
                );
        }
            
        uiController.addListItem(item, input.type);
        uiController.clearFIeld();
        financeController.calculateBudget();
        var budget = financeController.getBudget();
        uiController.showBudget(budget);
        
    };
    
    var setupEventListeners = function() {
        var DOM = uiController.getDOMstrings();
        
        document.querySelector(DOM.addBtn).addEventListener("click", function() {
        ctrlAddItem();
        });
        
        document.addEventListener("keypress", function(event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
        });
    };
    
    return {
        init: function() {
        console.log("Application started...");
        setupEventListeners();
        }
    };
    })(uiController, financeController);

    appController.init();