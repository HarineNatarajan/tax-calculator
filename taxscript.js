function showErrorTooltip(elementId, errorMessage) {
    var errorIcon = document.getElementById(elementId + "Error");
    errorIcon.title = errorMessage;
    errorIcon.style.display = "inline-block";
}

function clearErrorTooltip(elementId) {
    var errorIcon = document.getElementById(elementId + "Error");
    errorIcon.title = "";
    errorIcon.style.display = "none";
}

function calculateTax() {
    var age = document.getElementById("age").value;
    var income = parseFloat(document.getElementById("income").value);
    var extraIncome = parseFloat(document.getElementById("extraIncome").value);
    var deductions = parseFloat(document.getElementById("deductions").value);

    clearErrorTooltip("age");
    clearErrorTooltip("income");
    clearErrorTooltip("extraIncome");
    clearErrorTooltip("deductions");

    var isError = false;

    if (!age) {
        showErrorTooltip("age", "Age is mandatory");
        isError = true;
    }

    if (isNaN(income)) {
        showErrorTooltip("income", "Invalid income");
        isError = true;
    }

    if (isNaN(extraIncome)) {
        showErrorTooltip("extraIncome", "Invalid extra income");
        isError = true;
    }

    if (isNaN(deductions)) {
        showErrorTooltip("deductions", "Invalid deductions");
        isError = true;
    }

    if (!isError) {
        var tax = 0;
        var taxableIncome = income + extraIncome - deductions;

        if (taxableIncome > 800000) {
            if (age === "<40") {
                tax = 0.3 * (taxableIncome - 800000);
            } else if (age === ">=40&<60") {
                tax = 0.4 * (taxableIncome - 800000);
            } else if (age === ">=60") {
                tax = 0.1 * (taxableIncome - 800000);
            }
        }

        var modal = document.getElementById("myModal");
        var resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "TAX TO BE PAID:" + tax.toFixed(2) + "Lakhs";
        modal.style.display = "block";
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
}
