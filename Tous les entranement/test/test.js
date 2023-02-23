let input = "";
let result = "";

function addInput(value) {
  if (input.length < 15) {
    input += value;
    document.getElementById("result").value = input;
  }
}

function clearResult() {
  input = "";
  result = "";
  document.getElementById("result").value = "";
}

function calculate() {
  result = eval(input);
  result = result.toFixed(15);
  document.getElementById("result").value = result;
  input = "";
}
