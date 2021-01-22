// 
var uiController = (function() {})();

// 
var financeController = (function() {})();

// 
var appController = (function(uiController, financeController) {
var ctrlAddItem = function() {
    
    console.log("gg");

    };

    document.querySelector(".add__btn").addEventListener("click", function() {
    ctrlAddItem();
});

document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.which === 13) {
    ctrlAddItem();
    }
    });
})(uiController, financeController);


