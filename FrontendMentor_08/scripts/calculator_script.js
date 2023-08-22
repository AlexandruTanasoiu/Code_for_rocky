let buttons = document.getElementsByTagName("button");
const num_array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operator_array = ["plus", "minus", "div", "multi", "equal"];
let inputVariable = "";
let calculatorOperator = "";
let resultVariable = [];
let intermediarVariable = 0;
let stepsNumber = 0;

export function calculatorFunction() {
  for (let button of buttons) {
    button.addEventListener("click", function () {
      // read value from buttons
      if (num_array.includes(button.value)) {
        inputVariable = inputVariable + button.value;
        document.getElementById("display").innerHTML = inputVariable;
        //delete function
      } else if (button.value == "del") {
        inputVariable = inputVariable.substring(0, inputVariable.length - 1);
        document.getElementById("display").innerHTML = inputVariable;
        // floating point add
      } else if (button.value == "point") {
        inputVariable = inputVariable + ".";
        // reset function
      } else if (button.value == "reset") {
        inputVariable = " ";
        resultVariable = "";
        stepsNumber = 0;
        intermediarVariableVariable = 0;
        document.getElementById("display").innerHTML = intermediarVariable;
        // operator read
      } else if (operator_array.includes(button.value)) {
        calculatorOperator = button.value;
        resultVariable = resultVariable + inputVariable + `_${button.value}_`;
        inputVariable = "";
        stepsNumber++;
      }
      // calculator function
      if (stepsNumber == 2) {
        // console.log(`actual: ${inputVariable}`);
        intermediarVariable = calculationResult(resultVariable);
        // console.log(`Result ${intermediarVariable}`);
        stepsNumber = 1;
        resultVariable = intermediarVariable + `_${calculatorOperator}_`;
        document.getElementById("display").innerHTML = intermediarVariable;
      }
    });
  }

  function calculationResult(stepsCalculation) {
    stepsCalculation = stepsCalculation.split("_");
    let intermediarVariable = [];
    let first = stepsCalculation[0];
    let calculatorOperator = stepsCalculation[1];
    let second = stepsCalculation[2];

    // for debug
    // console.log(`operator in function: ${stepsCalculation[1]}`);
    // console.log(`first: ${first}`);
    // console.log(`second:${second}`);

    if (calculatorOperator == "plus") {
      intermediarVariable = Number(first) + Number(second);
    } else if (calculatorOperator == "minus") {
      intermediarVariable = Number(first) - Number(second);
    } else if (calculatorOperator == "div") {
      intermediarVariable = Number(first) / Number(second);
    } else if (calculatorOperator == "multi") {
      intermediarVariable = Number(first) * Number(second);
    } else if (calculatorOperator == "equal") {
      intermediarVariable = first;
    }
    return intermediarVariable;
  }
}
