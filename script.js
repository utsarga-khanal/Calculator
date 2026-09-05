const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let aWaitingNextValue = false;
let operatorValue = "";

function addNumberValue(number) {
  if (aWaitingNextValue) {
    calculatorDisplay.textContent = number;
    aWaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  if (operatorValue && aWaitingNextValue) {
    operatorValue = operator;
    return;
  }
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  aWaitingNextValue = true;
  operatorValue = operator;
}

function addDecimal() {
  if (aWaitingNextValue) {
    return;
  }
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

inputBtns.forEach((inputBtns) => {
  if (inputBtns.classList.length === 0) {
    inputBtns.addEventListener("click", () => addNumberValue(inputBtns.value));
  } else if (inputBtns.classList.contains("operator")) {
    inputBtns.addEventListener("click", () => useOperator(inputBtns.value));
  } else if (inputBtns.classList.contains("decimal")) {
    inputBtns.addEventListener("click", () => addDecimal(inputBtns.value));
  }
});

function resetAll() {
  firstValue = 0;
  operatorValue = "";
  aWaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}

clearBtn.addEventListener("click", resetAll);

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }
});
