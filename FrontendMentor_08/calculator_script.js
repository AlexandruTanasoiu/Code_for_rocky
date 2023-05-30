var buttons = document.getElementsByTagName("button");
let num_array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let operator_array = ["plus", "minus", "div", "multi", "equal"];
let btn_ids = ["key_reset", "key_equal", "key_del"];
let actual = "";
let operator = "";
let variable = [];
let result = 0;
let nr = 0;

export function calculatorFunction() {
  for (let i of buttons) {
    i.addEventListener("click", function () {
      // read value from buttons
      if (num_array.includes(i.value)) {
        actual = actual + i.value;
        document.getElementById("display").innerHTML = actual;
        //delete function
      } else if (i.value == "del") {
        actual = actual.substring(0, actual.length - 1);
        document.getElementById("display").innerHTML = actual;
        // floating point add
      } else if (i.value == "point") {
        actual = actual + ".";
        // reset function
      } else if (i.value == "reset") {
        actual = " ";
        variable = "";
        nr = 0;
        result = 0;
        document.getElementById("display").innerHTML = result;
        // operator read
      } else if (operator_array.includes(i.value)) {
        operator = i.value;
        variable = variable + actual + `_${i.value}_`;
        actual = "";
        nr++;
      }
      // calculator function
      if (nr == 2) {
        console.log(`actual: ${actual}`);
        result = calculator(variable);
        console.log(`Result ${result}`);
        nr = 1;
        variable = result + `_${operator}_`;
        document.getElementById("display").innerHTML = result;
      }
    });
  }

  function calculator(x) {
    x = x.split("_");
    let result = [];
    let first = x[0];
    let operator = x[1];
    let second = x[2];

    // for debug
    // console.log(`operator in function: ${x[1]}`);
    // console.log(`first: ${first}`);
    // console.log(`second:${second}`);

    if (operator == "plus") {
      result = Number(first) + Number(second);
    } else if (operator == "minus") {
      result = Number(first) - Number(second);
    } else if (operator == "div") {
      result = Number(first) / Number(second);
    } else if (operator == "multi") {
      result = Number(first) * Number(second);
    } else if (operator == "equal") {
      result = first;
    }
    return result;
  }
}
