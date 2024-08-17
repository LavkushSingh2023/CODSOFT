document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let resultDisplayed = false;

    function clearDisplay() {
        currentInput = '';
        operator = '';
        previousInput = '';
        display.textContent = '0';
        resultDisplayed = false;
    }

    function updateDisplay(value) {
        if (resultDisplayed && !['+', '-', '*', '/'].includes(value)) {
            clearDisplay();
        }
        resultDisplayed = false;

        if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            if (operator && previousInput !== '' && currentInput !== '') {
                currentInput = eval(previousInput + operator + currentInput);
                display.textContent = currentInput;
                previousInput = currentInput;
                operator = '';
                resultDisplayed = true;
            }
        } else if (value === '←') {
            if (currentInput !== '') {
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput || '0';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (operator && previousInput !== '' && currentInput !== '') {
                currentInput = eval(previousInput + operator + currentInput);
                display.textContent = currentInput;
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '';
        } else {
            currentInput += value;
            display.textContent = previousInput + operator + currentInput;
        }
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function () {
            updateDisplay(this.getAttribute('data-value'));
        });
    });

    clearDisplay();
});
