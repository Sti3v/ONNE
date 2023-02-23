const display = document.querySelector(".display");
const previousDisplay = document.querySelector(".previous-display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const equalsBtn = document.querySelector(".equal");

let currentInput = "";
let previousInput = "";
let calculationOperator = "";

const inputNumber = (number) => {
  if (currentInput === "0") {
    currentInput = number;
  } else {
    currentInput += number;
  }
};

const inputOperator = (operator) => {
  if (calculationOperator === "") {
    previousInput = currentInput;
    currentInput = "0";
    calculationOperator = operator;
  } else {
    calculation();
    previousInput = display.textContent;
    currentInput = "0";
    calculationOperator = operator;
  }
};

function calculate(expression) {
  // Convertir l'expression en tableau d'opérandes et d'opérateurs
  let tokens = expression.match(/[+\-*/()]|\d+(\.\d+)?/g);
  if (!tokens) return null;

  // Résoudre les parenthèses
  let stack = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === ")") {
      let op = stack.pop();
      let num2 = stack.pop();
      let num1 = stack.pop();
      stack.pop(); // enlever la parenthèse ouvrante
      stack.push(applyOperator(op, num1, num2));
    } else {
      stack.push(tokens[i]);
    }
  }

  // Résoudre les opérateurs restants
  while (stack.length > 1) {
    let num2 = parseFloat(stack.pop());
    let op = stack.pop();
    let num1 = parseFloat(stack.pop());
    stack.push(applyOperator(op, num1, num2));
  }

  return parseFloat(stack[0]);
}

const buttons = document.querySelectorAll("button");
let operation = "";

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    const value = buttons[i].getAttribute("data-value");
    operation += value;
    updateDisplay(operation);
  });
}

function updateDisplay(value) {
  const display = document.querySelector(".display");
  display.textContent = value;
}

function evaluateExpression() {
  try {
    const result = eval(currentExpression);
    if (result.toString().length > 12) {
      throw new Error("Overflow");
    }
    display.textContent = result;
    previousDisplay.textContent = currentExpression + " =";
    currentExpression = result;
  } catch (err) {
    if (err instanceof SyntaxError) {
      display.textContent = "Error";
      previousDisplay.textContent = "";
      currentExpression = "";
    } else if (err.message === "Overflow") {
      display.textContent = "Overflow";
      previousDisplay.textContent = "";
      currentExpression = "";
    }
  }
}

// const buttons = document.querySelectorAll(".calculator button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("number")) {
      appendNumber(button.dataset.value);
    } else if (button.classList.contains("operator")) {
      appendOperator(button.dataset.value);
    } else if (button.classList.contains("decimal")) {
      appendDecimal();
    } else if (button.classList.contains("clear")) {
      clearDisplay();
    } else if (button.classList.contains("delete")) {
      deleteFromDisplay();
    } else if (button.classList.contains("equal")) {
      evaluateExpression();
    }
  });
});

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => {
    // Do something when the button is clicked
  });
}

function appendNumber(number) {
  const display = document.querySelector(".display span");
  display.textContent += number;
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => {
    if (buttons[i].classList.contains("number")) {
      appendNumber(buttons[i].dataset.value);
    }
  });
}




