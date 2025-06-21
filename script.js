const display = document.getElementById("display");
const clickSound = document.getElementById("click-sound");
let ans = "";

// Convert degrees to radians
function toRadians(deg) {
  return deg * (Math.PI / 180);
}

// Play button click sound
function playClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// Add value to display
function appendValue(val) {
  playClick();
  if (display.innerText === "0" || display.innerText === "Error") {
    display.innerText = val;
  } else {
    display.innerText += val;
  }
}

// Clear display
function clearDisplay() {
  playClick();
  display.innerText = "0";
}

// Delete last character
function deleteLast() {
  playClick();
  if (display.innerText !== "0" && display.innerText !== "Error") {
    display.innerText = display.innerText.slice(0, -1);
    if (display.innerText.length === 0) {
      display.innerText = "0";
    }
  }
}

// Append scientific function
function appendFunction(func) {
  playClick();
  if (display.innerText === "0" || display.innerText === "Error") {
    display.innerText = func + "(";
  } else {
    display.innerText += func + "(";
  }
}

// Use previous answer
function useAns() {
  playClick();
  if (display.innerText === "0" || display.innerText === "Error") {
    display.innerText = "Ans";
  } else {
    display.innerText += "Ans";
  }
}

// Evaluate expression
function calculate() {
  playClick();
  try {
    let expression = display.innerText
      .replace(/Ans/g, ans)
      .replace(/√/g, "Math.sqrt")
      .replace(/π/g, "Math.PI")
      .replace(/\be\b/g, "Math.E")
      .replace(/log/g, "Math.log10")
      .replace(/ln/g, "Math.log")
      .replace(/sin\(/g, "Math.sin(toRadians(")
      .replace(/cos\(/g, "Math.cos(toRadians(")
      .replace(/tan\(/g, "Math.tan(toRadians(")
      .replace(/abs/g, "Math.abs")
      .replace(/exp/g, "Math.exp")
      .replace(/pow/g, "Math.pow");

    let result = eval(expression);

    if (!isFinite(result)) {
      throw new Error("Math Error");
    }

    display.innerText = result;
    ans = result;
  } catch (e) {
    display.innerText = "Error";
  }
}

// Keyboard support
document.addEventListener("keydown", function (e) {
  const key = e.key;

  if (!isNaN(key)) {
    appendValue(key);
  } else if (key === "+") {
    appendValue("+");
  } else if (key === "-") {
    appendValue("-");
  } else if (key === "*") {
    appendValue("*");
  } else if (key === "/") {
    appendValue("/");
  } else if (key === ".") {
    appendValue(".");
  } else if (key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "c" || key === "C") {
    clearDisplay();
  } else if (key === "(" || key === ")") {
    appendValue(key);
  }
});
