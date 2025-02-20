const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".box");

let expression = "";

// Function to update the display
function updateDisplay(value) {
  display.textContent = value;
}

// Helper function to check if the last character is an operator
function isOperator(value) {
  return ["+", "*", "/"].includes(value);
}

// Handle button clicks
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.id;

    if (value === "AC") {
      // Clear the display
      expression = "";
      updateDisplay(expression);
    } else if (expression.charAt(0) === "*" || expression.charAt(0) === "/") {
      expression = "";
      updateDisplay(expression);
    } else if (
      isOperator(expression.slice(-1)) &&
      isOperator(expression.charAt(expression.length - 2))
    ) {
      // Clear the last character from the expression
      expression = expression.slice(0, -1);
      updateDisplay(expression);
    } else if (
      isOperator(expression.slice(-1)) &&
      expression.charAt(expression.length - 2) === "-"
    ) {
      // Clear the last character from the expression
      expression = expression.slice(0, -1);
      updateDisplay(expression);
    } else if (value === "=") {
      // Calculate the result of the expression
      try {
        expression = eval(expression).toString();
        updateDisplay(expression);
      } catch (error) {
        updateDisplay("Error");
      }
    } else if (value === "pm") {
      // Find the last number in the expression and toggle its sign
      let match = expression.match(/([-]?\d*\.?\d+)([+\-*/]?)$/);

      if (match) {
        let number = match[1]; // Last number in the expression
        let operator = match[2]; // The operator (if any) after the number

        // Toggle the sign of the last number
        if (number.startsWith("-")) {
          number = number.slice(1); // Remove the minus sign to make it positive
        } else {
          number = "-" + number; // Add a minus sign to make it negative
        }

        // Replace the last number in the expression
        expression = expression.replace(
          /([-]?\d*\.?\d+)([+\-*/]?)$/,
          number + operator
        );
        updateDisplay(expression);
      }
    } else if (value === "sqr") {
      // Square root of the expression
      if (expression) {
        expression = Math.sqrt(parseFloat(expression)).toString();
        updateDisplay(expression);
      }
    } else if (value === ".") {
      // Handle decimal point
      if (!expression.includes(".")) {
        expression += ".";
        updateDisplay(expression);
      }
    } else if (value === "%") {
      // Handle percentage
      if (expression) {
        expression = (parseFloat(expression) / 100).toString();
        updateDisplay(expression);
      }
    } else {
      // Append the clicked number/operator to the expression
      expression += value;
      updateDisplay(expression);
    }
  });
});
