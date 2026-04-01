/*
Psudo code____logic

START

GET reference to button
GET reference to textarea
GET reference to output div

WHEN button is clicked:

    GET value from textarea

    IF input is empty:
        SHOW "Please paste a problem"
    
    ELSE:
        GENERATE hint (for now → static text)
        DISPLAY hint in output div

END
*/

// Step 1: Get elements
const button = document.getElementById("hintBtn");
const textarea = document.getElementById("problem");
const output = document.getElementById("output");

// Adding the click event
button.addEventListener("click", () => {

    // Step 3: Get input value
    const input = textarea.value.trim();


    if (input === "") {
        // Step 4: Check if input area is empty (V1)
        output.textContent = "ERROR! Please Paste or Write Down The Problem Here First";
        return;

    } else {
        // Step 5: Show dummy hint (V1)
        output.textContent = "Try breaking the problem into smaller parts.";
    }
});